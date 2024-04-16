import { axe } from 'jest-axe'
import SocialButton from './SocialButton'
import { siteConfig } from '@/config'
import type { SocialType } from '@/types'
import { render, screen } from '@/utils'

describe('SocialButton', () => {
  const mockSocials = [...Object.keys(siteConfig.socials), 'default']

  it.each(mockSocials)(
    'should render [%s] button correctly (snapshot)',
    (social) => {
      const { container } = render(
        <SocialButton
          type={social as SocialType}
          url={`https://${social}.com`}
        />,
      )

      expect(container).toMatchSnapshot()
    },
  )

  it('should render colorful button correctly (snapshot)', () => {
    const { container } = render(
      <SocialButton type="github" url="https://github.com" color="#299954" />,
    )

    expect(container).toMatchSnapshot()
  })

  it.each(mockSocials)(
    'should render [%s] button accessibility guidelines (AXE)',
    async (social) => {
      const { container } = render(
        <SocialButton
          type={social as SocialType}
          url={`https://${social}.com`}
        />,
      )

      const a11y = await axe(container)

      expect(a11y).toHaveNoViolations()
    },
  )

  it('should render colorful button accessibility guidelines (AXE)', async () => {
    const { container } = render(
      <SocialButton type="github" url="https://github.com" color="#299954" />,
    )

    const a11y = await axe(container)

    expect(a11y).toHaveNoViolations()
  })

  it.each(mockSocials)(
    'should render [%s] button with correct structure',
    (social) => {
      render(
        <SocialButton
          type={social as SocialType}
          url={`https://${social}.com`}
        />,
      )

      const link = screen.getByRole('link')
      const icon = screen.getByRole('img')

      expect(link).toBeInTheDocument()
      expect(icon).toBeInTheDocument()
      expect(link).toContainElement(icon)
    },
  )

  it.each(mockSocials)(
    'should render [%s] button with correct URL',
    (social) => {
      render(
        <SocialButton
          type={social as SocialType}
          url={`https://${social}.com`}
        />,
      )

      const link = screen.getByRole('link')

      expect(link).toHaveAttribute('href', `https://${social}.com`)
    },
  )
})
