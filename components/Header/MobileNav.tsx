import Col from '@components/Col';
import { Bars } from '@components/Icons';
import Link from '@components/Link';
import Menu from '@components/Menu';
import Popover from '@components/Popover';
import Row from '@components/Row';
import { routes } from '@config';
import logo from '@images/logo-full.png';
import Image from 'next/image';

const MobileNav = (): JSX.Element => (
  <Row className="md:hidden" justify="center" align="middle">
    <Col className="flex-container" span={8} offset={8}>
      <Link href="/">
        <Image src={logo} alt="Logo" width={96} height={96} />
      </Link>
    </Col>
    <Col className="flex-container" span={8}>
      <Popover
        placement="bottomRight"
        trigger="click"
        content={
          <Menu
            mode="vertical"
            className="w-full max-w-md text-2xl font-extrabold text-center min-w-xs"
            items={[
              ...routes.map(route => ({
                key: route.id,
                label: (
                  <Link href={route.path}>
                    <a>{route.name}</a>
                  </Link>
                ),
              })),
            ]}
          />
        }
      >
        <Bars className="text-5xl text-primary" />
      </Popover>
    </Col>
  </Row>
);

export default MobileNav;
