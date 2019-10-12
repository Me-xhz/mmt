<template>
	<!--pages/register/register.wxml-->
	<view>
		<view class="view_block">
			<image :src="iconURL + '/img_dltt@2x01.png'" class="dltt"></image>
		</view>
		<!-- #ifdef APP-PLUS -->
		<view class="btns-box">
			<button class="login_btn out" @tap="routerOut">
				<text class="login_text">取消</text>
			</button>
			<button class="login_btn" @click="appLogin">
				<text class="login_text">微信授权登录</text>
			</button>

		</view>
		<!-- #endif -->

		<image :src="iconURL + '/dlwz@2x01.png'" class="dlwz"></image>

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
		onLoad: function(options) {},
		methods: {
			appLogin: function() {
				app.checkSessionKey = true;
				// console.log(666,app.checkSessionKey)
				common.getUserSessionKey2()
				
			},
			routerOut() {
				uni.navigateBack({
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
