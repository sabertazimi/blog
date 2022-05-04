import type { AnchorLinkProps, AnchorProps } from 'antd';
import { Anchor as AntAnchor } from 'antd';

interface Props extends AnchorProps {}

interface LinkProps extends AnchorLinkProps {}

const Anchor = (props: Props): JSX.Element => <AntAnchor {...props} />;

const Link = (props: LinkProps): JSX.Element => <AntAnchor.Link {...props} />;

export { Anchor, Link };
