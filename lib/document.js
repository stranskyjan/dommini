const {Element} = require("./node")
const version = require("../package.json").version // TODO?

/** Document
* @param {Object} attrs
* @param {String} [attrs.doctype="html"]
* @param {String} [attrs.lang="en"]
* @param {String} [attrs.title]
* @param {String} [attrs.charset="utf-8"]
* @param {String} [attrs.keywords]
* @param {String} [attrs.author]
* @param {String} [attrs."application-name"]
* @param {String} [attrs.description]
* @param {String} [attrs.generator]
*/
class Document {
	constructor(attrs={}) {
		this._html = new Element("html")
		this._head = this._html.put(new Element("head"))
		this._body = this._html.put(new Element("body"))
		this._attrs = {}
		this.attr(attrs)
		//
		attrs = Object.assign({
			doctype: "html",
			lang: "en",
			title: "",
			charset: "utf-8",
			keywords: "",
			author: "",
			"application-name": "",
			description: "",
			generator: `dommini ${version}`,
		},attrs)
		this.attr(attrs)
	}
	/** document's html element
	* @type {Element}
	* @readonly
	*/
	get html() { return this._html }
	/** document's head element
	* @type {Element}
	* @readonly
	*/
	get head() { return this._head }
	/** document's body element
	* @type {Element}
	* @readonly
	*/
	get body() { return this._body }
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
			return Object.assign({},this._attrs)
		} else if (!a1) { // 1 argument
			if (typeof a0 !== "object") return this._error(`attr argument should be Object, is ${typeof a0}`)
			this._attrs = Object.assign(this._attrs,a0)
			return this
		} else { // 2 arguments
			if (typeof a0 !== "string") return this._error(`key sohuld be String, is ${typeof a0}`)
			return this.attr({[a0]:a1})
		}
	}
	/** clone document
	* @return {Document}
	*/
	clone() {
		var ret = new Document(this.attr())
		ret._html = this.html.clone()
		ret._head = ret.html.children.find(ch => ch.tag === "head")
		ret._body = ret.html.children.find(ch => ch.tag === "body")
		return ret
	}
	/** get string representation of the document
	* @return {String}
	*/
	toString() {
		var doc = this.clone()
		var {doctype,lang,title,charset,keywords,author,description,generator,...attrs} = this.attr()
		doc.html.attr("lang",lang)
		var meta = a => new Element("meta").attr(a)
		var chs = []
		if (charset) chs.push(meta({charset}))
		if (keywords) chs.push(meta({name:"keywords",content:keywords}))
		if (author) chs.push(meta({name:"author",content:author}))
		if (description) chs.push(meta({name:"description",content:description}))
		if (generator) chs.push(meta({name:"generator",content:generator}))
		if (title) chs.push(new Element("title",title))
		doc.head._children = [...chs, doc.head._children]
		return `<!DOCTYPE ${doctype}>` + doc.html.toString()
	}
	//
	_error(msg) {
		console.error(msg)
		return this
	}
}

module.exports = Document
