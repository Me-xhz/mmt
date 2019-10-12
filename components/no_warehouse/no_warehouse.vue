<template>
	<!--components/no_warehouse/no_warehouse.wxml-->
	<view class="no_warehouse">
		<view class="navbar-box" :style="'height: ' + navBarHeight + 'px'">
			<view :style="'height: ' + navBarHeight + 'px'"></view>
			<view class="navbar-menu" :style="'height: ' + navBarHeight + 'px'">
				<navigator hover-class="none" url="/pages/pickup2/pickup2">
					<view class="warehouse">
						<view class="wrap">
							<view class="iconfont icon-btn_dizhix"></view>
							<text>{{city.cityName?city.cityName:'请选择提货点'}}</text>
							<view class="iconfont icon-btn_sanjiaoxiaojiantoux"></view>
						</view>
					</view>
					<view class="city-guide-box">
						<image class="city-guide-gif" :src="iconURL + '/img_city_select_gif.gif'"></image>
						<view class="city-guide-msg">
							<image class="city-guide-msg-bg" :src="iconURL + '/img_city_select_bg01.png'"></image>
							<text class="city-guide-msg-text">戳一戳,选择提货点</text>
						</view>
					</view>
				</navigator>
			</view>
		</view>

		<view class="no_data" v-if="!isAuthorization">
			<image :src="iconURL + '/dwsb02.png'" style="width:280rpx;height:200rpx;"></image>
			<view class="text">定位失败，请选择城市或者开启定位授权</view>
			<button class="set_btn" @tap="openSet">开通定位</button>
		</view>
		<view class="no_data" v-else>
			<image :src="iconURL + '/dwsb02.png'" style="width:280rpx;height:200rpx;"></image>
			<navigator class="wrap" hover-class="none" url="../pickup/pickup">
				<view class="text" v-if="!check_city">当前城市暂未开通服务，请
					<text class="color_theme">更换城市</text>
				</view>
				<view class="text" v-else>当前城市已开通服务，请
					<text class="color_theme">选择所在工厂</text>
				</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	// components/no_warehouse/no_warehouse.js
	// var app = getApp().globalData;
	var common = require("../../utils/common.js");

	export default {
		data() {
			return {
				iconURL: getApp().globalData.dataBase.iconURL,
				navBarHeight: getApp().globalData.navBarHeight,
				check_city: false,
				observers: {
					'city': function(newVal, oldVal) {
						if (newVal != oldVal) {
							let cityMsg = common.getStorageSync("city");
							let citys = common.getStorageSync("getpickup");

							if (cityMsg.is_pick_up && cityMsg.is_pick_up === 1 || citys.is_pick_up && citys.is_pick_up === 1) {
								this.setData({
									check_city: true
								});
							}
						}
					}
				}
			};
		},

		components: {},
		props: {
			city: {
				type: Object,
				value: {}
			},
			isAuthorization: {
				type: Boolean,
				value: false
			}
		},
		methods: {
			openSet: function() {
				var that = this;
				wx.openSetting({
					success: function(res) {
						common.getSetting(); // that.setData({
						//   isAuthorization: res.authSetting["scope.userLocation"]
						// })

						that.$emit('openevent', {
							isAuthorization: res.authSetting["scope.userLocation"]
						});
					},
					fail: function(res) {}
				}); // var content = '拒绝授权将无法体验完整功能，建议打开地理位置授权';
				// var confirmText = '去设置';
				// common.showModal(content, confirmText, function (res) {
				//   if (res.confirm) {
				//   }
				// })
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
	@import "./no_warehouse.css";
</style>
