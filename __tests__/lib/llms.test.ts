import { describe, expect, it } from 'vitest'
import { chatbotLinks, getAgentPrompt } from '@/lib/llms'

describe('chatbotLinks', () => {
  it('should have the expected chatbots', () => {
    expect(chatbotLinks).toHaveLength(2)
    expect(chatbotLinks.map(c => c.id)).toEqual([
      'claude',
      'chatgpt',
    ])
  })

  it('should generate correct Claude URL', () => {
    const claude = chatbotLinks.find(c => c.id === 'claude')
    const url = claude?.getUrl({ content: 'test content' })
    expect(url).toContain('claude.ai')
    expect(url).toContain(encodeURIComponent('test content'))
  })

  it('should generate correct ChatGPT URL', () => {
    const chatgpt = chatbotLinks.find(c => c.id === 'chatgpt')
    const url = chatgpt?.getUrl({ content: 'test content' })
    expect(url).toContain('chatgpt.com')
    expect(url).toContain(encodeURIComponent('test content'))
  })

  it('should have icons for all chatbots', () => {
    chatbotLinks.forEach((chatbot) => {
      expect(chatbot.icon).toBeDefined()
    })
  })
})

describe('getAgentPrompt', () => {
  it('should generate prompt with title and url', () => {
    const prompt = getAgentPrompt({
      title: 'Test Article',
      url: 'https://example.com/post/test',
    })

    expect(prompt).toContain('Test Article')
    expect(prompt).toContain('https://example.com/post/test')
    expect(prompt).toContain('Please read and analyze')
    expect(prompt).toContain('summary')
    expect(prompt).toContain('Key takeaways')
  })

  it('should include structured instructions', () => {
    const prompt = getAgentPrompt({
      title: 'Test',
      url: 'https://example.com',
    })

    expect(prompt).toContain('1.')
    expect(prompt).toContain('2.')
    expect(prompt).toContain('3.')
  })
})
