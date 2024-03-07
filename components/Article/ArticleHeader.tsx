import { H1 } from '@components/Headings'
import { Calendar, ClockCircle, Edit } from '@components/Icons'
import { Slide } from '@components/Motion'
import { IconTag, LinkTag } from '@components/Tags'
import { siteConfig } from '@config'
import type { PostMeta } from '@types'
import styles from './ArticleHeader.module.css'

interface Props {
  post: PostMeta
}

const ArticleHeader = ({
  post: { title, createTime, updateTime, readingTime, tags },
}: Props): JSX.Element => (
  <div className="bg-gradient-primary w-full bg-cover bg-center bg-no-repeat p-3 md:px-32 md:pb-40 md:pt-48">
    <Slide>
      {tags ? (
        tags.map(tag => {
          return <LinkTag key={tag} tag={tag} />
        })
      ) : (
        <LinkTag href="/tags" color={siteConfig.themeColor} />
      )}
      <H1 className={styles.title}>{title}</H1>
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
)

export default ArticleHeader
