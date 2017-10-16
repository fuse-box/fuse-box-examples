// React 16 needs a mock for requestAnimationFrame in test environment
global.requestAnimationFrame = function(callback) {
  setTimeout(callback, 0);
};

const react = require('react');

// Configure Enzyme to use React 16 adapter
var Enzyme = require('enzyme');
var Adapter = require('enzyme-adapter-react-16');

Enzyme.configure({ adapter: new Adapter() });
