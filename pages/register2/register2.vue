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
			<button class="login_btn" @click="tologin">
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
		onLoad: function(options) {
		},
		methods: {
			tologin() {
				var it = this;
				var getAppid = plus.runtime.appid;
				console.log('app端登陆')
				var weixinService = null;
				// http://www.html5plus.org/doc/zh_cn/oauth.html#plus.oauth.getServices
				plus.oauth.getServices(function(services) {
					if (services && services.length) {
						for (var i = 0, len = services.length; i < len; i++) {
							if (services[i].id === 'weixin') {
								weixinService = services[i];
								console.log('授权对象')
								console.log(weixinService)
								break;
							}
						}
						if (!weixinService) {
							console.log('没有微信登录授权服务');
							return;
						}
						// http://www.html5plus.org/doc/zh_cn/oauth.html#plus.oauth.AuthService.authorize
						weixinService.authorize(function(event) { //此处获取code的关键
							console.log(event)
							console.log(event.code, '这次是真的授权后返回的code')
							
							common.getUserSessionKey2(event.code)
							it.weixinCode = event.code; //用户换取 access_token 的 code
							// it.requestLogin();
							let data = {
								code: it.weixinCode
							};
							
				
						}, function(error) {
							console.error('authorize fail:' + JSON.stringify(error));
						}, {
							// http://www.html5plus.org/doc/zh_cn/oauth.html#plus.oauth.AuthOptions
							appid: getAppid, //开放平台的应用标识。暂时填个假的充数，仅做演示。
						});
					} else {
						console.log('无可用的登录授权服务');
					}
				}, function(error) {
					console.error('getServices fail:' + JSON.stringify(error));
				});
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
