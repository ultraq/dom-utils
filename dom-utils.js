/* 
 * Copyright 2019, Emanuel Rabina (http://www.ultraq.net.nz/)
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

/**
 * Add an event listener to `element` that only fires when the target of the
 * event matches `selector`.
 * 
 * @param {Element} element
 * @param {String} eventName
 * @param {String} selector
 * @param {Function} handler
 */
export function addEventDelegate(element, eventName, selector, handler) {
	element.addEventListener(eventName, event => {
		if (event.target.matches(selector)) {
			handler(event);
		}
	});
}

/**
 * Removes all of an element's child nodes.
 * 
 * @param {Element} element
 */
export function clearChildren(element) {
	while (element.firstChild) {
		element.removeChild(element.firstChild);
	}
}

/**
 * Deserialize an HTML string into a document fragment.
 * 
 * @param {String} htmlString
 * @return {Document}
 */
export function deserialize(htmlString) {
	return new DOMParser().parseFromString(htmlString, 'text/html');
}

/**
 * Parse the text content of the element picked out by the given selector as
 * JSON data, returning it as an object.
 * 
 * @param {String} selector
 *   A CSS selector for picking out the HTML element that contains the JSON data
 *   to load.
 * @param {Document} [scope=document]
 *   The DOM tree to run the selector over.
 * @return {Object}
 *   The JSON data converted to an object, or `null` if no data could be read.
 */
export function parseJsonFromElement(selector, scope = document) {
	return JSON.parse((scope.querySelector(selector)?.textContent?.trim() || null));
}

/**
 * Serialize a document or document fragment into an HTML string.
 * 
 * @param {Document|DocumentFragment} documentOrFragment
 * @return {String}
 */
export function serialize(documentOrFragment) {
	if (documentOrFragment.nodeType === Node.DOCUMENT_NODE) {
		let result = '';
		let {contentType, docType, firstElementChild} = documentOrFragment;
		if (docType) {
			result += `<!DOCTYPE ${docType.name}>`;
		}
		else if (firstElementChild.tagName === 'HTML' || contentType === 'text/html') {
			result += `<!DOCTYPE html>`;
		}
		result += firstElementChild.outerHTML;
		return result;
	}
	return documentOrFragment.outerHTML;
}
