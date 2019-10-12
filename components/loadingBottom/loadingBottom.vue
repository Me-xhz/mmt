<template>
	<view class="loading-box">
		<view class="box-one"></view>
		<view class="box-two"></view>
		<view class="box-three"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {};
		},

		components: {},
		props: {},
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
	@import "./loadingBottom.css";
</style>
