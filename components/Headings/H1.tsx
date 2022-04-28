import Heading from './Heading';

interface Props {}

const H1 = (props: Props): JSX.Element => <Heading {...props} level={1} />;

export default H1;
