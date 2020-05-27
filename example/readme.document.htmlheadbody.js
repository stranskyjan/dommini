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
