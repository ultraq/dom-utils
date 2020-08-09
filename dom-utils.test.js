/* 
 * Copyright 2020, Emanuel Rabina (http://www.ultraq.net.nz/)
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-env jest */
import {
	addEventDelegate,
	clearChildren,
	parseJsonFromElement,
	serialize
} from './dom-utils.js';

import {$}     from 'dumb-query-selector';
import {JSDOM} from 'jsdom';

/**
 * Tests for the DOM utilities.
 */
describe('dom-utils', function() {

	describe('#addEventDelegate', function() {

		test('Calls the configured handler when the selector matches', function() {
			let doc = new JSDOM(`
				<!DOCTYPE html>
				<div id="wrapper">
					<button id="target">Click me!</button>
				</div>
			`).window.document;
			let handler = jest.fn();
			addEventDelegate(doc.querySelector('#wrapper'), 'click', '#target', handler);
			doc.querySelector('#target').click();
			expect(handler).toHaveBeenCalled();
		});

		test('Does nothing if the event happens outside of the selector', function() {
			let doc = new JSDOM(`
				<!DOCTYPE html>
				<div id="wrapper">
					<button id="target">Click me!</button>
					<button id="other">I do nothing!</button>
				</div>
			`).window.document;
			let handler = jest.fn();
			addEventDelegate(doc.querySelector('#wrapper'), 'click', '#target', handler);
			doc.querySelector('#other').click();
			expect(handler).not.toHaveBeenCalled();
		});
	});

	describe('#clearChildren', function() {

		test('Removes all of the child elements', function() {
			let doc = new JSDOM(`
				<!DOCTYPE html>
				<div id="parent">
					<p>Child 1</p>
					<p>Child 2</p>
				</div>
			`).window.document;
			let parent = doc.querySelector('#parent');
			clearChildren(parent);
			expect(parent.childElementCount).toBe(0);
		});
	});

	describe('#parseJsonFromElement', function() {

		test('JSON data loaded', function() {
			let testData = {
				message: 'Hello!'
			};
			let doc = new JSDOM(`<!DOCTYPE html><div id="test-data">${JSON.stringify(testData)}</div>`).window.document;
			let result = parseJsonFromElement('#test-data', doc);
			expect(result).toEqual(testData);
		});

		test('null returned when element not present', function() {
			let result = parseJsonFromElement('#test-data');
			expect(result).toBe(null);
		});

		test('null returned when element contains no content', function() {
			let doc = new JSDOM(`<!DOCTYPE html><div id="test-data"></div>`).window.document;
			let result = parseJsonFromElement('#test-data', doc);
			expect(result).toBe(null);
		});
	});

	describe('#serialize', function() {

		const htmlString = '<!DOCTYPE html><html><head></head><body><p>Hi!</p></body></html>';

		test('Full document', function() {
			let doc = new JSDOM(htmlString).window.document;
			let result = serialize(doc);
			expect(result).toBe(htmlString);
		});

		test('Partial document', function() {
			let doc = new JSDOM(htmlString).window.document;
			let fragment = $('p', doc);
			let result = serialize(fragment);
			expect(result).toBe('<p>Hi!</p>');
		});
	});
});
