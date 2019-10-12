<template>
	<view>
		<!--pages/projectPage/projectPage.wxml-->
		<!-- 返回首页悬浮框/分享进入显示 -->
		<view class="goHomeFixed" @click.stop="gotoHome" v-if="isShowGoHome">
			<image :src="iconURL + '/product-icon-leftReturn.svg'" class="icon-leftReturn"></image>
			<text>返回首页</text>
		</view>
		<!-- <view class="head_box" v-if="type==3" :style="{backgroundImage:url(iconURL+'/cstp.png)')}"> -->
		<view class="head_box" v-if="type==3" :style="'background-image:url(' + iconURL + '/cstp.png)'">
			<image class="head_pic" :src="head_info.prom_img"></image>
		</view>
		<view class="head_box" v-else :style="'background-image:url(' + iconURL + '/cstp.png)'">
			<image class="head_pic" :src="head_info.header_img"></image>
		</view>
		<view class="goodList white-bg-color">
			<goodList :lists="lists" :type="2" :align="left"></goodList>
			<!-- <view class='no_more' hidden='{{lists.length!=total}}'>没有更多了~</view> -->
		</view>
		<button class="to_share" open-type="share">
			<image :src="iconURL + '/button-icon-share01.png'"></image>
		</button>	
		<!-- 红包-顶部通知消息 -->
		<pagebottom v-if="lists.length>0&&checkShowBottom"></pagebottom>
		<loadingBottom v-if="checkBottomLoading"></loadingBottom>
		<view class="page-bottom-logo page-bottom-logo2" v-if="!checkBottomLoading">
			<image src='https://img.shop.haoyousheng.com.cn/wechat_icons/pageBottom-logo.png' mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	// pages/projectPage/projectPage.js
	var app = getApp().globalData;
	var common = require("../../utils/common.js");
	import goodList from "../../components/goodList/goodList";
	import loadingBottom from "../../components/loadingBottom/loadingBottom";

	export default {
		data() {
			return {
				iconURL: app.dataBase.iconURL,
				page: 1,
				page_size: 10,
				total: 0,
				lists: [],
				isShowGoHome: false,
				checkShowBottom: false,
				checkBottomLoading: false,
				entryData: "",
				head_info: "",
				type: ''
			};
		},

		components: {
			goodList,
			loadingBottom
		},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			console.log(options);
			this.setData(options); // 从外部分享进入时，显示左上角回到首页  改动带external时为内部进入携带参数，外部进入不带参数

			if (options && options.entryType && options.entryType == 'external') {
				this.setData({
					isShowGoHome: false
				});
			} else {
				this.setData({
					isShowGoHome: true
				});
			}

			var that = this; // 外部带商品店铺

			this.setData({
				entryData: options
			});
			var options = that.entryData;
			var pickupId = common.getStorageSync('getpickup'); // 判断是否第一次进入 且是从外部进入，如二维码扫码 && app.firstlaunchApp

			if (options && (options.atitude || options.pickup_id) && !pickupId) {
				that.getExternal(options.pickup_id).then(function() {
					// 关闭开关，让app知道已经不是第一次进入当前页
					app.firstlaunchApp = false; // 清空data内携带参数

					that.entryData = {}; // 外部已带经纬度定位，无需再调用定位接口，所以将缓存定位改为真，让页面可以显示

					common.setStorageSync('authSetting', {
						'scope.userLocation': true
					});

					if (that.type == 5) {
						that.getAcInfo();
						that.getAcgoods();
					} else {
						that.getSubjectInfo();
						that.getSubjectgoods();
					}
				});
			} else {
				if (that.type == 5) {
					that.getAcInfo();
					that.getAcgoods();
				} else {
					that.getSubjectInfo();
					that.getSubjectgoods();
				}
			}
		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */

		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {
			var that = this;

			if (that.lists && that.total > that.lists.length) {
				that.setData({
					page: that.page + 1,
					checkBottomLoading: true
				});
				that.getSubjectgoods();
			}
		},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {},

		/**
		 * 生命周期函数--监听页面隐藏
		 */
		onHide: function() {},

		/**
		 * 生命周期函数--监听页面卸载
		 */
		onUnload: function() {},

		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {
			var that = this;
			var pickup = common.getStorageSync('getpickup');
			return {
				title: that.head_info.share_title,
				path: '/pages/projectPage/projectPage?type=' + that.type + '&id=' + that.id + '&pickup_id=' + pickup.pickup_id,
				imageUrl: that.head_info.share_img,
				success: function(res) {
					common.toast('分享成功');
				},
				fail: function(res) {
					common.toast('分享失败');
				}
			};
		},
		methods: {
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
							console.log(res.data.result.cities.pick_up);
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
			// 活动
			getAcInfo: function() {
				var that = this;
				var uri = app.getPath.activitydetail;

				var data = {
					activity_id: that.id
				};
				common.ApiGateWayTest(uri, data, true, function(res) {
					var res = res.data;

					if (res.success == 1) {

						that.setData({
							head_info: res.result.data
						});

						wx.setNavigationBarTitle({
							title: res.result.data.name //页面标题为路由参数

						});
					}
				});
			},
			getAcgoods: function() {
				var that = this;
				var uri = app.getPath.activitygoodslist;
				var data = {
					activity_id: that.id,
					page: that.page,
					page_size: that.page_size
				};
				common.ApiGateWayTest(uri, data, true, function(res) {
					// console.log(res);
					if (res.data.success == 1) {
						var result = res.data.result;
						// console.log(result);
						that.setData({
							lists: [...that.lists, ...result.lists],
							total: result.total
						});

					}
				});
			},
			// 专题
			getSubjectInfo: function() {
				var that = this;
				var uri = app.getPath.subjectInfo;
				var data = {
					subject_id: that.id
				};
				common.ApiGateWayTest(uri, data, true, function(res) {

					var res = res.data;

					if (res.success == 1) {
						that.setData({
							head_info: res.result
						});
						// console.log(that.head_info);
						wx.setNavigationBarTitle({
							title: res.result.name //页面标题为路由参数

						});
					}
				});
			},
			getSubjectgoods: function() {
				var that = this;
				var uri = app.getPath.subjectgoods;
				var data = {
					subject_id: that.id,
					page: that.page,
					page_size: that.page_size
				};
				common.ApiGateWayTest(uri, data, true, function(res) {
					console.log("res", res);
					if (res.data.success == 1) {
						var result = res.data.result;
						console.log(result)
						if (result.lists.length < that.page_size) {
							that.setData({
								checkShowBottom: true
							});
						}
						
						that.setData({
							checkBottomLoading: false,
							lists: [...that.lists, ...result.lists],
							total: result.total
						});
						
						console.log(that.lists);
					}
				});
			},
			// 返回首页
			gotoHome: function() {
				wx.switchTab({
					url: '/pages/index/index'
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
	@import "./projectPage.css";
</style>
