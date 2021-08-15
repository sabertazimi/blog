import { Container, SocialButton } from '@components';
import { SocialList, SocialType } from '@config';
import { SiteMetadata } from '@types';
import { Col, Divider, Row } from 'antd';
import React from 'react';

interface Props {
  buildTime: string | number | Date;
  author: SiteMetadata['author'];
  socialList: SiteMetadata['socialList'];
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
          <a href={`https://github.com/${socialList.github}`}>{author}</a>{' '}
          {new Date().getFullYear()}
        </span>
        <Divider className="bg-light" type="vertical" />
        <span>
          Built with <a href="https://reactjs.org">React</a> and{' '}
          <a href="https://gatsbyjs.org">Gatsby</a>
        </span>
        <Divider className="bg-light" type="vertical" />
        <span>
          Last Updated at{' '}
          <a href="https://www.google.com/search?q=time">
            {new Date(buildTime).toLocaleString('zh-CN')}
          </a>
        </span>
      </Col>
    </Row>
  </Container>
);

export default Footer;
