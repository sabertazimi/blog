'use client'

import type { ComponentProps, ReactNode, RefObject } from 'react'
import * as React from 'react'
import { createContext, use, useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

export interface TOCItemType {
  title: ReactNode
  url: string
  depth: number
}

/**
 * 从页面中提取 headings
 */
function useExtractHeadingsWithSelector(selector?: string): TOCItemType[] {
  const [headings, setHeadings] = useState<TOCItemType[]>([])

  useEffect(() => {
    const headingSelector = selector ?? '.prose h2, .prose h3'
    const headingElements = document.querySelectorAll(headingSelector)
    const headingsArray: TOCItemType[] = []

    headingElements.forEach((element) => {
      // 只处理有 id 的 heading
      if (element.id) {
        headingsArray.push({
          title: element.textContent || '',
          url: `#${element.id}`,
          depth: Number.parseInt(element.tagName.charAt(1)) - 1,
        })
      }
    })

    setHeadings(headingsArray)

    const observer = new MutationObserver(() => {
      const updatedElements = document.querySelectorAll(headingSelector)
      const updatedArray: TOCItemType[] = []

      updatedElements.forEach((element) => {
        if (element.id) {
          updatedArray.push({
            title: element.textContent || '',
            url: `#${element.id}`,
            depth: Number.parseInt(element.tagName.charAt(1)) - 1,
          })
        }
      })

      setHeadings(updatedArray)
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    return () => {
      observer.disconnect()
    }
  }, [selector])

  return headings
}

const ScrollContext = createContext<RefObject<HTMLElement | null>>({
  current: null,
})

interface ScrollProviderProps {
  containerRef: RefObject<HTMLElement | null>
  children?: ReactNode
}

function ScrollProvider({ containerRef, children }: ScrollProviderProps) {
  return <ScrollContext value={containerRef}>{children}</ScrollContext>
}

const ActiveAnchorContext = createContext<string[]>([])

export function useActiveAnchor(): string | undefined {
  return use(ActiveAnchorContext)[0]
}

export function useActiveAnchors(): string[] {
  return use(ActiveAnchorContext)
}

interface AnchorProviderProps {
  toc: TOCItemType[]
  single?: boolean
  children?: ReactNode
}

function AnchorProvider({ toc, single = false, children }: AnchorProviderProps) {
  const headings = toc.map(item => item.url.split('#')[1])
  const activeAnchors = useAnchorObserver(headings, single)

  return <ActiveAnchorContext value={activeAnchors}>{children}</ActiveAnchorContext>
}

/**
 * 使用 IntersectionObserver 追踪可见的 heading
 */
function useAnchorObserver(watch: string[], single: boolean): string[] {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const [activeAnchor, setActiveAnchor] = useState<string[]>([])
  const stateRef = useRef<{ visible: Set<string> } | null>(null)

  useEffect(() => {
    const onChange = (entries: IntersectionObserverEntry[]) => {
      if (!stateRef.current) {
        stateRef.current = { visible: new Set() }
      }
      const state = stateRef.current

      for (const entry of entries) {
        if (entry.isIntersecting) {
          state.visible.add(entry.target.id)
        } else {
          state.visible.delete(entry.target.id)
        }
      }

      if (state.visible.size === 0) {
        // 如果没有可见项，找最近的一个
        const viewTop = entries[0]?.rootBounds?.top ?? 0
        let fallback: Element | undefined
        let min = -1

        for (const id of watch) {
          const element = document.getElementById(id)
          if (!element)
            continue

          const d = Math.abs(viewTop - element.getBoundingClientRect().top)
          if (min === -1 || d < min) {
            fallback = element
            min = d
          }
        }

        setActiveAnchor(fallback ? [fallback.id] : [])
      } else {
        const items = watch.filter(item => state.visible.has(item))
        setActiveAnchor(single ? items.slice(0, 1) : items)
      }
    }

    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(onChange, {
        rootMargin: '0px',
        threshold: 0.98,
      })
    }

    return () => {
      observerRef.current?.disconnect()
      observerRef.current = null
    }
  }, [watch, single])

  useEffect(() => {
    const observer = observerRef.current
    if (!observer)
      return

    const elements = watch
      .map(heading => document.getElementById(heading))
      .filter((el): el is HTMLElement => el !== null)

    for (const element of elements) observer.observe(element)
    return () => {
      for (const element of elements) observer.unobserve(element)
    }
  }, [watch])

  return activeAnchor
}

interface TOCLinkProps extends Omit<ComponentProps<'a'>, 'href'> {
  href: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

function TOCLink({ href, children, className, onClick, ...props }: TOCLinkProps) {
  const containerRef = use(ScrollContext)
  const anchorRef = useRef<HTMLAnchorElement>(null)
  const activeAnchors = useActiveAnchors()
  const activeOrder = activeAnchors.indexOf(href.slice(1))
  const isActive = activeOrder !== -1
  const shouldScroll = activeOrder === 0

  useEffect(() => {
    const anchor = anchorRef.current
    const container = containerRef.current

    if (container && anchor && shouldScroll) {
      // 计算 anchor 在容器内的相对位置
      const containerRect = container.getBoundingClientRect()
      const anchorRect = anchor.getBoundingClientRect()

      // 计算需要滚动的距离，让 anchor 居中显示
      const scrollTop = container.scrollTop
      const relativeTop = anchorRect.top - containerRect.top
      const targetScrollTop = scrollTop + relativeTop - containerRect.height / 2 + anchorRect.height / 2

      // 只在容器内滚动，不影响页面滚动
      container.scrollTo({
        top: targetScrollTop,
        behavior: 'smooth',
      })
    }
  }, [containerRef, shouldScroll])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    window.history.pushState({}, '', href)

    const targetId = href.slice(1)
    const element = document.getElementById(targetId)

    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }

    onClick?.(e)
  }

  return (
    <a ref={anchorRef} href={href} onClick={handleClick} data-active={isActive} className={className} {...props}>
      {children}
    </a>
  )
}

interface TocThumbProps {
  containerRef: RefObject<HTMLElement | null>
  className?: string
}

function TocThumb({ containerRef, className }: TocThumbProps) {
  const thumbRef = useRef<HTMLDivElement>(null)
  const active = useActiveAnchors()

  useEffect(() => {
    if (!containerRef.current || !thumbRef.current)
      return
    const container = containerRef.current
    const thumb = thumbRef.current

    function update() {
      const [top, height] = calcThumbPosition(container, active)
      thumb.style.setProperty('--toc-top', `${top}px`)
      thumb.style.setProperty('--toc-height', `${height}px`)
    }

    const observer = new ResizeObserver(update)
    observer.observe(container)
    update()

    return () => {
      observer.disconnect()
    }
  }, [containerRef, active])

  return <div ref={thumbRef} role="none" className={className} />
}

function calcThumbPosition(container: HTMLElement, active: string[]): [number, number] {
  if (active.length === 0 || container.clientHeight === 0) {
    return [0, 0]
  }

  let upper = Number.MAX_VALUE
  let lower = 0

  for (const item of active) {
    const element = container.querySelector<HTMLElement>(`a[href="#${item}"]`)
    if (!element)
      continue

    const styles = getComputedStyle(element)
    upper = Math.min(upper, element.offsetTop + Number.parseFloat(styles.paddingTop))
    lower = Math.max(lower, element.offsetTop + element.clientHeight - Number.parseFloat(styles.paddingBottom))
  }

  return [upper, lower - upper]
}

function TOCScrollArea({ children }: { children?: React.ReactNode }) {
  const viewRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={viewRef}
      className={cn('scrollbar-hidden relative min-h-0 flex-1 overflow-x-hidden overflow-y-auto text-sm', 'py-3 pr-2')}
    >
      <ScrollProvider containerRef={viewRef}>{children}</ScrollProvider>
    </div>
  )
}

