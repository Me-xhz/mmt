<template>
	<view>
		<view class="container">
			<!-- Goods -->
			<view class="review-goods" v-for="(item, index) in orderReview" :key="index">
				<view class="goods-item">
					<view class="row row-center item-inner margin_left">
						<view class="item-photo">
							<image :src="item.goods_img"></image>
						</view>
						<view class="item-name">{{item.goods_name}}</view>
						<view class="review_view">
							<view class="review_grade" v-if="item.comment_rank == 1">
								<image class="grade-icon" :src="iconURL + '/icon_comment_good.png'"></image>
								<span class="grade-name">好评</span>
							</view>
							<view class="review_grade" v-if="item.comment_rank == 2">
								<image class="grade-icon" :src="iconURL + '/icon_comment_middle.png'"></image>
								<span class="grade-name">中评</span>
							</view>
							<view class="review_grade" v-if="item.comment_rank == 3">
								<image class="grade-icon" :src="iconURL + '/icon_comment_bad.png'"></image>
								<span class="grade-name">差评</span>
							</view>
						</view>
					</view>
					<view class="old-review padding_left">
						<view>
							<text>{{item.old_content}}</text>
						</view>
						<view class="box-img" v-for="(img, index2) in item.review_img" :key="index2">
							<image :src="img"></image>
						</view>
					</view>
					<view class="item-textarea padding_left">
						<view class="addReviewTitle">追加评价</view>
						<textarea maxlength="500" type="text" placeholder="请输入文字描述，5-500字" :data-checked-id="item.checkedId" @input="add_comments"></textarea>
					</view>
					<view class="upload-img-box clearfix padding_left" style="padding-left:0">
						<view class="box-title">上传图片
							<span>(选填，最多3张)</span>
						</view>
						<view class="box-img" v-for="(img, index2) in item.uploadImg" :key="index2">
							<image :src="img"></image>
							<view class="img-del iconfont icon-btn_huangsetishiguanbix" @tap="delUploadImg" :data-index="index"
							 :data-checked-id="item.checkedId"></view>
							<!-- <image class="img-del" src="{{iconURL}}/btn_delImg.png" bindtap="delUploadImg" data-index='{{index}}' data-checked-id="{{item.checkedId}}"/> -->
						</view>
						<label v-if="item.uploadImg.length < 3" @tap="updataimg" :data-checked-id="item.checkedId"></label>
					</view>
				</view>
			</view>
			<view class="review-submit-box">
				<button type="warn" class="review-submit" @tap="submitImg">提交</button>
			</view>
		</view>
		<!-- Dialog -->
		<view id="dialog" :hidden="true">
			<view class="mask"></view>
			<view class="dialog danger">
				<view class="dialog-content">确定放弃本次评价？</view>
				<view class="dialog-button">
					<view class="button left" @tap="touchDialogCancel">取消</view>
					<view class="button right" @tap="touchDialogConfirm">确认</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const app = getApp().globalData;
	const common = require("../../utils/common.js");

	export default {
		data() {
			return {
				iconURL: app.dataBase.iconURL,
				toast: true,
				commentsText: '',
				imgList: [],
				uploadImg: [],
				imgNowLength: 0,
				countNum: 0,
				order_id: "",
				orderReview: "",
				review: ""
			};
		},

		components: {},
		props: {},
		onLoad: function(options) {
			if (options == undefined || options.order == undefined) {
				common.toast("请求参数错误");
				return;
			}

			this.setData({
				order_id: options.order
			});
			this.getReviewInfo();
		},
		methods: {
			getReviewInfo: function() {
				var that = this;
				var uri = app.getPath.againCommentView;
				var data = {
					order_id: that.order_id
				};
				common.ApiGateWayTest(uri, data, true, function(res) {
					if (res.data.success == 1) {
						var data = res.data.result;
						var review = [];
						var reviewData = [];

						for (var i in data) {
							// 追加评价的数据对象
							review[i] = {
								goods_id: data[i].goods_id,
								content: '',
								comment_id: data[i].comment.comment_id,
								img: [],
								checkedId: i
							}; // 上一次评价的数据对象

							reviewData[i] = {
								goods_id: data[i].goods_id,
								goods_name: data[i].goods_name,
								comment_id: data[i].comment.comment_id,
								old_content: data[i].comment.content,
								comment_rank: data[i].comment.comment_rank,
								goods_img: data[i].img,
								review_img: data[i].comment.img,
								checkedId: i,
								uploadImg: []
							};
						}

						that.setData({
							orderReview: reviewData,
							review: review
						});
					}
				});
			},
			// 获取追加的评论内容
			add_comments: function(e) {
				var commentsText = e.detail.value;
				var checkedId = e.currentTarget.dataset.checkedId;
				var data = this.orderReview;

				for (var i in data) {
					if (checkedId == data[i].checkedId) {
						this.review[i].content = commentsText;
					}
				}
			},
			// 提交数据到后端
			touchSubmit: function() {
				var that = this;
				var review = JSON.stringify(that.review);
				var uri = app.getPath.againComment;
				var data = {
					order_id: that.order_id,
					review: review
				};
				common.ApiGateWayTest(uri, data, true, function(res) {
					if (res.data.success == 1) {
						common.toast(res.data.msg);
						setTimeout(function() {
							wx.navigateBack(1);
						}, 1500);
					}
				});
			},
			//选择图片
			updataimg: function(e) {
				var that = this;
				var checkedId = e.currentTarget.dataset.checkedId;
				var data = that.orderReview;

				for (var i in data) {
					if (data[i].checkedId == checkedId) {
						if (data[i].uploadImg.length <= 3) {
							var count = 3 - Number(data[i].uploadImg.length);
							that.chooseImg(i, count);
						}
					}
				}
			},
			//选择图片api
			chooseImg: function(i, count) {
				var that = this;
				wx.chooseImage({
					count: count,
					success: function(res) {
						that.orderReview[i].uploadImg = that.orderReview[i].uploadImg.concat(res.tempFilePaths);
						that.setData({
							orderReview: that.orderReview
						});
					}
				});
			},
			//删除选中的图片
			delUploadImg: function(e) {
				var index = e.currentTarget.dataset.index;
				var checkedId = e.currentTarget.dataset.checkedId;
				var data = this.orderReview;

				for (var i in data) {
					if (data[i].checkedId == checkedId) {
						data[i].uploadImg.splice(index, 1);
					}
				}

				this.setData({
					orderReview: data
				});
			},
			// 点击提交事件
			submitImg: function(e, key) {
				var that = this;

				for (var i in that.orderReview) {
					if (that.review[i].content.length > 0 && that.review[i].content.length < 5) {
						wx.showToast({
							title: '评论字数不能少于5个',
							icon: 'none',
							duration: 1000
						});
						return;
					}
				}

				var data = that.orderReview;
				var index = '';

				if (!key) {
					index = 0;
				} else {
					index = key;
				} // 计算总的上传图片数量


				var num = 0;

				for (var i in data) {
					for (var j = 0; j < data[i].uploadImg.length; j++) {
						num++;
					}
				}

				that.countNum = num; // 处理异步回调的递归

				that.uploadImg(index).then(function(res) {
					if (res < that.orderReview.length - 1) {
						var thisIndex = res + 1;
						that.submitImg('', thisIndex);
					} else if (res == that.orderReview.length - 1) {
						wx.hideLoading();
						that.touchSubmit();
					}
				});
			},
			//上传图片到服务
			uploadImg: function(index) {
				var that = this;
				var imgData = that.orderReview[index].uploadImg;
				var header = {
					'accept': 'application/json',
					'content-type': 'multipart/form-data',
					'x-application': 'cilicili',
					'x-platform': 'wx',
					'x-useragent': 'host',
					'x-ver': 'v1.0'
				};
				header['X-Authorization'] = common.getStorageSync('token');
				return new Promise(function(resolve, reject) {
					// 如果当前数组没有图片直接执行回调
					if (imgData.length <= 0) {
						resolve(index);
						return;
					}

					for (var i = 0; i < imgData.length; i++) {
						var img = imgData[i];
						var data = {
							path: 'comment',
							img_type: 1
						};
						wx.uploadFile({
							url: app.dataBase.uploadFile,
							filePath: img,
							name: 'file',
							formData: data,
							header: header,
							success: function(res) {
								var res = JSON.parse(res.data);

								if (res.success == 1) {
									that.review[index].img.push(res.result.url); // 当前全部上传完时执行回调

									if (that.review[index].img.length == that.orderReview[index].uploadImg.length) {
										that.setData({
											review: that.review
										});
										resolve(index);
									}
								}
							}
						}); // 计算当前上传图片的数量

						that.setData({
							imgNowLength: that.imgNowLength + 1
						}); // 显示当前上传的进度

						wx.showLoading({
							title: that.imgNowLength + '/' + that.countNum,
							mask: true
						});
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
	@import "./add-order-review.css";
</style>
