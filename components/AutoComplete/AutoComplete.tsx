import type { AutoCompleteProps } from 'antd';
import { AutoComplete as AntAutoComplete } from 'antd';

interface Props extends AutoCompleteProps {}

const AutoComplete = (props: Props): JSX.Element => (
  <AntAutoComplete {...props} />
);

export default AutoComplete;
