<template>
	<view >
		<!--components/notice/notice.wxml-->
		<view :class="'notice ' + (showNotice ? 'show' : '')" :style="'top:' + (type == 1 ? navBarHeight : '0') + 'px'">
		<!-- <view class='notice notice2'> -->
			<view class="notice-box">
				<image class="user-logo" :src="notice.head_pic" mode="widthFix" @tap="getEnvelopes"></image>
				<view class="right-box">
					<view class="text" @tap="getEnvelopes">
						<view class="name">{{notice.nickname}}</view>
						<i v-if="notice.status == 1">来了,快催他下单帮你提现吧！</i>
						<i v-if="notice.status == 2">在你的邀请下抢到了好货</i>
					</view>
					<form report-submit="true" @submit="urgingReport" :data-shareInfo="shareInfo" v-if="notice.status == 1">
						<button open-type="share" form-type="submit" :data-shareInfo="shareInfo" class="btn">催他下单</button>
					</form>
					<view v-if="notice.status == 2" class="btn" @tap="getRedEnvel">领取红包</view>
				</view>

			</view>
		</view>

		<envelopes :show="showRedEnvel" :rid="notice.red_packet_id"></envelopes>
	</view>
</template>

<script>
	// components/notice/notice.js
	// var app = getApp().globalData;
	var common = require("../../utils/common.js");

	export default {
		data() {
			return {
				observers: {
					'unload': function(unload) {
						if (unload) {
							clearInterval(this.data.noticeInterval);
							clearInterval(this.data.timeInterval);
						}
					}
				},
				navBarHeight: getApp().globalData.navBarHeight,
				shareInfo: {
					fromButton: 'notice'
				},
				pageLifetimes: {
					show: function() {
						this.getPresentNewMsg();
					},
					hide: function() {
						clearInterval(this.data.noticeInterval);
						clearInterval(this.data.timeInterval);

						if (this.data.showNotice && this.time != 0) {
							common.setStorageSync('noticeConutTime', this.time);
						}
					}
				},
				showNotice: false,
				notice: "",
				showRedEnvel: false
			};
		},

		components: {},
		props: {
			type: {
				value: 1,
				//1.自定义顶部2.原生顶部end无顶部
				type: String
			},
			unload: {
				value: false,
				type: Boolean
			}
		},
		methods: {
			getPresentNewMsg() {
				var that = this;
				var url = getApp().globalData.getPath.surePresentNewMsg;
				clearInterval(this.noticeInterval);
				clearInterval(this.timeInterval);
				var getNoticeMsg = common.getStorageSync('noticeMsg');
				var getNoticeConutTime = common.getStorageSync('noticeConutTime'); // 已存在未到时间的提示信息，显示缓存内容

				if (getNoticeMsg && getNoticeMsg != '') {
					var getCountTime = Number(getNoticeConutTime) > 3000 || getNoticeConutTime == 0 ? Number(getNoticeConutTime) :
						3000;
					that.setData({
						showNotice: true,
						notice: getNoticeMsg
					});
					setTimeout(() => {
						common.setStorageSync('noticeMsg', '');
						that.setData({
							showNotice: false
						});
						that.getPresentNewMsg();
					}, getCountTime);
				} else {
					that.noticeInterval = setInterval(() => {
						common.ApiGateWayTest(url, '', true, function(res) {
							var resData = res.data;

							if (resData.result.is_show == 1) {
								if (resData.result.list.length > 0) {
									common.setStorageSync('noticeMsg', resData.result.list[0]);
									that.setData({
										showNotice: true,
										notice: resData.result.list[0]
									}); // 判断是否播放完

									that.time = 8000;
									that.timeInterval = setInterval(() => {
										if (that.time <= 0) {
											clearInterval(that.timeInterval);
											that.time = 0;
										} else {
											that.time -= 1000;
										}
									}, 1000);
								}
							} else {
								clearInterval(that.noticeInterval);
								clearInterval(that.timeInterval);
								return;
							}
						});
						setTimeout(() => {
							common.setStorageSync('noticeMsg', '');
							that.setData({
								showNotice: false
							});
						}, 8000);
					}, 10000);
				}
			},

			getRedEnvel() {
				var that = this;
				that.setData({
					showRedEnvel: true
				});
			},

			urgingReport(e) {
				common.formIdUpdate(e);
				var pickupId = common.getStorageSync('getpickup');
				getApp().globalData.aldstat.sendEvent("notice_urging_report", {
					"提货点": pickupId.cityName
				});
			},

			getEnvelopes() {
				wx.navigateTo({
					url: '/packageB/invitation-share/invitation-share?type=2'
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
	@import "./notice.css";

	.notice {
		position: fixed !important;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 9998;
		padding: 0 16rpx;
		box-sizing: border-box;
		transform: translateY(-230rpx);
	}
</style>
