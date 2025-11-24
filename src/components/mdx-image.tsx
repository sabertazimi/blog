import PostImage from '@/components/post-image'
import { cn } from '@/lib/utils'

interface MDXImageProps {
  src?: string
  alt?: string
  title?: string
  className?: string
  width?: number
  height?: number
}

function MDXImage({ src, alt = 'Image', title, className }: MDXImageProps) {
  return (
    <span className="block space-y-2 text-center">
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
        <span className="text-muted-foreground line-clamp-3 text-sm">{title}</span>
      )}
    </span>
  )
}

export default MDXImage
