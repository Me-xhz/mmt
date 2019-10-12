<template>
	<view>
		<!--地址管理-->
		<!-- <radio-group class="radio-group" wx:for="{{address}}">
<view hidden="{{hiddenAddress}}" class="address" >
  <view class="address-icon" bindtap="setDefault" data-id="{{item.id}}">
    <radio checked="{{item.is_default==1?true:false}}" value="{{index}}" />
  </view>
  
  <view class="address-detail">
    <view class="address-name-phone">
      <text class="address-name">{{item.name}}</text>
      <text class="address-phone">{{item.tel}}</text>
    </view>
    <view class="address-info">{{item.address_xq}}</view>
    <view class="address-edit">
      <view>
        <icon></icon>
        <text hidden="{{item.is_default==0?false:true}}"></text>
      </view>
      <view>
        <text hidden="{{item.is_default==0?false:true}}" bindtap="setDefault" data-id="{{item.id}}">设置默认</text>
        <text hidden="{{item.is_default==0?false:true}}"> | </text>
        <text data-id="{{item.id}}" bindtap="delAddress">删除</text>
      </view>
    </view>
  </view>
</view>
</radio-group> -->
		<view class="app-content">
			<view class="top-info">
				<view class="info-text">管理你的收货地址</view>
				<view class="info-button ng-scope" v-if="address.length > 0">
					<view class="button-text" @tap="edit">{{editType ? '编辑': '完成'}}</view>
				</view>
			</view>
			<view class="my-address ng-scope" v-if="address && address.length > 0">
				<view :class="'list-item readonly ' + (address_id == item.address_id && editType ? 'checkOrder' : '') + ' ' + (editType == false ? 'paddingleft' : '')"
				 :data-addid="item.address_id" :data-item="item" v-for="(item, index) in address" :key="index" @tap="choose">
					<view class="item-info">
						<icon :class="'user-item-checkbox ' + (item.checked ? 'user-active' : '')"></icon>
						<!-- <icon class="manu-right-icon iconfont icon-rightjiantou" hidden="{{!editType}}"></icon> -->
						<image class="item-arrow" v-if="!address_id" :src="iconURL + '/icon_right_arrow.png'"></image>
						<view class="info-contact">
							<text>{{item.consignee}}</text>
							<text>{{item.mobile}}</text>
							<span class="defaults" v-if="item.is_default">默认</span>
							<!-- <text class='contact-default ng-scope'>默认</text> -->
						</view>
						<view class="info-detail">
							<text v-for="(chril, index) in item.regions" :key="index">{{chril.name}}</text>
							<text class="addInfo">{{item.address}}</text>
						</view>
					</view>
				</view>
			</view>
			<view v-if="address && address.length <= 0" class="address-empty">
				<view class="empty-item">
					<image :src="iconURL + '/icon_address_empty.png'" mode="widthFix"></image>
					<text>暂无收货地址</text>
				</view>
			</view>
			<view :hidden="!editType" class="add-address" @tap="add_address">
				<!-- <image class="add-address-icon" src="#"></image> -->
				<button type="warn" class="submit">添加收货地址</button>
			</view>
			<view @tap="delAddress">
				<view :hidden="editType" class="add-address delete">
					<!-- <image class="add-address-icon" src="#"></image> -->
					<button type="primary" class="submit">删除收货地址</button>
				</view>
			</view>
		</view>

		<loading v-if="loadingShow"></loading>
	</view>
</template>

<script>
	// pages/address/user-address/user-address.js
	var common = require("../../../utils/common.js");
	var app = getApp().globalData;

	export default {
		data() {
			return {
				iconURL: app.dataBase.iconURL,
				radioindex: '',
				pro_id: 0,
				num: 0,
				cartId: 0,
				editType: true,
				hiddenAddress: true,
				address_id: "",
				address: "",
				consignee: ""
			};
		},

		components: {},
		props: {},
		onLoad: function(options) {
			if (options == undefined || options.address_id == undefined) {
				common.toast("请求参数错误");
				return;
			}

			var that = this;

			if (options && options.address_id) {
				that.setData({
					address_id: options.address_id
				});
			}
		},
		onShow: function() {
			if (this.address_id == undefined) {
				common.toast("请求参数错误");
				return;
			}

			this.loading();
		},
		methods: {
			loading: function() {
				var that = this;
				var url = app.getPath.getAddressList;
				var data = {
					is_default: '0'
				};
				common.showLoad(this);
				common.ApiGateWayTest(url, data, true, function(res) {
					var data = res.data;

					if (res && data.success != 1) {
						common.toast('还未添加地址');
					} else if (res && data.success == 1) {
						var address = data.result.consignees;

						for (var i in address) {
							address[i].checked = false;
						}

						if (address == '') {
							var address = [];
						}

						that.setData({
							address: address,
							cartId: that.cartId
						});
						common.hideLoad(that);
					}
				});
			},
			edit: function() {
				var num = 0;
				var type;
				this.editType = !this.editType;
				var list = this.attList;
				this.setData({
					editType: this.editType
				});
			},
			choose: function(e) {
				var that = this;

				if (that.address_id && that.editType) {
					var item = e.currentTarget.dataset.item;
					var pages = getCurrentPages();
					var prevPage = pages[pages.length - 2];
					prevPage.setData({
						consignee: item
					});
					wx.navigateBack();
				} else {
					var addid = e.currentTarget.dataset.addid;
					var addList = that.address;
					var thisAdd;

					for (var i in addList) {
						if (addList[i].address_id == addid) {
							thisAdd = addList[i];

							if (that.editType == false) {
								addList[i].checked = !addList[i].checked;
								that.setData({
									address: addList
								});
							} else {
								var addList = [];

								for (var i in thisAdd.regions) {
									addList.push(thisAdd.regions[i].name);
								}

								var disabled = that.address.length > 1 ? false : true;
								var addData = JSON.stringify(thisAdd);
								wx.navigateTo({
									url: '../address?addressData=' + addData + '&disabled=' + disabled
								}); // wx.navigateTo({
								//   url: '../address?address_id=' + addid + "&consignee=" + thisAdd.consignee + "&mobile=" + thisAdd.mobile + "&address=" + thisAdd.address +
								//   "&qu_id=" + thisAdd.regions[2].id + "&is_default=" + thisAdd.is_default + "&addList=" + addList
								// })
							}
						}
					}
				}
			},
			delAddress: function(e) {
				var that = this;
				var addList = that.address;
				var viewList = [];
				var addrId = [];

				for (var i in addList) {
					if (addList[i].checked == true) {
						addrId.push(addList[i].address_id);
					} else {
						viewList.push(addList[i]);
					}
				}

				var content = '你确认删除吗';
				var confirmText = '确定';
				common.showModal(content, confirmText, function(res) {
					var url = app.getPath.delAddress;
					var data = {
						address_ids: addrId
					};
					res.confirm && common.ApiGateWayTest(url, data, true, function(res) {
						if (res && res.data.success == 1) {
							that.setData({
								editType: true,
								address: viewList
							});
							that.setData({
								address_id: that.address_id
							});
							that.loading();
							common.toast(res.data.msg);
						} else {
							common.toast(res.data.msg);
						}
					});
				});
			},
			add_address: function() {
				var defaults = this.address.length > 0 ? '0' : '1';
				var data = {
					address_id: -1,
					is_default: defaults
				};
				var newData = JSON.stringify(data);
				wx.navigateTo({
					url: '../address?addressData=' + newData
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
	@import "./user-address.css";
</style>
