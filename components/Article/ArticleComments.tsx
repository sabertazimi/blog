import { siteConfig } from '@config';
import { useDisqus } from '@hooks';
import styles from './ArticleComments.module.css';

interface Props {
  url?: string;
}

const ArticleComments = ({
  url = siteConfig.disqusUrl,
}: Props): JSX.Element => {
  useDisqus(url);

  return <div id="disqus_thread" className={styles.disqus} />;
};

export default ArticleComments;
