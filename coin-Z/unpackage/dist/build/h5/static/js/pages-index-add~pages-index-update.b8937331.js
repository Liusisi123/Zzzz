(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-add~pages-index-update"],{"0361":function(e,t,n){var i=n("24fb");t=i(!1),t.push([e.i,".view[data-v-5f5cf330]{margin:1rem}.submit[data-v-5f5cf330]{margin:2rem}.file-picker__box[data-v-5f5cf330]{width:100px;height:100px}",""]),e.exports=t},"55b8":function(e,t,n){"use strict";var i=n("4ea4");n("c740"),n("caad"),n("d81d"),n("a434"),n("d3b7"),n("ac1f"),n("3ca3"),n("5319"),n("ddb0"),n("2b3d"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=i(n("2909"));n("96cf");var a=i(n("1da1")),s=n("9114"),r=n("19aa9"),l=i(n("af28")),u={mixins:[r.spuAllTypeMixins],props:["type"],data:function(){return{bwCoinCDNUrl:s.bwCoinImgcdnUrl,msgType:"success",messageText:"",URL:URL,title:"新增",form:{spuName:"",price:"",title:"",type:"",mainUrl:[],imgs:[]},typeOpts:[]}},mounted:function(){console.log("this.type",this.type),this.initspuAllTypeOptsMixins(),["update"].includes(this.type)&&this.getDetail()},onLoad:function(e){e.item&&(this.form=JSON.parse(decodeURIComponent(e.item)))},methods:{getUrl:function(e){if(console.log("blob",e),0!=e.length){var t=null,n=[];return n.push(e[0].file),t=window.URL.createObjectURL(new Blob(n,{type:"application/pdf;chartset=UTF-8"})),console.log("url",t),console.log("this.form.mainUrl",t,this.form.mainUrl),t}},getDetail:function(){var e=this;l.default.getDetailApi({code:this.$route.query.code}).then((function(t){console.log("res---",t),e.form=t,e.form.mainUrl=[{url:e.bwCoinCDNUrl+t.mainUrl}],console.log("this.form.mainUrl",e.form.mainUrl),e.form.imgs=t.imgs.map((function(t){return{fileID:t.id,id:t.id,url:e.bwCoinCDNUrl+t.imgUrl,imgUrl:t.imgUrl}})),console.log("this.form.imgs",e.form.imgs)}))},addSub:function(){var e=this;return(0,a.default)(regeneratorRuntime.mark((function t(){var n,i,o,r,u,c;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=e.form.imgs,i=e.form.mainUrl,console.log("imgs---",n),console.log("mainUrl",i),t.next=6,(0,s.getAliOosClient)("bwcoin");case 6:if(o=t.sent,!i||!i[0].file){t.next=17;break}return r=i,console.log("file",r),t.next=12,o.put("spu-main-url-"+e.form.spuName.replace(/\s/g,"-")+"."+r[0].extname,r[0].file);case 12:u=t.sent,console.log("result",u),e.form.mainUrl=[u.name],t.next=18;break;case 17:e.form.mainUrl=e.form.mainUrl.map((function(e){var t=e.url.replace("https://bwcoin.oss-cn-beijing.aliyuncs.com/","");return console.log("img",t),t}));case 18:return console.log("this.form.mainUrl",e.form.mainUrl),t.next=21,Promise.all(n.map(function(){var t=(0,a.default)(regeneratorRuntime.mark((function t(i,a){var s,r,l;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!i.file){t.next=10;break}return s=i,console.log("file",s),t.next=5,o.put("spu-imgs-"+e.form.spuName.replace(/\s/g,"-")+a+"."+s.extname,s.file);case 5:r=t.sent,console.log("result",r),n[a]={id:0,imgUrl:r.name},t.next=12;break;case 10:l=n[a].url.replace("https://bwcoin.oss-cn-beijing.aliyuncs.com/",""),n[a]={id:n[a].fileID,imgUrl:l};case 12:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}()));case 21:console.log("imgs",n),c={spuName:e.form.spuName,price:e.form.price,desc:e.form.desc,type:e.form.type,imgs:e.form.imgs,mainUrl:e.form.mainUrl[0]},console.log("params",c),e.form.spuCode?(c.spuCode=e.form.spuCode,l.default.spuUpdateApi(c).then((function(e){uni.showToast({title:"编辑成功"}),setTimeout((function(){uni.navigateBack({delta:1})}),2e3)}))):(console.log("params",c),l.default.spuCreateApi(c).then((function(e){uni.showToast({title:"新增成功"}),setTimeout((function(){uni.navigateBack({delta:1})}),2e3)})));case 25:case"end":return t.stop()}}),t)})))()},addSub1:function(){var e=this;return(0,a.default)(regeneratorRuntime.mark((function t(){var n,i,o,a,r,l,u,c,m,f;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e.form.spuCode){t.next=5;break}n={spuName:e.form.spuName,price:e.form.price,desc:e.form.desc,spuCode:e.form.spuCode},uni.request({url:"".concat(e.$baseUrl,"/spu/update"),method:"POST",data:n,success:function(e){uni.showToast({title:"编辑成功"}),setTimeout((function(){uni.navigateBack({delta:1})}),2e3)},fail:function(e){}}),t.next=39;break;case 5:i=e.form.imgs,console.log("list",i),o=0;case 8:if(!(o<i.length)){t.next=24;break}if(console.log("list[i]",i[o]),"object"!==typeof i[o]){t.next=21;break}return t.next=13,(0,s.getAliOosClient)("bwcoin");case 13:return a=t.sent,r=i[o],console.log("file",r),t.next=18,a.put("spu-imgs-"+e.form.spuName.replace(/\s/g,"-")+o+"."+r.extname,r.file);case 18:l=t.sent,console.log("result",l),i[o]={imgUrl:l.name};case 21:o++,t.next=8;break;case 24:if(console.log("typeof this.form.mainUrl",typeof e.form.mainUrl),"object"!==typeof e.form.mainUrl){t.next=36;break}return t.next=28,(0,s.getAliOosClient)("bwcoin");case 28:return u=t.sent,c=e.form.mainUrl,console.log("file",c),t.next=33,u.put("spu-main-url-"+e.form.spuName.replace(/\s/g,"-")+"."+c[0].extname,c[0].file);case 33:m=t.sent,console.log("result",m),e.form.mainUrl=[m.name];case 36:f={spuName:e.form.spuName,price:e.form.price,desc:e.form.desc,type:e.form.type,imgs:e.form.imgs,mainUrl:e.form.mainUrl[0]},console.log("params",f),uni.request({url:"".concat(e.$baseUrl,"/spu/create"),method:"POST",data:f,success:function(e){e&&(uni.showToast({title:"新增成功"}),setTimeout((function(){uni.navigateBack({delta:1},2e3)})))},fail:function(e){console.log("err",e)}});case 39:case"end":return t.stop()}}),t)})))()},validateFile:function(e){return!(e.size/1024/1024>.1)||(this.messageToggle("error"),!1)},selectMain:function(e){console.log("file",e),this.form.mainUrl=e.tempFiles},select:function(e){var t;console.log("选择文件：",e),(t=this.form.imgs).push.apply(t,(0,o.default)(e.tempFiles)),console.log("this.form.imgs",this.form.imgs)},deletephoto:function(e){console.log("e",e);var t=this.form.imgs.findIndex((function(t){e.tempFilePath,t.url}));this.form.imgs.splice(t,1),console.log("this.form.imgs",this.form.imgs)},progress:function(e){console.log("上传进度：",e)},success:function(e){console.log("上传成功",e)},fail:function(e){console.log("上传失败：",e)},changeType:function(e){console.log("e:-----",e)},handleBut:function(){console.log("===="),uni.navigateBack({delta:1})}}};t.default=u},"58cf":function(e,t,n){"use strict";n.r(t);var i=n("af8c"),o=n("d13c");for(var a in o)"default"!==a&&function(e){n.d(t,e,(function(){return o[e]}))}(a);n("f0f4");var s,r=n("f0c5"),l=Object(r["a"])(o["default"],i["b"],i["c"],!1,null,"5f5cf330",null,!1,i["a"],s);t["default"]=l.exports},9063:function(e,t,n){var i=n("0361");i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var o=n("4f06").default;o("084b74f1",i,!0,{sourceMap:!1,shadowMode:!1})},af8c:function(e,t,n){"use strict";n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return i}));var i={uniForms:n("71e4").default,uniFormsItem:n("aeba").default,uniEasyinput:n("17de").default,uniDataSelect:n("1e7f").default,uniFilePicker:n("9612").default,uniPopup:n("be18").default,uniPopupMessage:n("bd5d").default},o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-uni-view",{staticClass:"view"},[["update"].includes(e.type)?n("v-uni-view",{staticStyle:{"font-size":"16px","font-weight":"bold"}},[e._v("编辑")]):n("v-uni-view",{staticStyle:{"font-size":"16px","font-weight":"bold"}},[e._v("新增")]),n("uni-forms",{attrs:{modelValue:e.form,"label-position":"left","label-width":"100px"}},[n("uni-forms-item",{attrs:{label:"商品名称:",name:"spuName"}},[n("uni-easyinput",{staticStyle:{width:"400rpx"},attrs:{type:"text",placeholder:"请输入商品名称"},model:{value:e.form.spuName,callback:function(t){e.$set(e.form,"spuName",t)},expression:"form.spuName"}})],1),n("uni-forms-item",{attrs:{label:"价格:",name:"price"}},[n("uni-easyinput",{staticStyle:{width:"400rpx"},attrs:{type:"text",placeholder:"请输入价格"},model:{value:e.form.price,callback:function(t){e.$set(e.form,"price",t)},expression:"form.price"}})],1),n("uni-forms-item",{attrs:{label:"描述:",name:"desc"}},[n("uni-easyinput",{staticStyle:{width:"400rpx"},attrs:{type:"text",placeholder:"请输入标题"},model:{value:e.form.desc,callback:function(t){e.$set(e.form,"desc",t)},expression:"form.desc"}})],1),n("uni-forms-item",{attrs:{label:"所属分类:",name:"type"}},[n("uni-data-select",{staticStyle:{width:"400rpx"},attrs:{localdata:e.spuAllTypeOptsMixins},on:{change:function(t){arguments[0]=t=e.$handleEvent(t),e.changeType.apply(void 0,arguments)}},model:{value:e.form.type,callback:function(t){e.$set(e.form,"type",t)},expression:"form.type"}})],1),n("uni-forms-item",{attrs:{label:"上传主页图:",name:"mainUrl"}},[n("uni-file-picker",{ref:"uploadMain",attrs:{fileMediatype:"image","del-icon":!1,"disable-preview":!0,limit:"1"},on:{select:function(t){arguments[0]=t=e.$handleEvent(t),e.selectMain.apply(void 0,arguments)}},model:{value:e.form.mainUrl,callback:function(t){e.$set(e.form,"mainUrl",t)},expression:"form.mainUrl"}})],1),n("uni-forms-item",{attrs:{label:"上传详情图:",name:"type"}},[n("uni-file-picker",{ref:"upload",attrs:{fileMediatype:"image",mode:"grid",limit:"9"},on:{select:function(t){arguments[0]=t=e.$handleEvent(t),e.select.apply(void 0,arguments)},progress:function(t){arguments[0]=t=e.$handleEvent(t),e.progress.apply(void 0,arguments)},success:function(t){arguments[0]=t=e.$handleEvent(t),e.success.apply(void 0,arguments)},delete:function(t){arguments[0]=t=e.$handleEvent(t),e.deletephoto.apply(void 0,arguments)},fail:function(t){arguments[0]=t=e.$handleEvent(t),e.fail.apply(void 0,arguments)}},model:{value:e.form.imgs,callback:function(t){e.$set(e.form,"imgs",t)},expression:"form.imgs"}})],1)],1),n("v-uni-view",{staticClass:"jump-next-area"},[n("v-uni-button",{staticClass:"jump-next submit",attrs:{size:"mini",type:"primary"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.addSub.apply(void 0,arguments)}}},[e._v("保存")]),n("v-uni-button",{staticClass:"jump-next submit",attrs:{size:"mini",type:"primary"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.handleBut.apply(void 0,arguments)}}},[e._v("取消")])],1),n("v-uni-view",[n("uni-popup",{ref:"message",attrs:{type:"message"}},[n("uni-popup-message",{attrs:{type:e.msgType,message:e.messageText,duration:2e3}})],1)],1)],1)},a=[]},d13c:function(e,t,n){"use strict";n.r(t);var i=n("55b8"),o=n.n(i);for(var a in i)"default"!==a&&function(e){n.d(t,e,(function(){return i[e]}))}(a);t["default"]=o.a},f0f4:function(e,t,n){"use strict";var i=n("9063"),o=n.n(i);o.a}}]);