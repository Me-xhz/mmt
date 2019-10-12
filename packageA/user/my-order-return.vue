<template>
	<view style="height: 100%;">
		<view class="order-back-list container">
			<view class="list-item" v-for="(order, index) in orders" :key="index">
				<view class="item-header">
					<view class="header-back">
						<span class="back-title">售后单号：</span>
						<span class="back-text">{{order.back_sn}}</span>
						<span :class="'back-status' + (order.show_order_status.type == 1 ? 'danger' : '') + ' ' + (order.show_order_status.type == 2 ? 'success' : '')">{{order.show_order_status.title}}</span>
					</view>
					<!-- <view class="header-back" wx:if="{{order.back_status != 1 && order.back_amount && order.back_amount != '0.00'}}">
        <span class="back-title">退款金额：</span>
        <span class="back-text"><i class='icon_rmb'>¥</i>{{order.back_amount || '0.00'}}
        </span>
        <span class="back-yunfei" wx:if="{{order.showback_fee}}">含运费
          <i wx:if="{{order.showback_fee == 2}}">
            <i>-</i><i class='icon_rmb'>¥</i>{{order.back_fee}}
          </i>
        </span>
        <span class="back-yunfei" wx:if="!{{order.showback_fee}}">不含运费</span>
      </view> -->
					<!--<view class='date_wrap' style='position: relative;padding: 0;padding-top:24rpx;'>-->
					<!--<view class='tab'>申请时间</view>-->
					<!--<view class='des'>{{order.add_time}}</view>-->
					<!--</view>-->
				</view>
				<view class="order-back-goods">
					<view class="goods-item" @tap="go_order_return_detail" :data-back_sn="order.back_id">
						<view class="item-photo">
							<image :src="order.products[0].header_img"></image>
						</view>
						<view class="item-info">
							<view class="info-name">{{order.products[0].goods_name}}</view>
							<view class="info-attr">{{order.products[0].sku_key_name}}</view>
							<view class="info-amount">x{{order.products[0].amount}}</view>
							<view class="info-price"><i class="icon_rmb">¥</i>{{order.products[0].shop_price || '0.00'}}</view>
							<view class="info-wrap">申请时间:{{order.add_time}}</view>
							<!-- <view class="info-button" catchtap="go_aftermarketSchedule" data-back_sn='{{order.back_id}}' wx:if="{{order.is_history_show == 1}}">查看进度</view> -->
						</view>
					</view>
					<view class="goods-bar" v-if="order.is_button_show==1">
						<view class="qx" @tap="cancel_back" :data-back_sn="order.back_id">取消售后</view>
						<view class="ck" @tap="go_order_return_detail" :data-back_sn="order.back_id">查看详情</view>
					</view>
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
	// pages/user/my-order-return.js
	var app = getApp().globalData;
	var common = require("../../utils/common.js");

	export default {
		data() {
			return {
				iconURL: app.dataBase.iconURL,
				page_size: 5,
				page: 1,
				isEmpty: false,
				orders: ""
			};
		},

		components: {},
		props: {},
		onLoad: function(options) {
			console.log('页面显示',options)
		},
		onShow: function() {
			this.page = 1;
			this.page_size = 5;
			this.orders = '';
			this.loadOrderList();
		},
		onReachBottom: function() {
			var that = this;

			if (that.orders && that.orders.length % that.page_size == 0) {
				that.page = that.orders.length / that.page_size + 1;
				that.loadOrderList();
			}
		},
		onPullDownRefresh: function() {
			var that = this;
			that.orders = '';
			that.page = 1;
			that.page_size = 5;
			that.loadOrderList();
		},
		methods: {
			loadOrderList: function() {
				var that = this;
				common.showLoad(this);
				var url = app.getPath.getbackorderlist;
				var data = {
					page: that.page,
					page_size: that.page_size
				};
				common.ApiGateWayTest(url, data, true, function(res) {
					if (res.data.success == 1) {
						var orders = res.data.result.data;
						that.orders = that.orders ? that.orders.concat(orders) : orders;
						that.setData({
							orders: that.orders
						});
						common.hideLoad(that);
						wx.stopPullDownRefresh();
					}
				});
			},
			cancel_back: function(e) {
				var that = this;
				var url = app.getPath.backcancel;
				var data = {
					back_id: e.currentTarget.dataset.back_sn
				};
				common.ApiGateWayTest(url, data, true, function(res) {
					var res = res.data;

					if (res.success == 1) {
						if (res.result.state == 0) {
							common.toast(res.result.state_desc);
							that.orders = '';
							that.page = 1;
							that.page_size = 5;
							that.loadOrderList();
						}
					}
				});
			},
			go_order_return_detail: function(e) {
				var id = e.currentTarget.dataset.back_sn;
				wx.navigateTo({
					url: '../user/order-return-detail?entryType=external&id=' + id
				});
			},
			go_aftermarketSchedule: function(e) {
				var id = e.currentTarget.dataset.back_sn;
				wx.redirectTo({
					url: '../user/aftermarket-schedule?id=' + id
				});
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
	@import "./my-order-return.css";
</style>