interface TOCItemsListProps {
  toc: TOCItemType[]
}

function TOCItemsList({ toc }: TOCItemsListProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [svg, setSvg] = useState<{
    path: string
    width: number
    height: number
  }>()

  useEffect(() => {
    if (!containerRef.current)
      return
    const container = containerRef.current

    function onResize(): void {
      if (container.clientHeight === 0)
        return
      let w = 0
      let h = 0
      const d: string[] = []

      for (let i = 0; i < toc.length; i++) {
        const element: HTMLElement | null = container.querySelector(`a[href="${toc[i].url}"]`)
        if (!element)
          continue

        const styles = getComputedStyle(element)
        const offset = getLineOffset(toc[i].depth) + 1
        const top = element.offsetTop + Number.parseFloat(styles.paddingTop)
        const bottom = element.offsetTop + element.clientHeight - Number.parseFloat(styles.paddingBottom)

        w = Math.max(offset, w)
        h = Math.max(h, bottom)

        d.push(`${i === 0 ? 'M' : 'L'}${offset} ${top}`)
        d.push(`L${offset} ${bottom}`)
      }

      setSvg({
        path: d.join(' '),
        width: w + 1,
        height: h,
      })
    }

    const observer = new ResizeObserver(onResize)
    onResize()

    observer.observe(container)
    return () => {
      observer.disconnect()
    }
  }, [toc])

  return (
    <>
      {/* SVG 曲线背景 */}
      {svg
        ? (
            <div
              className="absolute top-0 left-0"
              style={{
                width: svg.width,
                height: svg.height,
                maskImage: `url("data:image/svg+xml,${encodeURIComponent(
                  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${svg.width} ${svg.height}"><path d="${svg.path}" stroke="black" stroke-width="1" fill="none" /></svg>`,
                )}")`,
              }}
            >
              <TocThumb containerRef={containerRef} className="bg-primary mt-(--toc-top) h-(--toc-height) transition-all" />
            </div>
          )
        : null}

      {/* TOC 项列表 */}
      <div ref={containerRef} className="flex flex-col">
        {toc.map((item, i) => (
          <TOCItem key={item.url} item={item} upper={toc[i - 1]?.depth} lower={toc[i + 1]?.depth} />
        ))}
      </div>
    </>
  )
}

