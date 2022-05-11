import { classNames } from '@components/utils';
import { siteConfig } from '@config';
import { useTypingEffect } from '@hooks';
import { useRef } from 'react';

interface Props {
  titles?: string[];
  speed?: number;
  delay?: number;
  loop?: boolean;
  className?: string;
}

const TypingTitle = ({
  titles = siteConfig.landingTitles,
  speed = 60,
  delay = 600,
  loop = true,
  className,
}: Props): JSX.Element => {
  const ref = useRef<HTMLSpanElement>(null);
  useTypingEffect(ref, { titles, speed, delay, loop });

  return (
    <div
      className={classNames(
        'w-full h-auto px-0 py-0 mx-auto my-0',
        'text-5xl font-extrabold text-center',
        'typing-title-container lg:text-9xl',
        className
      )}
    >
      <span role="main" ref={ref} />
    </div>
  );
};

export default TypingTitle;
