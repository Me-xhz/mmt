<template>
	<view>
		<!-- 返回首页悬浮框/分享进入显示 -->
		<view class="goHomeFixed" @click.stop="gotoHome" v-if="isShowGoHome">
			<image :src="iconURL + '/product-icon-leftReturn.svg'" class="icon-leftReturn"></image>
			<text>返回首页</text>
		</view>
		<view id="coupon">
			<!-- 红包头部导航 -->
			<view class="coupon-top row">
				<text :class="'top-block flex ' + (currentTab == 0 ? 'top-active' : '')" data-current="0" @click.stop="swichNav">未使用</text>
				<text :class="'top-block flex ' + (currentTab == 1 ? 'top-active' : '')" data-current="1" @click.stop="swichNav">已使用</text>
				<text :class="'top-block flex ' + (currentTab == 2 ? 'top-active' : '')" data-current="2" @click.stop="swichNav">已失效</text>
				<view :class="'top-active-line ' + (currentTab == 0 ? 'top-active-line-0' : '')"></view>
				<view :class="'top-active-line ' + (currentTab == 1 ? 'top-active-line-1' : '')"></view>
				<view :class="'top-active-line ' + (currentTab == 2 ? 'top-active-line-2' : '')"></view>
			</view>

			<!-- 红包主体 -->
			<view class="coupon-content">
				<!-- 红包列表 -->
				<view class="list" v-if="vou && vou.length > 0">
					<view v-for="(bonus, index) in vou" :key="index">
						<!-- 未使用列表 -->
						<view class="box_list row" :style="'background-image:url(' + iconURL + '/coupon_orange01.png)'" v-if="currentTab == 0">
							<!-- 左侧面额 -->
							<view class="coupon_val  color-coupon" v-if="bonus.coupon_type==1">
								<text class="text">{{bonus.value}}</text>
								<text class="icon">折</text>
							</view>
							<view class="coupon_val  color-coupon" v-else>
								<text class="icon">¥</text>
								<text class="text">{{bonus.value}}</text>
							</view>
							<!-- 即将过期标识 -->
							<view class="coupon-tag" v-if="bonus.overdue">
								<text class="coupon-tag-font">{{bonus.overdue}}</text>
							</view>
							<!-- 优惠券信息 -->
							<view class="coupon_info color_gray_dark col-50">
								<view class="list_title">{{bonus.name}}</view>
								<view class="dom-attr">{{bonus.description}}</view>
								<view class="list_time">{{bonus.use_end_date}}</view>
							</view>
							<!-- 右侧领取部位 -->
							<form class="get_coupon_btn col-30" @submit="goShop" :data-shop_id="bonus.shop_id">
								<button class="getCoupon" form-type="submit">
									<span class="get_coupon">去使用</span>
								</button>
							</form>
						</view>

						<!--已使用、已失效-->
						<view class="box_list row" :style="'background-image:url(' + iconURL + '/coupon_gray01.png)'" v-else>
							<!-- 左侧面额 -->
							<view class="coupon_val" v-if="bonus.coupon_type==1">
								<text class="text">{{bonus.value}}</text>
								<text class="icon">折</text>
							</view>
							<view class="coupon_val" v-else>
								<text class="icon">¥</text>
								<text class="text">{{bonus.value}}</text>
							</view>
							<!-- 即将过期标识 -->
							<view class="coupon-tag" v-if="bonus.overdue">
								<text class="coupon-tag-font">{{bonus.overdue}}</text>
							</view>
							<!-- 优惠券信息 -->
							<view class="coupon_info color_gray_dark col-50">
								<view class="list_title">{{bonus.name}}</view>
								<view class="dom-attr">{{bonus.description}}</view>
								<view class="list_time">{{bonus.use_end_date}}</view>
							</view>
							<!-- 右侧领取部位 -->
							<span class="list_button_img" v-if="currentTab==1">
								<image mode="widthFix" :src="iconURL + '/img_conpon_use01.png'"></image>
							</span>
							<span class="list_button_img" v-if="currentTab==2">
								<image mode="widthFix" :src="iconURL + '/img_conpon_invalid01.png'"></image>
							</span>
						</view>
					</view>
				</view>

				<!-- 暂无红包 -->
				<view v-if="vou && vou.length <= 0">
					<view class="coupon-empty">
						<view class="coupon-empty-image">
							<image :src="iconURL + '/img_coupon_empty02.png'"></image>
						</view>
						<text class="coupon-empty-text">暂无红包</text>
					</view>
				</view>
				<view class="refreshEnd" v-if="!refresh">
					<text>没有更多啦~</text>
				</view>
			</view>
		</view>

		<loading v-if="loadingShow"></loading>
	</view>
