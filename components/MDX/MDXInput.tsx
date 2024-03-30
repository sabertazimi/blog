import Checkbox from '@components/Checkbox'
import Input from '@components/Input'

interface Props {
  type?: string
  checked?: boolean
  disabled?: boolean
}

function MDXInput({
  type,
  checked,
  disabled,
  ...props
}: Props): JSX.Element {
  if (type?.includes('checkbox'))
    return <Checkbox checked={checked} className="mr-1" {...props} />

  return (
    <Input
      type={type}
      checked={checked}
      disabled={disabled}
      className="mr-1"
      {...props}
    />
  )
}

export default MDXInput
