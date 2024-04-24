'use strict';

let layouts;
try {
	global.self = global;

	const { SimpleKeyboardLayouts } = require('simple-keyboard-layouts'); // eslint-disable-line global-require

	({ layouts } = new SimpleKeyboardLayouts());
} finally {
	delete global.self;
}

module.exports = layouts;
