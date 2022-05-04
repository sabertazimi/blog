import { classNames } from '@components/utils';
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

  return (
    <div
      id="disqus_thread"
      className={classNames(
        styles.disqus,
        'after:bg-white dark:after:bg-black'
      )}
    />
  );
};

export default ArticleComments;
