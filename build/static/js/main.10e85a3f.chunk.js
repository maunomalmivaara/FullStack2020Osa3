(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{15:function(e,n,t){e.exports=t(37)},37:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),u=t(14),o=t.n(u),c=t(2),l=t(3),i=function(e){var n=e.newName,t=e.newNumber,a=e.addPerson,u=e.handleNameChange,o=e.handleNumberChange;return r.a.createElement("div",null,r.a.createElement("form",{onSubmit:a},r.a.createElement("div",null,"Name: ",r.a.createElement("input",{value:n,onChange:u})),r.a.createElement("div",null,"Number: ",r.a.createElement("input",{value:t,onChange:o})),r.a.createElement("div",null,r.a.createElement("br",null),r.a.createElement("button",{type:"submit"},"Add"))))},m=function(e){var n=e.person;return r.a.createElement("li",null,n.name," ",n.number,r.a.createElement("button",{onClick:e.remove},"Delete"))},s=function(e){return r.a.createElement(r.a.Fragment,null,r.a.createElement("ul",null,e.personsToShow.map((function(n){return r.a.createElement(m,{key:n.id,person:n,remove:function(){return e.remove(n.id)}})}))))},d=function(e){var n=e.newFilter,t=e.handleFilterChange;return r.a.createElement(r.a.Fragment,null,r.a.createElement("form",null,r.a.createElement("div",null,"Filter shown with: ",r.a.createElement("input",{value:n,onChange:t}))))},f=function(e){var n=e.message,t=e.style,a={color:"red",background:"lightgrey",fontSize:"20px",borderStyle:"solid",borderRadius:"5px",padding:"10px",marginBottom:"10px"},u=Object(c.a)(Object(c.a)({},a),{},{color:"green"}),o=Object(c.a)(Object(c.a)({},a),{},{color:"blue"}),l="success"===t?u:"error"===t?a:o;return null===n?null:r.a.createElement("div",{style:l},n)},h=t(4),b=t.n(h),p="/api/persons",v=function(){return b.a.get(p).then((function(e){return e.data}))},E=function(e){return b.a.post(p,e).then((function(e){return e.data}))},g=function(e){return b.a.delete("".concat(p,"/").concat(e)).then((function(){return e}))},w=function(e,n){return b.a.put("".concat(p,"/").concat(e),n).then((function(e){return e.data}))},j=function(){var e=Object(a.useState)([]),n=Object(l.a)(e,2),t=n[0],u=n[1],o=Object(a.useState)(""),m=Object(l.a)(o,2),h=m[0],b=m[1],p=Object(a.useState)(""),j=Object(l.a)(p,2),O=j[0],y=j[1],N=Object(a.useState)(""),S=Object(l.a)(N,2),k=S[0],C=S[1],F=Object(a.useState)(null),x=Object(l.a)(F,2),A=x[0],D=x[1],J=Object(a.useState)("success"),M=Object(l.a)(J,2),P=M[0],T=M[1];Object(a.useEffect)((function(){v().then((function(e){u(e)}))}),[]);var B=function(e){var n=t.find((function(n){return n.id===e})),a=Object(c.a)(Object(c.a)({},n),{},{number:k});w(e,a).then((function(n){u(t.map((function(t){return t.id!==e?t:n}))),z("info","Updated number for ".concat(n.name),5e3)})).catch((function(e){z("error","Error: Information of ".concat(n.name," has already been removed from the server"),5e3)}))},I=function(){return t.map((function(e){return e.name})).includes(O)},z=function(e,n,t){T(e),D(n),H(t)},H=function(e){return setTimeout((function(){D(null)}),e)},R=t.filter((function(e){return e.name.startsWith(h)}));return r.a.createElement("div",null,r.a.createElement("h1",null,"Phonebook"),r.a.createElement(f,{message:A,style:P}),r.a.createElement(d,{newFilter:h,handleFilterChange:function(e){b(e.target.value)}}),r.a.createElement("h3",null,"Add New:"),r.a.createElement(i,{newName:O,newNumber:k,addPerson:function(e){if(e.preventDefault(),0!==O.length&&0!==k.length){if(I()){if(window.confirm("".concat(O," is already added to the phonebook.\nDo you want to replace the old number with a new one?"))){var n=t.find((function(e){return e.name===O}));B(n.id)}}else E({name:O,number:k}).then((function(e){u(t.concat(e)),z("success","Added ".concat(e.name),8e3)})).catch((function(e){z("error",e.response.data.error,5e3)}));y(""),C("")}else z("error","Name or number is missing",5e3)},handleNameChange:function(e){y(e.target.value)},handleNumberChange:function(e){C(e.target.value)}}),r.a.createElement("h3",null,"Numbers"),r.a.createElement(s,{personsToShow:R,remove:function(e){var n=t.find((function(n){return n.id===e})).name;window.confirm("Do you really want to delete ".concat(n,"?"))&&g(e).then((function(e){u(t.filter((function(n){return n.id!==e}))),z("success","Successfully removed ".concat(n," from the phonebook"),5e3)}))}}))};o.a.render(r.a.createElement(j,{persons:[{name:"Arto Hellas",number:"0405154499",id:1},{name:"Mauno Malmivaara",number:"0409654365",id:2},{name:"Jaska Jokunen",number:"0445952233",id:3},{name:"Maija Mehil\xe4inen",number:"0455952235",id:4}]}),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.10e85a3f.chunk.js.map