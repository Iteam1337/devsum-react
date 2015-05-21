/** @jsx React.DOM */

var React = require('react');
window.React = React; 

var App = require('./app');
React.render(<App/>, document.getElementById('wrapper'));