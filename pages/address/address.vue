<template>
	<!--pages/address/address.wxml-->
	<view class="content">
		<form @submit="formSubmit" @reset="formReset">
			<view class="address">
				<view class="address-block row">
					<text class="lf-text">选择城市</text>
					<navigator hover-class="none" class="addressInput flex" url="../pickup2/citys2/citys2?switch=1">
						<text>{{city.cityName}}</text>
					</navigator>
					<text class="iconfont icon-btn_gerenzhongxinyoujiantoux"></text>
				</view>
				<view class="address-block row">
					<text class="lf-text">选择工厂</text>
					<navigator hover-class="none" class="addressInput flex" url="../pickup2/pickup2?switch=1">
						<text>{{pickup.pickup_id>0?pickup.cityName:''}}</text>
					</navigator>
					<text class="iconfont icon-btn_gerenzhongxinyoujiantoux"></text>
				</view>
				<view class="address-block row" v-if="pickup.cityName.length>0&&pickup.pickup_address.length>0">
					<text class="lf-text"></text>
					<view class="o-text flex t2">{{pickup.pickup_address}}</view>
				</view>
				<view v-if="has_shop==1">
					<view class="address-block row address_tag">
						<text class="lf-text">闪送地址</text>
						<input v-if="address_tag.length==0" type="text" name="address_extra" placeholder="请输入详细宿舍地址" class="addressInput flex"
						 @input="addressInput" :value="address_extra"></input>
						<view v-if="address_tag&&address_tag.length>0" v-for="(item, index) in address_tag" :key="index" :class="'ad_tag ' + (index==tag_num?'tag_active':'') + '  ' + ((index+1)%5==0?'ml-20':'')"
						 @tap="change_tag" :data-tagnum="index" :data-label_id="item.pick_up_label_id">
							{{item.name}}
						</view>
					</view>
					<view class="row" v-if="address_tag&&address_tag.length>0">
						<text class="lf-text"></text>
						<input type="text" name="address_extra" placeholder="如 2层201" placeholder-style="color:#aaa" class="addressInput flex"
						 @input="addressInput" :value="address_extra"></input>
					</view>
				</view>

				<view class="address-block row">
					<text class="lf-text">提货人</text>
					<input type="text" maxlength="10" name="consignee" placeholder="请输入姓名" class="addressInput flex" @input="nameInput"
					 :value="consignee"></input>
				</view>
				<view class="address-block row">
					<text class="lf-text">手机号码</text>
					<input type="number" placeholder="请输入手机号码" class="addressInput flex" name="mobile" @input="phoneInput" :value="mobile"
					 data-val="phone"></input>
				</view>

				<view class="address-block-default row flex">
					<text class="lf-text ">默认地址</text>
					<view class="item-toggle col">
						<!-- <switch wx:if="{{!canchangeDefault}}" bindchange="switchChange" /> -->
						<switch :checked="is_default" @change="switchChange"></switch>
					</view>
				</view>
			</view>
			<!-- 保存地址按钮 -->
			<view class="confirm-btn">
				<text class="txt" @tap="addAddress">保存地址</text>
			</view>
		</form>
	</view>
</template>

<script>
	// pages/address/address.js
	var app = getApp().globalData;
	var common = require("../../utils/common.js");
	var thisArr = [];
	var thisData;
	var thisAdd = [];
	var addArray;

	export default {
		data() {
			return {
				consignee: "",
				mobile: "",
				checkes: false,
				is_pick_up: 0,
				warehouseId: '',
				city: {
					cityname: ''
				},
				pickup: {
					cityname: ''
				},
				address_extra: '',
				address_tag: [],
				tag_num: -1,
				label_id: "",
				has_shop: ''
			};
		},

		components: {},
		props: {},
		onLoad: function(options) {
			var that = this;
			var pickup = common.getStorageSync('getpickup');
			var city = common.getStorageSync('city');
			that.setData({
				pickup: pickup,
				city: city
			});
			this.getpickuplistr();
		},
		onShow: function() {
			this.getAddressTag();
		},
		methods: {
			// 获取收货人input的值
			nameInput: function(e) {
				this.setData({
					'consignee': e.detail.value
				});
			},

			//获取闪送地址
			addressInput(e) {
				this.setData({
					'address_extra': e.detail.value
				});
			},

			// 获取收货人手机号input的值
			phoneInput: function(e) {
				this.setData({
					'mobile': e.detail.value
				});
			},
			switchChange: function(e) {
				this.setData({
					'checkes': e.detail.value
				});
			},
			addAddress: function() {
				var that = this;

				if (that.consignee == '' || that.mobile == '') {
					common.toast('收货人或手机号不能为空');
					return;
				}

				if (this.address_extra == "" && that.has_shop == 1) {
					common.toast('请输入闪送地址');
					return;
				}

				;

				if (that.city.cityName == '') {
					common.toast('请选择城市');
					return;
				}

				if (that.is_pick_up == 0) {
					common.toast('该城市暂无工厂');
					return;
				}

				if (!that.pickup.pickup_id || that.pickup.cityName == '') {
					common.toast('请选择工厂');
					return;
				}

				if (that.address_tag.length > 0 && that.has_shop == 1) {
					if (that.label_id == "") {
						common.toast('请选择闪送地址');
						return;
					}
				}

				var uri = app.getPath.addaddress;
				var data = {
					consignee: that.consignee,
					mobile: that.mobile,
					pickup_id: that.pickup.pickup_id,
					is_default: that.checkes ? 1 : 0,
					address_extra: that.address_extra,
					pick_up_label_id: that.label_id
				};
				common.ApiGateWayTest(uri, data, true, function(res) {
					if (res && res.data.success == 1) {
						var res = res.data.result;
						wx.navigateBack({
							delta: 1
						});
					}
				});
			},
			getpickuplistr: function() {
				var that = this;
				var uri = app.getPath.pickuplistr;
				var city = that.city;
				var data = {
					warehouse_id: that.city.warehouse_id
				};
				common.ApiGateWayTest(uri, data, true, function(res) {
					var res = res.data;

					if (res.result.cities.length > 0) {
						that.setData({
							is_pick_up: 1
						});
					} else {
						that.setData({
							is_pick_up: 0
						});
					}
				});
			},

			// 获取提货点楼号标签
			getAddressTag() {
				var that = this;
				var url = app.getPath.pickupLabel;
				var data = {
					pickup_id: this.pickup.pickup_id
				};
				common.ApiGateWayTest(url, data, true, function(res) {
					var res = res.data;

					if (res.success == 1) {
						if (res.result.has_shop != 1) {
							that.setData({
								address_extra: "",
								address_tag: [],
								tag_num: -1,
								label_id: "",
								has_shop: ""
							});
						} else {
							that.setData({
								address_tag: res.result.list,
								has_shop: res.result.has_shop
							});
						}
					}
				});
			},

			// 切换标签
			change_tag(e) {
				this.label_id = e.currentTarget.dataset.label_id;
				this.setData({
					tag_num: e.currentTarget.dataset.tagnum
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
	@import "./address.css";
</style>
