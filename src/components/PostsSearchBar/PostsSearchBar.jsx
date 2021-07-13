import React, { useState, useCallback } from 'react';
import { Link } from 'gatsby';
import { Input, AutoComplete } from 'antd';
import { usePostsMetadata } from '@/hooks';

const PostsSearchBar = () => {
  const { posts } = usePostsMetadata();
  const [options, setOptions] = useState([]);

  const handleSearch = useCallback(
    (value) => {
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
      style={{ width: '100%' }}
      options={options}
      onSearch={handleSearch}
    >
      <Input.Search allowClear enterButton placeholder="Search Posts ..." />
    </AutoComplete>
  );
};

export default PostsSearchBar;
