<template>
	<view>
		<!-- <button bindtap='showSkuDrawerHandle'>
  测试</button> -->
		<view id="preview" :style="'background-color:' + ConfigStyle.value.backgroundColor.value + ';background-image:url(' + (ConfigStyle.value.backgroundImage.value == null ? '' : ConfigStyle.value.backgroundImage.value) + ')'">
			<!-- 返回首页悬浮框/分享进入显示 -->
			<view class="goHomeFixed" @click.stop="gotoHome" v-if="isShowGoHome">
				<image :src="iconURL + '/product-icon-leftReturn.svg'" class="icon-leftReturn"></image>
				<text>返回首页</text>
			</view>
			<view class="preview" v-for="(item, index) in Items" :key="index">
				<!-- 相对定位 -->
				<view class="previewAbs" :style="'height:' + (item.data.style.value.height.value * 2) + 'rpx'" v-if="item.type == 'relative'">
					<view class="AbsBox" :style="'top:' + ((children.style.top ? children.style.top : 0) * 2) + 'rpx;left:' + ((children.style.left ? children.style.left : 0) * 2) + 'rpx'"
					 v-for="(children, index2) in item.children" :key="index2">
						<image class="AbsImage" :style="'width:' + ((children.style.width ? children.style.width : 375) * 2) + 'rpx;height:' + ((children.style.height ? children.style.height : '')* 2) + 'rpx'"
						 mode="widthFix" v-if="children.type == 'poster'" :src="children.data.pic.value[0].image.value"></image>
						<view class="AbsHotpot" @tap="hotpotLink" :data-type="children.data.style.value.hotType.value" :data-id="children.data.style.value.link.value"
						 :style="'width:' + (children.data.style.value.width.value * 2) + 'rpx;height:' + (children.data.style.value.height.value * 2) + 'rpx'"
						 v-if="children.type == 'hotspot' && children.data.style.value.hotType.value != 9"></view>
						<button open-type="contact" hover-class="none" :style="'width:' + (children.data.style.value.width.value * 2) + 'rpx;height:' + (children.data.style.value.height.value * 2) + 'rpx;background-color: transparent;padding: 0;'"
						 v-if="children.type == 'hotspot' && children.data.style.value.hotType.value == 9" session-from="添加客服二维码"></button>
						<video :style="'width:' + (children.style.width * 2) + 'rpx;height:' + (children.style.height * 2) + 'rpx'" class="AbsViode"
						 objectFit="fill" show-center-play-btn="true" :src="children.data.pic.value[0].videos.value" :poster="children.data.pic.value[0].plot.value"
						 v-if="children.type == 'videos'"></video>
						<view class="AbsText" :style="'text-align:' + children.data.style.value.textAlign.value + ';background-color:' + children.data.style.value.backgroundColor.value + ';padding:' + children.data.style.value.padding.value + 'px;margin:' + children.data.style.value.margin.value + 'px;font-size:' + (children.data.style.value.fontSize.value * 2) + 'rpx;color:' + children.data.style.value.color.value + ';width:' + (children.style.width * 2) + 'rpx;height:' + (children.style.height * 2) + 'rpx'"
						 v-if="children.type == 'txt'">{{children.data.content.value}}</view>
						<view class="AbsbackgroundImage" v-if="children.type == 'backgroundImage'">
							<view class="backgroundImagebox">
								<image mode="widthFix" :style="'width:' + ((children.style.width ? children.style.width : 375) * 2) + 'rpx;'"
								 v-for="(img, index3) in children.data.pic.value[0].image.value" :key="index3" :src="img"></image>
							</view>
						</view>
						<button :class="'AbsBtn ' + children.data.size.value + ' ' + children.data.theme.value" :style="'width:' + (children.style.width * 2) + 'rpx;'"
						 v-if="children.type == 'btn'">{{children.data.content.value}}</button>
						<view class="AbsCountDown" v-if="children.type == 'countdown'">
							<view class="text">{{countTimeType == 0 ? '距活动开始仅剩:' : '距活动结束仅剩:'}}</view>
							<countDown type="2" time-text="time-text" doc-text="doc-text" isShowMs="true" :timestamp="countTimeDate"></countDown>
						</view>
						<view class="Absquared-row-3-2" v-if="children.type == 'squared' && children.data.style.value.type.value == 1"
						 :style="'background-color:' + children.data.style.value.backgroundColor.value + ';'">
							<view class="squared-box-row" v-if="item.value != ''" v-for="(item, index3) in children.data.style.value.link"
							 :key="index3" @tap="goProduct" :data-id="item.value">
								<image class="squared-row-img"></image>
								<view class="squared-name">小黄人充电宝</view>
								<view class="squared-price">
									<view class="p">¥120</view>
									<view class="i">¥120</view>
								</view>
							</view>
						</view>
						<view class="Absquared-row-2-3" v-if="children.type == 'squared' && children.data.style.value.type.value == 2"
						 :style="'background-color:' + children.data.style.value.backgroundColor.value + ';'">
							<view class="squared-box-row" v-if="item.value != ''" v-for="(item, index3) in children.data.style.value.link"
							 :key="index3" @tap="goProduct" :data-id="item.value">
								<image class="squared-row-img"></image>
								<view class="squared-name">小黄人充电宝5500ml,支持双系统充电</view>
								<view class="squared-price">
									<view class="p">¥120</view>
									<view class="i">¥120</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 绝对定位 -->
				<view class="PreSwiper" v-if="item.type == 'swipe'">
					<swiper style="height:440rpx" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration"
					 :indicator-color="indicatorColor" :indicator-active-color="indicatorActiveColor">
						<block v-for="(pic, index2) in item.data.pic.value" :key="index2" v-if="pic.image.value != ''">
							<swiper-item>
								<image @tap="hotpotLink" :data-type="pic.hotType.value" :data-id="pic.link.value" :src="pic.image.value" class="slide-image"
								 width="100%" mode="widthFix"></image>
							</swiper-item>
						</block>
					</swiper>
				</view>
				<view class="PreImage" v-if="item.type == 'poster'">
					<image style="width:100%" mode="widthFix" :src="item.data.pic.value[0].image.value" :data-key="index"></image>
				</view>
				<view class="PreHostImage" v-if="item.type == 'posterHost'">
					<image style="width:100%" mode="widthFix" :src="item.data.pic.value[0].image.value" :data-key="index"></image>
					<view class="AbsHotpot" @tap="hotpotLink" v-for="(children, index2) in item.children" :key="index2" :data-type="children.data.style.value.hotType.value"
					 :data-id="children.data.style.value.link.value" :style="'width:' + (children.data.style.value.width.value * 2) + 'rpx;height:' + (children.data.style.value.height.value * 2) + 'rpx;position: absolute;top:' + ((children.style.top ? children.style.top : 0) * 2) + 'rpx;left:' + ((children.style.left ? children.style.left : 0) * 2) + 'rpx'"
					 v-if="children.type == 'hotspot' && children.data.style.value.hotType.value != 9"></view>
					<button open-type="contact" hover-class="none" v-for="(children, index2) in item.children" :key="index2" :style="'width:' + (children.data.style.value.width.value * 2) + 'rpx;height:' + (children.data.style.value.height.value * 2) + 'rpx;background-color: transparent;padding: 0;position: absolute;top:' + ((children.style.top ? children.style.top : 0) * 2) + 'rpx;left:' + ((children.style.left ? children.style.left : 0) * 2) + 'rpx'"
					 v-if="children.type == 'hotspot' && children.data.style.value.hotType.value == 9" session-from="添加客服二维码"></button>
				</view>
				<view class="PreVideo" v-if="item.type == 'videos'">
					<video style="width:750rpx;height:570rpx" objectFit="fill" show-center-play-btn="true" :src="item.data.pic.value[0].videos.value"
					 :poster="item.data.pic.value[0].plot.value"></video>
				</view>
				<view class="PrebackgroundImage" v-if="item.type == 'backgroundImage'">
					<view class="backgroundImagebox">
						<image mode="widthFix" :style="'width:' + (children.style.width * 2) + 'rpx;'" v-for="(img, index2) in item.data.pic.value[0].image.value"
						 :key="index2" :src="img"></image>
					</view>
				</view>
				<view class="PreText" :style="'text-align:' + item.data.style.value.textAlign.value + ';background-color:' + item.data.style.value.backgroundColor.value + ';padding:' + item.data.style.value.padding.value + 'px;margin:' + item.data.style.value.margin.value + 'px;font-size:' + (item.data.style.value.fontSize.value * 2) + 'rpx;color:' + item.data.style.value.color.value + ';width:100%'"
				 v-if="item.type == 'txt'">{{item.data.content.value}}</view>
				<view class="Prebtn" v-if="item.type == 'btn'">
					<button :class="'AbsBtn ' + item.data.size.value + ' ' + item.data.theme.value">{{item.data.content.value}}</button>
				</view>
				<view class="PreTime" v-if="item.type == 'countdown'">
					<countDown :timestamp="countTimeDate"></countDown>
				</view>
			</view>

			<!-- 活动报名弹窗 -->
			<view class="drawer-screen" @tap="phoneMaskCancel" data-status="0" v-if="showPhoneModal"></view>
			<view :animation="animationData" style="opacity:0" class="modal-join-box" v-if="showPhoneModal">
				<view class="modal-join-header">填写信息</view>
				<!-- 无表单配置数据 -->
				<view class="modal-join-content" v-if="field_data.length==0">
					<view class="content-item row">
						<view class="item-left">姓名：</view>
						<input :value="joinName" maxlength="10" class="item-right" placeholder="请输入姓名" type="text" @input="inputInfo"
						 data-item="1"></input>
					</view>
					<view class="content-item row">
						<view class="item-left">手机号码：</view>
						<input :value="joinPhone" class="item-right" placeholder="请输入手机号码" type="number" @input="inputInfo" data-item="2"></input>
					</view>
					<view class="content-item row">
						<view class="item-left">年龄：</view>
						<input :value="joinAge" class="item-right" placeholder="请输入年龄" type="number" @input="inputInfo" data-item="3"></input>
					</view>
					<view class="content-item row">
						<view class="item-left">所在工厂：</view>
						<input :value="joinFactory" maxlength="10" class="item-right" placeholder="请输入厂名" type="text" @input="inputInfo"
						 data-item="4"></input>
					</view>
					<view class="content-button row">
						<view class="button-com button-cancel" @tap="phoneMaskCancel">取消</view>
						<view class="button-com button-ok" @tap="phoneMaskSubmit">确定</view>
					</view>
				</view>
				<!-- 有表单配置数据 -->
				<view class="modal-join-content" v-else>
					<view class="content-item row" v-for="(item, index) in field_data" :key="index">
						<view class="item-left">{{item.label_name}}：</view>
						<input class="item-right" :value="field_upd_data[index]" type="text" @input="inputBind" :data-idx="index" v-if="item.type!=2"></input>
						<view class="item-right ellipsis" v-else :data-idx="index" @tap="showSku">{{item.val}}</view>
					</view>
					<view class="content-button row">
						<view class="button-com button-cancel" @tap="phoneMaskCancel">取消</view>
						<view class="button-com button-ok" @tap="field_upd">确定</view>
					</view>
				</view>
			</view>


			<!-- 规格选择弹窗 wx:if="{{showSkuDrawer}}"-->
			<view class="skuDrawer" :animation="skuAnimationData">
				<view class="iconfont icon-btn_qiapianguanbianniux" @tap="showSkuDrawerHandle"></view>
				<view class="title">{{select_label_name}}</view>
				<view class="content">
					<scroll-view class="left" scroll-y="true">
						<view :class="'item ' + (index==good_idx?'actived':'')" v-for="(item, index) in selectedSkuArr" :key="index" @tap="selectGood"
						 :data-index="index" :data-goodId="item.goods_id">
							<text>{{item.goods_name}}</text>
						</view>
					</scroll-view>
					<scroll-view class="right" scroll-y="true">
						<!-- 组 -->
						<view class="skuWrap" v-for="(item, index) in properties.spec_name" :key="index">
							<view class="name">{{item.spec_name}}</view>
							<view class="skuArr clearfix">
								<!-- sku -->
								<button :class="'sku-item t4 ' + (attr.id==skuArr[idx]?'actived-item':'')" v-for="(attr, index2) in item.attrs"
								 :key="index2" @tap="selectAttr" :data-idx="idx" :data-attr="attr">{{attr.item}}</button>
								<!-- <view class='sku-item active-item'>xxxxxxxxxxxx</view> -->
							</view>
						</view>
					</scroll-view>
				</view>
				<button class="btn" type="warn" @tap="affirm">确认</button>
			</view>

		</view>
		<button class="to_share" open-type="share">
			<image :src="iconURL + '/button-icon-share01.png'"></image>
		</button>

		<loading v-if="loadingShow"></loading>
	</view>
