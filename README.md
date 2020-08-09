
dom-utils
=========

[![Build Status](https://travis-ci.com/ultraq/dom-utils.svg?branch=master)](https://travis-ci.com/ultraq/dom-utils)
[![Coverage Status](https://coveralls.io/repos/github/ultraq/dom-utils/badge.svg?branch=master)](https://coveralls.io/github/ultraq/dom-utils?branch=master)
[![npm](https://img.shields.io/npm/v/@ultraq/dom-utils.svg?maxAge=3600)](https://www.npmjs.com/package/@ultraq/dom-utils)
[![Bundlephobia minified size](https://img.shields.io/bundlephobia/min/@ultraq/dom-utils)](https://bundlephobia.com/result?p=@ultraq/dom-utils)

A collection of utilities for working with the DOM.


Installation
------------

```
npm install @ultraq/dom-utils
```


API
---

### addEventDelegate(element, eventName, selector, handler)

Add an event listener to `element` that only fires when the target of the event
matches `selector`.

 - **element**:
 - **eventName**:
 - **selector**:
 - **handler**:

### clearChildren(element)

Removes all of an element's child nodes.

 - **element**

### deserialize(htmlString)

Deserialize an HTML string into a document fragment.

 - **htmlString**

### parseJsonFromElement(selector)

Parse the text content of the element picked out by the given selector as JSON
data, returning it as an object.  Returns `null` if no data could be read.

 - **selector**: a CSS selector for picking out the HTML element that contains
   the JSON data
 - **scope**: optional, the DOM tree to run the selector over.  Defaults to the
   current `document`.

### serialize(documentOrFragment)

Serialize a document or document fragment into an HTML string.

 - **documentOrFragment**
