<template>
	<!--components/goodList/goodList.wxml-->
	<!-- 列表组件 -->
	<view class="goodList clearfix">
		
		<view :class="'row ' + (type==2?'between':'')" >
<!-- 		<view :class="'row ' + (type==2?'between':'')" v-for="(good_list, index) in recommend_goods" :key="index"> -->
			<view hover-class="none" :class="'good_card' + type + ' ' + (type==3?'mr4':'')" v-for="(item, index) in lists" :key="index">
				<view :class="'good_pic' + type + ' mb12 good_pic inequacy_wrap'" :style="'background-image:url(' + iconURL + '/cstp.png)'">
					<image class="goods_lable" v-if="item.goods_lable.length>0" :src="item.goods_lable"></image>
					<view class="discount_label" v-if="item.img_content&&item.img_content.length>0 && type != 3">{{item.img_content}}</view>

					<image lazy-load="true" mode="scaleToFill" :src="item.list_img"></image>
					<view class="inequacy" v-if="item.is_enough==0">
						<image :src="iconURL + '/inequacy02.png'"></image>
					</view>

					<!-- <view class='prom_info' wx:if="{{item.prom_info.prom_label}}">{{item.prom_info.prom_label}}</view> -->
				</view>
				<view :class="'good_info' + type">
					<view class="title mb12">
						<view class="team-tips-box" v-if="item.label_list.length>0">
							<view v-for="(tips, tipsindex) in item.label_list" :key="tipsindex" :class="'team-tips ' + (tips.type==2?'tips-active':'')">{{tips.name}}</view>
						</view>
						{{item.goods_name}}
					</view>
					<view class="price red-font-color mb24" :style="'text-align:' + align">
						<text :class="symbolSize" style="font-size:26rpx;">¥</text>
						<text :class="(symbolSize=='small'?'font_16w':'')">{{item.shop_type==0?item.shop_price:item.month_price+'/月'}}</text>
						<view class="tab" v-if="item.is_special_price">特价</view>
						<!-- <view class='tab' wx:if="{{item.is_new}}">上新</view> -->
						<text v-if="item.shop_type == 0 && item.shop_price != item.market_price && !(type == 3 && item.is_special_price)"
						 class="small sPrice">¥{{item.market_price}}</text>
					</view>
				</view>
				<form @submit="goToProduct" :class="'index-from-goodsCard index-from-goodsCard' + type" :data-name="item.goods_name"
				 :data-goodsId="item.goods_id" report-submit="true">
					<button form-type="submit"></button>
				</form>
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
	// var app = getApp().globalData;
	var common = require("../../utils/common.js");

	export default {
		data() {
			return {
				iconURL: getApp().globalData.dataBase.iconURL,
				recommend_goods: [],
				recommend_goods2: [],
			};
		},
		components: {},
		props: {
			lists: {
				type: Array,
				value: [],
				/* observer: function(newVal, oldVal, changedPath) {
					//属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
					//通常 newVal 就是新设置的数据， oldVal 是旧数据
					if (newVal.length > 0) {
						console.log(newVal,oldVal,changedPath);
						var recommend_goods = this.rowFormat(this.properties.type, newVal);
						this.setData({
							recommend_goods
						});
					}
					
				} */
			},
			align: {
				type: String,
				value: "left"
			},
			type: {
				type: Number,
				value: 3
			},
			symbolSize: {
				type: String,
				value: ""
			}
		},
		beforeMount: function() {
			// var type = this.properties.type;
			// var symbolSize = this.properties.symbolSize;
		},
		created: function() {
			// uni.$on('shopList',(msg)=>{
			// 	this.rowFormat(this.type, msg)
			// })
			// console.log(this)
			//接受父组件传过来的值,这个值在父组件中下拉会改变,这个是动态请求
			// setTimeout(()=>{
			// 	if(this.lists.length<=10){
			// 		this.rowFormat(this.type, this.lists)
			// 	}else{
			// 		uni.$on('shopList',(msg)=>{
			// 			this.rowFormat(this.type, msg)
			// 		})
			// 	}
			// },1000)
			
		// 		uni.$on('shopList',(msg)=>{
		// 			this.rowFormat(this.type, msg)
		// 		})
		// 
		// 	
		// 	setTimeout(()=>{
		// 		if(this.lists.length<10){
		// 			this.rowFormat(this.type, this.lists)
		// 		}
		// 	},1000)
		},
		mounted: function() {
		},
		updated:function(){
		},
		watch:{
		},
		methods: {
		
			/**
			 * 格式化一维数组为二维数组
			 * colNum: 列数
			 * arr：传入的总数组数
			 * **/
			//这里把父组件传过来的值重构
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
				this.recommend_goods = FormatArr
				// return FormatArr;
			},

			// 跳转商品页
			goToProduct(e) {
				var goodsid = e.currentTarget.dataset.goodsid;
				var goodsName = e.currentTarget.dataset.name;
				if (getApp().globalData.checkSessionKey) {
					common.formIdUpdate(e);
				}
				var pickup = common.getStorageSync('getpickup');
				wx.navigateTo({
					url: '/pages/product/product?entryType=external&productId=' + goodsid
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
	@import "./goodList.css";
</style>
