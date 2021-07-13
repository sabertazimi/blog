import React, { useState, useCallback } from 'react';
import { Link } from 'gatsby';
import { Input, AutoComplete } from 'antd';
import { usePostsMetadata } from '@/hooks';

const PostsSearchBar = () => {
  const { posts } = usePostsMetadata();
  const [data, setData] = useState([]);

  const handleSearch = useCallback(
    (value) => {
      setData(
        value
          ? posts.filter((post) =>
              post.title.toLowerCase().includes(value.toLowerCase())
            )
          : []
      );
    },
    [posts]
  );

  const renderOption = (post) => (
    <AutoComplete.Option key={post.title} text={post.title}>
      <Link to={`${post.slug}`}>{post.title}</Link>
    </AutoComplete.Option>
  );

  return (
    <AutoComplete
      size="large"
      style={{ width: '100%' }}
      dataSource={data.map(renderOption)}
      onSearch={handleSearch}
      optionLabelProp="text"
    >
      <Input.Search
        size="large"
        allowClear
        enterButton="Search"
        placeholder="Search Posts ..."
      />
    </AutoComplete>
  );
};

export default PostsSearchBar;
