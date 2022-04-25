import { BarsOutlined } from '@ant-design/icons';
import { routes } from '@config';
import logo from '@images/logo-full.png';
import { Col, Menu, Popover, Row } from 'antd';
import Image from 'next/image';
import Link from 'next/link';

const MobileNav = (): JSX.Element => (
  <Row className="md:hidden" justify="center" align="middle">
    <Col className="flex-container" span={8} offset={8}>
      <Link href="/">
        <a>
          <Image src={logo} alt="Logo" width={96} height={96} />
        </a>
      </Link>
    </Col>
    <Col className="flex-container" span={8}>
      <Popover
        placement="bottomRight"
        content={
          <Menu
            className="w-full max-w-md text-2xl font-extrabold text-center min-w-xs"
            mode="vertical"
          >
            {routes.map(route => (
              <Menu.Item key={route.id}>
                <Link href={route.path}>
                  <a>{route.name}</a>
                </Link>
              </Menu.Item>
            ))}
          </Menu>
        }
        trigger="click"
      >
        <BarsOutlined className="text-5xl text-primary" />
      </Popover>
    </Col>
  </Row>
);

export default MobileNav;
