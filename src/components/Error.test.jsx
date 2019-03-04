import React from 'react';
import ReactDOM from 'react-dom';
import Error from './Error';

describe('Componentes Rendering', () => {
  it('Error.js renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Error message={ {} } history={ {} }/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
