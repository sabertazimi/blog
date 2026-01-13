import {
  SiClaude,
  SiOpenai,
} from '@icons-pack/react-simple-icons'

interface ChatbotLink {
  name: string
  id: string
  icon: React.ComponentType<{ className?: string }>
  getUrl: (params: { content: string }) => string
}

interface AgentPromptTranslations {
  promptIntro: string
  promptTitle: string
  promptUrl: string
  promptRequest: string
  promptItem1: string
  promptItem2: string
  promptItem3: string
}

const chatbotLinks: ChatbotLink[] = [
  {
    name: 'Claude',
    id: 'claude',
    icon: SiClaude,
    getUrl: ({ content }) =>
      `https://claude.ai/new?q=${encodeURIComponent(content)}`,
  },
  {
    name: 'ChatGPT',
    id: 'chatgpt',
    icon: SiOpenai,
    getUrl: ({ content }) =>
      `https://chatgpt.com/?q=${encodeURIComponent(content)}`,
  },
]

function getAgentPrompt(params: { title: string, url: string, translations: AgentPromptTranslations }): string {
  const { title, url, translations: t } = params
  return `${t.promptIntro}

${t.promptTitle}: ${title}
${t.promptUrl}: ${url}

${t.promptRequest}
1. ${t.promptItem1}
2. ${t.promptItem2}
3. ${t.promptItem3}`
}

export { chatbotLinks, getAgentPrompt }
export type { AgentPromptTranslations, ChatbotLink }
