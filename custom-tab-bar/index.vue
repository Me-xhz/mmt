<template>
	<!--miniprogram/custom-tab-bar/index.wxml-->
	<cover-view class="tab-bar" v-if="showPage">
		<cover-view class="tab-bar-border"></cover-view>
		<cover-view v-for="(item, index) in tabType == 0 ? list : newList" :key="index" class="tab-bar-item" :data-path="item.pagePath"
		 :data-index="index" @tap="switchTab">
			<cover-image :src="(selected === index ? item.selectedIconPath : item.iconPath)"></cover-image>
			<cover-view :style="'color: ' + (selected === index ? selectedColor : color)">{{item.text}}</cover-view>
			<cover-view v-if="index == 2 && cartBadge != 0" class="cart-badge">{{cartBadge <= 99 ? cartBadge "99+"}}
				< cover-view>
					</=>
			</cover-view>
		</cover-view>
	</cover-view>
</template>

<script>
	export default {
		data() {
			return {
				selected: 0,
				cartBadge: 0,
				backgroundColor: "#fff",
				color: "#888",
				selectedColor: "#555",
				swiperImgBl: false,
				showPage: true,
				tabType: 0,
				list: [{
					pagePath: "/pages/index/index",
					iconPath: "/images/icons/tab_indexoff.png",
					selectedIconPath: "/images/icons/tab_indexon.png",
					text: "首页"
				}, {
					pagePath: "/pages/category/category",
					iconPath: "/images/icons/tab_searchCaroff.png",
					selectedIconPath: "/images/icons/tab_searchCaron.png",
					text: "分类"
				}, {
					pagePath: "/pages/cart/cart",
					iconPath: "/images/icons/tab_cartoff.png",
					selectedIconPath: "/images/icons/tab_carton.png",
					text: "购物车"
				}, {
					pagePath: "/pages/user/user",
					iconPath: "/images/icons/tab_myoff.png",
					selectedIconPath: "/images/icons/tab_myon.png",
					text: "我的"
				}],
				newList: [{
					pagePath: "/pages/index/index",
					iconPath: "/images/icons/tab_indexoff.png",
					selectedIconPath: "/images/icons/tab_indexon.png",
					text: "首页"
				}, {
					pagePath: "/pages/user/user",
					iconPath: "/images/icons/tab_myoff.png",
					selectedIconPath: "/images/icons/tab_myon.png",
					text: "我的"
				}]
			};
		},

		components: {},
		props: {},
		methods: {
			ready() {
				var that = this;

				if (that.swiperImgBl == false) {
					that.setData({
						swiperImgBl: true
					});
				}
			},

			attached() {},

			switchTab(e) {
				const data = e.currentTarget.dataset;
				const url = data.path;
				wx.switchTab({
					url
				});
				this.setData({
					selected: data.index
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
	@import "./index.css";
</style>
