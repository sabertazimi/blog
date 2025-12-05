'use client'

import type { Metadata } from '@/types'
import { useRouter } from '@bprogress/next/app'
import { FileTextIcon, SearchIcon, TagIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useCallback, useEffect, useState } from 'react'
import FormattedDate from '@/components/formatted-date'
import { Button } from '@/components/ui/button'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Kbd, KbdGroup } from '@/components/ui/kbd'
import { useNavigationRouter } from '@/i18n/navigation'
import { cn, getTagUrl } from '@/lib/utils'

interface CommandMenuProps {
  metadata: Metadata
}

function CommandMenu({
  metadata: {
    posts,
    tags: { allTags, tagCounts },
  },
}: CommandMenuProps) {
  const t = useTranslations('commandMenu')
  const router = useRouter({ customRouter: useNavigationRouter })
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  const normalizedSearchText = search.toLowerCase()
  const filteredPosts = posts.filter(post => post.title.toLowerCase().includes(normalizedSearchText))
  const filteredTags = allTags.filter(tag => tag.toLowerCase().includes(normalizedSearchText) && tag !== 'All')

  const runCommand = useCallback((command: () => void) => {
    setOpen(false)
    setSearch('')
    command()
  }, [])

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable)
          || e.target instanceof HTMLInputElement
          || e.target instanceof HTMLTextAreaElement
          || e.target instanceof HTMLSelectElement
        ) {
          return
        }

        e.preventDefault()
        setOpen(open => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        aria-label={t('searchLabel')}
        className="shrink-0 md:hidden"
        onClick={() => setOpen(true)}
      >
        <SearchIcon className="size-6" />
      </Button>
      <Button
        variant="outline"
        aria-label={t('searchLabel')}
        className={cn(
          'relative hidden h-8 w-full justify-start pr-12 pl-3 text-sm font-normal shadow-none md:mr-2 md:flex md:w-48 lg:w-56',
        )}
        onClick={() => setOpen(true)}
      >
        <span className="hidden lg:inline-flex">{t('searchPostsLong')}</span>
        <span className="inline-flex lg:hidden">{t('searchPostsShort')}</span>
        <KbdGroup className="absolute top-1.5 right-1.5 hidden text-[10px] sm:flex">
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen} title={t('searchLabel')} description={t('searchDescription')}>
        <CommandInput placeholder={t('searchPlaceholder')} value={search} onValueChange={setSearch} />
        <CommandList>
          <CommandEmpty>{t('noResults')}</CommandEmpty>
          {filteredPosts.length > 0 && (
            <CommandGroup heading={t('posts')}>
              {filteredPosts.map(post => (
                <CommandItem
                  key={post.slug}
                  value={post.title}
                  onSelect={() => {
                    runCommand(() => router.push(`/post/${post.slug}`))
                  }}
                >
                  <FileTextIcon />
                  <span className="line-clamp-1">{post.title}</span>
                  {post.createTime !== undefined && post.createTime !== ''
                    ? (
                        <FormattedDate date={post.createTime} className="text-muted-foreground ml-auto text-xs" />
                      )
                    : null}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
          {filteredTags.length > 0 && (
            <CommandGroup heading={t('tags')}>
              {filteredTags.map(tag => (
                <CommandItem
                  key={tag}
                  value={tag}
                  onSelect={() => {
                    runCommand(() => router.push(getTagUrl(tag)))
                  }}
                >
                  <TagIcon />
                  <span className="line-clamp-1">{tag}</span>
                  <span className="border-border text-muted-foreground ml-auto flex h-5 min-w-5 items-center justify-center rounded-sm border text-xs font-medium">
                    {tagCounts[tag]}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
        <div className="border-border text-muted-foreground flex items-center justify-center gap-3 border-t p-3 text-xs">
          <KbdGroup>
            <Kbd>↑</Kbd>
            <Kbd>↓</Kbd>
            <span>{t('navigate')}</span>
          </KbdGroup>
          <KbdGroup>
            <Kbd>⏎</Kbd>
            <span>{t('select')}</span>
          </KbdGroup>
          <KbdGroup>
            <Kbd>Esc</Kbd>
            <span>{t('close')}</span>
          </KbdGroup>
        </div>
      </CommandDialog>
    </>
  )
}

export default CommandMenu
