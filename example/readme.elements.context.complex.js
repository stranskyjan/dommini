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
