<template>
	<view>
		<view class="curtain" v-if="show"></view>
		<view class="envelopes" v-if="show && showType == 1">
			<view class="img-box">
				<image class="img" :src="iconURL + '/index-red-packet.png'" mode="widthFix"></image>
				<view class="msg">
					<view class="t">获得一个下单红包</view>
				</view>
				<image @tap="goWithdraw" class="btn-withdraw" :src="iconURL + '/index-red-packet-btn.png'" mode="widthFix"></image>
			</view>
		</view>

		<view class="envelopes" v-if="show && showType == 2">
			<view class="img-box">
				<image class="img" :src="iconURL + '/index-red-packet.png'" mode="widthFix" @tap="goWithdraw"></image>
				<view class="msg">
					<view class="t">邀请好友成功下单</view>
					<view class="t">可再开一个红包</view>
				</view>
				<view class="price">
					<view class="price-number">
						<i class="p">8</i>
						<i class="t">元</i>
					</view>
					<view class="pirce-min">(最低3元)</view>
				</view>
				<form report-submit="true" v-if="guideIsShowBtn" @submit="showShareGuide" :data-shareInfo="shareInfo">
					<button form-type="submit" :data-shareInfo="shareInfo" class="btn-share" :style="'background-image:url(' + $1 + ')'"></button>
				</form>
				<form report-submit="true" @submit="hideShare" v-if="!guideIsShowBtn" :data-shareInfo="shareInfo">
					<button open-type="share" form-type="submit" :data-shareInfo="shareInfo" class="btn-share" :style="'background-image:url(' + $1 + ')'"></button>
				</form>
				<view class="log">邀请好友助力得惊喜大红包！</view>
			</view>
		</view>

		<invitationGuide :isShow="guideIsShow"></invitationGuide>
	</view>
</template>

<script>
	// components/envelopes/envelopes.js
	// var app = getApp().globalData;
	const common = require("../../utils/common.js");

	export default {
		data() {
			return {
				iconURL: getApp().globalData.dataBase.iconURL,
				shareInfo: {
					fromButton: 'envelopes'
				},
				guideIsShowBtn: true,
				guideIsShow: false,
				pageLifetimes: {
					show: function() {
						var promptStatus = common.getStorageSync('promptStatus');

						if (promptStatus) {
							this.setData({
								guideIsShowBtn: false
							});
						}
					}
				},
				show: false
			};
		},

		components: {},
		props: {
			rid: {
				value: 0,
				type: Number
			},
			show2: {
				value: false,
				type: Boolean
			},
			showType: {
				value: 1,
				type: String
			}
		},
		methods: {
			goWithdraw() {
				var that = this;
				var pickupId = common.getStorageSync('getpickup');
				getApp().globalData.aldstat.sendEvent("order_red_envelopes", {
					"提货点": pickupId.cityName
				});
				that.setData({
					show: false
				}, () => {
					wx.navigateTo({
						url: '/packageB/withdraw/withdraw?rid=' + that.rid
					});
				});
			},

			// 点击显示邀请提示
			showShareGuide(e) {
				common.formIdUpdate(e);
				this.setData({
					guideIsShow: true,
					show: false
				});
			},

			// 分享后隐藏
			hideShare(e) {
				common.formIdUpdate(e);
				var pickupId = common.getStorageSync('getpickup');
				getApp().globalData.aldstat.sendEvent("share_red_envelopes", {
					"提货点": pickupId.cityName
				});
				this.setData({
					show: false
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
	@import "./envelopes.css";
</style>
