<template>
	<view>
		<view class="container pos-rel">

			<!-- <view class='profile-header'>
     <view class='header-img'>
      <image wx:if="{{userInfo.head_pic}}" src='{{userInfo.head_pic}}'></image>
      <button hover-class='none' class='image-button' bindgetuserinfo='getUserinfo' open-type='getUserInfo' wx:if="{{!userInfo.nickname}}">
        <image wx:if="{{!userInfo.head_pic}}" src="{{iconURL}}/profile_noLogin.png"></image>
      </button>
    </view>
    <view wx:if="{{userInfo.nickname}}" class='header-name text_title_normal'>{{userInfo.nickname}}</view>
    <button hover-class='none' bindgetuserinfo='getUserinfo' open-type='getUserInfo' wx:if="{{!userInfo.nickname}}" class="header-name text_title_normal">戳我更新</button>
  </view> -->

			<!-- 头部信息 -->
			<!-- <view class='profile-header' style='background-image:url({{iconURL}}/img_personal_header.png)'> -->
			<image class="header-img" :style="'background-image:url(' + iconURL + '/user-bg01.png)'"></image>
			<view class="header-use-box">
				<view class="navbar-left">
					<view class="user-new-info">
						<view class="user_pic" @tap="goRegister" :style="'background-image:url(' + iconURL + '/default_pic.png)'">
							<!-- #ifdef MP-WEIXIN -->
							<image mode="aspectFit" @error="imageError" :src="userInfo.head_pic"></image>
							<!-- #endif -->
							<!-- #ifdef APP-PLUS -->
							<image mode="aspectFit" @error="imageError" :src="userInfo.avatarUrl"></image>
							<!-- #endif -->
						</view>
						<view class="header-right">
							<!-- #ifdef MP-WEIXIN -->
							<view class="header-name" v-if="userInfo.nickname">{{userInfo.nickname}}</view>
							<view class="header-name" @tap="goRegister" v-else>登录/注册</view>
							<!-- #endif -->
							<!-- #ifdef APP-PLUS -->
							<view class="header-name" v-if="userInfo.nickName">{{userInfo.nickName}}</view>
							<view class="header-name" @tap="goRegister" v-else>登录/注册</view>
							<!-- #endif -->
							
						</view>
					</view>
				</view>


			</view>
			<view class="profile-header">
				<!-- <view class='user_money' bindtap='goWhere2' data-url='/pages/user/money/money'>余额：<text><text class='font-24'>￥</text>{{userInfo.user_money?userInfo.user_money:"0.00"}}</text></view> -->
				<view class="user_info row">
					<!-- 充值中心按钮开始 -->
					<!-- <navigator   class='recharge_btn' url='/pages/recharge/recharge' style='background-image:url({{iconURL}}/btn_czzx@2x.png)'>
        <view>充值</view>
        <view>中心</view>
      </navigator> -->
					<!-- 充值中心按钮结束 -->
					<!-- <view class='user_pic' style='background-image:url({{iconURL}}/default_pic.png)'>
        <image mode="aspectFit" binderror='imageError' src='{{userInfo.head_pic}}'></image>
      </view> -->
					<!-- <image src='{{iconURL}}/img-personal-bg.png' class="img-personal-bg"></image> -->
					<!-- <view class='header-right'> -->
					<!-- <view class='header-name' wx:if="{{userInfo.nickname}}">{{userInfo.nickname}}</view> -->
					<!-- <button class='header-name' wx:else  open-type="getPhoneNumber" bindgetphonenumber="getPhone">注册/登录</button> -->
					<!-- <button class='header-name' open-type='getUserInfo' wx:else="{{userInfo.head_pic}}" bindgetuserinfo="getUserinfo">戳我更新</button> -->
					<!-- <view class='header-sign' bindtap='goToSign' wx:if="{{userInfo.sign == 0 && pickup.pickup_type == 0}}">
          每日签到<text class='iconfont icon-btn_gerenzhongxinyoujiantoux'></text>
        </view>
        <view class='header-sign sign-white' bindtap='goToSign' wx:if="{{userInfo.sign == 1 && pickup.pickup_type == 0}}">
          <text class='iconfont icon-img_dagoux'></text> 已签到
        </view> -->
					<!-- </view> -->

				</view>
				<view class="all-show-box-header">
					<view class="team-box" @tap="goWhere2" data-url="/pages/coupon/coupon?entryType=external">
						<view class="num">{{ordernum.can_use_coupon}}</view>
						<view class="text">优惠券</view>
					</view>
					<view class="team-box" @tap="goWhere" data-currentTab="4">
						<view class="num">{{ordernum.wait_team}}</view>
						<view class="text">待成团</view>
					</view>
					<view class="team-box" @tap="goBargain">
						<view class="num">{{ordernum.my_bargain}}</view>
						<view class="text">我的砍价</view>
					</view>
				</view>
			</view>

			<!-- 订单列表 -->
			<view class="user-all-order">
				<view class="order_name" @tap="goWhere" data-currentTab="0">
					<view class="order-hr">
						<text>我的订单</text>
						<view class="all-order">全部订单
							<view class="iconfont icon-btn_xiangyoudajiantoux icon-right"></view>
						</view>
					</view>

				</view>
				<view class="my_order row">
					<view class="order_item" @tap="goWhere" data-currentTab="1">
						<image class="user-new-img" :src="iconURL + '/new-be-pay.png'">
							<view class="don" v-if="ordernum.wait_pay>0">{{ordernum.wait_pay}}</view>
						</image>
						<text>待支付</text>
					</view>
					<view class="order_item" @tap="goWhere" data-currentTab="4">
						<image class="user-new-img" :src="iconURL + '/new-be-team.png'">
							<view class="don" v-if="ordernum.wait_team>0">{{ordernum.wait_team}}</view>
						</image>
						<text>待成团</text>
					</view>
					<view class="order_item" @tap="goWhere" data-currentTab="2">
						<image class="user-new-img" :src="iconURL + '/new-be-get.png'">
							<view class="don" v-if="ordernum.wait_take>0">{{ordernum.wait_take}}</view>
						</image>
						<text>待提货</text>
					</view>
					<view class="order_item" @tap="goWhere" data-currentTab="3">
						<image class="user-new-img" :src="iconURL + '/new-be-comment.png'">
							<view class="don" v-if="ordernum.wait_comment>0">{{ordernum.wait_comment}}</view>
						</image>
						<text>待评价</text>
					</view>
					<view class="order_item" @tap="goWhere2" data-url="/packageA/user/my-order-return">
						<image class="user-new-img" :src="iconURL + '/new-after-sale.png'"></image>
						<text>售后</text>
					</view>
				</view>
			</view>
			<!-- 广告 -->
			<view class="user-ad" v-if="adList.length > 0 && adList[0].ad_code != '' && !invite_info.invite_list">
				<view class="swipers newSwipers indexAd" id="topHeight">
					<swiper :indicator-color="indicatorColor" :current="indexAdcurrent" indicator-active-color="#ffbb44"
					 :indicator-dots="indicatorDots" :circular="circular" :autoplay="!autoplay" :interval="interval" :duration="duration">
						<swiper-item v-for="(item, index) in adList" :key="index" :style="(item.ad_code?'':'background-image:url(' + iconURL) + '/cstp.png)'">
							<image mode="aspectFit" class="adImg newAdimg" :src="item.ad_code"></image>
							<form class="index-from-indexAd new" @submit="goWebView" data-type="2" :data-item="item" report-submit="true">
								<button form-type="submit"></button>
							</form>
						</swiper-item>
					</swiper>
				</view>
			</view>
			<!-- 充值中心广告部位 -->
			<!-- <navigator class='recharge_ad' url='/pages/recharge/recharge' hidden='true'>
    <image class='icon-gold' src='{{iconURL}}/img_jb@2x.png'></image>
    <view class='text1'>话费充值,惊喜大放送！</view>
    <view class='text2'>快速到账,安全保障，快捷方便</view>
    <view class='iconfont icon-btn_gerenzhongxinyoujiantoux'></view>
  </navigator> -->

			<!-- <view class='my-team-box'>
    <view class='set-item-team'>
      <view class="bor-b">
        <view class='nopadding row'>
          <view class='row'>
            <view class='iconfont icon-wodetuangoux'></view>
            <text class='t4 bargain-text'>我的团购</text>
          </view>
        </view>
      </view>
    </view>
    <view class='all-show-box'>
      <view class="team-box" bindtap='goWhere2' data-url='/pages/coupon/coupon?entryType=external'>
        <view class="num">{{ordernum.can_use_coupon}}</view>
        <view class="text">优惠券</view>
      </view>
      <view class="team-box" bindtap='goWhere' data-currentTab='4'>
        <view class="num">{{ordernum.wait_team}}</view>
        <view class="text">待成团</view>
      </view>
      <view class="team-box" bindtap='goBargain'>
        <view class="num">{{ordernum.my_bargain}}</view>
        <view class="text">我的砍价</view>
      </view>
    </view>
  </view> -->
			<!-- <view class='my_set'>
    <view class='set_item' bindtap="toTakeout">
      <view class="bor-b">
        <button class='button_no-padding row'>
          <view class='row'>
            <view class='iconfont icon-shansongdingdanx'></view>
            <text class='t4 bargain-text'>闪送订单</text>
          </view>
          <view class='iconfont icon-btn_gerenzhongxinyoujiantoux'></view>
        </button>
      </view>
    </view>
    <view class='set_item' bindtap="toShopCoupon">
      <view>
        <button class='button_no-padding row'>
          <view class='row flash_coupon'>
            <view class='all_shop_coupon' >
              <view class='iconfont icon-shansongyouhuiquan coupon-icon'></view>
              <text class='t4 bargain-text'>闪送红包</text>
            </view>
            <view class="no_use_coupon" wx:if="{{ordernum.can_use_shop_coupon&&ordernum.can_use_shop_coupon>0}}"><i>{{ordernum.can_use_shop_coupon}}</i>个未使用</view>
          </view>
          <view class='iconfont icon-btn_gerenzhongxinyoujiantoux'></view>
        </button>
      </view>
    </view>
  </view> -->


			<!-- <view class='my_set'>
    <view class='set_item item-wallet'>
      <view class='row bor-b'>
        <view class='row'>
          <view class='iconfont icon-btn_qianbaox'></view>
          <text class='t4'>我的钱包</text>
        </view>
      </view>
    </view>
    <view class='set-wallet row'>
      <view class='wallet-list' bindtap='goWhere2' data-url='/pages/user/money/money'>
        <view class='wallet-money'>￥{{userInfo.user_money?userInfo.user_money:"0.00"}}</view>
        <view class='wallet-item'>账户余额</view>
      </view>
      <view class='wallet-list' bindtap='goWhere2' data-url='/pages/coupon/coupon?entryType=external'>
       <!-- <text class='money-unit'>张</text> -->
			<!-- <view class='wallet-money'>{{ordernum.can_use_coupon}}</view>
        <view class='wallet-item'>红包</view>
      </view>
      <view class='wallet-list' bindtap='goWhere2' data-url='/pages/sign/integral/integral'>
        <view class='wallet-money'>{{userInfo.now_points?userInfo.now_points:0}}</view>
        <view class='wallet-item'>积分</view>
      </view>
    </view>
  </view>  -->

			<!-- <view class='my_set'  bindtap='goBargain'>
    <view class='set_item'>
      <view>
        <button class='button_no-padding row'>
          <view class='row'>
            <view class='iconfont icon-kanjiax'></view>
            <text class='t4 bargain-text'>我的砍价</text>
          </view>
          <view class='iconfont icon-btn_gerenzhongxinyoujiantoux'></view>
        </button>
      </view>
    </view>

  </view> -->

			<!-- 红包-邀请信息提示 -->
			<view class="lates-log" v-if="invite_info.invite_list.length > 0">
				<view class="row log-item" :style="'background-image: url(' + iconURL + '/user-invatation-bg.png)'">
					<image class="user-logo" :src="invite_info.invite_list[0].head_pic" mode="widthFix" @tap="getEnvelopes"></image>
					<view class="log-box" @tap="getEnvelopes">
						<view class="row msg-text">
							<view class="name">{{invite_info.invite_list[0].nickname}}</view>
							<view class="msg">通过你的分享来到了买买提</view>
						</view>
						<view class="row log-text">
							<view class="text">好友下单你最多可获得</view>
							<view class="price">8<i>元</i></view>
						</view>
					</view>
					<form report-submit="true" @submit="urgingReport">
						<button open-type="share" form-type="submit" class="log-btn">催他下单</button>
					</form>
				</view>
			</view>

			<!-- 底部item -->
			<view class="my_set">

				<!-- <view class='set_item' bindtap='goWhere2' data-url='/pages/coupon/coupon'>
      <view class='row bor-b'>
        <view class='row'>
          <view class='iconfont icon-btn_youhuiquanx1'>
            <view class='don' wx:if="{{ordernum.can_use_coupon>0}}">{{ordernum.can_use_coupon}}</view>
          </view>
          <text class='t4'>红包</text>
        </view>
        <view class='iconfont icon-btn_gerenzhongxinyoujiantoux'></view>
      </view>
    </view> -->
				<!-- <view class='set_item' bindtap='goWhere2' data-url='/pages/user/invitation/invitation'>
      <view class='row bor-b'>
        <view class='row'>
          <view class='iconfont icon-invite_icon'></view>
          <text class='t4'>邀请注册</text>
        </view>
        <view class='iconfont icon-btn_gerenzhongxinyoujiantoux'></view>
      </view>
    </view> -->
				<!-- <view class='set_item'>
      <button class='button_no-padding row  bor-b'   bindtap='goWhere2' data-url='/pages/coupon/coupon?entryType=external' >
        <view class='row'>
          <view class='iconfont icon-btn_youhuiquanx1'></view>
          <text class='t4'>我的红包</text>
        </view>
        <view class='iconfont icon-btn_gerenzhongxinyoujiantoux'></view>
      </button>
    </view> -->
				<!-- #ifdef MP-WEIXIN -->
				<view class="set_item" v-if="userInfo.mobile == ''">
					<button class="button_no-padding row bor-b" hover-class="none" open-type="getPhoneNumber" @getphonenumber="getPhone">
						<view class="row">
							<view class="iconfont icon-btn_bangdingshoujix"></view>
							<text class="t4">绑定手机</text>
						</view>
						<view class="iconfont icon-btn_gerenzhongxinyoujiantoux"></view>
					</button>
				</view>
				<view class="set_item" v-if="userInfo.has_express == 1" @tap="goLogistics">
					<view class="row bor-b">
						<view class="row">
							<view class="iconfont icon-btn_shangjiabanx"></view>
							<text class="t4">提货助手</text>
						</view>
						<view class="iconfont icon-btn_gerenzhongxinyoujiantoux"></view>
					</view>
				</view>
				<!-- #endif -->
				<view class="set_item" @tap="goWhere2" data-url="/pages/address/addressList/addressList">
					<view class="row bor-b">
						<view class="row">
							<view class="iconfont icon-btn_shouhuodizhix"></view>
							<text class="t4">收货地址</text>
						</view>
						<view class="iconfont icon-btn_gerenzhongxinyoujiantoux"></view>
					</view>

				</view>

				<view class="set_item" @tap="goWhere2" data-url="/pages/problem/problem">
					<view class="row bor-b">
						<view class="row">
							<view class="iconfont icon-btn_changjianwentix1"></view>
							<text class="t4">常见问题</text>
						</view>
						<view class="iconfont icon-btn_gerenzhongxinyoujiantoux"></view>
					</view>
				</view>
				<!-- <view class='set_item' wx:if="{{userInfo.mobile == ''}}">
      <button class='button_no-padding row bor-b' hover-class="none" open-type='getPhoneNumber' bindgetphonenumber="getPhone">
        <view class='row'>
          <view class='iconfont icon-btn_bangdingshoujix'></view>
          <text class='t4'>绑定手机</text>
        </view>
        <view class='iconfont icon-btn_gerenzhongxinyoujiantoux'></view>
      </button>
    </view> -->
				<view class="set_item" @tap="clearStorage">
					<view class="row bor-b">
						<view class="row">
							<view class="iconfont icon-qingchuhuancunx"></view>
							<text class="t4">清除缓存</text>
						</view>
						<view class="iconfont icon-btn_gerenzhongxinyoujiantoux"></view>
					</view>
				</view>
				<view class="set_item">
					<button class="button_no-padding row" hover-class="none" open-type="contact" session-from="lanlingapp">
						<view class="row">
							<view class="iconfont icon-lianxikefu"></view>
							<text class="t4">联系客服</text>
						</view>
						<view class="iconfont icon-btn_gerenzhongxinyoujiantoux"></view>
					</button>
				</view>

				<!-- <view class='set_item'>
      <view class='iconfont icon-btn_shezhix1'></view>
      <text>设置</text>
    </view> -->
			</view>
			<!-- 图片轮播 -->
			<!-- <view class="promotion">
    <image src='{{adList[0].ad_code}}'></image>
  </view> -->

			<!-- <view class='recommend'>
    <view class='title'><image src='{{iconURL}}/cztj.png'></image></view>
    <goodList list="{{recommend_good_list}}" type="2" align="left"></goodList>
  </view> -->
			<pageBottomLogo2></pageBottomLogo2>
		</view>

		<!-- 红包-顶部通知消息 -->
		<!-- <notice type="2"></notice> -->
	</view>
