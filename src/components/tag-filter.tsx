'use client'

import type { TagsMeta } from '@/types'
import { ChevronDownIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import { Link } from '@/i18n/navigation'
import { cn, getTagUrl } from '@/lib/utils'

interface TagFilterProps {
  tagsMeta: TagsMeta
  selectedTag: string
}

function TagFilter({ tagsMeta: { allTags, tagCounts }, selectedTag }: TagFilterProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const t = useTranslations('post')
  const tCommon = useTranslations('common')
  const getDisplayTag = (tag: string) => (tag === 'All' ? tCommon('all') : tag)

  return (
    <>
      <div className="hidden flex-wrap gap-2 md:flex">
        {allTags.map(tag => (
          <Link
            key={tag}
            href={getTagUrl(tag)}
            className={cn(
              'flex h-8 cursor-pointer items-center rounded-lg border px-1 pl-3 text-sm transition-colors',
              selectedTag === tag
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border hover:bg-muted',
            )}
          >
            <span>{getDisplayTag(tag)}</span>
            {tagCounts?.[tag] !== undefined && tagCounts?.[tag] !== 0 && (
              <span
                className={cn(
                  'ml-2 flex h-6 min-w-6 items-center justify-center rounded-md border text-xs font-medium',
                  selectedTag === tag
                    ? 'border-border/40 dark:border-primary-foreground bg-background text-primary'
                    : 'border-border dark:border-border',
                )}
              >
                {tagCounts[tag]}
              </span>
            )}
          </Link>
        ))}
      </div>
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerTrigger className="border-border hover:bg-muted flex w-full items-center justify-between rounded-lg border px-4 py-2 transition-colors md:hidden">
          <span className="text-sm font-medium capitalize">{getDisplayTag(selectedTag)}</span>
          <ChevronDownIcon className="size-4" />
        </DrawerTrigger>
        <DrawerContent className="md:hidden">
          <DrawerHeader>
            <DrawerTitle className="text-sm font-semibold">{t('selectCategory')}</DrawerTitle>
          </DrawerHeader>
          <div className="space-y-2 px-4">
            {allTags.map(tag => (
              <Link
                key={tag}
                href={getTagUrl(tag)}
                onClick={() => setIsDrawerOpen(false)}
                className="flex w-full cursor-pointer items-center justify-between text-sm font-medium transition-colors"
              >
                <span
                  className={cn(
                    selectedTag === tag ? 'text-primary underline underline-offset-4' : 'text-muted-foreground',
                  )}
                >
                  {getDisplayTag(tag)}
                </span>
                {tagCounts?.[tag] !== undefined && tagCounts?.[tag] !== 0 && (
                  <span className="border-border ml-2 flex h-6 min-w-6 shrink-0 items-center justify-center rounded-md border">
                    {tagCounts[tag]}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default TagFilter
