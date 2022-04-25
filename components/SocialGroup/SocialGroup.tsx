import { SocialButton } from '@components';
import { socialColors, socialList, socialQuery } from '@config';
import type { SocialColor, SocialType } from '@types';
import { Space } from 'antd';

interface Props {
  url: string;
}

const SocialGroup = ({ url }: Props): JSX.Element => (
  <Space
    className="fixed left-0  top-1/2 z-10 hidden md:visible md:inline-flex"
    direction="vertical"
    align="center"
    size={0}
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
);

export default SocialGroup;
