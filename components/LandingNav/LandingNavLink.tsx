import { Bounce } from '@components/Motion';
import { Tooltip } from 'antd';
import classNames from 'classnames';
import Link from 'next/link';
import type { ReactNode } from 'react';

interface Props {
  title: string;
  href: string;
  children: ReactNode;
}

const LandingNavLink = ({ title, href, children }: Props): JSX.Element => (
  <Tooltip className="mb-16" placement="left" title={title}>
    <Bounce>
      <span
        className={classNames(
          'block px-0 pt-0 pb-3 mx-6 my-0 border-solid border-b-6 border-light',
          'text-4xl font-extrabold leading-none cursor-pointer text-light md:text-7xl'
        )}
        role="link"
      >
        <Link href={href}>
          <a>{children}</a>
        </Link>
      </span>
    </Bounce>
  </Tooltip>
);

export default LandingNavLink;
