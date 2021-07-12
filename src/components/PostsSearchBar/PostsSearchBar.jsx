import React, { useState, useCallback } from 'react';
import { Link } from 'gatsby';
import { Icon, Input, AutoComplete } from 'antd';

const PostsSearchBar = ({ posts }) => {
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
      placeholder="Search Posts"
      optionLabelProp="text"
    >
      <Input suffix={<Icon type="search" />} />
    </AutoComplete>
  );
};

export default PostsSearchBar;
