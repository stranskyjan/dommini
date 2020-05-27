const Document = require("./lib/document")
const {Element,TextNode,CommentNode} = require("./lib/node")
const tags = require("./lib/tags")
const utils = require("./lib/utils")

module.exports = {
	Document,
	Element,
	TextNode,
	CommentNode,
	tags,
	utils,
}
