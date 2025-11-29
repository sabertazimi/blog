import { describe, expect, it } from 'vitest'
import { shareLinks, socialLinks } from '@/lib/social'

describe('socialLinks', () => {
  it('should have correct structure', () => {
    expect(socialLinks).toHaveProperty('github')
    expect(socialLinks).toHaveProperty('x')
    expect(socialLinks).toHaveProperty('facebook')
    expect(socialLinks).toHaveProperty('weibo')
  })

  it('should have correct GitHub link', () => {
    expect(socialLinks.github.name).toBe('GitHub')
    expect(socialLinks.github.url).toContain('github.com')
    expect(socialLinks.github.icon).toBeDefined()
  })

  it('should have correct X link', () => {
    expect(socialLinks.x.name).toBe('X')
    expect(socialLinks.x.url).toContain('x.com')
    expect(socialLinks.x.icon).toBeDefined()
  })

  it('should have correct Facebook link', () => {
    expect(socialLinks.facebook.name).toBe('Facebook')
    expect(socialLinks.facebook.url).toContain('facebook.com')
    expect(socialLinks.facebook.icon).toBeDefined()
  })

  it('should have correct Weibo link', () => {
    expect(socialLinks.weibo.name).toBe('Weibo')
    expect(socialLinks.weibo.url).toContain('weibo.com')
    expect(socialLinks.weibo.icon).toBeDefined()
  })
})

describe('shareLinks', () => {
  it('should have 3 share platforms', () => {
    expect(shareLinks).toHaveLength(3)
  })

  it('should generate correct X share URL', () => {
    const xShare = shareLinks.find(link => link.name === 'X')
    expect(xShare).toBeDefined()

    if (xShare) {
      const url = 'https://example.com/post'
      const title = 'Test Post Title'
      const shareUrl = xShare.getShareUrl({ url, title })

      expect(shareUrl).toContain('x.com/intent/tweet')
      expect(shareUrl).toContain(encodeURIComponent(url))
      expect(shareUrl).toContain(encodeURIComponent(title))
    }
  })

  it('should generate correct X share URL without title', () => {
    const xShare = shareLinks.find(link => link.name === 'X')
    expect(xShare).toBeDefined()

    if (xShare) {
      const url = 'https://example.com/post'
      const shareUrl = xShare.getShareUrl({ url })

      expect(shareUrl).toContain('x.com/intent/tweet')
      expect(shareUrl).toContain(encodeURIComponent(url))
    }
  })

  it('should generate correct Facebook share URL', () => {
    const fbShare = shareLinks.find(link => link.name === 'Facebook')
    expect(fbShare).toBeDefined()

    if (fbShare) {
      const url = 'https://example.com/post'
      const shareUrl = fbShare.getShareUrl({ url })

      expect(shareUrl).toContain('facebook.com/sharer.php')
      expect(shareUrl).toContain(encodeURIComponent(url))
    }
  })

  it('should generate correct Weibo share URL', () => {
    const weiboShare = shareLinks.find(link => link.name === 'Weibo')
    expect(weiboShare).toBeDefined()

    if (weiboShare) {
      const url = 'https://example.com/post'
      const title = '测试文章标题'
      const shareUrl = weiboShare.getShareUrl({ url, title })

      expect(shareUrl).toContain('weibo.com/share/share.php')
      expect(shareUrl).toContain(encodeURIComponent(url))
      expect(shareUrl).toContain(encodeURIComponent(title))
    }
  })

  it('should generate correct Weibo share URL without title', () => {
    const weiboShare = shareLinks.find(link => link.name === 'Weibo')
    expect(weiboShare).toBeDefined()

    if (weiboShare) {
      const url = 'https://example.com/post'
      const shareUrl = weiboShare.getShareUrl({ url })

      expect(shareUrl).toContain('weibo.com/share/share.php')
      expect(shareUrl).toContain(encodeURIComponent(url))
    }
  })

  it('should have icon for each share platform', () => {
    shareLinks.forEach((link) => {
      expect(link.icon).toBeDefined()
      expect(link.name).toBeDefined()
      expect(link.getShareUrl).toBeTypeOf('function')
    })
  })
})