</template>

<script>
	var app = getApp().globalData;
	var common = require("../../utils/common.js");
	import countdown from "../../components/countDown/countDown";

	export default {
		data() {
			return {
				autoplay: true,
				interval: 3000,
				duration: 500,
				indicatorDots: true,
				indicatorColor: "rgba(0,0,0,.2)",
				indicatorActiveColor: "#FF7F95",
				shareContent: {},
				iconURL: app.dataBase.iconURL,
				showPhoneModal: false,
				join_id: 0,
				joinName: "",
				joinPhone: "",
				joinAge: "",
				joinFactory: "",
				showSkuDrawer: false,
				field_data: [],
				field_upd_data: [],
				selectedSkuArr: [],
				selected_field_idx: 0,
				skuArr: [],
				countTimeDate: 0,
				countTimeType: 0,
				isShowGoHome: false,
				entryData: "",
				ConfigStyle: "",
				Items: "",
				preImageWidth: "",
				preImageHeight: "",
				animationData: "",
				skuAnimationData: "",
				select_label_name: "",
				goods_id: "",
				good_idx: "",
				properties: ""
			};
		},

		components: {
			countdown
		},
		props: {},
		onLoad: function(options) {
			var that = this;
			common.showLoad(this);
			this.ad_id = options.ad_id;
			this.activity_id = options.activity_id;
			this.getActivity(); // 从外部分享进入时，显示左上角回到首页  改动带external时为内部进入携带参数，外部进入不带参数

			if (options && options.entryType && options.entryType == 'external') {
				this.setData({
					isShowGoHome: false
				});
			} else {
				this.setData({
					isShowGoHome: true
				});
			} // 外部带商品店铺


			this.setData({
				entryData: options
			});
			var options = that.entryData;
			var pickupId = common.getStorageSync('getpickup'); // 判断是否第一次进入 且是从外部进入，如二维码扫码 && app.firstlaunchApp

			if (options && (options.atitude || options.pickup_id) && !pickupId) {
				that.getExternal(options.pickup_id).then(function() {
					// 关闭开关，让app知道已经不是第一次进入当前页
					app.firstlaunchApp = false; // 清空data内携带参数

					that.entryData = {}; // 外部已带经纬度定位，无需再调用定位接口，所以将缓存定位改为真，让页面可以显示

					common.setStorageSync('authSetting', {
						'scope.userLocation': true
					});
				});
			}
		},

		onReady() {
			common.hideLoad(this);
		},

		onShareAppMessage: function() {
			var that = this;
			var pickup = common.getStorageSync('getpickup');
			return {
				title: that.shareContent.shareTitle.value,
				path: '/pages/activity/activity?activity_id=' + that.activity_id + '&pickup_id=' + pickup.pickup_id,
				imageUrl: that.shareContent.shareImage.value,
				success: function(res) {
					console.log("转发成功");
				},
				fail: function(res) {
					console.log("转发失败");
				}
			};
		},
		methods: {
			// 从外部二维码扫码，带经纬度和外部标识external
			getExternal: function(pickup_id) {
				var that = this;
				var uri = app.getPath.getpickup;
				var data = {
					pickup_id: pickup_id
				};
				return new Promise(function(resolve, reject) {
					// 获取提货点
					common.ApiGateWayTest(uri, data, true, function(res) {
						if (res && res.data && res.data.success == 1) {
							var res = res.data.result.cities.pick_up;
							common.setStorage({
								key: 'getpickup',
								data: {
									'pickup_id': res.pickup_id,
									'cityName': res.pickup_name,
									'pickup_address': res.pickup_address,
									'pickup_contact': res.pickup_contact,
									'pickup_phone': res.pickup_phone,
									'pickup_type': res.pickup_type
								}
							}, function(res) {
								resolve('获取id成功');
							});
							common.setStorage({
								key: 'city',
								data: {
									'pickup_id': res.pickup_id,
									'warehouse_id': res.warehouse_id,
									'cityName': res.city_name,
									'is_pick_up': 1
								}
							});
						}
					});
				});
			},
			// 返回首页
			gotoHome: function() {
				wx.switchTab({
					url: '/pages/index/index'
				});
			},
			getActivity: function() {
				let that = this;
				wx.request({
					//正式服
					url: 'https://api.activity.haoyousheng.com.cn/api/ActivityApi/activityList',
					//测试服
					// url: 'https://api.t-activity.surex.cc/api/ActivityApi/activityList',
					data: {
						id: that.activity_id
					},
					method: 'post',
					success: function(res) {
						let item = res.data;
						let ItemsJson = JSON.stringify(item.pageList.items);
						let Items = ItemsJson.replace(/px/g, "");
						that.setData({
							ConfigStyle: item.pageList.config.style,
							Items: JSON.parse(Items),
							shareContent: item.pageList.config
						});
						wx.setNavigationBarTitle({
							title: item.pageList.title
						});

						for (var i = 0; i < that.Items.length; i++) {
							for (var k = 0; k < that.Items[i].children.length; k++) {
								if (that.Items[i].children[k].type == "countdown") {
									var newDate = new Date().getTime();
									var startDate = new Date(that.Items[i].children[k].data.time.value[0]).getTime();
									var endDate = new Date(that.Items[i].children[k].data.time.value[1]).getTime();

									if (newDate < startDate) {
										that.setData({
											countTimeType: 0,
											countTimeDate: startDate
										});
									} else {
										that.setData({
											countTimeType: 1,
											countTimeDate: endDate
										});
									}
								}
							}
						}

						console.log(that.countTimeDate);
					},
					fail: function(res) {
						wx.hideLoading();
					}
				});
			},
			imagesLoad: function(event) {
				var that = this;
				var data = event.detail;
				that.setData({
					preImageWidth: data.width,
					preImageHeight: data.height
				});
			},
			hotpotLink: function(e) {
				var that = this;
				var typeId = e.target.dataset.type;
				var id = e.target.dataset.id;

				if (typeId == 1) {
					var uri = app.getPath.addCoupon; // 判断是否登录

					var isOldUser = common.getStorageSync('isOldUser');

					if (!app.checkSessionKey || isOldUser == 2) {
						common.goRegister();
						return false;
					}

					var data = {
						coupon_id: id
					};
					common.ApiGateWayTest(uri, data, true, function(res) {
						if (res.statusCode == 200 && !res.data.result.error_desc) {
							if (res.data.result) {
								common.toast(res.data.result.state_desc);
								that.adclose(that.ad_id, 1);
							} else {
								common.toast(res.data.msg);
							}
						} else {
							common.toast(res.data.result.error_desc);
						}
					});
				} else if (typeId == 2) {
					wx.navigateTo({
						url: '../../pages/product/product?entryType=external&productId=' + id
					});
				} else if (typeId == 3) {
					wx.navigateTo({
						url: '../../pages/listdetail/listdetail?brand_id=' + id
					});
				} else if (typeId == 5) {
					wx.navigateTo({
						url: '../../pages/projectPage/projectPage?entryType=external&type=3&id=' + id
					});
				} else if (typeId == 6) {
					wx.navigateTo({
						url: '../../pages/projectPage/projectPage?entryType=external&type=5&id=' + id
					});
				} else if (typeId == 7) {
					wx.switchTab({
						url: '/pages/index/index'
					});
				} else if (typeId == 8) {
					// 判断是否登录
					var isOldUser = common.getStorageSync('isOldUser');

					if (!app.checkSessionKey || isOldUser == 2) {
						common.goRegister();
						return false;
					}

					var animation = wx.createAnimation({
						duration: 300,
						timingFunction: "linear",
						delay: 0
					});
					animation.translateY(300).opacity(1).step();
					that.setData({
						animationData: animation.export()
					});
					let uri = app.getPath.enrolluser;
					let data = {
						type: 1,
						activity_id: id
					};
					common.ApiGateWayTest(uri, data, true, function(res) {
						if (res.statusCode == 200) {
							if (res.data.result.status == 0) {
								var animation = wx.createAnimation({
									duration: 300,
									timingFunction: "linear",
									delay: 0
								});
								animation.translateY(300).opacity(1).step();
								that.setData({
									animationData: animation.export()
								});
								that.setData({
									join_id: id,
									showPhoneModal: true
								});
								setTimeout(function() {
									animation.translateY('-150px').translateX('-50%').step();
									that.setData({
										animationData: animation
									});

									if (e.currentTarget.dataset.status == 0) {
										that.setData({
											showPhoneModal: false
										});
									}
								}.bind(that), 200); // 是否data内有数据，无则为正常信息填写，有则为配置信息填写

								that.setData({
									field_data: res.data.result.data
								});
							} else {
								common.toast(res.data.result.msg);
							}
						} else {
							common.toast("网络错误请重试！");
						}
					});
				}
			},
			adclose: function(ad_id, is_close) {
				var that = this;
				var uri = app.getPath.adclose;
				var data = {
					ad_id,
					is_close
				};
				common.ApiGateWayTest(uri, data, true, function(res) {});
			},
			countdown: function() {
				var that = this;
			},
			phoneMaskSubmit: function() {
				let that = this;

				if (that.joinName.length == 0) {
					common.toast('请填写姓名');
					return;
				}

				if (that.joinPhone.length == 0) {
					common.toast('请填写手机号码');
					return;
				}

				if (that.joinAge.length == 0) {
					common.toast('请填写年龄');
					return;
				}

				if (that.joinFactory.length == 0) {
					common.toast('请填写工厂名称');
					return;
				}

				let uri = app.getPath.enrolluser;
				let data = {
					type: 2,
					real_name: that.joinName,
					mobile: that.joinPhone,
					factory_name: that.joinFactory,
					age: that.joinAge,
					activity_id: that.join_id
				};
				common.ApiGateWayTest(uri, data, true, function(res) {
					if (res.statusCode == 200) {
						that.setData({
							joinName: "",
							joinPhone: "",
							joinAge: "",
							joinFactory: "",
							showPhoneModal: false
						});
						common.toast(res.data.result.msg);
					} else {
						common.toast("网络错误请重试！");
					}
				});
			},
			phoneMaskCancel: function() {
				this.setData({
					joinName: "",
					joinPhone: "",
					joinAge: "",
					joinFactory: "",
					showPhoneModal: false
				});
			},
			inputInfo: function(e) {
				if (e.currentTarget.dataset.item == 1) {
					this.setData({
						joinName: e.detail.value
					});
				} else if (e.currentTarget.dataset.item == 2) {
					this.setData({
						joinPhone: e.detail.value
					});
				} else if (e.currentTarget.dataset.item == 3) {
					this.setData({
						joinAge: e.detail.value
					});
				} else if (e.currentTarget.dataset.item == 4) {
					this.setData({
						joinFactory: e.detail.value
					});
				}
			},
			// 弹窗动画js
			showSkuDrawerHandle: function() {
				const animation = wx.createAnimation({
					duration: 500,
					timingFunction: 'ease'
				});

				if (!this.showSkuDrawer) {
					animation.bottom(0).step();
				} else {
					animation.bottom(-700).step();
				}

				this.setData({
					skuAnimationData: animation.export(),
					showSkuDrawer: !this.showSkuDrawer
				});
			},
			// 选择规格  弹窗
			showSku: function(e) {
				var idx = e.currentTarget.dataset.idx;
				let field_list = this.field_data[idx].field_list;
				this.setData({
					select_label_name: this.field_data[idx].label_name,
					goods_id: this.field_data[idx].field_list[0].goods_id,
					selectedSkuArr: field_list,
					selected_field_idx: idx
				});
				this.showSkuDrawerHandle();
				this.selectGood();
			},
			selectGood: function(e) {
				if (e) {
					var index = e.currentTarget.dataset.index;
					var goods_id = e.currentTarget.dataset.goodid;
				} else {
					var index = 0;
					var goods_id = this.goods_id;
				}

				let properties = this.selectedSkuArr[index];
				this.setData({
					goods_id,
					good_idx: index,
					properties: properties,
					skuArr: []
				});
				let maybeStock = []; // 将所有规格提取成数组

				for (var i = 0; i < properties.spec_name.length; ++i) {
					var property = properties.spec_name[i];
					maybeStock[i] = [];

					for (var j = 0; j < property.attrs.length; j++) {
						maybeStock[i].push(property.attrs[j].id);
					}
				} // 获取笛卡尔积组合


				maybeStock = common.multiCartesian(maybeStock);
				this.maybeStock = maybeStock;
			},
			selectAttr: function(e) {
				// skuArr 当前选择的规格组合的存放数组
				// 规格组名index
				let idx = e.currentTarget.dataset.idx;
				let skuId = e.currentTarget.dataset.attr.id;
				var skuArr = this.skuArr.concat(); // 防止引用

				skuArr[idx] = skuId;

				if (this.properties.spec_name.length == skuArr.length) {
					var skuStr = skuArr.join('_');
					var btn = false;
					this.properties.spec_key.forEach(function(item) {
						if (item == skuStr) {
							btn = true;
						}
					});

					if (!btn) {
						common.toast('商品无库存');
						return false;
					}
				}

				this.setData({
					skuArr
				});
			},
			affirm: function() {
				var skuArr = this.skuArr;
				var str = this.properties.goods_name;

				if (skuArr.length < this.properties.spec_name.length) {
					common.toast('请选择规格');
					return false;
				}

				this.properties.spec_name.forEach(function(item, index) {
					for (var i in item.attrs) {
						if (item.attrs[i].id == skuArr[index]) {
							str += '/' + item.attrs[i].item;
						}
					}
				});
				var field_data = this.field_data;
				field_data[this.selected_field_idx].val = str;
				var field_upd_data = this.field_upd_data;
				field_upd_data[this.selected_field_idx] = this.goods_id + '+' + skuArr.join('_'); // return

				this.setData({
					field_upd_data,
					field_data
				});
				this.showSkuDrawerHandle();
			},
			// 输入框双向绑定
			inputBind: function(e) {
				let val = e.detail.value;
				let idx = e.target.dataset.idx;
				var field_upd_data = this.field_upd_data;
				field_upd_data[idx] = val;
				this.setData({
					field_upd_data
				});
			},
			// 提交
			field_upd: function() {
				var that = this;
				var fLen1 = this.field_upd_data.length;
				var fLen2 = this.field_data.length; // 判断是否为空

				if (fLen1 < fLen2) {
					common.toast('请填写所有数据');
					return false;
				}

				for (var i = 0; i < fLen2; i++) {
					if (this.field_upd_data[i] == undefined || this.field_upd_data[i] == '') {
						common.toast('请填写所有数据');
						return false;
					}
				}

				var field_data = this.field_data;
				var name_key = [];
				field_data.forEach(function(item) {
					name_key.push(item.field_id);
				}); // return;

				let uri = app.getPath.enrolluser;
				let data = {
					type: 2,
					name_key: name_key.join(','),
					name: this.field_upd_data.join(','),
					activity_id: that.join_id
				};
				common.ApiGateWayTest(uri, data, true, function(res) {
					if (res.statusCode == 200) {
						that.setData({
							joinName: "",
							joinPhone: "",
							joinAge: "",
							joinFactory: "",
							showPhoneModal: false
						});
						that.adclose(that.ad_id, 1);
						common.toast(res.data.result.msg);
					} else {
						common.toast("网络错误请重试！");
					}
				});
			},

			goProduct(e) {
				var that = this;
				var id = e.currentTarget.dataset.id;
				wx.navigateTo({
					url: '../../pages/product/product?entryType=external&productId=' + id
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
	@import "./activity.css";
</style>
