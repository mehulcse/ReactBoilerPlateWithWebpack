/* global require, module*/
"use strict";

var React = require('react');

var NotFound = React.createClass({
  render: function() {
    return <div>
      <h1><br /><br /></h1>
      <h1 className='text-center'>Not Found</h1>
    </div>;
  },
});

module.exports = NotFound;
