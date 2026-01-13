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
  const mockTranslations = {
    promptIntro: 'Please read and analyze the following article:',
    promptTitle: 'Title',
    promptUrl: 'URL',
    promptRequest: 'Please provide:',
    promptItem1: 'A brief summary of the main points',
    promptItem2: 'Key takeaways and insights',
    promptItem3: 'Any questions or areas that need clarification',
  }

  it('should generate prompt with title and url', () => {
    const prompt = getAgentPrompt({
      title: 'Test Article',
      url: 'https://example.com/post/test',
      translations: mockTranslations,
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
      translations: mockTranslations,
    })

    expect(prompt).toContain('1.')
    expect(prompt).toContain('2.')
    expect(prompt).toContain('3.')
  })

  it('should use translated strings', () => {
    const chineseTranslations = {
      promptIntro: '请阅读并分析以下文章：',
      promptTitle: '标题',
      promptUrl: '链接',
      promptRequest: '请提供：',
      promptItem1: '主要观点的简要总结',
      promptItem2: '关键要点和见解',
      promptItem3: '任何需要澄清的问题或领域',
    }

    const prompt = getAgentPrompt({
      title: 'Test Article',
      url: 'https://example.com/post/test',
      translations: chineseTranslations,
    })

    expect(prompt).toContain('请阅读并分析以下文章')
    expect(prompt).toContain('标题')
    expect(prompt).toContain('链接')
  })
})
