import type { DetailedHTMLProps, OlHTMLAttributes } from 'react';

interface Props
  extends DetailedHTMLProps<
    OlHTMLAttributes<HTMLUListElement>,
    HTMLUListElement
  > {}

const Ul = ({ children, ...props }: Props): JSX.Element => (
  <ul {...props}>{children}</ul>
);

export default Ul;
