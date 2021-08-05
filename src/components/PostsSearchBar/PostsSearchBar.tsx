import React, { ReactNode, useState, useCallback } from 'react';
import { Link } from 'gatsby';
import { Input, AutoComplete } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { PostMetaType } from '@types';

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
              .filter((post) =>
                post.title.toLowerCase().includes(value.toLowerCase())
              )
              .map((post) => ({
                value: post.title,
                label: (
                  <div>
                    <Link to={`${post.slug}`}>{post.title}</Link>
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
