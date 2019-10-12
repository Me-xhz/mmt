<template>
	<view>
		<!--pages/order/detail.wxml-->
		<!-- 订单状态 -->
		<view class="container detail-loader">
			<!-- 返回首页悬浮框/分享进入显示 -->
			<view class="goHomeFixed" @click.stop="gotoHome" v-if="isShowGoHome">
				<image :src="iconURL + '/product-icon-leftReturn.svg'" class="icon-leftReturn"></image>
				<text>返回首页</text>
			</view>

			<view class="order-info status-header">
				<view class="info-price">
					<text class="header-status">{{order.status_desc}}</text>
					<view class="group-time" v-if="order.status == 12"><text>{{h}}:{{m}}:{{s}}</text>后未成团自动取消订单</view>
					<!-- <view class='header-status-tip' wx:if="{{order.status == 6}}">本次交易获得{{order.points}}个买买提积分</view> -->
					<!-- <text class="header-status" wx:if="{{order.status == ORDER_STATUS.CREATED}}">等待买家支付</text>
      <text class="header-status" wx:if="{{order.status == ORDER_STATUS.PAID}}">等待卖家发货</text>
      <text class="header-status" wx:if="{{order.status == ORDER_STATUS.PREPARING}}">等待快递揽收</text>
      <text class='header-status' wx:if="{{order.status == ORDER_STATUS.DELIVERING}}">等待买家收货</text>
      <text class='header-status' wx:if="{{order.status == ORDER_STATUS.DELIVERIED}}">交易成功</text>
      <text class='header-status' wx:if="{{order.status == ORDER_STATUS.FINISHED}}">交易成功</text>
      <text class="header-status" wx:if="{{order.status == ORDER_STATUS.CANCELLED}}">交易取消</text>
      <text class="header-status" wx:if="{{order.status == ORDER_STATUS.COMPLETE}}">交易关闭</text> -->
				</view>
				<view class="info-online">
					<view class="iconfont icon-img_dengdaimaijiazhifux" v-if="order.status == ORDER_STATUS.CREATED"></view>
					<view class="iconfont icon-img_dengdaishangpinpeisongx" v-if="order.status == ORDER_STATUS.PAID||order.status == ORDER_STATUS.PREPARING"></view>
					<view class="iconfont icon-img_dengdaimaijiatihuox" v-if="order.status == ORDER_STATUS.PICKING"></view>
					<view class="iconfont icon-img_jiaoyichenggongx" v-if="order.status == ORDER_STATUS.COMMENTING||order.status == ORDER_STATUS.FINISHED"></view>
					<view class="iconfont icon-img_dingdanyiquxiaox" v-if="order.status == ORDER_STATUS.CANCELLED"></view>
					<image class="group-bag" v-if="order.status == 12" :src="iconURL + '/group-bagicon.png'"></image>
					<!-- <view class='iconfont icon-img_tuikuanchenggongx'></view> -->
				</view>
			</view>
			<!-- 收货信息 -->
			<view class="order-address ">
				<view class="address-contact">
					<span class="info-leftshift">{{order.consignee.name}} {{order.consignee.mobile}}</span>
				</view>
				<view class="address-detail ellipsis">
					<span class="info-leftshift ">{{order.consignee.address}} {{order.consignee.pickup_address}}</span>
				</view>
				<view class="address-detail" v-if="(order.consignee.pickup_contact||order.consignee.pickup_phone)">
					<span class="info-leftshift t2">便利店店主：</span>
					<span class="info-leftshift t2">{{order.consignee.pickup_contact}} {{order.consignee.pickup_phone}}</span>
				</view>
				<view class="storeManager" v-if="(order.consignee.pickup_contact||order.consignee.pickup_phone)" @click.stop="callManager"
				 :data-tel="order.consignee.pickup_phone">
					<image class="tel_icon" :src="iconURL + '/phone_blue.png'"></image>
					<text>联系店主</text>
				</view>
				<view class="address-tab iconfont icon-img_dizhix">
				</view>
			</view>
			<!-- 引导闪购 -->
			<view class="shop-img" v-if="showCountMode" @tap="goShop">
				<image class="image-mode" mode="widthFix" :src="shopCouponImg[0].ad_code"></image>
			</view>
			<!-- 提货码 -->
			<view class="qrCode" v-if="order.status == ORDER_STATUS.PICKING">
				<view class="qr">
					<canvas class="canvas" :style="'width:' + qrcodeWidth + 'px; height:' + qrcodeWidth + 'px;'" canvas-id="canvas"
					 @longtap="save"></canvas>
				</view>
				<view class="code">
					<text class="small">提货码：</text>
					<text>{{order.get_sn}}</text>
				</view>
				<view class="des">
					<view>提货时请向工作人员出示提货码</view>
					<view>请勿将提货码告知他人，防止包裹丢失</view>
				</view>
			</view>
			<!-- 商品信息 -->
			<view class="order-list">
				<view class="list-item">
					<view class="order-main">
						<!-- <view class='goods-fms'  wx:if="{{order.status == ORDER_STATUS.DELIVERING || order.status == ORDER_STATUS.DELIVERIED || order.status == ORDER_STATUS.FINISHED}}">
          <span class="fms-no">包裹{{delivery_id + 1}}</span>
          <span class="fms-num">({{goods_formate.delivery_goods_num}}件商品)</span>
          <span catchtap="touchExpress" wx:if="{{goods_formate.is_send != 0}}" data-order='{{order}}' data-delivery_id='{{goods_formate.delivery_id}}'>
            <span class="fms-check">查看物流</span>
            <image class="fms-arrow" mode='widthFix' src="{{iconURL}}/icon_right_arrow.png" />
          </span>
          <span wx:else>
            <span class="fms-check">尚未发货</span>
          </span>
        </view> -->
						<view class="date_wrap">
							<view class="tab" style="background-color:#ffe150;color:#555555">{{order.shippingTimeDesc}}</view>
							<!-- <view class='des'>{{order.shippingTimeDesc}}</view> -->
						</view>
						<view class="goods-item" @tap="goprodcut" :data-product-id="goods.goods_id" v-for="(goods, index) in order.products"
						 :key="index">
							<view class="item-photo">
								<image :src="goods.header_img"></image>
							</view>
							<view class="item-info">
								<view class="info-name">
									<text>{{goods.goods_name}}</text>
								</view>
								<view class="info-attr w80">
									<text>{{goods.sku_key_name}}</text>
								</view>
								<view class="info-price">
									<text class="icon-rmb">¥</text>{{goods.shop_price}}
								</view>
								<view class="info-amount">x{{goods.amount}}</view>
								<view class="info-return" @click.stop="go_application_return" :data-goods="goods" v-if="goods.back_info.back_btn == 1">
									{{goods.back_info.show_back_status}}
								</view>
							</view>
						</view>
					</view>
					<view :class="'item-footer ' + (order.status != ORDER_STATUS.CREATED && order.status != ORDER_STATUS.DELIVERING && order.status != ORDER_STATUS.DELIVERIED && order.status != ORDER_STATUS.FINISHED ? 'no-border' : '') + ' ' + (order.order_source=='qqwallet' ? 'multi-line' : '')">
						<view class="footer-sum b-bottom">
							<view>
								<text class="sum-nums">共{{order.goods_count}}件商品</text>
							</view>
						</view>
					</view>
					<view class="footer-fix" v-if="order.order_btn.back_btn == 1||order.order_btn.pay_btn == 1 || order.order_btn.cancel_btn == 1 || order.order_btn.comment_again_btn == 1 || order.order_btn.comment_btn == 1 || order.order_btn.receive_btn == 1">
						<button type="default" class="footer-button" v-if="order.order_btn.cancel_btn == 1" @click.stop="touchCancel"
						 :data-order-id="order.order_id">取消订单</button>
						<button style="background-color:#ffe150;color:#555!important" class="footer-button" v-if="order.order_btn.pay_btn == 1"
						 @click.stop="touchPay" :data-order-id="order.order_id">
							立即支付
						</button>
						<button class="footer-button y-button" v-if="order.order_btn.receive_btn == 1" @click.stop="touchConfirm"
						 :data-order-id="order.order_id">确认收货</button>
						<button class="footer-button y-button" v-if="order.order_btn.comment_btn == 1" @click.stop="touchComment"
						 :data-order-id="order.order_id">立即评价</button>
						<button class="footer-button y-button" v-if="order.order_btn.comment_again_btn == 1" @click.stop="touchSubComment"
						 :data-order-id="order.order_id">追加评价</button>
						<button type="default" class="footer-button" v-if="order.order_btn.back_btn == 1" @click.stop="refund"
						 :data-order-id="order.order_id">申请退款</button>
					</view>
				</view>
			</view>

			<view class="order-summury">
				<view class="summury-detail">
					商品合计
					<text class="total-price">
						<text>¥</text>{{order.total_goods_price}}
					</text>
				</view>
				<view class="summury-detail" v-for="(item, index) in order.prom_info" :key="index">
					{{item.prom_name}}
					<text class="total-price">{{item.value}}
					</text>
				</view>
				<!-- <view class="summury-detail">
      运费
      <span class="total-price"><i class='icon_rmb' wx:if='{{order.shipping_info.show_type == 1}}'>¥</i>{{order.shipping_info.value}}</span>
    </view> -->
				<view class="summury-total">
					实付款
					<span class="total-price">
						<text class="icon_rmb">¥</text>{{order.order_amount}}
					</span>
				</view>
			</view>
			<view class="group-status" v-if="order.found_id>0" @tap="toDetail">
				<text>{{order.team_info.status_desc}}</text>
				<view class="group-headimg">
					<image class="headimg" v-for="(item, index) in order.team_info.team_img" :key="index" v-if="index<3" :src="item"></image>
					<image v-if="order.team_info.team_img.length>3" class="headimg" :src="iconURL + '/morepeople.png'"></image>
					<text class="iconfont icon-btn_xiangyoudajiantoux right-status">

					</text>
				</view>
			</view>
			<view class="order-info">
				<view class="info-text">
					<text>下单时间：{{order.add_time}}</text>
				</view>
				<view class="info-text">
					<text>订单编号：{{order.order_sn}}</text>
					<view class="info-Clip" @tap="setClipboard">
						<button type="default" hover-class="none">复制单号</button>
					</view>
				</view>

			</view>


			<!-- <view class='tc' bindtap='goHome'>
    <span class='text_content_small color_large_gray'>回到首页去逛逛</span>
    <image class='gohomeImage' src='{{iconURL}}/icon_right_arrow.png'></image>
  </view> -->
		</view>
		<!-- <view class="order-kf">
  <view class="kf-time">
    服务时间：9:00-23:00
  </view>
  <view class="kf-type row">
    <view class="col w50 kf-ol">
      <button open-type='contact' hover-class="none" session-from='cilicili'>
        <image src="{{iconURL}}/icon_kfOnline.png"></image>
        <text>在线客服</text>
      </button>
    </view>
    <view bindtap='phoneCall' class="col w50 kf-ol no-margin">
      <image src="{{iconURL}}/icon_kfTel.png" />
      <text>电话客服</text>
    </view>
  </view>
