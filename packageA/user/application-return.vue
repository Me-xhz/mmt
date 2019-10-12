<template>
	<view>
		<view class="container with-loader">
			<!-- Goods -->
			<view class="order-main" @tap="go_product" v-for="(products, index) in orderInfo.products" :key="index"
			 :data-product-id="products.goods_id">
				<view class="goods-item no-border">
					<view class="item-photo">
						<image :src="products.header_img"></image>
					</view>
					<view class="item-info">
						<view class="info-name">
							{{products.goods_name}}
						</view>
						<view class="info-attr">{{products.sku_key_name}}</view>
						<view class="info-price">
							<i class="icon_rmb">¥</i>{{products.shop_price}}
						</view>
						<view class="info-amount">x{{products.amount}}</view>
					</view>
				</view>
			</view>
			<!--severs-->
			<!-- wx:if="{{orderInfo.show_back_btn_allow == 2}}" -->
			<view class="order-severs">
				<view class="order-severs-name t4" v-if="type==2">售后类型
					<!-- <span bindtap="GoretrunSQA">
        <image src="{{iconURL}}/icon_faq.png" />常见问题</span> -->
				</view>
				<view class="order-severs-menu">
					<view v-if="type == 2" :class="'menu-item row ' + (uploadInfo.backStatus==2 ? 'active' : '')" @tap="setBackStatus"
					 data-status="2">
						<image mode="widthFix" :src="iconURL + '/gouxuan03.png'"></image>
						<span class="w15 t1">退货退款</span>
						<span class="sub-txt t2">已收到货，需要退还商品</span>
					</view>
					<view v-if="type == 2" :class="'menu-item row ' + (uploadInfo.backStatus==1 ? 'active' : '')" @tap="setBackStatus"
					 data-status="1">
						<image mode="widthFix" :src="iconURL + '/gouxuan03.png'"></image>
						<span class="w15 t1">换货</span>
						<span class="sub-txt t2">对已收到的商品不满意，需要换</span>
					</view>
					<view v-if="type == 1" :class="'menu-item row ' + (uploadInfo.backStatus==3 ? 'active' : '')" @tap="setBackStatus"
					 data-status="3">
						<span>退款金额</span>
						<span style="padding-left:10rpx;">
							<text class="red-font-color">￥{{back_amount}}</text>
							<text class="small_font">（若使用余额或者优惠券，将一并退回）</text>
						</span>
						<!-- <image mode='widthFix' src="{{iconURL}}/gouxuan03.png" /> -->
					</view>
				</view>
				<!--<view class="order-severs-text">
				<p ng-if="orderInfo.show_back_btn_allow == 2">1.已收到货，需要退还货物，请选择退货退款</p>
				<p ng-if="orderInfo.show_back_btn_allow == 2">2.对已收到的货物不满意，请选择换货</p>
				<p ng-if="orderInfo.show_back_btn_allow == 1">未收到货，或者与我们协商一致的情况下，请选择仅退款</p>
				<p class="msg">温馨提示：因退款后达不到包邮条件而需要补交邮费的，请以客服协商结果为准。</p>
			</view>-->
			</view>
			<!--info-->
			<view class="order-nums">
				<!--<view class="order-nums--name">申请数量: {{orderInfo.goods_num}}</view>-->
				<!-- <view class="item-info row row-center" wx:if="{{uploadInfo.backStatus!=1 && !isSource}}">
      <view class="info-title w23">退款金额</view>
      <view class="info-content col tr padding-right">
        <span class="text_content_small color_large_gray">最多可退</span>
        <span class="content-price"><i class='icon_rmb'>¥</i>{{back_amount}}
        </span>
        <span class="content-shpping" wx:if="{{showShippingPrice}}">运费(
          <i wx:if="{{showShippingPrice == 1}}">+</i>
          <i wx:if="{{showShippingPrice == 2}}">-</i><i class='icon_rmb'>¥</i>
          {{shipping_fee}})
        </span>
        <span class="content-shpping" wx:if="{{!showShippingPrice}}">(不含运费)</span>
      </view>
    </view> -->
				<view class="item-info row row-center">
					<view class="info-title t4 w23">申请原因</view>
					<view class="info-content col tr" @tap="setModalStatus" data-status="1">
						<span class="content-reason t1">{{uploadInfo.reason || '请选择原因'}}</span>
						<view class="iconfont icon-btn_xiangyoudajiantoux"></view>
					</view>
				</view>

				<!-- <view class="item-info row row-center" wx:for='{{orderInfo.products}}' wx:for-item='products' wx:if="{{products.amount > 1}}">
      <view class="info-title">申请件数</view>
      <view class="info-content col tr">
        <view class="order-nums-ls">
          <view class="order-nums-msg" wx:if="{{orderInfo.show_back_btn_allow != 1}}">您最多可申请{{products.amount}}件</view>
          <view class="order-nums-button left {{uploadInfo.applyAmount <= 1 || orderInfo.show_back_btn_allow == 1 ? 'del' : ''}}" bindtap='touchAmountSub'>
          </view>
          <input type="text" wx:if="{{orderInfo.show_back_btn_allow == 1}}" class="order-nums-count" value="{{uploadInfo.applyAmount}}" readonly="readonly" />
          <input type="text" wx:if="{{orderInfo.show_back_btn_allow != 1}}" class="order-nums-count" value="{{uploadInfo.applyAmount}}" bindinput="back_amount_change" bindblur="back_amount_blur" />
          <view class="order-nums-button right {{uploadInfo.applyAmount < products.amount && orderInfo.show_back_btn_allow != 1 ? 'active' : ''}} {{uploadInfo.applyAmount >= products.amount || orderInfo.show_back_btn_allow == 1 ? 'del' : ''}}" bindtap="touchAmountAdd">
          </view>
        </view>
      </view>
    </view> -->
				<view class="order-nums-texts">
					<view class="order-nums-texts-title t4">详细描述</view>
					<textarea :hidden="textareaHidden" class="t5" placeholder="请输入文字描述，2-200字，描述清晰可以让客服更快为你服务哦´･ᴗ･`" maxlength="200"
					 :value="uploadInfo.desc" @input="filterSpecialCharacters"></textarea>
					<view class="inputnum">
						{{uploadInfo.desc.length || '0'}}/200
					</view>
				</view>
				<view class="upload-img-box clearfix">
					<view class="box-title t4">上传图片
						<span>(选填，最多3张)</span>
					</view>
					<view class="box-img" v-for="(img, index) in uploadImg" :key="index">
						<image :src="img"></image>
						<view class="img-del iconfont icon-btn_huangsetishiguanbix" @tap="delUploadImg" :data-index="index"></view>
						<!-- <image class="img-del" src="{{iconURL}}/btn_delImg.png" bindtap="delUploadImg" data-index='{{index}}' /> -->
					</view>
					<label v-if="uploadImg.length < 3" @tap="updataimg"></label>
				</view>
			</view>
			<!-- <view class="row row-center item-telphone">
    <view class="info-title w25">联系方式</view>
    <view class="info-content col tr">
      <input type="number" placeholder="选填，便于我们联系你" value="{{uploadInfo.telphone}}" bindinput="limittelphonelen" />
    </view>
    <view class="info-addrepeat" wx:if="{{uploadInfo.telphone.length > 0}}" bindtap="delemphonelen">
      <image mode='widthFix' src="{{iconURL}}/icon_clear.png" />
    </view>
  </view> -->

		</view>
		<!--申请原因-->
		<view class="drawer_screen" catchtouchmove="false" @click.stop="setModalStatus" data-status="0" v-if="showfwModalStatus"></view>
		<view class="action-modal" :animation="animationData" v-if="showfwModalStatus">
			<view class="title">选择申请原因</view>
			<picker-view class="modal-inner" indicator-class="pick_item" :value="value" @change="setReasonBefore">
				<picker-view-column>
					<view v-for="(item, index) in reasons" :key="index" class="pick_item" @click.stop="setReasonBefore" data-status="0"
					 :data-item="item">{{item}}</view>
				</picker-view-column>
			</picker-view>
		</view>
		<view class="footer">
			<button class="button-warn" @tap="submitApply">提交</button>
		</view>

		<view class="alert_modal" :hidden="alertHidden">
			<view class="h2" v-if="type!=1">申请成功</view>
			<view class="content" v-if="type!=1">
				<view class="tip">售后单号为：{{back_sn}}</view>
				<view>请将退换货商品退回提货点，并向提货点人员索要包装袋以及需填写的退换必填信息卡片（售后单号为必填项，请截图保存）</view>
				<view class="tip2">【若卡片信息未填写，则商品将无法进行退换货处理哟】</view>
			</view>
			<view class="content" v-if="type==1">
				<view class="tip3">申请成功</view>
			</view>
			<button class="alert_modal_btn" @tap="tapBack">确认</button>
		</view>
		<view class="drawer_screen" :hidden="alertHidden"></view>
		<!-- <view animation="{{animationData}}" catchtouchmove='true' class="action-modal" wx:if="{{showfwModalStatus}}">
  <view class="modal-inner">
    <view class="modal-close" bindtap="setModalStatus" data-status="0">
      <image src="{{iconURL}}/icon_modal_closs.png" />
    </view>
    <view class="modal-inner-header">请选择主要申请原因（单选）</view>
    <view class="apply-reasons-box">
      <view class="box-content">
        <span class="content-item {{reason==item ? 'active' : ''}}" bindtap="setReasonBefore" data-status="0" data-item='{{item}}' wx:for="{{reasons}}">{{item}}</span>
      </view>
    </view>
  </view>
