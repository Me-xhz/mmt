<template>
	<!--pages/register/register.wxml-->
	<view>
		<view class="view_block">
			<image :src="iconURL + '/img_dltt@2x01.png'" class="dltt"></image>
		</view>
		<!-- 微信小程序登录界面 -->
		<!-- #ifdef MP-WEIXIN -->
		<view class="btns-box">
			<button class="login_btn out" @tap="routerOut">
				<text class="login_text">取消</text>
			</button>
			<button class="login_btn" open-type="getUserInfo" @getuserinfo="onGotUserInfo">
				<text class="login_text">登录</text>
			</button>
		</view>
		<!-- #endif -->
		<image :src="iconURL + '/dlwz@2x01.png'" class="dlwz"></image>
		<!-- <button class='btn' open-type='getUserInfo' bindgetuserinfo="onGotUserInfo">马上登录</button> -->

		<!-- <button class="" @click="appLogin">APP微信授权登录</button> -->

	</view>
</template>

<script>
	// pages/register/register.js
	var app = getApp().globalData;
	var common = require("../../utils/common.js");
	var event = require("../../utils/event.js");

	export default {
		data() {
			return {
				iconURL: app.dataBase.iconURL,
				rBtn: true
			};
		},

		components: {},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			this.setData(options);
		},
		methods: {
			onGotUserInfo: function(e) {
				var that = this;
				var userData = {
					encrypted_data: e.detail.encryptedData,
					iv: e.detail.iv,
					signature: e.detail.signature
				};
				common.getUserSessionKey().then(function() {
					var isOldUser = common.getStorageSync('isOldUser');

					if (e.detail.userInfo) {
						// 注册账户
						if (that.rBtn) {
							that.rBtn = false;

							if (isOldUser === 2) {
								// 老用户更新
								that.updateUserInfo(userData);
							} else if (isOldUser === 0) {
								// 非老用户，在token过期重新checklogin情况，直接返回上一页（checklogin时直接赋值）
								wx.navigateBack({
									delta: 1
								});
							} else {
								// 为防止网络过慢进入此页面，此处重新获取checkSessionKey
								// 如果为true，阻断，直接返回上一页
								if (app.checkSessionKey) {
									wx.navigateBack({
										delta: 1
									});
									return false;
								}

								common.register(function(data) {
									if (data.data.success == 1) {
										common.setStorageSync('token', data.data.result.token);
										app.checkSessionKey = true;
										event.emit('checkSessionKey', true); // 优惠券弹窗进入
										// if (that.data.isGetCoupon && that.data.isGetCoupon == 1) {
										//   event.emit('isGetCoupon', 1);
										// }

										wx.navigateBack({
											delta: 1
										});
									} else {
										common.toast(data.data.msg);
										that.rBtn = true;
									}
								}, userData);
							}

							var isOldUser = wx.removeStorageSync('isOldUser');
							var shareTicket_info = common.getStorageSync('shareTicket_info');

							if (shareTicket_info && shareTicket_info != '') {
								common.setStorageSync('reLoad', true);
							}

							app.checkSessionKey = true;
						}
					} else {
						common.toast('拒绝授权将无法体验完整功能，建议重新点击进行授权!');
					}
				});
			},
			// 老用户更新信息
			updateUserInfo: function(userData) {
				var that = this;
				var uri = app.getPath.getWXUserInfo;
				common.ApiGateWayTest(uri, userData, true, function(data) {
					if (data.data.success == 1) {
						app.checkSessionKey = true;
						event.emit('checkSessionKey', true);
						common.setStorageSync('isOldUser', 0); // 优惠券弹窗进入
						// if (that.data.isGetCoupon && that.data.isGetCoupon == 1) {
						//   event.emit('isGetCoupon', 1);
						// }

						wx.navigateBack({
							delta: 1
						});
					} else {
						common.toast(data.data.msg);
						that.rBtn = true;
					}
				});
			},

			routerOut() {
				wx.navigateBack({
					delta: 1
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
	@import "./register.css";
</style>
