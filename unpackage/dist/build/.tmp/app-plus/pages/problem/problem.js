(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/problem/problem"],{"1d7c1":function(t,e,i){"use strict";var n=i("80aa"),s=i.n(n);s.a},"49cc":function(t,e,i){"use strict";function n(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s=getApp().globalData,o=i("28c1"),a={data:function(){return{iconURL:s.dataBase.iconURL,subindex:0,questionList:[],moblie:"10086",showVideo:!1,videoSrc:"",k:!1,key:""}},components:{},props:{},onLoad:function(t){this.getQuestionList()},onReady:function(){},onShow:function(){},onHide:function(){},onUnload:function(){},onPullDownRefresh:function(){},onReachBottom:function(){},methods:{showToggle:function(t){var e=this,i=t.currentTarget.dataset.id,s="questionList.textList["+i+"].isSubShow",o=this.questionList.textList[i].isSubShow;this.setData({subindex:i}),this.questionList.textList.forEach(function(t,a){var u="questionList.textList["+a+"].isSubShow";e.setData(n({},u,!1)),a==i&&e.setData(n({},s,!o)),t.subItems.forEach(function(t,i){var s="questionList.textList["+a+"].subItems["+i+"].isThirdShow";e.setData(n({},s,!1))})})},showThirdToggle:function(t){var e=this,i=t.currentTarget.dataset.id,s=this.questionList.textList[this.subindex].subItems[i].isThirdShow,o="questionList.textList["+this.subindex+"].subItems["+i+"].isThirdShow";this.questionList.textList[this.subindex].subItems.forEach(function(t,a){var u="questionList.textList["+e.subindex+"].subItems["+a+"].isThirdShow";e.setData(n({},u,!1)),a==i&&e.setData(n({},o,!s))})},callPhone:function(){o.phoneCall(s.globalData.hotline)},toFeedBook:function(){wx.navigateTo({url:"/pages/problem/feedBook/feedBook"})},getQuestionList:function(){var t=this,e=s.getPath.questionlist,i={};o.ApiGateWayTest(e,i,!0,function(e){if(e&&e.data&&1==e.data.success){for(var i=e.data.result,n=0;n<i.textList.length;n++){i.textList[n].isSubShow=!1;for(var s=0;s<i.textList[n].subItems.length;s++)i.textList[n].subItems[s].isThirdShow=!1}t.setData({questionList:i})}})},openVideo:function(t){var e=t.currentTarget.dataset.src;this.setData({videoSrc:e,showVideo:!0})},closeVideo:function(){this.setData({showVideo:!1,videoSrc:""})},setData:function(t){var e=this,i=[];Object.keys(t).forEach(function(n){i=n.split("."),t[n],e.$data,i.forEach(function(i,s){e[n]=t[n]})})}}};e.default=a},"660f":function(t,e,i){"use strict";i.r(e);var n=i("49cc"),s=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,function(){return n[t]})}(o);e["default"]=s.a},"80aa":function(t,e,i){},cf51:function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement;t._self._c},s=[];i.d(e,"a",function(){return n}),i.d(e,"b",function(){return s})},e104:function(t,e,i){"use strict";i.r(e);var n=i("cf51"),s=i("660f");for(var o in s)"default"!==o&&function(t){i.d(e,t,function(){return s[t]})}(o);i("1d7c1");var a=i("2877"),u=Object(a["a"])(s["default"],n["a"],n["b"],!1,null,null,null);e["default"]=u.exports}},[["343c","common/runtime","common/vendor"]]]);