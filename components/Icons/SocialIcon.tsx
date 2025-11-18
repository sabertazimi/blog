import type { SocialType } from '@/types'
import {
  FacebookOutlined,
  GithubOutlined,
  LinkedinOutlined,
  RocketOutlined,
  WeiboOutlined,
  XOutlined,
} from '@ant-design/icons'
import { socialList } from '@/config'
import styles from './SocialIcon.module.css'

function SocialIcon(type: SocialType) {
  switch (type) {
    case 'github':
    case socialList.github:
      return <GithubOutlined className={styles.icon} />
    case 'twitter':
    case socialList.twitter:
      return <XOutlined className={styles.icon} />
    case 'facebook':
    case socialList.facebook:
      return <FacebookOutlined className={styles.icon} />
    case 'linkedin':
    case socialList.linkedin:
      return <LinkedinOutlined className={styles.icon} />
    case 'weibo':
    case socialList.weibo:
      return <WeiboOutlined className={styles.icon} />
    default:
      return <RocketOutlined className={styles.icon} />
  }
}

export default SocialIcon
