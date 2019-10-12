<template>
	<!--components/goodList/goodList.wxml-->
	<!-- 列表组件 -->
	<view class="configureModel clearfix">
		<view id="homeBlock">
			<view class="homeBlock" v-for="(list, index) in block_list" :key="index">
				<view v-for="(item, index2) in list" :key="index2">
					<view class="item-block" v-if="(item.type == 1 || item.type == 2)&&item.route.url!='coupon'">
						<image :class="(item.imgcss==1?'block-image-cover':'block-image')" @tap="goThePage" :data-type="item.type"
						 :data-route="item.route" :src="item.pic" v-if="item.type == 1"></image>
						<image class="bar-image" @tap="goThePage" :data-type="item.type" :data-route="item.route" :src="item.title" v-if="item.type == 2"></image>
					</view>
					<!-- 优惠券 -->
					<view class="coupon_wrap" v-if="(item.type == 1 || item.type == 2)&&item.route.url=='coupon'">
						<image class="cover_img" :src="iconURL + '/img_ztyhqzz@2x.png'"></image>
						<scroll-view scroll-x="true" class="scroll_wrap">
							<view class="coupon" :style="'background-image:url(' + iconURL + '/img_xrzxyhqbg@2x.png)'" v-for="(coupon, index3) in item.route.param"
							 :key="index3">
								<view class="price">
									<text class="small">￥</text>{{coupon.money}}</view>
								<view class="tab">
									<text class="text">{{coupon.use_type}}</text>
								</view>
							</view>
						</scroll-view>
						<view class="total_box">
							<view class="total_price">
								<text class="small">￥</text>{{item.route.total}}</view>
							<view class="get_btn" v-if="item.route.take==1" @click.stop="akeyToGet" :data-ad_id="item.route.ad_id"
							 :data-param="item.route.param" :style="'background-image:url(' + iconURL + '/btn_yjlq@2x.png)'"></view>
							<view class="get_btn" v-if="item.route.take==2" :style="'background-image:url(' + iconURL + '/yilingqu.png)'"></view>
						</view>
					</view>
					<!-- <view class="header-bar" wx:if="{{item.type == 2}}">
            <image class="bar-image" bindtap="goThePage(item.route)" src="{{item.title}}"></image>
            <text bindtap="goThePage(item.route)" class="bar-more t2 iconfont">更多 &#xe603;</text>
        </view> -->
					<view class="block-product" v-if="item.type == 3&&item.sortype==1">
						<goodList :list="item.goods" type="3" symbolSize="small" align="center"></goodList>
					</view>
					<view class="block-product" v-if="item.type == 3&&item.sortype==2" :style="'background-image:url(' + iconURL + '/jbbj.png);'">
						<swiper class="good_wrap" style="height:470rpx;" indicator-dots="true" indicator-active-color="#ffbb44"
						 indicator-color="#ddd">
							<block>
								<swiper-item v-for="(goodArr, index3) in item.goods" :key="index3">
									<goodList :list="goodArr" type="3" symbolSize="small" align="center"></goodList>
								</swiper-item>
							</block>
						</swiper>
					</view>
					<view class="item-block block-margin" v-if="item.type == 4">
						<view v-if="item.route.length == 1">
							<image class="block-image-1" @tap="goThePage" :data-type="item.type" :data-route="item.route[0]" :src="item.route[0].pic"></image>
						</view>
						<view v-if="item.route.length == 2" class="row block-merge-horizontal">
							<image class="block-image-2" @tap="goThePage" :data-type="item.type" :data-route="img" wx:for-item="img"
							 :for-item="img" :src="img.pic" v-for="(img, index) in item.route" :key="index"></image>
						</view>
						<view v-if="item.route.length == 3" class="row block-merge-horizontal">
							<image class="block-image-2" @tap="goThePage" :data-type="item.type" :data-route="item.route[0]" :src="item.route[0].pic"></image>
							<view class="block-image-2">
								<image class="block-image-3" @tap="goThePage" :data-type="item.type" :data-route="item.route[1]" :src="item.route[1].pic"></image>
								<image class="block-image-3" @tap="goThePage" :data-type="item.type" :data-route="item.route[2]" :src="item.route[2].pic"></image>
							</view>
						</view>
						<view v-if="item.route.length >= 4" class="row block-merge-width">
							<image :class="'block-image-3 block-image-bottom' + (index%2 == 0 ? ' block-image-right' : '')" @tap="goThePage"
							 :data-type="item.type" :src="img.pic" v-for="(img, index) in item.route" :key="index"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>

	<!-- class="good_card{{type}} {{(index+1)%type==0 ? '' : space}}" wx:for="{{list}}" wx:key="{{item.goods_id}}" -->
