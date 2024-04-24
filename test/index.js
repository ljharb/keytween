'use strict';

const test = require('tape');
const v = require('es-value-fixtures');
const inspect = require('object-inspect');

const decode = require('../decode');
const encode = require('../encode');

const cases = require('./cases');

test('encode/decode', (t) => {
	v.nonStrings.forEach((nonString) => {
		t.throws(() => { decode(nonString); }, TypeError, `decode throws on non-strings: ${inspect(nonString)}`);
		t.throws(() => { encode(nonString); }, TypeError, `encode throws on non-strings: ${inspect(nonString)}`);

		if (typeof nonString !== 'undefined') {
			t.throws(() => { decode(',/', { layout: nonString }); }, TypeError, `decode throws on non-string layouts: ${inspect(nonString)}`);
			t.throws(() => { encode('.', { layout: nonString }); }, TypeError, `encode throws on non-string layouts: ${inspect(nonString)}`);
		}
	});

	v.nonBooleans.forEach((nonBoolean) => {
		if (typeof nonBoolean !== 'undefined') {
			t.throws(() => { encode('.', { concise: nonBoolean }); }, TypeError, `encode throws on non-boolean concise: ${inspect(nonBoolean)}`);
		}
	});

	t.throws(() => decode(',/', { layout: 'nonexistent layout' }), TypeError, 'decode throws on nonexistent layout');
	t.throws(() => encode('.', { layout: 'nonexistent layout' }), TypeError, 'encode throws on nonexistent layout');

	// throws on strings with whitespace

	Object.entries(cases).forEach(([layout, objs]) => {
		t.test(`layout: ${layout}`, (st) => {
			objs.forEach(({ decoded, encoded }) => {
				st.test(`${decoded}/${encoded}`, (s2t) => {
					const result = encode(decoded, { layout });
					const concise = `${result}`;

					s2t.deepEqual([].concat(result), encoded, 'decoded encodes');
					s2t.equal(encode(decoded, { layout, concise: true }), concise, 'decoded encodes concisely; matches toString');
					s2t.equal(decode(concise, { layout }), decoded, 'encoded decodes');

					s2t.equal(decode(encode(decoded, { layout, concise: true }), { layout }), decoded, 'decoded round trips');
					s2t.deepEqual([].concat(encode(decode(concise, { layout }), { layout })), encoded, 'encoded round trips');

					s2t.end();
				});
			});

			st.end();
		});
	});

	t.end();
});
