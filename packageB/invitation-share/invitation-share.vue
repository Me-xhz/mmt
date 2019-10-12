<template>
	<view>
		<!-- $1 -->
		<!--packageB/invitation-share/invitation-share.wxml-->
		<view class="invitation-share" :style="'background-image:url(' + iconURL + '/invitation-red-packet-bg.png)'">
			<view class="header-swiper" v-if="swiperNotice.length > 0">
				<swiper class="header-swiper-list" @change="swiperBindchange" vertical="true" autoplay="true" interval="3000"
				 circular="true" :current="swiperCurrent">
					<swiper-item class="swiper-item" v-for="(item, index) in swiperNotice" :key="index">
						<view class="row swiper-block">
							<image class="img" :src="item.head_pic" width="widthFix"></image>
							<view class="row text">
								<view class="name">{{item.nickname}}</view>
								<i v-if="item.red_packet_type == 2">成功邀请好友下单，提现</i>
								<i v-if="item.red_packet_type == 1">下单成功，从手气红包获得了</i>
							</view>
							<view class="price">{{item.red_packet_in_cash}}元</view>
						</view>
					</swiper-item>
					<view class="swiper-nohover"></view>
				</swiper>
			</view>
			<view class="red-log" @tap="getCslist">红包记录</view>
			<view class="red-activity" @tap="showActivityModel">活动规则</view>
			<view class="header-title">
				<view class="title">邀请同事成功下单</view>
				<view class="title">可立即打开红包</view>
			</view>
			<view class="header-img-box">
				<image class="header-img" :src="iconURL + '/invitation-red-packet.png'" mode="widthFix"></image>
				<!-- <button class="header-img-btn" :style="{backgroundImage:url(iconURL+'/invitation-red-packet-btn.png')}"></button> -->
				<button class="header-img-btn" :style="'background-image:url(' + iconURL + '/invitation-red-packet-btn.png)'"></button>

				<view class="img-number">
					<text>8</text>
					<text class="img-number-i">元</text>
				</view>
				<view class="img-number-msg">(最少3元)</view>
				<image class="prompt-img" :src="iconURL + '/invitation-guide-prompt.gif'" mode="widthFix"></image>
				<form report-submit="true" @submit="showShareGuide" v-if="guideIsShowBtn && invite_list.length <= 0">
					<button class="header-img-btn-model" form-type="submit"></button>
				</form>
				<button class="header-img-btn-model" open-type="share" @tap="invitationShare" :data-shareInfo="shareInfoInvite"
				 v-if="!guideIsShowBtn && invite_list.length <= 0"></button>
				<form report-submit="true" @submit="getEnvelopes" :data-rid="invite_list[0].red_packet_id" v-if="invite_list.length > 0">
					<button class="header-img-btn-model" form-type="submit"></button>
				</form>
			</view>
			<!-- 锚点跳转 -->
			<view id="invitation"></view>

			<view class="invitation-record" v-if="invite_list.length > 0 || (invite_list.length == 0 && invite_list_urge.length == 0)">
				<view class="invitation-record-box">
					<view class="title">邀请记录</view>
					<view class="record-card">
						<view class="row card-box" v-if="invite_list.length > 0" v-for="(item, index) in invite_list" :key="index">
							<image class="user-logo" :src="item.head_pic" mode="widthFix"></image>
							<view>
								<view class="msg">
									<view class="span">{{item.nickname}}</view>
									<i>在你的邀请下抢到了好货</i>
								</view>
								<view class="log">
									<i class="open">你获得了一个可立即提现的红包</i>
								</view>
							</view>
							<view class="btn open" @tap="getEnvelopes" :data-rid="item.red_packet_id">开红包</view>
						</view>
						<view class="default" v-if="invite_list.length <= 0">
							<image :src="iconURL + '/invitation-red-packet-default.png'" mode="widthFix"></image>
							<view class="text">暂无邀请记录，邀请好友可得红包</view>
						</view>
					</view>
				</view>
			</view>
			<view class="invitation-record" v-if="invite_list_urge.length > 0">
				<view class="invitation-record-box">
					<view class="title">以下好友点击了你的链接，下单成功你将获得红包</view>
					<view class="record-card">
						<view class="row card-box urge" v-for="(item, index) in invite_list_urge" :key="index">
							<image class="user-logo" :src="item.head_pic" mode="widthFix"></image>
							<view>
								<view class="msg">
									<view class="span">{{item.nickname}}</view>
									<i v-if="item.status == 1">来到了买买提</i>
									<i v-if="item.status == 3">被其他人催促下单成功了</i>
								</view>
								<view class="log">
									<i class="urge" v-if="item.status == 1">好友下单成功你可以获得现金红包</i>
									<i v-if="item.status == 3">你慢了一步,下次记得抓紧催他下单啊</i>
								</view>
							</view>
							<form report-submit="true" @submit="urgingReport" :data-shareInfo="shareInfoUrge" v-if="item.status == 1">
								<button class="btn urge" form-type="submit" open-type="share" :data-shareInfo="shareInfoUrge">催他下单</button>
							</form>
							<view class="btn edit" v-if="item.status == 3" @tap="getCsClickKnow" :data-id="item.id">知道了</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 红包记录 -->
		<view class="curtain" v-if="redLogShow || redActivityShow || popupShow" catchtouchmove="bindtouchmove"></view>
		<view class="red-log-model invitation-record" catchtouchmove="bindtouchmove" v-if="redLogShow">
			<view class="title">红包记录</view>
			<scroll-view scroll-y="true" class="record-card scroll">
				<view class="row card-box" v-for="(item, index) in redLogList" :key="index" v-if="redLogList.length > 0">
					<image class="user-logo" :src="item.head_pic" mode="widthFix"></image>
					<view>
						<view class="msg">
							<view class="span">{{item.nickname}}</view>
							<i>在你的邀请下抢到了好货</i>
						</view>
						<view class="log">
							<i class="open">你打开了一个现金红包</i>
						</view>
					</view>
					<view class="text-btn"><i>获得</i> {{item.red_packet_in_cash}}<i>元</i></view>
				</view>
				<view class="default" v-if="redLogList.length <= 0">
					<image :src="iconURL + '/invitation-red-packet-default.png'" mode="widthFix"></image>
					<view class="text">暂无邀请记录，邀请好友可得红包</view>
				</view>
			</scroll-view>
			<view class="iconfont icon-btn_qiapianguanbianniux" @tap="hideRedLog"></view>
		</view>
		<!-- 活动规则 -->
		<view class="red-activity-model" v-if="redActivityShow" catchtouchmove="bindtouchmove">
			<image :src="rule_img" mode="widthFix"></image>
			<view class="iconfont icon-btn_qiapianguanbianniux" @tap="hideRedActivity"></view>
		</view>
		<!-- 引导弹窗 -->
		<view class="popup-model" v-if="popupShow" catchtouchmove="bindtouchmove">
			<image :src="iconURL + '/invitation-red-popou.png'" mode="widthFix"></image>
			<view class="row popup-footer-btn">
				<view class="btn left" @tap="hidePopup">继续邀请</view>
				<view class="btn right" @tap="goHome">返回主页</view>
			</view>
		</view>
		<!-- <invitationGuide :isShow="guideIsShow" ></invitationGuide> -->
		<!-- 点击开按钮显示这个 -->
		<!-- <invitationGuide v-if="guideIsShow" ></invitationGuide> -->
		<view>
			<!--components/invitationGuide/invitationGuide.wxml-->
			<view class="invitation-curtain" v-if="guideIsShow"></view>
			<view class="invitation-guide" v-if="guideIsShow">
				<!-- <view class="invitation-curtain"></view>
			<view class="invitation-guide"> -->
				<view class="guide-box">
					<image class="invitation-img" src="https://img.shop.haoyousheng.com.cn/wechat_icons/invitation-guide1.png" mode="widthFix"></image>
					<view class="iconfont icon-btn_qiapianguanbianniux" @tap="hide"></view>
					<form report-submit="true" @submit="goShare" :data-shareInfo="shareInfo">
						<button class="invitation-share"  open-type="share" form-type="submit" :data-shareInfo="shareInfo">去邀请</button>
					</form>
					<view class="no-prompt" @tap="setPrompt">
						<view class="iconfont icon-btn_weixuanzhongx" v-if="!promptStatus"></view>
						<view class="iconfont icon-btn_xuanzhongx" v-if="promptStatus"></view>
						<view class="text">不再提示</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 红包-可领取红包 -->
		<envelopes :show="showRedEnvel" :rid="red_packet_id"></envelopes>
	</view>
