'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import logo from './img/logo_pc.png'
import './search.less'

class Search extends React.Component{
  render() {
    return <div>search text
      <img src={logo} />
    </div>;
  }
}

ReactDOM.render(
  <Search />,
  document.getElementById('root')
);