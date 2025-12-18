'use client'

import { Share2Icon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { shareLinks } from '@/lib/social'

interface PostShareProps {
  url: string
  title: string
}

export function PostShare({ url, title }: PostShareProps) {
  const t = useTranslations('share')

  const handleShare = (shareUrl: string) => {
    window.open(shareUrl, '_blank', 'noopener,noreferrer,width=600,height=400')
  }

  return (
    <div data-testid="post-share-container" className="flex items-center justify-center gap-4">
      <Share2Icon className="text-muted-foreground size-5" />
      <TooltipProvider>
        <div className="flex items-center gap-2">
          {shareLinks.map((link) => {
            const Icon = link.icon
            const shareUrl = link.getShareUrl({ url, title })
            const shareLabel = t('shareOn', { platform: link.name })

            return (
              <Tooltip key={link.name}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-accent hover:text-accent-foreground size-9"
                    onClick={() => handleShare(shareUrl)}
                    aria-label={shareLabel}
                  >
                    <Icon className="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{shareLabel}</p>
                </TooltipContent>
              </Tooltip>
            )
          })}
        </div>
      </TooltipProvider>
    </div>
  )
}
