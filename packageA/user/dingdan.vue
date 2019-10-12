<template>
	<view>
		<!--pages/user/dingdan.wxml-->
		<!-- 返回首页悬浮框/分享进入显示 -->
		<view class="goHomeFixed" @click.stop="gotoHome" v-if="isShowGoHome">
			<image :src="iconURL + '/product-icon-leftReturn.svg'" class="icon-leftReturn"></image>
			<text>返回首页</text>
		</view>
		<view class="order-filter">
			<view :class="'filter-item ' + (currentTab==0 ? 'active' : '')" data-current="0" data-c='88' @tap="swichNav">
				<text>全部</text>
			</view>
			<view :class="'filter-item ' + (currentTab==1 ? 'active' : '')" data-current="1" @tap="swichNav">
				<text>待支付</text>
			</view>
			<view :class="'filter-item ' + (currentTab==4 ? 'active' : '')" data-current="4" @tap="swichNav">
				<text>待成团</text>
			</view>
			<view :class="'filter-item ' + (currentTab==2 ? 'active' : '')" data-current="2" @tap="swichNav">
				<text>待提货</text>
			</view>
			<view :class="'filter-item ' + (currentTab==3 ? 'active' : '')" data-current="3" @tap="swichNav">
				<text>待评价</text>
			</view>
		</view>

		<view class="order-list" v-if="orders && orders.length > 0">
			<view class="list-item" v-for="(order, index) in orders" :key="index" @tap="goOrderDetail" :data-orderid="order.order_id">
				<!-- 订单头部信息 -->
				<view class="header-row row">
					<view class="border-b row">
						<view class="header-lf w70">
							<text>订单号:</text>
							<text>{{order.order_sn}}</text>
						</view>
						<view class="header-rg w30">
							<text>{{order.status_desc}}</text>
						</view>
					</view>
				</view>
				<!-- 商品列表 -->
				<view class="order-main">
					<!-- <view
        class='goods-fms'
        wx:if="{{order.status == ORDER_STATUS.DELIVERING || order.status == ORDER_STATUS.DELIVERIED || order.status == ORDER_STATUS.FINISHED}}">
        <span class="fms-no">包裹{{delivery_id + 1}}</span>
        <span class="fms-num">({{goods_formate.delivery_goods_num}}件商品)</span>
        <span catchtap="touchExpress" wx:if="{{goods_formate.is_send != 0}}" data-order='{{order}}' data-delivery_id='{{goods_formate.delivery_id}}'>
          <span class="fms-check">查看物流</span>
          <image class="fms-arrow" mode='widthFix' src="{{iconURL}}/icon_right_arrow.png" />
        </span>
        <span wx:else>
          <span class="fms-check">尚未发货</span>
        </span>
      </view> -->
					<view class="date_wrap" v-if="order.status == ORDER_STATUS.PAID||order.status == ORDER_STATUS.PREPARING||order.status == ORDER_STATUS.PICKING">
						<view class="tab footer-button">{{order.shippingTimeDesc}}</view>
						<!-- <view class='des'>{{order.shippingTimeDesc}}</view> -->
					</view>
					<view class="goods-item" v-for="(goods, index2) in order.products" :key="index2">
						<view class="item-photo">
							<image lazy-load="true" :src="goods.header_img"></image>
						</view>
						<view class="item-info">
							<view class="info-name">
								{{goods.goods_name}}
							</view>
							<view class="info-attr">
								{{goods.sku_key_name}}
							</view>
							<view class="info-price">
								<text class="icon_rmb">¥</text>{{goods.shop_price}}
							</view>
							<view class="info-amount">x{{goods.amount}}</view>
						</view>
					</view>
				</view>
				<view :class="'item-footer border-bottom ' + (order.status != ORDER_STATUS.CREATED && order.status != ORDER_STATUS.DELIVERING && order.status != ORDER_STATUS.DELIVERIED && order.status != ORDER_STATUS.FINISHED ? 'no-border' : '') + ' ' + (order.order_source=='qqwallet' ? 'multi-line' : '')">
					<view class="footer-sum b-bottom">
						<view>
							<text class="sum-nums">共计{{order.goods_count}}件，</text>
							<span>
								<text class="sum-text">实付款 </text>
								<text class="sum">
									<text class="icon_rmb">¥</text>
									<text class="p">{{order.order_amount}}</text>
								</text>
							</span>
						</view>
					</view>
				</view>
				<view class="item-footer buttons" v-if="order.order_btn.pay_btn == 1 || order.order_btn.cancel_btn == 1 || order.order_btn.comment_again_btn == 1 ||order.order_btn.back_btn == 1|| order.order_btn.comment_btn == 1 || order.order_btn.receive_btn == 1">
					<button style="background-color:#ffe150;color:#555!important" class="footer-button" v-if="order.order_btn.pay_btn == 1"
					 @click.stop="touchPay" :data-order-id="order.order_id">
						立即支付
					</button>
					<button type="default" style="background-color: #fff！important;border: 1rpx solid #ddd;" class="footer-button"
					 v-if="order.order_btn.cancel_btn == 1" @click.stop="touchCancel" :data-order-id="order.order_id">取消订单</button>
					<!-- <button type='default' style='background-color: #fff;border: 1rpx solid #ddd;' class="footer-button"  wx:if="{{order.order_btn.back_btn == 1}}" catchtap='setModalStatus' data-status='1' data-order-id='{{order.order_id}}'>申请退款</button> -->
					<!-- wx:if="{{order.order_btn.back_btn == 1}}" -->
					<button class="footer-button" v-if="order.order_btn.receive_btn == 1" @click.stop="touchConfirm" :data-order-id="order.order_id">确认收货</button>
					<button style="background-color:#ffe150;color:#555!important" class="footer-button" v-if="order.order_btn.comment_btn == 1"
					 @click.stop="touchComment" :data-order-id="order.order_id">立即评价</button>
					<button class="footer-button" v-if="order.order_btn.comment_again_btn == 1" @click.stop="touchSubComment"
					 :data-order-id="order.order_id">追加评价</button>
				</view>
			</view>
		</view>

		<view class="empty" v-if="orders && orders.length <= 0">
			<view class="empty-item">
				<image class="item-logo" :src="iconURL + '/icon_order_empty02.png'" mode="widthFix"></image>
				<view class="item-text">暂无订单</view>
			</view>
		</view>

		<loading2 v-if="loadingShow"></loading2>
	</view>