</view> -->
	</view>
</template>

<script>
	var app = getApp().globalData;
	var common = require("../../utils/common.js"); // pages/order/downline.js

	export default {
		data() {
			return {
				iconURL: app.dataBase.iconURL,
				uploadInfo: {
					applyAmount: 1,
					reason: '',
					backStatus: '',
					desc: '',
					telphone: ''
				},
				submitImg: [],
				uploadImg: [],
				reasons: [],
				alertHidden: true,
				textareaHidden: false,
				type: 0,
				orderId: "",
				rec_id: "",
				orderInfo: "",
				back_amount: "",
				shipping_fee: "",
				showShippingPrice: "",
				back_sn: "",
				imgLenth: "",
				imgNowLength: "",
				animationData: "",
				showfwModalStatus: false
			};
		},

		components: {},
		props: {},
		onLoad: function(options) {
			// type 1 为退款   type 2 为 退款退货
			if (options == undefined || options.rec_id == undefined && options.orderId == undefined) {
				common.toast("请求参数错误");
				return;
			}

			if (options.type == 1) {
				this.setData({
					type: 1,
					orderId: options.orderId,
					reasons: ['多拍/拍错/不想要', '缺货', '其他（请填写详细描述）']
				});
			} else if (options.type == 2) {
				this.setData({
					type: 2,
					rec_id: options.rec_id,
					reasons: ['商品质量问题', '发错', '其他（请填写详细描述）']
				});
			}

			this.getApplyDetail();
		},
		methods: {
			preventTouchMove: function() {},
			//获取退换货数据
			getApplyDetail: function() {
				var that = this;
				var type = this.type;

				if (type == 1) {
					var url = app.getPath.applyBackMoney;
					var data = {
						order_id: that.orderId
					};
				} else if (type == 2) {
					var url = app.getPath.applyback;
					var data = {
						rec_id: that.rec_id
					};
				}

				common.ApiGateWayTest(url, data, true, function(res) {
					if (res.data.success == 1) {
						var res = res.data.result; // 1是退款  2是退换货

						if (that.type == 2) {
							that.uploadInfo.backStatus = 2;
							that.uploadInfo.applyAmount = res.products[0].amount;
						} else {
							that.uploadInfo.backStatus = 3;
						} // that.data.uploadInfo.backStatus = 2;


						that.setData({
							orderInfo: res,
							uploadInfo: that.uploadInfo
						}); // 1是退款  2是退换货

						if (that.type == 1) {
							that.calculateBackAmount();
						} else {
							that.calculateBackAmount2();
						}

						wx.hideLoading();
					} // else {
					//   wx.navigateBack();
					// }

				});
			},
			//设置退换货类型
			// setBackStatus: function (e) {
			//   var status = e.currentTarget.dataset.status;
			//   this.data.uploadInfo.backStatus = status;
			//   this.setData({
			//     uploadInfo: {
			//       applyAmount: this.data.uploadInfo.applyAmount,
			//       reason: this.data.reason,
			//       backStatus: status,
			//       desc: this.data.desc,
			//       telphone: this.data.telphone,
			//     }
			//   })
			// },
			//计算退款退货价格 type==2
			calculateBackAmount2: function() {
				//包邮阈值
				let shipping_threshold = parseFloat(this.orderInfo.shipping_free_price || 69); //可退款的商品的金额合计

				let order_goods_amount = 0;
				let order_goods_remain = this.orderInfo.calculate_source.order_goods_remain_product;

				for (let i = 0; i < order_goods_remain.length; i++) {
					order_goods_amount += parseFloat(order_goods_remain[i].goods_price) * order_goods_remain[i].goods_num;
				} //运费金额


				let shipping_fee = parseFloat(this.orderInfo.shipping_fee_should); //订单是否支付过邮费

				let shipping_fee_paied = !(this.orderInfo.calculate_source.back_shipping_fee_paid == 0 && this.orderInfo.shipping_fee ==
					0); //当前准备退款的商品金额合计

				let current_amount = parseFloat(this.orderInfo.products[0].shop_price) * this.uploadInfo.applyAmount; //去除当前准备退款的商品金额后订单剩余金额

				let dis_amount = order_goods_amount - current_amount; //是否是最后一次退款

				let is_last_back = this.orderInfo.calculate_source.sku_remain_num == 1 && this.uploadInfo.applyAmount == this.orderInfo
					.products[0].amount; //剩余订单合计是否大于包邮阙值

				let is_shipping_threshold = dis_amount > shipping_threshold; //优惠抵扣的退款金额

				let prom_fee = 0;

				for (let i = 0, keys = Object.keys(this.orderInfo.prom_info); i < keys.length; i++) {
					prom_fee += parseFloat(this.orderInfo.prom_info[keys[i]]) * this.uploadInfo.applyAmount;
				} //开始逻辑计算


				this.showShippingPrice = 0; //不计算运费补收（退还）时的退款金额

				this.back_amount = current_amount - prom_fee; //如果退款该sku不可能存在补收或退还运费，则跳过后续计算

				if (this.orderInfo.post_free == 0) return;

				if (is_last_back) {
					if (shipping_fee_paied) {
						//最后一次退款并且之前收取过运费，需要退还运费
						this.back_amount += shipping_fee;
						this.showShippingPrice = 1;
					}
				} else if (!shipping_fee_paied && !is_shipping_threshold) {
					//未收取过运费并非剩余订单商品总价小于包邮阈值，需要补收运费
					this.back_amount -= shipping_fee;
					this.showShippingPrice = 2;
				}

				this.shipping_fee = this.showShippingPrice == 0 ? 0 : shipping_fee;
				this.setData({
					back_amount: this.back_amount,
					shipping_fee: this.shipping_fee,
					showShippingPrice: this.showShippingPrice
				});
			},
			//计算退款价格 type==1
			calculateBackAmount: function() {
				this.setData({
					back_amount: parseFloat(this.orderInfo.order_amount).toFixed(2)
				});
			},
			//提交(提交申请Over)
			submitApply: function() {
				var that = this;
				var e = that;

				if (!e.uploadInfo.backStatus) {
					common.toast('请选择服务类型');
					return;
				}

				if (!e.uploadInfo.reason) {
					common.toast('请选择申请原因');
					return;
				}

				if (!e.uploadInfo.desc || e.uploadInfo.desc == '') {
					common.toast('请填写详细描述');
					return;
				} else if (e.uploadInfo.desc.length < 2) {
					common.toast('字数不能少于2个字');
					return;
				} // type1 退款  type2退货


				if (that.type == 1) {
					that.updtype1(e);
				} else {
					that.updtype2(e);
				}
			},

			tapBack() {
				var that = this;
				that.setData({
					alertHidden: true,
					textareaHidden: false
				});
				wx.navigateBack({
					delta: 1
				});
			},

			// 仅退款
			updtype1: function(e) {
				var that = this;
				var url = app.getPath.submitbackordersn;
				var data = {
					order_id: that.orderId,
					reason_detail: e.uploadInfo.desc,
					// back_status: e.uploadInfo.backStatus,
					reason: e.uploadInfo.reason
				};

				if (e.uploadInfo.telphone) {
					data['contact'] = e.uploadInfo.telphone;
				}

				that.submitImg(function(res) {
					if (res != false) {
						var res = JSON.parse(res.data);

						if (res.success == 0) {
							common.toast(res.msg);
							return;
						}

						that.submitImg.push(res.result.url);
					}

					if (that.uploadImg.length == that.submitImg.length) {
						data['pic_info'] = JSON.stringify(that.submitImg);
						common.ApiGateWayTest(url, data, true, function(res) {
							if (res.data.success == 1) {
								var res = res.data.result;
								that.setData({
									back_sn: res.back_sn,
									alertHidden: false,
									textareaHidden: true
								}); // common.toast(res.state_desc);
								// wx.navigateBack({
								//   delta: 1
								// })
							}

							wx.hideLoading();
						});
					}
				});
			},
			// 退款退货
			updtype2: function(e) {
				var that = this;
				var url = app.getPath.submitbackorder;
				var data = {
					rec_id: that.rec_id,
					reason_detail: e.uploadInfo.desc,
					back_number: e.uploadInfo.applyAmount,
					back_status: e.uploadInfo.backStatus,
					reason: e.uploadInfo.reason
				};

				if (e.uploadInfo.telphone) {
					data['contact'] = e.uploadInfo.telphone;
				}

				that.submitImg(function(res) {
					if (res != false) {
						var res = JSON.parse(res.data);
						that.submitImg.push(res.result.url);
					}

					if (that.uploadImg.length == that.submitImg.length) {
						data['pic_info'] = JSON.stringify(that.submitImg);
						common.ApiGateWayTest(url, data, true, function(res) {
							if (res.data.success == 1) {
								var res = res.data.result;
								that.setData({
									back_sn: res.back_sn,
									alertHidden: false,
									textareaHidden: true
								}); // common.toast(res.state_desc);
								// wx.navigateBack({
								//   delta: 1
								// })
								// wx.redirectTo({
								//   url: '../user/order-return-detail?id=' + res.back_id,
								// })
							}

							wx.hideLoading();
						});
					}
				});
			},
			//选择图片
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
			//删除上传图片
			delUploadImg: function(e) {
				var index = e.currentTarget.dataset.index;
				this.uploadImg.splice(index, 1);
				this.setData({
					uploadImg: this.uploadImg
				});
			},
			//提交图片
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
							name: 'file',
							formData: data,
							header: header,
							success: successCallback
						});
						that.setData({
							imgLenth: uploadImg.length,
							imgNowLength: Number(i) + 1
						});
						common.showLoad(that.imgNowLength + '/' + that.imgLenth);
					}
				} else {
					successCallback(false);
				}
			},
			//前往商品详情
			go_product: function(e) {
				var productId = e.currentTarget.dataset.productId;
				wx.navigateTo({
					url: '../../pages/product/product?entryType=external&productId=' + productId
				});
			},
			//前往常见问题
			GoretrunSQA: function(e) {
				wx.navigateTo({
					url: '../user/returnSQA'
				});
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
				if (e.currentTarget.dataset.item) {
					var item = e.currentTarget.dataset.item;
				} else {
					var item = this.reasons[e.detail.value["0"]];
				}

				this.setData({
					uploadInfo: {
						applyAmount: this.uploadInfo.applyAmount,
						reason: item,
						backStatus: this.uploadInfo.backStatus,
						desc: this.uploadInfo.desc,
						telphone: this.uploadInfo.telphone
					}
				});

				if (e.currentTarget.dataset.status == 0) {
					this.setModalStatus(e);
					return false;
				}
			},
			//数量递减
			touchAmountSub: function() {
				var e = this;
				if (e.orderInfo.show_back_btn_allow == 1) return;

				if (e.uploadInfo.applyAmount > 1) {
					e.uploadInfo.applyAmount--;
				}

				this.setData({
					uploadInfo: {
						applyAmount: e.uploadInfo.applyAmount,
						reason: this.uploadInfo.reason,
						backStatus: this.uploadInfo.backStatus,
						desc: this.uploadInfo.desc,
						telphone: this.uploadInfo.telphone
					}
				});
				this.calculateBackAmount();
			},
			//数量递增
			touchAmountAdd: function() {
				var e = this;
				if (e.orderInfo.show_back_btn_allow == 1) return;

				if (e.uploadInfo.applyAmount < e.orderInfo.products[0].amount) {
					e.uploadInfo.applyAmount++;
				}

				this.setData({
					uploadInfo: {
						applyAmount: e.uploadInfo.applyAmount,
						reason: this.uploadInfo.reason,
						backStatus: this.uploadInfo.backStatus,
						desc: this.uploadInfo.desc,
						telphone: this.uploadInfo.telphone
					}
				});
				this.calculateBackAmount();
			},
			//申请数量输入框改变时
			back_amount_change: function(res) {
				var e = this;
				e.uploadInfo.applyAmount = Number(res.detail.value);

				if (e.uploadInfo.applyAmount >= e.orderInfo.products[0].amount) {
					this.setData({
						uploadInfo: {
							applyAmount: e.orderInfo.products[0].amount,
							reason: this.uploadInfo.reason,
							backStatus: this.uploadInfo.backStatus,
							desc: this.uploadInfo.desc,
							telphone: this.uploadInfo.telphone
						}
					});
				}
			},
			//申请数量输入框离开
			back_amount_blur: function(res) {
				var e = this;
				e.uploadInfo.applyAmount = Number(res.detail.value);

				if (e.uploadInfo.applyAmount <= 0 || isNaN(e.uploadInfo.applyAmount)) {
					this.setData({
						uploadInfo: {
							applyAmount: 1,
							reason: this.uploadInfo.reason,
							backStatus: this.uploadInfo.backStatus,
							desc: this.uploadInfo.desc,
							telphone: this.uploadInfo.telphone
						}
					});
				}

				if (e.uploadInfo.applyAmount >= e.orderInfo.products[0].amount) {
					this.setData({
						uploadInfo: {
							applyAmount: e.orderInfo.products[0].amount,
							reason: this.uploadInfo.reason,
							backStatus: this.uploadInfo.backStatus,
							desc: this.uploadInfo.desc,
							telphone: this.uploadInfo.telphone
						}
					});
				}

				this.calculateBackAmount();
			},
			//格式 RegExp("[在中间定义特殊过滤字符]")
			filterSpecialCharacters: function(e) {
				var value = e.detail.value;
				value = value.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "");
				var pattern = new RegExp("[%--`~#$^&*=|{}\\[\\]<>/~#……&*——|{}【】]");
				var rs = "";

				for (var i = 0; i < value.length; i++) {
					rs = rs + value.substr(i, 1).replace(pattern, '');
				}

				this.setData({
					uploadInfo: {
						applyAmount: this.uploadInfo.applyAmount,
						reason: this.uploadInfo.reason,
						backStatus: this.uploadInfo.backStatus,
						desc: rs,
						telphone: this.uploadInfo.telphone
					}
				});
			},
			//电话号码过滤
			limittelphonelen: function(e) {
				var value = e.detail.value;
				var pattern = new RegExp("[%--`~#$^&*=|{}\\[\\]<>/~#……&*——|{}【】]");
				var rs = "";

				for (var i = 0; i < value.length; i++) {
					rs = rs + value.substr(i, 1).replace(pattern, '');
				}

				if (rs && rs.length > 15) {
					rs = rs.substring(0, 15);
				}

				this.setData({
					uploadInfo: {
						applyAmount: this.uploadInfo.applyAmount,
						reason: this.uploadInfo.reason,
						backStatus: this.uploadInfo.backStatus,
						desc: this.uploadInfo.desc,
						telphone: rs
					}
				});
			},
			//电话号码置空
			delemphonelen: function() {
				this.setData({
					uploadInfo: {
						applyAmount: this.uploadInfo.applyAmount,
						reason: this.uploadInfo.reason,
						backStatus: this.uploadInfo.backStatus,
						desc: this.uploadInfo.desc,
						telphone: ''
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
	@import "./application-return.css";
</style>
