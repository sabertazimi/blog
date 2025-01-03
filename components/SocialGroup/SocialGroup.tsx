import type { SocialColor, SocialType } from '@/types'
import SocialButton from '@/components/SocialButton'
import Space from '@/components/Space'
import { socialColors, socialList, socialQuery } from '@/config'

interface Props {
  url: string
}

function SocialGroup({ url }: Props): JSX.Element {
  return (
    <Space
      direction="vertical"
      align="center"
      size={0}
      className="fixed right-0 top-1/2 z-10 hidden -translate-y-1/2 md:visible md:inline-flex"
    >
      {Object.keys(socialList)
        .filter(social => social !== socialList.github)
        .map(social => (
          <SocialButton
            key={social}
            type={social as SocialType}
            url={`${socialQuery[social as SocialType]}${url}`}
            color={socialColors[social as SocialColor]}
          />
        ))}
    </Space>
  )
}

export default SocialGroup