</template>

<script>
	// components/goodList3/goodList3.js

	/**
	 * type为2为两列列表
	 * type为3为三列列表
	 */
	var app = getApp().globalData;
	var common = require("../../../utils/common.js");
	import goodlist from "../../../components/goodList/goodList";

	export default {
		data() {
			return {
				iconURL: app.dataBase.iconURL,
				block_list: []
			};
		},

		components: {
			goodlist
		},
		props: {
			list: {
				type: Array,
				value: [],
				observer: function(newVal, oldVal, changedPath) {
					// 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
					// 通常 newVal 就是新设置的数据， oldVal 是旧数据
					var that = this;
					newVal.forEach(function(data) {
						data.forEach(function(item) {
							if (item.sortype == 2) {
								item.goods = that.rowFormat(3, item.goods);
							}
						});
					});

					if (newVal.length > 0) {
						this.setData({
							block_list: newVal
						});
					}
				}
			}
		},
		methods: {
			goThePage(e) {
				var item = e.target.dataset.route;
				var itemType = e.target.dataset.type;
				var pickup = common.getStorageSync('getpickup');

				if (itemType == 4) {
					// app.aldstat.sendEvent("on_index_combination_" + item.sort, {
					//   "提货点": pickup.cityName
					// });
				}

				if (item.url == '' || item.param == '' || item.param.length == 0) return;

				if (item.url == 'url') {
					let url = "";
					let title = "";

					for (let i = 0; i < item.param.length; i++) {
						if (item.param[i].key == 'url') url = item.param[i].value;
						if (item.param[i].key == 'title') title = item.param[i].value;
					}

					window.open(url);
					return;
				}

				let jsonParams = {};

				for (let i = 0; i < item.param.length; i++) {
					jsonParams[item.param[i].key] = item.param[i].value;
				} // return


				if (item.url == "jumpindexmodel") {
					// 跳转聚合
					wx.navigateTo({
						url: '/pages/index/configureModelPage/configureModelPage?position=' + jsonParams.position
					});
				} else {
					if (jsonParams.type == 1) {
						// 专题
						wx.navigateTo({
							url: '/pages/projectPage/projectPage?entryType=external&type=3&id=' + jsonParams.id
						});
					} else {
						// 活动
						wx.navigateTo({
							url: '/pages/activity/activity?entryType=external&activity_id=' + jsonParams.id
						});
					}
				}
			},

			// 一键领取
			akeyToGet(e) {
				// console.log(e.target.dataset.ad_id);
				// return
				// 跳转登录
				var isOldUser = common.getStorageSync('isOldUser');

				if (!app.checkSessionKey || isOldUser == 2) {
					common.goRegister();
					return false;
				}

				var that = this;
				var param = e.target.dataset.param;
				var ad_id = e.target.dataset.ad_id;
				var coupon_id = [];
				param.forEach(function(item) {
					coupon_id.push(item.id);
				});
				var uri = app.getPath.addCoupon;
				var data = {
					coupon_id: coupon_id
				};
				common.ApiGateWayTest(uri, data, true, function(res) {
					if (res && res.data && res.data.success == 1) {
						var result = res.data.result;
						common.toast(result.state_desc);
						that.$emit('toGet', {}, {}); // if (result.state == 0) {
						//   that.adclose(ad_id, 1)
						// }
					}
				});
			},

			/**
			 * 格式化一维数组为二维数组
			 * colNum: 列数
			 * arr：传入的总数组数
			 * **/
			rowFormat(colNum, arr) {
				let FormatArr = [];
				let rowNum = arr.length / colNum;

				for (var i = 0; i < rowNum; i++) {
					FormatArr.push(new Array());

					for (var j = i * colNum; j < colNum * (i + 1); j++) {
						if (arr[j] != undefined) {
							FormatArr[i].push(arr[j]);
						}
					}
				}

				return FormatArr;
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
	@import "./configureModel.css";
</style>
