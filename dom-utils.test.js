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
import {parseJsonFromElement} from './dom-utils.js';

import h  from 'hyperscript';
import hh from 'hyperscript-helpers';

const {div} = hh(h);

/**
 * Tests for the DOM utilities.
 */
describe('dom-utils', function() {

	describe('#parseJsonFromElement', function() {

		function createTestElement(data) {
			testDataEl = div('#test-data', data);
			document.body.appendChild(testDataEl);
		}

		let testDataEl;
		afterEach(function() {
			testDataEl?.remove();
		});

		test('JSON data loaded', function() {
			let testData = {
				message: 'Hello!'
			};
			createTestElement(JSON.stringify(testData));
			let result = parseJsonFromElement('#test-data');
			expect(result).toEqual(testData);
		});

		test('null returned when element not present', function() {
			let result = parseJsonFromElement('#test-data');
			expect(result).toBe(null);
		});

		test('null returned when element contains no content', function() {
			createTestElement('');
			let result = parseJsonFromElement('#test-data');
			expect(result).toBe(null);
		});
	});
});
