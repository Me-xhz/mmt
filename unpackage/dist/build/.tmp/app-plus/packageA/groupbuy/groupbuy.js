(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["packageA/groupbuy/groupbuy"],{"007a":function(t,e,a){"use strict";a.r(e);var s=a("69c4"),i=a.n(s);for(var r in s)"default"!==r&&function(t){a.d(e,t,function(){return s[t]})}(r);e["default"]=i.a},"0358":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement;t._self._c},i=[];a.d(e,"a",function(){return s}),a.d(e,"b",function(){return i})},"5d76":function(t,e,a){"use strict";var s=a("5eb8"),i=a.n(s);i.a},"5eb8":function(t,e,a){},"69c4":function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s=getApp().globalData,i=a("28c1"),r=(a("b6a1"),function(){return a.e("components/teamList/teamList").then(a.bind(null,"264e"))}),o={data:function(){return{iconURL:s.dataBase.iconURL,showRules:!0,showSettingModalStatus:!1,showStartTeamModal:!1,showInTeamModal:!1,found_id:"",pickup_id:"",teamFoundStatus:0,teamFound:{},teamFollow:{},teamMsg:{},h:"00",m:"00",s:"00",order_id:"",team_id:0,rule:{},teamLabel:{},teamList:[],duration:500,interval:5e3,indexAdcurrent:0,indicatorColor:"#fff",indicatorActiveColor:"#eb3c39",circular:!0,autoplay:!1,adList:[],indicatorDots:!1,showModalStatus:!1,canPurchase:!1,showSKUstatus:0,currentAttrs:[],choosed_sku:"",skuImages:"",itemData:{shop_type:0},skuSvipCurrent:"",buynum:1,team_sku_type:0,isShowGoHome:!1,entryData:"",skuCurrent:"",team_num:"",sku_price:"",min_sku_price:"",sku_svip_price:"",min_sku_svip_price:"",currentStock:"",hasDefaultSKU:"",showfwModalStatus:!1,showShareModalStatus:!1,showBonusModal:!1,animationData:"",showzjModalStatus:!1,undel:!1,optionalAttrs:""}},components:{teamList:r},props:{},onLoad:function(t){var e=this;t.teamType&&1==t.teamType&&e.setData({showStartTeamModal:!0}),t&&t.entryType&&"external"==t.entryType?this.setData({isShowGoHome:!1}):this.setData({isShowGoHome:!0}),this.setData({entryData:t,found_id:t.found_id});t=e.entryData;var a=i.getStorageSync("getpickup");t&&(t.atitude||t.pickup_id)&&!a&&e.getExternal(t.pickup_id).then(function(){s.firstlaunchApp=!1,e.entryData={},i.setStorageSync("authSetting",{"scope.userLocation":!0})}),this.getAd()},onShow:function(){this.getTeamRule(),this.getGroupInfo()},onShareAppMessage:function(){var t=this;return{title:t.teamFound.share_title,path:"/packageA/groupbuy/groupbuy?pickup_id="+t.teamFound.pickup_id+"&found_id="+t.teamFound.found_id,imageUrl:t.teamFound.share_img}},methods:{showButton:function(t){var e=this;i.formIdUpdate(t),this.setData({showRules:!e.showRules})},getExternal:function(t){var e=s.getPath.getpickup,a={pickup_id:t};return new Promise(function(t,s){i.ApiGateWayTest(e,a,!0,function(e){if(e&&e.data&&1==e.data.success){e=e.data.result.cities.pick_up;i.setStorage({key:"getpickup",data:{pickup_id:e.pickup_id,cityName:e.pickup_name,pickup_address:e.pickup_address,pickup_contact:e.pickup_contact,pickup_phone:e.pickup_phone,pickup_type:e.pickup_type}},function(e){t("获取id成功")}),i.setStorage({key:"city",data:{pickup_id:e.pickup_id,warehouse_id:e.warehouse_id,cityName:e.city_name,is_pick_up:1}})}})})},getGroupInfo:function(){var t=this,e=s.getPath.teamFound,a={found_id:t.found_id};i.showLoad(this),i.ApiGateWayTest(e,a,!0,function(e){e=e.data;t.setData({teamMsg:e.result,teamFound:e.result.teamFound,teamFollow:e.result.teamFollow,teamLabel:e.result.teamBuyLimit,order_id:e.result.order_id,teamFoundStatus:e.result.status,team_id:e.result.team_id,skuSvipCurrent:e.result.teamFound.price,skuCurrent:e.result.teamFound.goods_price,buynum:e.result.teamFound.min_buy_amount}),t.getTeamList(),t.setDefaultSKU(e.result.teamFound),1==e.result.teamFound.status&&0==e.result.order_id&&0==e.result.teamBuyLimit.follow_limit&&e.result.teamBuyLimit.found_limit>0&&t.setData({showInTeamModal:!0});var a=(new Date).getTime()/1e3;e.result.teamFound.found_end_time>=a&&t.countTime(a,e.result.teamFound.found_end_time),i.hideLoad(t)})},getAd:function(){var t=this,e=s.getPath.adlist,a={pid:8};return new Promise(function(s,r){i.ApiGateWayTest(e,a,!0,function(e){if(e&&e.data&&1==e.data.success){var a=e.data.result;a.length>1?t.setData({indicatorDots:!0}):t.setData({indicatorDots:!1}),t.setData({adList:a,indexAdcurrent:0,indicatorDots:a.length>1}),s("successAd")}})})},adclose:function(t,e){var a=s.getPath.adclose,r={ad_id:t,is_close:e};i.ApiGateWayTest(a,r,!0,function(t){})},goWebView:function(t){i.goAdWebView(t)},getTeamRule:function(){var t=this,e=s.getPath.teamRule;i.ApiGateWayTest(e,"",!0,function(e){t.setData({rule:e.data.result.rule})})},countTime:function(t,e){var a,s,i,r,o=this,n=this,u=e-t,d=setInterval(function(){if(u-=1,!(u>=0))return clearInterval(d),n.getTeamRule(),n.getGroupInfo(),!1;a=Math.floor(u/60/60/24,10),s=Math.floor(u/60/60%24)+24*a,i=Math.floor(u/60%60),r=Math.floor(u%60),s=s>9?s:"0"+s,i=i>9?i:"0"+i,r=r>9?r:"0"+r,o.setData({h:s,m:i,s:r})},1e3)},getTeamList:function(){var t=this,e=s.getPath.teamList,a={goods_id:t.teamFound.goods_id};i.ApiGateWayTest(e,a,!0,function(e){e=e.data;1==e.success&&(e.result.data.length>2?t.setData({teamList:e.result.data.concat(e.result.data),team_num:e.result.data.length}):t.setData({teamList:e.result.data,team_num:e.result.data.length}))})},showOrder:function(t){i.formIdUpdate(t);var e=this;s.checkSessionKey?wx.navigateTo({url:"../../packageA/user/detail?orderId="+e.order_id+"&entryType=external"}):i.toast("未登录")},gotoHome:function(t){i.formIdUpdate(t),wx.switchTab({url:"/pages/index/index"})},payAgain:function(t){i.formIdUpdate(t);var e=this;e.setData({showInTeamModal:!1}),1==e.teamFoundStatus||2==e.teamFoundStatus?i.toast("拼团活动已结束"):wx.navigateTo({url:"/pages/product/product?entryType=external&productId="+e.teamFound.goods_id})},toShare:function(t){var e=this;i.formIdUpdate(t),setTimeout(function(){e.setData({showStartTeamModal:!1})},2e3)},toAddTeam:function(t){var e=this,a=e.teamFound,r=i.getStorageSync("isOldUser");if(!s.checkSessionKey||2==r)return i.goRegister(),!1;i.formIdUpdate(t);var o=s.getPath.preCheckOrder,n=[{goods_id:a.goods_id,sku_key:a.sku_key,num:1}];n=JSON.stringify(n);var u={order_product:n,team_order:2,team_id:e.team_id,found_id:a.found_id,time_atitude:s.dataBase.userAtitude};i.ApiGateWayTest(o,u,!0,function(t){if(1==t.data.success){var s=[{goods_name:a.goods_name,goods_id:a.goods_id,sku_key:a.sku_key,amount:1,shop_price:a.price,market_price:a.goods_price,sku_key_name:a.sku_key_name,sku_img:a.sku_img,team_order:2,team_id:e.team_id,found_id:a.found_id}];i.setStorage({key:"nowPay",data:s}),wx.navigateTo({url:"/pages/confirm/confirm"})}else i.toast(t.data.msg)})},settingModalStatus:function(){this.setData({showSettingModalStatus:!1})},goSetting:function(){var t=this;wx.openSetting({success:function(e){1==e.authSetting["scope.userLocation"]&&t.setData({showSettingModalStatus:!1})}})},setDefaultSKU:function(t){for(var e=[],a=null,s=[],r=[],o=0;o<t.properties.length;++o){var n=t.properties[o];if(!n.is_multiselect){s[o]=[];for(var u=0;u<n.attrs.length;u++)s[o].push(n.attrs[u].id)}}if(s=i.multiCartesian(s),s.length&&s[0]instanceof Array)for(o=0;o<s.length;o++)s[o].sort(function(t,e){return t-e});var d=9999999999,c=9999999999;for(o=0;o<t.stock.length;++o){var p=t.stock[o].key.split("_"),h=t.stock[o].market_price,m=t.stock[o].price;if(c>m){var l=[];if(t.is_goods_number>0&&0==that.teamFoundStatus&&t.stock[o].is_enough){for(var f=0,_=p.length;f<_;f++)l.push(parseInt(p[f]));e=l,a=[{attrs:e,stock:t.stock[o]}],!0,c=m,d=h}else if(!t.is_goods_number>0||1==that.teamFoundStatus){for(f=0,_=p.length;f<_;f++)l.push(parseInt(p[f]));e=l,a=[{attrs:e,stock:t.stock[o]}],!0,c=m,d=h}}p.sort(function(t,e){return t-e}),p=p.join("_");for(u=0;u<s.length;u++){var k="";k=s[u]instanceof Array?s[u].join("_"):s[u]instanceof Object?"":s[u],p==k&&1==t.stock[o].is_enough&&r.push({attrs:s[u],stock:t.stock[o]})}}var g=this.teamFound.price,v=this.teamFound.goods_price;if(this.setData({sku_price:d,min_sku_price:d,sku_svip_price:c,min_sku_svip_price:c,skuSvipCurrent:parseFloat(g).toFixed(2),skuCurrent:v,currentStock:a}),this.currentAttrs=e,this.setData({hasDefaultSKU:!!this.currentStock}),this.set_choosed_sku(),e=[],a=null,this.setData({currentStock:null,hasDefaultSKU:!1}),this.currentAttrs=[],1==r.length&&(e=r[0].attrs instanceof Array?r[0].attrs:[r[0].attrs],a=r[0].stock),r.length>1)for(var o in t.properties){var y=t.properties[o].attrs;for(var u in y){var S=0;for(var D in r){var b=new RegExp(y[u].id).test(r[D].attrs);b&&S++}S==r.length&&e.push(y[u].id)}}this.setData({currentStock:a}),this.currentAttrs=e,this.setData({hasDefaultSKU:!!this.currentStock}),this.set_choosed_sku()},delegation:function(t){var e=i.getStorageSync("isOldUser");if(!s.checkSessionKey||2==e)return i.goRegister(),!1;if(this.checkCanPurchase()){var a=this;if(1!=a.itemData.shop_type){var r=a.teamFound;if(a.currentAttrs.length==r.properties.length&&r.max_buy_amount<2||1==a.team_sku_type&&a.currentAttrs.length==r.properties.length){if(0==r.stock.length)return i.toast("库存不足"),!1;var o="";for(var n in r.stock){var u=r.stock[n].key;u=u.split("_"),u.sort(function(t,e){return t-e}),u=u.join("_");var d=a.currentAttrs.join("_");if(d==u){o=r.stock[n].key;break}}var c=s.getPath.skuEnough;r.pre_info&&1==r.pre_info.is_pre&&(c=s.getPath.skuEnough);var p={goods_id:r.goods_id,sku_key:o,amount:a.buynum};i.formIdUpdate(t),i.showLoad(this),i.ApiGateWayTest(c,p,!0,function(e){if(e)return 1!=e.data.result.is_enough?(i.hideLoad(a),void i.toast(e.data.result.msg)):(a.setData({showModalStatus:!1,showSKUstatus:0}),void h(t))})}else 0==a.showSKUstatus?(a.setModalStatus(),a.team_sku_type=1,a.setData({showfwModalStatus:!1,showShareModalStatus:!1,showBonusModal:!1})):i.toast("请选择商品款式")}else a.setzjModalStatus(t)}function h(){var t=s.getPath.preCheckOrder,e=[{goods_id:a.confirmData[0].goods_id,sku_key:a.confirmData[0].sku_key,num:a.confirmData[0].amount}];e=JSON.stringify(e);var r={order_product:e,team_order:1==a.teamFound.status&&0==a.order_id?2:1,team_id:a.team_id,time_atitude:s.dataBase.userAtitude};i.ApiGateWayTest(t,r,!0,function(t){i.hideLoad(a),1==t.data.success?(a.confirmData[0]["team_order"]=1==a.teamFound.status&&0==a.order_id?2:1,a.confirmData[0]["team_id"]=a.team_id,1==a.teamFound.status&&0==a.order_id&&(a.confirmData[0]["found_id"]=a.teamFound.found_id),i.setStorage({key:"nowPay",data:a.confirmData}),wx.navigateTo({url:"/pages/confirm/confirm"})):i.toast(t.data.msg)})}},checkCanPurchase:function(){var t=this.teamFound,e=!1;if(!t.stock||0==t.stock.is_enough)return i.toast("抱歉，商品已售罄"),!1;if(1==this.teamFoundStatus)return i.toast("抱歉，活动已结束"),!1;if(this.currentAttrs.length>=t.properties.length){for(var a in t.properties)if(!t.properties[a].is_multiselect){e=!0;break}if(e){if(!this.currentAttrs||!this.currentAttrs.length)return!1;if(!this.currentStock)return!1}}return!0},setzjModalStatus:function(e){console.log(t(e," at packageA\\groupbuy\\groupbuy.vue:1121"));var a=wx.createAnimation({duration:250,timingFunction:"linear",delay:0});a.translateY(368).opacity(1).step(),this.setData({animationData:a.export()}),this.setData({showzjModalStatus:!0}),setTimeout(function(){a.translateY("-150px").translateX("-50%").step(),this.setData({animationData:a}),0==e.currentTarget.dataset.status&&this.setData({showzjModalStatus:!1})}.bind(this),200)},setModalStatus:function(t){var e=this;0==this.showSKUstatus?this.showSKUstatus=1:this.showSKUstatus=0;var a=wx.createAnimation({duration:250,timingFunction:"linear",delay:0});a.translateY(368).opacity(1).step(),this.setData({animationData:a.export()}),1==this.showSKUstatus&&this.setData({showModalStatus:!0}),setTimeout(function(){"68rpx"==e.iphoneXBottom?a.translateY(-34).step():a.translateY(0).step(),this.setData({animationData:a}),0==this.showSKUstatus&&this.setData({showModalStatus:!1})}.bind(this),200)},changeNum:function(t){var e=this;i.formIdUpdate(t);var a=e.teamFound,r=s.getPath.skuEnough;a.pre_info&&1==a.pre_info.is_pre&&(r=s.getPath.skuEnough);var o="";for(var n in a.stock){var u=a.stock[n].key;u=u.split("_"),u.sort(function(t,e){return t-e}),u=u.join("_");var d=e.currentAttrs.join("_");if(d==u){o=a.stock[n].key;break}}if(e.currentAttrs.length==a.properties.length){if(0==t.currentTarget.dataset.alphaBeta){if(!e.checkCanPurchase())return;if(e.buynum<=e.teamFound.min_buy_amount)return void i.toast("不能小于最小购买数量");if(e.buynum<=1||(2===e.buynum?e.setData({buynum:e.buynum-1,undel:!0}):e.setData({buynum:e.buynum-1})),1!=e.buynum){var c={goods_id:a.goods_id,sku_key:o,amount:e.buynum};i.ApiGateWayTest(r,c,!0,function(t){t&&(1==t.data.result.is_enough||i.toast(t.data.result.msg))})}}else{if(0!=e.teamFound.max_buy_amount&&e.buynum>=e.teamFound.max_buy_amount)return void i.toast("不能在多啦~");if(e.setData({buynum:e.buynum+1,undel:!1}),e.buynum>1){c={goods_id:a.goods_id,sku_key:o,amount:e.buynum};i.ApiGateWayTest(r,c,!0,function(t){if(t)return 1!=t.data.result.is_enough?(i.toast(t.data.result.msg),e.setData({buynum:e.buynum-1}),void e.set_choosed_sku()):void 0})}}e.confirmData.num=e.buynum}else 0==e.showSKUstatus?e.setModalStatus():i.toast("请选择商品款式");e.set_choosed_sku()},set_choosed_sku:function(){var t=this,e=t.teamFound;if(t.currentAttrs.length<e.properties.length)return t.sku_price=t.min_sku_price,t.sku_svip_price=t.min_sku_svip_price,t.setData({choosed_sku:"选择：商品规格",skuImages:e.sku_img,skuSvipCurrent:t.teamFound.price,skuCurrent:t.teamFound.price}),void t.setAttrsClass();var a="",s=0,i=0,r=t.teamFound.price,o=t.teamFound.price;for(var n in t.setData({choosed_sku:a,sku_price:s,sku_svip_price:i,skuSvipCurrent:r,skuCurrent:o}),e.properties){var u=e.properties[n].attrs;for(var d in u)for(var c in t.currentAttrs)t.currentAttrs[c]==u[d].id&&(a+=u[d].item+" ")}if(""!=a){for(var n in e.stock){var p=e.stock[n].key;p=p.split("_"),p.sort(function(t,e){return t-e}),p=p.join("_");u=t.currentAttrs.join("_");u==p&&(t.skuImages=e.stock[n].header_img,s=e.stock[n].market_price,i=e.stock[n].shop_price)}t.confirmData=[{goods_name:e.goods_name,goods_id:e.goods_id,sku_key:u,amount:t.buynum,shop_price:i,market_price:s,sku_key_name:"规格:"+a,sku_img:t.skuImages}],a="已选："+a;r=i,o=s;t.setData({choosed_sku:a,sku_price:s,sku_svip_price:i,skuSvipCurrent:r,skuCurrent:o,skuImages:t.skuImages})}t.setAttrsClass()},attrValueselest:function(t){var e=this.teamFound;if(e){var a=t.currentTarget.dataset.property,s=t.currentTarget.dataset.attr;if(s.is_multiselect){var r=[].concat(this.optionalAttrs),o=r.indexOf(s.id);-1==o?r.push(s.id):r.splice(o,1),this.setData({optionalAttrs:r})}else{var n=!1;for(var u in e.stock)if(1==e.stock[u].is_enough&&e.stock[u].key.indexOf(String(s.id))>=0){n=!0;break}if(!n)return void i.toast("库存不足");var d=null;r=[].concat(this.currentAttrs),o=r.indexOf(s.id);for(var u in-1==o?r.push(s.id):r.splice(o,1),a.attrs)if(a.attrs[u].id!=s.id){o=r.indexOf(a.attrs[u].id);-1!=o&&r.splice(o,1)}if(r=r.filter(function(t,e,a){return a.indexOf(t)===e}),r.sort(function(t,e){return t-e}),r.length){var c=r.join("_");for(u=0;u<e.stock.length;++u){var p=e.stock[u].key.split("_");if(p.sort(function(t,e){return t-e}),p=p.join("_"),p==c){d=e.stock[u];break}}}d&&d.is_enough?(this.currentStock=d,this.currentAttrs=r,this.setData({buynum:e.min_buy_amount})):r.length<e.properties.length?(this.currentStock=null,this.currentAttrs=r,this.setData({buynum:e.min_buy_amount})):i.toast("库存不足"),this.setData({canPurchase:this.checkCanPurchase()})}this.set_choosed_sku()}},setAttrsClass:function(){var t=this.teamFound,e=t.properties;for(var a in e){var s=e[a].attrs;for(var i in s){var r=s[i];if(t)if(0!=t.is_goods_number){if(r.is_multiselect)r.class=-1==this.optionalAttrs.indexOf(r.id)?"":"active";else{r.class=-1==this.currentAttrs.indexOf(r.id)?"":"active";var o=!1;for(var a in t.stock){if(1!=t.stock[a].is_enough){var n=this.currentAttrs.join("_");if(!(t.stock[a].key.indexOf(String(n))>=0&&this.currentAttrs.length>0))continue;var u=t.stock[a].key.split("_");for(var i in u)if(u[i]!=this.currentAttrs)for(var d in t.properties)for(var c in t.properties[d].attrs)t.properties[d].attrs[c].id==u[i]&&(t.properties[d].attrs[c].class="disable")}if(t.stock[a].key.indexOf(String(r.id))>=0){o=!0;break}}o||(r.class+="disable")}}else r.class="disable";else r.class="disable"}}this.setData({teamFound:t})},setData:function(t){var e=this,a=[];Object.keys(t).forEach(function(s){a=s.split("."),t[s],e.$data,a.forEach(function(a,i){e[s]=t[s]})})}}};e.default=o}).call(this,a("0de9")["default"])},c3fd:function(t,e,a){"use strict";a.r(e);var s=a("0358"),i=a("007a");for(var r in i)"default"!==r&&function(t){a.d(e,t,function(){return i[t]})}(r);a("5d76");var o=a("2877"),n=Object(o["a"])(i["default"],s["a"],s["b"],!1,null,null,null);e["default"]=n.exports}},[["8d10","common/runtime","common/vendor"]]]);