</template>

<script>
	// packageB/invitation-share/invitation-share.js
	var app = getApp().globalData;
	const common = require("../../utils/common.js");

	export default {
		data() {
			return {
				iconURL: app.dataBase.iconURL,
				headerTitle: '邀请好友成功下单可再开启现金红包',
				maxRedEnvelopes: '3',
				invitationRecord: {},
				swiperNotice: [],
				swiperCurrent: 0,
				csInviteList: {},
				red_packet_id: 0,
				showRedEnvel: false,
				sclType: 1,
				shareInfoInvite: {
					fromButton: 'envelopes'
				},
				shareInfoUrge: {
					fromButton: 'notice'
				},
				guideIsShow: false,
				guideIsShowBtn: true,
				invite_list: [],
				invite_list_urge: [],
				swiperNoticeTime: '',
				swiperNoticeTimeout: '',
				redLogShow: false,
				redActivityShow: false,
				popupShow: false,
				redLogList: [],
				rule_img: '',
				promptStatus: false,
				shareInfo: {
					fromButton: 'envelopes'
				},
				
			};
		},

		components: {},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			this.sclType = options.type;
			var entry_share_info = common.getStorageSync('entry_share_info');
			this.setData({
				rule_img: entry_share_info.rule_img
			});
			wx.showShareMenu({
				withShareTicket: true
			});
			this.getCsTopNotice();
		},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			this.getCsInviteList();
		},
		onHide: function() {
			var promptStatus = common.getStorageSync('promptStatus');

			if (promptStatus) {
				this.setData({
					guideIsShowBtn: false
				});
			}
		},
		onUnload: function() {
			clearTimeout(this.swiperNoticeTime);
			clearTimeout(this.swiperNoticeTimeout);
		},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function(res) {
			var that = this;
			var pickup = common.getStorageSync('getpickup');
			var entry_share_info = common.getStorageSync('entry_share_info');

			if (res.target && res.target.dataset.shareinfo) {
				let shareInfo = res.target.dataset.shareinfo;

				if (shareInfo && shareInfo.fromButton == 'envelopes') {
					setTimeout(() => {
						that.setData({
							popupShow: true
						});
					}, 2000);
				} else {
					setTimeout(() => {
						that.setData({
							popupShow: true
						});
					}, 1000);
				}

				if (shareInfo && shareInfo.fromButton == 'notice') {
					return {
						title: entry_share_info.urge_share_text,
						path: '/pages/index/index?pickup_id=' + pickup.pickup_id + '&user_id=' + entry_share_info.user_id,
						imageUrl: entry_share_info.urge_share_img
					};
				} else if (shareInfo && shareInfo.fromButton == 'envelopes') {
					return {
						title: entry_share_info.invite_share_text,
						path: '/pages/index/index?pickup_id=' + pickup.pickup_id + '&user_id=' + entry_share_info.user_id,
						imageUrl: entry_share_info.invite_share_img
					};
				} else {
					return {
						title: entry_share_info.invite_share_text,
						path: '/pages/index/index?pickup_id=' + pickup.pickup_id + '&user_id=' + entry_share_info.user_id,
						imageUrl: entry_share_info.invite_share_img
					};
				}
			} else {
				return {
					title: entry_share_info.invite_share_text,
					path: '/pages/index/index?pickup_id=' + pickup.pickup_id + '&user_id=' + entry_share_info.user_id,
					imageUrl: entry_share_info.invite_share_img
				};
			}
		},
		methods: {
			getCsTopNotice() {
				var that = this;
				var url = app.getPath.csTopNotice;
				this.setData({
					swiperNotice: []
				});
				that.swiperNoticeTime = setTimeout(() => {
					common.ApiCoordination(url, '', true, function(res) {
						var resData = res.data;

						if (resData.result) {
							if (resData.result.length == 1) {
								that.swiperNoticeTimeout = setTimeout(() => {
									that.getCsTopNotice();
								}, 3000);
							}

							that.setData({
								swiperNotice: resData.result,
								swiperCurrent: 0
							});
						}
					});
				}, 3000);
			},

			swiperBindchange(e) {
				var index = e.detail.current;

				if (index + 1 == this.swiperNotice.length) {
					setTimeout(() => {
						this.getCsTopNotice();
					}, 3000);
				}
			},

			// 获取邀请信息
			getCsInviteList() {
				var that = this;
				var url = app.getPath.csInviteList;
				common.ApiCoordination(url, '', true, function(res) {
					var resData = res.data;

					if (resData.success == 1) {
						var invite_list = resData.result.invite_list.filter(item => {
							return item.status == 2;
						});
						var invite_list_urge = resData.result.invite_list.filter(item => {
							return item.status != 2;
						});
						that.setData({
							csInviteList: resData.result,
							invite_list: invite_list,
							invite_list_urge: invite_list_urge,
							rule_img: resData.result.rule_img
						});

						if (that.sclType == 2) {
							wx.pageScrollTo({
								selector: '#invitation'
							});
						}
					}
				});
			},

			// 开红包
			getEnvelopes(e) {
				var rid = e.currentTarget.dataset.rid;
				this.setData({
					red_packet_id: rid,
					showRedEnvel: true
				});
			},

			// 点击-知道了按钮
			getCsClickKnow(e) {
				var that = this;
				var id = e.currentTarget.dataset.id;
				var url = app.getPath.csClickKnow;
				var data = {
					id: id
				};
				common.ApiCoordination(url, data, true, function(res) {
					var resData = res.data;

					if (resData.result.success) {
						that.invite_list_urge = that.invite_list_urge.filter(item => {
							return item.id != id;
						});
						that.setData({
							invite_list_urge: that.invite_list_urge
						});
					} else {
						common.toast(resData.msg);
						return;
					}
				});
			},

			// 点击开按钮提示
			showShareGuide(e) {
				console.log('点击开按钮提示')
				console.log(this.guideIsShow)
				common.formIdUpdate(e);
				this.setData({
					guideIsShow: true
				});
				console.log(this.guideIsShow)
			},


			// 邀请上报
			invitationShare() {
				var pickupId = common.getStorageSync('getpickup');
				// app.aldstat.sendEvent("invitation_share_report", {
				//   "提货点": pickupId.cityName
				// });
			},

			// 催促上报
			urgingReport(e) {
				common.formIdUpdate(e);
				var pickupId = common.getStorageSync('getpickup');
				app.aldstat.sendEvent("invitation_urging_report", {
					"提货点": pickupId.cityName
				});
			},

			// 红包记录
			getCslist() {
				var that = this;
				var url = app.getPath.cslist;
				common.ApiCoordination(url, '', true, function(res) {
					var resData = res.data;

					if (resData.success == 1) {
						that.setData({
							redLogList: resData.result,
							redLogShow: true
						});
					} else {
						common.toast(resData.msg);
						return;
					}
				});
			},

			// 隐藏红包记录
			hideRedLog() {
				this.setData({
					
					redLogShow: false
				});
			},

			// 隐藏活动规则
			hideRedActivity() {
				this.setData({
					redActivityShow: false
				});
			},

			// 显示活动规则
			showActivityModel() {
				this.setData({
					redActivityShow: true
				});
			},

			// 隐藏引导弹窗
			hidePopup() {
				console.log(this.guideIsShow);
				this.setData({
					popupShow: false,
					// guideIsShow:false
				});
				console.log(this.guideIsShow);
			},

			// 返回首页
			goHome() {
				wx.switchTab({
					url: '/pages/index/index'
				});
			},

			// 滚动溢出
			bindtouchmove() {
				return false;
			},
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
						guideIsShow: false
					});
				}, 1000);
			},
			
			hide() {
				this.setData({
					guideIsShow: false
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
	@import "./invitation-share.css";
	
</style>
