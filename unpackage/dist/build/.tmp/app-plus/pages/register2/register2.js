(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/register2/register2"],{"3f5a":function(e,t,r){"use strict";var n=function(){var e=this,t=e.$createElement;e._self._c},o=[];r.d(t,"a",function(){return n}),r.d(t,"b",function(){return o})},5053:function(e,t,r){"use strict";r.r(t);var n=r("3f5a"),o=r("d228");for(var i in o)"default"!==i&&function(e){r.d(t,e,function(){return o[e]})}(i);r("ea5d");var a=r("2877"),s=Object(a["a"])(o["default"],n["a"],n["b"],!1,null,null,null);t["default"]=s.exports},9578:function(e,t,r){},d228:function(e,t,r){"use strict";r.r(t);var n=r("e421"),o=r.n(n);for(var i in n)"default"!==i&&function(e){r.d(t,e,function(){return n[e]})}(i);t["default"]=o.a},e421:function(e,t,r){"use strict";(function(e,n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=getApp().globalData,i=r("28c1"),a=(r("b6a1"),{data:function(){return{iconURL:o.dataBase.iconURL,rBtn:!0}},components:{},props:{},onLoad:function(e){},methods:{tologin:function(){var t=this,r=plus.runtime.appid;console.log(e("app端登陆"," at pages\\register2\\register2.vue:49"));var n=null;plus.oauth.getServices(function(o){if(o&&o.length){for(var a=0,s=o.length;a<s;a++)if("weixin"===o[a].id){n=o[a],console.log(e("授权对象"," at pages\\register2\\register2.vue:57")),console.log(e(n," at pages\\register2\\register2.vue:58"));break}if(!n)return void console.log(e("没有微信登录授权服务"," at pages\\register2\\register2.vue:63"));n.authorize(function(r){console.log(e(r," at pages\\register2\\register2.vue:68")),console.log(e(r.code,"这次是真的授权后返回的code"," at pages\\register2\\register2.vue:69")),i.getUserSessionKey2(r.code),t.weixinCode=r.code;t.weixinCode},function(t){console.error(e("authorize fail:"+JSON.stringify(t)," at pages\\register2\\register2.vue:80"))},{appid:r})}else console.log(e("无可用的登录授权服务"," at pages\\register2\\register2.vue:86"))},function(t){console.error(e("getServices fail:"+JSON.stringify(t)," at pages\\register2\\register2.vue:89"))})},routerOut:function(){n.navigateBack({delta:1})},setData:function(e){var t=this,r=[];Object.keys(e).forEach(function(n){r=n.split("."),e[n],t.$data,r.forEach(function(r,o){t[n]=e[n]})})}}});t.default=a}).call(this,r("0de9")["default"],r("6e42")["default"])},ea5d:function(e,t,r){"use strict";var n=r("9578"),o=r.n(n);o.a}},[["ba90","common/runtime","common/vendor"]]]);