<template>
	<view>
		<view class="container">
			<view class="index" v-if="!pickUpSelech">
				<view class="delivery-header" @tap="toNodelivery" data-style="1">
					<view class="delivery-oldnum">{{deliveryOldnum}}</view>
					<view class="delivery-text">到货剩余订单数</view>
					<view class="switch-pickup" @click.stop="getUserPickUpApi">{{addressName}}</view>
				</view>
				<view class="row index-box">
					<view class="index-item" @tap="toRouter" data-type="delivery">
						<view class="iconfont icon-ERP_tihuofangshi flex-icon"></view>
						<view class="flex-text">用户取件</view>
					</view>
					<view class="index-item" @tap="toRouter" data-type="arrival">
						<view class="iconfont icon-daohuoqingdian flex-icon"></view>
						<view class="flex-text">到货确认</view>
					</view>
					<view class="index-item" @tap="toNodelivery" data-style="2">
						<view class="number" v-if="wayNum > 0">{{wayNum}}</view>
						<view class="iconfont icon-img_dengdaishangpinpeisongx flex-icon"></view>
						<view class="flex-text">在途订单</view>
					</view>
					<view class="index-item" @tap="toNodelivery" data-style="3">
						<view class="iconfont icon-img_img_quhuochenggongx flex-icon"></view>
						<view class="flex-text">售后到库</view>
					</view>
				</view>
			</view>

			<view v-if="pickUpSelech" class="pickup-model"></view>
			<!-- <component v-if="pickUpSelech" is="wxaSortPicker" @tap="handleclick" :wxaSortPickerData="wxaSortPickerData"
			 :dataType="dataType"></component> -->
			 <!-- <wxaSortPickeComponent v-if="pickUpSelech"  @tap="handleclick" :wxaSortPickerData="wxaSortPickerData" -->
			 :dataType="dataType"></wxaSortPickeComponent>
		</view>

		<loading v-if="loadingShow"></loading>
	</view>
</template>

<script>
	const app = getApp().globalData;
	const common = require("../../utils/common.js");

	export default {
		data() {
			return {
				deliveryOldnum: 0,
				wayNum: 0,
				addressName: "切换自提点",
				pickUpSelech: false,
				cities_list: ""
			};
		},

		components: {
			// wxaSortPickeComponent
		},
		props: {},
		onLoad: function(options) {
			this.setData({
				addressName: options.pickupName
			});
		},
		onShow: function() {
			this.getUnclaimednum();
		},
		methods: {
			getUnclaimednum() {
				common.showLoad(this);
				var that = this;
				var url = app.getPath.unclaimednum;
				common.ApiLogistics(url, '', true, function(res) {
					if (res.success == 1) {
						that.setData({
							deliveryOldnum: res.result.data.num,
							wayNum: res.result.data.on_the_way_num
						});
					} else {
						common.toast('网络错误');
					}

					common.hideLoad(that);
				});
			},

			getUserPickUpApi() {
				var that = this;
				var uri = app.getPath.userPickUpList;
				common.ApiLogistics(uri, {}, true, function(res) {
					if (res.success == 1) {
						var cities_list = res.result.cities;
						cities_list.unshift({
							cityName: "全部提货点",
							pickup_id: 0,
							pinYin: "all",
							py: "all"
						});
						that.setData({
							cities_list: cities_list
						});
						wxaSortPicker.init(that.cities_list, that);
						that.setData({
							pickUpSelech: true
						});
					}
				});
			},

			wxaSortPickerItemTap(e) {
				var city = e.target.dataset.citys;
				var pickup_id = city.pickup_id;
				common.setStorageSync('getExpressPickupId', pickup_id);
				this.setData({
					addressName: city.cityName,
					pickUpSelech: false
				});
				this.getUnclaimednum();
			},

			toRouter(e) {
				var type = e.currentTarget.dataset.type;
				wx.navigateTo({
					url: '../../packageA/logistics/' + type
				});
			},

			toNodelivery(e) {
				var style = e.currentTarget.dataset.style;
				wx.navigateTo({
					url: '../../packageA/logistics/nodelivery?style=' + style
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
	@import "./index.css";
</style>
