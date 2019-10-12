<template>
	<view>
		<view class="container with-loader">
			<view class="aftermarket-status">
				<view v-for="(item, index) in listinfo.timeline" :key="index" :class="'aftermarket-box ' + (index == (listinfo.timeline.length-1) ? 'last' : '') + ' ' + ( listinfo.back_cnt.is_fucked == 1 ? 'end' : '')">
					<view class="box-line"></view>
					<view class="box-top">
						<i>{{item.created_at}}</i>
					</view>
					<view v-if="item.back_info.model" :class="'box-main ' + (item.back_info.model != 1 && item.back_info.model != 4 && item.back_info.model != 3 && item.back_info.model != 7 ? 'revist' : '') + ' ' + (item.back_info.model != 1 && item.back_info.model != 2 && item.back_info.model != 5 && item.back_info.model != 6 && item.back_info.model != 7 && item.back_info.model != 8 ? 'revive' : '')">
						<view v-if="item.back_info.title" :class="'main_title ' + (item.back_info.model == 7 ? 'no-padding' : '')">{{item.back_info.title}}</view>
						<view class="main_list_menu01" v-if="item.back_info.model == 1">
							<view class="main_list_menu01_p">售后单号：{{item.back_info.back_apply.back_sn}}</view>
							<view class="main_list_menu01_p">售后商品：{{item.back_info.back_apply.goods_name}}</view>
							<view class="main_list_munu01_btns">
								<button @tap="showwithdrawDialog" v-if="listinfo.back_cnt.status == 1">取消申请</button>
								<button @tap="go_order_return_detail">查看详情</button>
							</view>
						</view>
						<view class="main_list_menu02" v-if="item.back_info.model == 2">
							<view class="main_list_menu02_addmsg">请在30天内将货物寄回以下地址并提交物流信息</view>
							<view class="main_list_menu02_add">{{item.back_info.sure_address.address}}</view>
							<view class="main_list_menu02_p">收件人：{{item.back_info.sure_address.receive}}</view>
							<view class="main_list_menu02_p">电话：{{item.back_info.sure_address.tel}}</view>
						</view>
						<view class="main_list_menu03" v-if="item.back_info.model == 3">
							<view class="main_list_menu03_inputs">
								<view class="inputs_wl-input" @tap="showLogistics">
									<input type="text" :value="(shipping_name == '其他' ? '' : shipping_name)" :disabled="LogisticsDs" :placeholder="(LogisticsDs ? '请选择物流公司' : '请填写物流公司')"
									 @input="LogisticsTxt" readonly="readonly" @tap="showShipping"></input>
									<view class="item-img">
										<image v-if="LogisticsDs" :src="iconURL + '/icon_arrowDown.png'" mode="widthFix"></image>
									</view>
								</view>
								<view class="inputs_wl-input">
									<input type="text" :value="shipping_sn" @input="LogisticsSn" placeholder="物流单号"></input>
								</view>
							</view>
							<view class="main_list_menu03_update_imgs">
								<view class="h1">上传图片
									<i>(最多3张)</i>
								</view>
								<view class="box-img" v-for="(img, index2) in uploadImg" :key="index2">
									<image :src="img"></image>
									<image class="img-del" :src="iconURL + '/btn_delImg.png'" @tap="delUploadImg" :data-index="index"></image>
								</view>
								<label v-if="uploadImg.length < 3" @tap="updataimg"></label>
							</view>
							<view class="main_list_menu03_upadate_button">
								<button @tap="submitShipping">提交</button>
							</view>
						</view>
						<view class="main_list_menu04" v-if="item.back_info.model == 4">
							<view class="main_list_menu04_shippingcompany">物流公司：{{item.back_info.shipping_info.shipping_name}}</view>
							<view class="main_list_menu04_shippingodd">物流单号：{{item.back_info.shipping_info.invoice_no}}</view>
							<view class="main_list_menu04_addimgs row" v-if="item.back_info.shipping_info.back_ship_pic1 || item.back_info.shipping_info.back_ship_pic2 || item.back_info.shipping_info.back_ship_pic3">
								<view class="addimgs_img" v-if="item.back_info.shipping_info.back_ship_pic1">
									<image :src="item.back_info.shipping_info.back_ship_pic1"></image>
								</view>
								<view class="addimgs_img" v-if="item.back_info.shipping_info.back_ship_pic2">
									<image :src="item.back_info.shipping_info.back_ship_pic2"></image>
								</view>
								<view class="addimgs_img" v-if="item.back_info.shipping_info.back_ship_pic3">
									<image :src="item.back_info.shipping_info.back_ship_pic3"></image>
								</view>
							</view>
						</view>
						<view class="main_list_menu05" v-if="item.back_info.model == 5">
							<view class="main_list_menu05_tkmonny">退款金额：
								<i class="icon_rmb">¥</i>
								{{item.back_info.back_amount}}
							</view>
							<view class="main_list_menu05_tkmonnymsg">退款金额将在7个工作日内退回到支付账户，请注意查收</view>
						</view>
						<view class="main_list_menu06" v-if="item.back_info.model == 6">
							<view class="main_list_menu06_shippingcompany">物流公司：{{item.back_info.change_shipping_info.change_shipping_name}}</view>
							<view class="main_list_menu06_shippingodd">物流单号：{{item.back_info.change_shipping_info.change_invoice_no}}</view>
							<view class="main_list_munu06_btns">
								<button @tap="go_order_return_shipping">查看物流</button>
								<button @tap="showConfirmDialog" v-if="listinfo.back_cnt.status == 4">确认收货</button>
							</view>
						</view>
						<view class="main_list_menu07" v-if="item.back_info.model == 7"></view>
						<view class="main_list_menu08" v-if="item.back_info.model == 8">
							<view class="main_list_menu08_msg">客服因{{item.back_info.reject_reason.receve}}原因不同意退货如有疑问可提出申诉</view>
							<view class="main_list_menu08_buttons">
								<button @tap="go_linkkf">在线申诉</button>
								<button>电话申诉</button>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<loading v-if="loadingShow"></loading>
	</view>
