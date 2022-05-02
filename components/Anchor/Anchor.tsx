import type { AnchorLinkProps, AnchorProps } from 'antd';
import { Anchor as AntAnchor } from 'antd';

interface AProps extends AnchorProps {}
interface LProps extends AnchorLinkProps {}

const Anchor = (props: AProps): JSX.Element => <AntAnchor {...props} />;
const Link = (props: LProps): JSX.Element => <AntAnchor.Link {...props} />;

export { Anchor, Link };
