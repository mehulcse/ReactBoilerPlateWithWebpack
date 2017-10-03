import React from 'react';

export default class Header extends React.Component {

  render() {
    return (
      <div className="container-fluid" style={{'borderBottom' : '1px solid #ccc'}}>
        <div className="row">
          <div className="col-md-3">
            Header
          </div>
        </div>
      </div>
    );
  }
};