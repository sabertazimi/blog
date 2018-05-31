import React, { Component } from 'react';

/*
* higher order component for fetch posts data
*/
const withDataFetcher = (url, dataHandler) => (Comp) =>
  class DataFetcher extends Component {
    constructor(props) {
      super(props);

      this.state = {
        data: null,
        isLoading: false,
        error: null,
      };
    }

    componentDidMount() {
      this.setState({ isLoading: true });

      fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Bad Request');
        }
      })
      .then((data) => {
        if (dataHandler && typeof dataHandler === 'function') {
          data = dataHandler(data);

          if (!data) {
            this.setState({ error: new Error('Bad Request') })
          }
        }

        const that = this;

        setTimeout(() => {
          that.setState({ data, isLoading: false })
        }, 255);
      })
      .catch((error) => {
        const that = this;

        setTimeout(() => {
          that.setState({ error, isLoading: false })
        }, 255);
      });
    }

    render() {
      return (
        <Comp { ...this.props } { ...this.state } />
      );
    }
  }

export default withDataFetcher;
