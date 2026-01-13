import type { Post } from '@/types'
import { ArrowLeftIcon } from 'lucide-react'
import { PostAgentActions } from '@/components/post-agent-actions'
import { PostMetadata } from '@/components/post-metadata'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import { siteConfig } from '@/lib/site'
import { getTagUrl } from '@/lib/utils'

interface PostHeaderProps {
  postData?: Post
  locale: string
}

export function PostHeader({ postData, locale }: PostHeaderProps) {
  return (
    <div className="flex flex-col gap-5">
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
        <PostMetadata
          createTime={postData?.createTime}
          updateTime={postData?.updateTime}
          readingTime={postData?.readingTime}
        />
      </div>
      {postData && (
        <PostAgentActions url={`${siteConfig.url}/${locale}/post/${postData.slug}`} title={postData.title} />
      )}
    </div>
  )
}
