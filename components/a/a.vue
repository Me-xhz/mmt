<template>
	<view>
		这是组件a
		<image src="https://img.shop.haoyousheng.com.cn/img/goods/1c923d5a95b5e605ca116dd80d5011f4.jpg!width_h.jpg" mode=""></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		props:['list'],
		// props:{
		// 	list:{
		// 		
		// 	},
		// 	duration:{
		// 		
		// 	}
		// },
		// onLoad:function(){
		// 	console.log(6666);
		// },
	
		created:function(){
			
		},
		mounted:function(){
			setTimeout(()=>{
				console.log(this.list);
			},1000)
			
			
		},
		
		
		methods: {
			
		}
	}
</script>

<style>

</style>