</template>

<script>
	// pages/coupon/coupon.js
	var app = getApp().globalData;
	var common = require("../../utils/common.js");
	var code;

	export default {
		data() {
			return {
				iconURL: app.dataBase.iconURL,
				vou: [],
				couponlist: [],
				currentTab: 0,
				page: 1,
				page_size: 10,
				refresh: true,
				couponType: true,
				loading: true,
				ac_load_btn: true,
				isShowGoHome: false,
				now_time: new Date().getTime(),
				content: ""
			};
		},

		components: {},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			if (options && options.entryType && options.entryType == 'external') {
				this.setData({
					isShowGoHome: false
				});
			} else {
				this.setData({
					isShowGoHome: true
				});
			}
		},

		onShow() {
			var current = this.currentTab;
			this.setData({
				vou: [],
				refresh: true,
				page: 1
			});
			this.getCouponList(current);
		},

		//下拉刷新
		onPullDownRefresh: function() {
			var current = this.currentTap;
			this.setData({
				vou: [],
				refresh: true,
				page: 1
			});
			this.getCouponList(current);
		},
		//上拉加载
		onReachBottom: function() {
			var that = this;

			if (that.refresh) {
				that.setData({
					page: that.page + 1
				});
				var current = that.currentTab;
				that.getCouponList(current);
			}
		},
		methods: {
			//优惠券去使用
			goShop: function(e) {
				wx.navigateTo({
					url: '../takeout-shop/takeout-shop?entryType=external&shop_id=' + e.currentTarget.dataset.shop_id
				});
			},
			// 切换状态栏
			swichNav: function(e) {
				var that = this;

				if (!that.ac_load_btn) {
					return false;
				}

				var current = e.currentTarget.dataset.current;
				that.setData({
					currentTab: current,
					vou: [],
					refresh: true,
					page: 1
				});
				wx.pageScrollTo({
					scrollTop: 0,
					duration: 0
				});
				that.getCouponList(current);
			},
			// 返回首页
			gotoHome: function() {
				wx.switchTab({
					url: '/pages/index/index'
				});
			},
			// 获取优惠券列表
			getCouponList: function(current, page) {
				var that = this;
				common.showLoad(this); // 关闭开关

				that.ac_load_btn = false;
				var uri = app.getPath.shopCouponList;
				var data = {
					page: that.page,
					page_size: that.page_size,
					status: current
				};
				common.ApiGateWayTest(uri, data, true, function(res) {
					if (res && res.data && res.data.success == 1) {
						var vou = res.data.result.data;

						if (vou.length > 0) {
							for (var i in vou) {
								vou[i]['checked'] = 0;
							}

							that.setData({
								vou: that.vou.concat(vou),
								couponType: true
							}); //没有下一页数据

							if (vou.length < that.page_size) {
								that.setData({
									refresh: false
								});
							}
						} else {
							that.setData({
								couponType: false,
								refresh: false
							});
						}

						wx.stopPullDownRefresh();
					} else if (res && res.data && res.data.success == 0) {
						that.setData({
							couponType: false,
							content: res.data.msg
						});
					} // 打开开关


					that.ac_load_btn = true;
					common.hideLoad(that);
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
	@import "./takeout-coupon.css";
</style>
