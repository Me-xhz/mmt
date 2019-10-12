<template>
<view>
<view class="container">
  <!-- Goods -->
  <view :class="'review-goods ' + (goodsIndex==0?'':'review-active')" v-for="(item, index) in orderReview" :key="index">
    <view class="goods-item">
      <view class="row row-center item-inner">
        <view class="item-photo w20">
          <image :src="item.itemImg"></image>
        </view>
        <view class="item-comment">
          <view class="all-review">
            综合评价：
          </view>
          <view class="row row-top">
            <view class="col comment-item" @click.stop="setGrade" data-init="1" :data-checked-id="item.checkedId">
              <view class="row row-bottom text-center">
                <view>
                  <image class="reputation-img" :src="(item.comment_rank==1?iconURL+'/good-active.png':iconURL+'/good-reputation.png')"></image>
                </view>
                <span :class="'grade-name ' + (item.comment_rank == 1 ? 'active' : '')">好评</span>
              </view>
            </view>
            <view class="col comment-item" @click.stop="setGrade" data-init="2" :data-checked-id="item.checkedId">
              <view class="row row-bottom text-center content-middle">
                <view>
                  <image class="reputation-img" :src="(item.comment_rank==2?iconURL+'/normal-active.png':iconURL+'/normal-reputation.png')"></image>
                </view>
                <span :class="'grade-name ' + (item.comment_rank == 2 ? 'active' : '')">中评</span>
              </view>
            </view>
            <view class="col comment-item" @click.stop="setGrade" data-init="3" :data-checked-id="item.checkedId">
              <view class="row row-bottom text-center content-right">
                <view>
                  <image class="reputation-img" :src="(item.comment_rank==3?iconURL+'/bad-active.png':iconURL+'/bad-reputation.png')"></image>
                </view>
                <span :class="'grade-name ' + (item.comment_rank == 3 ? 'active' : '')">差评</span>
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="item-textarea">
        <!-- <view class="textarea-toast" wx:if="{{toast && (item.comment_rank == 2 || item.comment_rank == 3)}}">
          <view class="toast-text" wx:if="{{item.comment_rank == 3}}">很抱歉给您的购物带来不好的体验，请提建议给我们哦！</view>
          <view class="toast-text" wx:if="{{item.comment_rank == 2}}">请告诉我们哪里做的不好，我们会努力改进哒！</view>
          <image class="toast-close" src="" />
        </view> -->
        <textarea maxlength="500" type="text" placeholder="对商品是否满意呢？请输入文字描述，2-500字" :data-checked-id="item.checkedId" @input="comments"></textarea>
      </view>
      <view class="upload-img-box clearfix add-imgs">
        <view class="box-img" v-for="(img, index2) in item.uploadImg" :key="index2">
          <image :src="img"></image>
          <view class="img-del iconfont icon-btn_huangsetishiguanbix" @tap="delUploadImg" :data-index="index" :data-checked-id="item.checkedId"></view>
          <!-- <image class="img-del" src="{{iconURL}}/btn_delImg.png" bindtap="delUploadImg" data-index='{{index}}' data-checked-id="{{item.checkedId}}" /> -->
        </view>
        <label class="lable-bg" v-if="item.uploadImg.length < 3" @tap="updataimg" :data-checked-id="item.checkedId"></label>
      </view>

      <!--<view class='anonymous_wrap'>-->
        <!--<view class='left'>-->
          <!--<view class="item-checkbox" data-idx='{{index}}' bindtap="isAnonymous" >-->
            <!--<image src='{{iconURL}}/gouxuan03.png' hidden='{{!item.anonymous}}'></image>-->
            <!--<image src='{{iconURL}}/weixuanzhong.svg' hidden='{{item.anonymous}}'></image>-->
          <!--</view>-->
          <!--<text>匿名</text>-->
        <!--</view>-->
        <!--<view class='right'>-->
          <!--你的评论能帮助其他小伙伴哟-->
        <!--</view>-->
      <!--</view>-->
    </view>
  </view>
  <!--server grade-->
  <view class="review-grades">
    <view class="row row-center grade-line">
      <view class="col-20 line-title">服务态度</view>
      <view class="col-50 line-stars">
        <view class="row">
          <view class="col stars" v-for="(item, index) in attitude" :key="index" @click.stop="attitude" :data-id="item.id">
            <image class="grade-icon" :src="item.img"></image>
          </view>
        </view>
      </view>
      <!--<view class="col-30 line-subtxt">{{atti_service}}</view>-->
    </view>
    <view class="row row-center grade-line">
      <view class="col-20 line-title">物流服务</view>
      <view class="col-50 line-stars">
        <view class="row">
          <view class="col stars" v-for="(item, index) in logistics" :key="index" @click.stop="logistics" :data-id="item.id">
            <image class="grade-icon" :src="item.img"></image>
          </view>
        </view>
      </view>
      <!--<view class="col-30 line-subtxt">{{lgoi_service}}</view>-->
    </view>
  </view>
  <view class="review-submit-box">
    <button class="review-submit" @tap="submitImg">提交</button>
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
      checked: 1,
      toast: true,
      def_star: [],
      commentsText: '',
      imgList: [],
      uploadImg: [],
      index: 0,
      countNum: 0,
      imgNowLength: 0,
      order_id: "",
      logistics: "",
      attitude: "",
      orderReview: "",
      lgoi_service: "",
      logi_star: "",
      atti_service: "",
      atti_star: ""
    };
  },

  components: {},
  props: {},
  onLoad: function (options) {
    if (options == undefined || options.order == undefined) {
      common.toast("请求参数错误");
      return;
    }

    var defStar = [];

    for (var i = 0; i < 5; i++) {
      defStar[i] = {
        id: i + 1,
        img: app.dataBase.iconURL + "/light-star.png"
      };
    }

    this.setData({
      order_id: options.order,
      def_star: defStar,
      logistics: defStar,
      attitude: defStar
    });
    this.getOrderInfo();
  },
  methods: {
    getOrderInfo: function () {
      var that = this;
      var uri = app.getPath.orderDetail;
      var data = {
        order_id: that.order_id
      };
      common.ApiGateWayTest(uri, data, true, function (res) {
        if (res.data.success == 1) {
          var data = res.data.result.products;
          var review = [];
          var uploadImg = [];

          for (var i in data) {
            review[i] = {
              goods_id: data[i].goods_id,
              rec_id: data[i].rec_id,
              attr_name: data[i].sku_key_name,
              content: '',
              img: [],
              comment_rank: 1,
              itemImg: data[i].header_img,
              checkedId: i,
              uploadImg: [],
              anonymous: 1
            };
          }

          that.setData({
            orderReview: review
          });
        }
      });
    },
    // 是否匿名
    isAnonymous: function (e) {
      var that = this;
      var idx = e.currentTarget.dataset.idx;
      var orderReview = that.orderReview;

      if (orderReview[idx].anonymous == 1) {
        orderReview[idx].anonymous = 0;
      } else {
        orderReview[idx].anonymous = 1;
      }

      that.setData({
        orderReview
      });
    },
    // 对商品进行评价
    setGrade: function (e) {
      var that = this;
      var checked = e.currentTarget.dataset.init;
      var checkedId = e.currentTarget.dataset.checkedId;
      var data = that.orderReview;

      for (var i in data) {
        if (data[i].checkedId == checkedId) {
          data[i].comment_rank = checked;
        }
      }

      that.setData({
        orderReview: data
      });

      if (checked == 2 || checked == 3) {
        setTimeout(function () {
          that.setData({
            toast: false
          });
        }, 3000);
      }
    },
    // 设置物流服务评价
    logistics: function (e) {
      var id = e.currentTarget.dataset.id;
      var obj = this.starFun(id);
      this.setData({
        logistics: obj.data,
        lgoi_service: obj.text,
        logi_star: id
      });
    },
    // 设置服务态度评价
    attitude: function (e) {
      var id = e.currentTarget.dataset.id;
      var obj = this.starFun(id);
      this.setData({
        attitude: obj.data,
        atti_service: obj.text,
        atti_star: id
      });
    },
    //选择星星数的共用方法
    starFun: function (num) {
      var data = this.def_star;
      var text = ['不满意', '一般', '较满意', '满意', '非常满意'];

      for (var i in data) {
        data[i].img = app.dataBase.iconURL + "/star.png";
      }

      for (var i = 0; i < num; i++) {
        data[i].img = app.dataBase.iconURL + "/light-star.png";
      }

      return {
        data: data,
        text: text[num - 1]
      };
    },
    // 获取评论内容
    comments: function (e) {
      var commentsText = e.detail.value;
      var checkedId = e.currentTarget.dataset.checkedId;
      var data = this.orderReview;

      for (var i in data) {
        if (checkedId == data[i].checkedId) {
          data[i].content = commentsText;
        }
      }

      this.setData({
        orderReview: data
      });
    },
    // 所有数据完成后，提交后端
    touchSubmit: function () {
      var that = this;
      var reviewArray = [];
      var data = that.orderReview; // 初始化提交后端需要用的数组

      for (var i in that.orderReview) {
        reviewArray[i] = {
          goods_id: data[i].goods_id,
          rec_id: data[i].rec_id,
          attr_name: data[i].attr_name,
          comment_rank: data[i].comment_rank,
          content: data[i].content,
          img: data[i].img // anonymous: data[i].anonymous

        };
      } // JSON格式化数组用于传ajax传输数据


      var review = JSON.stringify(reviewArray);
      var uri = app.getPath.addComment;
      var data = {
        order_id: that.order_id,
        review: review,
        shipping_rank: that.logi_star,
        service_rank: that.atti_star
      };
      common.ApiGateWayTest(uri, data, true, function (res) {
        if (res.data.success == 1) {
          common.toast(res.data.msg);
          wx.navigateBack();
        }
      });
    },
    //选择图片
    updataimg: function (e) {
      var that = this;
      var checkedId = e.currentTarget.dataset.checkedId;
      var data = that.orderReview;

      for (var i in data) {
        if (data[i].checkedId == checkedId) {
          if (data[i].uploadImg.length < 3) {
            var count = 3 - Number(data[i].uploadImg.length);
            that.chooseImg(i, count);
          }
        }
      }
    },
    //选择图片api
    chooseImg: function (i, count) {
      var that = this;
      wx.chooseImage({
        count: count,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {
          that.orderReview[i].uploadImg = that.orderReview[i].uploadImg.concat(res.tempFilePaths);
          that.setData({
            orderReview: that.orderReview
          });
        }
      });
    },
    //删除上传图片
    delUploadImg: function (e) {
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
    // 调用上传
    submitImg: function (e, index) {
      var that = this; // 判断必填的选项是否都填写
      // return

      for (var i in that.orderReview) {
        var content = that.orderReview[i].content.replace(/(^\s*)|(\s*$)/g, ""); // if(content.length==0){
        //   common.toast('评论不能为空');
        //   return;
        // }else if (content.length > 0 && content.length < 2) {
        //   common.toast('评论字数不能少于2个');
        //   return;
        // }
      } // if (!that.data.logi_star) {
      //   common.toast('请对物流服务给个评价');
      //   return;
      // }
      // if (!that.data.atti_star) {
      //   common.toast('请对服务态度给个评价');
      //   return;
      // }


      var data = this.orderReview; // 判断是递归回调还是第一次触发

      var indexs = '';

      if (!index) {
        indexs = that.index;
      } else {
        indexs = index;
      }

      var num = 0; // 获取要上传图片的总数。用于显示进度

      for (var i in data) {
        for (var j = 0; j < data[i].uploadImg.length; j++) {
          num++;
        }
      }

      that.countNum = num; // 调用上传图片的api并回调成功后递归自己

      this.uploadImg(indexs, function (res) {
        // 判断是否上传完
        if (res < that.orderReview.length - 1) {
          var key = res + 1;
          that.submitImg('', key);
        } else if (res == that.orderReview.length - 1) {
          wx.hideLoading(); // 上传完了调用提交函数

          that.touchSubmit();
        }
      });
    },
    //上传图片到服务
    uploadImg: function (index, successCallback) {
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
      header['X-Authorization'] = common.getStorageSync('token'); // var img = img;

      var data = {
        path: 'comment',
        img_type: 1
      }; // 如果当前数组没有图片直接回调

      if (imgData.length <= 0) {
        successCallback(index);
        return;
      }

      for (var i = 0; i < imgData.length; i++) {
        var img = imgData[i];
        wx.uploadFile({
          url: app.dataBase.uploadFile,
          filePath: img,
          name: 'file',
          formData: data,
          header: header,
          success: function (res) {
            var res = JSON.parse(res.data);

            if (res.success == 1) {
              that.orderReview[index].img.push(res.result.url); // 如果当前数组循环上传完了，执行回调

              if (typeof successCallback === 'function' && that.orderReview[index].img.length == that.orderReview[index].uploadImg.length) {
                that.setData({
                  orderReview: that.orderReview
                });
                successCallback(index);
              }
            }
          }
        }); // 计算当前上传图片的数量

        that.setData({
          imgNowLength: that.imgNowLength + 1
        }); // 显示当前上传的进度

        common.showLoad(that.imgNowLength + '/' + that.countNum);
      }
    },
    setData: function (obj) {
      let that = this;
      let keys = [];
      let val, data;
      Object.keys(obj).forEach(function (key) {
        keys = key.split('.');
        val = obj[key];
        data = that.$data;
        keys.forEach(function (key2, index) {
          that[key] = obj[key];
        });
      });
    }
  }
};
</script>
<style>
@import "./order-review.css";
</style>