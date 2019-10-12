<!-- 选择工厂页面 -->
<template>
	<view class="uni-container">
		<view class="fixedBox">
			<view class="tips">特别提醒：请正确选择您工作或生活所在工厂，以免发生无法进入而不能提货的情况。 </view>
			<!-- 选择城市和工厂 -->
			<view class="select-city-factory">
				<!-- 城市 -->
				<navigator class="cityName" url="./citys2/citys2" id="cn">{{city.cityName||'请选择城市'}}</navigator>
				<view class="iconfont icon-btn_sanjiaoxiaojiantoux"></view>
				<!-- 工厂 -->
				<text class="sg">|</text>
				<view class="iconfont icon-img_sousuox"></view>
				<input placeholder="请输入工厂名称" class="factoryName" @input="onKeyInput">
				<view class="cancel" @click="cancelClick" v-if="isNull">取消</view>
			</view>
			<!-- 黄色提示 -->
			<view class="yellow-tips" v-if="isTips&&!isNull&&pList.length > 0">
				<image class="bg-img" src="https://img.shop.haoyousheng.com.cn/wechat_icons/img_pick_select_bg01.png"></image>
				<text class="tips-text">选择自己所在的工厂</text>
				<image class="fork-img" src="https://img.shop.haoyousheng.com.cn/wechat_icons/btn_pick_select-closs.png" @click="forkclick"></image>
			</view>
			<view class="allFactory_position" v-if="!isNull&&pList.length > 0">
				<view class="allFactory">全部工厂</view>
				<view class="position">定位</view>
			</view>
		</view>
		<view class="factory_list" v-if="!isNull">
			<!-- 每一个工厂 -->
			<view v-for="(item,index) in pList" :key="index">
				<view class="factory-letter">{{item.letter}}</view>
				<view class="factory-data-box">
					<view class="fName" v-for="(item2,index2) in item.data" :key="index2" @click="navIndex(item2,index2)">{{item2}}</view>
				</view>
			</view>
		</view>
		<!-- 右边的字母 -->
		<view class="letter" v-if="!isNull">
			<view class="letter-item" v-for="(item,index) in wordArr" :key="index">{{item}}</view>
		</view>
		<!-- 戳一戳,选择城市 -->
		<view class="city-guide-box city-guide-box2" @tap="goToCity" v-if="pList.length <= 0">
			<image class="city-guide-gif" :src="iconURL + '/img_city_select_gif.gif'"></image>
			<view class="city-guide-msg">
				<image class="city-guide-msg-bg" :src="iconURL + '/img_city_select_bg01.png'"></image>
				<text class="city-guide-msg-text">戳一戳,选择城市</text>
			</view>
		</view>
		<!-- 定位失败 -->
		<view class='no_data' v-if="!city.warehouse_id">
			<image :src="iconURL + '/dwsb02.png'" style='width:280rpx;height:200rpx;'></image>
			<view class='text'>定位失败，请选择城市或者开启定位授权</view>
			<button class='set_btn' @click="openSet()">开通定位</button>
		</view>
		<!-- 当前城市没开通服务 -->
		<view class="no_data" v-if="pList.length<0">
			<image :src="iconURL + '/img_noAddress02.png'" style="width:280rpx;height:200rpx;"></image>
			<view class="text">当前城市暂未开通服务，请<text class="color_theme">更换城市</text></view>
		</view>
	</view>
</template>

