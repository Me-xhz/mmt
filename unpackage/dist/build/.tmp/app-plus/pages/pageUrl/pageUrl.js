(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/pageUrl/pageUrl"],{3479:function(e,t,a){"use strict";a.r(t);var n=a("d2d8"),r=a("7558");for(var s in r)"default"!==s&&function(e){a.d(t,e,function(){return r[e]})}(s);a("4a51");var i=a("2877"),l=Object(i["a"])(r["default"],n["a"],n["b"],!1,null,null,null);t["default"]=l.exports},"4a51":function(e,t,a){"use strict";var n=a("7f0a"),r=a.n(n);r.a},7558:function(e,t,a){"use strict";a.r(t);var n=a("7e60"),r=a.n(n);for(var s in n)"default"!==s&&function(e){a.d(t,e,function(){return n[e]})}(s);t["default"]=r.a},"7e60":function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=getApp().globalData,r=(a("28c1"),{data:function(){return{pageUrl:""}},components:{},props:{},onLoad:function(e){this.type=e.type,e.share_title&&"undefined"!=e.share_title?this.share_title=e.share_title:this.share_title="天天买买提",e.pageUrl&&"undefined"!=e.pageUrl&&(n.dataBase.pageUrl=e.pageUrl),this.setData({pageUrl:n.dataBase.pageUrl})},onShareAppMessage:function(t){return"activity"==this.type?{title:this.share_title,path:"/pages/pageUrl/pageUrl?pageUrl="+n.dataBase.pageUrl,success:function(t){console.log(e("转发成功"," at pages\\pageUrl\\pageUrl.vue:46"))}}:"video"==this.type?{title:this.share_title,path:"/pages/index/index",success:function(t){console.log(e("转发成功"," at pages\\pageUrl\\pageUrl.vue:54"))}}:void 0},methods:{pageSuccess:function(){console.log(e(n.dataBase.pageUrl," at pages\\pageUrl\\pageUrl.vue:62")),"https://share.lltjs.com/app/index.php?i=2&c=entry&from=account&account=a450f613484aea3458ac7a7eba952d720d671557&xid=&do=entry&m=llt_afan"==n.dataBase.pageUrl&&setTimeout(function(){wx.navigateBack({delta:1})},5e3)},setData:function(e){var t=this,a=[];Object.keys(e).forEach(function(n){a=n.split("."),e[n],t.$data,a.forEach(function(a,r){t[n]=e[n]})})}}});t.default=r}).call(this,a("0de9")["default"])},"7f0a":function(e,t,a){},d2d8:function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement;e._self._c},r=[];a.d(t,"a",function(){return n}),a.d(t,"b",function(){return r})}},[["8fde","common/runtime","common/vendor"]]]);