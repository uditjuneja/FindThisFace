(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{26:function(e,t,n){e.exports=n.p+"static/media/backgroundImage.da8a433f.png"},31:function(e,t,n){e.exports=n(73)},37:function(e,t,n){},39:function(e,t,n){},73:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),o=n(5),l=n.n(o),r=(n(37),n(12)),s=n(6),d=n(7),c=n(8),u=n(11),h=n(9),p=n(10),b=n(2),m=(n(39),n(13)),f=(n(42),n(24)),g=n.n(f);Object(m.registerPlugin)(g.a);var y=function(e){function t(e){var n;return Object(d.a)(this,t),(n=Object(u.a)(this,Object(h.a)(t).call(this,e))).state={files:[]},n}return Object(p.a)(t,e),Object(c.a)(t,[{key:"handleChange",value:function(){this.props.onChange(this.props.id,this.state.files)}},{key:"render",value:function(){var e=this;return i.a.createElement("div",{style:{textAlign:"center",flex:"1",minWidth:"45vw",padding:15}},i.a.createElement("h1",null,this.props.id),i.a.createElement(m.FilePond,{ref:function(t){return e.pond=t},allowMultiple:!0,acceptedFileTypes:["image/*"],onupdatefiles:function(t){e.setState({files:t.map(function(e){return e.file})}),e.handleChange()}},this.state.files.map(function(e,t){return i.a.createElement(m.File,{key:t,src:e,origin:"local"})})))}}]),t}(a.Component),v=n(25),O=n(26),j=n.n(O),x=n(27),E=function(e){function t(e){var n;return Object(d.a)(this,t),(n=Object(u.a)(this,Object(h.a)(t).call(this,e))).onOpenModal=function(){n.setState({open:!0})},n.onCloseModal=function(){n.setState({open:!1})},n.initialState={elements:[],disabled:!0,buttonText:"Add class",count:0,email:"",width:50,open:!1},n.state=n.initialState,n.handleFieldChange=n.handleFieldChange.bind(Object(b.a)(Object(b.a)(n))),n.renderFileUpload=n.renderFileUpload.bind(Object(b.a)(Object(b.a)(n))),n.handleSubmit=n.handleSubmit.bind(Object(b.a)(Object(b.a)(n))),n.fileUpload=n.fileUpload.bind(Object(b.a)(Object(b.a)(n))),n.handleEmailChange=n.handleEmailChange.bind(Object(b.a)(Object(b.a)(n))),n.handleWidthChange=n.handleWidthChange.bind(Object(b.a)(Object(b.a)(n))),n.onOpenModal=n.onOpenModal.bind(Object(b.a)(Object(b.a)(n))),n.onCloseModal=n.onCloseModal.bind(Object(b.a)(Object(b.a)(n))),n}return Object(p.a)(t,e),Object(c.a)(t,[{key:"handleFieldChange",value:function(e,t){var n=this;this.setState(Object(s.a)({},e,t));var a=0;this.state.elements.forEach(function(e){n.state[e]&&(a+=n.state[e].length)}),this.setState({count:a})}},{key:"handleEmailChange",value:function(e){this.setState({email:e.target.value})}},{key:"handleWidthChange",value:function(e){this.setState({width:e.target.value})}},{key:"renderFileUpload",value:function(e){return i.a.createElement(y,{id:e,onChange:this.handleFieldChange})}},{key:"handleSubmit",value:function(e){e.preventDefault(),this.onOpenModal(),this.fileUpload().then(function(e){console.log("Response is: \n"+e.data)})}},{key:"fileUpload",value:function(){var e=this,t=new FormData;this.state.elements.forEach(function(n){e.state[n]&&e.state[n].forEach(function(e){var a=n+"$"+e.name,i=new File([e],a);t.append("files",i)})}),t.append("email",this.state.email),t.append("width",this.state.width);return Object(v.post)("/submit",t,{headers:{"content-type":"multipart/form-data"}})}},{key:"render",value:function(){var e,t=this;return this.state.disabled?Object(r.a)({},w.button):w.button,e=this.state.count>10||0===this.state.count?Object(r.a)({},w.button):w.button,i.a.createElement("div",{style:{textAlign:"center",background:"url(".concat(j.a,")"),backgroundSize:"cover",paddingBottom:100,paddingTop:50}},i.a.createElement("div",{style:w.glowingText},"Find this Face"),i.a.createElement("div",{style:w.form},this.renderFileUpload("Upload Image"),i.a.createElement("label",{style:w.label},"All ]ill be resizedsuj tok some dimensions. Enter dimensions in Pixel(px)"),i.a.createElement("br",null),i.a.createElement("br",null),i.a.createElement("label",{style:w.label},"permissible error: "),i.a.createElement("input",{type:"number",value:this.state.width,onChange:this.handleWidthChange,style:Object(r.a)({},w.input,{width:120}),required:!0}),i.a.createElement("br",null),i.a.createElement("form",{onSubmit:this.handleSubmit,method:"post"},i.a.createElement("label",{style:w.label},"Email: "),i.a.createElement("input",{type:"email",value:this.state.email,onChange:this.handleEmailChange,style:w.input,required:!0}),i.a.createElement("button",{type:"submit",style:e},this.state.count>10?"Max 10 files":"Submit"))),i.a.createElement(x.a,{open:this.state.open,onClose:this.onCloseModal,onExited:function(){return t.setState(t.initialState)},center:!0},i.a.createElement("div",{style:{fontFamily:"roboto",fontSize:20,marginTop:50}},"Thank you for using our web service. Results will be mailed to ",this.state.email),i.a.createElement("div",{style:{display:"flex",flexDirection:"row",justifyContent:"space-evenly",paddingTop:50,flexWrap:"wrap"}})))}}]),t}(a.Component),w={input:{border:"none",borderBottom:"1px dashed #83A4C5",margin:"10px 3px",fontStyle:"italic",width:250,background:"transparent",fontFamily:"roboto",fontSize:20,color:"#1e1e1e"},label:{fontSize:20,fontFamily:"roboto"},button:{padding:"7px 30px",fontFamily:"roboto",borderRadius:"10px",marginLeft:"5px",fontSize:15,margin:"10px 3px",cursor:"pointer"},form:{background:"rgb(255,255,255,0.7)",paddingTop:30,paddingBottom:30,margin:"0 10px",borderRadius:10},glowingText:{color:"rgb(99, 54, 38)",background:"#333333",textShadow:"0 -1px 4px #FFF, 0 -2px 10px #ff0, 0 -10px 20px #ff8000, 0 -18px 40px #F00",fontFamily:"roboto",fontSize:50,margin:30,padding:30,borderRadius:10}},C=E;Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(i.a.createElement(C,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[31,2,1]]]);
//# sourceMappingURL=main.cd48ce5d.chunk.js.map