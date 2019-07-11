// import React from 'react';
import './search.less';
const React = require('react')

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      Text: null,
    };
  }

  imortJs() {
    import('./text.js').then((Text) => {
      this.setState({
        Text: Text.default,
      });
    });
  }

  render() {
    const { Text } = this.state;
    return (
      <div>
        search text
        {
          Text ? <Text /> : null
        }
      </div>
    );
  }
}

module.exports = <Search />;
