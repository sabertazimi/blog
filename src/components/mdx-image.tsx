import { PostImage } from '@/components/post-image'
import { cn } from '@/lib/utils'

interface MDXImageProps {
  src?: string
  alt?: string
  title?: string
  className?: string
  width?: number
  height?: number
}

export function MDXImage({ src, alt = 'Image', title, className }: MDXImageProps) {
  return (
    <figure className="prose-img:m-0 text-center">
      <span className="relative block h-128 w-full overflow-hidden">
        <PostImage
          src={src}
          alt={alt}
          placeholder="No Image Available"
          unoptimized
          className={cn('object-contain', className)}
        />
      </span>
      {title !== undefined && title !== '' && (
        <figcaption data-testid="mdx-image-title" className="line-clamp-3">
          {title}
        </figcaption>
      )}
    </figure>
  )
}
