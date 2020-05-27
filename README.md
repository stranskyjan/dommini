# [dommini](https://github.com/stranskyjan/dommini)
[![npm][npm-image]][npm-url]

JavaScript package for easy and lightweight creation of DOM trees and HTML files.
May be used as a template language (originally created from a module used for a private JSDoc template)

Features:
- no dependencies
- minimalistic syntax (see below demo and [examples](#usage--documentation))

<!-- embedme example/readme.demo.js -->
```js
const {Document,tags,utils} = require("dommini")
const {link,script,div,span,ol,li,a,p} = tags
const {text,comment,attr,addClass,shortcut} = utils

const customtag = shortcut("customtag")

doc = new Document({title:"dommini demo"})
doc.head.add([
   link().attr({rel:"stylesheet",href:"style.css"}),
   script().attr({type:"text/javascript",src:"script.js"})
])
doc.body.add(function(){
   div(ol(["home", "about", "contact"].map(title => {
      return li(a(title).attr({href:`${title}.html`}))
   }))).id("header").class("h-cls")
   comment("some comment")
   div(function(){
      attr({id:"body",class:"some-class"})
      addClass("another-class")
      p("Lorem ipsum")
      text("dolor sit amet")
   })
   customtag(div(),span())
})
console.log(doc.toString())
```
Output:
<!-- embedme example/readme.demo.html -->
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="generator" content="dommini 0.1.0">
    <title>dommini demo</title>
    <link rel="stylesheet" href="style.css">,
    <script type="text/javascript" src="script.js"></script>
  </head>
  <body>
    <div id="header" class="h-cls">
      <ol>
        <li>
          <a href="home.html">home</a>
        </li>
        <li>
          <a href="about.html">about</a>
        </li>
        <li>
          <a href="contact.html">contact</a>
        </li>
      </ol>
    </div>
    <!--some comment-->
    <div id="body" class="some-class another-class">
      <p>Lorem ipsum</p>
      dolor sit amet
    </div>
    <customtag>
      <div></div>
      <span></span>
    </customtag>
  </body>
</html>
```
See [usage section](#usage--documentation) for more details.

*Disclaimer: the true `dommini` output is "one-line" HTML code, please use an external lib to prettify it.*

## Installation
```sh
npm install dommini
```

## Documentation
- [inside this README](#usage--documentation)
- inside [source code](https://github.com/stranskyjan/dommini) :-)
- to build JSDoc html documentation:
   - run `npm run doc`
   - see `doc/out` directory

## Usage / documentation
### Table of Contents
- [Hello, world!](#hello-world)
- [Elements](#elements)
	- [Creating](#creating)
	- [Attributes](#attributes)
	- [Adding children](#adding-children)
	- [Context](#context)
	- [Other](#other)
- [Document](#document)
	- [html, head, body](#html-head-body)
	- [Attributes](#attributes-1)
	- [Other](#other-1)

### Hello, world!
<!-- embedme example/readme.hello.js -->
```js
const {html,body,h1} = require("dommini").tags
var e = html(body(h1('Hello, world!')))
console.log(e.toString())
```
<!-- embedme example/readme.hello.html -->
```html
<html>
  <body>
    <h1>
      Hello, world!
    </h1>
  </body>
</html>
```

### Elements
#### Creating
##### With `new` keyword
as `new Element(tag,...)`, `new CommentNode(comment)` or `new TextNode(text)`:
<!-- embedme example/readme.elements.creating.new.js -->
```js
const {Element,TextNode,CommentNode} = require("dommini")
var e = new Element("html", new Element("body",
   new CommentNode("some comment"),
   new Element("h1", "Hello"),
   new TextNode("world!")
))
console.log(e.toString())
```
<!-- embedme example/readme.elements.creating.new.html -->
```html
<html>
  <body>
    <!--some comment-->
    <h1>Hello</h1>
    world!
  </body>
</html>
```
##### Shortcuts
`dommini.tags` (should) contain shortcuts for [all HTML5 tags](https://www.w3schools.com/tags).
`dommini.utils` defines shortcut for `text` node and `comment` node.
<!-- embedme example/readme.elements.creating.shortcuts.js -->
```js
const {tags,utils} = require("dommini")
const {html,body,h1} = tags
const {text,comment} = utils
var e = html(body(
   comment("some comment"),
   h1("Hello"),
   text("world!")
))
console.log(e.toString())
```
<!-- embedme example/readme.elements.creating.shortcuts.html -->
```html
<html>
  <body>
    <!--some comment-->
    <h1>Hello</h1>
    world!
  </body>
</html>
```
##### Custom elements
Element tag can be any string.
`dommini.utils.shortcut` can also be used to shortcut it.
<!-- embedme example/readme.elements.creating.custom.js -->
```js
const {Element,utils} = require("dommini")
const {shortcut} = utils
const [customdiv,customspan] = [shortcut("customdiv"),shortcut("customspan")]
var e = customdiv([
   new Element("customh1"),
   customspan(),
])
console.log(e.toString())
```
<!-- embedme example/readme.elements.creating.custom.html -->
```html
<customdiv>
  <customh1></customh1>
  <customspan></customspan>
</customdiv>
```

#### Attributes
##### Setting
Set attributes
- with `elem.attr(...)` method passing an
	- key-value as two parameters
	- object of key-value pairs
- using shortcuts methods (currently for `elem.id` and `elem.class`)
- using `elem.addClass` to add class, passing
	- string
	- strings
	- array of strings
- using [context](#context) and `utils.attr` and `utils.addClass`:
<!-- embedme example/readme.elements.attr.set.js -->
```js
const {tags,utils} = require("dommini")
const {div} = tags
const {attr,addClass} = utils
// key-value two parameters
var e = div().attr("k1","val1")
console.log(e.toString())
// key-value object
var e = div().attr({k1:"val1",k2:"val2"})
console.log(e.toString())
// attr shortcuts
var e = div().id("42").class("cls")
console.log(e.toString())
// addClass - one string
var e = div().class("cls").addClass("cls-2")
console.log(e.toString())
// addClass - strings
var e = div().class("cls").addClass("cls-2","cls-3")
console.log(e.toString())
// addClass - array of strings
var e = div().class("cls").addClass(["cls-2","cls-3"])
console.log(e.toString())
// context
var e = div().context(function(){
   addClass("cls")
   attr({k1:"val1",k3:"val3"})
   addClass("cls-2")
})
console.log(e.toString())
```
<!-- embedme example/readme.elements.attr.set.html -->
```html
<div k1="val1"></div>
<div k1="val1" k2="val2"></div>
<div id="42" class="cls"></div>
<div class="cls cls-2"></div>
<div class="cls cls-2 cls-3"></div>
<div class="cls cls-2 cls-3"></div>
<div k1="val1" k3="val3" class="cls cls-2"></div>
```
##### Getting
To get currently set attributes, just call `elem.attr()` with no argument:
<!-- embedme example/readme.elements.attr.get.js -->
```js
const {div} = require("dommini").tags
var e = div().id("42").class("cls").attr("key","val")
console.log(e.attr())
```
<!-- embedme example/readme.elements.attr.get.js.out -->
```js
{ id: '42', key: 'val', class: 'cls' }
```

#### Adding children
##### At creation
Child nodes can be added at creation time:
- as a single element 
- as multiple elements
- as an array of elements
- using [context node](#context)
<!-- embedme example/readme.elements.adding.creation.js -->
```js
const {div,span,h1} = require("dommini").tags
// add one element
var e = div(span())
console.log(e.toString())
// add elements
var e = div(h1(),span())
console.log(e.toString())
// add array of elements
var e = div([h1(),span()])
console.log(e.toString())
// context
var e = div(function(){
   h1()
   span()
})
console.log(e.toString())
```
<!-- embedme example/readme.elements.adding.creation.html -->
```html
<div><span></span></div>
<div><h1></h1><span></span></div>
<div><h1></h1><span></span></div>
<div><h1></h1><span></span></div>
```
##### Using `element.add`
Child nodes can be added using `elem.add`:
- `add` a single element
- `add` multiple elements
- `add` array of elements
- `add` array of elements
- `put` a single element
- using [context node](#context)
<!-- embedme example/readme.elements.adding.add.js -->
```js
const {div,span,h1} = require("dommini").tags
// add one element
var e = div().add(span())
console.log(e.toString())
// add elements
var e = div().add(h1(),span())
console.log(e.toString())
// add array of elements
var e = div().add([h1(),span()])
console.log(e.toString())
// context
var e = div().add(function(){
   h1()
   span()
})
console.log(e.toString())
```
<!-- embedme example/readme.elements.adding.add.html -->
```html
<div><span></span></div>
<div><h1></h1><span></span></div>
<div><h1></h1><span></span></div>
<div><h1></h1><span></span></div>
```
Instead of `add`, one can `put` an element.
The difference between `add` and `put`:
- `elem.add(child)` return `elem`
- `elem.put(child)` return `child`
<!-- embedme example/readme.elements.adding.put.js -->
```js
const {div,span} = require("dommini").tags
var d = div()
var a = d.add(span())
console.log(a.toString()) // <div><span></span></div>
var s = d.put(span())
console.log(s.toString()) // <span></span>
```
<!-- embedme example/readme.elements.adding.put.html -->
```html
<div><span></span></div>
<span></span>
```

##### Using context
Using `elem.add` or `elem.context` method, all elements directly created inside given callback are added to the [context element](#context):
<!-- embedme example/readme.elements.adding.context.js -->
```js
const {div,span,h1} = require("dommini").tags
var e = div().context(function(){
   h1()
   span()
})
console.log(e.toString())
```
<!-- embedme example/readme.elements.adding.context.html -->
```html
<div><h1></h1><span></span></div>
```

#### Context
Using a function as a parameter of element constructor, `elem.add` or `elem.context` methods, the element is considered as the context element.
This means, that:
- `utils.attr` and `utils.addClass` functions are applied to that node
- all newly created "free" elements are added to the context element (in the order of creation)
<!-- embedme example/readme.elements.context.js -->
```js
const {tags,utils} = require("dommini")
const {section,div,span,h1} = tags
const {attr,addClass} = utils
var e = section()
e.context(function(){
   attr({id:"context",class:"cls"}) // attr of the context
   addClass("cls-2") // add class to the context
   var d = div().class("free") // "free" element
   var s = span().class("not-free") // NOT "free" element, added to "d"
   d.add(h1(),s)
})
console.log(e.toString())
```
<!-- embedme example/readme.elements.context.html -->
```js
<section id="context" class="cls cls-2">
  <div class="free">
    <h1></h1>
    <span class="not-free"></span>
  </div>
</section>
```
Context can also be nested
<!-- embedme example/readme.elements.context.nested.js -->
```js
const {tags,utils} = require("dommini")
const {section,div,span,h1} = tags
const {attr,addClass} = utils
var e = section().context(function(){
   attr({id:"section-1"})
   h1("section 1")
   div(function(){
      attr({id:"subsection-1.1"})
      h1("subsection 1.1")
      span()
   })
})
console.log(e.toString())
```
<!-- embedme example/readme.elements.context.nested.html -->
```js
<section id="section-1">
  <h1>section 1</h1>
  <div id="subsection-1.1">
    <h1>subsection 1.1</h1>
    <span></span>
  </div>
</section>
```
The concept is mainly useful for more complex code:
- conditions and cycles
- external functions
- ...
<!-- embedme example/readme.elements.context.complex.js -->
```js
const {tags,utils} = require("dommini")
const {main,section,div,span,h1,h2,a} = tags
const {attr,addClass} = utils

function box(title,content,level=1) {
   if (level === 1) {
      var sec = section(h1(title)).put(div(content))
   } else if (level === 2) {
      var sec = div(span(h2(title))).put(span(content))
   } else {
      var sec = span(title)
   }
   sec.context(function(){
      a(`see ${title}`).attr({href:`http://${title}`})
      if (title.endsWith("3")) addClass("title3")
   })
   return sec
}

var e = main(function(){
   box("main title",box("sub-sub-title","sub-sub-content",3))
   var subs = ["sub1","sub2","sub3"]
   subs.forEach(s => box(s,s.repeat(2),2))
})

console.log(e.toString())
```
<!-- embedme example/readme.elements.context.complex.html -->
```html
<main>
  <section>
    <h1>main title</h1>
    <div>
      <span>
        sub-sub-title
        <a href="http://sub-sub-title">see sub-sub-title</a>
      </span>
      <a href="http://main title">see main title</a>
    </div>
  </section>
  <div>
    <span>
      <h2>sub1</h2>
    </span>
    <span>
      sub1sub1
      <a href="http://sub1">see sub1</a>
    </span>
  </div>
  <div>
    <span>
      <h2>sub2</h2>
    </span>
    <span>
      sub2sub2
      <a href="http://sub2">see sub2</a>
    </span>
  </div>
  <div>
    <span>
      <h2>sub3</h2>
    </span>
    <span class="title3">
      sub3sub3
      <a href="http://sub3">see sub3</a>
    </span>
  </div>
</main>
```

#### Extending
`Element` class can be easily extended
<!-- embedme example/readme.elements.extending.js -->
```js
const {Element,tags} = require("dommini")
Element.prototype.href = function(address) {
   return this.attr("href",address)
}
var e = tags.a().href("https://github.com/")
console.log(e.toString())
```
<!-- embedme example/readme.elements.extending.html -->
```html
<a href="https://github.com/"></a>
```

#### Other
##### parent and children
Elements have `parent` and `children` attributes:
<!-- embedme example/readme.elements.other.parentchildren.js -->
```js
const {div,span,h1} = require("dommini").tags
var h = h1()
var s = span()
var d = div(h,s)
console.log(d.parent) // null
console.log(s.parent) // Element{_tag:'div',...}
console.log(s.children) // []
console.log(d.children) // [Element{_tag:'h1',...},Element{_tag:'span',...}]
```
##### remove
Node can be removed if needed.
<!-- embedme example/readme.elements.other.remove.js -->
```js
const {div,span} = require("dommini").tags
var d = div()
var s = d.put(span())
console.log(d.toString()) // <div><span></span></div>
s.remove()
console.log(d.toString()) // <div></div>
```
##### clone
Elements can be cloned.
<!-- embedme example/readme.elements.other.clone.js -->
```js
const {div,span} = require("dommini").tags
var d = div()
var s = span().id("span1")
d.add(s)
d.add(s) // s is removed before adding! so d has only 1 child
console.log(d.toString())
d.add(s.clone().id("span2")) // now it has 2 children
console.log(d.toString())
```
<!-- embedme example/readme.elements.other.clone.html -->
```html
<div><span id="span1"></span></div>
<div><span id="span1"></span><span id="span2"></span></div>
```

### Document
`dommini.Document` represents the complete document. it is created as `new Document(attrs)`, where `attrs` is an object with string values and keys:
- doctype="html"
- lang="en"
- charset="utf-8"
- title
- keywords
- author
- "application-name"
- description
- generator="dommini {version}"
Values are defaulted or optional.
<!-- embedme example/readme.document.js -->
```js
const {Document} = require("dommini")
var doc = new Document({keywords:"dommini js"})
console.log(doc.toString())
```
<!-- embedme example/readme.document.html -->
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="keywords" content="dommini js">
    <meta name="generator" content="dommini 0.1.0">
  </head>
  <body></body>
</html>
```

#### html, head, body
`html`, `head` and `body` elements are attributes of the Document instance
<!-- embedme example/readme.document.htmlheadbody.js -->
```js
const {Document,tags} = require("dommini")
const {div,span,script} = tags
var doc = new Document({generator:undefined})
doc.html.attr("manifest","/example.appcache")
doc.head.add(script())
doc.body.context(function(){
   div()
   span()
})
console.log(doc.toString())
```
<!-- embedme example/readme.document.htmlheadbody.html -->
```html
<!DOCTYPE html>
<html manifest="/example.appcache" lang="en">
  <head>
    <meta charset="utf-8">
    <script></script>
  </head>
  <body>
    <div></div>
    <span></span>
  </body>
</html>
```

#### Attributes
Similarly to [`element.attr`](#attributes), `document.attr()` works as a getter and `document.attr(...)` can set attributes as key-value two arguments or as an object of key-value pairs.
Have a look at [Document construction](#document) for available attributes.
In fact, you can set anything to the `Document`, but only the implemented stuff is meaningful and will have effect.
To create a (not yet) unsupported meta input, you can always create a meta element in `document.head`.
<!-- embedme example/readme.document.attr.js -->
```js
const {Document,tags} = require("dommini")
var {meta} = tags

var doc = new Document()
doc.attr({
   description:"document.attr",
   title:"attr",
   whatever: "anything",
})
doc.head.add(meta().attr({name:"some-name",content:"some-content"}))
console.log(doc.attr())
console.log(doc.toString())
```
<!-- embedme example/readme.document.attr.js.out -->
```js
{
  doctype: 'html',
  lang: 'en',
  title: 'attr',
  charset: 'utf-8',
  keywords: '',
  author: '',
  'application-name': '',
  description: 'document.attr',
  generator: 'dommini 0.1.0',
  whatever: 'anything'
}
```
<!-- embedme example/readme.document.attr.html -->
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="description" content="document.attr">
    <meta name="generator" content="dommini 0.1.0">
    <title>attr</title>
    <meta name="some-name" content="some-content">
  </head>
  <body></body>
</html>
```

#### Other
Document can be cloned.
<!-- embedme example/readme.document.other.js -->
```js
const {Document} = require("dommini")
var doc = new Document()
var doc2 = doc.clone()
console.log(doc.toString() === doc2.toString()) // true
doc.attr({title:"title"})
console.log(doc.toString() === doc2.toString()) // false
```

## TODO
- more DOM API functionality (insertAfter,...)?
- pretty printing?

## Contributing
is welcome :-)

## Maintainer
[Jan Stránský](https://www.npmjs.com/~stranskyjan)

## Acknowledgement
- inspired by [dominate python package](https://pypi.org/project/dominate/)
   - the context-defined adding of new elements)
   - partially this README and some examples

## License
[MIT](https://opensource.org/licenses/MIT)

[npm-image]: https://img.shields.io/npm/v/dommini
[npm-url]: https://npmjs.org/package/dommini
