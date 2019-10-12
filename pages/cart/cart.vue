<template>
	<view>
		<!--pages/cart/cart.wxml-->
		<view class="page" v-if="showPage">


			<!-- <view class="cart-postage">
    <view class="row">
      <view class="col" wx:for='{{groups.services_title}}' wx:for-item='shipping_data'>
        <image src="{{iconURL}}/icon_confirm.png" />
        <text>{{shipping_data}}</text>
      </view>
    </view>
  </view> -->
			<!-- <view class="cart-toptip" wx:if='{{groups.goods && groups.goods.length > 0 }}'>
    <text class="toptip-txt">主人，有{{total}}件宝贝等你带走哟(≧ω≦)ﾉ</text>
    <text class="toptip-btn" bindtap="clearCart">清空</text>
  </view> -->
			<!--样式-->
			<view class="container cart-list">
				<!--购物车空-->
				<view class="empty" v-if="groups.goods && groups.goods.length <= 0">
					<view class="empty-item mt_10">
						<image class="item-logo" :src="iconURL + '/icon_cart_empty02.png'"></image>
						<view class="item-text font-w t7 mt_48">您还没有添加商品~</view>
						<button type="default" @tap="goHome" class="goHome t4 empty_color">
							去添加
							<view class="iconfont icon-btn_sanjiaoxiaojiantoux1"></view>
						</button>
					</view>
				</view>

				<!--列表数据-->


				<view class="cart-group cart-bg-yellow">
					<!-- <view class='cart-tip'>
        <text class='t1'>已优惠12元，再购1件，享受8折优惠</text>
        <view class='go-buy'><text>去凑单</text><text class='iconfont icon-btn_xiangyoudajiantoux'></text></view>
      </view> -->
					<view class="mt_16" v-for="(good, index) in groups.goods" :key="index">
						<!-- 任选商品活动提示 -->
						<view class="remind_header" v-if="good.tips.is_show==1">
							<!--<view style='width:97rpx;'>-->
							<!--<view class="select_prev" bindtap="optionalSelect" data-goods="{{good}}" data-index="{{index}}">-->
							<!--<image src='{{iconURL}}/gouxuan03.png' hidden='{{!optionalSelect}}'></image>-->
							<!--<image src='{{iconURL}}/weixuanzhong.svg' hidden='{{optionalSelect}}'></image>-->
							<!--</view>-->
							<!--<view class="item-disable is-tip" wx:if="{{goods.is_disable==1}}" hidden="{{edit_mode}}"></view>-->
							<!--</view>-->
							<view class="remind_headers" :data-activity_id="good.tips.activity_id" @click.stop="load_select">
								<block v-if="good.tips.is_done==1">
									<view class="select_btn"><text>{{good.tips.activity_type_desc}}</text></view>
									<text class="ml_24">{{good.tips.desc}}</text>
									<view class="to_add" style="color:#555">
										<text class="font_26">查看活动</text>
										<view class="iconfont icon-btn_xiangyoudajiantoux icon-right-arrow font_color_555"></view>
									</view>
								</block>
								<block v-else>
									<view class="select_btn"><text>{{good.tips.activity_type_desc}}</text></view>
									<text class="ml_24">{{good.tips.desc}}</text>
									<view class="to_add">
										<text class="font_26">去凑单</text>
										<view class="iconfont icon-btn_xiangyoudajiantoux icon-right-arrow"></view>
									</view>
								</block>
							</view>
						</view>

						<view v-for="(goods, index2) in good.list" :key="index2">
							<!--正常/待修改-->
							<view class="row list-item cart-bg-white" v-if="goods.is_on_sale==1 && goods.is_enough==1 && goods.is_disable==0">
								<view class="item-prev">
									<view class="item-checkbox" @tap="touchSelect" :data-goods="goods" :data-index="index" :data-tips="good.tips">
										<image :src="iconURL + '/gouxuan03.png'" :hidden="!goods.selected"></image>
										<image :src="iconURL + '/weixuanzhong.svg'" :hidden="goods.selected"></image>
									</view>
									<view class="item-disable is-tip" v-if="goods.is_disable==1" :hidden="edit_mode"></view>
								</view>
								<!--购买状态-->
								<view class="item-box row" :hidden="edit_mode">
									<view class="item-photo" @tap="touchProduct" :data-product="goods">
										<span :style="'background-image: url(' + goods.header_img + ');'"></span>
									</view>
									<view class="item-info col">
										<view class="good_name">
											<text @tap="touchProduct" :data-product="goods">{{goods.goods_name}}</text>
										</view>
										<view class="info-attr no-padding-top">{{goods.sku_key_name}}</view>
										<view class="info-price" @tap="touchProduct" :data-product="goods">
											<text class="price-normal font-face-ios_Avenir">
												<text class="price-val">
													<text class="icon_rmb">¥</text>{{goods.shop_price}}
												</text>
											</text>

											<text v-if="goods.shop_price != goods.market_price" class="price-n">¥{{goods.market_price}}</text>
										</view>
									</view>
									<form class="item-del" @submit="touchDel" :data-product="goods" report-submit="true">
										<button formType="submit">
											<text class="iconfont icon-lajitong"></text>
										</button>
									</form>
									<view class="info-amount" @tap="stopBubbling($event)">
										<form class="amount-button left" report-submit="true" @submit="touchAmountSub" :data-goods="goods"
										 :data-index="index" :data-g_index="g_index">
											<button form-type="submit" :class="'amount-icon base-font-color ' + (goods.amount <= goods.min_buy_amount ? 'cant-del' : '')">-</button>
										</form>
										<input type="number" disabled="disabled" class="amount-input" :value="goods.amount"></input>
										<form class="amount-button right" report-submit="true" @submit="touchAmountAdd" :data-goods="goods"
										 :data-index="index" :data-g_index="g_index">
											<button form-type="submit" :class="'amount-icon base-font-color ' + (goods.amount < 0 ? 'cant-del' : '')">+</button>
										</form>
									</view>
								</view>
							</view>
							<!--下架/售罄-->
							<!-- wx:if="{{goods.is_on_sale==0 || goods.is_enough==0 || goods.is_disable==1}}" -->
							<view class="row list-item cart-bg-white" v-if="goods.is_on_sale==0 || goods.is_enough==0 || goods.is_disable==1">

								<view class="item-prev">
									<!--购买状态-->
									<view class="item-false" :style="'background-image:url(' + iconURL + '/is_on_sale.png)'" :hidden="edit_mode"
									 v-if="goods.is_on_sale==0"></view>
									<view class="item-false" :style="'background-image:url(' + iconURL + '/is_enough.png)'" :hidden="edit_mode"
									 v-if="goods.is_enough==0"></view>
									<view class="item-false" :style="'background-image:url(' + iconURL + '/is_disable.png)'" :hidden="edit_mode"
									 v-if="goods.is_disable==1"></view>
									<!--编辑状态-->
									<view :class="'item-checkbox ' + (goods.selected ? 'radio-icon-active':'')" :hidden="!edit_mode" @tap="touchSelect"
									 :data-goods="goods" :data-index="index" :data-g_index="g_index"></view>
								</view>
								<!--购买状态-->
								<view class="item-box row" :hidden="edit_mode">
									<view class="item-photo" @tap="touchProduct" :data-product="goods">
										<view class="hide_white"></view>
										<span :style="'background-image: url(' + goods.header_img + ');'"></span>
									</view>
									<view class="item-info col">
										<view class="info-name color" @tap="touchProduct" :data-product="goods">{{goods.goods_name}}</view>
										<view class="info-attr color">{{goods.sku_key_name}}</view>
										<view class="info-price color" @tap="touchProduct" :data-product="goods">
											<text class="font-face-ios_Avenir">
												<text class="price-coin font-face-ios_Arial">¥</text>
												<text class="price-val">{{goods.shop_price}}</text>
											</text>
										</view>
									</view>
								</view>
							</view>
							<view class="bottom_border"></view>
						</view>

					</view>
				</view>
				<!--一键删除失效商品-->
				<view class="cart-del-button" @tap="delAllInvalidGoods" v-if="hasInvalid">一键删除失效商品</view>
			</view>
			<!--底部-->
			<view class="cart-submit row" v-if="groups.goods && groups.goods.length > 0">
				<view class="submit-select" @tap="touchSelectAll">
					<view class="select-checkbox">
						<image :src="iconURL + '/gouxuan03.png'" :hidden="!isSelectedAll"></image>
						<image :src="iconURL + '/weixuanzhong.svg'" :hidden="isSelectedAll"></image>
					</view>全选
				</view>
				<view :class="'submit-total ' + (selectedGoods && selectedGoods.length?' active':'')" :hidden="edit_mode">
					<view class="total-price">
						<view class="price_all">
							<text class="i">合计：</text>
							<i class="icon_rmb font_26">¥</i><text class="font_36">{{totalPrice == null ? 0 : totalPrice}}</text>
						</view>
						<view class="price_sale" v-if="totalShare!='0.00'">
							<view><text class="font_color_555">已优惠:</text> ￥{{totalShare}}</view>
						</view>
						<!-- <span class="price-yf">{{sendMsg}}</span>不含运费 -->
					</view>
				</view>
				<!-- <view class='submit-total col' hidden="{{!edit_mode}}"></view> -->
				<!-- <button type="{{selectedGoods && selectedGoods.length?'primary':'disabled'}}" class='col' hidden="{{!edit_mode}}" bindtap="touchWinlog">
      <span>移入收藏</span>
    </button> -->
				<!-- <button type="{{selectedGoods && selectedGoods.length?'warn':'disabled'}}" class='col' hidden="{{!edit_mode}}" bindtap="ftouchDelete">
      <span>删除所选</span>
    </button> -->
				<form @submit="toNowpay" report-submit="true">
					<button class="col toPay" formType="submit">
						<span>结算<span class="num">({{selectedAmount}})</span></span>
					</button>
				</form>
			</view>

			<!-- <view class='title'><image src='{{iconURL}}/cart_list_header.png'></image></view> -->
			<!-- 推荐商品 -->
			<!-- <view class='recommend'>
    <goodList list="{{recommend_good_list}}" type="2" align="left" class="goodList"></goodList>
  </view> -->


		</view>
		<!-- <no_warehouse v-else :city="city" :isAuthorization="isAuthorization" @openevent="openSet"></no_warehouse> -->
		<!-- 红包-顶部通知消息 -->

		<notice type="2"></notice>

		<loading v-if="loadingShow"></loading>
	</view>
