<template>
	<view>
		<!-- <view class="nav-bar-back" :style="'height:' + navBarHeight + 'px'">
			<view @tap="back" v-if="showBack" class="iconfont icon-btn_fanhuizuojiantoux"></view>
			<view class="navbar-box" :style="'height: ' + navBarHeight + 'px;opacity: ' + navbarOpacity">
				<view :style="'height: ' + navBarHeight + 'px'"></view>
				<view class="navbar-menu" :style="'height: ' + navBarHeight + 'px'">
					<view class="menu-left noborder">
						<view @tap="back" v-if="showBack" class="iconfont icon-btn_fanhuizuojiantoux"></view>
						<view @tap="backHome" v-if="!showBack" class="iconfont icon-btn_shangxiangshouyex"></view>
					</view>
					<view class="menu-title">
						<view class="goods-name">{{itemData.goods_name}}</view>
					</view>

				</view>
			</view>
		</view> -->
		<view :class="'container ' + (itemData.gallery ? 'show' : '')">
			<view class="goHomeFixed" @click.stop="gotoHome" v-if="isShowGoHome">
				<image :src="iconURL + '/product-icon-leftReturn.svg'" class="icon-leftReturn"></image>
				<text>返回首页</text>
			</view>
			<!--轮播商品图片-->
			<view class="goods-img-box">
				<swiper class="goods-img" indicator-dots="true" indicator-active-color="#ffe150">
					<swiper-item v-for="(item, index) in itemData.gallery" :key="index">
						<image @tap="setPreviewImage" :data-current="item.src" @load="swiperImageLoad" :src="item.msrc" :class="'slide-image ' + (swiperImgBl == true ? 'loaded' : '')"></image>
					</swiper-item>
				</swiper>
				<view class="limit-box" v-if="itemData.is_limit==1">
					<view class="limit-bargain">
						<view class="limit-num">
							限量{{itemData.store_count}}件
						</view>
						<view class="limit-only" :style="'background-image:url(' + iconURL + '/limit-only.png) '">
							仅剩<i>{{itemData.actual_store_count}}</i>件
						</view>
					</view>
				</view>
			</view>


			<view class="goods-header-price">
				<view class="bargain-new-box">
					<view class="bargain-new row" v-if="itemData.is_new_activity_user==1">
						<view class="i">
							新人专享
						</view>
					</view>
					<view class="goods-price">
						<view class="less-title">砍完</view>
						<view class="i">¥</view>
						<view class="less-price">{{itemData.floor_price}}</view>
						<view class="shop-price">¥{{itemData.shop_price}}</view>
					</view>
				</view>

				<!-- <form report-submit='true' bindsubmit='shareFromId'>
      <button class='team-share row' form-type='submit' open-type='share'>
        <image src='{{iconURL}}/product-icon-share.svg'></image>
        <text>分享</text>
      </button>
    </form> -->
				<view v-if="itemData.time_status != 2" class="goods-header-right">
					<view class="text">{{itemData.time_status == 1 ? "距活动结束" : "距活动开始"}}</view>
					<view class="time"><span v-if="ad != '00'">{{ad}}</span><i v-if="ad != '00'">天</i><span>{{ah}}</span><i>时</i><span>{{am}}</span><i>分</i><span>{{as}}</span><i>秒</i></view>
				</view>
				<view v-if="itemData.time_status == 2" class="goods-header-right">
					<view class="text">活动已结束</view>
				</view>
			</view>

			<view class="goods-name-box">
				<view class="goods-name">
					<view class="team-tips-box" v-if="itemData.label_list.length>0">
						<view v-for="(tips, tipsindex) in itemData.label_list" :key="tipsindex" :class="'team-tips ' + (tips.type==2?'tips-active':'')">{{tips.name}}</view>
					</view>
					<text>{{itemData.goods_name}}</text>
				</view>
				<view class="goods-desc">
					{{itemData.goods_remark}}
				</view>
				<view class="row bargain-num2 bargain-num ">
					<view class="text text2">每人限购{{itemData.limit_number}}份</view>
					<view class="count-num" v-if="itemData.bargain_coupon_num > 0">拥有
						<i>{{itemData.bargain_coupon_num}}</i>张砍价券</view>
					<!-- <view class="all-bargain-font">
						每个用户仅<i class="i">{{itemData.limit_number}}</i>次机会购买该砍价商品
					</view>
					<view class="now-bargain-num">
						当前可用：砍价<i class="i">{{itemData.bargain_count}}</i>次，帮砍无限制
					</view> -->
				</view>
				<view class="newlyweds-img" v-if="itemData.services_title.length > 0">
					<view class="newlyweds-img-box">
						<text class="iconfont icon-yuanzhuangzhengpin newLywds-icon"></text>
						<text>{{itemData.services_title[0]}}</text>
					</view>
					<view class="newlyweds-img-box">
						<text class="iconfont icon-img_jisutihuox newLywds-icon"></text>
						<text>{{itemData.services_title[1]}}</text>
					</view>
					<view class="newlyweds-img-box">
						<text class="iconfont icon-bianjietihuo newLywds-icon"></text>
						<text>{{itemData.services_title[2]}}</text>
					</view>
					<view class="newlyweds-img-box">
						<text class="iconfont icon-fangxingoumai newLywds-icon"></text>
						<text>{{itemData.services_title[3]}}</text>
					</view>
				</view>
			</view>


			<!--低价规则-->
			<view class="rule" @tap="showRule">
				<text>低价攻略: 邀请好友帮忙砍价，即享最低价 >></text>
			</view>

			<!--商品详情-->
			<view class="goods-product">
				<view class="product-font">
					商品详情
				</view>
				<image class="product-img" v-for="(item, index) in itemData.goods_content" :key="index" :style="'height:' + item.height + 'rpx'"
				 :src="item.width_img"></image>
			</view>


			<!--浮动按钮-->
			<view class="bottom-box" :style="'padding-bottom:' + iphoneXBottom">
				<view class="box-left">
					<view class="load-icon" @tap="gotoHome">
						<image :src="iconURL + '/sxsy.svg'"></image>
						<text>首页</text>
					</view>
					<view class="load-icon">
						<image :src="iconURL + '/product_contact_v2.svg'"></image>
						<text>客服</text>
						<button open-type="contact" class="icon-contact" session-from="商品详情" :send-message-title="itemData.goods_name"
						 :send-message-path="'/packageA/bargain/bargain?activity_bargain_id=' + itemData.activity_bargain_id"
						 :send-message-img="itemData.gallery[0].msrc" show-message-card="true"></button>
					</view>
				</view>
				<view class="box-right">
					<view class="row" v-if="!buttonDisplay && itemData.is_floor_price == 0 && itemData.time_status != 0">
						<form report-submit="true" @submit="goShop" data-shop-type="0">
							<button class="direct-buy" form-type="submit">
								<view class="direct-price-buy">
									购买(¥{{itemData.buy_price}})
								</view>
							</button>
						</form>
						<form report-submit="true" @submit="getBargainBySelf" v-if="!itemData.is_bargain && itemData.bargain_count != 0 && itemData.bargain_activity_status == 1 && itemData.time_status == 1">
							<button class="to-bargain" form-type="submit">
								{{itemData.is_new_activity_user==1?'新人最低价':'砍破最低价'}}¥{{itemData.floor_price}}
							</button>
						</form>
						<form v-else-if="!itemData.is_bargain && itemData.bargain_count == 0 && itemData.bargain_activity_status == 1 && itemData.time_status == 1">
							<button class="to-bargain no-cont">
								次数已用完
							</button>
						</form>
						<form v-else-if="!itemData.is_bargain && itemData.bargain_count != 0 && itemData.bargain_activity_status == 1 && itemData.time_status == 0">
							<button class="to-bargain no-cont">
								即将开抢
							</button>
						</form>
						<form report-submit="true" @submit="goBranging" v-if="itemData.is_bargain">
							<button class="direct-buy ing" form-type="submit">
								<view class="direct-end">
									<view class="direct-price">继续砍价</view>
									<view class="direct-font">距砍价结束仅剩 {{h}}:{{m}}:{{s}}</view>
								</view>
							</button>
						</form>
					</view>
					<form report-submit="true" @submit="goShop" data-shop-type="1" v-if="!buttonDisplay && itemData.is_floor_price == 1 && itemData.is_bargain">
						<button class="direct-buy over" form-type="submit">
							<view class="direct-end">
								<view class="direct-price">已砍最低，立即购买
									<i class="i">¥</i>{{itemData.buy_price}}</view>
								<view class="direct-font">支付倒计时 {{h}}:{{m}}:{{s}}</view>
							</view>
						</button>
					</form>
					<form report-submit='true' @submit='shareRedEnvelopes' v-if="!buttonDisplay && !itemData.is_bargain && itemData.bargain_count != 0 && itemData.bargain_activity_status == 1 && itemData.time_status == 0 && !itemData.is_notice">
						<button class="direct-buy over" form-type='submit' open-type="is_login ? 'share' : ''">
							分享领<i style="color: #eb3c39">{{itemData.coupon_price}}</i>元礼包
						</button>
					</form>
					<button class="bargin-btn-display" disabled v-if="!buttonDisplay && !itemData.is_bargain && itemData.bargain_count != 0 && itemData.bargain_activity_status == 1 && itemData.time_status == 0 && itemData.is_notice">
						{{itemData.notice_text}}
					</button>
					<button class="bargin-btn-display" v-if="buttonDisplay">
						{{buttonDisplayText}}
					</button>
				</view>
			</view>
		</view>
		<!-- 我的砍价按钮 -->
		<view class="my-brangin-btn" @tap="goMyBrangin">
			<view class="i">我的</view>
			<view>砍价</view>
		</view>

		<!--规则黑透弹窗-->
		<view :class="'rules-pop-hold ' + (showRules?'hide':'show')">
			<view class="rules-pop">
				<view class="rules-content">
					<view class="rules-title">低价购买攻略</view>
					<view class="rules-line"></view>
					<!-- 活动规则内容 -->
					<scroll-view class="rules-text-box" scroll-y="true">
						<view class="rules-text" v-for="(item, index) in rule.rule_content" :key="index">
							<text>{{item}}</text>
						</view>
					</scroll-view>
				</view>
				<form report-submit="true" @submit="showRule">
					<button :class="'iconfont icon-btn_guanbianniux icon-closs ' + (showRules?'hide':'show')" form-type="submit"></button>
				</form>
			</view>

			<view class="rules-pop-md" @tap="showRule"></view>
		</view>

		<!-- 位置信息设置 -->
		<view class="drawer_screen" v-if="showSettingModalStatus"></view>
		<view class="tc_manu_box" v-if="showSettingModalStatus">
			<view class="tc_manu_items">
				<view class="manu_header">权限提示</view>
				<view class="manu-margin">
					<view class="tc-text">您未打开目前位置，部分功能将受到影响，请点击前往设置开启</view>
				</view>
				<view class="manu-buttons row">
					<button @tap="settingModalStatus">取消</button>
					<button class="button-primary" @tap="goSetting">前往设置</button>
				</view>
			</view>
		</view>

		<view class="top-mask" v-if="showTopMask"></view>
		<loading v-if="loadingShow"></loading>
	</view>
