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
