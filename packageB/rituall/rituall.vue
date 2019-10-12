<template>
	<view>
		<view class="order-filter rituallTitle">
			<view :class="'filter-item ' + (currentTap==0 ? 'active' : '' )" data-current="0" @click.stop="swichNav">
				<text>未使用</text>
			</view>
			<view :class="'filter-item ' + (currentTap==1 ? 'active' : '' )" data-current="1" @click.stop="swichNav">
				<text>已使用</text>
			</view>
			<view :class="'filter-item ' + (currentTap==2 ? 'active' : '' )" data-current="2" @click.stop="swichNav">
				<text>已失效</text>
			</view>
		</view>
		<view class="rituallContent">
			<view v-if="vou && vou.length > 0">
				<view :class="'orderDetails ' + (currentTap==2 ? 'odd' : '')" v-for="(item, index) in vou" :key="index">
					<view :class="'orderListDetails ' + (currentTap==2 ? 'odd': '')">
						<view class="col-70 ticket-left">
							<view class="color_theme ticket-title">{{item.name}}</view>
							<view class="ticket-dec">{{item.description}}</view>
							<view class="color_theme ticket-time">{{item.use_end_date}}</view>
						</view>
						<view class="col-30 ticket-button color_theme" :hidden="currentTap!=0" @tap="like">使用</view>
						<view class="button-image" :hidden="currentTap!=1">
							<image :src="iconURL + '/icon_cashgift_used.png'" mode="widthFix"></image>
						</view>
						<view class="button-image" :hidden="currentTap!=2">
							<image :src="iconURL + '/icon_cashgift_deprecated.png'" mode="widthFix"></image>
						</view>
						<!-- <view class='ticket-item'>
        <view class="productInfo">
          <text class="x">{{item.name}}</text>
          <text class="y">{{item.value}}</text>
        </view>
        <view class="pr">

          -- <text class="n">使用期限</text> --
          <text class="b">{{item.use_end_date}}</text>
        </view>
      </view>
      <view class="hh" hidden='{{currentTap!=0}}' bindtap="like">使用</view>
      <view class="image-hh" hidden='{{currentTap!=1}}'>
        <image src='{{iconURL}}/icon_cashgift_used.png' mode='widthFix'></image>
      </view>
      <view class="image-hh" hidden='{{currentTap!=2}}'>
        <image src='{{iconURL}}/icon_cashgift_deprecated.png' mode='widthFix'></image>
      </view> -->
					</view>
					<!-- <view class='orderListFooter {{item.checked ? "unfold" : ""}}' bindtap='unfoldCoupon' data-checked='{{item.id}}'>
      <div class='width90 i'>
        {{item.description}}
      </div>
      <div class='width10 couponArrow'>
        <image src='{{iconURL}}/icon_cashgift_down.png' class='pa' hidden='{{item.checked}}'></image>
        <image src='{{iconURL}}/icon_cashgift_up.png' class='pa' hidden='{{!item.checked}}'></image>
      </div>
    </view> -->
				</view>
			</view>
			<view class="empty" v-if="vou && vou.length <= 0 && !couponType">
				<view class="empty-item">
					<image class="item-logo" :src="iconURL + '/icon_coupon_empty.png'" mode="widthFix"></image>
					<text class="item-text">暂无优惠券</text>
				</view>
			</view>
			<view class="refreshEnd" v-if="!refresh && vou.length > page_size">
				<text>没有更多啦~</text>
			</view>
		</view>
	</view>
</template>

<script>
	// pages/panic/panic.js
	var app = getApp().globalData;
	const common = require("../../utils/common.js");
	var code;

	export default {
		data() {
			return {
				iconURL: app.dataBase.iconURL,
				vou: [],
				currentTap: '0',
				page: 1,
				page_size: 5,
				refresh: true,
				couponType: true,
				complete: "",
				content: ""
			};
		},

		components: {},
		props: {},
		onLoad: function(options) {
			this.setData({
				page: 1
			});
			var current = this.currentTap; // this.swichNav(0);

			this.getCouponList(current); // 页面初始化 options为页面跳转所带来的参数
		},
		//兑换优惠券（暂无）
		// couponCode: function (e) {
		//   var showType;
		//   code = e.detail.value;
		//   if (code.length > 0) {
		//     showType = true;
		//   } else {
		//     showType = false;
		//   }
		//   this.setData({
		//     code: code,
		//     sendCode: showType
		//   })
		// },
		// sendCode: function () {
		//   var that = this;
		//   var url = "/Api/api.cashgift.actAddBouns";
		//   var data = {
		//     bonus_sn: code,
		//     openid: 'a3e8fd9b6782a72836efcbaa483e3d47',
		//     adtag: '',
		//     adtag2: ''
		//   }
		//   common.ApiGateWayTest(url, data,'', function (res) {
		//   })
		// },
		//下拉刷新
		onPullDownRefresh: function() {
			var current = this.currentTap;
			this.setData({
				vou: [],
				refresh: true,
				page: 1
			});
			this.getCouponList(current);
		},
		//上拉加载
		onReachBottom: function() {
			if (this.refresh) {
				this.setData({
					page: this.page + 1
				});
				var current = this.currentTap;
				this.getCouponList(current);
			}
		},
		methods: {
			//优惠券去使用
			like: function(e) {
				wx.switchTab({
					url: '../../pages/index/index'
				});
			},
			//分栏切换
			swichNav: function(e) {
				var current = e.currentTarget.dataset.current;
				this.setData({
					currentTap: current,
					vou: [],
					refresh: true,
					page: 1
				});
				wx.pageScrollTo({
					scrollTop: 0,
					duration: 0
				});
				this.getCouponList(current);
			},
			//获得优惠券各状态列表
			getCouponList: function(current, page) {
				var that = this;
				var url = app.getPath.getCouponList;
				var data = {
					page: that.page,
					page_size: that.page_size,
					status: current
				};
				common.ApiGateWayTest(url, data, true, function(res) {
					if (res && res.data && res.data.success == 1) {
						var vou = res.data.result.data;

						if (vou.length > 0) {
							for (var i in vou) {
								vou[i]['checked'] = 0;
							}

							that.setData({
								vou: that.vou.concat(vou),
								couponType: true
							}); //没有下一页数据

							if (vou.length < that.page_size) {
								that.setData({
									refresh: false,
									complete: '没有更多啦~'
								});
							}
						} else {
							//  common.toast(res.data.msg)
							that.setData({
								couponType: false,
								refresh: false
							});
						}

						wx.stopPullDownRefresh();
					} else if (res && res.data && res.data.success == 0) {
						that.setData({
							couponType: false,
							content: res.data.msg
						});
					}
				});
			},
			//优惠券说明展开
			unfoldCoupon: function(e) {
				var id = e.currentTarget.dataset.checked;

				for (var i in this.vou) {
					if (id == this.vou[i].id) {
						this.vou[i].checked = !this.vou[i].checked;
					}
				}

				this.setData({
					vou: this.vou
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
	@import "./rituall.css";
</style>