interface TOCItemProps {
  item: TOCItemType
  upper?: number
  lower?: number
  key?: string
}

function TOCItem({ item, upper, lower }: TOCItemProps) {
  const offset = getLineOffset(item.depth)
  const upperOffset = getLineOffset(upper ?? item.depth)
  const lowerOffset = getLineOffset(lower ?? item.depth)

  return (
    <TOCLink
      href={item.url}
      style={{
        paddingInlineStart: getItemOffset(item.depth),
      }}
      className={cn(
        'text-muted-foreground relative py-1.5 text-sm',
        'hover:text-foreground transition-colors',
        'wrap-anywhere',
        'first:pt-0 last:pb-0',
        'data-[active=true]:text-primary data-[active=true]:font-medium',
      )}
    >
      {/* 层级转换的斜线 */}
      {offset !== upperOffset
        ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="absolute -top-1.5 left-0 h-4 w-4">
              <line x1={upperOffset} y1="0" x2={offset} y2="12" className="stroke-border" strokeWidth="1" />
            </svg>
          )
        : null}

      {/* 垂直连接线 */}
      <div
        className={cn(
          'bg-border absolute inset-y-0 w-px',
          offset !== upperOffset && 'top-1.5',
          offset !== lowerOffset && 'bottom-1.5',
        )}
        style={{
          insetInlineStart: offset,
        }}
      />

      {item.title}
    </TOCLink>
  )
}

function getItemOffset(depth: number): number {
  if (depth <= 1)
    return 14
  if (depth === 2)
    return 26
  return 36
}

function getLineOffset(depth: number): number {
  return depth >= 2 ? 10 : 0
}

export interface TableOfContentsProps {
  /**
   * 可选：手动传入 TOC 数据
   * 如果不传入，则自动从页面 DOM 中提取 headings
   */
  toc?: TOCItemType[]
  /**
   * 容器样式
   */
  className?: string
  /**
   * 只允许一个激活项
   * @defaultValue false
   */
  single?: boolean
  /**
   * 要提取的 heading 选择器
   * @defaultValue '.prose h2, .prose h3'
   */
  headingSelector?: string
}

export function TableOfContents({ toc: manualToc, className, single = false, headingSelector }: TableOfContentsProps) {
  const extractedHeadings = useExtractHeadingsWithSelector(headingSelector)
  const toc = manualToc ?? extractedHeadings

  if (toc.length === 0) {
    return (
      <div className="border-border bg-card text-muted-foreground rounded-lg border p-3 text-xs">No headings found</div>
    )
  }

  return (
    <AnchorProvider toc={toc} single={single}>
      <div className={cn('flex h-full flex-col', className)}>
        <h3 className="text-muted-foreground mb-3 shrink-0 text-sm font-medium">On this page</h3>
        <TOCScrollArea>
          <TOCItemsList toc={toc} />
        </TOCScrollArea>
      </div>
    </AnchorProvider>
  )
}

export default TableOfContents
