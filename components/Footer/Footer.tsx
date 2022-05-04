import Col from '@components/Col';
import Container from '@components/Container';
import Divider from '@components/Divider';
import Row from '@components/Row';
import SocialButton from '@components/SocialButton';
import { siteConfig, socialList } from '@config';
import type { SiteConfig, SocialType } from '@types';

interface Props {
  buildTime: string | number | Date;
  author?: string;
  socials?: SiteConfig['socials'];
}

const Footer = ({
  buildTime,
  author = siteConfig.author,
  socials = siteConfig.socials,
}: Props): JSX.Element => (
  <Container className="max-w-full p-8 lg:p-20 text-center bg-gray-900 dark:bg-black text-light">
    <Row align="middle" justify="center">
      <Col span={24}>
        {Object.keys(socialList).map(social => (
          <SocialButton
            key={social}
            className="mx-5 mt-0 mb-4"
            type={social as SocialType}
            url={`https://${social}.com/${socials[social as SocialType]}`}
          />
        ))}
      </Col>
    </Row>
    <Divider className="my-12 border-light" />
    <Row align="middle" justify="center">
      <Col span={24}>
        <span>
          Copyright &copy;{' '}
          <a href={`https://github.com/${socials.github}`}>{author}</a>{' '}
        </span>
        <Divider type="vertical" className="border-light" />
        <span>
          Built with <a href="https://reactjs.org">React</a> and{' '}
          <a href="https://nextjs.org">Next</a>
        </span>
        <Divider type="vertical" className="border-light" />
        <span>
          Last Built Time{' '}
          <a href="https://www.google.com/search?q=time">
            {new Date(buildTime).toLocaleString('zh-CN', { hour12: false })}
          </a>
        </span>
      </Col>
    </Row>
  </Container>
);

export default Footer;