</template>

<script>
	// pages/user/user.js
	var app = getApp().globalData;
	var common = require("../../utils/common.js");

	export default {
		data() {
			return {
				navBarHeight: app.navBarHeight,
				iconURL: app.dataBase.iconURL,
				userInfo: {},
				subtotal: {},
				loadingText: '加载中...',
				loadingHidden: false,
				pickup: {},
				duration: 500,
				interval: 5000,
				indexAdcurrent: 0,
				indicatorColor: "#fff",
				indicatorActiveColor: "#eb3c39",
				circular: true,
				autoplay: false,
				adList: [],
				indicatorDots: false,
				invite_info: {} // checkSessionKey: app.checkSessionKey,
				// 上拉加载部分
				// refresh: true,
				// page:1,
				// recommend_good_list:[],
				// adList:[]
				,
				checkSessionKey: "",
				ordernum: ""
			};
		},

		components: {},
		props: {},
		onLoad: function() {
			var that = this;
			
		},

		onShow() {
			
			var that = this;
			// #ifdef APP-PLUS
			console.log('缓存的登录信息', common.getStorageSync('userInfo2'));
			that.userInfo = common.getStorageSync('userInfo2')
			// #endif
			var pickupId = common.getStorageSync('getpickup');
			var token = common.getStorageSync('token');
			this.setData({
				pickup: pickupId
			});
			this.getUserdata();
			this.getordernum();

			if (token && token != '') {
				this.getCsLatestUrgeLog();
			}

			this.setData({
				checkSessionKey: app.checkSessionKey
			});
			// app.aldstat.sendEvent("get_user", {
			//   "提货点": pickupId.cityName
			// }); 
			// 跳转登录
			// var isOldUser = common.getStorageSync('isOldUser');
			// if (!app.checkSessionKey||isOldUser==2) {
			//   wx.switchTab({
			//     url: '/pages/index/index',
			//     success(res){
			//       common.goRegister();
			//     }
			//   })
			// }
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
			// 前往登录注册
			goRegister() {
				var isOldUser = common.getStorageSync('isOldUser');
				console.log(this.checkSessionKey)
				console.log('点击了登录按钮', app.checkSessionKey)
				// #ifdef APP-PLUS
				common.goRegister2();
				// #endif
				if (!app.checkSessionKey || isOldUser == 2) {
					// #ifdef MP-WEIXIN 
					common.goRegister();
					// #endif
					return;
				}
				
			},

			// 获取手机号去登录注册
			getPhone: function(e) {
				var that = this;

				if (!(e.detail.encryptedData && e.detail.iv)) {
					return false;
				} 
				// 新用户注册
				// 获取手机号


				var mobileUri = app.getPath.getWXMobile; // 重新获取code获取手机号
				// #ifdef MP-WEIXIN
				wx.login({
					success: function(res) {
						var Mobiledata = {
							encryptedData: e.detail.encryptedData,
							iv: e.detail.iv,
							code: res.code
						};
						common.ApiGateWayTest(mobileUri, Mobiledata, true, function(resData) {
							if (resData.data.success == 1) {
								common.toast('绑定成功');
							} else {
								return;
							}

							that.getUserdata();
						});
					}
				});
				// #endif
			},
			goWhere: function(e) {
				var that = this;
				var currentTab = e.currentTarget.dataset.currenttab;
				console.log('currentTab',currentTab)
				if (app.checkSessionKey) {
					wx.navigateTo({
						url: "/packageA/user/dingdan?entryType=external&currentTab=" + currentTab
					});
				} else {
					that.goRegister();
				}
			},
			goWhere2: function(e) {
				var that = this;
				var url = e.currentTarget.dataset.url;
				console.log(url)
				if (app.checkSessionKey) {
					wx.navigateTo({
						url: url
					});
				} else {
					that.goRegister();
				}
			},
			//获取广告图
			getAd: function() {
				var that = this;
				var uri = app.getPath.adlist;
				var data = {
					pid: 3
				};
				return new Promise(function(resolve, reject) {
					common.ApiGateWayTest(uri, data, true, function(res) {
						if (res && res.data && res.data.success == 1) {
							var data = res.data.result;

							if (data.length > 1) {
								that.setData({
									indicatorDots: true
								});
							} else {
								that.setData({
									indicatorDots: false
								});
							}

							that.setData({
								adList: data,
								indexAdcurrent: 0,
								// share_title: data.share_title,
								indicatorDots: data.length > 1 ? true : false // keyWord: data.keyword

							});
							resolve('successAd');
						}
					});
				});
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
			// 跳转指定专题页
			goWebView: function(e) {
				common.goAdWebView(e);
			},
			getUserdata: function() {
				// #ifdef MP-WEIXIN 
				var that = this;
				var uri = app.getPath.userInfo;
				var expressUserUri = app.getPath.expressUserUri; // var subtotalUri = app.getPath.subtotal;
				common.ApiGateWayTest(uri, '', true, function(res) {
					if (res.data.success == 1) {
						var res = res.data.result;
						// console.log('用户信息',res)
						common.setStorage({
							key: 'userInfo',
							data: res
						});
						that.setData({
							userInfo: res
						});

						if (res.has_express == 1) {
							common.ApiGateWayTest(expressUserUri, '', true, function(res) {
								var resData = res.data;

								if (resData.success == 1) {
									common.setStorageSync('expressToken', resData.result.token);
									common.setStorageSync('getExpressPickupId', resData.result.pickup_id);
									that.pickupName = resData.result.pickup_name;
								} else {
									common.toast('获取商家信息失败');
								}
							});
						}
					}
				});
				that.getordernum();
				// #endif
			},
			// 更新用户信息
			getUserinfo: function(e) {
				var that = this;

				if (e.detail.userInfo) {
					var uri = app.getPath.getWXUserInfo;
					var data = {
						encrypted_data: e.detail.encryptedData,
						iv: e.detail.iv,
						signature: e.detail.signature
					};
					common.ApiGateWayTest(uri, data, true, function(data) {
						if (data.data.success == 1) {
							that.getUserdata();
						}
					});
				} else {
					common.toast('拒绝授权将无法体验完整功能，建议重新点击进行授权!');
				}
			},
			getordernum: function() {
				var that = this;
				var uri = app.getPath.getordernum;
				common.ApiGateWayTest(uri, '', true, function(res) {
					if (res.data.success == 1) {
						that.setData({
							ordernum: res.data.result
						});
					}
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

			goLogistics() {
				this.goRegister();
				wx.navigateTo({
					url: '../../packageA/logistics/index?pickupName=' + this.pickupName
				});
			},

			goToSign: function() {
				this.goRegister();
				wx.navigateTo({
					url: '../sign/sign?entryType=external'
				});
			},

			toTakeout() {
				this.goRegister();
				wx.navigateTo({
					url: '../../packageA/takeout-order/takeout-order?entryType=external'
				});
			},

			goBargain() {
				this.goRegister();
				wx.navigateTo({
					url: '../../packageA/mybargain/mybargain?entryType=external'
				});
			},

			toShopCoupon() {
				this.goRegister();
				wx.navigateTo({
					url: '../../packageA/takeout-coupon/takeout-coupon?entryType=external'
				});
			},

			// 邀请红包提示
			getCsLatestUrgeLog() {
				var that = this;
				var url = app.getPath.csLatestUrgeLog;
				common.ApiCoordination(url, '', true, function(res) {
					var resData = res.data;

					if (resData.success == 1) {
						if (resData.result.invite_list.length > 0) {
							that.setData({
								invite_info: resData.result
							});
						} else {
							that.getAd();
							that.setData({
								invite_info: {}
							});
						}
					}
				});
			},

			clearStorage() {
				wx.clearStorage({
					success: function(res) {
						common.toast('清除成功');
					}
				});
			},

			// 催促上报
			urgingReport(e) {
				common.formIdUpdate(e);
				var pickupId = common.getStorageSync('getpickup');
				// app.aldstat.sendEvent("user_urging_report", {
				//   "提货点": pickupId.cityName
				// });
			},

			// 跳转邀请记录页面
			getEnvelopes() {
				wx.navigateTo({
					url: '/packageB/invitation-share/invitation-share?type=2'
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
	@import "./user.css";
</style>
