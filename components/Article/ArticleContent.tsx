import { SlideUp } from '@components/Motion';
import styles from './ArticleContent.module.css';

interface Props {
  content: string;
}

const ArticleContent = ({ content }: Props): JSX.Element => {
  return (
    <SlideUp>
      <div
        className={styles.markdownBody}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </SlideUp>
  );
};

export default ArticleContent;
