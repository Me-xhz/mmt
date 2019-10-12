<template>
	<view>
		<view class="container">
			<form @submit="formSubmit" @reset="formReset">
				<view class="box">
					<view class="section">
						<view class="item-title">收货人：</view>
						<view class="item-input">
							<input type="text" placeholder="姓名" hidden="true" :value="consignee" name="consignee"></input>
							<!-- <input type="text" name="name" placeholder="姓名" /> -->
						</view>
					</view>
					<view class="section">
						<view class="item-title">联系电话：</view>
						<view class="item-input">
							<input type="text" name="phone" placeholder="手机或固定电话" :value="mobile"></input>
						</view>
					</view>
					<view class="addressView" :hidden="hidden">
						<view class="addressList" v-if="thischooseAdd">
							<div v-for="(item, index) in thischooseAdd" :key="index">
								{{item.name}}
							</div>
						</view>
						<view class="addressList" v-else>
							请选择
						</view>
						<scroll-view class="scrollView" scroll-y="true" :scroll-top="scrollTop">
							<view class="marginView">
								<view class="addressList" @tap="chooseAdd" :data-item="item" v-for="(item, index) in addressArr" :key="index"
								 style="display:block">{{item.name}}</view>
							</view>
						</scroll-view>
						<view class="cancelView">
							<view class="cancel" @click.stop="hiddendrop">取消</view>
						</view>
					</view>
					<view class="section" @tap="showScrollView">
						<view @change="bindPickerChangeshengArr" :value="shengIndex" :range="shengArr">
							<view class="picker">
								<text>详细地址：</text>
								<label v-if="chooseAdd">
									<div v-for="(item, index) in chooseAdd" :key="index">
										{{item.name}}
									</div>
								</label>
								<div class="addArea" v-else>
									<text class="addDetail">省/市/区</text>
								</div>
								<input hidden="true" placeholder="省/市/区" name="province" :value="(shengArr[shengIndex] !='请选择' ? shengArr[shengIndex] : shengName)"></input>
							</view>
						</view>
					</view>
					<view class="section address-detail">
						<input type="text" class="ww" name="address" maxlength="120" @input="addressNumber" placeholder="请填写详细地址(街道、小区、门牌等)"
						 :value="address"></input>
					</view>
					<view class="inputnum">{{textNum}}字</view>
					<view>
						<view class="switch-title">默认地址</view>
						<!-- 如果是默认地址，或者是用户新增的第一个地址，则消默认地址按键不能操作 -->
						<view class="switch-item" v-if="disabled == true || defaulAddress == 1">
							<switch class="addrSwitch" :checked="defaulAddress" :disabled="true" @change="switchChecked"></switch>
						</view>
						<view class="switch-item" v-else>
							<switch class="addrSwitch" :checked="defaulAddress" @change="switchChecked"></switch>
						</view>
					</view>
				</view>
				<view class="btn-area">
					<button type="warn" class="submit" formType="submit">保存地址</button>
				</view>
				<view class="btn-delete" v-if="address_id != -1">
					<button type="primary" class="submit" @tap="deleteAdd">删除地址</button>
				</view>
			</form>
		</view>
		<view class="shade" :hidden="hidden" @click.stop="hiddendrop">

		</view>
	</view>
</template>

