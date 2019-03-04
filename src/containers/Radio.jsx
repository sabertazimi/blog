import React from 'react';
import PropTypes from 'prop-types';

export class Radio extends React.Component {
  static defaultProps = {
    selected: false
  };

  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    selected: PropTypes.bool
  };

  state = {
    selected: this.props.selected
  };

  handleChange = () => {
    this.setState({ selected: !this.state.selected });
  };

  render() {
    const { id, name, label } = this.props;
    const { selected } = this.state;

    return (
      <span>
        <input
          type="radio"
          defaultChecked={selected}
          onChange={this.handleChange}
          id={id}
          name={name}
        />{' '}
        {label}
      </span>
    );
  }
}
