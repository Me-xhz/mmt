<!-- 选择城市页面 -->
<template>
	<view class="uni-container">
		<!-- 定位 -->
		<view class="location">
			<view>定位</view>
			<view class="location-city">
				<view class="iconfont icon-btn_dizhix"></view>
				<view class="cityName">{{cityName}}</view>
			</view>
		</view>
		<!-- 城市 -->
		<scroll-view v-for="(item,index) in pList" :key="index" bindscroll="wxaSortPickerScroll" bindscrolltolower="wxaSortPickerLower"
		 bindscrolltoupper="wxaSortPickerUpper">
			<view class="word">{{item.letter}}</view>
			<view class="city-item-box">
				<view class="city-item" v-for="(item2,index2) in item.data" :key="index2" @click="navCity(item2.cName,item2.warehouse_id)">
					{{item2.cName}}
				</view>
			</view>
		</scroll-view>
		<view class="word-box">
			<view class="word-box-location">定位</view>
			<view class="word-item" v-for="(item,index) in wordArr" :key="index">{{item}}</view>
		</view>
	</view>
</template>

<script>
	var app = getApp().globalData;
	var common = require("../../../utils/common.js");
	export default {
		data() {
			return {
				list: [], //保存未排版好的工厂数据
				pList: [], //保存排版后的工厂数据
				wordArr: [], //保存字母数组
				chacheList: [],
				cityName: "莆田市",
				//这个判断点击城市跳到工厂页面还是添加收货地址页面,有数据的1时候跳到添加收货地址页面
				switch:''
			}
		},
		onLoad(e) {
			this.cityslist()
			var arr = Object.keys(e);
			if(arr.length > 0){
				this.switch = e.switch
			}
			
		},
		methods: {
			// 请求城市
			cityslist: function() {
				var that = this;
				var url = app.getPath.pickupregionlist;
				// console.log(url);
				common.ApiGateWayTest(url, {}, true, function(res) {
					var res = res.data;
					// console.log('请求城市', res.result.cities);
					that.chacheList = res.result.cities;
					that.transform(that.chacheList);
				});
			},
			// 点击城市,然后缓存城市信息
			navCity(cityName, warehouse_id) {
				console.log('点击城市');
				var that = this;
				//过滤后，留下所选中的城市
				let newCities = that.chacheList.filter(data => data.warehouse_id == warehouse_id)[0]
				//缓存城市
				common.setStorageSync('city', newCities);
				//这个为真时跳到收货地址页面
				if(that.switch){
					console.log('跳到收货地址页面');
					wx.navigateTo({
						url: '/pages/address/address'
					});
					
				}else{
					uni.navigateTo({
						url: `/pages/pickup2/pickup2?cityName=${cityName}&&warehouse_id=${warehouse_id}`
					})
					//缓存工厂
					common.setStorageSync('getpickup', newCities);
				}
				
				
			},
			// 封装一个方法来处理还没有去重的数据
			transform(data) {
				for (var i = 0; i < data.length; i++) {
					var py = data[i].py.charAt(0).toUpperCase(); //保存首字母
					var cName = data[i].cityName; //保存城市名称
					var warehouse_id = data[i].warehouse_id; //保存对应城市id
					var Obj = {
						"letter": '',
						"data": []
					}; // 保存字母和城市的子对象

					Obj.letter = py;
					Obj.data.push({
						"cName": cName,
						"warehouse_id": warehouse_id
					});
					if (this.list.length == 0 || this.wordArr.indexOf(py) == -1) {
						this.list.push(Obj);
						this.wordArr.push(py); //当list的长度为0时和当前py不在字母数组时，把字母加入到数组
					} else {
						for (var j = 0; j < this.list.length; j++) {
							if (this.list[j].letter == py) {
								this.list[j].data.push(cName);
							}
						}
					}
				}
				//对字母数组排序
				this.wordArr.sort();
				// 对数据进行按字母顺序排版
				for (var i = 0; i < this.wordArr.length; i++) {
					var w = this.wordArr[i]
					for (var j = 0; j < this.list.length; j++) {
						if (w == this.list[j].letter) {
							this.pList.push(this.list[j]);
						}
					}
				}
			},
			// 点击城市
			cityClick(e) {
				this.cityName = e;
				uni.navigateTo({
					url: './selectAddress',
					success: res => {}
				});
			}
		}
	}
</script>

<style lang="scss">
	page{
		background: #f2f2f2;
	}
	.location {
		background-color: #fff;
		padding: 16rpx 32rpx;
		align-items: center;
		font-size: 28rpx;

		.location-city {
			width: 200rpx;
			height: 60rpx;
			border: 1px solid #ebebeb;
			font-size: 32rpx;
			text-align: center;
			line-height: 60rpx;
			margin-top: 10rpx;
			color: #46595F;

			.iconfont {
				margin-right: 10rpx;
				font-size: 28rpx;
				color: #ffd122;
				display: inline-block;
			}

			.icon-btn_dizhix:before {
				content: "\e69f";
			}

			.cityName {
				display: inline-block;
			}
		}
	}

	// 字母
	.word {
		background-color: #F3F7F8;
		font-size: 32rpx;
		font-weight: bold;
		color: #46595F;
		height: 60rpx;
		line-height: 60rpx;
		padding: 0 32rpx;
	}

	//城市
	.city-item-box {
		background-color: #fff;
		padding: 0 32rpx;

		.city-item {
			height: 88rpx;
			line-height: 88rpx;
			border-bottom: 1px solid #DEE4E4;
			color: #46595F;
			font-size: 32rpx;
		}

		.city-item:last-child {
			border-bottom: none;
		}
	}

	// 右边的字母列表
	.word-box {
		width: 66upx;
		position: fixed;
		top: 17%;
		right: 20upx;
		transform: translateY(-50%);

		.word-box-location {
			text-align: center;
			padding: 2rpx;
			font-size: 24rpx;
			line-height: 34rpx;
			color: #888;
		}

		.word-item {
			text-align: center;
			padding: 2rpx;
			font-size: 24rpx;
			line-height: 34rpx;
			color: #888;
		}
	}
</style>
