import type { AutoCompleteProps } from 'antd'
import { AutoComplete as AntAutoComplete } from 'antd'

interface Props extends AutoCompleteProps {}

function AutoComplete(props: Props): JSX.Element {
  return <AntAutoComplete {...props} />
}

export default AutoComplete
