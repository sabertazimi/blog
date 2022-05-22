import SocialButton from '@components/SocialButton';
import Space from '@components/Space';
import { socialColors, socialList, socialQuery } from '@config';
import type { SocialColor, SocialType } from '@types';

interface Props {
  url: string;
}

const SocialGroup = ({ url }: Props): JSX.Element => (
  <Space
    direction="vertical"
    align="center"
    size={0}
    className="fixed top-1/2 right-0 z-10 -translate-y-1/2 hidden md:visible md:inline-flex"
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