</view> -->

		<!--申请原因-->
		<view class="drawer_screen" catchtouchmove="true" @click.stop="setModalStatus" data-status="0" v-if="showfwModalStatus"></view>
		<view class="action-modal" :animation="animationData" v-if="showfwModalStatus">
			<view class="title">选择申请原因</view>
			<picker-view class="modal-inner" indicator-class="pick_item" :value="value">
				<picker-view-column>
					<view v-for="(item, index) in reasons" :key="index" class="pick_item" @click.stop="setReasonBefore" data-status="1"
					 :data-item="item">{{item}}</view>
				</picker-view-column>
			</picker-view>
		</view>

		<!--查看拼团详情和分享参团-->
		<view class="group-btn-box" :style="'padding-bottom:' + iphoneXBottom" v-if="order.status == 12">
			<view>
				<form report-submit="true" @submit="toDetail">
					<button class="group-detail" form-type="submit">查看拼团详情</button>
				</form>
				<form report-submit="true" @submit="toShare">
					<button form-type="submit" class="group-share" open-type="share">喊工友参团</button>
				</form>
			</view>
		</view>

		<loading v-if="loadingShow"></loading>
	</view>
</template>

<script>
	var app = getApp().globalData;
	var common = require("../../utils/common.js");
	const QRCode = require("../../utils/qrcode/weapp-qrcode.js");
	import rpx2px from "../../utils/qrcode/rpx2px";
	let qrcode; // 300rpx 在6s上为 150px
	// 300rpx 在6s上为 150px
	const qrcodeWidth = rpx2px(300); // pages/order/detail.js

	export default {
		data() {
			return {
				iconURL: app.dataBase.iconURL,
				ORDER_STATUS: app.ORDER_STATUS,
				reasons: ['多拍/拍错/不想要', '缺货'],
				iphoneXBottom: '0rpx',
				order_id: "",
				order: {},
				h: '00',
				m: '00',
				s: '00',
				qrcodeWidth: qrcodeWidth,
				showCountMode: false,
				shopCouponImg: '',
				isShowGoHome: false,
				orderId: "",
				animationData: "",
				showfwModalStatus: false,
				textareaHidden: false
			};
		},

		components: {},
		props: {},
		onLoad: function(options) {
			var that = this;
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

			if (options == undefined || options.orderId == undefined) {
				common.toast("请求参数错误");
				return;
			} // 从外部分享进入时，显示左上角回到首页  改动带external时为内部进入携带参数，外部进入不带参数


			if (options && options.entryType && options.entryType == 'external') {
				this.setData({
					isShowGoHome: false
				});
			} else {
				this.setData({
					isShowGoHome: true
				});
			}

			var orderid = options.orderId;
			this.setData({
				orderId: orderid
			});
		},
		onShow: function() {
			if (this.orderId == undefined) {
				common.toast("请求参数错误");
				return;
			}

			this.loadProductDetail(this.orderId);
		},

		onReady() {},

		/**
		 * 用户分享
		 */
		onShareAppMessage: function() {
			var that = this;
			var pickup = common.getStorageSync('getpickup');
			return {
				title: that.order.share_title,
				path: '/packageA/groupbuy/groupbuy?pickup_id=' + that.order.pickup_id + '&found_id=' + that.order.found_id,
				imageUrl: that.order.share_img
			};
		},
		methods: {
			// 联系便利店店主
			callManager: function(e) {
				var telNum = e.currentTarget.dataset.tel;
				wx.makePhoneCall({
					phoneNumber: telNum
				});
			},
			//倒计时函数
			countTime: function(now, end) {
				var that = this;
				var leftTime = end - now;
				var d, h, m, s;
				var teamTime = setInterval(() => {
					leftTime = leftTime - 1;

					if (leftTime >= 0) {
						d = Math.floor(leftTime / 60 / 60 / 24, 10); //计算剩余的天数

						h = Math.floor(leftTime / 60 / 60 % 24) + d * 24;
						m = Math.floor(leftTime / 60 % 60);
						s = Math.floor(leftTime % 60);
					} else {
						clearInterval(teamTime);
						that.loadProductDetail();
						return false;
					}

					h = h > 9 ? h : '0' + h;
					m = m > 9 ? m : '0' + m;
					s = s > 9 ? s : '0' + s;
					this.setData({
						h,
						m,
						s
					});
				}, 1000);
			},
			//申请原因弹层
			setModalStatus: function(e) {
				var animation = wx.createAnimation({
					duration: 200,
					timingFunction: "linear",
					delay: 0
				});
				this.animation = animation;
				animation.translateY(300).step();
				this.setData({
					animationData: animation.export()
				});
				this.setData({
					showfwModalStatus: true,
					textareaHidden: true
				});
				setTimeout(function() {
					animation.translateY(0).step();
					this.setData({
						animationData: animation
					});

					if (e.currentTarget.dataset.status == 0) {
						this.setData({
							showfwModalStatus: false,
							textareaHidden: false
						});
					}
				}.bind(this), 200);
			},
			//选择申请原因
			setReasonBefore: function(e) {
				var that = this;

				if (e.currentTarget.dataset.item) {
					var item = e.currentTarget.dataset.item;
				} else {
					var item = this.reasons[e.detail.value["0"]];
				}

				var reason = item;

				if (e.currentTarget.dataset.status == 1) {
					common.showModal('是否确定退款？', '确定', function(e) {
						if (e.confirm) {
							that.refund(item);
							that.setData({
								showfwModalStatus: false
							});
						}
					});
				} else {
					this.setModalStatus(e);
					return false;
				}
			},
			// 申请退款
			refund: function(e) {
				var that = this;
				var orderId = e.target.dataset.orderId;
				wx.navigateTo({
					url: '/packageA/user/application-return?type=1&orderId=' + orderId
				}); // var url = app.getPath.submitbackordersn;
				// var data = {
				//   order_sn: that.data.order.order_sn,
				//   reason:reason
				// };
				// common.ApiGateWayTest(url, data, true, function (res) {
				//   var res = res.data;
				//   if(res.success==1){
				//     common.toast(res.result.state_desc)
				//     wx.navigateTo({
				//       url: '/packageA/user/order-return-detail?id=' + res.result.back_id
				//     })
				//   }
				// })
			},
			loadProductDetail: function(orderid) {
				var that = this;
				common.showLoad(this);
				var url = app.getPath.orderDetail;
				var data = {
					order_id: that.orderId
				};
				common.ApiGateWayTest(url, data, true, function(res) {
					var order = res.data.result;

					if (order.status != 12) {
						wx.hideShareMenu();
					} else {
						var now = new Date().getTime() / 1000;

						if (order.found_end_time >= now) {
							that.countTime(now, order.found_end_time);
						}
					}

					that.setData({
						order: order
					});
					that.getIsShowShopCouponAd();

					if (order.status == app.ORDER_STATUS.PICKING) {
						qrcode = new QRCode('canvas', {
							// usingIn: this, // usingIn 如果放到组件里使用需要加这个参数
							text: order.get_sn,
							width: qrcodeWidth,
							height: qrcodeWidth,
							colorDark: "#000000",
							colorLight: "white",
							correctLevel: QRCode.CorrectLevel.H
						});
					}

					common.hideLoad(that);
				});
			},
			//前往商品详情页
			goprodcut: function(e) {
				var productId = e.currentTarget.dataset.productId;
				wx.navigateTo({
					url: '../../pages/product/product?entryType=external&productId=' + productId
				});
			},
			touchComment: function(e) {
				var order = e.currentTarget.dataset.orderId;
				wx.navigateTo({
					url: '../user/order-review?order=' + order
				});
			},
			go_application_return: function(e) {
				var goods = e.currentTarget.dataset.goods;

				if (goods.back_info && goods.back_info.back_id != 0) {
					wx.navigateTo({
						url: '../user/order-return-detail?entryType=external&id=' + goods.back_info.back_id
					});
				} else {
					wx.navigateTo({
						url: '../user/application-return?type=2&rec_id=' + goods.rec_id
					});
				}
			},
			//取消订单
			touchCancel: function(e) {
				var that = this;
				var orderId = e.currentTarget.dataset.orderId;
				var url = app.getPath.cancelOrder;
				var data = {
					order_id: orderId
				};
				var content = '是否取消该订单？';
				var confirmText = '确定';
				common.showModal(content, confirmText, function(res) {
					res.confirm && common.ApiGateWayTest(url, data, true, function(res) {
						if (res.data.success == 1) {
							wx.pageScrollTo({
								scrollTop: 0,
								duration: 100
							});
							common.toast(res.data.msg);
							that.loadProductDetail();
						} else {
							common.toast(res.data.msg);
						}
					});
				});
			},
			//确认收货
			touchConfirm: function(e) {
				var that = this;
				var orderId = e.currentTarget.dataset.orderId;
				var uri = app.getPath.confirmReceive;
				var data = {
					order_id: orderId
				};
				var content = '你确定已收到宝贝吗？';
				var confirmText = '确定';
				common.showModal(content, confirmText, function(res) {
					res.confirm && common.ApiGateWayTest(uri, data, true, function(res) {
						if (res.data.success == 1) {
							wx.pageScrollTo({
								scrollTop: 0,
								duration: 100
							});
							common.toast(res.data.msg);
							that.loadProductDetail();
						} else {
							common.toast(res.data.msg);
						}
					});
				});
			},
			// 立即支付
			touchPay: function(e) {
				var that = this;
				var orderId = e.currentTarget.dataset.orderId;
				var payUri = app.getPath.doPay;
				var payData = {
					order_id: orderId,
					payment_code: 'wxpay'
				};
				common.ApiGateWayTest(payUri, payData, true, function(res) {
					if (res.data.success == 1) {
						var data = res.data.result;
						common.doWechatPay(data, function(res) {
							common.toast('支付成功'); // 支付成功后二次验证，修改后台状态
							// that.checkPay(orderId)

							wx.navigateTo({
								url: '/pages/confirm/paymentStatus/paymentStatus?order_id=' + payData.order_id + '&payment_code=' +
									payData.payment_code
							});
						}, function(failres) {
							common.toast('支付失败'); // wx.pageScrollTo({
							//   scrollTop: 0,
							//   duration: 100
							// })

							that.loadProductDetail();
						});
					}
				});
			},
			checkPay: function(orderId) {
				var that = this;
				var uri = app.getPath.checkPay;
				var data = {
					order_id: orderId
				};
				common.ApiGateWayTest(uri, data, true, function(res) {
					// wx.pageScrollTo({
					//   scrollTop: 0,
					//   duration: 100
					// })
					that.loadProductDetail();
				});
			},
			touchSubComment: function(e) {
				var order = e.currentTarget.dataset.orderId;
				wx.navigateTo({
					url: '../user/add-order-review?order=' + order
				});
			},
			//查看物流
			touchExpress: function(e) {
				var item = e.currentTarget.dataset;
				wx.navigateTo({
					url: '../user/order-express?order=' + item.order.id + '&delivery_id=' + item.delivery_id
				});
			},
			// 复制到剪贴板
			setClipboard: function() {
				wx.setClipboardData({
					data: this.order.order_sn,
					success: function() {
						common.toast('复制成功');
					},
					fail: function() {
						common.toast('复制失败，请重试');
					}
				});
			},
			// 返回首页
			gotoHome: function() {
				wx.switchTab({
					url: '/pages/index/index'
				});
			},
			// 拨打客服电话
			phoneCall: function() {
				common.phoneCall(app.globalData.hotline);
			},
			//跳转在线客服
			golinkkf: function() {
				app.dataBase.pageUrl = 'http://q.url.cn/s/6l3eQOm?_type=wpa&_wv=2';
				common.goWebview();
			},

			toShare(e) {
				common.formIdUpdate(e);
			},

			// 长按保存二维码
			save: function() {
				console.log('save');
				wx.showActionSheet({
					itemList: ['保存图片'],
					success: function(res) {
						console.log(res.tapIndex);

						if (res.tapIndex == 0) {
							qrcode.exportImage(function(path) {
								wx.saveImageToPhotosAlbum({
									filePath: path
								});
							});
						}
					}
				});
			},

			// 是否有可领取优惠券
			getIsShowShopCouponAd() {
				var that = this;
				var uri = app.getPath.adlist;
				var data = {
					pid: 11
				};
				common.ApiGateWayTest(uri, data, true, res => {
					console.log(res)
					var resData = res.data;
					
					if (resData.success == 1) {
						console.log("00000")
						if (resData.result[0].ad_link != '') {
							that.shop_id = resData.result.shop_id;
							console.log("1111")
							that.setData({
								showCountMode: true,
								shopCouponImg: resData.result
							});
							console.log(resData.result)
						} else {
							console.log("22222")
							that.setData({
								showCountMode: false
							});
						}
					} else {
						console.log("33333")
						common.toast(resData.msg);
						return;
					}
				});
			},

			// 前往店铺
			goShop(e) {
				var that = this;
				wx.navigateTo({
					url: '/packageA/takeout-shop/takeout-shop?shop_id=' + that.shop_id + '&entryType=external'
				});
			},

			//  跳转拼团详情
			toDetail(e) {
				var that = this;
				common.formIdUpdate(e);
				wx.navigateTo({
					url: '/packageA/groupbuy/groupbuy?found_id=' + that.order.found_id + '&entryType=external'
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
	@import "./detail.css";
</style>
