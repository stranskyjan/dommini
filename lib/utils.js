const {Element,TextNode,CommentNode,getContext} = require("./node")

/** shortcut for `new TextNode(str)`
* @param {String} str - TextNode content
* @return {TextNode}
*/
function text(str) {
	return new TextNode(str)
}

/** shortcut for `new CommentNode(str)`
* @param {String} str - CommentNode content
* @return {CommentNode}
*/
function comment(str) {
	return new CommentNode(str)
}

/** apply elem.attr(...), where elem = current context element
* @param {*} attrs - new attributes
* @return {(this|Element)} what elem.attr(...) would return (this for setter or object of key-value pairs as getter)
*/
function attr(attrs) {
	if (!getContext()) return
	return getContext().attr(attrs)
}

/** apply elem.addClass(...), where elem = current context element
* @param {Object} attrs - new attributes
*/
function addClass(...classes) {
	if (!getContext()) return
	getContext().addClass(...classes)
}

/** Shortcut to create 
* @param {String} tag
* @return {Function} (...args) => new Element(tag,...args) shortcut function
*/
function shortcut(tag) {
	return (...args) => new Element(tag,...args)
}

module.exports ={
	text,
	comment,
	attr,
	addClass,
	shortcut,
}
