import React from 'react';
import PropTypes from 'prop-types';

export class Checkbox extends React.Component {
  static defaultProps = {
    checked: false
  };

  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    checked: PropTypes.bool
  };

  state = {
    checked: this.props.checked
  };

  handleChange = () => {
    this.setState({ checked: !this.state.checked });
  };

  render() {
    const { id, name, label } = this.props;
    const { checked } = this.state;

    return (
      <span>
        <input
          type="checkbox"
          defaultChecked={checked}
          onChange={this.handleChange}
          id={id}
          name={name}
        />{' '}
        {label}
      </span>
    );
  }
}
