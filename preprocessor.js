// JSX preprocessor for Jest tests
// See http://facebook.github.io/jest/docs/tutorial-react.html

var ReactTools = require('react-tools');
module.exports = {
  process: function(src) {
    return ReactTools.transform(src);
  }
};