</template>

<script>
	// packageA/bargain/bargain.js
	//获取应用实例
	var app = getApp().globalData;
	var common = require("../../utils/common.js");
	var event = require("../../utils/event.js");

	export default {
		data() {
			return {
				iconURL: app.dataBase.iconURL,
				showSettingModalStatus: false,
				showRank: 3,
				showMoreRank: true,
				d: "00",
				h: "00",
				m: "00",
				s: "00",
				ad: "00",
				ah: "00",
				am: "00",
				as: "00",
				ahs: 0,
				isShowGoHome: false,
				showRules: true,
				persentBox: 50,
				buttonDisplay: false,
				activity_bargain_id: 0,
				bargaining_id: 0,
				buttonDisplayText: '商品已抢光,正在补货中~',
				itemData: {},
				bargainBySelfInfo: {},
				swiperImgBl: false,
				iphoneXBottom: "0rpx",
				rule: {},
				// navbar
				navbarOpacity: 0,
				showBack: false,
				navBarHeight: app.navBarHeight,
				entryData: "",
				is_login: true,
			};
		},

		components: {},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			var that = this;
			that.activity_bargain_id = options.activity_bargain_id;
			var page = getCurrentPages();

			if (page.length > 1) {
				that.setData({
					showBack: true
				});
			} // 从外部分享进入时，显示左上角回到首页  改动带external时为内部进入携带参数，外部进入不带参数


			if (options && options.entryType && options.entryType == 'external') {
				this.setData({
					isShowGoHome: false
				});
			} else {
				this.setData({
					isShowGoHome: true
				});
			} // 外部带商品店铺


			that.setData({
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

			wx.getSystemInfo({
				success: function(res) {
					var model = res.model;

					if (model.search('iPhone X') != -1) {
						that.setData({
							iphoneXBottom: '68rpx'
						});
					}
				}
			});
		},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			var that = this;
			that.getBaseInfo();
			
		},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function(e) {
			var that = this;
			var pickup = common.getStorageSync('getpickup');
			return {
				title: that.itemData.bargain_share_title,
				path: '/packageA/bargain/bargain?activity_bargain_id=' + that.itemData.activity_bargain_id + '&pickup_id=' +
					pickup.pickup_id,
				imageUrl: that.itemData.bargain_share_img
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

			// 点击查看更多排行榜信息
			showMoreRank2() {
				this.setData({
					showRank: 5,
					showMoreRank: false
				});
			},

			// 倒计时函数
			countDown(endtime) {
				var that = this;
				var nowtime = new Date().getTime() / 1000;
				var lesstime = endtime - nowtime;
				clearInterval(that.timeStart);
				that.timeStart = setInterval(() => {
					if (lesstime > 0) {
						lesstime--;
						var d = parseInt(lesstime / 60 / 60 / 24);
						var h = parseInt(lesstime / 60 / 60 % 24) + d * 24;
						var m = parseInt(lesstime / 60 % 60);
						var s = parseInt(lesstime % 60);

						if (h < 10) {
							h = "0" + h;
						}

						if (m < 10) {
							m = "0" + m;
						}

						if (s < 10) {
							s = "0" + s;
						}

						that.setData({
							h: h,
							m: m,
							s: s
						});
					} else {
						clearInterval(that.timeStart);
						that.getBaseInfo();
					}
				}, 1000);
			},

			// 倒计时函数
			countDownB(endtime) {
				var that = this;
				var nowtime = new Date().getTime() / 1000;
				var lesstime = endtime - nowtime;
				clearInterval(that.timeStartB);
				that.timeStartB = setInterval(() => {
					if (lesstime > 0) {
						lesstime--;
						var d = parseInt(lesstime / 60 / 60 / 24);
						var h = parseInt(lesstime / 60 / 60 % 24);
						var m = parseInt(lesstime / 60 % 60);
						var s = parseInt(lesstime % 60);

						if (h < 10) {
							h = "0" + h;
						}

						if (m < 10) {
							m = "0" + m;
						}

						if (s < 10) {
							s = "0" + s;
						}

						that.setData({
							ad: d < 10 ? "0" + d : d,
							ah: h,
							am: m,
							as: s
						});
					} else {
						clearInterval(that.timeStartB);
						that.getBaseInfo();
					}
				}, 1000);
			},

			// 毫秒倒计时
			hsCountTime: function() {
				var time = 9;
				setInterval(() => {
					time--;

					if (time < 0) {
						time = 9;
					}

					this.setData({
						ahs: time
					});
				}, 100);
			},

			//规则的显示隐藏
			showRule(e) {
				var that = this;
				common.formIdUpdate(e);
				this.setData({
					showRules: !that.showRules
				});
			},

			// 砍价活动详情
			getBaseInfo() {
				var that = this;
				var uri = app.getPath.getBargainGoodsInfo;
				var data = {
					activity_bargain_id: that.activity_bargain_id
				};
				common.ApiGateWayTest(uri, data, true, function(res) {
					var resData = res.data;

					if (resData.success == 1) {
						that.activity_bargain_id = resData.result.activity_bargain_id;
						that.bargaining_id = resData.result.activity_bargaining_id;
						resData.result.floor_price = parseFloat(resData.result.floor_price);
						resData.result.shop_price = parseFloat(resData.result.shop_price);
						that.setData({
							itemData: resData.result
						});
						uni.setNavigationBarTitle({
						    title: resData.result.goods_name
						});
						if (resData.result.time_status == 0 && !resData.result.is_notice) {
							var isOldUser = common.getStorageSync('isOldUser');
							if (!app.checkSessionKey || isOldUser == 2) {
								that.setData({
									is_login: false
								})
							}
						}
						that.verificationShop();
						that.getTeamRule();
						var nowtime = new Date().getTime() / 1000;

						if (resData.result.end_time > nowtime) {
							that.countDown(resData.result.end_time);
						}

						if (resData.result.time_status != 2) {
							if (resData.result.time_status == 1) {
								that.countDownB(resData.result.activity_end_time);
							} else {
								that.countDownB(resData.result.activity_start_time);
							}
						}
					} else {
						common.toast(res.data.msg);
						return;
					}
					common.hideLoad(that);
				});
			},

			// 验证商品是否可以购买
			verificationShop() {
				var that = this;

				if (that.itemData.is_on_sale != 1) {
					that.setData({
						buttonDisplayText: '商品已下架',
						buttonDisplay: true
					});
					return;
				}

				if (that.itemData.is_enough != 1) {
					that.setData({
						buttonDisplayText: '商品已抢光，正在补货中~',
						buttonDisplay: true
					});
					return;
				}

				if (that.itemData.time_status == 2 && that.itemData.bargain_activity_status == 0) {
					that.setData({
						buttonDisplayText: '活动已结束',
						buttonDisplay: true
					});
					return;
				}
			},

			// 轮播画廊
			setPreviewImage: function(e) {
				var that = this;
				var current = e.currentTarget.dataset.current;
				var imgUrl = that.itemData.gallery.map(item => {
					return item.src;
				});
				wx.previewImage({
					current: current,
					urls: imgUrl
				});
			},
			// 轮播图片加载完成
			swiperImageLoad: function() {
				var that = this;
				that.setData({
					swiperImgBl: true
				});
			},

			// 创建砍价活动
			getBargainBySelf(e) {
				var that = this; // 未登录跳转

				var isOldUser = common.getStorageSync('isOldUser');

				if (!app.checkSessionKey || isOldUser == 2) {
					common.goRegister();
					return false;
				}

				common.formIdUpdate(e);
				common.showLoad(this);
				var itemData = that.itemData;
				var checkOrderUri = app.getPath.preCheckOrder;
				var orderProduct = [{
					goods_id: itemData.goods_id,
					sku_key: itemData.stock[0].key,
					num: 1
				}];
				orderProduct = JSON.stringify(orderProduct);
				var checkOrderData = {
					order_product: orderProduct,
					activity_bargaining_id: itemData.activity_bargaining_id ? itemData.activity_bargaining_id : 0,
					time_atitude: app.dataBase.userAtitude
				};
				var uri = app.getPath.bargainBySelf;
				var data = {
					activity_bargain_id: that.activity_bargain_id
				};
				common.ApiGateWayTest(checkOrderUri, checkOrderData, true, function(resData) {
					if (resData.data.success == 1) {
						common.ApiGateWayTest(uri, data, true, function(res) {
							var resData = res.data;

							if (resData.success == 1) {
								that.bargaining_id = resData.result.activity_bargaining_id;
								wx.navigateTo({
									url: '../bargainshare/bargainshare?bargaining_id=' + resData.result.activity_bargaining_id +
										'&self_info=' + JSON.stringify(resData.result)
								});
							} else {
								common.toast(res.data.msg);
								return;
							}
						});
					} else {
						common.toast(resData.data.msg);
						return;
					}

					setTimeout(() => {
						common.hideLoad(that);
					}, 2000);
				});
			},

			// 单独购买
			goShop(e) {
				var that = this;
				var shopType = e.currentTarget.dataset.shopType; // 未登录跳转

				var isOldUser = common.getStorageSync('isOldUser');

				if (!app.checkSessionKey || isOldUser == 2) {
					common.goRegister();
					return false;
				}

				common.formIdUpdate(e);

				if (shopType == 0) {
					common.showModal('砍价成功后，您可以用更低的价格进行购买，您还确定要购买吗？', '继续购买', function(res) {
						if (res.confirm) {
							next();
						}
					});
				} else if (shopType == 1) {
					next();
				}

				function next() {
					var itemData = that.itemData;
					var checkOrderUri = app.getPath.preCheckOrder;
					var orderProduct = [{
						goods_id: itemData.goods_id,
						sku_key: itemData.stock[0].key,
						num: 1
					}];
					orderProduct = JSON.stringify(orderProduct);
					var checkOrderData = {
						order_product: orderProduct,
						activity_bargaining_id: itemData.activity_bargaining_id ? itemData.activity_bargaining_id : 0,
						time_atitude: app.dataBase.userAtitude
					};
					common.ApiGateWayTest(checkOrderUri, checkOrderData, true, function(resData) {
						if (resData.data.success == 1) {
							// 缓存跳转确认订单页面
							var datas = [{
								goods_id: itemData.goods_id,
								sku_key: itemData.stock[0].key,
								amount: 1,
								team_order: 0,
								activity_bargaining_id: itemData.activity_bargaining_id,
								activity_bargain_id: itemData.activity_bargain_id,
								channel: 1
							}];
							common.setStorage({
								key: "nowPay",
								data: datas
							});
							wx.navigateTo({
								url: '/pages/confirm/confirm'
							});
						} else {
							common.toast(resData.data.msg);
							return;
						}
					});
				}
			},

			//获取拼团规则
			getTeamRule() {
				var that = this;
				var uri = app.getPath.bargainRule;
				var data = {
					activity_bargain_id: that.activity_bargain_id
				};
				common.ApiGateWayTest(uri, data, true, function(res) {
					that.setData({
						rule: res.data.result.rule
					});
				});
			},

			// 分享隐藏
			shareFromId(e) {
				var that = this;
				common.formIdUpdate(e);
				common.showLoad(this);
				setTimeout(() => {
					common.hideLoad(that);
				}, 2000);
			},

			// 返回首页
			gotoHome: function() {
				wx.switchTab({
					url: '/pages/index/index'
				});
			},
			// 我的砍价
			goMyBrangin: function() {
				wx.navigateTo({
					url: '../mybargain/mybargain'
				});
			},

			// 前往砍价页面
			goBranging(e) {
				var that = this;
				common.formIdUpdate(e);
				wx.navigateTo({
					url: '../bargainshare/bargainshare?bargaining_id=' + that.bargaining_id
				});
			},

			onPageScroll(e) {
				var that = this;

				if (that.navbarOpacity < 1 && e.scrollTop > 100) {
					that.setData({
						navbarOpacity: e.scrollTop / 500
					});
				} else if (that.navbarOpacity > 0 && e.scrollTop < 200) {
					that.setData({
						navbarOpacity: e.scrollTop / 500
					});
				}
			},

			back: function() {
				wx.navigateBack({
					delta: 1
				});
			},
			backHome: function() {
				wx.switchTab({
					url: '/pages/index/index'
				});
			},
			// 分享领红包
			shareRedEnvelopes: function(e) {
				var that = this;
				// 未登录跳转
				var isOldUser = common.getStorageSync('isOldUser');
				if (!app.checkSessionKey || isOldUser == 2) {
					common.goRegister();
					return false;
				}
				common.formIdUpdate(e);
				var url = app.getPath.bargainNotice;
				var data = {
					activity_bargain_id: that.activity_bargain_id
				}
				common.ApiGateWayTest(url, data, true, function(res) {
					var resData = res.data;
					if (resData.success == 1) {
						if (resData.result.status == 1) {
							that.data.popupShow = true;
						}
					} else {
						common.toast(resData.msg);
						return;
					}
				})
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
	@import "./bargain.css";

	.text2 {
		color: #eb3c39;
		font-size: 28rpx;
		width: 50%;
	}

	.bargain-num2 {
		background-color: transparent !important;
		display: flex;
		margin-top: 16rpx;
		width: 100%;
		color: #333;
		text-align: left !important;
	}
</style>
