import { Divider as AntDivider } from 'antd';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Divider = ({ children }: Props): JSX.Element => (
  <AntDivider className="mx-0 my-12 font-extrabold">{children}</AntDivider>
);

export default Divider;
