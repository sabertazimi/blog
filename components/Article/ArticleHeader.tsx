import { H1 } from '@components/Headings';
import { Calendar, ClockCircle, Edit } from '@components/Icons';
import { Slide } from '@components/Motion';
import { IconTag, LinkTag } from '@components/Tags';
import { classNames } from '@components/utils';
import { siteConfig } from '@config';
import type { PostMeta } from '@types';

interface Props {
  post: PostMeta;
}

const ArticleHeader = ({
  post: { title, createTime, updateTime, readingTime, tags },
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
      <H1 className="my-8 text-light text-6xl md:text-8xl">{title}</H1>
      <IconTag
        tag={createTime ? new Date(createTime).toDateString() : 'Nowadays'}
        icon={<Calendar />}
      />
      <IconTag
        tag={updateTime ? new Date(updateTime).toDateString() : 'Nowadays'}
        icon={<Edit />}
      />
      <IconTag tag={`${readingTime} minutes`} icon={<ClockCircle />} />
    </Slide>
  </div>
);

export default ArticleHeader;
