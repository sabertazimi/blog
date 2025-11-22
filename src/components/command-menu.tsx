'use client'

import type { PostMeta } from '@/types'
import { FileTextIcon } from 'lucide-react'
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
import { cn, formatDate } from '@/lib/utils'

interface Props {
  posts: PostMeta[]
}

function CommandMenu({ posts }: Props) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  const filteredPosts = posts.filter(post => post.title.toLowerCase().includes(search.toLowerCase()))

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
        <kbd className="bg-muted pointer-events-none absolute top-1.5 right-1.5 hidden h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none sm:flex">
          <span className="text-xs">⌘</span>
          K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen} title="Search posts" description="Search for posts by title">
        <CommandInput placeholder="Search posts..." value={search} onValueChange={setSearch} />
        <CommandList>
          <CommandEmpty>No posts found.</CommandEmpty>
          {filteredPosts.length > 0 && (
            <CommandGroup heading={search ? 'Search Results' : 'All Posts'}>
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
                        <time dateTime={post.createTime} className="text-muted-foreground ml-auto text-xs">{formatDate(post.createTime)}</time>
                      )
                    : null}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
}

export default CommandMenu
