'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { DotPattern } from '@/components/ui/dot-pattern'
import { cn } from '@/lib/utils'

interface PostImageProps {
  src?: string
  alt: string
  placeholder?: string
  sizes?: string
  loading?: 'lazy' | 'eager'
  unoptimized?: boolean
  hoverScale?: boolean
  className?: string
}

function PostImage({
  src,
  alt,
  placeholder,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  loading = 'lazy',
  unoptimized = false,
  hoverScale = false,
  className,
}: PostImageProps) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const hasImage = src !== undefined && src !== '' && !error

  useEffect(() => {
    setLoaded(false)
    setError(false)
  }, [src])

  return (
    <>
      {!loaded && (
        <>
          <DotPattern
            width={20}
            height={20}
            cx={1}
            cy={1}
            cr={1}
            className={cn(
              'fill-muted-foreground/20 transition-transform duration-300',
              hoverScale && 'group-hover:scale-105',
            )}
          />
          {placeholder !== undefined && placeholder !== '' && (
            <span className="text-muted-foreground absolute inset-0 flex items-center justify-center text-sm">
              {placeholder}
            </span>
          )}
        </>
      )}
      {hasImage && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          loading={loading}
          unoptimized={unoptimized}
          className={cn(
            'object-cover transition-transform duration-300',
            hoverScale && 'group-hover:scale-105',
            className,
          )}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
        />
      )}
    </>
  )
}

export default PostImage
