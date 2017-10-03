import React from 'react';
import { Router } from 'react-router';
import routes from './app/routes.jsx';
import gaHistory from './gaHistory.js';
import AppComponent from './AppComponent.jsx';

export default class App extends React.Component {
  render() {
    return (
      <Router history={ gaHistory('') }>
        <Router components={ AppComponent } path="/">
          { routes }
        </Router>
      </Router>
    );
  }
}