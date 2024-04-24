'use strict';

const layouts = require('./layouts');

const hasOwn = require('hasown');
const $TypeError = require('es-errors/type');

const regex = /(?<left>\{[^{}]+\}|\S)(?<right>\{[^{}]+\}|\S)/gu;

module.exports = function decodeKeytween(string, { layout = 'english' } = {}) {
	if (typeof string !== 'string' || (/\s/g).test(string)) {
		throw new $TypeError('`string` must be a string without whitespace');
	}
	if (typeof layout !== 'string') {
		throw new $TypeError('`layout` must be a string, if provided');
	}
	if (!hasOwn(layouts, layout)) {
		throw new $TypeError(`Layout ${layout} not found`);
	}

	const { layout: { default: lines } } = layouts[layout];

	const tokens = string.toLowerCase().split(regex).filter(Boolean);

	let decoded = [];

	// eslint-disable-next-line no-labels, no-restricted-syntax
	tokenLoop: for (let i = 0; i < tokens.length; i++) {
		const left = tokens[i];

		for (let j = 0; j < lines.length; j++) {
			const line = lines[j];
			const keys = line.split(' ');
			const lIndex = keys.indexOf(left);
			if (lIndex > -1) {
				const right = tokens[i + 1];
				const rIndex = keys.indexOf(right);
				if (rIndex > -1) {
					decoded = decoded.concat(keys.slice(lIndex + 1, rIndex));
					i += 1;
					continue tokenLoop; // eslint-disable-line no-continue, no-labels, no-restricted-syntax
				}
			}
		}

		decoded[decoded.length] = left;
	}

	return decoded.join('');
};
