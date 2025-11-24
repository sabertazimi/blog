'use client'

import { Share2Icon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { shareLinks } from '@/lib/social'

interface PostShareProps {
  url: string
  title: string
}

function PostShare({ url, title }: PostShareProps) {
  const handleShare = (shareUrl: string) => {
    window.open(shareUrl, '_blank', 'noopener,noreferrer,width=600,height=400')
  }

  return (
    <div className="flex items-center justify-center gap-4">
      <Share2Icon className="text-muted-foreground size-5" />
      <TooltipProvider>
        <div className="flex items-center gap-2">
          {shareLinks.map((link) => {
            const Icon = link.icon
            const shareUrl = link.getShareUrl({ url, title })
            return (
              <Tooltip key={link.name}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-accent hover:text-accent-foreground size-9"
                    onClick={() => handleShare(shareUrl)}
                    aria-label={`Share on ${link.name}`}
                  >
                    <Icon className="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{`Share on ${link.name}`}</p>
                </TooltipContent>
              </Tooltip>
            )
          })}
        </div>
      </TooltipProvider>
    </div>
  )
}

export default PostShare
