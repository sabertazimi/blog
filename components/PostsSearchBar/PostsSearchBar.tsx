import AutoComplete from '@components/AutoComplete'
import Input from '@components/Input'
import Link from '@components/Link'
import type { PostMeta } from '@types'
import type { ReactNode } from 'react'
import { useCallback, useState } from 'react'

interface Props {
  posts: PostMeta[]
}

interface Option {
  value: string
  label: ReactNode
}

function PostsSearchBar({ posts }: Props): JSX.Element {
  const [options, setOptions] = useState<Option[]>([])

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
    <AutoComplete options={options} onSearch={handleSearch}>
      <Input.Search
        allowClear
        enterButton="Search"
        placeholder="Search Posts ..."
      />
    </AutoComplete>
  )
}

export default PostsSearchBar
