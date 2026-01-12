import { describe, expect, it } from 'vitest'
import { chatbotLinks, getAgentPrompt } from '@/lib/llms'

describe('chatbotLinks', () => {
  it('should have the expected chatbots', () => {
    expect(chatbotLinks).toHaveLength(5)
    expect(chatbotLinks.map(c => c.id)).toEqual([
      'chatgpt',
      'claude',
      'gemini',
      'deepseek',
      'kimi',
    ])
  })

  it('should generate correct ChatGPT URL', () => {
    const chatgpt = chatbotLinks.find(c => c.id === 'chatgpt')
    const url = chatgpt?.getUrl({ content: 'test content', title: 'Test Title' })
    expect(url).toContain('chatgpt.com')
    expect(url).toContain(encodeURIComponent('test content'))
  })

  it('should generate correct Claude URL', () => {
    const claude = chatbotLinks.find(c => c.id === 'claude')
    const url = claude?.getUrl({ content: 'test content', title: 'Test Title' })
    expect(url).toContain('claude.ai')
    expect(url).toContain(encodeURIComponent('test content'))
  })

  it('should generate correct Gemini URL', () => {
    const gemini = chatbotLinks.find(c => c.id === 'gemini')
    const url = gemini?.getUrl({ content: 'test content', title: 'Test Title' })
    expect(url).toContain('gemini.google.com')
    expect(url).toContain(encodeURIComponent('test content'))
  })

  it('should generate correct DeepSeek URL', () => {
    const deepseek = chatbotLinks.find(c => c.id === 'deepseek')
    const url = deepseek?.getUrl({ content: 'test content', title: 'Test Title' })
    expect(url).toContain('chat.deepseek.com')
    expect(url).toContain(encodeURIComponent('test content'))
  })

  it('should generate correct Kimi URL', () => {
    const kimi = chatbotLinks.find(c => c.id === 'kimi')
    const url = kimi?.getUrl({ content: 'test content', title: 'Test Title' })
    expect(url).toContain('kimi.moonshot.cn')
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
