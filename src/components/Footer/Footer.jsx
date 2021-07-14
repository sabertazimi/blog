import React from 'react';
import { Row, Col, Divider } from 'antd';
import { useBuildTime, useSiteMetadata } from '@hooks';
import { Colors, SocialType } from '@config';
import Container from '@components/Container';
import SocialButton from '@components/SocialButton';

const Footer = () => {
  const buildTime = useBuildTime();
  const { author, socialList } = useSiteMetadata();

  return (
    <Container
      className="max-w-full p-8 text-center lg:p-20"
      style={{
        color: Colors.light,
        backgroundColor: Colors.black,
      }}
    >
      <Row align="middle" justify="center">
        <Col span={24}>
          {Object.keys(SocialType).map((social) => (
            <SocialButton
              key={social}
              type={social}
              url={`https://${social}.com/${socialList[social]}`}
              style={{ margin: '0 1em 1em' }}
            />
          ))}
        </Col>
      </Row>
      <Divider
        style={{
          marginTop: '2em',
          marginBottom: '2em',
          backgroundColor: Colors.light,
        }}
      />
      <Row align="middle" justify="center">
        <Col span={24}>
          Copyright &copy;{' '}
          <a href={`https://github.com/${socialList.github}`}>{author}</a>{' '}
          {new Date().getFullYear()}
          <Divider type="vertical" style={{ backgroundColor: Colors.light }} />
          Built with <a href="https://reactjs.org">React</a> and{' '}
          <a href="https://gatsbyjs.org">Gatsby</a>
          <Divider type="vertical" style={{ backgroundColor: Colors.light }} />
          Last Updated at{' '}
          <a href="https://www.google.com/search?q=time">
            {new Date(buildTime).toLocaleString()}
          </a>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
