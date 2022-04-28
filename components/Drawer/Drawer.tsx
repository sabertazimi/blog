import { Close } from '@components/Icons';
import type { DrawerProps } from 'antd';
import { Drawer as AntDrawer } from 'antd';

interface Props extends DrawerProps {}

const Drawer = ({ title, visible, onClose, children }: Props): JSX.Element => (
  <AntDrawer
    className="font-extrabold text-dark"
    placement="right"
    closeIcon={<Close aria-label="Close" className="text-primary" />}
    title={title}
    visible={visible}
    onClose={onClose}
  >
    {children}
  </AntDrawer>
);

export default Drawer;
