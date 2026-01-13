'use client'

import { CodeIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { chatbotLinks, getAgentPrompt } from '@/lib/llms'
import { cn } from '@/lib/utils'

interface PostAgentActionsProps {
  url: string
  title: string
}

export function PostAgentActions({ url, title }: PostAgentActionsProps) {
  const t = useTranslations('agent')
  const [isCopied, setIsCopied] = useState(false)

  const getPromptTranslations = () => ({
    promptIntro: t('promptIntro'),
    promptTitle: t('promptTitle'),
    promptUrl: t('promptUrl'),
    promptRequest: t('promptRequest'),
    promptItem1: t('promptItem1'),
    promptItem2: t('promptItem2'),
    promptItem3: t('promptItem3'),
  })

  const handleCopyForAgent = () => {
    const prompt = getAgentPrompt({ title, url, translations: getPromptTranslations() })

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
      const prompt = getAgentPrompt({ title, url, translations: getPromptTranslations() })
      const chatbotUrl = chatbot.getUrl({ content: prompt })
      window.open(chatbotUrl, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div data-testid="post-agent-actions" className="flex flex-wrap items-center gap-3">
      {chatbotLinks.map((chatbot) => {
        const Icon = chatbot.icon
        return (
          <Button
            key={chatbot.id}
            variant="outline"
            className="h-9 gap-2 px-4"
            onClick={() => handleOpenChatbot(chatbot.id)}
          >
            <Icon className="size-4" />
            <span>{t('readWith', { chatbot: chatbot.name })}</span>
          </Button>
        )
      })}
      <Button
        variant="outline"
        className={cn('h-9 gap-2 px-4', isCopied && 'text-green-500')}
        onClick={handleCopyForAgent}
      >
        <CodeIcon className="size-4" />
        <span>{isCopied ? t('copied') : t('copyForAgent')}</span>
      </Button>
    </div>
  )
}