</template>

<script>
	// pages/user/aftermarket-schedule.js
	var app = getApp().globalData;
	var common = require("../../utils/common.js");

	export default {
		data() {
			return {
				iconURL: app.dataBase.iconURL,
				pickerData: ['顺丰速运', '圆通快递', '申通快递', '中国邮政', 'EMS', '其他'],
				shipping_sn: '',
				shipping_name: '',
				uploadInfo: {},
				uploadImg: [],
				submitImg: [],
				LogisticsDs: true,
				id: "",
				listinfo: "",
				imgLenth: "",
				imgNowLength: ""
			};
		},

		components: {},
		props: {},
		onLoad: function(options) {
			if (options == undefined || options.id == undefined) {
				common.toast("请求参数错误");
				return;
			}

			this.setData({
				id: options.id
			});
			this.getInfo();
		},
		methods: {
			// 获取售后进度信息
			getInfo: function() {
				var that = this;
				common.showLoad(this);
				var url = app.getPath.backHistory;
				var data = {
					back_id: that.id
				};
				common.ApiGateWayTest(url, data, true, function(res) {
					if (res.data.success == 1) {
						var res = res.data.result;
						that.setData({
							listinfo: res.data
						});
					} else {
						common.toast('网络错误');
					}

					common.hideLoad(that);
					wx.hideLoading();
				});
			},
			// 显示物流公司弹层
			showLogistics: function() {
				var that = this;

				if (that.LogisticsDs) {
					wx.showActionSheet({
						itemList: that.pickerData,
						success: function(res) {
							that.setData({
								shipping_name: that.pickerData[res.tapIndex]
							});

							if (res.tapIndex == 5) {
								that.setData({
									LogisticsDs: false
								});
							}
						}
					});
				} else {
					return;
				}
			},
			// 物流公司选择其他
			LogisticsTxt: function(e) {
				var value = e.detail.value;
				this.setData({
					shipping_name: value
				});
			},
			// 物流单号
			LogisticsSn: function(e) {
				var value = e.detail.value;
				this.setData({
					shipping_sn: value
				});
			},
			// 选择图片
			updataimg: function() {
				var that = this;

				if (that.uploadImg.length < 3) {
					var count = parseInt(3) - parseInt(that.uploadImg.length);
					wx.chooseImage({
						count: count,
						success: function(res) {
							that.uploadImg = that.uploadImg.concat(res.tempFilePaths);
							that.setData({
								uploadImg: that.uploadImg
							});
						}
					});
				}
			},
			// 删除上传图片
			delUploadImg: function(e) {
				var index = e.currentTarget.dataset.index;
				this.uploadImg.splice(index, 1);
				this.setData({
					uploadImg: this.uploadImg
				});
			},
			// 提交图片
			submitImg: function(successCallback) {
				var that = this;
				var uploadImg = that.uploadImg;
				var header = {
					'accept': 'application/json',
					'content-type': 'multipart/form-data',
					'x-application': 'cilicili',
					'x-platform': 'wx',
					'x-useragent': 'host',
					'x-ver': 'v1.0'
				};
				header['X-Authorization'] = common.getStorageSync('token');

				if (uploadImg.length > 0) {
					for (var i in uploadImg) {
						var img = that.uploadImg[i];
						var data = {
							path: 'order_back',
							img_type: 1
						};
						wx.uploadFile({
							url: app.dataBase.uploadFile,
							filePath: img,
							name: 'img',
							formData: data,
							header: header,
							success: successCallback
						});
						that.setData({
							imgLenth: uploadImg.length,
							imgNowLength: Number(i) + 1
						});
						wx.showLoading({
							title: that.imgNowLength + '/' + that.imgLenth,
							mask: true
						});
					}
				} else {
					successCallback(false);
				}
			},
			// 提交售后单的物流信息
			submitShipping: function() {
				var that = this;

				if (that.shipping_name == '' || that.shipping_sn == '') {
					common.toast('物流信息不能为空');
					return;
				}

				var uri = app.getPath.submitShippingInfo;
				var data = {
					back_id: that.id,
					shipping_name: that.shipping_name,
					invoice_no: that.shipping_sn
				};
				that.submitImg(function(res) {
					if (res != false) {
						var res = JSON.parse(res.data);
						that.submitImg.push(res.result.url);
					}

					if (that.uploadImg.length == that.submitImg.length) {
						data['pic_info'] = JSON.stringify(that.submitImg);
						common.ApiGateWayTest(uri, data, true, function(res) {
							if (res.data.success == 1) {
								common.toast(res.data.msg);
								that.getInfo();
							}
						});
					}
				});
			},
			// 取消申请
			showwithdrawDialog: function() {
				var that = this;
				var content = '确定取消售后申请吗';
				var confirmText = '确定';
				common.showModal(content, confirmText, function(res) {
					var uri = app.getPath.backCancel;
					var data = {
						back_id: that.id
					};
					res.confirm && common.ApiGateWayTest(uri, data, true, function(res) {
						if (res.data.success == 1) {
							common.toast(res.data.msg);
							wx.navigateBack();
						}
					});
				});
			},
			// 查看详情
			go_order_return_detail: function() {
				var that = this;
				wx.redirectTo({
					url: '../user/order-return-detail?id=' + that.id
				});
			},
			// 查看物流
			go_order_return_shipping: function() {
				var that = this;
				wx.navigateTo({
					url: '../user/order-express?back_id=' + that.listinfo.back_cnt.back_id
				});
			},
			// 确认收货
			showConfirmDialog: function() {
				var that = this;
				var content = '请确定是否收到商品';
				var confirmText = '确定';
				common.showModal(content, confirmText, function(res) {
					var uri = app.getPath.changeConfirm;
					var data = {
						back_id: that.listinfo.back_cnt.back_id
					};
					res.confirm && common.ApiGateWayTest(uri, data, true, function(res) {
						if (res.data.success == 1) {
							common.toast(res.data.msg);
							that.getInfo();
						} else {
							common.toast(res.data.msg);
						}
					});
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
	@import "./aftermarket-schedule.css";
</style>
