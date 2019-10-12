<template>
	<!--components/pageBottomLogo.wxml-->
	<view class="">
		<view class="page-bottom-logo page-bottom-logo2">
			<image src='https://img.shop.haoyousheng.com.cn/wechat_icons/pageBottom-logo.png' mode="widthFix"></image>
		</view>
	</view>
	
</template>

<script>
	// components/pageBottomLogo.js

	export default {
		data() {
			return {
				// iconURL: 'https://img.shop.haoyousheng.com.cn/wechat_icons',
				// num:'666'
			};
		},
		methods: {
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
	/* 页面底部LOGO */
	.page-bottom-logo {
		width: 750rpx !important;
		padding: 48rpx 0 !important;
	}
	
	.page-bottom-logo image {
		width: 100%;
	}
	.page-bottom-logo2{
		width: 750rpx;
		padding: 48rpx 0;
	}
	
</style>
