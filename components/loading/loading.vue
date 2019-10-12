<template>
	<!--components/loding.wxml-->
	<view class="loading">
		<view class="loading-bg">
			<image class="image-loading" src="../../static/images/img/loading.gif" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	// components/loding.js
	// var app = getApp().globalData;

	export default {
		data() {
			return {
			};
		},

		components: {},
		props: {},
		methods: {
			
		}
	};
</script>
<style scoped>
	@import "./loading.css";
</style>
