<template>
	<!--components/countDown/countDown.wxml-->
	<view class="countDown_wrap">
		<view class="d item time-text" v-if="d != '00' && type != 2">{{d}}</view>
		<view class="doc doc-text" v-if="d != '00' && type != 2">天</view>

		<view class="h item time-text">{{h}}</view><!-- 时 -->

		<view class="doc doc-text">{{type == 1 ? '时' : ':'}}</view>

		<view class="m item time-text">{{m}}</view><!-- 分 -->

		<view class="doc doc-text">{{type == 1 ? '分' : ':'}}</view>

		<view class="s item time-text">{{s}}</view><!-- 秒 -->

		<view class="doc doc-text" v-if="type == 1">秒</view>
		<view class="doc doc-text" v-if="isShowMs">:</view>

		<view class="s item time-text" v-if="isShowMs">{{ms}}</view><!-- 毫秒 -->

	</view>
</template>

<script>
	export default {
		data() {
			return {
				d: '00',
				h: '00',
				m: '00',
				s: '00',
				ms: '0'
			};
		},

		components: {},
		props: {
			timestamp: {
				type: Number,
				value: 0,
			},
			type: {
				type: Number,
				value: 1
			},
			isShowMs: {
				type: Boolean,
				value: false
			}
		},
		created: function() {
			setTimeout(() => {
				this.observer(this.$props.timestamp)
				this.attached()
			}, 500)
		},
		methods: {
			attached() {
				if (this.isShowMs) {
					this.countTimeMs();
				}
			},

			countTime: function(now, end) {
				if (this.type == 1) {
					var leftTime = end - now;
					var d, h, m, s;

					if (leftTime >= 0) {
						d = Math.floor(leftTime / 1000 / 60 / 60 / 24, 10);
						h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
						m = Math.floor(leftTime / 1000 / 60 % 60);
						s = Math.floor(leftTime / 1000 % 60);
					} else {

						clearInterval(this.$data);
						this.$emit('countTimeOver');
						return false;
					}

					d = d > 9 ? d : '0' + d;
					h = h > 9 ? h : '0' + h;
					m = m > 9 ? m : '0' + m;
					s = s > 9 ? s : '0' + s;
					this.setData({
						d,
						h,
						m,
						s
					});
				} else {
					var leftTime = end - now;
					var d, h, m, s;

					if (leftTime >= 0) {
						h = Math.floor(leftTime / 1000 / 60 / 60);
						m = Math.floor(leftTime / 1000 / 60 % 60);
						s = Math.floor(leftTime / 1000 % 60);
					} else {
						clearInterval(this.$data);
						this.$emit('countTimeOver');
						return false;
					}

					d = d > 9 ? d : '0' + d;
					h = h > 9 ? h : '0' + h;
					m = m > 9 ? m : '0' + m;
					s = s > 9 ? s : '0' + s;
					this.setData({
						h,
						m,
						s
					});
				}
			},

			// 毫秒倒计时
			countTimeMs() {
				var ms = 9;
				this.dataMs = setInterval(() => {
					if (ms > 1) {
						ms--;
					} else {
						ms = 9;
					}

					this.setData({
						ms: ms
					});
				}, 100);
			},
			//这里处理父组件传过来的数据进行处理
			observer: function(timestamp) {
				var that = this;
				clearInterval(this.$data);
				Object.assign(this.$data,setInterval(function() {
					var now = new Date().getTime();
					that.countTime(now, timestamp);
				}, 1000)); 
				// that.$data = setInterval(function() {
				// 	var now = new Date().getTime();
				// 	that.countTime(now, timestamp);
				// }, 1000);
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
		},

	};
</script>
<style>
	@import "./countDown.css";
</style>
