<template>
	<view>
		<view class="goods-box" v-if="bargainList && bargainList.length > 0">
			<!-- <view v-for="(item, index) in bargainList" :key="index" :data-activity-bargain-id="item.activity_bargain_id"
			 :data-id="item.id" @tap="item.status==1||item.status==0||item.status==3?'loadBrangin':'loadProduct'"> -->
			<view v-for="(item, index) in bargainList" :key="index" :data-activity-bargain-id="item.activity_bargain_id"
			 :data-id="item.id" @tap="loadProduct">
				<view class="goods-box-msg">
					<image class="goods-img" :src="item.goods_img"></image>
					<view class="goods-news">
						<view class="goods-name t10">{{item.goods_name}}</view>
						<view class="goods-standrad">{{item.spec_name}}</view>
						<view class="group-price">
							<text class="bargain-font">最低价：</text>
							<text class="price-sign">¥</text><text class="price">{{item.floor_price}}</text>
						</view>
						<view class="to-bargain">
							<form report-submit="true" v-if="item.status==2">
								<button class="bargain-btn" form-type="submit">
									<text>重砍一次</text>
								</button>
							</form>
							<form report-submit="true" v-if="item.status==1">
								<button class="bargain-btn" form-type="submit">
									<text>查看详情</text>
								</button>
							</form>
							<form report-submit="true" v-if="item.status==3">
								<button class="bargain-btn" form-type="submit">
									<text>查看详情</text>
								</button>
							</form>
							<form report-submit="true" v-if="item.status==0">
								<button class="bargain-btn" form-type="submit">
									<text>继续砍价</text>
								</button>
							</form>
							<form report-submit="true" v-if="item.status==4">
								<button class="bargain-btn" form-type="submit">
									<text>重砍一次</text>
								</button>
							</form>
						</view>
						<view class="bargain-status">
							<text v-if="item.status==0" class="bargain-in">砍价中</text>
							<text v-if="item.status==1" class="bargain-success">砍价成功</text>
							<text v-if="item.status==2" class="bargain-fail">砍价失败</text>
							<text v-if="item.status==3" class="bargain-success">砍价成功</text>
							<text v-if="item.status==4" class="bargain-fail">支付超时</text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="empty" v-if="bargainList && bargainList.length <= 0">
			<view class="empty-item">
				<image class="item-logo" :src="iconURL + '/icon_order_empty02.png'" mode="widthFix"></image>
				<view class="item-text">暂无订单</view>
			</view>
		</view>
	</view>
</template>

<script>
	var app = getApp().globalData;
	var common = require("../../utils/common.js");

	export default {
		data() {
			return {
				iconURL: app.dataBase.iconURL,
				page: 1,
				page_size: 5,
				bargainList: []
			};
		},

		components: {},
		props: {},
		onLoad: function() {},
		onShow: function() {
			this.bargainList = [];
			this.page = 1, this.page_size = 5, this.getBargainList();
		},

		//下拉刷新
		onPullDownRefresh() {
			this.bargainList = [];
			this.page = 1, this.page_size = 5, this.getBargainList();
		},

		//  上拉获取数据
		onReachBottom() {
			if (this.bargainList && this.bargainList.length % this.page_size == 0) {
				this.page = this.bargainList.length / this.page_size + 1;
				this.getBargainList();
			}
		},

		methods: {
			//获取砍价数据
			getBargainList() {
				var that = this;
				var url = app.getPath.bargaining;
				var data = {
					page: this.page,
					page_size: this.page_size
				};
				common.ApiGateWayTest(url, data, true, function(res) {
					var res = res.data;

					if (res.success === 1) {
						that.bargainList = that.bargainList ? that.bargainList.concat(res.result) : res.result;
						that.setData({
							bargainList: that.bargainList
						});
					}

					wx.stopPullDownRefresh();
				});
			},

			//跳转砍价页面
			loadProduct(e) {
				var that = this;
				var activity_bargain_id = e.currentTarget.dataset.activityBargainId;
				common.formIdUpdate(e);
				wx.navigateTo({
					url: '../../packageA/bargain/bargain?activity_bargain_id=' + activity_bargain_id + '&entryType=external'
				});
			},

			// 跳转砍价详情
			loadBrangin(e) {
				var that = this;
				var bargaining_id = e.currentTarget.dataset.id;
				common.formIdUpdate(e);
				wx.navigateTo({
					url: '../../packageA/bargainshare/bargainshare?bargaining_id=' + bargaining_id + '&entryType=external'
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
	@import "./mybargain.css";
</style>
