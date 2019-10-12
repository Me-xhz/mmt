<template>
	<view>
		<!--pages/address/addressList/addressList.wxml-->
		<view class="addressList">
			<view class="addressList-block" @click.stop="navTo" v-for="(item, index) in address" :data-consignee="item"
			 :data-index="index" :key="index" v-if="address.length >= 0">
				<view class="addressListUp">
					<!-- 收货人地址 -->
					<view class="textBox">
						<text class="text-address">{{item.address}} {{item.pickup_address}} {{item.pick_up_label }} {{item.address_extra}}</text>
						<!-- 默认 -->
						<text class="text-default" v-if="item.is_default == 1">默认</text>
					</view>
					<view class="textBox ">
						<!-- 收货人姓名 -->
						<text class="text-name">{{item.consignee}}</text>
						<!-- 收货人电话 -->
						<text class="text-phone">{{item.mobile}}</text>
					</view>

					<view class="address-rt" v-if="isshow">
						<view class="address-Image row">
							<!-- 编辑按钮 -->
							<!-- <view data-idcheck="{{item.address_id}}"  data-index="{{index}}" catchtap="editAddress" class=''>
            <image src='{{iconURL}}/btn_address_edit.png' ></image>
          </view> -->


							<!-- 删除按钮 -->
							<view :data-idcheck="item.address_id" @click.stop="delAddress" class="mg-l72">
								<image :src="iconURL + '/btn_address_del.png'"></image>
							</view>

						</view>
					</view>
				</view>
			</view>
			<!-- 暂无收货地址 -->
			<view class="noAddress" v-if="address.length <= 0">
				<view class="noaddress-header">
					<image :src="iconURL + '/img_noAddress02.png'"></image>
				</view>

				<text class="noaddress-text">暂无收货地址</text>
			</view>

			<!-- 添加地址按钮 -->
			<view class="confirm-btn">
				<text class="txt" @click.stop="addAddress">添加收货地址</text>
			</view>
		</view>

		<loading v-if="loadingShow"></loading>
	</view>
</template>

<script>
	// pages/address/addressList/addressList.js
	var app = getApp().globalData;
	var common = require("../../../utils/common.js");

	export default {
		data() {
			return {
				is_check: false,
				consignees: [],
				iconURL: app.dataBase.iconURL,
				consignee: "",
				mobile: "",
				fromWhere: '',
				ishide: true,
				address: "",
				isshow: false,
				switch: ''
			};
		},

		components: {},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			this.loading();
			if (options.switch) {
				this.switch = options.switch
			}

			if (options.hasOwnProperty('from')) {
				this.setData({
					fromWhere: options.from
				});
			}

			if (options.from == 'confirm' || options.from == 'flashConfirm') {
				this.setData({
					isshow: false
				});
			} else {
				this.setData({
					isshow: true
				});
			}
		},
		onShow: function(options) {
			this.loading();
		},
		methods: {
			// 获取收货地址接口
			loading: function(e) {
				var that = this;
				common.showLoad(this);
				var uri = app.getPath.getaddresslist;
				var data = {
					is_default: '0'
				};
				common.ApiGateWayTest(uri, data, true, function(res) {
					var data = res.data;

					if (res && res.data.success !== 1) {
						common.toast('还未添加地址');
					} else if (res && data.success == 1) {
						var address = data.result.consignees;
						that.setData({
							address: address
						});
						common.hideLoad(that);
						common.setStorageSync('edit', address);
					}
				});
			},
			// 删除收货地址接口
			delAddress: function(e) {
				var that = this;
				var addList = that.address;
				var content = '你确认删除吗';
				var confirmText = '确定';
				common.showModal(content, confirmText, function(res) {
					var uri = app.getPath.deladdress;
					var data = {
						address_ids: e.currentTarget.dataset.idcheck
					};
					res.confirm && common.ApiGateWayTest(uri, data, true, function(res) {
						if (res && res.data.success == 1) {
							that.setData({ // address_id: that.data.address_id
							});
							that.loading();
							common.toast(res.data.msg);
						} else {
							common.toast(res.data.msg);
						}
					});
				});
			},
			// 编辑收货地址
			editAddress: function(e) {
				var that = this;
				var datas = that.address[e.currentTarget.dataset.index];
				wx.navigateTo({
					url: '/pages/address/addressEdit/addressEdit?consignee=' + datas.consignee + '&mobile=' + datas.mobile +
						'&address=' + datas.address + '&is_default=' + datas.is_default + '&address_id=' + datas.address_id +
						'&pickup_id=' + datas.pickup_id + '&city=' + datas.regions.name + '&pickup_address=' + datas.pickup_address +
						'&address_extra=' + datas.address_extra
				});
			},
			// 添加收货地址按钮
			addAddress: function() {
				wx.navigateTo({
					url: '/pages/address/address'
				});
			},
			// 跳转
			navTo: function(e) {
				let index = e.mp.currentTarget.dataset.index
				if (this.fromWhere == 'confirm') {
					var consignee = e.currentTarget.dataset.consignee;
					var pages = getCurrentPages();
					//跳到收货确认订单页面
					if (this.switch) {
						wx.navigateTo({
							//这里给参数switch=1 A页面跳到B页面，然后点击B页面再调回来
							// url: `/pages/confirm/confirm?index=${index}`
							url: '/pages/confirm/confirm?index='+index
						});
					}
				}
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
	@import "./addressList.css";
</style>
