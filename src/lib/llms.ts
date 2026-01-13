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

function getAgentPrompt(params: { title: string, url: string }): string {
  return `Please read and analyze the following article:

Title: ${params.title}
URL: ${params.url}

Please provide:
1. A brief summary of the main points
2. Key takeaways and insights
3. Any questions or areas that need clarification`
}

export { chatbotLinks, getAgentPrompt }
export type { ChatbotLink }
