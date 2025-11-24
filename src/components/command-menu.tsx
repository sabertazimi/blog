'use client'

import type { Metadata } from '@/types'
import { FileTextIcon, TagIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
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
import { cn, formatDate, getTagUrl } from '@/lib/utils'

interface CommandMenuProps {
  metadata: Metadata
}

function CommandMenu({
  metadata: {
    posts,
    tags: { allTags, tagCounts },
  },
}: CommandMenuProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  const normalizedSearchText = search.toLowerCase()
  const filteredPosts = posts.filter(post => post.title.toLowerCase().includes(normalizedSearchText))
  const filteredTags = allTags.filter(tag => tag.toLowerCase().includes(normalizedSearchText))

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
        variant="outline"
        className={cn('relative h-8 w-full justify-start pr-12 pl-3 text-sm font-normal shadow-none md:w-48 lg:w-56')}
        onClick={() => setOpen(true)}
      >
        <span className="hidden lg:inline-flex">Search posts...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <KbdGroup className="absolute top-1.5 right-1.5 hidden text-[10px] sm:flex">
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Search posts and tags"
        description="Search for posts by title or tags"
      >
        <CommandInput placeholder="Search posts or tags..." value={search} onValueChange={setSearch} />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {filteredPosts.length > 0 && (
            <CommandGroup heading="Posts">
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
                        <time dateTime={post.createTime} className="text-muted-foreground ml-auto text-xs">
                          {formatDate(post.createTime)}
                        </time>
                      )
                    : null}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
          {filteredTags.length > 0 && (
            <CommandGroup heading="Tags">
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
                  <span className="border-border text-muted-foreground ml-auto flex h-5 min-w-5 items-center justify-center rounded border text-xs font-medium">
                    {tagCounts[tag]}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
        <div className="border-border text-muted-foreground flex items-center justify-center gap-3 border-t px-3 py-2 text-xs">
          <div className="flex items-center gap-1">
            <Kbd>↑</Kbd>
            <Kbd>↓</Kbd>
            <span>Navigate</span>
          </div>
          <div className="flex items-center gap-1">
            <Kbd>⏎</Kbd>
            <span>Select</span>
          </div>
          <div className="flex items-center gap-1">
            <Kbd>Esc</Kbd>
            <span>Close</span>
          </div>
        </div>
      </CommandDialog>
    </>
  )
}

export default CommandMenu