<script>
	//城市选择
	var app = getApp().globalData;
	const common = require("../../utils/common.js");
	var thisArr = [];
	var thisData;
	var thisAdd = [];
	var addArray;

	export default {
		data() {
			return {
				hidden: true,
				cartId: 0,
				textNum: 120,
				defaulAddress: false,
				is_default: '0',
				scrollTop: 0,
				thisAdd: [],
				consignee: "",
				address_id: "",
				mobile: "",
				address: "",
				chooseAdd: "",
				regions: "",
				disabled: "",
				addressArr: "",
				shengArr: "",
				thischooseAdd: "",
				showType: false
			};
		},

		components: {},
		props: {},
		onLoad: function(options) {
			if (options == undefined || options.addressData == undefined) {
				common.toast("请求参数错误");
				return;
			} // 生命周期函数--监听页面加载


			var that = this; //获取省级城市

			var addData = JSON.parse(options.addressData);
			var is_default = addData.is_default == '1' ? true : false; //是否默认地址

			var tNumber = addData.address ? addData.address.length : 0; //地址字数

			if (addData.regions) {
				var regionsList = [];

				for (var i in addData.regions) {
					regionsList.push(addData.regions[i].id);
				}
			} //address_id=-1是新增地址，！=-1是编辑地址


			if (addData.address_id != -1) {
				that.setData({
					consignee: addData.consignee,
					address_id: addData.address_id,
					mobile: addData.mobile,
					address: addData.address,
					is_default: String(addData.is_default),
					chooseAdd: addData.regions,
					regions: regionsList,
					textNum: 120 - tNumber,
					defaulAddress: is_default,
					disabled: options.disabled
				});
			} else {
				that.setData({
					address_id: addData.address_id,
					is_default: String(addData.is_default),
					disabled: addData.is_default,
					defaulAddress: addData.is_default == 1 ? true : false
				});
			}

			var url = app.getPath.getRegionList;
			common.ApiGateWayTest(url, '', true, function(res) {
				if (res && res.data.success == 1) {
					addArray = res.data.result.regions;

					for (var i in res.data.result.regions) {
						thisArr.push({
							name: addArray[i].name,
							id: addArray[i].id,
							type: 1
						});
					} //初始渲染省份，并将省份保存用于下次打开时显示


					that.setData({
						addressArr: thisArr,
						shengArr: thisArr
					});
				}
			});
		},
		methods: {
			formSubmit: function(e) {
				var adds = e.detail.value; //前端验证手机号格式

				var reg = new RegExp(/^1[0-9]{10}$/);
				var mobileReg = reg.test(adds.phone);

				if (!adds.consignee) {
					common.toast('收货人不能为空');
					return;
				}

				if (!mobileReg) {
					common.toast('请输入正确的手机号');
					return;
				}

				if (!this.regions || !adds.address) {
					common.toast('地址不能为空');
					return;
				}

				var url;
				var data = {
					address: adds.address,
					is_default: this.is_default,
					mobile: adds.phone,
					consignee: adds.consignee,
					region: this.regions,
					tel: '',
					zip_code: ''
				};

				if (this.address_id == -1) {
					url = app.getPath.addAddress;
				} else {
					url = app.getPath.alterAddress;
					data.address_id = this.address_id;
				}

				common.ApiGateWayTest(url, data, true, function(res) {
					if (res && res.data.success == 1) {
						common.toast('保存成功!');
						wx.navigateBack(1);
					} else {
						common.toast(res.data.msg);
					}
				});
			},
			//选择地址
			chooseAdd: function(e) {
				var thisArr = [];
				var thisItem = e.currentTarget.dataset.item;
				thisAdd.push({
					name: thisItem.name,
					id: thisItem.id
				});
				var addData = addArray; //获取当前选择的下一级内容

				for (var i in addData) {
					for (var j in addData[i].regions) {
						if (thisItem.id == addData[i].id) {
							thisArr.push({
								name: addData[i].regions[j].name,
								id: addData[i].regions[j].id,
								type: 2
							}); //获取三级内容
						} else if (thisItem.id == addData[i].regions[j].id) {
							for (var k in addData[i].regions[j].regions) {
								thisArr.push({
									name: addData[i].regions[j].regions[k].name,
									id: addData[i].regions[j].regions[k].id,
									type: 3
								});
							}
						}
					}
				}

				this.setData({
					addressArr: thisArr,
					scrollTop: 0,
					chooseAdd: thisAdd,
					thischooseAdd: thisAdd
				});

				if (thisItem.type == 3) {
					//选完省市区后把三个id存入数组，用于发送后端
					var regionsList = [];

					for (var i in thisAdd) {
						regionsList.push(thisAdd[i].id);
					}

					this.setData({
						chooseAdd: thisAdd,
						regions: regionsList
					});
					this.hiddendrop();
				}
			},
			cancelChoose: function(e) {
				this.setData({
					showType: false
				});
			},
			//详细地址字符计数
			addressNumber: function(e) {
				var tNumber = e.detail.value.length;
				this.setData({
					textNum: 120 - tNumber
				});
			},
			switchChecked: function(e) {
				var checked = e.detail.value;
				var defaul;

				if (checked) {
					defaul = '1';
				} else {
					defaul = '0';
				}

				this.setData({
					is_default: defaul
				});
			},
			//显示选择地址列表
			showScrollView: function(e) {
				this.setData({
					hidden: false,
					addressArr: this.shengArr,
					thischooseAdd: ''
				});
			},
			//隐藏选择地址列表
			hiddendrop: function() {
				thisAdd = [];
				this.setData({
					hidden: true
				});
			},
			deleteAdd: function(e) {
				var content = '是否要删除该地址？';
				var confirmText = '确定';
				common.showModal(content, confirmText, function(res) {
					if (res.confirm) {
						var url = app.getPath.delAddress;
						var data = {
							address_ids: this.address_id
						};
						common.ApiGateWayTest(url, data, true, function(res) {
							if (res.data.success == 1) {
								wx.navigateBack(1);
								common.toast('地址删除成功');
							}
						});
					}
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
