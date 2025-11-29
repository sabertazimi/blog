import { getTranslations, setRequestLocale } from 'next-intl/server'
import LandingNav from '@/components/landing-nav'
import { GravityStarsBackground } from '@/components/ui/gravity-stars'
import { MorphingText } from '@/components/ui/morphing-text'
import { resolveLocale } from '@/i18n/utils'
import { siteConfig } from '@/lib/site'

interface HomePageProps {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params
  const resolvedLocale = resolveLocale(locale)
  setRequestLocale(resolvedLocale)
  const t = await getTranslations({ locale: resolvedLocale, namespace: 'site' })
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