</template>

<script>
	var app = getApp().globalData;
	var common = require("../../utils/common.js"); // pages/cart/cart.js
	import goodlist from "../../components/goodList/goodList";
	import no_warehouse from "../../components/no_warehouse/no_warehouse";

	export default {
		data() {
			return {
				iconURL: app.dataBase.iconURL,
				minusStatuses: ['disabled', 'disabled', 'normal', 'normal', 'disabled'],
				total: 0,
				totalPrice: '0.00',
				totalShare: '0.00',
				edit_mode: false,
				selectedAmount: 0,
				selectedGoods: [],
				isSelectedAll: false,
				optionalSelect: false,
				groups: [],
				sendMsg: '不含运费',
				// 上拉加载部分
				refresh: true,
				page: 1,
				recommend_good_list: [],
				checkSessionKey: app.checkSessionKey,
				sumPrice: '0.00',
				isAuthorization: "",
				hasInvalid: "",
				showPage:true
			};
		},

		components: {
			goodlist,
			no_warehouse
		},
		props: {},
		onShow: function() {
			var that = this;
			var pickupId = common.getStorageSync('getpickup');
			this.loadCartData();
			this.recommend_good_list = [];

			console.log(app)
			// 检测登录
			// common.getUserSessionKey().then(function () {
			//   that.setData({
			//     checkSessionKey:true
			//   })
			// }).catch(function () {
			//   that.setData({
			//     checkSessionKey: true
			//   })
			// })
			// if (this.data.refresh) {
			//   this.getRecommendGoodList()
			// };
			//  定位检测

			that.local(function(city) {
				var data = {
					city: city,
					isAuthorization: true // 判断是否有定位和仓库

				};

				if (that.isAuthorization && city.warehouse_id != -1) {
					data.showPage = true;
					that.setData(data);
				} else {
					data.showPage = false;
					that.setData(data);
					return false;
				}
			});
		},

		onShareAppMessage(e) {
			var that = this;
			var pickup = common.getStorageSync('getpickup');
			var entry_share_info = common.getStorageSync('entry_share_info');
			return {
				title: e.from == 'button' ? entry_share_info.urge_share_text : '',
				path: '/pages/index/index?pickup_id=' + pickup.pickup_id + '&user_id=' + entry_share_info.user_id,
				imageUrl: e.from == 'button' ? entry_share_info.urge_share_img : ''
			};
		},

		methods: {
			// 定位检测
			local: function(callback) {
				var that = this;
				that.setData({
					isAuthorization: common.getStorageSync('authSetting')['scope.userLocation']
				});
				var city = common.getStorageSync('city');
				var pickup = common.getStorageSync('getpickup');

				if (app.firstlaunchApp && city.warehouse_id == undefined) {
					// 进入app后首次打开当前页面   没自提点的情况下 先获取地理定位
					if (that.isAuthorization) {
						// 增加加载，防止未加载完就点击
						common.showLoad(that);
					}

					common.getpickup(function(res) {
						var city = res.cities;
						callback && typeof callback === "function" && callback(city);
						common.hideLoad(that);
					});
				} else {
					// 有自提点的情况下，直接 取自提点 不重新请求
					// 第二次进入当前页（从选择定位页面进入），直接用仓库地址请求数据
					callback && typeof callback === "function" && callback(city);
				} // 加载数据，如果未获取自提点将先获取定位再执行
				// if (city.hasOwnProperty('warehouse_id')) {
				//   (callback && typeof (callback) === "function") && callback(city);
				// } else {
				//   // 开通定位时，得重新setdata isAuthorization
				//   //获取当前自提点后执行
				//   if (that.data.isAuthorization) {
				//     // 增加加载，防止未加载完就点击
				//     common.showLoad()
				//   }
				//   common.getpickup(function (res) {
				//     (callback && typeof (callback) === "function") && callback(res.cities);
				//     common.hideLoad()
				//   })
				// }

			},
			// 打开定位回调
			openSet: function(e) {
				var that = this;
				that.setData({
					isAuthorization: e.detail.isAuthorization
				});
				common.setStorageSync('reLoad', true);
				app.dataBase.isRefresh = true;
				that.onShow();
			},
			//开关编辑模式
			toggleEdit: function() {
				this.setData({
					edit_mode: !this.edit_mode
				}); // this.recomputePrice();

				this.getCartPrice();
			},
			// 清空购物车
			clearCart: function() {
				var that = this;
				var url = app.getPath.clearCart;
				var data = {};
				common.showModal('确定清空购物车商品吗？', '清空', function(res) {
					if (res.confirm) {
						// 清空
						common.ApiGateWayTest(url, data, true, function(res) {
							var res = res.data;

							if (res.success == 1) {
								var groups = that.groups;
								groups.goods = [];
								that.setData({
									groups
								});
							}
						});
					}
				});
				return;
			},
			//编辑按钮减
			touchAmountSub: function(e) {
				var that = this;
				common.formIdUpdate(e);
				var goods = e.currentTarget.dataset.goods;
				var index = e.currentTarget.dataset.index;
				var g_index = e.currentTarget.dataset.g_index;
				var edit_amount = goods.amount;

				if (goods.is_disable == 1 || goods.is_enough == 0 || goods.is_on_sale == 0) {
					return;
				}

				if (edit_amount <= goods.min_buy_amount) {
					// common.toast('受不了了，宝贝不能再少了');
					// 减到最后一件，弹窗删除
					common.showModal('是否从购物车删除？', '删除', function(res) {
						if (res.confirm) {
							// 删除
							that.delete([goods.cart_id], function(success) {
								if (success) {
									common.toast('删除成功');
									that.deletingGoods = null; // that.recomputePrice();

									that.getCartPrice();
								}
							}, function() {
								that.refreshEditModeAmount();
							});
						}
					});
					return;
				}

				edit_amount--;
				var cart_id = goods.cart_id;
				var url = app.getPath.changCartNum;
				var data = {
					cart_id: cart_id,
					amount: edit_amount
				};
				common.ApiGateWayTest(url, data, true, function(res) {
					if (res && res.data.success == 1) {
						var groups = that.groups;
						groups.goods[index].list[g_index].amount = edit_amount; // 只有大于一件的时候，才能normal状态，否则disable状态

						var minusStatus = edit_amount <= 1 ? 'disabled' : 'normal'; // 按钮可用状态

						var minusStatuses = that.minusStatuses;
						minusStatuses[index] = minusStatus; // 将数值与状态写回

						that.setData({
							groups: groups,
							minusStatuses: minusStatuses
						}); // 合计数量价格

						var selectedGoods = that.selectedGoods;

						for (var i = 0; i < selectedGoods.length; ++i) {
							if (selectedGoods[i].cart_id == groups.goods[index].list[g_index].cart_id) {
								selectedGoods[i] = groups.goods[index].list[g_index];
								break;
							}
						}

						that.setData({
							selectedGoods: selectedGoods
						});
						that.getOptional();
					}

					that.count(); // that.recomputePrice();
				});
			},
			//编辑按钮加
			touchAmountAdd: function(e) {
				var that = this;
				common.formIdUpdate(e);
				var goods = e.currentTarget.dataset.goods;
				var index = e.currentTarget.dataset.index;
				var g_index = e.currentTarget.dataset.g_index;
				var edit_amount = goods.amount;

				if (goods.is_disable == 1 || goods.is_enough == 0 || goods.is_on_sale == 0) {
					return;
				}

				if (edit_amount >= goods.max_buy_amount) {
					common.toast('不能再多啦~');
					return;
				} // 自增


				edit_amount++;
				var cart_id = goods.cart_id;
				var url = app.getPath.changCartNum;
				var data = {
					cart_id: cart_id,
					amount: edit_amount
				};
				common.ApiGateWayTest(url, data, true, function(res) {
					if (res.data.success == 1) {
						var groups = that.groups;
						groups.goods[index].list[g_index].amount = edit_amount; // 只有大于一件的时候，才能normal状态，否则disable状态

						var minusStatus = edit_amount <= 1 ? 'disabled' : 'normal'; // 按钮可用状态

						var minusStatuses = that.minusStatuses;
						minusStatuses[index] = minusStatus;
						that.setData({
							groups: groups,
							minusStatuses: minusStatuses
						}); // 合计数量价格

						var selectedGoods = that.selectedGoods;

						for (var i = 0; i < selectedGoods.length; ++i) {
							if (selectedGoods[i].cart_id == groups.goods[index].list[g_index].cart_id) {
								selectedGoods[i] = groups.goods[index].list[g_index];
								break;
							}
						}

						that.setData({
							selectedGoods: selectedGoods
						});
						that.getOptional();
					} else {
						common.toast('库存已经达到上限了~');
					}

					that.count(); // that.recomputePrice();
				});
			},
			//获取购物车总价
			getCartPrice: function() {
				var that = this; // 将商品转为后台所需json字符串

				var order_product = [];
				var url = app.getPath.calculateCart;
				var total = 0;
				var selectedGoods = this.selectedGoods; // console.log(selectedGoods)

				for (var i in selectedGoods) {
					order_product.push({
						goods_id: selectedGoods[i].goods_id,
						sku_key: selectedGoods[i].sku_key,
						num: selectedGoods[i].amount
					});
					total += selectedGoods[i].amount;
				}

				order_product = JSON.stringify(order_product);
				var data = {
					"order_product": order_product
				};
				common.ApiGateWayTest(url, data, true, function(res) {
					var result = res.data;

					if (result.success == 1) {
						that.setData({
							totalPrice: result.result.total_price,
							totalShare: result.result.total_share,
							selectedAmount: total
						});
					} else {
						that.setData({
							totalPrice: "0.00",
							totalShare: "0.00"
						});
					} // resolve(res);

				});
			},
			//重新获取活动数据
			getOptional: function() {
				var that = this;
				var url1 = app.getPath.cartList;
				var data1 = {};
				common.ApiGateWayTest(url1, data1, true, function(res) {
					that.setData({
						groups: res.data.result,
						isSelectedAll: false
					});
					that.touchSelectAll();
				});
			},
			//选中/取消选中
			touchSelect: function(e) {
				var target = e.currentTarget.dataset.goods;
				var tips = e.currentTarget.dataset.tips;
				var g_index = e.currentTarget.dataset.g_index; //库存不足

				var selectedGoods = this.selectedGoods;
				var targetIndex = -1;

				for (var i = 0; i < selectedGoods.length; ++i) {
					var goods = selectedGoods[i];

					if (goods.cart_id == target.cart_id) {
						targetIndex = i;
						break;
					}
				} //在商品有效的情况下才操作选中列表


				if (-1 == targetIndex) {
					selectedGoods.push(target);
				} else {
					selectedGoods.splice(targetIndex, 1);
				}

				var groups = this.groups;
				var canSelectLen = 0;
				var optionSelectLen = 0;

				for (var j in groups.goods) {
					for (var k in groups.goods[j].list) {
						canSelectLen++; // if (groups.goods[j].tips.activity_type == 4) {
						//   optionSelectLen++
						// }

						if (!this.edit_mode) {
							if (groups.goods[j].list[k].is_on_sale == 0 || groups.goods[j].list[k].is_enough == 0 || groups.goods[j].list[k]
								.is_disable == 1) {
								canSelectLen--; // if (groups.goods[j].tips.activity_type == 4) {
								//   optionSelectLen--;
								// }
							}
						}
					}
				}

				if (canSelectLen <= selectedGoods.length) {
					this.isSelectedAll = true;
				} else {
					this.isSelectedAll = false;
				} //任选活动判断勾选
				// if (tips.activity_type == 4) {
				//   if (optionSelectLen <= selectedGoods.length) {
				//     this.data.optionalSelect = true;
				//   } else {
				//     this.data.optionalSelect = false;
				//   }
				//   this.setData({
				//     optionalSelect: this.data.optionalSelect
				//   })
				// }


				this.setData({
					selectedGoods: selectedGoods,
					isSelectedAll: this.isSelectedAll
				});
				this.getCartPrice();

				if (!this.edit_mode) {
					this.setSettledPrice();
				} // this.recomputePrice();


				this.resetCheckbox();
			},
			//任选活动 勾选、反选下面的商品
			// optionalSelect(e) {
			//   var groups = e.currentTarget.dataset.goods;
			//   var selectedGoods = [];
			//   var optionalSelect = this.data.optionalSelect ? false : true;
			//   if (optionalSelect) {
			//     if (groups.tips.activity_type == 4) {
			//       for (var j = 0; j < groups.list.length; ++j) {
			//         if (this.data.edit_mode) {
			//           var goods = groups.list[j];
			//           selectedGoods.push(goods);
			//         } else {
			//           if (groups.list[j].is_on_sale == 1 && groups.list[j].is_enough == 1 && groups.list[j].is_disable == 0) {
			//             var goods = groups.list[j];
			//             selectedGoods.push(goods);
			//           }
			//         }
			//       }
			//     }
			//
			//   }
			//   if (groups.tips.activity_type == 4) {
			//     this.setData({
			//       selectedGoods: selectedGoods,
			//       optionalSelect: optionalSelect
			//     });
			//   }
			//   if (!this.data.edit_mode) {
			//     //设置结算价格
			//     this.setSettledPrice();
			//   }
			//   // this.recomputePrice();
			//   this.getCartPrice();
			//   this.resetCheckbox();
			// },
			//全选/反选
			touchSelectAll: function() {
				var groups = this.groups;
				var selectedGoods = [];
				var isSelectedAll = this.isSelectedAll ? false : true;

				if (isSelectedAll) {
					for (var j = 0; j < groups.goods.length; ++j) {
						for (var k = 0; k < groups.goods[j].list.length; ++k) {
							if (this.edit_mode) {
								var goods = groups.goods[j].list[k];
								selectedGoods.push(goods);
							} else {
								if (groups.goods[j].list[k].is_on_sale == 1 && groups.goods[j].list[k].is_enough == 1 && groups.goods[j].list[
										k].is_disable == 0) {
									var goods = groups.goods[j].list[k];
									selectedGoods.push(goods);
								}
							}
						}
					}
				}

				this.setData({
					selectedGoods: selectedGoods,
					isSelectedAll: isSelectedAll,
					optionalSelect: isSelectedAll
				});

				if (!this.edit_mode) {
					//设置结算价格
					this.setSettledPrice();
				} // this.recomputePrice();


				this.getCartPrice();
				this.resetCheckbox();
			},
			//刷新选中框
			resetCheckbox: function() {
				var groups = this.groups;

				for (var j in groups.goods) {
					for (var k in groups.goods[j].list) {
						var _goods = groups.goods[j].list[k];
						_goods.selected = false;
					}
				}

				for (var j in groups.goods) {
					for (var a in groups.goods[j].list) {
						var _goods = groups.goods[j].list[a];

						for (var k in this.selectedGoods) {
							if (this.selectedGoods[k].cart_id === _goods.cart_id) {
								_goods.selected = true;
							}
						}
					}
				}

				this.setData({
					groups: groups
				});
			},
			// 计算选中合计价格/数量
			// recomputePrice: function () {
			//   var amount = 0;
			//   var price = 0;
			//   var market_price = 0;
			//   var goods = this.data.selectedGoods;
			//   var groups = this.data.groups;
			//   var is_shipping = false;
			//   for (var i = 0; i < goods.length; ++i) {
			//     //有效商品才参与计算价格
			//     if (goods[i].is_on_sale == 1 && goods[i].is_enough == 1 && goods[i].is_disable == 0) {
			//       amount += goods[i].amount;
			//       var _price = goods[i].shop_price;
			//       price += goods[i].amount * _price;
			//       market_price += goods[i].amount * goods[i].market_price;
			//     }
			//     if (goods[i].is_shipping == 1) {
			//       is_shipping = true;
			//     }
			//   }
			//   this.selectedPrice = price;
			//   var sendMsg = '不含运费';
			//   for (var j in groups.goods) {
			//     for(var a in  groups.goods[j].list){
			//       var _goods = groups.goods[j].list[a];
			//       for (var k in this.data.selectedGoods) {
			//         if (this.data.selectedGoods[k].cart_id === _goods.cart_id && !this.data.edit_mode) {
			//           this.setData({
			//             totalPrice: (this.selectedPrice + this.svipGoodsPrice - this.savePrice).toFixed(2)
			//           })
			//         }
			//       }
			//     }
			//
			//   }
			//   this.setData({
			//     selectedAmount: amount,
			//     sendMsg: sendMsg
			//   })
			// },
			//计算选中合计商城价格/数量
			recomputeSVIPPrice: function() {
				var price = 0;
				var goods = this.selectedGoods;

				for (var i = 0; i < goods.length; ++i) {
					var _price = goods[i].shop_price;

					if (goods[i].is_on_sale == 1 && goods[i].is_enough == 1 && goods[i].is_disable == 0) {
						price += goods[i].amount * _price;
					}
				}

				this.selectedSVIPPrice = price.toFixed(2);
			},
			//设置结算价格
			setSettledPrice: function() {
				this.svipGoodsPrice = 0;
				this.savePrice = 0;
			},
			// 数据案例
			loadCartData: function(callback) {
				var that = this;
				var url = app.getPath.cartList;
				var data = {};
				common.ApiGateWayTest(url, data, true, function(res) {
					var res = res.data;

					if (res) {
						var groups = res.result;
						var hasInvalid = false;

						for (var j in groups.goods) {
							for (var k in groups.goods[j].list) {
								//编辑模式下要更新编辑商品数量
								groups.goods[j].list[k].edit_amount = groups.goods[j].list[k].amount;
								groups.goods[j].list[k].min_buy_amount = groups.goods[j].list[k].min_buy_amount ? groups.goods[j].list[k].min_buy_amount :
									1;

								if (groups.goods[j].list[k].is_enough == 0 || groups.goods[j].list[k].is_on_sale == 0 || groups.goods[j].list[
										k].is_disable == 1) {
									hasInvalid = true; //						break;
								}
							}
						}

						that.setData({
							groups: groups,
							hasInvalid: hasInvalid,
							selectedGoods: [],
							totalPrice: '0.00',
							selectedAmount: 0,
							isSelectedAll: false
						});
						that.count();
						that.touchSelectAll();

						if (typeof callback === "function") {
							callback();
						}
					}
				});
			},
			//计算购物车所有商品市场价格和商城价格
			computeAllPrice: function() {
				var groups = this.groups;
				var all_price = 0;
				var all_market_price = 0;

				for (var j = 0; j < groups.goods.length; ++j) {
					for (var k = 0; k < groups.goods[j].list.length; ++k) {
						var _market_price = groups.goods[j].list[k].market_price;
						var _price = groups.goods[j].list[k].shop_price;

						if (groups.goods[j].list[k].is_on_sale == 1 && groups.goods[j].list[k].is_enough == 1 && groups.goods[j].list[k]
							.is_disable == 0) {
							all_price += groups.goods[j].list[k].amount * _price;
							all_market_price += groups.goods[j].list[k].amount * _market_price;
						}
					}
				}

				this.allPrice = all_price.toFixed(2);
				this.allMarketPrice = all_market_price.toFixed(2); //设置结算价格

				this.setSettledPrice();
			},
			//计算商品数量合计
			count: function() {
				var count = 0;

				if (this.groups) {
					var groups = this.groups;

					for (var j = 0; j < groups.goods.length; ++j) {
						for (var k = 0; k < groups.goods[j].list.length; ++k) {
							count += groups.goods[j].list[k].amount;
						}
					}
				}

				this.setData({
					total: count
				});
			},
			//刷新编辑状态的数量
			refreshEditModeAmount: function() {
				var groups = this.groups;
				var goods = groups.goods;

				for (var j in goods) {
					for (var k in goods[j].list) {
						goods[j].list[k].edit_amount = goods[j].list[k].amount;
					}
				}

				this.setData({
					groups: groups
				});
			},
			//点击删除按钮
			touchDelete: function() {
				var that = this;

				if (!that.selectedGoods || !that.selectedGoods.length) {
					common.toast('还没有选择任何商品哦~');
					return;
				}

				var content = '是否要删除选中商品';
				var confirmText = '确定';
				common.showModal(content, confirmText, function(res) {
					if (res.confirm) {
						var uploadData = [];

						for (var i in that.selectedGoods) {
							uploadData.push(that.selectedGoods[i].cart_id);
						}

						if (uploadData.length <= 0) return;
						that.delete(uploadData, function(success) {
							if (success) {
								common.toast('删除成功');
								that.deletingGoods = null;
								that.recomputePrice();
								that.getCartPrice();
							}
						}, function() {
							that.refreshEditModeAmount();
						});
					} else if (res.cancel) {
						that.deletingGoods = null;
					}
				});
			},
			//一键删除所有失效商品
			delAllInvalidGoods: function() {
				var that = this;
				var content = '确认清空所有失效商品？';
				var confirmText = '确定';
				var clearLoseCartUrl = app.getPath.clearLoseCart;
				common.showModal(content, confirmText, function(res) {
					if (res.confirm) {
						var groups = that.groups;
						var selectedGoods = [];

						for (var j = 0; j < groups.goods.length; ++j) {
							for (var k = 0; k < groups.goods[j].list.length; ++k) {
								if (groups.goods[j].list[k].is_on_sale == 0 || groups.goods[j].list[k].is_enough == 0 || groups.goods[j].list[
										k].is_disable == 1) {
									var goods = groups.goods[j].list[k];
									selectedGoods.push(goods.cart_id);
								}
							}
						}

						if (selectedGoods.length <= 0) return; // 一键清空失效商品API

						common.ApiGateWayTest(clearLoseCartUrl, {}, true, function(res) {
							if (res.data.success == 1) {
								common.toast('删除成功');
								that.deletingGoods = null;
								that.loadCartData();
							}
						}); // that.delete(selectedGoods, function (success) {
						//   if (success) {
						//     common.toast('删除成功');
						//     that.deletingGoods = null;
						//     that.recomputePrice();
						//   }
						// });
					} else if (res.cancel) {
						that.deletingGoods = null;
					}
				});
			},
			//删除单个商品
			touchDel: function(e) {
				var _this = this;

				common.formIdUpdate(e);
				common.showModal('确认删除该商品？', '删除', function(res) {
					if (res.confirm) {
						// 删除
						var url = app.getPath.delCart;
						var data = {
							cart_ids: e.currentTarget.dataset.product.cart_id.toString()
						};
						common.ApiGateWayTest(url, data, true, function(res) {
							if (res.data && res.data.success == 1) {
								_this.loadCartData();

								_this.count();
							}
						});
					}
				});
			},
			//删除购物车商品
			delete: function(goodsId, callback, loadcallback) {
				var _this = this;

				var url = app.getPath.delCart;
				var data = {
					cart_ids: goodsId.join(",")
				};
				common.ApiGateWayTest(url, data, true, function(res) {
					if (res.data && res.data.success == 1) {
						_this.loadCartData(loadcallback);

						_this.count();
					}

					typeof callback === "function" && callback(res.data.success == 1);
				});
			},
			//点击收藏按钮
			touchWinlog: function() {
				var that = this;

				if (!that.selectedGoods || !that.selectedGoods.length) {
					common.toast('还没有选择任何商品哦~');
					return;
				}

				var content = '是否将商品移入收藏？';
				var confirmText = '确定';
				common.showModal(content, confirmText, function(res) {
					if (res.confirm) {
						var uploadData = [];
						var selectedGoods = [];

						for (var i in that.selectedGoods) {
							uploadData.push(that.selectedGoods[i].goods_id);
							selectedGoods.push(that.selectedGoods[i].cart_id);
						}

						if (uploadData.length <= 0 || selectedGoods.length <= 0) return;
						var url = app.getPath.goodsLike;
						var data = {
							goods_id: uploadData.join(',')
						};
						common.ApiGateWayTest(url, data, true, function(res) {
							if (res.statusCode == 200) {
								common.toast('收藏成功');
								that.delete(selectedGoods, function(success) {
									if (success) {
										that.loadCartData(that.refreshEditModeAmount);
										that.count();
										that.deletingGoods = null;
										that.recomputePrice();
									}
								});
							}
						});
					} else if (res.cancel) {
						that.deletingGoods = null;
					}
				});
			},
			//跳转活动页
			load_select: function(e) {
				let id = e.currentTarget.dataset.activity_id;
				wx.navigateTo({
					url: '../../packageA/select/select?entryType=external&id=' + id
				});
			},
			// 去结算
			toNowpay: function(e) {
				var that = this; // 判断是否登录或者老用户

				var isOldUser = common.getStorageSync('isOldUser');

				if (!app.checkSessionKey || isOldUser == 2) {
					common.goRegister();
					return false;
				}

				var selectedGoods = that.selectedGoods;
				common.formIdUpdate(e);

				if (selectedGoods.length > 0) {
					common.setStorage({
						key: "nowPay",
						data: selectedGoods
					});
					wx.navigateTo({
						url: '/pages/confirm/confirm'
					});
				} else {
					common.toast('请勾选需要结算的商品');
				}
			},
			touchProduct: function(e) {
				var id = e.currentTarget.dataset.product.goods_id;
				wx.navigateTo({
					url: '../product/product?entryType=external&productId=' + id
				});
			},
			goHome: function(e) {
				wx.switchTab({
					url: '../index/index'
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
	@import "./cart.css";
</style>
