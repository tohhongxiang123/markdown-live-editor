(this["webpackJsonpreact-text-editor"]=this["webpackJsonpreact-text-editor"]||[]).push([[0],{10:function(e,t,n){e.exports={root:"Gutter_root__2UKma",button:"Gutter_button__3Hu4L"}},32:function(e,t,n){e.exports={root:"RichTextInput_root___cHgN"}},349:function(e,t,n){},351:function(e,t,n){},352:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(31),l=n.n(o),c=n(4),u=n(7),i=n.n(u),s=n(33),m=n(54),d=n.n(m),f=n(17),g=n.n(f),E=n(55),v=n.n(E),p=n(357),b=(n(355),n(356)),_=n(56),h=n.n(_);function w(e){var t=e.language,n=e.value,a={backgroundColor:"#272822",padding:"0 10px 5px 0",borderRadius:"5px",maxWidth:"100%",whiteSpace:"pre-wrap",wordWrap:"break-word"},o={color:"#fafafa",textAlign:"right"};return r.a.createElement("div",{style:a},r.a.createElement(p.a,{language:t,style:b.a,className:h.a.code},n),r.a.createElement("div",{style:o},r.a.createElement("small",null,r.a.createElement("em",null,t))))}var C=n(59),S=n.n(C),x=function(e){var t=Object(s.a)({},e,{plugins:[v.a],renderers:Object(s.a)({},e.renderers,{math:function(e){var t=e.value;return r.a.createElement(g.a.Node,null,t)},inlineMath:function(e){var t=e.value;return r.a.createElement(g.a.Node,{inline:!0},t)},code:function(e){var t=e.language,n=e.value;return r.a.createElement(w,{language:t,value:n})}})});return r.a.createElement(g.a.Context,{input:"tex"},r.a.createElement(d.a,Object.assign({},t,{escapeHtml:!0,className:S.a.root})))},y=n(32),N=n.n(y),j=n(60);n(345),n(346);function k(e){var t=e.updatePreview,n=Object(a.useState)(""),o=Object(c.a)(n,2),l=o[0],u=o[1],i=Object(a.useState)(null),s=Object(c.a)(i,2),m=s[0],d=s[1];return r.a.createElement("div",{className:N.a.root,onClick:function(){return m.focus()}},r.a.createElement(j.Controlled,{editorDidMount:function(e){return d(e)},className:N.a.editor,value:l,options:{mode:"markdown",theme:"material",lineNumbers:!0,lineWrapping:!0,indentWithTabs:!0,smartIndent:!0,autofocus:!0,highlightFormatting:!0,fencedCodeBlockHighlighting:!0},onBeforeChange:function(e,t,n){return u(n)},onChange:function(e,n,a){u(a),t(a)}}))}var O=n(10),P=n.n(O);function B(e){var t=e.toggleEditor,n=e.togglePreview,a=e.isEditorShown,o=e.isPreviewShown;return r.a.createElement("ul",{className:P.a.root},o?r.a.createElement("li",null,r.a.createElement("button",{className:P.a.button,onClick:t},a?"<":">")):null,a?r.a.createElement("li",null,r.a.createElement("button",{className:P.a.button,onClick:n},o?">":"<")):null,r.a.createElement("li",null,r.a.createElement("button",{className:P.a.button},"Save")))}var J=n(19);function H(){var e=Object(a.useState)(""),t=Object(c.a)(e,2),n=t[0],o=t[1],l=Object(a.useState)(!0),u=Object(c.a)(l,2),s=u[0],m=u[1],d=Object(a.useState)(!0),f=Object(c.a)(d,2),g=f[0],E=f[1];return r.a.createElement(J.ScrollSync,{className:i.a.root},r.a.createElement("div",{style:{display:"grid",gridTemplateColumns:s&&g?"1fr 1fr auto":s&&!g?"1fr auto":!s&&g?"1fr auto":"auto",justifyContent:"stretch"}},r.a.createElement(J.ScrollSyncPane,null,r.a.createElement("div",{className:"".concat(i.a.scrollContainer," ").concat(i.a.editorContainer),style:{display:s?"block":"none"}},r.a.createElement(k,{updatePreview:function(e){o(e)}}))),r.a.createElement(J.ScrollSyncPane,null,r.a.createElement("div",{className:"".concat(i.a.scrollContainer," ").concat(i.a.previewerContainer),style:{display:g?"block":"none"}},r.a.createElement(x,{source:n}))),r.a.createElement(B,{toggleEditor:function(){m((function(e){return!e}))},togglePreview:function(){E((function(e){return!e}))},isEditorShown:s,isPreviewShown:g})))}n(349),n(350),n(351);l.a.render(r.a.createElement((function(){return r.a.createElement("div",null,r.a.createElement(H,null))}),null),document.querySelector("#root"))},56:function(e,t,n){e.exports={root:"CodeBlock_root__SrJzM",code:"CodeBlock_code__JAIR4",footer:"CodeBlock_footer__3chsi"}},59:function(e,t,n){e.exports={root:"Previewer_root__1ONgP"}},61:function(e,t,n){e.exports=n(352)},7:function(e,t,n){e.exports={toolbar:"Layout_toolbar__w4AJu",scrollContainer:"Layout_scrollContainer__34taz"}}},[[61,1,2]]]);
//# sourceMappingURL=main.42279862.chunk.js.map