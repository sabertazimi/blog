import { getTranslations } from 'next-intl/server'
import LandingNav from '@/components/landing-nav'
import { GravityStarsBackground } from '@/components/ui/gravity-stars'
import { MorphingText } from '@/components/ui/morphing-text'
import { getLocale } from '@/i18n/utils'
import { siteConfig } from '@/lib/site'

interface Props {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale: getLocale(locale), namespace: 'site' })
  const landingTitles = t.raw('landingTitles') as string[]

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-8">
      <GravityStarsBackground
        starsCount={siteConfig.maxLandingStars}
        className="absolute inset-0 flex items-center justify-center rounded-xl"
      />
      <MorphingText texts={landingTitles} className="pointer-none select-none" />
      <LandingNav />
    </div>
  )
}
