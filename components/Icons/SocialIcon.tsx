import {
  FacebookOutlined,
  GithubOutlined,
  LinkedinOutlined,
  RocketOutlined,
  TwitterOutlined,
  WeiboOutlined,
} from '@ant-design/icons';
import { socialList } from '@config';
import type { SocialType } from '@types';

const SocialIcon = (type: SocialType): JSX.Element => {
  switch (type) {
    case socialList.github:
      return <GithubOutlined className="text-4xl" />;
    case socialList.twitter:
      return <TwitterOutlined className="text-4xl" />;
    case socialList.facebook:
      return <FacebookOutlined className="text-4xl" />;
    case socialList.linkedin:
      return <LinkedinOutlined className="text-4xl" />;
    case socialList.weibo:
      return <WeiboOutlined className="text-4xl" />;
    default:
      return <RocketOutlined className="text-4xl" />;
  }
};

export default SocialIcon;
