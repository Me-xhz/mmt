<template>
	<view>
		<!--pages/confirm/confirm.wxml-->
		<view class="container with-tabbar">
			<view class="tip" :hidden="!tip_show.tip1" data-url="./map/map" :data-pickup_img="consignee.pickup_img" @tap="goMap">
				<text class="tip-text">已享受免费代收服务，到货请至自提点取货</text>
				<!-- <navigator class='goMap' url='./map/map?atitude={{consignee.atitude}}'>查看地图</navigator> -->
				<!-- <view class='iconfont icon-btn_huangsetishiguanbix' catchtap='isShow' data-name='tip1'></view> -->
			</view>
			<!-- Address -->
			<view class="confirm-address" v-if="consignee && consignee.address_id||storageAddr">
				<!-- 提货地址 -->
				<view class="confirm-address-wrap" @tap="touchAddress">
					<image class="icon-img" :src="iconURL + '/btn_smallAddr@2x01.png'"></image>
					<view class="address-detail">
						<text class="leftName">提货地址：</text>
						<text class="ellipsis rightText" style="display:block">{{consignee.cityName||consignee.address}}
							{{consignee.pickup_address}}</text>
						<view class="arrow">
							<view class="right-arrow iconfont icon-btn_xiangyoudajiantoux"></view>
						</view>
					</view>
					<view class="address-detail" v-if="consignee.pickup_contact||consignee.pickup_phone">
						<text class="leftName">店长：</text>
						<text class="mr16">{{consignee.pickup_contact}}</text>
						<text>{{consignee.pickup_phone}}</text>
					</view>
				</view>
				<!-- 预留信息 -->
				<view class="confirm-address-wrap">
					<image class="icon-img" :src="iconURL + '/btn_lxr@2x01.png'"></image>
					<view class="t4 address-detail">提货人信息</view>
					<view class="address-detail">
						<text class="leftName" style="width:110rpx;">姓名：</text>
						<view class="addr_input_box">
							<input type="text" class="addr_input" placeholder="请填写姓名" data-keyName="consignee" @input="editInput" :value="consignee.consignee"></input>
						</view>
					</view>
					<view class="address-detail">
						<text class="leftName" style="width:110rpx;">手机：</text>
						<view class="addr_input_box">
							<input type="number" class="addr_input" placeholder="请填写手机号" data-keyName="mobile" @input="editInput" :value="consignee.mobile"></input>
						</view>
					</view>
				</view>

			</view>
			<view class="confirm-address" v-else @tap="newAddress">
				<view class="address-create danger">请点击填写地址</view>
				<view class="iconfont icon-btn_xiangyoudajiantoux address-arrow"></view>
				<!-- <view class='iconfont icon-img_dizhix '></view> -->
				<!-- <image class="address-arrow" src="{{iconURL}}/icon_right_arrow.png"></image> -->
			</view>

			<!-- 订单明细 -->
			<view class="confirm-form no-margin" v-if="selectedGoods" style="margin-bottom:20rpx">
				<view class="form-item_nums row" style="padding:26rpx">
					<view class="item-title col-25 t4">订单明细</view>
					<view class="item-price col-75  font-face-ios_Avenir t6">
						该订单将免费帮您寄放于
						<text class="red-font-color">提货点</text>
					</view>
				</view>
			</view>

			<!-- Goods -->
			<view class="good_list" style="background:#fff">
				<view class="order-main" v-if="order_info.firstGoods.length">
					<view class="order_tab">次日达</view>
					<view class="goods-item" v-for="(productInfo, index) in order_info.firstGoods" :key="index">
						<view class="item-photo">
							<image :src="productInfo.list_img"></image>
							<view class="inequacy" v-if="productInfo.is_enough==0">
								<image :src="iconURL + '/inequacy02.png'"></image>
							</view>

						</view>
						<view class="item-info">
							<view class="info-name">{{productInfo.goods_name}}</view>
							<view class="info-attr">{{productInfo.sku_key_name}}</view>
							<view class="info-price font-face-ios_Avenir">
								<text class="icon_rmb">¥</text>{{productInfo.shop_price}}
							</view>
							<view class="info-amount">x{{productInfo.amount}}</view>
						</view>
					</view>
				</view>
				<view class="order-main" v-if="order_info.secondGoods.length">
					<view class="order_tab">2-4日送达</view>
					<view class="goods-item" v-for="(productInfo, index) in order_info.secondGoods" :key="index">
						<view class="item-photo">
							<image :src="productInfo.list_img"></image>
							<view class="inequacy" v-if="productInfo.is_enough==0">
								<image :src="iconURL + '/inequacy02.png'"></image>
							</view>
						</view>
						<view class="item-info">
							<view class="info-name">{{productInfo.goods_name}}</view>
							<view class="info-attr">{{productInfo.sku_key_name}}</view>
							<view class="info-price font-face-ios_Avenir">
								<text class="icon_rmb">¥</text>{{productInfo.shop_price}}
							</view>
							<view class="info-amount">x{{productInfo.amount}}</view>
						</view>
					</view>
				</view>
			</view>

			<!-- Total -->
			<view class="confirm-form no-margin" v-if="selectedGoods">
				<view class="form-item_nums row">
					<view class="item-title col-25">商品合计</view>
					<view class="item-price col-75 red-font-color font-face-ios_Avenir">
						<text class="icon_rmb">¥</text>{{selectedGoods.product_price || '0.00'}}
					</view>
				</view>
				<view class="form-item_nums row" :hidden="selectedGoods.dis_price=='0.00'">
					<view class="item-title col-25">活动优惠金额</view>
					<view class="item-price col-75 red-font-color font-face-ios_Avenir">
						<text class="icon_rmb">-¥</text>{{selectedGoods.dis_price}}
					</view>
				</view>
				<view class="form-item_nums row" :hidden="selectedGoods.coupon_fee=='0.00'">
					<view class="item-title col-25">优惠券金额</view>
					<view class="item-price col-75 red-font-color font-face-ios_Avenir">
						<text class="icon_rmb">-¥</text>{{selectedGoods.coupon_fee}}
					</view>
				</view>
				<view class="form-item_nums row" :hidden="selectedGoods.user_money=='0.00'||selectedGoods.use_balance!=1">
					<view class="item-title col-25">使用余额</view>
					<view class="item-price col-75 red-font-color font-face-ios_Avenir">
						<text class="icon_rmb">-¥</text>{{selectedGoods.user_money}}
					</view>
				</view>
				<!-- <view class="form-item_yunfei row">
      <view class="item-title col-25">{{selectedGoods.prom_info[0].prom_name}}</view>
      <view class="item-price col-75 font-face-ios_Avenir" wx:if="{{selectedGoods.prom_info && selectedGoods.prom_info.length > 0}}">
        <span class="item-price_lotyf">-
          <i class='icon_rmb'>¥</i>{{selectedGoods.prom_info[0].value}}</span>
      </view>
    </view>
    <view class="form-item_yunfei row no-border">
      <view class="item-title col-25">运费</view>
      <view class="item-price col-75">
        <span class="item-price_lotyf">全场包邮</span>
      </view>
      <view class="item-price col-75">
        <i class="font-face-ios_Avenir">
          <i class="icon_rmb" wx:if='{{selectedGoods.shipping_info.value != "包邮"}}'>¥</i>{{selectedGoods.shipping_info.value}}</i>
      </view>
    </view> -->
				<!-- <view class="form-item_yunfei mount row" bindtap="touchUpgradeShipping" wx:if="{{canPurchase && !priceInfo.default_shipping_sf}}">
      <view class="col-6">
        <span class="item-title-radio {{shippingUpgraded ? ' checked' : ''}}"></span>
      </view>
      <view class="item-title col-34">
        <span>升级为顺丰快递</span>
      </view>
      <view class="item-price col-60">
        <i class="font-face-ios_Arial">¥</i>{{priceInfo.add_shipping_price}}</view>
    </view> -->
			</view>

			<!--unred-->
			<view class="confirm-form">
				<!-- <view class="form-item" v-if="cashgift" @tap="cashgift.jump_type ? getModalBonus : setModalBonus"> -->
				<view class="form-item" v-if="cashgift" @tap="cashgift_jump_type(cashgift.jump_type)">
					<view class="row">
						<view class="item-title gift-border">选择优惠券
							<span v-if="selectedGoods.coupons_can_use && selectedGoods.coupons_can_use > 0" class="item-cashgift-count">
								（{{selectedGoods.coupons_can_use}}个可用）
							</span>
						</view>
						<view :class="'item-value col ' + (cashgift.id == -1 ? 'red' : '')" v-if="cashgift">{{cashgift ? cashgift.name : '暂无可用优惠券'}}</view>
						<view class="item-arrow iconfont icon-btn_xiangyoudajiantoux"></view>
					</view>
				</view>
				<view class="form-item" v-if="cashgift && selectedGoods.user_money!='0.00'">
					<view class="row">
						<view class="item-title gift-border col">账户余额</view>
						<view class="item-value col">
							<text>{{selectedGoods.use_balance==1?'抵用':'可使用'}}</text> ￥{{selectedGoods.user_money}}
						</view>
						<view class="item-checkbox" @tap="use_balance">
							<image :src="iconURL + '/gouxuan03.png'" v-if="selectedGoods.use_balance==1"></image>
							<image :src="iconURL + '/weixuanzhong.svg'" v-else></image>
						</view>
					</view>
				</view>
				<!-- <view class="form-item no-border" wx:if="{{consignee.address_id}}" bindtap="touchInvoice">
      <view class="form-item_box row">
        <view class="item-title col-25">发票</view>
        <view class="item-value col-75" wx:if="{{!invoiceData}}">不开发票</view>
        <view class="item-value col-75" wx:if="{{invoiceData}}">{{invoiceData.type == '1' ? '纸质发票 - ' + invoiceData.upName : '不开发票'}}</view>
        <image class="item-arrow" src="{{iconURL}}/icon_right_arrow.png"></image>
      </view>
    </view> -->
			</view>

			<!--words-->
			<!-- <view class="confirm-form" wx:if="selectedGoods && consignee.address_id">
    <view class="item-textarea">
      <input maxlength="300" placeholder="有什么需要对我们说的可以写在这里哟~" bindinput="refreshComment"></input>
      <view class="inputnum">
        {{300 - (user_note.length > 0 ? user_note.length : 0)}}字
      </view>
    </view>
  </view> -->


			<!-- <view class='tip tip2' hidden='{{!tip_show.tip2}}'>
    <text>请仔细核对提货点位置，避免您取货时造成困扰</text>
    <view class='iconfont icon-btn_huangsetishiguanbix' bindtap='isShow' data-name='tip2'></view>
  </view> -->
			<!-- Submit -->
			<view class="confirm-submit">
				<view class="submit-total">
					<view class="total-price font-face-ios_Avenir">
						<text class="des">实付：</text>
						<text class="price font-face-ios_Arial">¥{{selectedGoods.total_price || '0.00'}}</text>
					</view>
					<!-- <view class="total-yunfei font-face-ios_Avenir" wx:if='{{selectedGoods.shipping_info.value != "包邮"}}'>
        含运费：
        <i class="font-face-ios_Arial">¥</i>{{selectedGoods.shipping_info.value}}
      </view>
      <view class="total-yunfei font-face-ios_Avenir" wx:else>
        {{selectedGoods.shipping_info.value}}
      </view> -->
				</view>
				<form class="toPay" @submit="showConfirm" report-submit="true">
					<button formType="submit">立即支付</button>
				</form>
			</view>
			<!-- 订单确认弹窗 -->
			<view class="drawer_screen" v-if="order_confirm_show"></view>
			<view class="order_confirm_wrap" v-if="order_confirm_show">
				<view class="t4 address-detail row">
					<image class="icon-img" :src="iconURL + '/btn_smallAddr@2x01.png'"></image>
					<text>自提地址（此商品需要您前往提货点自提）</text>
				</view>
				<view class="confirm-address-wrap bb">
					<view class="address-detail padding-left">
						<text>{{consignee.cityName||consignee.address}}</text>
						<text class="address-detail-item">{{consignee.pickup_address}}</text>
					</view>
				</view>
				<view class="address-detail row" style="margin-bottom:30rpx;">
					<image class="icon-img" :src="iconURL + '/btn_smallPrice@2x01.png'"></image>
					<text class="leftName t4">商品金额：</text>
					<text>¥{{selectedGoods.total_price || '0.00'}}</text>
				</view>
				<view class="btn-wrap">
					<form class="btn " @submit="hideConfirm" report-submit="true">
						<button class="base-font-color" formType="submit">取消支付</button>
					</form>
					<form class="btn " @submit="touchSubmit" report-submit="true">
						<button class="base-font-color" style="color:#e71f19!important" formType="submit" :disabled="!canPurchase">确认支付</button>
					</form>
					<!-- <view class='btn base-font-color'>确认支付</view> -->
				</view>
			</view>

			<!-- 选择优惠券弹窗 -->
			<view class="drawer_screen" @tap="setModalBonus" v-if="showBonusModal" catchtouchmove="stopMove"></view>
			<view :animation="animationData" style="opacity:0" class="modal-inner" v-if="showBonusModal" catchtouchmove="stopMove">
				<view class="modal-inner-header modal-coupon-title">选择优惠券
					<text @tap="setModalBonus" class="iconfont icon-btn_qiapianguanbianniux close-right"></text>
				</view>
				<scroll-view class="modal-inner-main" scroll-y="true">
					<view class="modal-inner-block modal-coupon-box">
						<view class="box_list row" :style="'background-image:url(' + iconURL + '/coupon_orange01.png)'" v-for="(bonus, index) in cashgifts"
						 :key="index" v-if="cashgifts.length>0">
							<!-- 左侧面额 -->

							<view class="coupon_val color-coupon" v-if="bonus.coupon_type==1">
								<text class="text">{{bonus.value}}</text>
								<text class="icon">折</text>
							</view>
							<view class="coupon_val color-coupon" v-else>
								<text class="icon">¥</text>
								<text class="text">{{bonus.value}}</text>
							</view>
							<!-- 优惠券信息 -->
							<view class="coupon_info color_gray_dark col-50">
								<view class="list_title">{{bonus.name}}</view>
								<view class="dom-attr">{{bonus.description}}</view>
								<view class="list_time">{{bonus.use_end_date}}</view>
							</view>
							<!-- 右侧领取部位 -->
							<form class="get_coupon_btn col-30">
								<button class="setCoupon" @tap="touchCashgift" :data-id="bonus.id">
									<image class="icon-img-coupon" :src="iconURL + '/gouxuan03.png'" v-if="bonus.id == coupon_id"></image>
									<view class="iconfont icon-btn_weixuanzhongx" v-else></view>
								</button>
							</form>
						</view>
						<view class="no-set-bouns" v-if="cashgifts.length > 0" @tap="touchCashgift" data-id="-1">
							<view class="no-set-bouns-text">暂不使用优惠券</view>
							<image class="icon-img-coupon" :src="iconURL + '/gouxuan03.png'" v-if="coupon_id == -1"></image>
							<view class="iconfont icon-btn_weixuanzhongx" v-else></view>
						</view>
						<view class="no_coupon" v-if="cashgifts.length==0">
							<image :src="iconURL + '/img_coupon_empty02.png'"></image>
							<text class="none_font">暂无可使用的优惠券</text>
						</view>
						<view class="more-bouns" @tap="getModalBonus" v-if="bounsList.length>0">

							<text>点击领取更多优惠券</text>
							<text class="iconfont icon-btn_xiangyoudajiantoux"></text>
						</view>
					</view>
					<view class="modal-inner-block modal-coupon-box margin-top20" v-if="noCashgifts.length > 0">
						<view class="noBouns-title">
							<view class="hr"></view>
							<text>以下优惠券暂不满足使用条件</text>
							<view class="hr"></view>
						</view>
						<view class="box_list row" :style="'background-image:url(' + iconURL + '/coupon_gray01.png)'" v-for="(bonus, index) in noCashgifts"
						 :key="index">
							<!-- 左侧面额 -->
							<view class="coupon_val" v-if="bonus.coupon_type==0">
								<text class="icon">¥</text>
								<text class="text">{{bonus.value}}</text>
							</view>
							<view class="coupon_val" v-if="bonus.coupon_type==1">
								<text class="text">{{bonus.value}}</text>
								<text class="icon">折</text>
							</view>
							<!-- 优惠券信息 -->
							<view class="coupon_info color_gray_dark col-50">
								<view class="list_title">{{bonus.name}}</view>
								<view class="dom-attr">{{bonus.description}}</view>
								<view class="list_time">{{bonus.use_end_date}}</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>

			<!-- 领取优惠券弹窗 -->
			<!-- <view class="drawer_screen" @tap="cashgifts.length > 0 ? 'onSetBouns' : 'getModalBonus'" v-if="showGetBonusModal"
			 catchtouchmove="stopMove"></view> -->
			<view class="drawer_screen" v-if="showGetBonusModal&&cashgifts.length > 0" @tap="onSetBouns" catchtouchmove="stopMove"></view>
			<view class="drawer_screen" v-if="showGetBonusModal&&cashgifts.length == 0" @tap="getModalBonus" catchtouchmove="stopMove"></view>
			<view :animation="animationData" style="opacity:0" class="modal-inner" v-if="showGetBonusModal" catchtouchmove="stopMove">
				<view class="modal-inner-header modal-coupon-title">
					<text class="iconfont icon-btn_fanhuizuojiantoux leave-modal" @click.stop="leaveModal"></text>领取更多优惠券</view>

				<scroll-view class="modal-inner-main" scroll-y="true">
					<view class="modal-inner-block modal-coupon-box">
						<view class="box_list row" :style="'background-image:url(' + iconURL + '/coupon_orange01.png)'" v-for="(bonus, index) in bounsList"
						 :key="index" v-if="bounsList.length>0">
							<!-- 左侧面额 -->
							<view class="coupon_val  color-coupon" v-if="bonus.coupon_type==0">
								<text class="icon">¥</text>
								<text class="text">{{bonus.value}}</text>
							</view>
							<view class="coupon_val  color-coupon" v-if="bonus.coupon_type==1">
								<text class="text">{{bonus.value}}</text>
								<text class="icon">折</text>
							</view>
							<!-- 优惠券信息 -->
							<view class="coupon_info color_gray_dark col-50">
								<view class="list_title">{{bonus.name}}</view>
								<view class="dom-attr">{{bonus.description}}</view>
								<view class="list_time">{{bonus.use_end_date}}</view>
							</view>
							<!-- 右侧领取部位 -->
							<form class="get_coupon_btn col-30" @submit="getBouns" :data-id="bonus.id" v-if="!bonus.is_used">
								<button class="getCoupon" form-type="submit">
									<span class="get_coupon">领取</span>
								</button>
							</form>
							<span class="list_button_img" v-if="bonus.is_used&&!bonus.is_give_over">
								<image @tap="getBonus" :data-typeid="bonus.id" mode="widthFix" :src="iconURL + '/is_used_102.png'"></image>
							</span>
							<span class="list_button_img" v-if="bonus.is_give_over">
								<image @tap="getBonus" :data-typeid="bonus.id" mode="widthFix" :src="iconURL + '/receive_over02.png'"></image>
							</span>
						</view>
					</view>
				</scroll-view>
			</view>

			<!-- 服务弹窗 -->
			<view class="drawer_screen" @tap="setModalBonus" v-if="showBonusModal"></view>
		</view>

		<loading v-if="loadingShow"></loading>
	</view>
