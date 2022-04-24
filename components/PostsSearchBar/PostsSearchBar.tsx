import { SearchOutlined } from '@ant-design/icons';
import type { PostMetaType } from '@types';
import { AutoComplete, Input } from 'antd';
import Link from 'next/link';
import type { ReactNode } from 'react';
import React, { useCallback, useState } from 'react';

interface Props {
  posts: PostMetaType[];
}

interface Option {
  value: string;
  label: ReactNode;
}

const PostsSearchBar = ({ posts }: Props): JSX.Element => {
  const [options, setOptions] = useState<Option[]>([]);

  const handleSearch = useCallback(
    (value: string) => {
      setOptions(
        value
          ? posts
              .filter(({ title }) =>
                title.toLowerCase().includes(value.toLowerCase())
              )
              .map(({ slug, title }) => ({
                value: title,
                label: (
                  <div>
                    <Link href={`/post/${slug}`}>
                      <a>{title}</a>
                    </Link>
                  </div>
                ),
              }))
          : []
      );
    },
    [posts]
  );

  return (
    <AutoComplete
      className="flex-container"
      options={options}
      onSearch={handleSearch}
    >
      <Input
        allowClear
        placeholder="Search Posts ..."
        prefix={<SearchOutlined />}
      />
    </AutoComplete>
  );
};

export default PostsSearchBar;
