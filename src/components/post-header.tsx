import type { Post } from '@/types'
import { ArrowLeftIcon } from 'lucide-react'
import PostMetadata from '@/components/post-metadata'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import { getTagUrl } from '@/lib/utils'

interface PostHeaderProps {
  postData?: Post
}

function PostHeader({ postData }: PostHeaderProps) {
  return (
    <div className="text-muted-foreground flex flex-wrap items-center gap-3 gap-y-5 text-sm">
      <Button variant="outline" asChild className="size-6">
        <Link href="/posts">
          <ArrowLeftIcon className="size-4" />
          <span className="sr-only">Back to all articles</span>
        </Link>
      </Button>
      {postData?.tags && postData?.tags.length > 0 && (
        <div className="text-muted-foreground flex flex-wrap gap-3">
          {postData?.tags.map((tag: string) => (
            <Button key={tag} variant="outline" asChild className="h-6 px-3">
              <Link href={getTagUrl(tag)}>{tag}</Link>
            </Button>
          ))}
        </div>
      )}
      <PostMetadata createTime={postData?.createTime} updateTime={postData?.updateTime} readingTime={postData?.readingTime} />
    </div>
  )
}

export default PostHeader
