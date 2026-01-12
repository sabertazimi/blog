'use client'

import { BotIcon, CopyIcon, ExternalLinkIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { chatbotLinks, getAgentPrompt } from '@/lib/llms'
import { cn } from '@/lib/utils'

interface PostAgentActionsProps {
  url: string
  title: string
}

export function PostAgentActions({ url, title }: PostAgentActionsProps) {
  const t = useTranslations('agent')
  const [isCopied, setIsCopied] = useState(false)

  const handleCopyForAgent = () => {
    const prompt = getAgentPrompt({ title, url })

    navigator.clipboard
      .writeText(prompt)
      .then(() => {
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000)
      })
      .catch((error: unknown) => {
        console.error('[PostAgentActions] Failed to copy to clipboard', error)
      })
  }

  const handleOpenChatbot = (chatbotId: string) => {
    const chatbot = chatbotLinks.find(c => c.id === chatbotId)

    if (chatbot) {
      const prompt = getAgentPrompt({ title, url })
      const chatbotUrl = chatbot.getUrl({ content: prompt, title })
      window.open(chatbotUrl, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div data-testid="post-agent-actions" className="flex items-center justify-center gap-4">
      <BotIcon className="text-muted-foreground size-5" />
      <TooltipProvider>
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-accent hover:text-accent-foreground size-9"
                onClick={handleCopyForAgent}
                aria-label={t('copyForAgent')}
              >
                <CopyIcon className={cn('size-4', isCopied && 'text-green-500')} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isCopied ? t('copied') : t('copyForAgent')}</p>
            </TooltipContent>
          </Tooltip>

          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-accent hover:text-accent-foreground size-9"
                    aria-label={t('readWithChatbot')}
                  >
                    <ExternalLinkIcon className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t('readWithChatbot')}</p>
              </TooltipContent>
            </Tooltip>
            <DropdownMenuContent align="center">
              {chatbotLinks.map((chatbot) => {
                const Icon = chatbot.icon
                return (
                  <DropdownMenuItem
                    key={chatbot.id}
                    onClick={() => handleOpenChatbot(chatbot.id)}
                    className="cursor-pointer"
                  >
                    <Icon className="mr-2 size-4" />
                    <span>{t('readWith', { chatbot: chatbot.name })}</span>
                  </DropdownMenuItem>
                )
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TooltipProvider>
    </div>
  )
}
