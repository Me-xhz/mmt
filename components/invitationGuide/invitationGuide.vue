<template>
	<view>
		<!--components/invitationGuide/invitationGuide.wxml-->
		<view class="invitation-curtain" v-if="isShow"></view>
		<view class="invitation-guide" v-if="isShow">
			<!-- <view class="invitation-curtain"></view>
		<view class="invitation-guide"> -->
			<view class="guide-box">
				<image class="invitation-img" src="https://img.shop.haoyousheng.com.cn/wechat_icons/invitation-guide1.png" mode="widthFix"></image>
				<view class="iconfont icon-btn_qiapianguanbianniux" @tap="hide"></view>
				<form report-submit="true" @submit="goShare" :data-shareInfo="shareInfo">
					<button class="invitation-share" open-type="share" form-type="submit" :data-shareInfo="shareInfo">去邀请</button>
				</form>
				<view class="no-prompt" @tap="setPrompt">
					<view class="iconfont icon-btn_weixuanzhongx" v-if="!promptStatus"></view>
					<view class="iconfont icon-btn_xuanzhongx" v-if="promptStatus"></view>
					<view class="text">不再提示</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// components/invitationGuide/invitationGuide.js
	// var app = getApp().globalData;
	const common = require("../../utils/common.js");

	export default {
		data() {
			return {
				// iconURL: getApp().globalData.dataBase.iconURL,
				promptStatus: false,
				shareInfo: {
					fromButton: 'envelopes'
				},

			};
		},
		components: {},
		props:['isShow'],
		/* props: {
			isShow: {
				value: false,
				type: Boolean
			}
		}, */
		created: function() {
			uni.$on('update', function(data) {
				console.log('监听到事件来自 update ，携带参数 msg 为：' + data.msg);
			})
			uni.$on('shopList', (msg) => {
				console.log('msg', msg)
			})
			console.log(this);
		},
		mounted:function(){
			console.log(this);
		},
		updated:function(){
			console.log(this);
		},
		methods: {
			setPrompt() {
				var that = this;
				var pickupId = common.getStorageSync('getpickup');
				that.setData({
					promptStatus: !that.promptStatus
				});
				common.setStorageSync('promptStatus', that.promptStatus);
			},

			goShare(e) {
				common.formIdUpdate(e);
				var pickupId = common.getStorageSync('getpickup');
				setTimeout(() => {
					this.setData({
						isShow: false
					});
				}, 1000);
			},

			hide() {
				this.setData({
					isShow: false
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
	@import "./invitationGuide.css";
</style>
