(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/subject/subject"],{"3a47":function(t,n,e){"use strict";var u=function(){var t=this,n=t.$createElement;t._self._c},a=[];e.d(n,"a",function(){return u}),e.d(n,"b",function(){return a})},"55a0":function(t,n,e){"use strict";e.r(n);var u=e("b882"),a=e.n(u);for(var o in u)"default"!==o&&function(t){e.d(n,t,function(){return u[t]})}(o);n["default"]=a.a},"9f9a":function(t,n,e){"use strict";var u=e("cab9"),a=e.n(u);a.a},b666:function(t,n,e){"use strict";e.r(n);var u=e("3a47"),a=e("55a0");for(var o in a)"default"!==o&&function(t){e.d(n,t,function(){return a[t]})}(o);e("9f9a");var r=e("2877"),s=Object(r["a"])(a["default"],u["a"],u["b"],!1,null,null,null);n["default"]=s.exports},b882:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u=function(){return e.e("components/goodList/goodList").then(e.bind(null,"bc0e"))},a={data:function(){return{subList:[],subURL:"/pages/projectPage/projectPage",subType:3}},components:{goodlist:u},props:{list:{type:Array},type:Number},beforeMount:function(){var t=this.properties.list;t.forEach(function(t){1==t.type?t.subType=3:2==t.type&&(t.subType=4)}),this.setData({subList:t})},methods:{setData:function(t){var n=this,e=[];Object.keys(t).forEach(function(u){e=u.split("."),t[u],n.$data,e.forEach(function(e,a){n[u]=t[u]})})}}};n.default=a},cab9:function(t,n,e){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/subject/subject-create-component',
    {
        'components/subject/subject-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("b666"))
        })
    },
    [['components/subject/subject-create-component']]
]);                
