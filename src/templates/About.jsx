import React from 'react';
import { Layout } from '@/layouts';
import { GithubCard } from '@/components';

const About = ({ pageContext: { github } }) => (
  <Layout banner="About Me">
    <GithubCard github={github} />
  </Layout>
);

export default About;
