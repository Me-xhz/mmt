(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/newExclusive/newExclusive"],{1490:function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s=getApp().globalData,r=a("28c1"),i=a("b6a1"),n=function(){return a.e("components/goodList/goodList").then(a.bind(null,"bc0e"))},o={data:function(){return{iconURL:s.dataBase.iconURL,indexModel:[],productId:0,itemData:{},showSKUstatus:0,optionalAttrs:{},skuImages:"",bannerItem:[],buynum:1,firstIndex:-1,choosed_sku:"",cartAmount:0,undel:!0,unadd:!1,isPriceEqual:!1,canPurchase:!1,confirmData:{},isShowGoHome:!1,entryData:"",share_data:"",animationData:"",showModalStatus:!1,buy_now:"",productid:0,showfwModalStatus:!1,showShareModalStatus:!1,showBonusModal:!1,indicatorDots:"",brandID:"",skuSvipCurrent:"",skuCurrent:"",sku_price:"",min_sku_price:"",sku_svip_price:"",min_sku_svip_price:"",currentStock:"",hasDefaultSKU:"",sumbitName:""}},components:{goodlist:n},props:{},onLoad:function(t){var e=this;t&&t.entryType&&"external"==t.entryType?this.setData({isShowGoHome:!1}):this.setData({isShowGoHome:!0}),this.setData({entryData:t});t=e.entryData;var a=r.getStorageSync("getpickup");t&&(t.atitude||t.pickup_id)&&!a&&e.getExternal(t.pickup_id).then(function(){s.firstlaunchApp=!1,e.entryData={},r.setStorageSync("authSetting",{"scope.userLocation":!0})}),s.checkSessionKey?this.getConfigureIndexModel():i.on("checkSessionKey",this,function(t){this.getConfigureIndexModel()}),this.getShare()},onShareAppMessage:function(t){var e=this,a=r.getStorageSync("getpickup");return{title:e.share_data.share_title,path:"/pages/newExclusive/newExclusive?pickup_id="+a.pickup_id,imageUrl:e.share_data.share_img}},methods:{getExternal:function(e){var a=s.getPath.getpickup,i={pickup_id:e};return new Promise(function(e,s){r.ApiGateWayTest(a,i,!0,function(a){if(a&&a.data&&1==a.data.success){console.log(t(a.data.result.cities.pick_up," at pages\\newExclusive\\newExclusive.vue:303"));a=a.data.result.cities.pick_up;r.setStorage({key:"getpickup",data:{pickup_id:a.pickup_id,cityName:a.pickup_name,pickup_address:a.pickup_address,pickup_contact:a.pickup_contact,pickup_phone:a.pickup_phone,pickup_type:a.pickup_type}},function(t){e("获取id成功")}),r.setStorage({key:"city",data:{pickup_id:a.pickup_id,warehouse_id:a.warehouse_id,cityName:a.city_name,is_pick_up:1}})}})})},getShare:function(e){var a=this,i=s.getPath.indexShare,n={position:2};r.ApiGateWayTest(i,n,!0,function(e){e&&e.data&&1==e.data.success&&(console.log(t(e," at pages\\newExclusive\\newExclusive.vue:340")),a.setData({share_data:e.data.result}))})},getConfigureIndexModel:function(){var t=this,e=s.getPath.indexmodel,a={position:2};r.ApiGateWayTest(e,a,!0,function(e){if(e&&e.data&&1==e.data.success){0==e.data.result.new_user&&r.toast("你已经是老用户啦，无法享受当前福利喔~");var a=e.data.result.lists;a.forEach(function(e){e.forEach(function(e){if(1==e.type&&"coupon"==e.route.url){var a=0;e.route.param.forEach(function(t){a+=parseInt(t.money)}),e.route.total=a}3==e.type&&2==e.goodscss&&(e.goods=t.rowFormat(3,e.goods))})}),t.setData({indexModel:a})}})},rowFormat:function(t,e){for(var a=[],s=e.length/t,r=0;r<s;r++){a.push(new Array);for(var i=r*t;i<t*(r+1);i++)void 0!=e[i]&&a[r].push(e[i])}return a},gotoHome:function(){wx.switchTab({url:"/pages/index/index"})},goToProduct:function(t){var e=t.currentTarget.dataset.goodsid;wx.navigateTo({url:"/pages/product/product?entryType=external&productId="+e})},toCart:function(){wx.switchTab({url:"/pages/cart/cart"})},adclose:function(t,e){var a=this,i=s.getPath.adclose,n={ad_id:t,is_close:e};r.ApiGateWayTest(i,n,!0,function(t){a.getConfigureIndexModel()})},akeyToGet:function(t){var e=r.getStorageSync("isOldUser");if(!s.checkSessionKey||2==e)return r.goRegister(),!1;var a=this,i=t.target.dataset.param,n=t.target.dataset.ad_id,o=[];i.forEach(function(t){o.push(t.id)});var u=s.getPath.addCoupon,c={coupon_id:o};r.ApiGateWayTest(u,c,!0,function(t){if(t&&t.data&&1==t.data.success){var e=t.data.result;r.toast(e.state_desc),0==e.state&&a.adclose(n,1)}})},setModalStatus:function(t){0==this.showSKUstatus?this.showSKUstatus=1:this.showSKUstatus=0;var e=wx.createAnimation({duration:300,timingFunction:"linear",delay:0});e.translateY(300).opacity(1).step(),this.setData({animationData:e.export()}),1==this.showSKUstatus&&this.setData({showModalStatus:!0}),setTimeout(function(){e.translateY(0).step(),this.setData({animationData:e}),0==this.showSKUstatus&&this.setData({showModalStatus:!1})}.bind(this),200)},isnewpersongoods:function(t,e){var a=s.getPath.isnewpersongoods,i={goods_id:t,sku_key:e};return new Promise(function(t,e){r.ApiGateWayTest(a,i,!0,function(e){var a=e.data;if(1==a.success){var s=a.result.result;t(s)}})})},addShopCart:function(e){var a=r.getStorageSync("isOldUser");if(!s.checkSessionKey||2==a)return r.goRegister(),!1;var i=this;function n(t){if(i.checkCanPurchase()){var e=i.itemData,a=t.currentTarget.dataset.type;if(i.currentAttrs.length==e.properties.length){var n=function(){var s={goods_id:e.goods_id,sku_key:o,amount:i.buynum};r.formIdUpdate(t),r.ApiGateWayTest(p,s,!0,function(t){t&&(0!=t.data.success?(i.currentAttrs=[],i.setData({cartAmount:t.data.result.cart_num,productid:0}),r.toast(t.data.msg),"bottomcart"==a&&i.setData({showModalStatus:!1,showSKUstatus:0})):r.toast(t.data.msg))})},o="";for(var u in e.stock){var c=e.stock[u].key;c=c.split("_"),c.sort(function(t,e){return t-e}),c=c.join("_");var d=i.currentAttrs.join("_");if(d==c){o=e.stock[u].key;break}}var p="";i.isnewpersongoods(e.goods_id,o).then(function(t){t?(p=s.getPath.addCartnew,r.showModal("是否替换新人商品","确定",function(t){t.confirm&&n()})):(p=s.getPath.addCart,n())})}else 0==i.showSKUstatus?(i.setModalStatus(a),i.setData({showfwModalStatus:!1,showShareModalStatus:!1,showBonusModal:!1})):r.toast("请选择商品款式")}}console.log(t(e," at pages\\newExclusive\\newExclusive.vue:543")),this.setData({buy_now:e.target.dataset.buynow}),this.productid==e.target.dataset.productid?n(e):this.loadProductDetail(e).then(function(){n(e)})},nowPurchase:function(t){var e=this,a=r.getStorageSync("isOldUser");if(!s.checkSessionKey||2==a)return r.goRegister(),!1;function i(t){if(e.checkCanPurchase()){var a=e.itemData;if(e.currentAttrs.length==a.properties.length){var i="";for(var n in a.stock){var o=a.stock[n].key;o=o.split("_"),o.sort(function(t,e){return t-e}),o=o.join("_");var u=e.currentAttrs.join("_");if(u==o){i=a.stock[n].key;break}}var c=s.getPath.skuEnough;a.pre_info&&1==a.pre_info.is_pre&&(c=s.getPath.skuEnough);var d={goods_id:a.goods_id,sku_key:i,amount:e.buynum};r.formIdUpdate(t),r.ApiGateWayTest(c,d,!0,function(t){t&&(1==t.data.result.is_enough?(e.currentAttrs=[],e.setData({showModalStatus:!1,showSKUstatus:0,cartAmount:t.data.result.cart_num,productid:0}),wx.navigateTo({url:"/pages/confirm/confirm"})):r.toast(t.data.result.msg))})}else 0==e.showSKUstatus?(e.setModalStatus(),e.setData({showfwModalStatus:!1,showShareModalStatus:!1,showBonusModal:!1})):r.toast("请选择商品款式");r.setStorage({key:"nowPay",data:e.confirmData})}}this.setData({buy_now:t.target.dataset.buynow}),e.productid==t.target.dataset.productid?i(t):e.loadProductDetail(t).then(function(){i(t)})},loadProductDetail:function(t){var e=t.target.dataset.productid;this.setData({productid:t.target.dataset.productid});var a=this;r.showLoad(a);var i=s.getPath.goodsInfo,n=s.getPath.getSkuAmount,o={goods_id:e};return new Promise(function(t,e){r.ApiGateWayTest(i,o,!0,function(e){if(200==e.statusCode){var s=e.data.result;s.goods_content,s.detail_explain,s.is_liked;s.current_price=s.shop_price,s.price=s.market_price,a.setData({itemData:s,bannerItem:s.gallery,indicatorDots:s.gallery.length>1,buynum:s.min_buy_amount,brandID:s.cat_id,skuSvipCurrent:s.shop_price,skuCurrent:s.market_price}),a.setDefaultSKU(s),a.isPriceEqualFun(),r.hideLoad(a)}else r.hideLoad(a),r.toast("获取购物车数量失败");t("获取商详信息")}),r.ApiGateWayTest(n,"",!0,function(t){200==t.statusCode&&a.setData({cartAmount:t.data.result.cart_num})})})},setDefaultSKU:function(t){for(var e=[],a=null,s=[],i=[],n=0;n<t.properties.length;++n){var o=t.properties[n];if(!o.is_multiselect){s[n]=[];for(var u=0;u<o.attrs.length;u++)s[n].push(o.attrs[u].id)}}if(s=r.multiCartesian(s),s.length&&s[0]instanceof Array)for(n=0;n<s.length;n++)s[n].sort(function(t,e){return t-e});this.setData({canPurchase:this.checkCanPurchase()});var c=9999999999,d=9999999999;for(n=0;n<t.stock.length;++n){var p=t.stock[n].key.split("_"),h=t.stock[n].market_price,l=t.stock[n].price;if(d>l){var f=[];if(t.is_goods_number>0&&t.is_on_sale&&t.stock[n].is_enough){for(var _=0,g=p.length;_<g;_++)f.push(parseInt(p[_]));e=f,a=[{attrs:e,stock:t.stock[n]}],!0,d=l,c=h}else if(!t.is_goods_number>0||!t.is_on_sale){for(_=0,g=p.length;_<g;_++)f.push(parseInt(p[_]));e=f,a=[{attrs:e,stock:t.stock[n]}],!0,d=l,c=h}}p.sort(function(t,e){return t-e}),p=p.join("_");for(u=0;u<s.length;u++){var k="";k=s[u]instanceof Array?s[u].join("_"):s[u]instanceof Object?"":s[u],p==k&&1==t.stock[n].is_enough&&i.push({attrs:s[u],stock:t.stock[n]})}}var m=this.itemData.current_price,v=this.itemData.price;if(this.setData({sku_price:c,min_sku_price:c,sku_svip_price:d,min_sku_svip_price:d,skuSvipCurrent:parseFloat(m).toFixed(2),skuCurrent:v,currentStock:a}),this.currentAttrs=e,this.setData({hasDefaultSKU:!!this.currentStock}),this.set_choosed_sku(),e=[],a=null,this.setData({currentStock:null,hasDefaultSKU:!1}),this.currentAttrs=[],1==i.length&&(e=i[0].attrs instanceof Array?i[0].attrs:[i[0].attrs],a=i[0].stock),i.length>1)for(var n in t.properties){var y=t.properties[n].attrs;for(var u in y){var D=0;for(var S in i){var b=new RegExp(y[u].id).test(i[S].attrs);b&&D++}D==i.length&&e.push(y[u].id)}}this.setData({currentStock:a}),this.currentAttrs=e,this.setData({hasDefaultSKU:!!this.currentStock}),this.set_choosed_sku()},set_choosed_sku:function(){var t=this,e=t.itemData;if(t.currentAttrs.length<e.properties.length)return t.sku_price=t.min_sku_price,t.sku_svip_price=t.min_sku_svip_price,t.setData({choosed_sku:"选择：商品规格",skuImages:e.header_img,skuSvipCurrent:t.itemData.current_price,skuCurrent:t.itemData.price}),void t.setAttrsClass();var a="",s=0,r=0,i=t.itemData.current_price,n=t.itemData.price;for(var o in t.setData({choosed_sku:a,sku_price:s,sku_svip_price:r,skuSvipCurrent:i,skuCurrent:n}),e.properties){var u=e.properties[o].attrs;for(var c in u)for(var d in t.currentAttrs)t.currentAttrs[d]==u[c].id&&(a+=u[c].item+" ")}if(""!=a){for(var o in e.stock){var p=e.stock[o].key;p=p.split("_"),p.sort(function(t,e){return t-e}),p=p.join("_");u=t.currentAttrs.join("_");u==p&&(t.skuImages=e.stock[o].header_img,s=e.stock[o].market_price,r=e.stock[o].shop_price)}t.confirmData=[{goods_name:e.goods_name,goods_id:e.goods_id,sku_key:u,amount:t.buynum,shop_price:r,market_price:s,sku_key_name:"规格:"+a,sku_img:t.skuImages}],a="已选："+a;i=r,n=s;t.setData({choosed_sku:a,sku_price:s,sku_svip_price:r,skuSvipCurrent:i,skuCurrent:n,skuImages:t.skuImages})}t.setAttrsClass()},attrValueselest:function(e){console.log(t("attrValueselest"," at pages\\newExclusive\\newExclusive.vue:1070"));var a=this.itemData;if(a){var s=e.currentTarget.dataset.property,i=e.currentTarget.dataset.attr;if(i.is_multiselect){var n=[].concat(this.optionalAttrs),o=n.indexOf(i.id);-1==o?n.push(i.id):n.splice(o,1),this.setData({optionalAttrs:n})}else{var u=!1;for(var c in a.stock)if(1==a.stock[c].is_enough&&a.stock[c].key.indexOf(String(i.id))>=0){u=!0;break}if(!u)return void r.toast("库存不足");var d=null;n=[].concat(this.currentAttrs),o=n.indexOf(i.id);for(var c in-1==o?n.push(i.id):n.splice(o,1),s.attrs)if(s.attrs[c].id!=i.id){o=n.indexOf(s.attrs[c].id);-1!=o&&n.splice(o,1)}if(n=n.filter(function(t,e,a){return a.indexOf(t)===e}),n.sort(function(t,e){return t-e}),n.length){var p=n.join("_");for(c=0;c<a.stock.length;++c){var h=a.stock[c].key.split("_");if(h.sort(function(t,e){return t-e}),h=h.join("_"),h==p){d=a.stock[c];break}}}d&&d.is_enough?(this.currentStock=d,this.currentAttrs=n,this.setData({buynum:a.min_buy_amount})):n.length<a.properties.length?(this.currentStock=null,this.currentAttrs=n,this.setData({buynum:a.min_buy_amount})):r.toast("库存不足"),this.setData({canPurchase:this.checkCanPurchase()})}this.set_choosed_sku()}},setAttrsClass:function(){var t=this.itemData,e=t.properties;for(var a in e){var s=e[a].attrs;for(var r in s){var i=s[r];if(t)if(0!=t.is_goods_number){if(i.is_multiselect)i.class=-1==this.optionalAttrs.indexOf(i.id)?"":"active";else{i.class=-1==this.currentAttrs.indexOf(i.id)?"":"active";var n=!1;for(var a in t.stock){if(1!=t.stock[a].is_enough){var o=this.currentAttrs.join("_");if(!(t.stock[a].key.indexOf(String(o))>=0&&this.currentAttrs.length>0))continue;var u=t.stock[a].key.split("_");for(var r in u)if(u[r]!=this.currentAttrs)for(var c in t.properties)for(var d in t.properties[c].attrs)t.properties[c].attrs[d].id==u[r]&&(t.properties[c].attrs[d].class="disable")}if(t.stock[a].key.indexOf(String(i.id))>=0){n=!0;break}}n||(i.class+="disable")}}else i.class="disable";else i.class="disable"}}this.setData({itemData:t})},checkCanPurchase:function(){var t=this.itemData,e=!1;if(t.pre_info&&1==t.pre_info.is_pre)return this.setData({sumbitName:t.pre_info.pre_time}),!1;if(!t||0==t.is_enough)return this.setData({sumbitName:"抱歉，商品已售罄"}),!1;if(0==t.is_on_sale)return this.setData({sumbitName:"抱歉，商品已下架"}),!1;if(this.currentAttrs.length>=t.properties.length){for(var a in t.properties)if(!t.properties[a].is_multiselect){e=!0;break}if(e){if(!this.currentAttrs||!this.currentAttrs.length)return!1;if(!this.currentStock)return!1}}return this.setData({sumbitName:"立即购买"}),!0},isPriceEqualFun:function(){var t=this;if(t.itemData.price&&t.itemData.current_price){var e=t.itemData.price+t.sku_price,a=t.itemData.current_price+t.sku_svip_price;e==a?t.setData({isPriceEqual:!0}):t.setData({isPriceEqual:!1})}else t.setData({isPriceEqual:!1})},changeNum:function(e){var a=this,i=a.itemData,n=s.getPath.skuEnough;i.pre_info&&1==i.pre_info.is_pre&&(n=s.getPath.skuEnough);var o="";for(var u in i.stock){var c=i.stock[u].key;c=c.split("_"),c.sort(function(t,e){return t-e}),c=c.join("_");var d=a.currentAttrs.join("_");if(d==c){o=i.stock[u].key;break}}if(a.currentAttrs.length==i.properties.length){if(0==e.currentTarget.dataset.alphaBeta){if(!a.checkCanPurchase())return;if(a.buynum<=a.itemData.min_buy_amount)return void r.toast("不能小于最小购买数量");if(a.buynum<=1||(2===a.buynum?a.setData({buynum:a.buynum-1,undel:!0}):a.setData({buynum:a.buynum-1})),1!=a.buynum){var p={goods_id:i.goods_id,sku_key:o,amount:a.buynum};r.ApiGateWayTest(n,p,!0,function(e){if(e)return 1!=e.data.result.is_enough?(console.log(t(e.data.result.msg," at pages\\newExclusive\\newExclusive.vue:1379")),void r.toast(e.data.result.msg)):void 0})}}else{if(0!=a.itemData.max_buy_amount&&a.buynum>=a.itemData.max_buy_amount)return void r.toast("不能在多啦~");if(a.setData({buynum:a.buynum+1,undel:!1}),a.buynum>1){p={goods_id:i.goods_id,sku_key:o,amount:a.buynum};r.ApiGateWayTest(n,p,!0,function(t){if(t)return 1!=t.data.result.is_enough?(r.toast(t.data.result.msg),a.setData({buynum:a.buynum-1}),void a.set_choosed_sku()):void 0})}}a.confirmData.num=a.buynum}else 0==a.showSKUstatus?a.setModalStatus():r.toast("请选择商品款式");a.set_choosed_sku()},setData:function(t){var e=this,a=[];Object.keys(t).forEach(function(s){a=s.split("."),t[s],e.$data,a.forEach(function(a,r){e[s]=t[s]})})}}};e.default=o}).call(this,a("0de9")["default"])},"1ad6":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement;t._self._c},r=[];a.d(e,"a",function(){return s}),a.d(e,"b",function(){return r})},"2c13":function(t,e,a){"use strict";var s=a("6785"),r=a.n(s);r.a},6785:function(t,e,a){},c059:function(t,e,a){"use strict";a.r(e);var s=a("1490"),r=a.n(s);for(var i in s)"default"!==i&&function(t){a.d(e,t,function(){return s[t]})}(i);e["default"]=r.a},e8b3:function(t,e,a){"use strict";a.r(e);var s=a("1ad6"),r=a("c059");for(var i in r)"default"!==i&&function(t){a.d(e,t,function(){return r[t]})}(i);a("2c13");var n=a("2877"),o=Object(n["a"])(r["default"],s["a"],s["b"],!1,null,null,null);e["default"]=o.exports}},[["0ff5","common/runtime","common/vendor"]]]);