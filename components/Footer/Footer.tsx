import { Container, SocialButton } from '@components';
import type { SocialType } from '@config';
import { SocialList } from '@config';
import type { SiteConfig } from '@types';
import { Col, Divider, Row } from 'antd';
import React from 'react';

interface Props {
  buildTime: string | number | Date;
  author: SiteConfig['author'];
  socialList: SiteConfig['socialList'];
}

const Footer = ({ buildTime, author, socialList }: Props): JSX.Element => (
  <Container className="max-w-full p-8 text-center bg-gray-900 lg:p-20 text-light">
    <Row align="middle" justify="center">
      <Col span={24}>
        {Object.keys(SocialList).map(social => (
          <SocialButton
            key={social}
            className="mx-5 mt-0 mb-4"
            type={social as SocialType}
            url={`https://${social}.com/${socialList[social as SocialType]}`}
          />
        ))}
      </Col>
    </Row>
    <Divider className="my-12 bg-light" />
    <Row align="middle" justify="center">
      <Col span={24}>
        <span>
          Copyright &copy;{' '}
          <a
            className="underline"
            href={`https://github.com/${socialList.github}`}
          >
            {author}
          </a>{' '}
        </span>
        <Divider className="bg-light" type="vertical" />
        <span>
          Built with{' '}
          <a className="underline" href="https://reactjs.org">
            React
          </a>{' '}
          and{' '}
          <a className="underline" href="https://gatsbyjs.org">
            Gatsby
          </a>
        </span>
        <Divider className="bg-light" type="vertical" />
        <span>
          Last Built Time{' '}
          <a className="underline" href="https://www.google.com/search?q=time">
            {new Date(buildTime).toLocaleString('zh-CN', { hour12: false })}
          </a>
        </span>
      </Col>
    </Row>
  </Container>
);

export default Footer;
