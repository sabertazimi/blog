'use client'

import Image from 'next/image'
import { useState } from 'react'
import { DotPattern } from '@/components/ui/dot-pattern'
import { cn } from '@/lib/utils'

interface PostThumbnailImageProps {
  src?: string
  alt: string
  enableHoverScale?: boolean
}

function PostThumbnailImage({ src, alt, enableHoverScale = true }: PostThumbnailImageProps) {
  const [error, setError] = useState(false)
  const hasThumbnail = src !== undefined && src !== '' && !error

  return (
    <>
      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className={cn(
          'fill-muted-foreground/20 transition-transform duration-300',
          enableHoverScale && 'group-hover:scale-105',
        )}
      />
      {hasThumbnail && (
        <Image
          src={src}
          alt={alt}
          fill
          className={cn('object-cover transition-transform duration-300', enableHoverScale && 'group-hover:scale-105')}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={() => setError(true)}
        />
      )}
    </>
  )
}

export default PostThumbnailImage
