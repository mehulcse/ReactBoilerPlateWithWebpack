/*global require, window, module */
"use strict";

var Router = require('react-router');
var history = require('history');

// If Google Analytics is loaded the route changes will be sent as
// page changes
module.exports = function(basename) {
  var h = Router.useRouterHistory(history.createHistory)({
    basename: basename
  });
  h.listen(function(location){
    if (window.ga) {
      window.ga('set', 'page', location.basename + location.pathname);
      window.ga('send', 'pageview');
    }
  });
  return h;
};
