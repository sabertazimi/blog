import { LinkTag } from '@components/Tags'
import { colors, getColorByName, siteConfig } from '@config'
import type { Tag, TagsType } from '@types'

interface Props {
  tags: TagsType
  activeTag?: Tag
}

function TagsCloud({ tags, activeTag }: Props): JSX.Element {
  let tagsList = Object.keys(tags).sort((a, b) => {
    // eslint-disable-next-line security/detect-object-injection -- key is safe.
    return tags[b] - tags[a]
  })

  if (activeTag)
    tagsList = tagsList.filter(tag => tag !== activeTag)

  return (
    <div>
      {activeTag
        ? (
          <LinkTag tag={activeTag} className="md:mb-3 md:text-lg" />
          )
        : null}
      {tagsList.map(tag => (
        <LinkTag
          key={tag}
          // eslint-disable-next-line security/detect-object-injection -- key is safe.
          tag={`${tag} ${tags[tag]}`}
          href={`/tag/${tag}`}
          color={activeTag ? colors.gray : getColorByName(tag)}
          className="md:mb-3 md:text-lg"
        />
      ))}
      {activeTag
        ? (
          <LinkTag
            tag="All"
            href="/tags"
            color={siteConfig.themeColor}
            className="md:mb-3 md:text-lg"
          />
          )
        : null}
    </div>
  )
}

export default TagsCloud
