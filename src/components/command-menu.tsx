'use client'

import type { PostMeta } from '@/types'
import Link from 'next/link'
import { useCallback, useState } from 'react'
import * as React from 'react'

interface Props {
  posts: PostMeta[]
}

interface Option {
  value: string
  label: React.ReactNode
}

function CommandMenu({ posts }: Props) {
  const [_, setOptions] = useState<Option[]>([])

  const handleSearch = useCallback(
    (value: string) => {
      setOptions(
        value
          ? posts
              .filter(({ title }) =>
                title.toLowerCase().includes(value.toLowerCase()),
              )
              .map(({ slug, title }) => ({
                value: title,
                label: (
                  <div>
                    <Link href={`/post/${slug}`}>{title}</Link>
                  </div>
                ),
              }))
          : [],
      )
    },
    [posts],
  )

  return (
    <input onChange={e => handleSearch(e.target.value)} />
  )
}

export default CommandMenu
