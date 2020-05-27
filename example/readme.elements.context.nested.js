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
