import {
  FacebookOutlined,
  GithubOutlined,
  LinkedinOutlined,
  RocketOutlined,
  WeiboOutlined,
  XOutlined,
} from '@ant-design/icons'
import { socialList } from '@config'
import type { SocialType } from '@types'
import styles from './SocialIcon.module.css'

function SocialIcon(type: SocialType): JSX.Element {
  switch (type) {
    case socialList.github:
      return <GithubOutlined className={styles.icon} />
    case socialList.twitter:
      return <XOutlined className={styles.icon} />
    case socialList.facebook:
      return <FacebookOutlined className={styles.icon} />
    case socialList.linkedin:
      return <LinkedinOutlined className={styles.icon} />
    case socialList.weibo:
      return <WeiboOutlined className={styles.icon} />
    default:
      return <RocketOutlined className={styles.icon} />
  }
}

export default SocialIcon