</template>

<script>
	// pages/confirm/confirm.js
	var app = getApp().globalData;
	var common = require("../../utils/common.js");

	export default {
		data() {
			return {
				iconURL: app.dataBase.iconURL,
				showDialog: false,
				order_confirm_show: false,
				selectedGoods: {},
				// 默认地址
				consignee: {
					consignee: ""
				},
				consignee2: {
				},
				isTopaydis: false,
				//商品信息
				productInfo: {},
				// 后台筛选返回后商品信息
				order_info: {
					firstGoods: [],
					secondGoods: []
				},
				orderSn: "",
				//发票信息
				invoiceData: {},
				//地址
				cashgift: {},
				//去支付默认
				canPurchase: false,
				// 优惠券展示
				showBonusModal: false,
				// 可领取优惠券展示
				showGetBonusModal: false,
				tip_show: {
					tip1: true,
					tip2: true
				},
				// 是否从缓存里读取地址
				storageAddr: false,
				// 是否需要修改地址
				isEditAddr: false,
				// 可领取优惠券
				bounsList: [],
				// 可用优惠券
				cashgifts: [],
				// 不可用优惠券
				noCashgifts: [],
				order_product: "",
				coupon_id: undefined,
				animationData: "",
				user_note: ""
			};
		},

		components: {},
		props: {},
		onLoad: function(options) {
			let that = this
			this.checkUser();
			this.getPreData();
			//options.index是地址列表中传过,判断是否是选地址页面跳过来的。如果是，利用缓存显示再当前页面的地理信息。如果是别的页面跳过了，显示默认地址
			if(options.index){
				let consignee = common.getStorageSync('edit')[options.index]
				that.consignee = consignee
			}else{
				this.getaddresslist()
			}
			Promise.all([ this.getOrderCouponList(), this.getBounsList()]).then(function(val) {
				that.getcheckOrderinfo();
			});
		},
		onShow: function() {
			
			
			var that = this;
			var data = common.getStorageSync('nowPay');

			if (data == undefined || data == '') {
				common.toast("请求参数错误");
				return;
			}

			
		},
		methods: {
			// 去地图
			goMap: function(e) {
				
				var url = e.currentTarget.dataset.url;
				var pickup_img = e.currentTarget.dataset.pickup_img;
				common.setStorage({
					key: 'pickup_img',
					data: pickup_img
				}, function(res) {
					wx.navigateTo({
						url: url
					});
				});
			},
			// 判断用户是否为黑名单
			checkUser: function() {
				
				
				var that = this;
				var uri = app.getPath.checkUser;
				common.ApiGateWayTest(uri, '', true, function(res) {
					if (res.data.success == 1) {
						return;
					} else {
						wx.showModal({
							title: '用户禁用下单提示',
							content: res.data.msg,
							confirmText: '确定',
							confirmColor: '#eb3c39',
							showCancel: false,
							cancelColor: '#030303',

							success(res) {
								if (res.confirm) {
									wx.navigateBack({
										delta: 1
									});
								}
							}

						});
					}
				});
			},
			// 提示显示隐藏
			isShow: function(e) {
				
				var name = e.currentTarget.dataset.name;
				var tip_show = this.tip_show;
				tip_show[name] = false;
				this.setData({
					tip_show
				});
			},
			getPreData: function() {
				
				var that = this; // 缓存数据

				var productInfo = common.getStorageSync('nowPay');
				var order_product = []; // 将商品转为后台所需json字符串

				for (var i in productInfo) {
					order_product.push({
						goods_id: productInfo[i].goods_id,
						sku_key: productInfo[i].sku_key,
						num: productInfo[i].amount
					});
				}

				order_product = JSON.stringify(order_product);
				that.setData({
					productInfo: productInfo,
					order_product: order_product,
					'order_info.firstGoods': productInfo
				});
				this.cartBuyCheck();
			},
			// 获取地理位置,默认的地址
			getaddresslist: function() {
				var that = this;
				var addressUri = app.getPath.getaddresslist;
				var addressData = {
					is_default: '1' // 地理位置请求

				};
				return new Promise(function(resolve, reject) {
					common.ApiGateWayTest(addressUri, addressData, true, function(res) {
						if (res.statusCode == 200) {
							var res = res.data.result.consignees;
							that.consignee = res[0]
							resolve('getAddress success');
						}
					});
				});
				
			},
			// 新增收货地址
			addAddress: function(callback) {
				var that = this;
				var reg = /^[0-9]{11}$/;

				if (that.consignee.consignee == undefined || that.consignee.consignee == '') {
					common.toast('请输入提货人姓名');
					return;
				}

				if (!reg.test(this.consignee.mobile)) {
					common.toast('请输入正确的手机号');
					return;
				}

				;
				var uri = app.getPath.addaddress;
				var data = {
					consignee: that.consignee.consignee,
					mobile: that.consignee.mobile,
					pickup_id: that.consignee.pickup_id,
					is_default: 1
				};
				
				common.ApiGateWayTest(uri, data, true, function(res) {
					if (res && res.data.success == 1) {
						var res = res.data.result;
						that.setData({
							consignee: res.consignees
						});
						callback && typeof callback === "function" && callback();
					}
				});
				
			},
			// 修改收货地址
			editAddress: function(callback) {
				
				var that = this;
				var reg = /^[0-9]{11}$/;

				if (that.consignee.consignee == undefined || that.consignee.consignee == '') {
					common.toast('请输入提货人姓名');
					return;
				}

				if (!reg.test(this.consignee.mobile)) {
					common.toast('请输入正确的手机号');
					return;
				}

				;
				that.isEditAddr = false;
				var uri = app.getPath.alteraddress;
				var data = {
					consignee: that.consignee.consignee,
					mobile: that.consignee.mobile,
					address_id: that.consignee.address_id,
					pickup_id: that.consignee.pickup_id,
					is_default: that.consignee.is_default
				};
				common.ApiGateWayTest(uri, data, true, function(res) {
					if (res && res.data.success == 1) {
						var res = res.data.result;
						callback && typeof callback === "function" && callback();
					}
				});
				
			},
			// 输入框双向绑定
			editInput: function(e) {
				
				var keyName = e.target.dataset.keyname;
				var val = e.detail.value;
				var consignee = this.consignee;
				consignee[keyName] = val;
				this.isEditAddr = true;
				this.setData({
					consignee
				});
				
			},
			// 获取信息接口
			getcheckOrderinfo: function() {
				
				var that = this;
				// 当前仓库
				var city = common.getStorageSync('city');
				var uri = app.getPath.checkOrderInfo;
				if (that.coupon_id == undefined) {
					that.coupon_id = 0; // that.data.coupon_id = that.data.cashgift.id;
				}

				if (that.selectedGoods.use_balance == undefined) {
					that.selectedGoods.use_balance = 1;
				}

				if (that.consignee.address_id == undefined) {
					that.consignee.address_id = 0;
				}
				// 确认订单接口提交数据
				var data = {
					coupon_id: that.coupon_id,
					address_id: that.consignee.address_id,
					use_balance: that.selectedGoods.use_balance,
					order_product: that.order_product,
					team_order: that.productInfo[0].team_order ? that.productInfo[0].team_order : 0,
					channel: that.productInfo[0].channel ? that.productInfo[0].channel : 0,
					team_id: that.productInfo[0].team_id ? that.productInfo[0].team_id : 0,
					found_id: that.productInfo[0].found_id ? that.productInfo[0].found_id : '',
					activity_bargaining_id: that.productInfo[0].activity_bargaining_id ? that.productInfo[0].activity_bargaining_id :
						'',
					activity_bargain_id: that.productInfo[0].activity_bargain_id ? that.productInfo[0].activity_bargain_id : ''
				};
				// 获取确认订单信息
				return new Promise(function(resolve, reject) {
					common.ApiGateWayTest(uri, data, true, function(res) {
						if (res.statusCode == 200) {
							var res = res.data.result;
							that.setData({
								selectedGoods: res,
								cashgift: res.coupon_info,
								coupon_id: res.coupon_info.id,
								order_info: res.order_info
							});
						}

						var btn = true;
						var order_info = that.order_info;
						order_info.firstGoods.forEach(function(item) {
							if (item.is_disable == 1 || item.is_enough == 0 || item.is_on_sale == 0) {
								btn = false;
							}
						});
						order_info.secondGoods.forEach(function(item) {
							if (item.is_disable == 1 || item.is_enough == 0 || item.is_on_sale == 0) {
								btn = false;
							}
						}); // that.data.consignee && that.data.consignee.address_id

						if (btn) {
							that.setData({
								canPurchase: true
							});
						} else {
							that.setData({
								canPurchase: false
							});
							wx.showModal({
								content: '商品被抢光咯，小提正在补货中喔~',
								showCancel: false,
								confirmText: '取消',
								confirmColor: '#575757'
							});
						}

						resolve('getcheckOrderinfo success');
					});
				});
				
			},
			// 地址选择
			touchAddress: function() {
				
				var that = this;
				wx.navigateTo({
					//这里给参数switch=1 A页面跳到B页面，然后点击B页面再调回来
					url: '/pages/address/addressList/addressList?from=confirm&&switch=1'
				});
				
			},
			// 新增地址
			newAddress: function() {
				
				
				var that = this;
				wx.navigateTo({
					url: '/pages/address/address'
				});
				
			},
			// 优惠券选择
			touchCashgift: function(e) {
				var that = this;
				var id = e.currentTarget.dataset.id;

				if (that.coupon_id == id) {
					that.setModalBonus();
					return false;
				} else {
					that.coupon_id = id;
					that.getcheckOrderinfo();
				}

				that.setModalBonus();
			},
			// 优惠券列表信息
			getOrderCouponList: function() {
				var that = this;
				var uri = app.getPath.ordercouponList;
				var data = {
					order_product: that.order_product,
					team_order: that.productInfo[0].team_order ? that.productInfo[0].team_order : 0,
					team_id: that.productInfo[0].team_id ? that.productInfo[0].team_id : 0,
					activity_bargaining_id: that.productInfo[0].activity_bargaining_id ? that.productInfo[0].activity_bargaining_id :
						''
				};
				return new Promise(function(resolve, reject) {
					common.ApiGateWayTest(uri, data, true, function(res) {
						if (res.data.errorCode != 1) {
							var res = res.data.result;
							that.setData({
								cashgifts: res.lists,
								noCashgifts: res.no_lists
							});
							resolve('getOrderCouponList');
						} else {
							common.toast(res.data.msg);
						}
					});
				});
			},
			// 可领取优惠券信息
			getBounsList: function() {
				var that = this;
				var uri = app.getPath.canGetCouponList;
				var data = {
					order_product: that.order_product,
					team_order: that.productInfo[0].team_order ? that.productInfo[0].team_order : 0,
					team_id: that.productInfo[0].team_id ? that.productInfo[0].team_id : 0,
					activity_bargaining_id: that.productInfo[0].activity_bargaining_id ? that.productInfo[0].activity_bargaining_id :
						''
				};
				return new Promise(function(resolve, reject) {
					common.ApiGateWayTest(uri, data, true, function(res) {
						if (res.data.errorCode != 1) {
							var res = res.data.result;
							that.setData({
								bounsList: res.lists
							});
							resolve('getBounsList');
						} else {
							common.toast(res.data.msg);
						}
					});
				});
			},
			// 点击领取优惠券
			getBouns: function(e) {
				var that = this;
				var id = e.currentTarget.dataset.id;
				var uri = app.getPath.addCoupon;
				var data = {
					coupon_id: id
				};
				common.ApiGateWayTest(uri, data, true, res => {
					var resData = res.data;

					if (resData.success == 1) {
						that.getBounsList();
						that.getOrderCouponList();
						common.toast(resData.result.state_desc);
					} else {
						common.toast(resData.result.state_desc);
						return;
					}
				});
			},
			// 可领取优惠券-去使用
			onSetBouns: function() {
				var that = this;
				that.coupon_id = 0;
				that.getModalBonus();
				that.getcheckOrderinfo();
				that.getOrderCouponList();
			},
			//发票
			// touchInvoice: function () {
			//   var newData;
			//   if (this.data.invoiceData) {
			//     newData = JSON.stringify(this.data.invoiceData)
			//   } else {
			//     newData = undefined;
			//   }
			//   wx.navigateTo({
			//     url: './invoice/invoice?invoiceData=' + newData
			//   })
			// },
			// 从外部二维码扫码，带经纬度和外部标识external
			getExternal: function(pickup_id) {
				var that = this;
				var uri = app.getPath.getpickup;
				var data = {
					pickup_id: pickup_id
				};
				return new Promise(function(resolve, reject) {
					// 获取提货点
					common.ApiGateWayTest(uri, data, true, function(res) {
						if (res && res.data && res.data.success == 1) {
							var res = res.data.result.cities.pick_up;
							common.setStorage({
								key: 'city',
								data: {
									'pickup_id': res.pickup_id,
									'warehouse_id': res.warehouse_id,
									'cityName': res.city_name,
									'is_pick_up': 1
								}
							});
							common.setStorage({
								key: 'getpickup',
								data: {
									'pickup_id': res.pickup_id,
									'cityName': res.pickup_name,
									'pickup_address': res.pickup_address,
									'pickup_contact': res.pickup_contact,
									'pickup_phone': res.pickup_phone,
									'pickup_type': res.pickup_type
								}
							}, function(res) {
								resolve('获取id成功');
							});
						}
					});
				});
			},
			// 已领取优惠券弹窗
			setModalBonus: function() {
				if (this.showBonusModal == 0) {
					this.showBonusModal = 1;
				} else {
					this.showBonusModal = 0;
				}

				var animation = wx.createAnimation({
					duration: 300,
					timingFunction: "linear",
					delay: 0
				});
				animation.translateY(300).opacity(1).step();
				this.setData({
					animationData: animation.export()
				});

				if (this.showBonusModal == 1) {
					this.setData({
						showBonusModal: true
					});
				}

				setTimeout(function() {
					animation.translateY(0).step();
					this.setData({
						animationData: animation
					});

					if (this.showBonusModal == 0) {
						this.setData({
							showBonusModal: false
						});
					}
				}.bind(this), 200);
			},
			refreshOrderPrice: function() {},
			// 可领取优惠券弹窗
			getModalBonus: function() {
				if (this.showGetBonusModal == 0) {
					this.showGetBonusModal = 1;
				} else {
					this.showGetBonusModal = 0;
				}

				var animation = wx.createAnimation({
					duration: 300,
					timingFunction: "linear",
					delay: 0
				});
				animation.translateY(300).opacity(1).step();
				this.setData({
					animationData: animation.export()
				});

				if (this.showGetBonusModal == 1) {
					this.setData({
						showGetBonusModal: true,
						showBonusModal: false
					});
				}

				setTimeout(function() {
					animation.translateY(0).step();
					this.setData({
						animationData: animation
					});

					if (this.showGetBonusModal == 0) {
						this.setData({
							showGetBonusModal: false
						});
					}
				}.bind(this), 200);
			},
			//  是否使用余额
			use_balance: function() {
				var that = this;
				var selectedGoods = this.selectedGoods;

				if (selectedGoods.use_balance == 1) {
					selectedGoods.use_balance = 0;
				} else {
					selectedGoods.use_balance = 1;
				}

				that.setData({
					selectedGoods
				}); // 重新获取信息

				that.getcheckOrderinfo();
			},
			// 留言
			refreshComment: function(event) {
				var value = event.detail.value;
				this.setData({
					user_note: value
				});
			},
			// 检测新人礼包
			cartBuyCheck: function(callback) {
				var that = this;
				var uri = app.getPath.cartBuyCheck;
				var data = {
					order_product: that.order_product
				};
				common.ApiGateWayTest(uri, data, true, function(res) {
					if (res.data.success == 1) {
						if (res.data.result.state == 1) {
							wx.showModal({
								title: '',
								content: res.data.result.msg,
								showCancel: false,
								confirmText: '确认',
								confirmColor: '#eb3c39',
								success: function(res) {
									if (res.confirm) {
										wx.navigateBack({
											delta: 1
										});
									} // (callback && typeof (callback) === "function") && callback(res);

								}
							}); // common.showModal(res.data.result.msg);
						}
					}
				});
			},
			// 显示支付弹窗
			showConfirm: function(e) {
				var that = this;
				common.getStorage({
					key: 'getpickup'
				}, function(res) {
					if (res.data.pickup_id && res.data.pickup_id > 0) {
						var reg = /^[0-9]{11}$/;

						if (that.consignee.consignee == undefined || that.consignee.consignee == '') {
							common.toast('请输入提货人姓名');
							return;
						}

						if (!reg.test(that.consignee.mobile)) {
							common.toast('请输入正确的手机号');
							return;
						}

						;
						that.beforeSubmit();
					} else {
						that.touchSubmit(e);
					}
				});
			},
			// 隐藏支付弹窗
			hideConfirm: function(e) {
				common.formIdUpdate(e);
				this.setData({
					order_confirm_show: false
				});
			},
			// 支付前地址分析
			beforeSubmit: function(e) {
				// 没收货地址，从缓存取到地址
				var that = this;

				if (this.storageAddr) {
					that.setData({
						order_confirm_show: true
					});
					
					that.addAddress(function() {
						console.log(6666666666666)
						that.getaddresslist();
					});
				} else {
					if (this.isEditAddr == true) {
						that.editAddress(function() {
							that.setData({
								order_confirm_show: true
							});
						});
					} else {
						that.setData({
							order_confirm_show: true
						});
					}
				}
			},
			// 去支付
			touchSubmit: function(e) {
				
				var that = this;
				var productInfo = that.productInfo;
				var uri = app.getPath.confirmOrder;
				var carturi = app.getPath.confirmCartOrder;

				if (that.consignee && !that.consignee.address_id) {
					var content = '您还未设置收货地址';
					var confimText = '去设置';
					common.showModal(content, confimText, function(res) {
						if (res.confirm) {
							that.newAddress();
						} else {
							return;
						}
					});
				} else {
					common.showLoad(that);

					if (that.selectedGoods.coupons_can_use == 0) {
						that.coupon_id = -1;
					}

					var data = {
						coupon_id: that.coupon_id,
						address_id: that.consignee.address_id,
						// shipping_code: that.data.selectedGoods.shipping_info.code,
						cart_ids: [],
						payment_code: that.selectedGoods.payment_code[0],
						// invoice_content: that.data.invoiceData.companyName == undefined ? '' : that.data.invoiceData.companyName,
						// invoice_type: that.data.invoiceData.type == undefined ? '' : that.data.invoiceData.type,
						// invoice_title: that.data.invoiceData.upId == undefined ? '' : that.data.invoiceData.upId,
						// taxpayer: that.data.invoiceData.taxesCode == undefined ? '' : that.data.invoiceData.taxesCode,
						user_note: that.user_note == undefined ? '' : that.user_note,
						use_balance: that.selectedGoods.use_balance,
						time_atitude: app.dataBase.userAtitude,
						team_order: productInfo[0].team_order ? productInfo[0].team_order : 0,
						channel: productInfo[0].channel ? productInfo[0].channel : 0,
						team_id: productInfo[0].team_id ? productInfo[0].team_id : 0,
						found_id: productInfo[0].found_id ? productInfo[0].found_id : '',
						activity_bargaining_id: productInfo[0].activity_bargaining_id ? productInfo[0].activity_bargaining_id : '',
						activity_bargain_id: productInfo[0].activity_bargain_id ? productInfo[0].activity_bargain_id : ''
					};

					for (var i in productInfo) {
						if (productInfo[i].cart_id && productInfo[i].cart_id > 0) {
							data.cart_ids.push(productInfo[i].cart_id);
						}
					}

					common.formIdUpdate(e);

					if (!that.isTopaydis) {
						that.isTopaydis = true;

						if (data.cart_ids && data.cart_ids.length > 0) {
							// 从购物车进入
							if (that.orderSn == "") {
								common.ApiGateWayTest(carturi, data, true, function(res) {
									if (res.data.success == 1) {
										var res = res.data.result;
										that.orderSn = res.order_id;
										var payUri = app.getPath.doPay;
										var payData = {
											order_id: res.order_id,
											payment_code: that.selectedGoods.payment_code[0]
										};
										that.isTopaydis = false;

										if (res.status == 1) {
											common.hideLoad(that);

											for (var i in that.order_info.firstGoods) {
												// app.aldstat.sendEvent("支付成功", {
												//   "商品名称": that.order_info.firstGoods[i].goods_name
												// });
											}

											for (var i in that.order_info.secondGoods) {
												// app.aldstat.sendEvent("支付成功", {
												//   "商品名称": that.order_info.secondGoods[i].goods_name
												// });
											} // 直接用账户余额支付


											wx.redirectTo({
												url: './paymentStatus/paymentStatus?order_id=' + payData.order_id + '&consignee=' + JSON.stringify(
													that.consignee) + '&payment_code=' + payData.payment_code
											});
										} else {
											common.hideLoad(that); // 下单成功，调用支付

											common.ApiGateWayTest(payUri, payData, true, function(res) {
												if (res.data.success == 1) {
													var data = res.data.result;
													common.doWechatPay(data, function(res) {
														for (var i in that.order_info.firstGoods) {
															// app.aldstat.sendEvent("支付成功", {
															//   "商品名称": that.order_info.firstGoods[i].goods_name
															// });
														}

														for (var i in that.order_info.secondGoods) {
															// app.aldstat.sendEvent("支付成功", {
															//   "商品名称": that.order_info.secondGoods[i].goods_name
															// });
														} // wx.redirectTo({
														//   url: './paymentStatus/paymentStatus?order_id=' + payData.order_id + '&consignee=' + JSON.stringify(that.data.consignee) + '&payment_code=' + payData.payment_code,
														// })

													}, function(failres) {
														for (var i in that.order_info.firstGoods) {
															// app.aldstat.sendEvent("支付失败", {
															//   "商品名称": that.order_info.firstGoods[i].goods_name
															// });
														}

														for (var i in that.order_info.secondGoods) {
															// app.aldstat.sendEvent("支付失败", {
															//   "商品名称": that.order_info.secondGoods[i].goods_name
															// });
														} // common.toast("支付失败");

													}, function(completeres) {
														// + '&payment_type=true'
														wx.redirectTo({
															url: './paymentStatus/paymentStatus?order_id=' + payData.order_id + '&consignee=' + JSON.stringify(
																that.consignee) + '&payment_code=' + payData.payment_code
														});
													});
												} else {
													common.toast(res.data.msg);
													that.isTopaydis = false;
													return;
												}
											});
										}
									} else {
										common.toast(res.data.msg);
										that.isTopaydis = false;
										return;
									}
								});
							} else {
								var payUri = app.getPath.doPay;
								var payData = {
									order_id: parseInt(that.orderSn),
									payment_code: that.selectedGoods.payment_code[0]
								};
								common.hideLoad(that);
								that.isTopaydis = false; // 下单成功，调用支付

								common.ApiGateWayTest(payUri, payData, true, function(res) {
									if (res.data.success == 1) {
										var data = res.data.result;
										common.doWechatPay(data, function(res) {
											for (var i in that.order_info.firstGoods) {
												// app.aldstat.sendEvent("支付成功", {
												//   "商品名称": that.order_info.firstGoods[i].goods_name
												// });
											}

											for (var i in that.order_info.secondGoods) {
												// app.aldstat.sendEvent("支付成功", {
												//   "商品名称": that.order_info.secondGoods[i].goods_name
												// });
											} // wx.redirectTo({
											//   url: './paymentStatus/paymentStatus?order_id=' + payData.order_id + '&consignee=' + JSON.stringify(that.data.consignee) + '&payment_code=' + payData.payment_code,
											// })

										}, function(failres) {
											for (var i in that.order_info.firstGoods) {
												// app.aldstat.sendEvent("支付失败", {
												//   "商品名称": that.order_info.firstGoods[i].goods_name
												// });
											}

											for (var i in that.order_info.secondGoods) {
												// app.aldstat.sendEvent("支付失败", {
												//   "商品名称": that.order_info.secondGoods[i].goods_name
												// });
											} // common.toast("支付失败");

										}, function(completeres) {
											wx.redirectTo({
												url: './paymentStatus/paymentStatus?order_id=' + payData.order_id + '&consignee=' + JSON.stringify(
													that.consignee) + '&payment_code=' + payData.payment_code
											});
										});
									} else {
										common.toast(res.data.msg);
										that.isTopaydis = false;
										return;
									}
								});
							}
						} else {
							if (that.orderSn == "" || productInfo[0].team_order == 1 || productInfo[0].team_order == 2) {
								// 从商品详情  立即购买进入
								data['order_product'] = [{
									goods_id: productInfo[i].goods_id,
									sku_key: productInfo[i].sku_key,
									num: productInfo[i].amount
								}];
								data.order_product = JSON.stringify(data.order_product);
								common.ApiGateWayTest(uri, data, true, function(res) {
									if (res.data.success == 1) {
										var res = res.data.result;
										that.orderSn = res.order_id;
										var payUri = app.getPath.doPay;
										var payData = {
											order_id: res.order_id,
											payment_code: that.selectedGoods.payment_code[0]
										};
										common.hideLoad(that);
										that.isTopaydis = false;

										if (res.status == 1) {
											for (var i in that.order_info.firstGoods) {
												// app.aldstat.sendEvent("支付成功", {
												//   "商品名称": that.order_info.firstGoods[i].goods_name
												// });
											}

											for (var i in that.order_info.secondGoods) {
												// app.aldstat.sendEvent("支付成功", {
												//   "商品名称": that.order_info.secondGoods[i].goods_name
												// });
											} // 余额支付，实付为0，不走支付接口


											wx.redirectTo({
												url: './paymentStatus/paymentStatus?order_id=' + payData.order_id + '&consignee=' + JSON.stringify(
													that.consignee) + '&payment_code=' + payData.payment_code
											});
										} else {
											// 走支付接口
											common.ApiGateWayTest(payUri, payData, true, function(res) {
												if (res.data.success == 1) {
													var data = res.data.result;

													if (productInfo[0].team_order == 1 || productInfo[0].team_order == 2) {
														var found_id = data.found_id;
													}

													common.showLoad(that);
													common.doWechatPay(data, function(res) {
														var pickupId = common.getStorageSync('getpickup');

														if (that.consignee.is_default == 1 && pickupId != that.consignee.pickup_id) {
															that.getExternal(that.consignee.pickup_id);
														}

														for (var i in that.order_info.firstGoods) {
															// app.aldstat.sendEvent("支付成功", {
															//   "商品名称": that.order_info.firstGoods[i].goods_name
															// });
														}

														for (var i in that.order_info.secondGoods) {
															// app.aldstat.sendEvent("支付成功", {
															//   "商品名称": that.order_info.secondGoods[i].goods_name
															// });
														}

														if (productInfo[0].team_order == 1 || productInfo[0].team_order == 2) {
															var checkPayUri = app.getPath.checkPay;
															var checkPayData = {
																order_id: that.orderSn,
																payment_code: payData.payment_code
															};
															common.ApiGateWayTest(checkPayUri, checkPayData, true, function(resData) {
																if (resData.data.success == 1) {
																	wx.redirectTo({
																		url: '../../packageA/groupbuy/groupbuy?found_id=' + resData.data.result.found_id +
																			'&entryType=external' + '&teamType=' + productInfo[0].team_order
																	});
																	common.hideLoad(that);
																} else {
																	common.toast("支付失败");
																	common.hideLoad(that);
																}
															});
														} else {
															wx.redirectTo({
																url: './paymentStatus/paymentStatus?order_id=' + payData.order_id + '&consignee=' + JSON.stringify(
																	that.consignee) + '&payment_code=' + payData.payment_code
															});
														}
													}, function(failres) {
														for (var i in that.order_info.firstGoods) {
															// app.aldstat.sendEvent("支付失败", {
															//   "商品名称": that.order_info.firstGoods[i].goods_name
															// });
														}

														for (var i in that.order_info.secondGoods) {
															// app.aldstat.sendEvent("支付失败", {
															//   "商品名称": that.order_info.secondGoods[i].goods_name
															// });
														}

														if (productInfo[0].team_order == 1 || productInfo[0].team_order == 2) {
															var checkPayUri = app.getPath.checkPay;
															var checkPayData = {
																order_id: that.orderSn,
																payment_code: payData.payment_code
															};
															common.ApiGateWayTest(checkPayUri, checkPayData, true, function(resData) {
																if (resData.data.success == 1) {
																	wx.redirectTo({
																		url: '../../packageA/groupbuy/groupbuy?found_id=' + resData.data.result.found_id +
																			'&entryType=external' + '&teamType=' + productInfo[0].team_order
																	});
																	common.hideLoad(that);
																} else {
																	common.toast("支付失败");
																	common.hideLoad(that);
																}
															});
														} else {
															wx.redirectTo({
																url: './paymentStatus/paymentStatus?order_id=' + payData.order_id + '&consignee=' + JSON.stringify(
																	that.consignee) + '&payment_code=' + payData.payment_code
															});
															common.hideLoad(that);
														}
													});
												} else {
													common.toast(res.data.msg);
													that.isTopaydis = false;
													return;
												}
											});
										}
									} else {
										common.toast(res.data.msg);
										common.hideLoad(that);
										that.isTopaydis = false;
										return;
									}
								});
							} else {
								var payUri = app.getPath.doPay;
								var payData = {
									order_id: parseInt(that.orderSn),
									payment_code: that.selectedGoods.payment_code[0]
								};
								common.hideLoad(that);
								that.isTopaydis = false; // 走支付接口

								common.ApiGateWayTest(payUri, payData, true, function(res) {
									if (res.data.success == 1) {
										var data = res.data.result;
										common.doWechatPay(data, function(res) {
											for (var i in that.order_info.firstGoods) {
												// app.aldstat.sendEvent("支付成功", {
												//   "商品名称": that.order_info.firstGoods[i].goods_name
												// });
											}

											for (var i in that.order_info.secondGoods) {
												// app.aldstat.sendEvent("支付成功", {
												//   "商品名称": that.order_info.secondGoods[i].goods_name
												// });
											} // wx.redirectTo({
											//   url: './paymentStatus/paymentStatus?order_id=' + payData.order_id + '&consignee=' + JSON.stringify(that.data.consignee) + '&payment_code=' + payData.payment_code,
											// })

										}, function(failres) {
											for (var i in that.order_info.firstGoods) {
												// app.aldstat.sendEvent("支付失败", {
												//   "商品名称": that.order_info.firstGoods[i].goods_name
												// });
											}

											for (var i in that.order_info.secondGoods) {
												app.aldstat.sendEvent("支付失败", {
													"商品名称": that.order_info.secondGoods[i].goods_name
												});
											} // common.toast("支付失败");

										}, function(completeres) {
											wx.redirectTo({
												url: './paymentStatus/paymentStatus?order_id=' + payData.order_id + '&consignee=' + JSON.stringify(
													that.consignee) + '&payment_code=' + payData.payment_code
											});
										});
									} else {
										common.toast(res.data.msg);
										that.isTopaydis = false;
										return;
									}
								});
							}
						}
					}
				}
				
			},

			// 返回上级弹窗
			leaveModal() {
				// if (this.data.showGetBonusModal == 0) {
				//   this.data.showGetBonusModal = 1;
				// } else {
				//   this.data.showGetBonusModal = 0;
				// }
				var animation = wx.createAnimation({
					duration: 300,
					timingFunction: "linear",
					delay: 0
				});
				animation.translateY(300).opacity(1).step();
				this.setData({
					animationData: animation.export()
				});

				if (this.showGetBonusModal == 1) {
					this.setData({
						showGetBonusModal: false,
						showBonusModal: true
					});
				}

				setTimeout(function() {
					animation.translateY(0).step();
					this.setData({
						animationData: animation
					});

					if (this.showGetBonusModal == 0) {
						this.setData({
							showBonusModal: true
						});
					}
				}.bind(this), 200);
			},

			// 阻止父级冒泡
			stopMove() {
				return true;
			},
			cashgift_jump_type(jump_type) {
				if (jump_type) {
					this.getModalBonus()
				} else {
					this.setModalBonus()
				}
			},
			setData: function(obj) {
				let that = this;
				let keys = [];
				let val, data;
				Object.keys(obj).forEach(function(key) {
					keys = key.split('.');
					val = obj[key];
					data = that.$data;
					keys.forEach(function(key2, index) {
						that[key] = obj[key];
					});
				});
			}
		}
	};
</script>
<style>
	@import "./confirm.css";
</style>
