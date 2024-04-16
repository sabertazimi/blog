import Col from '@/components/Col'
import { Bars } from '@/components/Icons'
import Link from '@/components/Link'
import LocalImage from '@/components/LocalImage'
import Menu from '@/components/Menu'
import Popover from '@/components/Popover'
import Row from '@/components/Row'
import ThemeSwitch from '@/components/ThemeSwitch'
import { routes } from '@/config'
import logo from '@/images/logo-full.png'

function MobileNav(): JSX.Element {
  return (
    <Row className="md:hidden" justify="center" align="middle">
      <Col className="flex-container" span={8}>
        <Popover
          placement="bottomRight"
          trigger="click"
          content={(
            <Menu
              mode="vertical"
              className="w-full min-w-xs max-w-md text-center text-2xl font-extrabold"
              items={[
                ...routes.map(route => ({
                  key: route.id,
                  label: <Link href={route.path}>{route.name}</Link>,
                })),
              ]}
            />
          )}
        >
          <Bars className="text-5xl text-primary" />
        </Popover>
      </Col>
      <Col className="flex-container" span={8}>
        <Link href="/">
          <LocalImage src={logo} alt="Logo" width={96} height={96} />
        </Link>
      </Col>
      <Col className="flex-container" span={8}>
        <ThemeSwitch className="dark:text-light" />
      </Col>
    </Row>
  )
}

export default MobileNav
