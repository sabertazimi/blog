import {
  CalendarOutlined,
  ClockCircleOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { Slide } from '@components/Motion';
import { IconTag, LinkTag } from '@components/Tags';
import { siteConfig } from '@config';
import type { PostMeta } from '@types';
import classNames from 'classnames';

interface Props {
  post: PostMeta;
}

const ArticleHeader = ({
  post: { tags, title, createTime, updateTime, timeToRead },
}: Props): JSX.Element => (
  <div
    className={classNames(
      'w-full p-3 md:px-32 md:pt-48 md:pb-40',
      'bg-center bg-no-repeat bg-cover',
      'bg-gradient-primary'
    )}
  >
    <Slide>
      {tags ? (
        tags.map(tag => {
          return <LinkTag key={tag} tag={tag} />;
        })
      ) : (
        <LinkTag href="/tags" color={siteConfig.themeColor} />
      )}
      <h1 className="my-8 text-light text-6xl md:text-8xl">{title}</h1>
      <IconTag
        tag={createTime ? new Date(createTime).toDateString() : 'Nowadays'}
        icon={<CalendarOutlined />}
      />
      <IconTag
        tag={updateTime ? new Date(updateTime).toDateString() : 'Nowadays'}
        icon={<EditOutlined />}
      />
      <IconTag tag={`${timeToRead} minutes`} icon={<ClockCircleOutlined />} />
    </Slide>
  </div>
);

export default ArticleHeader;
