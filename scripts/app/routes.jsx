import React from 'react';
import {Router, IndexRoute} from 'react-router';
import NotFound from '../NotFound.jsx';
import Footer from '../app/Footer.jsx';
import Header from '../app/Header.jsx';
import HelloWorld from '../components/HelloWorld.jsx';

export default [
  <IndexRoute key="index" components={ { main: HelloWorld, footer: Footer, header: Header } } />,

  <Router key='HelloWorld' path="/HelloWorld" components={ { main: HelloWorld, footer: Footer, header: Header } } />,

  <Router key="notFound" path="*" components={ { main: NotFound } } />
];
