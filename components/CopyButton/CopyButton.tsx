import { Check, Copy } from '@components/Icons';
import { Toggle } from '@components/Motion';
import { cx, useReducedMotion } from '@components/utils';
import { useCopyToClipboard } from '@hooks';
import styles from './CopyButton.module.css';

interface Props {
  code: string;
  className?: string;
}

const CopyButton = ({ code, className }: Props): JSX.Element => {
  const [isCopied, copy] = useCopyToClipboard(code);
  const shouldReduceMotion = useReducedMotion();

  return (
    <button
      type="button"
      aria-label="CopyButton"
      title="Copy"
      className={cx(className, styles.button)}
      onClick={copy}
    >
      <Toggle
        isToggled={isCopied}
        iconClose={<Copy className={styles.icon} />}
        iconOpen={<Check className={styles.icon} />}
        shouldReduceMotion={shouldReduceMotion}
      />
    </button>
  );
};

export default CopyButton;
