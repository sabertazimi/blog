import React from 'react';
import { Row, Col, Divider } from 'antd';
import { useBuildTime, useSiteMetadata } from '@hooks';
import { SocialType } from '@config';
import Container from '@components/Container';
import SocialButton from '@components/SocialButton';

const Footer = () => {
  const buildTime = useBuildTime();
  const { author, socialList } = useSiteMetadata();

  return (
    <Container className="max-w-full p-8 text-center bg-gray-900 lg:p-20 text-light">
      <Row align="middle" justify="center">
        <Col span={24}>
          {Object.keys(SocialType).map((social) => (
            <SocialButton
              className="mx-5 mt-0 mb-4"
              key={social}
              type={social}
              url={`https://${social}.com/${socialList[social]}`}
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
              {new Date(buildTime).toLocaleString()}
            </a>
          </span>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
