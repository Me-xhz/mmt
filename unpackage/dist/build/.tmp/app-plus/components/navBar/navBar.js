(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/navBar/navBar"],{"2dcb":function(t,n,a){"use strict";a.r(n);var e=a("363b"),o=a.n(e);for(var u in e)"default"!==u&&function(t){a.d(n,t,function(){return e[t]})}(u);n["default"]=o.a},"363b":function(t,n,a){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{navBarHeight:getApp().globalData.navBarHeight}},components:{},props:{showHome:{type:Boolean,value:!1},showBack:{type:Boolean,value:!0},title:{type:String,value:"买买提团购"}},methods:{backHome:function(){wx.switchTab({url:"/pages/index/index"})},back:function(){wx.navigateBack({delta:1})},setData:function(t){var n=this,a=[];Object.keys(t).forEach(function(e){a=e.split("."),t[e],n.$data,a.forEach(function(a,o){n[e]=t[e]})})}}};n.default=e},ab20:function(t,n,a){"use strict";var e=function(){var t=this,n=t.$createElement;t._self._c},o=[];a.d(n,"a",function(){return e}),a.d(n,"b",function(){return o})},b397:function(t,n,a){"use strict";a.r(n);var e=a("ab20"),o=a("2dcb");for(var u in o)"default"!==u&&function(t){a.d(n,t,function(){return o[t]})}(u);a("f776");var c=a("2877"),r=Object(c["a"])(o["default"],e["a"],e["b"],!1,null,null,null);n["default"]=r.exports},d014:function(t,n,a){},f776:function(t,n,a){"use strict";var e=a("d014"),o=a.n(e);o.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/navBar/navBar-create-component',
    {
        'components/navBar/navBar-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("b397"))
        })
    },
    [['components/navBar/navBar-create-component']]
]);                
