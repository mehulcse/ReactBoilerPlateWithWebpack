import React from 'react';
import Alert from 'react-s-alert';

const App = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  propTypes: {
    main: React.PropTypes.shape({}).isRequired,
    header: React.PropTypes.shape({}),
    footer: React.PropTypes.shape({})
  },

  getInitialState() {
    return {
    };
  },

  render() {
    return (
      <div>
        { this.renderHeader() }
        <div>
          <Alert stack={{ limit: 3 }} offset={30} position={'top-right'} effect={'slide'} timeout={5000}/>
          { this.renderContent() }
        </div>
        {this.renderFooter()}
      </div>
    );
  },

  renderFooter() {
    if (this.props.footer) {
      return React.cloneElement(this.props.footer, {});
    }
  },

  renderHeader() {
    if (this.props.header) {
      return React.cloneElement(this.props.header, { });
    }
  },

  renderContent() {
    return React.cloneElement(this.props.main, {});
  },
});

export default App;