<script>
	var app = getApp().globalData;
	var common = require("../../utils/common.js");
	export default {
		data() {
			return {
				iconURL: app.dataBase.iconURL,
				cityName: '',
				list: [], //保存未排版好的工厂数据
				pList: [], //保存排版后的工厂数据
				wordArr: [], //保存字母数组
				isTips: true, //是否显示黄色提示
				isNull: false, //搜索是否为空
				chacheList: [],
				inpValue: '',
				warehouse_id: '',
				city: {},
				isAuthorization: false,
				switch:''
			}
		},
		onLoad(options) {
			let than = this
			//利用缓存，判断是否显示城市坐在地区的工厂。如果时定位的是广州，city.city_id不存在，则不请求工厂
			let city = common.getStorageSync('city')
			if (city.city_id) {
				console.log('已选择有货的城市',city.cityName)
				than.warehouse_id = city.warehouse_id;
				than.getpickuplistr(than.warehouse_id)
				than.isTips = true;
			}
			if(options.switch==1){
				than.switch = options.switch
			}
			
			
		},
		onShow() {
			
			var that = this;
			that.setData({
				city: common.getStorageSync('city'),
				isAuthorization: common.getStorageSync('authSetting')['scope.userLocation']
			})
			common.setStorageSync('reLoad', true)
			// that.getpickuplistr()
		},
		created() {

		},
		methods: {
			//点击工厂，跳转到首页
			navIndex(item, index) {
				let that = this
				// console.log(item);

				// console.log('List',this.chacheList);

				// //这里传工厂的名字和开启页面index
				uni.$emit('update', {
					pickup_name: item,
					showPage: true
				})
				//过滤后，留下所选中的工厂
				let newPick = that.chacheList.filter(data => data.cityName == item)[0]
				//点击工厂，然后缓存，给index使用
				common.setStorageSync('getpickup', newPick);
				if(that.switch){
					wx.navigateTo({
						url: '/pages/address/address'
					});
				}else{
					uni.switchTab({
						url: '/pages/index/index',
					})
				}
				
				
			},
			// 点击取消
			cancelClick() {
				this.inpValue = '';
				this.isNull = false;
				this.getpickuplistr();
			},
			onKeyInput: function(e) {
				// console.log(e.detail.value);
				// console.log(this.chacheList);
				var searchData = [];
				for (var i = 0; i < this.chacheList.length; i++) {
					if (this.chacheList[i].cityName.indexOf(e.detail.value) != -1) {
						searchData.push(this.chacheList[i]);
					}
				}
				console.log("searchData:", searchData);
				this.transform(searchData);
			},
			// 封装一个方法来处理还没有去重的数据
			transform(data) {
				this.list = [];
				this.wordArr = [];
				this.pList = [];
				for (var i = 0; i < data.length; i++) {
					var py = data[i].py.charAt(0).toUpperCase(); //保存首字母
					var cName = data[i].cityName; //保存城市名称
					var Obj = {
						"letter": '',
						"data": []
					}; // 保存字母和城市的子对象
					Obj.letter = py;
					Obj.data.push(cName);
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
				this.pList.length == 0 ? this.isNull = true : this.isNull = false;
				// Array.from(this.pList) 
				// console.log(this.pList);
			},
			// 请求工厂
			getpickuplistr: function(warehouse_id) {
				let than = this
				var url = app.getPath.pickuplistr;

				var data = {
					warehouse_id: warehouse_id || than.warehouse_id
				};
				common.ApiGateWayTest(url, data, true, function(res) {

					console.log(res.data.result.cities);
					than.chacheList = res.data.result.cities;
					than.transform(than.chacheList);
				});

			},
			//缓存函数，缓存城市
			setStorage(warehouse_id) {
				console.log('获取提货点城市', warehouse_id);
				var than = this;
				var url = app.getPath.pickupregionlist;
				// 获取提货点
				common.ApiGateWayTest(url, {}, true, function(res) {

					console.log(res.data.result);
					if (res && res.data && res.data.success == 1) {
						let cities = res.data.result.cities

						//过滤数据
						let newCities = cities.filter(data => data.warehouse_id == warehouse_id)[0]
						than.cityName = newCities.cityName
						than.warehouse_id = newCities.cityName
						// than.chacheList = newCities;
						// than.transform(than.chacheList);
						uni.setStorage({
							key: 'cities2',
							data: newCities,
						});

					}
				});

			},
			getStorageSync(key) {
				return wx.getStorageSync(key);
			},
			// 点击隐藏黄色提示
			forkclick() {
				this.isTips = false;
			},
			goToCity() {
				uni.navigateTo({
					url: './citys2/citys2'
				})
			},
			//定位失败，请选择城市或者开启定位授权
			openSet: function() {
				var that = this;
				wx.openSetting({
					success: function(res) {
						console.log(res)
						common.getpickup(function() {
							that.setData({
								isAuthorization: res.authSetting["scope.userLocation"],
								city: common.getStorageSync('city'),
							})
						});
					},
					fail: function(res) {
						console.log(res)
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
	}
</script>

<style lang="scss">
	/* 无数据 */
	.no_data {
		margin-top: 150rpx;
		text-align: center;

	}

	.no_data .text {
		font-size: 32rpx;
		color: #555;
		font-weight: 600;
		margin-top: 48rpx;
	}

	.color_theme {
		/* 主色调 */
		color: #555;
	}

	.city-guide-box .city-guide-gif {
		width: 80rpx;
		height: 80rpx;
	}

	.city-guide-box .city-guide-msg {
		position: relative;
	}

	.city-guide-box .city-guide-msg-bg {
		width: 238rpx;
		height: 54rpx;
	}

	.city-guide-box .city-guide-msg-text {
		position: absolute;
		top: 10rpx;
		left: 20rpx;
		font-size: 28rpx;
		color: #555555;
	}

	.uni-container {
		background-color: #FFFFFF;
		height: auto;
	}

	.fixedBox {
		position: fixed;
		background-color: #fff;
		z-index: 50;
	}

	.fixedBox:after {
		content: "";
		display: block;
		clear: both;
	}

	/* 温馨提示*/
	.fixedBox>.tips {
		height: 100rpx;
		color: #FFB400;
		font-size: 28rpx;
		font-weight: 500;
		padding: 12rpx 24rpx;
		background-color: #FFFBE6;
		box-sizing: border-box;
	}

	/* 选择工厂和名称 */
	.select-city-factory {
		height: 60rpx;
		line-height: 60rpx;
		display: flex;
		margin: 15rpx 50rpx;
		background-color: #F3F3F3;
	}

	.cityName {
		font-size: 26rpx;
		color: #333;
		margin-left: 26rpx;
	}

	.icon-btn_sanjiaoxiaojiantoux {
		font-size: 20rpx;
		padding-left: 8rpx;
	}

	.icon-img_sousuox {
		color: #555;
		margin-left: 10rpx;
	}

	.factoryName {
		margin-left: 20rpx;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 26rpx;
	}

	/* 竖杆 */
	.select-city-factory .sg {
		margin-left: 10upx;
		font-size: 28upx;
		color: #E0E0E0;
	}

	.allFactory_position {
		display: flex;
		margin-top: 36upx;
		padding: 0 32upx;
		justify-content: space-between;
		align-items: flex-end;
	}

	.allFactory_position>.allFactory {
		color: #746B64;
		font-size: 28upx;
	}

	.allFactory_position>.position {
		color: #908E9A;
		font-size: 24upx;
	}

	// 取消按钮
	.cancel {
		box-sizing: border-box;
		position: absolute;
		right: 2upx;
		z-index: 2;
		text-align: center;
		width: 100rpx;
		height: 60rpx;
		line-height: 60rpx;
		background-color: #fff;
		color: #555;
		font-size: 26rpx;
		padding: 0;

	}

	// 搜索没有结果显示的手指
	.city-guide-box {
		position: fixed;
		top: 228upx;
		left: 120upx;

		.city-guide-gif {
			width: 80upx;
			height: 80upx;
		}

		.city-guide-msg {
			position: relative;

			.city-guide-img {
				width: 238upx;
				height: 54upx;
			}

			.city-guide-text {
				position: absolute;
				top: 10upx;
				left: 20upx;
				font-size: 28upx;
				color: #555;
			}
		}
	}

	/* 黄色提示 */
	.yellow-tips {
		position: absolute;
		top: 160rpx;
		left: 20rpx;
		z-index: 99;

		.bg-img {
			width: 296upx;
			height: 54upx;
		}

		.tips-text {
			position: absolute;
			top: 8upx;
			left: 20upx;
			font-size: 24upx;
			color: #555;
		}

		.fork-img {
			width: 24upx;
			height: 24upx;
			position: absolute;
			top: 15upx;
			right: 20upx;
		}
	}

	/* 工厂列表*/
	.factory_list {
		padding: 254upx 32upx 0 32upx;
	}

	.factory-letter {
		background-color: #F3F7F8;
		font-size: 32upx;
		color: #46595F;
		font-weight: bold;
		height: 60upx;
		line-height: 60upx;
		padding: 0 32upx;
	}

	.fName {
		height: 88upx;
		line-height: 88upx;
		color: #46595F;
		font-size: 32upx;
		border-bottom: 1upx solid #DEE4E4;
	}

	.fName:last-child {
		border-bottom: none !important;
	}

	/* 字母 */
	.letter {
		position: fixed;
		right: 44upx;
		top: 334upx;
	}

	.letter-item {
		font-size: 24upx;
		line-height: 34upx;
		color: #888;
		padding: 2upx;
		text-align: center;
	}

	.city-guide-box2 {
		position: fixed;
		top: 140rpx;
		left: 160rpx;
		z-index: 100;
	}
</style>
