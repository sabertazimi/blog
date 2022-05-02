import { Anchor, Link } from '@components/Anchor';
import { useEffect, useState } from 'react';
import styles from './ArticleToc.module.css';

interface TocItem {
  id: string;
  title: string;
}

const ArticleToc = (): JSX.Element => {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);

  useEffect(() => {
    const items = document.querySelectorAll('h2.ant-typography');
    const tocItems = Array.from(items).map(item => ({
      id: `#${item.id}`,
      title: item.textContent,
    })) as TocItem[];
    setTocItems(tocItems);
  }, []);

  return (
    <Anchor className={styles.toc}>
      {tocItems.map(item => (
        <Link key={item.id} href={item.id} title={item.title} />
      ))}
    </Anchor>
  );
};

export default ArticleToc;
