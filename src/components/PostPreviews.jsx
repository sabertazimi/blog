import React from 'react';
import {
  Pagination,
  Icon,
  Button,
  Divider,
  Container,
  Segment
} from 'semantic-ui-react';

import PostPreview from './PostPreview';
import { PRIMARY_COLOR } from '../constants';

const PostPreviews = ({ activePage, history, data, onPageChange }) => {
  const mdFiles = data;
  const totalPages = mdFiles[mdFiles.length - 1].pageId;

  return (
    <Segment style={{ padding: '8em 0em' }} vertical>
      {mdFiles
        .filter(mdFile => mdFile.pageId === activePage)
        .map((mdFile, index) => {
          return <PostPreview key={mdFile.fileName || index} mdFile={mdFile} />;
        })}
      <Container textAlign="center">
        <Pagination
          color={PRIMARY_COLOR}
          style={{ marginTop: '2em' }}
          activePage={activePage}
          onPageChange={onPageChange}
          totalPages={totalPages}
          ellipsisItem={{
            content: <Icon inverted name="ellipsis horizontal" />,
            icon: true
          }}
          firstItem={{
            content: <Icon inverted name="angle double left" />,
            icon: true
          }}
          lastItem={{
            content: <Icon inverted name="angle double right" />,
            icon: true
          }}
          prevItem={{
            content: <Icon inverted name="angle left" />,
            icon: true
          }}
          nextItem={{
            content: <Icon inverted name="angle right" />,
            icon: true
          }}
          inverted
          size="massive"
        />
      </Container>
      <Divider as="h4" className="header" style={{ margin: '3em 0em' }} />
      <Container text>
        <Button
          animated="fade"
          color={PRIMARY_COLOR}
          inverted
          size="large"
          onClick={history.goBack}
        >
          <Button.Content visible>Back</Button.Content>
          <Button.Content hidden>
            <Icon name="left arrow" />
          </Button.Content>
        </Button>
      </Container>
    </Segment>
  );
};

export default PostPreviews;
