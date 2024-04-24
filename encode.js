'use strict';

const layouts = require('./layouts');

const hasOwn = require('hasown');
const $TypeError = require('es-errors/type');

/* eslint func-style: 0 */

function encodeChunk(chunk, lines) {
	const pairs = [];

	let i = 0;
	while (i < chunk.length) {
		const char = chunk[i];

		let foundMatch = false;

		for (let j = 0; j < lines.length; j++) {
			const line = lines[j];
			const keys = line.split(' ');

			const index = keys.indexOf(char);
			if (index > -1) {
				let k = 0;
				while (i + k < chunk.length && index + k < keys.length && chunk[i + k] === keys[index + k]) {
					k += 1;
				}

				pairs[pairs.length] = [
					keys[index - 1],
					index + k < keys.length ? keys[index + k] : '',
				];
				i += k - 1;
				foundMatch = true;
				break; // eslint-disable-line no-restricted-syntax
			}
		}

		if (!foundMatch) {
			pairs[pairs.length] = char;
		}

		i += 1;
	}

	return pairs;
}

module.exports = function encodeKeytween(string, {
	concise = false,
	layout = 'english',
} = {}) {
	if (typeof string !== 'string' || (/\s/g).test(string)) {
		throw new $TypeError('`string` must be a string without whitespace');
	}
	if (typeof layout !== 'string') {
		throw new $TypeError('`layout` must be a string, if provided');
	}
	if (!hasOwn(layouts, layout)) {
		throw new $TypeError(`Layout ${layout} not found`);
	}
	if (typeof concise !== 'boolean') {
		throw new $TypeError('`concise` must be a boolean, if provided');
	}

	const { layout: { default: def } } = layouts[layout];
	const lines = def.slice(0, -1);

	const results = encodeChunk(string.toLowerCase().normalize(), lines);

	const str = [].concat(...results).join('');

	if (concise) {
		return str;
	}

	results.toString = function encodedAsString() {
		return str;
	};

	return results;
};
