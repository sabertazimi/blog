import { useTranslations } from 'next-intl'
import { FuzzyText } from '@/components/ui/fuzzy-text'

function NotFoundResult() {
  const t = useTranslations('common')

  return (
    <div
      data-testid="not-found-container"
      className="container mx-auto flex flex-1 flex-col items-center justify-center gap-6 px-6 lg:px-0"
    >
      <div role="heading" aria-level={1} aria-label="404">
        <FuzzyText fontSize="16rem">{404}</FuzzyText>
      </div>
      <div role="heading" aria-level={2} aria-label={t('notFound')}>
        <FuzzyText fontSize="4rem">{t('notFound')}</FuzzyText>
      </div>
    </div>
  )
}

export default NotFoundResult
