import type { BuildTime, SocialType } from '@/types'
import { SiFacebook, SiGithub, SiSinaweibo, SiX } from '@icons-pack/react-simple-icons'
import { Separator } from '@/components/ui/separator'
import { socialColors } from '@/lib/colors'
import { siteConfig } from '@/lib/site'
import { socialList } from '@/lib/social'
import { cn } from '@/lib/utils'

interface Props {
  buildTime: BuildTime
}

const socialIcons: Record<SocialType, React.ComponentType<{ className?: string }>> = {
  github: SiGithub,
  x: SiX,
  facebook: SiFacebook,
  weibo: SiSinaweibo,
}

function SiteFooter({ buildTime }: Props) {
  const buildDate = new Date(buildTime)
  const formattedTime = buildDate.toLocaleString('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-center gap-4">
          {(Object.keys(socialList) as SocialType[]).map((social) => {
            // eslint-disable-next-line security/detect-object-injection -- social is safe
            const Icon = socialIcons[social]
            // eslint-disable-next-line security/detect-object-injection -- social is safe
            const username = siteConfig.socials[social]
            // eslint-disable-next-line security/detect-object-injection -- social is safe
            const hoverColor = socialColors[social]
            const url = `https://${social}.com/${username}`

            return (
              <a
                key={social}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'dark:hover:text-foreground text-muted-foreground transition-colors hover:text-(--social-color)',
                  'inline-flex items-center justify-center',
                )}
                style={{
                  ['--social-color' as string]: hoverColor,
                }}
                aria-label={social}
              >
                <Icon className="size-5" />
              </a>
            )
          })}
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col items-center justify-center gap-4 text-center md:flex-row md:gap-6">
          <div className="text-muted-foreground text-sm">
            Copyright ©
            {' '}
            {new Date().getFullYear()}
            {' '}
            <a
              href={`https://${socialList.github}.com/${siteConfig.socials.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground decoration-muted-foreground/30 underline underline-offset-4 transition-colors hover:decoration-current"
            >
              {siteConfig.author}
            </a>
          </div>
          <Separator orientation="vertical" className="hidden h-4 md:block" />
          <div className="text-muted-foreground text-sm">
            Built with
            {' '}
            <a
              href="https://react.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground decoration-muted-foreground/30 underline underline-offset-4 transition-colors hover:decoration-current"
            >
              React
            </a>
            {' '}
            and
            {' '}
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground decoration-muted-foreground/30 underline underline-offset-4 transition-colors hover:decoration-current"
            >
              Next.js
            </a>
          </div>
          <Separator orientation="vertical" className="hidden h-4 md:block" />
          <span className="text-muted-foreground text-sm">
            Last built on
            {' '}
            <a
              href="https://github.com/sabertazimi/blog/actions"
              className="hover:text-foreground decoration-muted-foreground/30 underline underline-offset-4 transition-colors hover:decoration-current"
              target="_blank"
              rel="noopener noreferrer"
            >
              <time dateTime={buildDate.toISOString()}>{formattedTime}</time>
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter
