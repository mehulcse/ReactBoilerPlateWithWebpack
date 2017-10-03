"use strict";

var Alert = require('react-s-alert').default;

(function(global){

  var baseUrl = "http://localhost:60000";
  var rawAjax = function(url, options, callback) {
    var xmlhttp = new XMLHttpRequest();

    var aborter = function() { xmlhttp.abort(); };

    window.addEventListener('beforeunload', aborter);

    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState === 4 && (url.indexOf('sign_in') !== -1)) {
        if(xmlhttp.getResponseHeader("access-token")) {
          localStorage.setItem('accessToken', xmlhttp.getResponseHeader("access-token"));
        }
        if(xmlhttp.getResponseHeader("uid")) {
          localStorage.setItem('uid', xmlhttp.getResponseHeader("uid"));
        }
        if(xmlhttp.getResponseHeader("client")) {
          localStorage.setItem('client', xmlhttp.getResponseHeader("client"));
        }
        callback(xmlhttp);
        window.removeEventListener('beforeunload', aborter);
      } else if (xmlhttp.readyState === 4) {
        callback(xmlhttp);
        window.removeEventListener('beforeunload', aborter);
      }
    };
    var headers = options.headers || {};
    if(url.indexOf('sign_in') == -1) {
      headers['access-token'] = localStorage.getItem('accessToken');
      headers['uid'] = localStorage.getItem('uid');
      headers['client'] = localStorage.getItem('client');
    }
    var method = options.method || "GET";
    url = baseUrl+url;
    xmlhttp.open(method, url, true);
    Object.keys(headers).forEach(function(key){
      xmlhttp.setRequestHeader(key, headers[key]);
    }, this);
    xmlhttp.send(options.data || '');
    return xmlhttp;
  };

  var jsonAjax = function(url, data, options, callback) {
    options.data = JSON.stringify(data);
    if (!options.headers) {
      options.headers = {};
    }
    options.headers['Content-Type'] = 'application/json';

    return rawAjax(
      url,
      options,
      function(xhr) {
        var data = {};
        try {
          data = JSON.parse(xhr.responseText);
        } catch (exception) {
          /*eslint no-console: false*/
          console.log(exception);
        }
        if(xhr.status == 401) {
          if(localStorage.getItem('isLoggedIn')) {
            localStorage.removeItem('isLoggedIn');
          }
          if(localStorage.getItem('user')) {
            localStorage.removeItem('user');
          }
          if(localStorage.getItem('accessToken')) {
            localStorage.removeItem('accessToken');
          }
          if(localStorage.getItem('uid')) {
            localStorage.removeItem('uid');
          }
          if(localStorage.getItem('client')) {
            localStorage.removeItem('client');
          }
          if(localStorage.getItem('selectedView')) {
            localStorage.removeItem('selectedView');
          }
          if (window.location.pathname !== "/login") {
            window.location.replace("/login");
          }
        }

        callback(data, xhr.status, xhr);
      }
    );
  };

  var jsonAjaxPromise = function(url, data, options) {
    options.data = JSON.stringify(data);
    if (!options.headers) {
      options.headers = {};
    }
    options.headers['Content-Type'] = 'application/json';

    return new Promise(function(resolve, reject){
      rawAjax(
        url,
        options,
        function(xhr) {
          var data = {};
          try {
            data = JSON.parse(xhr.responseText);
          } catch (exception) {
            reject(exception);
            return;
          }
          resolve({data: data, status: xhr.status, xhr: xhr});
        }
      );
    });
  };

  module.exports = {
    raw: rawAjax,
    json: jsonAjax,
    jsonPromise: jsonAjaxPromise,
    needAuth: function() {
      if (window.location.pathname !== "/login") {
        window.location.replace("/login");
      }
    }
  };

})(this);