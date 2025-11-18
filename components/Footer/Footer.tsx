import type { BuildTime, SiteConfig, SocialType } from '@/types'
import Col from '@/components/Col'
import Container from '@/components/Container'
import Divider from '@/components/Divider'
import Row from '@/components/Row'
import SocialButton from '@/components/SocialButton'
import { siteConfig, socialList } from '@/config'
import FooterTime from './FooterTime'

interface Props {
  buildTime: BuildTime
  author?: string
  socials?: SiteConfig['socials']
}

export default function Footer({
  buildTime,
  author = siteConfig.author,
  socials = siteConfig.socials,
}: Props) {
  return (
    <Container
      role="grid"
      className="bg-gradient-secondary max-w-full p-8 text-center text-light lg:p-20"
    >
      <Row align="middle" justify="center">
        <Col span={24}>
          {Object.keys(socialList).map(social => (
            <SocialButton
              key={social}
              className="mx-5 mb-4 mt-0"
              type={social as SocialType}
              url={`https://${social}.com/${socials[social as SocialType]}`}
            />
          ))}
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Divider className="bg-light" />
        </Col>
      </Row>
      <Row align="middle" justify="center">
        <Col className="mx-6">
          <span>
            Copyright &copy;
            {' '}
            <a href={`https://github.com/${socials.github}`}>{author}</a>
            {' '}
          </span>
        </Col>
        <Col className="mx-6">
          <span>
            Built with
            {' '}
            <a href="https://react.dev">React</a>
            {' '}
            and
            {' '}
            <a href="https://nextjs.org">Next</a>
          </span>
        </Col>
        <Col className="mx-6">
          <FooterTime buildTime={buildTime} />
        </Col>
      </Row>
    </Container>
  )
}
