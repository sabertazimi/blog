'use client'

import { useTheme } from 'next-themes'
import React, { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface FuzzyTextProps {
  children: React.ReactNode
  fontSize?: number | string
  fontWeight?: string | number
  fontFamily?: string
  enableHover?: boolean
  baseIntensity?: number
  hoverIntensity?: number
  className?: string
}

const FuzzyText: React.FC<FuzzyTextProps> = ({
  children,
  fontSize = 'clamp(2rem, 8vw, 8rem)',
  fontWeight = 900,
  fontFamily = 'inherit',
  enableHover = true,
  baseIntensity = 0.18,
  hoverIntensity = 0.5,
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement & { cleanupFuzzyText?: () => void }>(null)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    let animationFrameId: number
    let isCancelled = false
    const canvas = canvasRef.current

    if (!canvas) {
      return
    }

    const init = async () => {
      if (document.fonts?.ready !== undefined) {
        await document.fonts.ready
      }

      if (isCancelled) {
        return
      }

      const ctx = canvas.getContext('2d')

      if (!ctx) {
        return
      }

      const computedFontFamily
        = fontFamily === 'inherit' ? window.getComputedStyle(canvas).fontFamily || 'sans-serif' : fontFamily

      const fontSizeStr = typeof fontSize === 'number' ? `${fontSize}px` : fontSize
      let numericFontSize: number

      if (typeof fontSize === 'number') {
        numericFontSize = fontSize
      } else {
        const temp = document.createElement('span')
        temp.style.fontSize = fontSize
        document.body.appendChild(temp)
        const computedSize = window.getComputedStyle(temp).fontSize
        numericFontSize = Number.parseFloat(computedSize)
        document.body.removeChild(temp)
      }

      // eslint-disable-next-line react/no-children-to-array -- children is a valid React node
      const text = React.Children.toArray(children).join('')
      const offscreen = document.createElement('canvas')
      const offCtx = offscreen.getContext('2d')

      if (!offCtx) {
        return
      }

      offCtx.font = `${fontWeight} ${fontSizeStr} ${computedFontFamily}`
      offCtx.textBaseline = 'alphabetic'
      const metrics = offCtx.measureText(text)

      const actualLeft = metrics.actualBoundingBoxLeft ?? 0
      const actualRight = metrics.actualBoundingBoxRight ?? metrics.width
      const actualAscent = metrics.actualBoundingBoxAscent ?? numericFontSize
      const actualDescent = metrics.actualBoundingBoxDescent ?? numericFontSize * 0.2

      const textBoundingWidth = Math.ceil(actualLeft + actualRight)
      const tightHeight = Math.ceil(actualAscent + actualDescent)

      const extraWidthBuffer = 10
      const offscreenWidth = textBoundingWidth + extraWidthBuffer

      offscreen.width = offscreenWidth
      offscreen.height = tightHeight

      const xOffset = extraWidthBuffer / 2
      offCtx.font = `${fontWeight} ${fontSizeStr} ${computedFontFamily}`
      offCtx.textBaseline = 'alphabetic'
      const primaryColor = window.getComputedStyle(canvas).getPropertyValue('--color-primary')
      offCtx.fillStyle = primaryColor !== '' ? primaryColor : resolvedTheme === 'dark' ? '#fff' : '#000'
      offCtx.fillText(text, xOffset - actualLeft, actualAscent)

      const horizontalMargin = 50
      const verticalMargin = 0
      canvas.width = offscreenWidth + horizontalMargin * 2
      canvas.height = tightHeight + verticalMargin * 2
      ctx.translate(horizontalMargin, verticalMargin)

      const interactiveLeft = horizontalMargin + xOffset
      const interactiveTop = verticalMargin
      const interactiveRight = interactiveLeft + textBoundingWidth
      const interactiveBottom = interactiveTop + tightHeight

      let isHovering = false
      const fuzzRange = 30

      const run = () => {
        if (isCancelled) {
          return
        }

        ctx.clearRect(-fuzzRange, -fuzzRange, offscreenWidth + 2 * fuzzRange, tightHeight + 2 * fuzzRange)
        const intensity = isHovering ? hoverIntensity : baseIntensity

        for (let j = 0; j < tightHeight; j++) {
          const dx = Math.floor(intensity * (Math.random() - 0.5) * fuzzRange)
          ctx.drawImage(offscreen, 0, j, offscreenWidth, 1, dx, j, offscreenWidth, 1)
        }

        animationFrameId = window.requestAnimationFrame(run)
      }

      run()

      const isInsideTextArea = (x: number, y: number) =>
        x >= interactiveLeft && x <= interactiveRight && y >= interactiveTop && y <= interactiveBottom

      const handleMouseMove = (e: MouseEvent) => {
        if (!enableHover) {
          return
        }

        const rect = canvas.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        isHovering = isInsideTextArea(x, y)
      }

      const handleMouseLeave = () => {
        isHovering = false
      }

      const handleTouchMove = (e: TouchEvent) => {
        if (!enableHover) {
          return
        }

        e.preventDefault()
        const rect = canvas.getBoundingClientRect()
        const touch = e.touches[0]
        const x = touch.clientX - rect.left
        const y = touch.clientY - rect.top
        isHovering = isInsideTextArea(x, y)
      }

      const handleTouchEnd = () => {
        isHovering = false
      }

      if (enableHover) {
        // eslint-disable-next-line react-web-api/no-leaked-event-listener -- cleanup function is called in useEffect
        canvas.addEventListener('mousemove', handleMouseMove)
        // eslint-disable-next-line react-web-api/no-leaked-event-listener -- cleanup function is called in useEffect
        canvas.addEventListener('mouseleave', handleMouseLeave)
        // eslint-disable-next-line react-web-api/no-leaked-event-listener -- cleanup function is called in useEffect
        canvas.addEventListener('touchmove', handleTouchMove, {
          passive: false,
        })
        // eslint-disable-next-line react-web-api/no-leaked-event-listener -- cleanup function is called in useEffect
        canvas.addEventListener('touchend', handleTouchEnd)
      }

      const cleanup = () => {
        window.cancelAnimationFrame(animationFrameId)

        if (enableHover) {
          canvas.removeEventListener('mousemove', handleMouseMove)
          canvas.removeEventListener('mouseleave', handleMouseLeave)
          canvas.removeEventListener('touchmove', handleTouchMove)
          canvas.removeEventListener('touchend', handleTouchEnd)
        }
      }

      canvas.cleanupFuzzyText = cleanup
    }

    init().catch((error) => {
      console.error('[FuzzyText] Failed to initialize', error)
    })

    return () => {
      isCancelled = true
      window.cancelAnimationFrame(animationFrameId)

      if (canvas !== null && canvas.cleanupFuzzyText !== undefined) {
        canvas.cleanupFuzzyText()
      }
    }
  }, [children, fontSize, fontWeight, fontFamily, enableHover, baseIntensity, hoverIntensity, resolvedTheme])

  return <canvas ref={canvasRef} className={cn(className)} />
}

export { FuzzyText }
