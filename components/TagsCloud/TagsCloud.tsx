import { LinkTag } from '@components/Tags'
import { colors, getColorByName, siteConfig } from '@config'
import type { Tag, Tags } from '@types'

interface Props {
  tags: Tags
  activeTag?: Tag
}

const TagsCloud = ({ tags, activeTag }: Props): JSX.Element => {
  let tagsList = Object.keys(tags).sort((a, b) => {
    return tags[b] - tags[a]
  })

  if (activeTag) {
    tagsList = tagsList.filter(tag => tag !== activeTag)
  }

  return (
    <div>
      {activeTag ? (
        <LinkTag tag={activeTag} className="md:mb-3 md:text-lg" />
      ) : null}
      {tagsList.map(tag => (
        <LinkTag
          key={tag}
          tag={`${tag} ${tags[tag]}`}
          href={`/tag/${tag}`}
          color={activeTag ? colors.gray : getColorByName(tag)}
          className="md:mb-3 md:text-lg"
        />
      ))}
      {activeTag ? (
        <LinkTag
          tag="All"
          href="/tags"
          color={siteConfig.themeColor}
          className="md:mb-3 md:text-lg"
        />
      ) : null}
    </div>
  )
}

export default TagsCloud
