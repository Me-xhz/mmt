(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/confirm/invoice/invoice"],{"25d1":function(t,e,a){"use strict";var n=a("26d7"),i=a.n(n);i.a},"26d7":function(t,e,a){},ab48:function(t,e,a){"use strict";a.r(e);var n=a("ecc8"),i=a.n(n);for(var o in n)"default"!==o&&function(t){a.d(e,t,function(){return n[t]})}(o);e["default"]=i.a},b8ce:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement;t._self._c},i=[];a.d(e,"a",function(){return n}),a.d(e,"b",function(){return i})},eaae:function(t,e,a){"use strict";a.r(e);var n=a("b8ce"),i=a("ab48");for(var o in i)"default"!==o&&function(t){a.d(e,t,function(){return i[t]})}(o);a("25d1");var s=a("2877"),c=Object(s["a"])(i["default"],n["a"],n["b"],!1,null,null,null);e["default"]=c.exports},ecc8:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=getApp().globalData,i=a("28c1"),o={data:function(){return{paperInvoice:!1,typeTap:"none",upTap:"personal",companyName:"",taxesCode:"",Invoicedata:"",invoiceData:""}},components:{},props:{},onLoad:function(t){if(void 0!=t&&void 0!=t.invoiceData){var e=this;if(t&&t.invoiceData){var a=JSON.parse(t.invoiceData);Object.keys(a).length>0&&e.setData({typeTap:a.type,upTap:a.up,companyName:a.companyName,taxesCode:a.taxesCode})}e.getInvoiceConfig()}else i.toast("请求参数错误")},methods:{getInvoiceConfig:function(){var t=this,e=n.getPath.getInvoiceConfig;i.ApiGateWayTest(e,"",!0,function(e){if(200==e.statusCode){e=e.data.result;t.setData({Invoicedata:e})}})},invoiceType:function(t){var e=t.currentTarget.dataset.type;this.setData({typeTap:e}),"none"==e&&this.emptyContent(this)},invoiceUp:function(t){var e=t.currentTarget.dataset.type;this.setData({upTap:e}),"personal"==e&&this.emptyContent(this)},emptyContent:function(t){t.setData({companyName:"",taxesCode:""})},nuitName:function(t){var e=t.detail.value;this.setData({companyName:e})},taxesCode:function(t){var e=t.detail.value;this.setData({taxesCode:e})},saveInvoice:function(){if("unit"!=this.upTap||""!=this.companyName)if("unit"!=this.upTap||""!=this.taxesCode){var t={type:"paper"==this.typeTap?"1":"0",up:this.upTap,upName:"unit"==this.upTap?"单位":"个人",upId:"unit"==this.upTap?"2":"1",companyName:this.companyName,taxesCode:this.taxesCode},e=getCurrentPages(),a=(e[e.length-1],e[e.length-2]);a.setData({invoiceData:t}),wx.navigateBack()}else i.toast("纳税识别号不能为空");else i.toast("单位名称不能为空")},setData:function(t){var e=this,a=[];Object.keys(t).forEach(function(n){a=n.split("."),t[n],e.$data,a.forEach(function(a,i){e[n]=t[n]})})}}};e.default=o}},[["bf8e","common/runtime","common/vendor"]]]);