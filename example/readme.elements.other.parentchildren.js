const {div,span,h1} = require("dommini").tags
var h = h1()
var s = span()
var d = div(h,s)
console.log(d.parent) // null
console.log(s.parent) // Element{_tag:'div',...}
console.log(s.children) // []
console.log(d.children) // [Element{_tag:'h1',...},Element{_tag:'span',...}]
