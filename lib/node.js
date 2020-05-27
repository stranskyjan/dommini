const voidElements = "area base br col embed hr img input link meta param source track wbr".split(/\s+/)

var context = null

/** Minimal implementation of DOM Node
* @param {...*} add - this.add(...add) is called, see Node.add method
*/
class Node {
	constructor(...add) {
		this._parent = null
		this._children = []
		//
		this.add(...add)
		//
		if (context) {
			context.add(this)
		}
	}
	/** parent node
	* @type {Node}
	*/
	get parent() {
		return this._parent
	}
	/** child nodes
	* @type {Node[]}
	*/
	get children() {
		return this._children
	}
	/** add a text node
	* @param {(String|Number)}
	* @return {this}
	*//** add a single node
	* @param {Node} node
	* @return {this}
	* @variant 2
	*//** add multiple nodes 
	* @param {...Node}
	* @return {this}
	* @variant 3
	*//** add multiple nodes (from an array)
	* @param {Node[]}
	* @return {this}
	* @variant 4
	*//** add nodes inside a function (calls this.context(f) internally)
	* @param {Function} f
	* @return {this}
	* @variant 5
	*/
	add(...what) {
		var w0 = what[0]
		if (typeof w0 === "function") return this.context(w0)
		var children
		if (Array.isArray(w0)) children = w0
		else children = what
		for (var ch of children) this._add1(ch)
		return this
	}
	/** Add one node and return it
	* @param {Node} node
	* @return {Node} the newly added node
	*/
	put(node) {
		this.add(node)
		return node
	}
	/** perform callback function with this node as the context node.
	* attr the node, add elements to it, ...
	* @param {Function} callback - what to do with this being the context
	* @return {this}
	*/
	context(callback) {
		var contextOld = context
		context = this
		callback()
		context = contextOld
		return this
	}
	/** clone this node
	* @return {Node}
	*/
	clone() {
		var ret = new this.constructor()
		ret._children = this.children.map(ch => ch.clone())
		ret._children.forEach(ch => ch._parent = ret)
		ret._clone(this)
		return ret
	}
	/** remove node from the tree
	* @return {this}
	*/
	remove() {
		var p = this._parent
		if (!p) return
		var chs = p._children
		var i = chs.indexOf(this)
		if (i === -1) console.error(`this Element ${this} has parent ${p}, but the this is not in parent.children`)
		chs.splice(i,1)
		this._parent = null
		return this
	}
	//
	_add1(e) {
		if (typeof e === "string") e = new TextNode(e)
		if (typeof e === "number") e = new TextNode(e.toString())
		if (!(e && e instanceof Node)) console.error("Suspicious element",e,"being added to",this)
		e.remove()
		e._parent = this
		this._children.push(e)
	}
}

/** Minimal implementation of DOM Element
* @param {String} tag
* @param {...*} add - see Node constructor
*/
class Element extends Node {
	constructor(tag,...add) {
		super(...add)
		this._tag = tag
		this._attrs = this._attrs || {}
		this._class = this._class || []
	}
	/**
	* @type {String}
	*/
	get tag() { return this._tag }
	/** get attributes
	* @return {Object} 
	*//** set attribute by key-value pair
	* @variant 2
	* @param {String} key
	* @param {*} value
	* @return {this}
	*//** set attributes by key-value object
	* @variant 3
	* @param {Object} attrs
	* @return {this}
	*/
	attr(...args) {
		var [a0,a1] = args
		if (!a0) { // no arguments, return attrs of this
			var ret = Object.assign({},this._attrs||{})
			var cls = this.class()
			if (cls) ret.class = cls
			return ret
		} else if (!a1) { // 1 argument
			if (typeof a0 !== "object") return this._error(`attr argument should be Object, is ${typeof a0}`)
			this._attrs = Object.assign(this._attrs||{},a0)
			var cls = this._attrs.class
			if (cls) {
				delete this._attrs.class
				this._class = []
				this.addClass(cls)
			}
			return this
		} else { // 2 arguments
			if (typeof a0 !== "string") return this._error(`key sohuld be String, is ${typeof a0}`)
			return this.attr({[a0]:a1})
		}
	}
	/** get string representation of the element
	* @return {String}
	*/
	toString() {
		var a = Object.entries(this._attrs).map(e => {
			var [k,v] = e
			v = v.toString()
			v = v.replace(/"/g,"&quot;")
			return `${k}="${v}"`
		})
		var cls = this.class()
		if (cls) a.push(`class="${cls}"`)
		a = a.length > 0 ? a = a.join(" ") : ""
		a = a ? ` ${a}` : ""
		var content = this._children.map(ch => ch.toString()).join("")
		var t = this.tag
		if (voidElements.includes(t)) return `<${t}${a}>`
		return `<${t}${a}>${content}</${t}>`
	}
	/** id getter
	* @return {String}
	*//** id setter
	* @param {String} v - new id
	* @return {this}
	*/
	id(v) {
		if (v === undefined) return this.attr("id")
		return this.attr("id",v)
	}
	/** class getter
	* @return {String} className attribute
	*//** class setter
	* @param {String} v - new className attribute
	* @return {this}
	*/
	class(v) {
		if (v === undefined) return (this._class||[]).join(" ")
		if (Array.isArray(v)) this._class = v.slice()
		else if (typeof v === "string") this._class = [v]
		else console.error(`Unsupported class argument: ${v}`)
		return this
	}
	/** add class(es)
	* @param {...String}
	* @return {this}
	*/
	addClass(...classes) {
		this._class = this._class || []
		if (classes.length === 1 && Array.isArray(classes[0])) classes = classes[0]
		this._class.push(...classes)
		this._class = this._class.filter((c,i,a) => i === a.indexOf(c))
		return this
	}
	//
	_clone(source) {
		this._tag = source.tag
		this.attr(source.attr())
		this._class = source._class.slice()
	}
}

/** Text node
* @param {String} text - text content
*/
class TextNode extends Node {
	constructor(text) {
		super()
		this._text = text
	}
	/** text content
	* @type {String}
	*/
	get text() {
		return this._text
	}
	/** get string representation of the node
	* @return {String}
	*/
	toString() {
		return this.text
	}
	_clone(source) {
		this._text = source.text
	}
}

class CommentNode extends Node {
	constructor(text) {
		super()
		this._text = text
	}
	/** commment content
	* @type {String}
	*/
	get text() {
		return this._text
	}
	/** get string representation of the node
	* @return {String}
	*/
	toString() {
		return `<!--${this.text}-->`
	}
	_clone(source) {
		this._text = source.text
	}
}

/** get current context node
* @return {Node}
*/
function getContext() {
	return context
}

module.exports = {
	Element,
	TextNode,
	CommentNode,
	getContext,
}
