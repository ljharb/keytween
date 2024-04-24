#!/usr/bin/env node

import decode from 'keytween/decode';
import encode from 'keytween/encode';

import { parseArgs } from 'util';

const {
	values: {
		help,
		layout,
		concise,
		decode: shouldDecode,
	},
	positionals,
} = parseArgs({
	args: process.argv.slice(2),
	allowPositionals: true,
	options: {
		help: {
			type: 'boolean',
			default: false,
		},
		layout: {
			type: 'string',
			short: 'l',
			default: 'english',
		},
		concise: {
			type: 'boolean',
			short: 'c',
			default: false,
		},
		decode: {
			type: 'boolean',
			short: 'd',
			default: false,
		},
	},
});

if (help) {
	console.log('Usage: keytween [--layout=<layout>] [--concise] [--decode] <input>');
	console.log('\nOptions:');
	console.log('  --layout=<layout>  The keyboard layout to use (default: english)');
	console.log('  --concise          print output as a single line, instead of a tweetable meme format');
	console.log('  --decode           Decode the input (only accepts concise form)');
	console.log('  <input>            The input to encode/decode. Multiple words accepted as positional arguments');
	process.exit(0);
}

if (positionals.length < 1) {
	console.error('at least one word is required');
	process.exit(1);
}

const results = positionals.map((x) => (shouldDecode ? decode : encode)(x, { layout, concise }));

const formats = {
	'{lock}': 'caps lock',
	'{enter}': 'the enter key',
	'{shift}': 'the shift key',
	'{bksp}': 'the backspace/delete key',
	'{space}': 'the spacebar',
	'{tab}': 'the tab key',
};
function fmt(token) {
	return formats[token] ?? token.toUpperCase();
}

if (shouldDecode || concise) {
	console.log(results.join(' '));
} else {
	console.log(results.map((pairs) => pairs.map((pair) => (
		pair.length > 1
			? `look between ${fmt(pair[0])} and ${fmt(pair[1])} on your keyboard`
			: `type ${pair}`
	)).join('\n\n')).join('\n---\n'));
}