</template>

<script>
	// /user/dingdan.js
	var app = getApp().globalData;
	var common = require("../../utils/common.js");

	export default {
		data() {
			return {
				iconURL: app.dataBase.iconURL,
				//订单状态
				ORDER_STATUS: app.ORDER_STATUS,
				//tab切换
				TAB_ALL: 0,
				TAB_CREATED: 1,
				TAB_PAID: 2,
				TAB_DELIVERING: 3,
				TAB_DELIVERIED: 4,
				currentTab: '0',
				page_size: 5,
				page: 1,
				reasons: ['商品质量问题', '商品漏发/错发', '其他'],
				orders: [],
				isShowGoHome: false,
				loadingShow:true
			};
		},

		components: {},
		props: {},
		onLoad: function(options) {
			console.log(options)
			if (options == undefined || options.currentTab == undefined) {
				common.toast("请求参数错误");
				return;
			}
			console.log('欢迎进入我的订单页面')
			this.setData({
				currentTab: String(options.currentTab)
			});

			if (options && options.entryType && options.entryType == 'external') {
				this.setData({
					isShowGoHome: false
				});
			} else {
				this.setData({
					isShowGoHome: true
				});
			}
		},
		onShow: function() {
			this.page = 1;
			this.page_size = 5;
			this.orders = [];
			wx.pageScrollTo({
				scrollTop: 0,
				duration: 100
			});
			this.loadOrderList();
		},
		onReachBottom: function() {
			var that = this;

			if (that.orders && that.orders.length % that.page_size == 0) {
				that.page = that.orders.length / that.page_size + 1;
				that.loadOrderList();
			}
		},
		
		methods: {
			// 返回首页
			gotoHome: function() {
				wx.switchTab({
					url: '/pages/index/index'
				});
			},
			//获取订单列表数据
			loadOrderList: function() {
				var that = this;
				common.showLoad(this);
				var url = app.getPath.orderList;

				if (that.currentTab == 0) {
					that.currentTab = "0";
				}

				var data = {
					page: that.page,
					page_size: that.page_size,
					status: that.currentTab
				};
				common.ApiGateWayTest(url, data, true, function(res) {
					var orders = res.data.result.data;

					if (orders && res.data.errorCode != 1) {
						that.orders = that.orders ? that.orders.concat(orders) : orders;
						that.setData({
							orders: that.orders,
							loadingShow:false
						});
						common.hideLoad(that);
						wx.stopPullDownRefresh();
					} else {
						common.toast(res.data.msg);
					}
				});
			},
			swichNav: function(e) {
				var that = this;
				if (that.currentTab === e.currentTarget.dataset.current) {
					return false;
				} else {
					var current = e.currentTarget.dataset.current;
					that.getOrderStatus();
					that.setData({
						currentTab: current
					});
				}
				that.onPullDownRefresh2();
			},
			getOrderStatus: function() {
				return this.currentTab == 0 ? 1 : this.currentTab == 2 ? 2 : this.currentTab == 3 ? 3 : this.currentTab == 4 ? 4 :
					0;
			},
			//取消订单
			touchCancel: function(e) {
				var that = this;
				var orderId = e.currentTarget.dataset.orderId;
				var url = app.getPath.cancelOrder;
				var data = {
					order_id: orderId
				};
				var content = '是否取消该订单？';
				var confirmText = '确定';
				common.showModal(content, confirmText, function(res) {
					res.confirm && common.ApiGateWayTest(url, data, true, function(res) {
						if (res.data.success == 1) {
							wx.pageScrollTo({
								scrollTop: 0,
								duration: 100
							});
							common.toast(res.data.msg);
							that.onPullDownRefresh2();
						} else {
							common.toast(res.data.msg);
						}
					});
				});
			},
			//确认收货
			touchConfirm: function(e) {
				var that = this;
				var orderId = e.currentTarget.dataset.orderId;
				var uri = app.getPath.confirmReceive;
				var data = {
					order_id: orderId
				};
				var content = '你确定已收到宝贝吗？';
				var confirmText = '确定';
				common.showModal(content, confirmText, function(res) {
					res.confirm && common.ApiGateWayTest(uri, data, true, function(res) {
						if (res.data.success == 1) {
							wx.pageScrollTo({
								scrollTop: 0,
								duration: 100
							});
							common.toast(res.data.msg);
							that.onPullDownRefresh2();
						} else {
							common.toast(res.data.msg);
						}
					});
				});
			},
			// 立即支付
			touchPay: function(e) {
				var that = this;
				var orderId = e.currentTarget.dataset.orderId;
				var payUri = app.getPath.doPay;
				var payData = {
					order_id: orderId,
					payment_code: 'wxpay'
				};
				common.ApiGateWayTest(payUri, payData, true, function(res) {
					if (res.data.success == 1) {
						var data = res.data.result;
						common.doWechatPay(data, function(res) {
							common.toast('支付成功'); // 支付成功后二次验证，修改后台状态
							// that.checkPay(orderId)

							wx.navigateTo({
								url: '/pages/confirm/paymentStatus/paymentStatus?order_id=' + payData.order_id + '&payment_code=' +
									payData.payment_code
							});
						}, function(failres) {
							common.toast('支付失败');
							wx.pageScrollTo({
								scrollTop: 0,
								duration: 100
							}); // that.onPullDownRefresh2();
						});
					}
				});
			},
			checkPay: function(orderId) {
				var that = this;
				var uri = app.getPath.checkPay;
				var data = {
					order_id: orderId
				};
				common.ApiGateWayTest(uri, data, true, function(res) {
					wx.pageScrollTo({
						scrollTop: 0,
						duration: 100
					});
					that.onPullDownRefresh2();
				});
			},
			goOrderDetail: function(e) {
				var order = e.currentTarget.dataset.orderid;
				wx.navigateTo({
					url: '../user/detail?entryType=external&orderId=' + order
				});
			},
			touchExpress: function(e) {
				var item = e.currentTarget.dataset;
				wx.navigateTo({
					url: '../user/order-express?order=' + item.order.order_id + '&delivery_id=' + item.delivery_id
				});
			},
			touchComment: function(e) {
				var order = e.currentTarget.dataset.orderId;
				wx.navigateTo({
					url: '../user/order-review?order=' + order
				});
			},
			touchSubComment: function(e) {
				var order = e.currentTarget.dataset.orderId;
				wx.navigateTo({
					url: '../user/add-order-review?order=' + order
				});
			},
			onPullDownRefresh2: function() {
				var that = this;
				that.orders = [];
				that.page = 1;
				that.page_size = 5;
				that.loadOrderList();
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
	@import "./dingdan.css";
</style>
