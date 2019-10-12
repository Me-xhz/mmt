<template>
	<view>
		<view class="product container" :style="(iphoneXBottom=='68rpx'?'padding-bottom:150rpx':'')">
			<!--内容开始-->

			<!-- 返回首页悬浮框/分享进入显示 -->
			<view class="goHomeFixed" @click.stop="gotoHome" v-if="isShowGoHome">
				<image :src="iconURL + '/product-icon-leftReturn.svg'" class="icon-leftReturn"></image>
				<text>返回首页</text>
			</view>

			<!--suppress ALL -->
			<view class="cont">
				<!--<image class="tp_image" src="{{itemData.photo_d}}"></image>-->
				<swiper :indicator-color="indicatorColor" :circular="circular" :indicator-active-color="indicatorActiveColor"
				 :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
					<block v-for="(item, index) in bannerItem" :key="index">
						<swiper-item class="dufiltImage" :style="'background-image:url(' + iconURL + '/img_dufilt_swiper.png)'">
							<image @tap="setPreviewImage" :data-current="item.src" @load="swiperImageLoad" :src="item.msrc" :class="'slide-image ' + (swiperImgBl == true ? 'loaded' : '')"></image>
						</swiper-item>
					</block>
				</swiper>
				<image v-if="itemData.goods_video && itemData.goods_video != ''" :data-current="itemData.goods_video" @tap="setPreviewVideo"
				 :src="iconURL + '/product_video.png'" class="slide-videoIcon"></image>
			</view>
			<!-- 抢购信息 -->
			<view class="ac_bar" v-if="date_limite_bool&&activity_classfy==1&&promInfoData.activity_type==2" :style="'background-image:url(' + $1 + ');'">
				<view class="ac_bar-left">
					<view class="sku-price">¥{{skuCurrent}}</view>
					<view class="text">
						<view class="price-text">活动价</view>
						<view class="price">
							<i class="price-icon">¥</i>
							<i class="price-start">{{activity_price_start}}</i>
							<i class="price-end">.{{activity_price_end}}</i>
						</view>
					</view>
				</view>
				<view class="time-start" v-if="!date_limite_ing">
					<text class="des color">{{activity_time_start.activity_time_start_month + "月" + activity_time_start.activity_time_start_date + "日"}}</text>
					<view class="date color">{{activity_time_start.activity_time_start_hours + ":" + activity_time_start.activity_time_start_min + "开抢"}}</view>
					<image class="date-icon" :src="iconURL + '/product_ac_bg_icon.png'" mode="widthFix"></image>
				</view>
				<view class="time-end" v-if="date_limite_ing">
					<text class="des end">距结束仅剩</text>
					<view class="time-date">
						<view class="span">{{down_date_h || '00'}}</view>
						<i>:</i>
						<view class="span">{{down_date_m || '00'}}</view>
						<i>:</i>
						<view class="span">{{down_date_s || '00'}}</view>
						<i>:</i>
						<view class="span">{{down_date_ms || '0'}}</view>
					</view>
				</view>
			</view>
			<!-- 拼团价 -->
			<view class="team-bar" v-if="itemData.is_team == 1">
				<view class="user-new-box">
					<view class="user-new row" v-if="itemData.is_new_activity_user==1">新人专享</view>
					<view class="team-need row">{{itemData.team_needer}}人团</view>
				</view>

				<view class="team-price row">
					<view class="team-price-i">¥</view>
					<view class="team-price-p">{{itemData.team_price}}</view>
					<view class="team-price-n">¥{{skuCurrent}}</view>
				</view>
				<view :class="'countdown ' + (showCountDown?'countdown-active':'countdown-active-end')" v-if="teamLabel.status!=0&&teamLabel.time_type!=1">
					<view class="count-font" v-if="teamLabel.status==2">
						距活动开始
					</view>
					<view class="count-font" v-if="teamLabel.status==1">
						距活动结束
					</view>
					<view class="count-time">
						<view class="count-box" v-if="d!='00'">
							{{d}}
						</view>
						<text class="time-text">{{d!='00'?'天':''}}</text>
						<view class="count-box">
							{{h}}
						</view>
						<text class="time-text">时</text>
						<view class="count-box">
							{{m}}
						</view>
						<text class="time-text">分</text>
						<view class="count-box">
							{{s}}
						</view>
						<text class="time-text">秒</text>
					</view>
				</view>
				
			</view>
			<!-- 商品信息 -->
			<view class="product-info">
				<view class="info-team-header" v-if="teamLabel.max_team_limit&&itemData.is_team ==1&&teamLabel.count_type!=2">
					<view class="info-team-header-box">
						<view v-if="teamLabel.time_type==0">
							<view class="info-team-number-n" v-if="teamLabel.count_type==0">
								<text class="now-use-title">当前可用：</text>参团
								<i class="i">{{teamLabel.follow_limit}}</i>次，开团
								<i class="i">{{teamLabel.found_limit}}</i>次
							</view>
							<view class="info-team-number-n" v-if="teamLabel.count_type==1">
								<text class="now-use-title">当前可用：</text>拼团
								<i class="i">{{teamLabel.total_team_limit}}</i>次
							</view>
						</view>
						<view v-if="teamLabel.time_type==1">
							<view class="info-team-number-n" v-if="teamLabel.count_type==0">
								<text class="now-use-title">今日可用：</text>参团
								<i class="i">{{teamLabel.follow_limit}}</i>次，开团
								<i class="i">{{teamLabel.found_limit}}</i>次
							</view>
							<view class="info-team-number-n" v-if="teamLabel.count_type==1">
								<text class="now-use-title">今日可用：</text>拼团
								<i class="i">{{teamLabel.total_team_limit}}</i>次
							</view>
						</view>
					</view>
				</view>
				<view class="product-name-box">
					<view class="info-name">
						<!-- <text class='discount_label' wx:if="{{itemData.img_content&&itemData.img_content.length>0}}">{{itemData.img_content}}</text> -->
						<view class="team-tips-box" v-if="itemData.label_list.length>0">
							<view v-for="(tips, tipsindex) in itemData.label_list" :key="tipsindex" :class="'team-tips ' + (tips.type==2?'tips-active':'')">{{tips.name}}</view>
						</view>
						<text>{{itemData.goods_name}}</text>
					</view>
					<view class="info-desc">
						{{itemData.goods_remark}}
					</view>
				</view>

				<!-- 拼团参加列表 -->
				<view class="join-team" v-if="itemData.is_team == 1&& teamList.length>0">
					<view class="join-header" @tap="loadTeamList">
						<text class="join-title">{{team_num}}人正在拼团，可直接参与</text>
						<view class="join-header-right">
							<text class="join-more">查看更多</text>
							<view class="iconfont icon-btn_xiangyoudajiantoux more-right"></view>
						</view>
					</view>
					<view class="team-list-box">
						<!--拼团列表组件-->
						<team-list :teamList="teamList"></team-list>
					</view>
				</view>
				<view class="info-price" v-if="itemData.is_team == 0 && activity_classfy!=1 && promInfoData.activity_type!=2">
					<!-- wx:if="{{!isPriceEqual}}" -->
					<view class="is-vip">
						<view class="is-vip_price font-face-ios_Avenir">
							<view class="icon_rmb">¥</view>
							<view>{{itemData.shop_type == 0 ? skuSvipCurrent : itemData.month_price + '/月'}}</view>
							<view class="info-tab" v-if="itemData.is_special_price==1">特价</view>
							<!-- <view class='info-tab' wx:if="{{itemData.is_new==1}}">新品</view> -->
							<view class="row little_price" v-if="itemData.shop_type == 0 && skuSvipCurrent != skuCurrent">
								<view class="color_gray text_content_small del_text">{{itemData.cat_price_dec}}</view>
								<view class="del color_gray text_content_small del_text">¥{{skuCurrent}}</view>
							</view>
						</view>
						<!-- #ifdef MP-WEIXIN  -->
						<view class="to_share row " @tap="shareTo" >
							<image class="team-share-img" :src="iconURL + '/product-icon-share.svg'"></image>
							<text>分享</text>
						</view>
						<!-- #endif -->
					</view>
					<view v-if="itemData.shop_type == 1" class="productSupplier">{{itemData.suppliers_name}}</view>
				</view>


				<view class="newlyweds-img" @tap="setfwModalStatus" v-if="itemData.services_title.length > 0">
					<view class="newlyweds-img-box">
						<text class="iconfont icon-yuanzhuangzhengpin newLywds-icon"></text>
						<text>{{itemData.services_title[0]}}</text>
					</view>
					<view class="newlyweds-img-box">
						<text class="iconfont icon-img_jisutihuox newLywds-icon"></text>
						<text>{{itemData.services_title[1]}}</text>
					</view>
					<view class="newlyweds-img-box">
						<text class="iconfont icon-bianjietihuo newLywds-icon"></text>
						<text>{{itemData.services_title[2]}}</text>
					</view>
					<view class="newlyweds-img-box">
						<text class="iconfont icon-fangxingoumai newLywds-icon"></text>
						<text>{{itemData.services_title[3]}}</text>
					</view>
				</view>
			</view>
			<view class="gray-hr"></view>
			<!-- 促销 -->
			<view class="product-nums  bor-b" v-if="activity_bool&activity_classfy==1" :data-activity_id="promInfoData.activity_id">
				<view class="row promotion">
					<view class="col-15 nums-name t2">促销</view>
					<view class="promotion_item nums-item-right">
						{{promInfoData.prom_label}}
					</view>
				</view>
			</view>
			<view class="product-nums  bor-b" v-if="activity_bool&activity_classfy==2" :data-activity_id="promInfoData.activity_id"
			 @click.stop="to_activity">
				<view class="row promotion">
					<view class="col-15 nums-name t2">促销</view>
					<view class="promotion_item nums-item-right">
						{{promInfoData.prom_label}}
						<view class="iconfont icon-btn_xiangyoudajiantoux icon-right-arrow"></view>
					</view>
				</view>
			</view>

			<!-- 优惠券 -->
			<!-- <view class="product-nums bor-b-16" @tap="shippingBonus.length > 0?'setModalBonus':'goCouponList'"> -->
			<view class="product-nums bor-b-16" >
				<view class="row ">
					<view class="col-15 nums-name t2">优惠券</view>
					<view class="col nums-item-right">
						<block v-for="(item, index) in shippingBonus" :key="index" v-if="idx < 5">
							<span class="item-left-exeimg">
								<i class="item-icon_exeimg t3" v-if="item.coupon_type==1" :style="'background-image:url(' + iconURL + '/coupon02.png);color:#f23030!important'">{{item.value}}折</i>
								<i class="item-icon_exeimg t3" v-else :style="'background-image:url(' + iconURL + '/coupon02.png);color:#f23030!important'">￥{{item.value}}</i>
							</span>
						</block>
						<text class="team-coupon-text" v-if="shippingBonus.length > 0" @tap='setModalBonus'>领取优惠券</text>
						<text class="team-coupon-text team-coupon-text-none" v-if="shippingBonus.length ==0" @tap='goCouponList'>去领券中心</text>
						<view class="iconfont icon-btn_xiangyoudajiantoux icon-right-arrow"></view>
					</view>
				</view>
			</view>

			<!--选择SKU-->
			<view class="product-nums-sku product-nums bor-b" @tap="setModalStatus" v-if="itemData&&itemData.shop_type==0">
				<view class="row ">
					<view class="col nums-item-right">
						<text class="t2">选择</text>
						<text class="nums-item_go">{{choosed_sku}}</text>
						<view class="iconfont icon-btn_xiangyoudajiantoux icon-right-arrow"></view>
					</view>
				</view>
				<!-- <view class='goToDiv' id='comment' wx:if="{{ipRecommend || ipRecommend.data.length <= 0}}"></view> -->
			</view>
			<!-- 配送时间 -->
			<view class="product-nums">
				<view class="row ">
					<view class="col-15 nums-name t2">配送时间</view>
					<view class="col nums-item-right">
						<i class="icon-right-arrow">{{itemData.plan_shipping_time}}</i>
					</view>
				</view>
			</view>

			<!-- 租机信息开始 shop_type==1为租机商品-->
			<!-- 图片 -->
			<view class="rent_service_pic" v-if="itemData.shop_type==1">
				<image mode="widthFix" :src="itemData.service_pic" style="width:100%;"></image>
			</view>
			<view class="rent_info" v-if="itemData.shop_type==1">
				<view class="title t4">方案详情</view>
				<view class="rent_tab">
					<view :class="'item ' + (rentToggleStatus==0?'active_item':'')" @tap="rentToggle" data-status="0">随心租</view>
					<view :class="'item ' + (rentToggleStatus==1?'active_item':'')" @tap="rentToggle" data-status="1">年年租</view>
				</view>
				<view class="rent_table" v-if="rentToggleStatus==0">
					<view class="row t5" v-for="(item, index) in itemData.rent_machine" :key="index">
						<view class="left">{{item.name}}</view>
						<view class="right">{{item.value}}</view>
					</view>
				</view>
				<view class="rent_table" v-else>
					<view class="row t5" v-for="(item, index) in itemData.rent_machine_year" :key="index">
						<view class="left">{{item.name}}</view>
						<view class="right">{{item.value}}</view>
					</view>
				</view>
			</view>
			<!-- 租机信息结束 -->
			<!--IP推荐-->
			<view class="product-sctite-box top-margin-line" v-if="ipRecommend.data.length > 0">
				<view class="row" @tap="productGoTheme" :data-brand="ipRecommend.brand.brand_id">
					<view class="product-sctite-box_name">
						{{ipRecommend.brand.name}}
					</view>
					<view class="product-sctite-box_right">
						<span>{{ipRecommend.brand.total}}件商品 </span>
						<image class="icon-right-arrow" :src="iconURL + '/icon_right_arrow.png'"></image>
					</view>
				</view>
				<view class="recommended-content" v-if="ipRecommend.data.length > 1 && ipRecommend.data">
					<scroll-view lower-threshold="-60" @scrolltolower="productGoTheme" :data-brand="ipRecommend.brand.brand_id"
					 scroll-x="true" class="content-ul">
						<view class="content-li" v-for="(item, index) in ipRecommend.data" :key="index" @tap="productGoProduct" :data-id="item.goods_id">
							<view class="recommended-box">
								<span class="recommended-img" :style="'background-image:url(' + item.img + ')'"></span>
							</view>
							<p class="recommended-name">{{item.goods_name}}</p>
						</view>
						<view class="content-li li-noright" @tap="productGoTheme" v-if="ipRecommend.data.length > 3" :data-brand="ipRecommend.brand.brand_id">
							<image :src="iconURL + '/icon_showMore-v2.png'" mode="widthFix"></image>
						</view>
					</scroll-view>
				</view>
				<view class="goToDiv" id="comment"></view>
			</view>

			<!-- 为你推荐 -->
			<view class="intro-header top-margin-line" id="content" v-if="scgGoodsList.length>0">
				<view class="swiper-tab title_bar t4">
					为你推荐
				</view>
				<scroll-view scroll-x="true" class="gallery">
					<view class="good_card3" v-for="(item, index) in scgGoodsList" :key="index">
						<navigator hover-class="none" :url="'/pages/product/product?entryType=external&productId=' + item.goods_id">
							<view class="good_pic3 mb24 good_pic inequacy_wrap">
								<view class="inequacy" v-if="item.is_enough==0">
									<image :src="iconURL + '/inequacy02.png'"></image>
								</view>

								<image mode="aspectFit" :src="item.list_img"></image>
							</view>
							<view class="good_info3">
								<view class="title mb12 t4">{{item.goods_name}}</view>
								<view class="price red-font-color mb32" :style="'text-align:' + align">
									<text class="mr6">￥{{item.shop_price}}</text>
									<view class="tab" v-if="item.is_special_price">特价</view>
									<!-- <view class='tab' wx:if="{{item.is_new}}">上新</view> -->
									<text v-if="item.shop_price != item.market_price" class="small ml6 sPrice">¥{{item.market_price}}</text>
								</view>
							</view>
						</navigator>
					</view>

				</scroll-view>
			</view>
			<!--评论-->
			<!-- <view class="product-review-box top-margin-line" id="comment">
    <view class="review-box_header" wx:if="{{comment.comment_sum > 0}}">
      <span>商品评价</span>
      <i>（{{comment.comment_sum}}）</i>
    </view>
    <view class="review-box_null" bindtap="productGoComment" wx:if="{{comment.length <= 0  || comment.comment_sum <= 0}}" data-productid="{{itemData.id}}">
      <span>暂无评价</span>
      <image class="icon-right-arrow" src="{{iconURL}}/icon_right_arrow.png"></image>
    </view>
    <block wx:for="{{comment.comment_info}}" wx:for-item='commentList' wx:key='index' wx:for-index="infoindex">
      <view class="modul-review-manu{{commentList.class ? ' no-border' : ''}}" wx:if="{{comment.comment_sum > 0}}">
        <view class="review-manu_header">
          <image src="{{commentList.avatar}}"></image>
          <view class="header-user_name">
            <span>{{commentList.user_name}}</span>
          </view>
        </view>
        <view class="review-manu_main">
          <view class="manu_main_text" wx:if="{{commentList.content}}">
            <i class='limitLineHeight{{commentList.wordsCut ? " cut" : ""}}'>{{commentList.content}}</i>
            <view class='limit-words' wx:if="{{commentList.words}}" bindtap='limitWord' data-iscut='{{commentList.wordsCut}}' data-listnum='infoindex'>{{limitWords}}
              <image class='show' wx:if="{{commentList.wordsCut}}"></image>
              <image class='hidden' wx:if="{{!commentList.wordsCut}}"></image>
            </view>
          </view>
          <view wx:if="{{commentList.imgInfo}}">
            <block wx:for="{{commentList.imgInfo}}" wx:key="index">
              <view class="manu_main_imgs" bindtap='setCommentImage' data-current='{{item.img}}'>
                <span class="swiperphoto" style="background-image: url({{item.thumbImg}});"></span>
              </view>
            </block>
          </view>
        </view>
        <view class="review-manu_reply" wx:if="{{isLoaded && commentList.office_info}}" opentoshowmore>
          <i>小鹅回复：{{commentList.office_info}}</i>
        </view>
        <view class="review-manu_additional" wx:if="{{commentList.again_info}}">
          <view class="manu_additional_header">
            <i wx:if="{{commentList.ctime > 0}}">{{commentList.ctime}}天后追加评价</i>
            <i wx:if="{{commentList.ctime == 0}}">当天追加评价</i>
          </view>
          <view class="manu_additional_text" wx:if="{{isLoaded && commentList.again_info.content}}" opentoshowmore>
            <i>{{commentList.again_info.content}}</i>
          </view>
          <view wx:if="{{commentList.again_info.imgInfo}}">
            <block wx:for="{{commentList.again_info.imgInfo}}" wx:key='index'>
              <view class="manu_main_imgs" bindtap='setAgainImage' data-current='{{item.img}}'>
                <span style="background-image: url({{item.thumbImg}});"></span>
              </view>
            </block>
          </view>
        </view>
        <view class="review-manu_reply" wx:if="{{isLoaded && commentList.office_again_info}}">
          <i>小鹅回复：{{commentList.office_again_info}}</i>
        </view>
        <view class="reviw-manu_attrs row">
          <view class="col-70">
            <i>{{commentList.attr_name}}</i>
          </view>
          <view class="col-30">
            <i>{{commentList.add_time}}</i>
          </view>
        </view>
      </view>
    </block>
    <view class="review-box_bottom" bindtap="productGoComment" wx:if="{{comment.comment_sum > 2}}" data-productid="{{itemData.id}}">
      <i>查看全部</i>
      <image src="{{iconURL}}/icon_right_arrow.png"></image>
    </view>
    <view class='goToDiv' id='content'></view>
  </view> -->

			<!--图文详情头部-->
			<view class="gray-hr"></view>
			<view class="intro-header" id="content">
				<view class="swiper-tab title_bar t4">
					商品详情
				</view>
				<view class="product-intro-images">
					<image lazy-load="true" :src="item.width_img" v-for="(item, index) in itemData.goods_content" :key="index" :style="'width:' + item.width + 'rpx;height:' + item.height + 'rpx;'"></image>
					<!-- <import src="../../wxParse/wxParse.wxml" />
      <view class="wxParse">
        <template is="wxParse" data="{{wxParseData:content.nodes}}" />
      </view> -->
				</view>
			</view>

			<!--分享领红包-->
			<!-- <view class="share-get-cashgift" wx:if="{{productgift}}">
    <view class="cashgift-title">{{productgift.msgtitle}}</view>
    <view class="cashgift-ticket">
      <view class="ticket-inner">
        <view class="ticket-price {{giftNum}}">
          <i>¥</i>{{productgift.allmoney}}</view>
        <view class="ticket-content">
          <view class="ticket-title">{{productgift.name}}</view>
          <view class="ticket-desc" wx:if="{{productgift.isshare==0}}">{{productgift.msg}}</view>
          <view class="ticket-desc" wx:if="{{productgift.isshare==1}}">可到个人中心红包查看哦</view>
        </view>
        <view class="ticket-button{{productgift.isshare ? ' disable' :''}}">
          <button wx:if="{{productgift.isshare==0 && isshare==0}}" open-type="share" bindtap="shareTo">去分享</button>
          <span wx:if="{{productgift.isshare==1 || isshare==1}}">已领取</span>
        </view>
      </view>
    </view>
  </view> -->

			<!-- 常见问题 -->
			<view class="intro">

				<view class="wxParse">
					<component is="wxParse" :wxParseData="introContent.nodes"></component>
				</view>
			</view>

			<!-- 为你推荐 -->
			<!-- <view id="theme" class="app-container top-margin-line" wx:if="{{shopList && shopList.length > 0}}">
    <view class="productLis-header">
      <text>为你推荐</text>
    </view>
    <template is="listDetail" data="{{shopList}}" />
  </view> -->

			<!-- 底部返回首页 -->
			<!-- <navigator hover-class="none" url='../index/index' open-type='switchTab' class='footer-return tc'>
    <view class='gohome'>去商城首页逛逛
      <image class='icon-right-arrow' src='{{iconURL}}/icon_right_arrow.png'></image>
    </view>
  </navigator>  -->
			<view class="back-button">
				<view @click.stop="gotoPagetop" class="backtop" :style="'background-image:url(' + iconURL + '/to_top01.png)'" v-if="showBackTop"></view>
				<!-- <view catchtap='gotoHome' class='gohome' wx:if='{{showBackTop}}' style='background-image:url({{iconURL}}/gohome.png)'></view> -->
			</view>
			<pageBottomLogo2></pageBottomLogo2>
		</view>
		<!-- #ifdef MP-WEIXIN -->
		<action-sheet :hidden="!isShowModeWx" @change="closeShareWx">
			<button class="share-btn" open-type="share" @tap="clossShare">
				<action-sheet-item open-type="share">
					分享给好友
				</action-sheet-item>
			</button>
			<!-- <button hover-class='none' data-wares_image="{{bannerItem[0].src}}" data-wares_logo="{{iconURL}}/basicprofile.png" data-wares_title="好又省团购" data-wares_content="{{itemData.share_title}}" data-wares_price="￥{{itemData.shop_price}}立即购买" data-template_key="c5e4a9f301035937e386d03ac23cb298"
    bindtap='aldminishare' class='big-icon'>
    <action-sheet-item>生成分享卡片</action-sheet-item>
  </button> -->
			<button class="share-btn" @tap="drawPic">
				<action-sheet-item>
					生成分享卡片
				</action-sheet-item>
			</button>
			<action-sheet-cancel>取消</action-sheet-cancel>
		</action-sheet>
		<!-- #endif -->
		<!--SKU弹窗-->
		<view class="drawer_screen" @click.stop="setModalStatus" v-if="showModalStatus"></view>
		<view :animation="animationData" :style="'opacity:1;z-index:' + (itemData.is_team==1?'2000':'1200') + ';'" :class="'drawer_attr_box ' + (iphoneXBottom=='68rpx'?'bt-68':'')"
		 v-if="showModalStatus">
			<view class="close_icon" @click.stop="setModalStatus">
				<image :src="iconURL + '/icon_modal_closs.png'"></image>
			</view>
			<view class="drawer_attr_content">
				<view class="text_center">
					<view class="drawer_image">
						<image class mode="widthFix" :src="skuImages"></image>
					</view>
					<view class="product-SKU">
						<view class="product-price">
							<text class="font_24">¥</text>
							<text>{{skuSvipCurrent}}</text>
							<text v-if="skuSvipCurrent != skuCurrent" class="small">￥{{skuCurrent}}</text>
						</view>
						<view class="product-choose">{{choosed_sku}}</view>
					</view>
				</view>
				<scroll-view class="attr-margin" scroll-y="true">
					<view class="attr_main sku-height" v-for="(property, index) in itemData.properties" :key="index">
						<view class="group-name">{{property.spec_name}}</view>
						<view class="commodity_attr_list">
							<view class="attr_box" v-for="(attr, index2) in property.attrs" :key="index2" @click.stop="attrValueselest"
							 :data-property="property" :data-attr="attr">
								<view :class="'attr_name ' + attr.class">
									{{attr.item}}
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
				<view class="attr-amount attr_main">
					<!-- <view class="group-name attr_num_txt">购买数量</view> -->
					<view class="group-click">
						<!-- 减号 -->
						<form report-submit="true" @submit="changeNum" data-alpha-beta="0">
							<button class="amount-button" form-type="submit">
								<i :class="'amount-icon ' + (undel ? 'cant-del' : '')">-</i>
							</button>
						</form>

						<!-- 数值 -->
						<view class="amount-input">{{buynum}}</view>
						<!-- 加号 -->
						<form report-submit="true" @submit="changeNum" data-alpha-beta="1">
							<button class="amount-button" form-type="submit">
								<i :class="'amount-icon ' + (unadd ? 'cant-del' : '')">+</i>
							</button>
						</form>
					</view>
				</view>
				<button class="buy_now_btn" @click.stop="team_type==0?'nowPurchase':'delegation'" v-if="itemData.is_team==1">确定</button>
			</view>
		</view>
		<!-- 领取红包 -->
		<view class="drawer_screen" @tap="setModalBonus" v-if="showBonusModal"></view>
		<view :animation="animationData" style="opacity:0;" :class="'modal-inner ' + (iphoneXBottom=='68rpx'?'mb-170':'')"
		 v-if="showBonusModal">
			<!-- <view class="modal-inner-header modal-coupon-title">红包（{{shippingBonus.length}}张）</view> -->
			<view class="modal-coupon-close" @tap="setModalBonus">
				<view class="iconfont icon-btn_qiapianguanbianniux"></view>
			</view>
			<view class="modal-coupon-text">选择优惠券</view>
			<scroll-view class="modal-inner-main" scroll-y="true">
				<view class="modal-inner-block modal-coupon-box">

					<view class="box_list row" :style="'background-image:url(' + iconURL + '/coupon_orange01.png)'" v-for="(bonus, index) in shippingBonus"
					 :key="index">
						<!-- 左侧面额 -->
						<view class="coupon_val  color-coupon" v-if="bonus.coupon_type==1">
							<text class="text">{{bonus.value}}</text>
							<text class="icon">折</text>
						</view>
						<view class="coupon_val  color-coupon" v-else>
							<text class="icon">¥</text>
							<text class="text">{{bonus.value}}</text>
						</view>
						<!-- 优惠券信息 -->
						<view class="coupon_info color_gray_dark col-50">
							<view class="list_title">{{bonus.name}}</view>
							<view class="dom-attr">{{bonus.description}}</view>
							<view class="list_time">{{bonus.use_end_date}}</view>
						</view>
						<!-- 右侧领取部位 -->
						<form class="get_coupon_btn col-30" @submit="getBonus" report-submit="true" :data-typeid="bonus.id">
							<button class="getCoupon" hover-class="none" v-if="!bonus.is_used && !bonus.is_give_over" formType="submit"
							 :data-typeid="bonus.id">
								<span class="get_coupon" v-if="!bonus.is_used && !bonus.is_give_over">领取</span>
							</button>
						</form>
						<span class="list_button_img" v-if="bonus.is_used && !bonus.is_give_over">
							<image @tap="getBonus" :data-typeid="bonus.id" mode="widthFix" :src="iconURL + '/is_used_102.png'"></image>
						</span>
						<span class="list_button_img" v-if="bonus.is_give_over">
							<image @tap="getBonus" :data-typeid="bonus.id" mode="widthFix" :src="iconURL + '/receive_over02.png'"></image>
						</span>
					</view>
				</view>
			</scroll-view>
		</view>

		<!-- 服务弹窗 -->
		<view class="drawer_screen" @tap="setfwModalStatus" data-status="0" v-if="showfwModalStatus"></view>
		<view :animation="animationData" style="opacity:0" class="fw_manu_box" v-if="showfwModalStatus">
			<view class="manu_header">服务条款</view>
			<view class="manu-margin">
				<view class="manu-fr">
					<view class="fr-a">
						<view class="iconfont icon-yuanzhuangzhengpin"></view>
						<text>{{itemData.services_desc[0].name}}</text>
					</view>
					<view class="fr-b">
						<text>{{itemData.services_desc[0].desc}}</text>
					</view>
				</view>
				<view class="manu-fr">
					<view class="fr-a">
						<view class="iconfont icon-img_jisutihuox"></view>
						<text>{{itemData.services_desc[1].name}}</text>
					</view>
					<view class="fr-b">
						<text>{{itemData.services_desc[1].desc}}</text>
					</view>
				</view>
				<view class="manu-fr">
					<view class="fr-a">
						<view class="iconfont icon-bianjietihuo"></view>
						<text>{{itemData.services_desc[2].name}}</text>
					</view>
					<view class="fr-b">
						<text>{{itemData.services_desc[2].desc}}</text>
					</view>
				</view>
				<view class="manu-fr">
					<view class="fr-a">
						<view class="iconfont icon-fangxingoumai"></view>
						<text>{{itemData.services_desc[3].name}}</text>
					</view>
					<view class="fr-b">
						<text>{{itemData.services_desc[3].desc}}</text>
					</view>
				</view>
			</view>
			<view class="iconfont icon-btn_qiapianguanbianniux" data-status="0" @tap="setfwModalStatus"></view>
		</view>

		<!-- 租机弹窗 -->
		<view class="drawer_screen" @tap="setzjModalStatus" data-status="0" v-if="showzjModalStatus"></view>
		<view :animation="animationData" style="opacity:0" class="fw_manu_box" v-if="showzjModalStatus">
			<view class="manu_header">租机提示</view>
			<view class="manu-margin">
				<view class="zj-text">该商品为租贷类商品，请至“买买提”APP进行购买，若并未下载，可扫描下方二维码进行下载</view>
				<view class="zj-erweima">
					<image :src="iconURL + '/product_img_acode_v1.png'"></image>
				</view>
			</view>
			<view class="iconfont icon-btn_qiapianguanbianniux" data-status="0" @tap="setzjModalStatus"></view>
		</view>
		<!-- 位置信息设置 -->
		<view class="drawer_screen" v-if="showSettingModalStatus"></view>
		<view class="tc_manu_box" v-if="showSettingModalStatus">
			<view class="tc_manu_items">
				<view class="manu_header">权限提示</view>
				<view class="manu-margin">
					<view class="tc-text">您未打开目前位置，部分功能将受到影响，请点击前往设置开启</view>
				</view>
				<view class="manu-buttons row">
					<button @tap="settingModalStatus">取消</button>
					<button class="button-primary" @tap="goSetting">前往设置</button>
				</view>
			</view>
		</view>
		<!-- 分享图片 -->
		<view class="share-modal-pic" v-if="isShowSharePic" @tap="closeSharePic">
			<view class="drawer_screen" v-if="isShowSharePic"></view>
			<view class="modal-content">
				<view class="share-img">
					<!-- 画布大小按需定制 -->
					<canvas canvas-id="shareImg" style="width:283px;height:480px"></canvas>
					<image :src="preurl" mode="widthFix" class="show-img"></image>
				</view>
				<view class="share-btns row">
					<view class="share-button">取消</view>
					<view class="share-button btn-right" @tap="saveSharePic">保存图片</view>
				</view>
			</view>
		</view>
		<!-- 获取手机号弹窗 -->
		<view class="drawer_screen-phone" v-if="showPhoneModal"></view>
		<view class="getPhoneModal" v-if="showPhoneModal">
			<view class="modal-text">
				买买提将通过短信形式进行提醒，请允许授权手机号
			</view>
			<view class="btn-footer">
				<button class="close-phone-btn" @tap="closePhoneModal">
					取消提醒
				</button>
				<button class="get-phone-btn" open-type="getPhoneNumber" @getphonenumber="getPhone">
					允许授权
				</button>
			</view>
		</view>
		<!---底部开始-->
		<view :class="'footfixed ' + (swiperImgBl ? 'footShow' : '')" :style="'padding-bottom:' + iphoneXBottom">
			<view class="left">
				<view class="submit-icon">
					<image class="icon-ico" :src="iconURL + '/sxsy.svg'"></image>
					<view class="text">首页</view>
				</view>
				<view class="submit-icon" @tap="goRegister">
					<image class="icon-ico" :src="iconURL + '/product_contact_v2.svg'"></image>
					<view class="text">客服</view>
					<button open-type="contact" class="icon-contact" session-from="商品详情" :send-message-title="itemData.goods_name"
					 :send-message-path="'/pages/product/product?productId=' + itemData.goods_id" :send-message-img="itemData.gallery[0].msrc"
					 show-message-card="true" v-if="checkSessionKey&&isOldUser!=2"></button>
				</view>
				<view class="submit-icon" v-if="itemData.is_team == 0">
					<image class="icon-ico" :src="iconURL + '/product_cart_v2.svg'"></image>
					<view class="text">购物车</view>
					<view class="cart-badge" v-if="cartAmount <= 99 && cartAmount != 0">{{cartAmount}}</view>
					<view class="cart-badge max-length" v-if="cartAmount > 99">99+</view>
				</view>
				<form @submit="gotoHome" class="product-form-bottom home" report-submit="true">
					<button form-type="submit"></button>
				</form>
				<form @submit="goToCart" v-if="itemData.is_team == 0" class="product-form-bottom cart" report-submit="true">
					<button form-type="submit"></button>
				</form>
			</view>
			<!-- hidden="{{!checkSessionKey}}" -->
			<view>
				<form @submit="nowPurchase" v-if="canPurchase && itemData.buy_now == 1" report-submit="true">
					<!-- 原先立即购买按钮 -->
					<button type="primary" style="background-color:#ffe150;color:#303030;opacity:1" v-if="itemData.shop_type==0"
					 :class="'submit-button-big ' + (canPurchase ? 'block_theme' : '')" formType="submit">立即购买</button>
					<!-- 租机按钮显示效果 -->
					<button v-else class="rent-button" formType="submit">
						<view class="yellow_bg rent-btn">￥{{itemData.rent_machine_year[1].value}}/年年租</view>
						<view class="red_bg rent-btn">￥{{itemData.rent_machine[1].value}}/随心租</view>
					</button>
				</form>
				<view class="bottom-buttons row" v-else-if="canPurchase && itemData.cart_add_disable == 0 && itemData.is_team == 0 &&  date_limite_ing">
					<form @submit="addShopCart" data-type="addcart" report-submit="true">
						<button type="primary" class="submit-button add-cart" formType="submit">加入购物车</button>
					</form>
					<form @submit="nowPurchase" report-submit="true">
						<button type="primary" class="submit-button now-purchase" formType="submit">{{date_limite_bool&&activity_classfy==1&&promInfoData.activity_type==2 ? "马上抢" : "立即购买"}}</button>
					</form>
				</view>
				<view class="bottom-buttons team-buttons row" v-else-if="canPurchase && itemData.is_team == 1">
					<form @submit="nowPurchase" report-submit="true" v-if="teamLabel.status ==1">
						<button type="primary" class="submit-button add-cart team-button" formType="submit">
							<view class="team-button-price">
								<i class="i">¥</i>
								<i>{{itemData.shop_price}}</i>
							</view>
							<view class="team-button-text">单独购买</view>
						</button>
					</form>
					<form @submit="delegation" report-submit="true" v-if="teamLabel.status==1">
						<button type="primary" class="submit-button now-purchase team-button team-button-big" formType="submit">
							<view class="team-button-price">
								<i class="i">¥</i>
								<i>{{itemData.team_price}}</i>
							</view>
							<view class="team-button-text">{{itemData.is_new_activity_user==1?'新人专享':'一键开团'}}</view>
						</button>
					</form>
					<button class="submit-button now-purchase team-remind-big" v-if="teamLabel.status==2&&!check_remind" @tap="change_team">
						设置提醒
					</button>
					<button class="submit-button end-remind team-remind-big" v-if="teamLabel.status==2&&check_remind" @tap="change_team">
						取消提醒
					</button>
					<!-- <button  class="submit-button team-begin team-button team-button-big" wx:else >
         即将开抢
      </button> -->
				</view>
				<form report-submit="true" @submit="activeChangeMe" v-else-if="date_limite_bool && activity_classfy==1 &&promInfoData.activity_type==2 && !date_limite_ing">
					<button type="primary" :style="'background-color:' + (!check_remind_activity ? '#FFE150' : '#aaaaaa') + ';color:#303030;opacity:1'"
					 class="submit-button-big" form-type="submit">{{!check_remind_activity ? '提醒我' : '取消提醒'}}</button>
				</form>
				<!-- 商品已抢光 -->
				<button type="primary" style="background-color:#aaaaaa;color:#303030;opacity:1" v-else :class="'submit-button-big ' + (itemData.is_team == 1?'width-534':'')"
				 disabled="true">商品已抢光，正在补货中~</button>
			</view>
			<!-- <button type='primary' class="submit-button {{canPurchase ? 'block_theme' : ''}}" open-type="getPhoneNumber" bindgetphonenumber="getPhone" hidden='{{checkSessionKey}}'>加入购物车</button> -->
		</view>
		<view class="top-mask" v-if="showTopMask"></view>
		<!-- 红包-顶部通知消息 -->
		<!-- <notice type="2" :unload="noticeUnload"></notice> -->
		<loading v-if="loadingShow"></loading>
	</view>
</template>

<script>
	//获取应用实例
	var app = getApp().globalData;
	var common = require("../../utils/common.js");
	var event = require("../../utils/event.js"); //引入这个插件，使html内容自动转换成wxml内容
	//引入这个插件，使html内容自动转换成wxml内容
	var WxParse = require("../../wxParse/wxParse.js");
	import teamList from "../../components/teamList/teamList";
	import navbar from "../../components/navBar/navBar";

	export default {
		data() {
			return {
				iconURL: app.dataBase.iconURL,
				bannerApp: true,
				iphoneXBottom: '0rpx',
				winWidth: 0,
				winHeight: 0,
				productId: 0,
				itemData: {
					shop_type: 0
				},
				isLike: 0,
				showSKUstatus: 0,
				optionalAttrs: {},
				skuImages: '',
				bannerItem: [],
				buynum: 1,
				// 产品图片轮播
				indicatorDots: true,
				indicatorColor: "rgba(0,0,0,.2)",
				indicatorActiveColor: "#ffe150",
				autoplay: false,
				interval: 5000,
				duration: 300,
				circular: true,
				// 属性选择
				firstIndex: -1,
				choosed_sku: '',
				cartAmount: 0,
				// 滚动判断值 1：商品，2：评价，3详情
				currentLocation: 1,
				// 是否显示subbar
				showSubbar: false,
				// 滚动到的位置
				scrollTop: 0,
				scrollBar: '',
				showBackTop: false,
				// 弹窗SKU，不能减不能加
				undel: true,
				unadd: false,
				// 领券弹窗
				showBonus: 0,
				// IP推荐
				brandID: 0,
				ipRecommend: {},
				formateDatas: [],
				// 商品评论
				comment: {},
				// 拼团次数
				teamLabel: {},
				wordsLimit: true,
				limitWords: "展开",
				// SKU的VIP价格和非SVIP是否相同
				isPriceEqual: false,
				// 优惠券分享样式
				productgift: {},
				isshare: 0,
				giftNum: '',
				bounsTxtnumOn: false,
				// 优惠券展示
				showBonusModal: false,
				// 前往设置弹窗
				showSettingModalStatus: false,
				// isShowModeWx: 1,
				isShowbox: 0,
				canPurchase: false,
				date_limite_bool: true,
				date_limite_ing: true,
				// 是否显示右上角返回首页
				isShowGoHome: false,
				// 分享图片
				isShowSharePic: false,
				preurl: null,
				// 租机弹窗
				showzjModalStatus: false,
				// 方案详情切换开关
				rentToggleStatus: 0,
				aldExposure: true,
				stopCartBtn: false,
				prom_bool: false,
				activity_bool: false,
				activity_classfy: "",
				h: "00",
				m: "00",
				s: "00",
				d: "00",
				teamList: [],
				team_num: 0,
				check_remind: false,
				check_remind_activity: false,
				showPhoneModal: false,
				// navbar
				navbarOpacity: 0,
				showBack: false,
				navBarHeight: app.navBarHeight,
				team_type: '',
				team_sku_type: 0,
				noticeUnload: false,
				// 抢购价钱
				activity_price_start: '0',
				activity_price_end: '0.00',
				activity_time_start: {},
				confirmData: {},
				down_date_h: "",
				down_date_m: "",
				down_date_s: "",
				down_date_ms: "",
				showCountDown: false,
				checkSessionKey:false ,
				isOldUser: "",
				entryData: "",
				animationData: "",
				showModalStatus: false,
				showfwModalStatus: false,
				showShareModalStatus: false,
				skuSvipCurrent: "",
				skuCurrent: "",
				promInfoData: "",
				swiperImgBl: false,
				shippingBonus: "",
				sku_price: "",
				min_sku_price: "",
				sku_svip_price: "",
				min_sku_svip_price: "",
				currentStock: "",
				hasDefaultSKU: "",
				sumbitName: "",
				scgGoodsList: [],
				isShowModeWx: 0,
				currentAttrs: []
			};
		},
		// 传值
		onLoad: function(options) {
			// this.checkSessionKey = app.checkSessionKey
			var that = this;
			// #ifdef MP-WEIXIN 
			wx.showShareMenu({
				withShareTicket: true
			});
			// #endif
			var page = getCurrentPages();
			
			if (page.length > 1) {
				that.setData({
					showBack: true
				});
			}
		
			wx.getSystemInfo({
				success: function(res) {
					var model = res.model;
		
					if (model.search('iPhone X') != -1) {
						that.setData({
							iphoneXBottom: '68rpx'
						});
					}
				}
			}); 
			console.log('1',app.checkSessionKey)
			// 监听checkSessionKey
			event.on('checkSessionKey', this, function(data) {
				var isOldUser = common.getStorageSync('isOldUser');
				this.setData({
					checkSessionKey: data,
					isOldUser
				});
			});
			let codeId = '';
			let codePickup = '';
		
			if (options.scene) {
				let scene = decodeURIComponent(options.scene);
				codeId = scene.split("&")[0];
				codePickup = scene.split('&amp;')[1];
			}
		
			if (options.productId == undefined && codeId == '') {
				common.toast("请求参数错误");
				return;
			}
		
			var that = this;
		
			if (options && options.scene && options.scene != '') {
				that.setData({
					productId: codeId
				});
				this.setData({
					isShowGoHome: true
				});
			} else {
				that.setData({
					productId: options.productId
				});
				this.getTeamList();
			} // 从外部分享进入时，显示左上角回到首页  改动带external时为内部进入携带参数，外部进入不带参数
		
			if (options && options.entryType && options.entryType == 'external') {
				this.setData({
					isShowGoHome: false
				});
			} else {
				this.setData({
					isShowGoHome: true
				});
			} // 外部带商品店铺
		
		
			this.setData({
				entryData: options
			});
			var options = that.entryData;
			if (options && options.scene && options.scene != '') {
				that.getExternal(codePickup).then(function() {
					// 关闭开关，让app知道已经不是第一次进入当前页
					app.firstlaunchApp = false; // 清空data内携带参数
		
					that.entryData = {}; // 外部已带经纬度定位，无需再调用定位接口，所以将缓存定位改为真，让页面可以显示
		
					common.setStorageSync('authSetting', {
						'scope.userLocation': true
					});
					that.checkSessionKey = true;
					that.loadProductDetail();
					that.loadProductgift();
					that.sameCategoryGoods();
				});
				return;
			}
		
			var pickupId = common.getStorageSync('getpickup'); // 判断是否第一次进入 且是从外部进入，如二维码扫码 && app.firstlaunchApp
		
			if (options && (options.atitude || options.pickup_id) && !pickupId) {
				that.getExternal(options.pickup_id).then(function() {
					// 关闭开关，让app知道已经不是第一次进入当前页
					app.firstlaunchApp = false; // 清空data内携带参数
		
					that.entryData = {}; // 外部已带经纬度定位，无需再调用定位接口，所以将缓存定位改为真，让页面可以显示
		
					common.setStorageSync('authSetting', {
						'scope.userLocation': true
					});
					that.checkSessionKey = true;
					that.loadProductDetail();
					that.loadProductgift();
					that.sameCategoryGoods();
				});
			} else {
				that.checkSessionKey = true;
				that.loadProductDetail();
				that.loadProductgift();
				that.sameCategoryGoods();
			}
		},
		components: {
			teamList,
			navbar,
		},
		props: {},
		onShow: function() {
			
			var isOldUser = common.getStorageSync('isOldUser');
			console.log('productlist',app.checkSessionKey)
			this.setData({
				checkSessionKey: app.checkSessionKey,
				isOldUser: isOldUser
			});

			if (this.itemData.team_id && this.itemData.team_id != undefined) {
				this.loadProductDetail();
				this.getTeamList();
			}
		},
		onUnload: function() {
			this.setData({
				noticeUnload: true
			});
		},
		
		// 调用微信分享接口
		onShareAppMessage: function(res) {
			var that = this;
			var pickup = common.getStorageSync('getpickup');
			var entry_share_info = common.getStorageSync('entry_share_info');

			if (res.target && res.target.dataset.shareinfo) {
				let shareInfo = res.target.dataset.shareinfo;

				if (shareInfo && shareInfo.fromButton == 'notice') {
					return {
						title: entry_share_info.urge_share_text,
						path: '/pages/index/index?pickup_id=' + pickup.pickup_id + '&user_id=' + entry_share_info.user_id,
						imageUrl: entry_share_info.urge_share_img
					};
				} else if (shareInfo && shareInfo.fromButton == 'envelopes') {
					return {
						title: entry_share_info.invite_share_text,
						path: '/pages/index/index?pickup_id=' + pickup.pickup_id + '&user_id=' + entry_share_info.user_id,
						imageUrl: entry_share_info.invite_share_img
					};
				} else {
					return {
						title: that.itemData.share_title,
						path: '/pages/product/product?productId=' + that.itemData.goods_id + '&pickup_id=' + pickup.pickup_id,
						imageUrl: that.itemData.share_img
					};
				}
			} else {
				return {
					title: that.itemData.share_title,
					path: '/pages/product/product?productId=' + that.itemData.goods_id + '&pickup_id=' + pickup.pickup_id,
					imageUrl: that.itemData.share_img
				};
			}
		},
		// 跳转播放视频
		// setPreviewVideo: function(e){
		//   var videoUrl = e.currentTarget.dataset.current;
		//   app.dataBase.pageUrl = 'https://mall.surex.cn/h5/index.html?videoUrl=' + videoUrl;
		//   common.goWebview('video');
		// },
		//跳转在线客服
		// golinkkf: function () {
		//   app.dataBase.pageUrl = 'http://q.url.cn/s/6l3eQOm?_type=wpa&_wv=2';
		//   common.goWebview();
		// },
		// 下拉刷新
		onPullDownRefresh: function() {
			that.loadProductDetail(); // that.getCommentlist();
			// that.loadProductCartAmount();

			that.loadProductgift();
			setTimeout(function() {
				wx.stopPullDownRefresh();
			}, 1500);
		},
		methods: {
			getDate: function(prom_info) {
				var that = this;
				var start = prom_info.start_time * 1000;
				var end = prom_info.end_time * 1000;
				var now = new Date().getTime(); // && prom_info.prom_label=="限时抢购"

				if (now >= start && now <= end) {
					that.countTime(now, end);
					that.setData({
						date_limite_ing: true
					});
					this.date = setInterval(function() {
						var now = new Date().getTime();
						that.countTime(now, end);
					}, 1000);
					that.countTimeMs();
				} else if (start >= now && end >= now) {
					that.countTime(now, start);
					that.setData({
						date_limite_ing: false
					});
					this.date = setInterval(function() {
						var now = new Date().getTime();
						that.countTime(now, start);
					}, 1000);
				} else {
					that.setData({
						date_limite_bool: false
					});
				}
			},
			countTime: function(now, end) {
				var leftTime = end - now;
				var d, h, m, s;

				if (leftTime >= 0) {
					d = Math.floor(leftTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数

					h = Math.floor(leftTime / 1000 / 60 / 60 % 24) + d * 24;
					m = Math.floor(leftTime / 1000 / 60 % 60);
					s = Math.floor(leftTime / 1000 % 60);
				} else {
					clearInterval(this.date);
					this.loadProductDetail();
					return false;
				}

				h = h > 9 ? h : '0' + h;
				m = m > 9 ? m : '0' + m;
				s = s > 9 ? s : '0' + s;
				this.setData({
					down_date_h: h,
					down_date_m: m,
					down_date_s: s
				});
			},

			// 毫秒倒计时
			countTimeMs() {
				var ms = 9;
				this.dataMs = setInterval(() => {
					if (ms > 1) {
						ms--;
					} else {
						ms = 9;
					}

					this.setData({
						down_date_ms: ms
					});
				}, 100);
			},

			//倒计时函数
			countDown: function(end) {
				var that = this;
				var now = new Date().getTime() / 1000;
				var leftTime = end - now;
				var d, h, m, s;
				clearInterval(that.teamTime);
				that.teamTime = setInterval(() => {
					leftTime = leftTime - 1;

					if (leftTime >= 0) {
						d = Math.floor(leftTime / 60 / 60 / 24, 10); //计算剩余的天数

						h = Math.floor(leftTime / 60 / 60 % 24);
						m = Math.floor(leftTime / 60 % 60);
						s = Math.floor(leftTime % 60);
						d = d > 9 ? d : '0' + d;
						h = h > 9 ? h : '0' + h;
						m = m > 9 ? m : '0' + m;
						s = s > 9 ? s : '0' + s;
					} else {
						clearInterval(that.teamTime);
						this.setData({
							showCountDown: false
						});
						that.loadProductDetail();
					}

					this.setData({
						d: d,
						h: h,
						m: m,
						s: s
					});
				}, 1000);
			},
			// 从外部二维码扫码，带经纬度和外部标识external
			getExternal: function(pickup_id) {
				var that = this;
				var uri = app.getPath.getpickup;
				var data = {
					pickup_id: pickup_id
				};
				return new Promise(function(resolve, reject) {
					// 获取提货点
					common.ApiGateWayTest(uri, data, true, function(res) {
						if (res && res.data && res.data.success == 1) {
							var res = res.data.result.cities.pick_up;
							common.setStorage({
								key: 'city',
								data: {
									'pickup_id': res.pickup_id,
									'warehouse_id': res.warehouse_id,
									'cityName': res.city_name,
									'is_pick_up': 1
								}
							});
							common.setStorage({
								key: 'getpickup',
								data: {
									'pickup_id': res.pickup_id,
									'cityName': res.pickup_name,
									'pickup_address': res.pickup_address,
									'pickup_contact': res.pickup_contact,
									'pickup_phone': res.pickup_phone,
									'pickup_type': res.pickup_type
								}
							}, function(res) {
								resolve('获取id成功');
							});
						}
					});
				});
			},
			// 获取手机号去登录注册
			// getPhone: function (e) {
			//   var that = this;
			//   common.checkLogin(e, function () {
			//     // 登录成功，修改app与user页面的checkSessionKey状态
			//     app.checkSessionKey = true;
			//     that.data.checkSessionKey = true;
			//   })
			// },
			// 轮播画廊
			setPreviewImage: function(e) {
				var that = this;
				var current = e.currentTarget.dataset.current;
				var imgUrl = [];

				for (var i = 0; that.bannerItem.length > i; i++) {
					imgUrl.push(that.bannerItem[i].src);
				}

				wx.previewImage({
					current: current,
					urls: imgUrl
				});
			},
			// SKU弹窗
			setModalStatus: function(type) {
				var that = this;
				console.log(this.showSKUstatus)
				if (this.showSKUstatus == 0) {
					this.showSKUstatus = 1;
				} else {
					this.showSKUstatus = 0;
				}
				
				var animation = wx.createAnimation({
					duration: 250,
					timingFunction: "linear",
					delay: 0
				});
				animation.translateY(368).opacity(1).step();
				this.setData({
					animationData: animation.export()
				});

				if (this.showSKUstatus == 1) {
					this.setData({
						showModalStatus: true
					});
				}

				setTimeout(function() {
					if (that.iphoneXBottom == "68rpx") {
						animation.translateY(-34).step();
					} else {
						animation.translateY(0).step();
					}

					this.setData({
						animationData: animation
					});

					if (this.showSKUstatus == 0) {
						this.setData({
							showModalStatus: false
						});
					}
				}.bind(this), 200);
			},
			// 领券弹窗
			setModalBonus: function() {
				if (this.showBonusModal == 0) {
					this.showBonusModal = 1;
				} else {
					this.showBonusModal = 0;
				}

				var animation = wx.createAnimation({
					duration: 300,
					timingFunction: "linear",
					delay: 0
				});
				animation.translateY(300).opacity(1).step();
				this.setData({
					animationData: animation.export()
				});

				if (this.showBonusModal == 1) {
					this.setData({
						showBonusModal: true
					});
				}

				setTimeout(function() {
					animation.translateY(0).step();
					this.setData({
						animationData: animation
					});

					if (this.showBonusModal == 0) {
						this.setData({
							showBonusModal: false
						});
					}
				}.bind(this), 200);
			},
			// 弹窗里领取优惠券
			getBonus: function(e) {
				var that = this; // 跳转登录

				var isOldUser = common.getStorageSync('isOldUser');

				if (!app.checkSessionKey || isOldUser == 2) {
					common.goRegister();
					return false;
				}

				var coupon_id = e.currentTarget.dataset.typeid;
				if (!that.shippingBonus) return;
				var uri = app.getPath.addCoupon;
				var data = {
					coupon_id: coupon_id
				};
				common.formIdUpdate(e);
				common.ApiGateWayTest(uri, data, true, function(res) {
					if (res.statusCode == 200) {
						if (res.data.result) {
							common.toast(res.data.result.state_desc);
						}
					}

					that.loadProductgift();
				});
			},
			// 服务弹窗
			setfwModalStatus: function(e) {
				var animation = wx.createAnimation({
					duration: 300,
					timingFunction: "linear",
					delay: 0
				});
				animation.translateY(300).opacity(1).step();
				this.setData({
					animationData: animation.export()
				});
				this.setData({
					showfwModalStatus: true
				});
				setTimeout(function() {
					animation.translateY('-150px').translateX('-50%').step();
					this.setData({
						animationData: animation
					});

					if (e.currentTarget.dataset.status == 0) {
						this.setData({
							showfwModalStatus: false
						});
					}
				}.bind(this), 200);
			},
			// 分享选择弹窗
			showShareModalStatus2: function(e) {
				var animation = wx.createAnimation({
					duration: 300,
					timingFunction: "linear",
					delay: 0
				});
				animation.translateY(300).opacity(1).step();
				this.setData({
					animationData: animation.export()
				});
				this.setData({
					showShareModalStatus: true
				});
				setTimeout(function() {
					animation.translateY(0).step();
					this.setData({
						animationData: animation
					});

					if (e.currentTarget.dataset.status == 0) {
						this.setData({
							showShareModalStatus: false
						});
					}
				}.bind(this), 200);
			},
			// 商品详情数据获取
			loadProductDetail: function() {
				var that = this;
				common.showLoad(this);
				var uri = app.getPath.goodsInfo;
				var promInfoUri = app.getPath.goodsLabel;
				var skuAmounturi = app.getPath.getSkuAmount;
				var data = {
					goods_id: that.productId
				};
				common.ApiGateWayTest(uri, data, true, function(res) {
					
					if (res.statusCode == 200) {
						var productlist = res.data.result; // productlist.min_buy_amount = productlist.min_buy_amount ? productlist.min_buy_amount : 1;
						console.log('productlist',productlist);	
						var content = productlist.goods_content;
						var introContent = productlist.detail_explain;
						var islike = productlist.is_liked;
						productlist.current_price = productlist.shop_price;
						productlist.price = productlist.market_price;
						productlist.team_price = parseFloat(productlist.team_price); // WxParse.wxParse('content', 'html', content, that, 0);
						// WxParse.wxParse('introContent', 'html', introContent, that, 0);

						that.setData({
							itemData: productlist,
							bannerItem: productlist.gallery,
							indicatorDots: productlist.gallery.length > 1 ? true : false,
							buynum: productlist.min_buy_amount,
							// isLike: islike,
							brandID: productlist.cat_id,
							skuSvipCurrent: parseFloat(productlist.shop_price),
							skuCurrent: parseFloat(productlist.market_price)
						});

						if (productlist.is_notice == 1) {
							that.setData({
								check_remind: true
							});
						}

						if (productlist.is_activity_notice == 1) {
							that.setData({
								check_remind_activity: true
							});
						}

						if (that.aldExposure == true) {
							// app.aldstat.sendEvent("进入商品详情", {
							//   "商品名称": that.itemData.report.goods_name,
							//   "用户名": that.itemData.report.nick_name
							// });
							that.aldExposure = false;
						}

						if (productlist.is_team == 1) {
							that.teamLabel2();
						}

						that.setDefaultSKU(productlist); // that.loadipRecommend();
						// that.getGoodsRecommend();

						that.isPriceEqualFun(); // 限时抢购倒计时

						common.ApiGateWayTest(promInfoUri, data, true, function(res) {
							var promInfoData = res.data.result.data;

							if (Object.prototype.toString.call(promInfoData) === '[object Object]') {
								that.getDate(promInfoData);
								var activity_price_array = promInfoData.activity_price.split('.');
								var activity_time_start_month = new Date(promInfoData.start_time * 1000).getMonth() + 1 < 10 ? '0' + (new Date(
										promInfoData.start_time * 1000).getMonth() + 1) : new Date(promInfoData.start_time * 1000).getMonth() +
									1;
								var activity_time_start_date = new Date(promInfoData.start_time * 1000).getDate() < 10 ? "0" + new Date(
									promInfoData.start_time * 1000).getDate() : new Date(promInfoData.start_time * 1000).getDate();
								var activity_time_start_hours = new Date(promInfoData.start_time * 1000).getHours() < 10 ? "0" + new Date(
									promInfoData.start_time * 1000).getHours() : new Date(promInfoData.start_time * 1000).getHours();
								var activity_time_start_min = new Date(promInfoData.start_time * 1000).getMinutes() < 10 ? "0" + new Date(
									promInfoData.start_time * 1000).getMinutes() : new Date(promInfoData.start_time * 1000).getMinutes();
								var activity_time_start = {
									activity_time_start_month: activity_time_start_month,
									activity_time_start_date: activity_time_start_date,
									activity_time_start_hours: activity_time_start_hours,
									activity_time_start_min: activity_time_start_min
								};
								that.setData({
									activity_bool: true,
									promInfoData: promInfoData,
									activity_price_start: activity_price_array[0],
									activity_price_end: activity_price_array[1],
									activity_time_start: activity_time_start,
									activity_classfy: res.data.result.type
								});
							} else {
								that.setData({
									activity_bool: false,
									promInfoData: promInfoData,
									activity_classfy: ''
								});
							}
						});
						common.hideLoad(that);
					} else {
						common.hideLoad(that);
						common.toast("获取购物车数量失败");
					}
				});
				common.ApiGateWayTest(skuAmounturi, '', true, function(res) {
					if (res.statusCode == 200) {
						that.setData({
							cartAmount: res.data.result.cart_num
						});
					}
				});
			},
			//获取购物车当前数量
			// loadProductCartAmount: function () {
			//   var that = this;
			//   var url = '/Api/api.cart.MySkuAmount';
			//   var data = {};
			//   common.sentHttpRequestToServer(url, data, function (res) {
			//     console.log(res);
			//     var SKUAmount = res.data.GetMySkuAmount ? res.data.GetMySkuAmount : 0;
			//     that.setData({
			//       cartAmount: SKUAmount
			//     });
			//   })
			// },
			// 轮播图片加载完成
			swiperImageLoad: function() {
				var that = this;
				that.setData({
					swiperImgBl: true
				});
			},
			// 加载优惠券
			loadProductgift: function() {
				var that = this;
				var Bonusuri = app.getPath.goodscouponlist;
				var data = {
					goods_id: that.productId
				};
				common.ApiGateWayTest(Bonusuri, data, true, function(res) {
					var shippingBonus = res.data.result;
					var bonusL = 0;
					var bounsTxtnum = 0;

					if (shippingBonus) {
						bonusL = shippingBonus.length > 3 ? 3 : shippingBonus.length;
					}

					for (var i = 0; i < bonusL; i++) {
						bounsTxtnum = bounsTxtnum + shippingBonus[i].name.length;
					}

					that.setData({
						shippingBonus: shippingBonus
					});

					if (bounsTxtnum > 24) {
						that.setData({
							bounsTxtnumOn: true
						});
					}
				});
			},
			// 加载IP推荐
			// loadipRecommend: function () {
			//   var that = this;
			//   if (that.data.brandID > 0) {
			//     var ipurl = app.getPath.goodsIpRecList;
			//     var ipdata = {
			//       goods_id: that.data.productId,
			//     };
			//     common.ApiGateWayTest(ipurl, ipdata, true, function (res) {
			//       var res = res.data.result;
			//       that.setData({
			//         ipRecommend: res,
			//       });
			//     })
			//   }
			//   else { console.log("brandID为0"); }
			// },
			//设置默认SKU
			setDefaultSKU: function(product) {
				// product 请求到的数据
				var defaultAttrIds = [];
				var defaultAttrStock = null;
				var maybeStock = [];
				var effectiveStock = []; // 得到SKU组合的原始数组

				for (var i = 0; i < product.properties.length; ++i) {
					var property = product.properties[i];

					if (!property.is_multiselect) {
						maybeStock[i] = [];

						for (var j = 0; j < property.attrs.length; j++) {
							maybeStock[i].push(property.attrs[j].id);
						}
					}
				} // 得到多个笛卡尔积组合


				maybeStock = common.multiCartesian(maybeStock);

				if (maybeStock.length && maybeStock[0] instanceof Array) {
					for (var i = 0; i < maybeStock.length; i++) {
						maybeStock[i].sort(function(a, b) {
							return a - b;
						});
					}
				} //验证是否可以购买


				this.setData({
					canPurchase: this.checkCanPurchase()
				});
				var min_sku_price = 9999999999;
				var min_sku_svip_price = 9999999999;

				for (var i = 0; i < product.stock.length; ++i) {
					var _goods_attr = product.stock[i].key.split('_');

					var _min_sku_price = product.stock[i].market_price,
						_min_sku_svip_price = product.stock[i].price;
					var hasDefaultFlag = false;

					if (min_sku_svip_price > _min_sku_svip_price) {
						var ids = [];

						if (product.is_goods_number > 0 && product.is_on_sale && product.stock[i].is_enough) {
							//商品能购买，并且该sku有库存 则更新最低价
							for (var ind = 0, len = _goods_attr.length; ind < len; ind++) {
								ids.push(parseInt(_goods_attr[ind]));
							}

							defaultAttrIds = ids;
							defaultAttrStock = [{
								attrs: defaultAttrIds,
								stock: product.stock[i]
							}];
							hasDefaultFlag = true;
							min_sku_svip_price = _min_sku_svip_price;
							min_sku_price = _min_sku_price;
						} else if (!product.is_goods_number > 0 || !product.is_on_sale) {
							//商品不能购买，则一定更新最低价，否则就是9999999999
							for (var ind = 0, len = _goods_attr.length; ind < len; ind++) {
								ids.push(parseInt(_goods_attr[ind]));
							}

							defaultAttrIds = ids;
							defaultAttrStock = [{
								attrs: defaultAttrIds,
								stock: product.stock[i]
							}];
							hasDefaultFlag = true;
							min_sku_svip_price = _min_sku_svip_price;
							min_sku_price = _min_sku_price;
						}
					}

					_goods_attr.sort(function(a, b) {
						return a - b;
					});

					_goods_attr = _goods_attr.join('_');

					for (var j = 0; j < maybeStock.length; j++) {
						var _thisStock = '';

						if (maybeStock[j] instanceof Array) {
							_thisStock = maybeStock[j].join('_');
						} else if (maybeStock[j] instanceof Object) {
							_thisStock = '';
						} else {
							_thisStock = maybeStock[j];
						}

						if (_goods_attr == _thisStock) {
							if (product.stock[i].is_enough == true) {
								effectiveStock.push({
									attrs: maybeStock[j],
									stock: product.stock[i]
								});
							}
						}
					}
				}

				var skuSvipCurrent = this.itemData.current_price;
				var skuCurrent = this.itemData.price;
				this.setData({
					sku_price: min_sku_price,
					min_sku_price: min_sku_price,
					sku_svip_price: min_sku_svip_price,
					min_sku_svip_price: min_sku_svip_price,
					skuSvipCurrent: parseFloat(skuSvipCurrent),
					skuCurrent: parseFloat(skuCurrent),
					currentStock: defaultAttrStock
				}); //先通过设置默认sku，来设置默认显示价格，设置完之后，把默认sku去掉，不影响原来逻辑

				this.currentAttrs = defaultAttrIds;
				this.setData({
					hasDefaultSKU: this.currentStock ? true : false
				});
				this.set_choosed_sku();
				defaultAttrIds = [];
				defaultAttrStock = null;
				this.setData({
					currentStock: null,
					hasDefaultSKU: false
				});
				this.currentAttrs = [];

				if (effectiveStock.length == 1) {
					defaultAttrIds = effectiveStock[0].attrs instanceof Array ? effectiveStock[0].attrs : [effectiveStock[0].attrs];
					defaultAttrStock = effectiveStock[0].stock;
				}

				if (effectiveStock.length > 1) {
					for (var i in product.properties) {
						var attrs = product.properties[i].attrs;

						for (var j in attrs) {
							var isin_count = 0;

							for (var k in effectiveStock) {
								var isin = new RegExp(attrs[j].id).test(effectiveStock[k].attrs);

								if (isin) {
									isin_count++;
								}
							}

							if (isin_count == effectiveStock.length) {
								defaultAttrIds.push(attrs[j].id);
							}
						}
					}
				}

				this.setData({
					currentStock: defaultAttrStock
				});
				this.currentAttrs = defaultAttrIds;
				this.setData({
					hasDefaultSKU: this.currentStock ? true : false
				});
				this.set_choosed_sku();
			},
			//设置choosed_sku
			set_choosed_sku: function() {
				var that = this;
				var product = that.itemData;

				if (that.currentAttrs.length < product.properties.length) {
					that.sku_price = that.min_sku_price;
					that.sku_svip_price = that.min_sku_svip_price;
					that.setData({
						choosed_sku: '选择：商品规格',
						skuImages: product.header_img,
						skuSvipCurrent: parseFloat(that.itemData.current_price),
						skuCurrent: parseFloat(that.itemData.price)
					});
					that.setAttrsClass();
					return;
				}

				var choosed_sku = '';
				var sku_price = 0;
				var sku_svip_price = 0;
				var sku_svip_team_price = 0;
				var skuSvipCurrent = that.itemData.current_price;
				var skuCurrent = that.itemData.price;
				that.setData({
					choosed_sku: choosed_sku,
					sku_price: sku_price,
					sku_svip_price: sku_svip_price,
					skuSvipCurrent: parseFloat(skuSvipCurrent),
					skuCurrent: parseFloat(skuCurrent)
				});

				for (var i in product.properties) {
					var attrs = product.properties[i].attrs;

					for (var j in attrs) {
						for (var k in that.currentAttrs) {
							if (that.currentAttrs[k] == attrs[j].id) {
								choosed_sku += attrs[j].item + ' '; //					sku_price += attrs[j].attr_price;
								//					sku_svip_price += attrs[j].attr_svip_price;
							}
						}
					}
				}

				if (choosed_sku != '') {
					for (var i in product.stock) {
						var stock = product.stock[i].key;
						stock = stock.split('_');
						stock.sort(function(a, b) {
							return a - b;
						});
						stock = stock.join('_');
						var attrs = that.currentAttrs.join('_');

						if (attrs == stock) {
							that.skuImages = product.stock[i].header_img;
							sku_price = product.stock[i].market_price;
							sku_svip_price = product.stock[i].shop_price;
							sku_svip_team_price = product.stock[i].team_price;
						}
					}

					that.confirmData = [{
						goods_name: product.goods_name,
						goods_id: product.goods_id,
						sku_key: attrs,
						amount: that.buynum,
						shop_price: sku_svip_price,
						market_price: sku_price,
						sku_key_name: "规格:" + choosed_sku,
						sku_img: that.skuImages
					}];
					choosed_sku = '已选：' + choosed_sku;
					var skuSvipCurrent = that.team_type == 1 ? sku_svip_team_price : sku_svip_price;
					var skuCurrent = sku_price;
					that.setData({
						choosed_sku: choosed_sku,
						sku_price: sku_price,
						sku_svip_price: sku_svip_price,
						skuSvipCurrent: parseFloat(skuSvipCurrent),
						skuCurrent: parseFloat(skuCurrent),
						skuImages: that.skuImages
					});
				}

				that.setAttrsClass();
			},
			//SKU选择
			attrValueselest: function(e) {
				var that = this;
				var product = this.itemData;
				if (!product) return;
				var property = e.currentTarget.dataset.property;
				var attr = e.currentTarget.dataset.attr;

				if (attr.is_multiselect) {
					var attrs = [].concat(this.optionalAttrs);
					var index = attrs.indexOf(attr.id);

					if (-1 == index) {
						attrs.push(attr.id);
					} else {
						attrs.splice(index, 1);
					}

					this.setData({
						optionalAttrs: attrs
					});
				} else {
					var inStock = false;

					for (var i in product.stock) {
						if (product.stock[i].is_enough != true) {
							continue;
						}

						if (product.stock[i].key.indexOf(String(attr.id)) >= 0) {
							inStock = true;
							break;
						}
					}

					if (!inStock) {
						common.toast('库存不足');
						return;
					}

					var stock = null;
					var attrs = [].concat(this.currentAttrs);
					var index = attrs.indexOf(attr.id);

					if (-1 == index) {
						attrs.push(attr.id);
					} else {
						attrs.splice(index, 1);
					}

					for (var i in property.attrs) {
						if (property.attrs[i].id != attr.id) {
							var index = attrs.indexOf(property.attrs[i].id);

							if (-1 != index) {
								attrs.splice(index, 1);
							}
						}
					}

					attrs = attrs.filter(function(attr, index, self) {
						return self.indexOf(attr) === index;
					});
					attrs.sort(function(a, b) {
						return a - b;
					});

					if (attrs.length) {
						var key = attrs.join('_');

						for (var i = 0; i < product.stock.length; ++i) {
							var _goods_attr = product.stock[i].key.split('_');

							_goods_attr.sort(function(a, b) {
								return a - b;
							});

							_goods_attr = _goods_attr.join('_');

							if (_goods_attr == key) {
								stock = product.stock[i];
								break;
							}
						}
					}

					if (stock && stock.is_enough) {
						this.currentStock = stock, this.currentAttrs = attrs, this.setData({
							buynum: product.min_buy_amount
						});
					} else {
						if (attrs.length < product.properties.length) {
							this.currentStock = null, this.currentAttrs = attrs, this.setData({
								buynum: product.min_buy_amount
							});
						} else {
							common.toast('库存不足');
						}
					}

					this.setData({
						canPurchase: this.checkCanPurchase()
					});
				}

				this.set_choosed_sku();
			},
			//设置每一个attr的class
			setAttrsClass: function() {
				var product = this.itemData;
				var property = product.properties;

				for (var i in property) {
					var attrs = property[i].attrs;

					for (var j in attrs) {
						var attr = attrs[j];

						if (!product) {
							attr.class = 'disable';
							continue;
						}

						if (product.is_goods_number == 0) {
							attr.class = 'disable';
							continue;
						}

						var attrArr = [];

						if (attr.is_multiselect) {
							attr.class = this.optionalAttrs.indexOf(attr.id) == -1 ? '' : 'active';
						} else {
							attr.class = this.currentAttrs.indexOf(attr.id) == -1 ? '' : 'active';
							var inStock = false;

							for (var i in product.stock) {
								if (product.stock[i].is_enough != true) {
									var currentAyyrsJn = this.currentAttrs.join("_");

									if (product.stock[i].key.indexOf(String(currentAyyrsJn)) >= 0 && this.currentAttrs.length > 0) {
										var stockDisplyKey = product.stock[i].key.split("_");

										for (var j in stockDisplyKey) {
											if (stockDisplyKey[j] != this.currentAttrs) {
												for (var k in product.properties) {
													for (var s in product.properties[k].attrs) {
														if (product.properties[k].attrs[s].id == stockDisplyKey[j]) {
															product.properties[k].attrs[s].class = 'disable';
														}
													}
												}
											}
										}
									} else {
										continue;
									}
								}

								if (product.stock[i].key.indexOf(String(attr.id)) >= 0) {
									inStock = true;
									break;
								}
							}

							if (!inStock) {
								attr.class += 'disable';
							}
						}
					}
				}

				this.setData({
					itemData: product
				});
			},
			// 收藏
			addFavorites: function(e) {
				var that = this;
				var islike = that.isLike;
				var productid = that.productId;
				var uri = app.getPath.goodsLike;
				var unuri = app.getPath.goodsUnlike;
				var data = {
					goods_id: productid
				};
				var undata = {
					goods_id: productid
				};

				if (!islike) {
					common.ApiGateWayTest(uri, data, true, function(res) {
						if (res.statusCode == 200) {
							var res = res.data.result;
							that.setData({
								isLike: !islike
							});
							common.toast("收藏成功");
						}
					});
				} else {
					common.ApiGateWayTest(unuri, undata, true, function(res) {
						if (res.statusCode == 200) {
							var res = res.data.result;
							that.setData({
								isLike: !islike
							});
							common.toast("取消收藏");
						}
					});
				}
			},
			//验证是否可以购买
			checkCanPurchase: function() {
				var product = this.itemData;
				var required = false;

				if (product.pre_info && product.pre_info.is_pre == 1) {
					this.setData({
						sumbitName: product.pre_info.pre_time
					});
					return false;
				}

				if (!product || product.is_enough == 0) {
					this.setData({
						sumbitName: '抱歉，商品已售罄'
					});
					return false;
				}

				if (product.is_on_sale == 0) {
					this.setData({
						sumbitName: '抱歉，商品已下架'
					});
					return false;
				}

				if (this.currentAttrs.length >= product.properties.length) {
					for (var i in product.properties) {
						if (!product.properties[i].is_multiselect) {
							required = true;
							break;
						}
					}

					if (required) {
						if (!this.currentAttrs || !this.currentAttrs.length) {
							return false;
						}

						if (!this.currentStock) {
							return false;
						}
					}
				}

				this.setData({
					sumbitName: '立即购买'
				});
				return true;
			},
			// SKU价格和非VIP价格是否相同
			isPriceEqualFun: function() {
				var that = this;

				if (that.itemData.price && that.itemData.current_price) {
					var price = that.itemData.price + that.sku_price,
						svip_price = that.itemData.current_price + that.sku_svip_price;

					if (price == svip_price) {
						that.setData({
							isPriceEqual: true
						});
					} else {
						that.setData({
							isPriceEqual: false
						});
					}
				} else {
					that.setData({
						isPriceEqual: false
					});
				}
			},
			// 加减
			changeNum: function(e) {
				var that = this;
				common.formIdUpdate(e);
				var product = that.itemData;
				var invurl = app.getPath.skuEnough;

				if (product.pre_info && product.pre_info.is_pre == 1) {
					invurl = app.getPath.skuEnough;
				}

				var product_id = '';

				for (var i in product.stock) {
					var stock = product.stock[i].key;
					stock = stock.split('_');
					stock.sort(function(a, b) {
						return a - b;
					});
					stock = stock.join('_');
					var attrs = that.currentAttrs.join('_');

					if (attrs == stock) {
						product_id = product.stock[i].key;
						break;
					}
				}

				if (that.currentAttrs.length == product.properties.length) {
					// alpha-beta 0  减
					if (e.currentTarget.dataset.alphaBeta == 0) {
						if (!that.checkCanPurchase()) return; // Lin start

						if (that.buynum <= that.itemData.min_buy_amount) {
							common.toast('不能小于最小购买数量');
							return;
						} // Lin end


						if (that.buynum <= 1) { // buynum: 1
						} else if (that.buynum === 2) {
							that.setData({
								buynum: that.buynum - 1,
								undel: true
							});
						} else {
							that.setData({
								buynum: that.buynum - 1
							});
						} // 验证库存


						if (that.buynum != 1) {
							var invdata = {
								goods_id: product.goods_id,
								sku_key: product_id,
								amount: that.buynum
							};
							common.ApiGateWayTest(invurl, invdata, true, function(ret) {
								if (!ret) return;

								if (ret.data.result.is_enough != 1) {
									common.toast(ret.data.result.msg);
									return;
								}
							});
						}
					} else {
						// alpha-beta 1  加      max_buy_amount==0不限制数量
						// Lin start
						if (that.itemData.max_buy_amount != 0 && that.buynum >= that.itemData.max_buy_amount) {
							common.toast('不能在多啦~');
							return;
						} // Lin end


						that.setData({
							buynum: that.buynum + 1,
							undel: false
						});

						if (that.buynum > 1) {
							var invdata = {
								goods_id: product.goods_id,
								sku_key: product_id,
								amount: that.buynum
							};
							common.ApiGateWayTest(invurl, invdata, true, function(ret) {
								if (!ret) return;

								if (ret.data.result.is_enough != 1) {
									common.toast(ret.data.result.msg);
									that.setData({
										buynum: that.buynum - 1
									});
									that.set_choosed_sku();
									return;
								}
							});
						}
					}

					that.confirmData.num = that.buynum;
				} else {
					if (that.showSKUstatus == 0) {
						that.setModalStatus();
					} else {
						common.toast('请选择商品款式');
					}
				}

				that.set_choosed_sku();
			},
			//
			goRegister: function() {
				// 未登录跳转
				var isOldUser = common.getStorageSync('isOldUser');

				if (!app.checkSessionKey || isOldUser == 2) {
					common.goRegister();
					return false;
				}
			},
			// 是否购物车有新人商品
			isnewpersongoods: function(goods_id, product_id) {
				var uri = app.getPath.isnewpersongoods;
				var data = {
					goods_id: goods_id,
					sku_key: product_id
				};
				return new Promise(function(resolve, reject) {
					common.ApiGateWayTest(uri, data, true, function(res) {
						var data = res.data;

						if (data.success == 1) {
							var result = data.result.result;
							resolve(result);
						}
					});
				});
			},
			//添加到购物车
			addShopCart: function(e) {
				console.log('点击加入购物车按钮');
				// 未登录跳转
				var isOldUser = common.getStorageSync('isOldUser');

				if (!app.checkSessionKey || isOldUser == 2) {
					common.goRegister();
					return false;
				}

				if (!this.checkCanPurchase()) return;
				var that = this;
				var product = this.itemData;
				var type = e.currentTarget.dataset.type;

				if (type == 'addcart' && that.currentAttrs.length == product.properties.length) {
					// 验证库存
					var product_id = '';

					for (var i in product.stock) {
						var stock = product.stock[i].key;
						stock = stock.split('_');
						stock.sort(function(a, b) {
							return a - b;
						});
						stock = stock.join('_');
						var attrs = that.currentAttrs.join('_');

						if (attrs == stock) {
							product_id = product.stock[i].key;
							break;
						}
					}

					var invurl = '';
					that.isnewpersongoods(product.goods_id, product_id).then(function(res) {
						if (res) {
							invurl = app.getPath.addCartnew;
							common.showModal('是否替换新人商品', '确定', function(res) {
								if (res.confirm) {
									_addcart();
								}
							});
						} else {
							invurl = app.getPath.addCart;

							_addcart();
						}
					}); // 加入购物车

					function _addcart() {
						// if (product.pre_info && product.pre_info.is_pre == 1) {
						//   invurl = app.getPath.addCart;
						// }
						var invdata = {
							goods_id: product.goods_id,
							sku_key: product_id,
							amount: that.buynum
						};
						// app.aldstat.sendEvent("加入购物车", {
						//   "商品名称": that.itemData.report.goods_name,
						//   "用户名": that.itemData.report.nick_name
						// });
						common.formIdUpdate(e);

						if (that.stopCartBtn == false) {
							that.stopCartBtn = true;
							common.ApiGateWayTest(invurl, invdata, true, function(ret) {
								if (!ret) return;

								if (ret.data.success != 0) {
									that.setData({
										cartAmount: ret.data.result.cart_num
									});
									common.toast(ret.data.msg);
									that.setData({
										showfwModalStatus: false,
										showShareModalStatus: false,
										showBonusModal: false,
										showModalStatus: false
									});
									that.showSKUstatus = 0;
									that.stopCartBtn = false;
								} else {
									common.toast(ret.data.msg);
									return;
								}
							});
						}
					}
				} else {
					if (type != 'addcart' || that.showSKUstatus == 0) {
						that.setModalStatus(type);
						that.setData({
							showfwModalStatus: false,
							showShareModalStatus: false,
							showBonusModal: false
						});
					} else {
						common.toast('请选择商品款式');
					}
				}
			},
			// 立即购买
			nowPurchase: function(e) {
				console.log('点击立即购买按钮');
				// 未登录跳转
				var isOldUser = common.getStorageSync('isOldUser');
				console.log(app.checkSessionKey)
				if (!app.checkSessionKey || isOldUser == 2) {
					common.goRegister();
					console.log('登录')
					return false;
				}

				if (!this.checkCanPurchase()) return;
				var that = this;
				var atitude = ''; //设置sku确认按钮为立即购买

				this.setData({
					team_type: 0
				});

				if (that.itemData.shop_type == 1) {
					that.setzjModalStatus(e);
					return;
				}

				var product = that.itemData;
				// console.log('that.currentAttrs.length',that.currentAttrs.length)
				// console.log('product.properties.length',product.properties.length)
				// console.log('product.max_buy_amount',product.max_buy_amount)
				that.team_sku_type = 1
				console.log('that.team_sku_type',that.team_sku_type)
				if (that.currentAttrs.length == product.properties.length && product.max_buy_amount < 2 || that.team_sku_type == 1 &&
					that.currentAttrs.length == product.properties.length) {
						console.log('点击购买按钮')
					// 验证库存
					var product_id = '';

					for (var i in product.stock) {
						var stock = product.stock[i].key;
						stock = stock.split('_');
						stock.sort(function(a, b) {
							return a - b;
						});
						stock = stock.join('_');
						var attrs = that.currentAttrs.join('_');

						if (attrs == stock) {
							product_id = product.stock[i].key;
							break;
						}
					}

					var invurl = app.getPath.skuEnough;

					if (product.pre_info && product.pre_info.is_pre == 1) {
						invurl = app.getPath.skuEnough;
					}

					var invdata = {
						goods_id: product.goods_id,
						sku_key: product_id,
						amount: that.buynum
					};
					// app.aldstat.sendEvent("立即购买", {
					//   "商品名称": that.itemData.report.goods_name,
					//   "用户名": that.itemData.report.nick_name
					// });
					common.formIdUpdate(e);
					common.showLoad(this);
					common.ApiGateWayTest(invurl, invdata, true, function(ret) {
						if (!ret) return;

						if (ret.data.result.is_enough != 1) {
							common.hideLoad(that);
							common.toast(ret.data.result.msg);
							return;
						} else {
							next(e);
						}
					});
				} else {
					if (that.showSKUstatus == 0) {
						that.setModalStatus();
						that.team_sku_type = 1;
						console.log('team_sku_type改变')
						that.setData({
							showfwModalStatus: false,
							showShareModalStatus: false,
							showBonusModal: false
						});
					} else {
						common.toast('请选择商品款式0');
					}
				}

				function next() {
					var checkOrderUri = app.getPath.preCheckOrder;
					var orderProduct = [{
						goods_id: that.confirmData[0].goods_id,
						sku_key: that.confirmData[0].sku_key,
						num: that.confirmData[0].amount
					}];
					orderProduct = JSON.stringify(orderProduct);
					var checkOrderData = {
						order_product: orderProduct,
						team_order: 0,
						time_atitude: app.dataBase.userAtitude
					};
					common.ApiGateWayTest(checkOrderUri, checkOrderData, true, function(resData) {
						common.hideLoad(that);

						if (resData.data.success == 1) {
							that.confirmData[0]['team_order'] = 0;
							that.confirmData[0]['channel'] = that.itemData.is_team; // 立即购买的缓存

							common.setStorage({
								key: "nowPay",
								data: that.confirmData
							});
							uni.navigateTo({
								url: '/pages/confirm/confirm'
							});
						} else {
							common.toast(resData.data.msg);
							return;
						}
					});
				}
			},
			// 一键开团
			delegation: function(e) {
				// 未登录跳转
				var isOldUser = common.getStorageSync('isOldUser');

				if (!app.checkSessionKey || isOldUser == 2) {
					common.goRegister();
					return false;
				}

				if (!this.checkCanPurchase()) return;
				var that = this;

				if (that.itemData.shop_type == 1) {
					that.setzjModalStatus(e);
					return;
				} //设置sku确认按钮为一键开团


				this.setData({
					team_type: 1
				});
				var product = that.itemData;

				if (that.currentAttrs.length == product.properties.length && product.max_buy_amount < 2 || that.team_sku_type == 1 &&
					that.currentAttrs.length == product.properties.length) {
					// 验证库存
					var product_id = '';

					for (var i in product.stock) {
						var stock = product.stock[i].key;
						stock = stock.split('_');
						stock.sort(function(a, b) {
							return a - b;
						});
						stock = stock.join('_');
						var attrs = that.currentAttrs.join('_');

						if (attrs == stock) {
							product_id = product.stock[i].key;
							break;
						}
					}

					var invurl = app.getPath.skuEnough;

					if (product.pre_info && product.pre_info.is_pre == 1) {
						invurl = app.getPath.skuEnough;
					}

					var invdata = {
						goods_id: product.goods_id,
						sku_key: product_id,
						amount: that.buynum
					};
					// app.aldstat.sendEvent("立即购买", {
					//   "商品名称": that.itemData.report.goods_name,
					//   "用户名": that.itemData.report.nick_name
					// });
					common.formIdUpdate(e);
					common.showLoad(this);
					common.ApiGateWayTest(invurl, invdata, true, function(ret) {
						if (!ret) return;

						if (ret.data.result.is_enough != 1) {
							common.hideLoad(that);
							common.toast(ret.data.result.msg);
							return;
						} else {
							// showSKUstatus 0关闭  1展开  重置为关闭
							that.setData({
								showModalStatus: false,
								showSKUstatus: 0
							});
							next(e);
						}
					});
				} else {
					if (that.showSKUstatus == 0) {
						that.setModalStatus();
						that.team_sku_type = 1;
						that.setData({
							showfwModalStatus: false,
							showShareModalStatus: false,
							showBonusModal: false,
							skuSvipCurrent: product.stock[0].team_price
						});
					} else {
						common.toast('请选择商品款式');
					}
				}

				function next() {
					var checkOrderUri = app.getPath.preCheckOrder;
					var orderProduct = [{
						goods_id: that.confirmData[0].goods_id,
						sku_key: that.confirmData[0].sku_key,
						num: that.confirmData[0].amount
					}];
					orderProduct = JSON.stringify(orderProduct);
					var checkOrderData = {
						order_product: orderProduct,
						team_order: 1,
						team_id: that.itemData.team_id,
						time_atitude: app.dataBase.userAtitude
					};
					common.ApiGateWayTest(checkOrderUri, checkOrderData, true, function(resData) {
						common.hideLoad(that);

						if (resData.data.success == 1) {
							that.confirmData[0]['team_order'] = 1;
							that.confirmData[0]['team_id'] = that.itemData.team_id; // 立即购买的缓存

							common.setStorage({
								key: "nowPay",
								data: that.confirmData
							});
							wx.navigateTo({
								url: '/pages/confirm/confirm'
							});
						} else {
							common.toast(resData.data.msg);
							return;
						}
					});
				}
			},
			// 加载为你推荐
			sameCategoryGoods: function() {
				var that = this;
				var scgurl = app.getPath.sameCategoryGoods;
				var data = {
					goods_id: that.productId,
					page_size: 10
				};
				common.ApiGateWayTest(scgurl, data, true, function(res) {
					var res = res.data.result;
					that.setData({
						scgGoodsList: res.products
					});
				});
			},
			// //获取评论信息
			// getCommentlist: function () {
			//   var that = this;
			//   var url = "/Api/api.product.commentList";
			//   var productID = parseInt(that.data.productId);
			//   var data = { product: productID };
			//   common.ApiGateWayTest(url, data, function (res) {
			//     that.setData({
			//       comment: res.data,
			//     });
			//     that.addCommentClass();
			//   });
			// },
			// // 评论图
			// setCommentImage: function (e) {
			//   var that = this;
			//   var commentList = that.data.comment.comment_info;
			//   var current = e.currentTarget.dataset.current;
			//   var imgUrl = [];
			//   for (var i = 0; commentList.length > i; i++) {
			//     for (var j = 0; commentList[i].imgInfo.length > j; j++) {
			//       imgUrl.push(commentList[i].imgInfo[j].img);
			//     }
			//   }
			//   wx.previewImage({
			//     current: current,
			//     urls: imgUrl,
			//   })
			// },
			// setAgainImage: function (e) {
			//   var that = this;
			//   var commentList = that.data.comment.comment_info;
			//   var current = e.currentTarget.dataset.current;
			//   var imgUrl = [];
			//   for (var i = 0; commentList.length > i; i++) {
			//     for (var j = 0; commentList[i].again_info.imgInfo.length > j; j++) {
			//       imgUrl.push(commentList[i].again_info.imgInfo[j].img);
			//     }
			//   }
			//   wx.previewImage({
			//     current: current,
			//     urls: imgUrl,
			//   })
			// },
			// // add the last comment a class
			// addCommentClass: function () {
			//   var comm = this.data.comment;
			//   if (comm.comment_info && comm.comment_info.length > 0) {
			//     var length = comm.comment_info.length;
			//     var commInfo = comm.comment_info;
			//     commInfo[length - 1].class = true;
			//     for (var i = 0; i < length; i++) {
			//       if (commInfo[i].content.length > 248) {
			//         commInfo[i].words = true;
			//         commInfo[i].wordsCut = true;
			//       }
			//       else {
			//         commInfo[i].words = false;
			//         commInfo[i].wordsCut = false;
			//       }
			//     }
			//   }
			//   this.setData({
			//     comment: comm,
			//   });
			// },
			// limitWord: function (e) {
			//   var iscut = e.currentTarget.dataset.iscut;
			//   var infoidx = e.currentTarget.dataset.listnum;
			//   this.data.comment[infoidx].wordsCut = !iscut;
			//   if (iscut) {
			//     this.setData({
			//       comment: this.data.comment,
			//       limitWords: "收起"
			//     });
			//   }
			//   else {
			//     this.setData({
			//       comment: this.data.comment,
			//       limitWords: "展开"
			//     });
			//   }
			// },
			//获取为你推荐
			// getGoodsRecommend: function () {
			//   var that = this;
			//   var url = "/Api/api.product.goodsRecList";
			//   var productID = parseInt(that.data.productId);
			//   var cateID = parseInt(that.data.itemData.category);
			//   var data = {
			//     goods_id: that.data.productId,
			//     cat_id: cateID,
			//   };
			//   common.ApiGateWayTest(url, data, function (res) {
			//     if (res) {
			//       var list = [];
			//       var lists = [];
			//       var shoplist = res.goodsRecommend;
			//       for (var i in shoplist) {
			//         list.push(shoplist[i]);
			//         if (i % 2 == 1) {
			//           lists.push(list)
			//           list = [];
			//         }
			//       }
			//       if (list.length > 0) {
			//         lists.push(list)
			//       }
			//       that.setData({
			//         shopList: lists,
			//       });
			//     }
			//   });
			// },
			// 分享后发送优惠券
			// sendShareGift: function () {
			//   var that = this;
			//   var url = "/Api/api.cashgift.giveShippingBounsMore";
			//   var openid = app.globalData.userInfo && app.globalData.userInfo.openid ? app.globalData.userInfo.openid : 0;
			//   var data = {
			//     openid: openid,
			//   };
			//   common.ApiGateWayTest(url, data, function (res) {
			//     that.setData({
			//       isshare: 1,
			//       isShowbox: 1,
			//     });
			//     console.log("优惠券接口调用成功");
			//   });
			// },
			// 分享后弹窗WX指示图
			shareTo: function() {
				this.setData({
					isShowModeWx: 1
				}); // this.onShareAppMessage();
			},
			clossShare: function() {
				this.setData({
					isShowModeWx: 0
				});
			},
			//
			closeShareWx: function() {
				this.setData({
					isShowModeWx: 0
				});
			},
			closeShareBox: function() {
				this.setData({
					isShowbox: 0
				});
			},
			closeShareShowSku: function() {
				this.setData({
					isShowbox: 0
				});
				this.setModalStatus();
			},
			//移动超出显示返回顶部按钮
			onPageScroll: function(e) {
				var that = this;

				if (that.navbarOpacity < 1 && e.scrollTop > 100) {
					that.setData({
						navbarOpacity: e.scrollTop / 500
					});
				} else if (that.navbarOpacity > 0 && e.scrollTop < 200) {
					that.setData({
						navbarOpacity: e.scrollTop / 500
					});
				}

				if (e.scrollTop > 300) {
					that.setData({
						showBackTop: true
					});
				} else {
					that.setData({
						showBackTop: false
					});
				}
			},
			gotoPagetop: function() {
				wx.pageScrollTo({
					scrollTop: 0
				});
			},

			/* bar滚动 */
			productGoSP: function() {
				this.setData({
					scrollTop: 0
				});
			},
			productGoPJ: function() {
				this.setData({
					scrollBar: "comment" //currentLocation: 2,

				});
				var that = this;
				setTimeout(function() {
					that.setData({
						currentLocation: 2
					});
				}, 400);
			},
			productGoXQ: function() {
				this.setData({
					scrollBar: "content" //currentLocation: 3,

				});
				var that = this;
				setTimeout(function() {
					that.setData({
						currentLocation: 3
					});
				}, 400);
			},
			openSvip: function() {
				app.dataBase.pageUrl =
					'http://mc.vip.qq.com/qqwallet/index?_wv=3&aid=mios.p.a.em_spxqy&ADTAG=vipmall&type=!svip&month=1';
				common.goWebview();
			},
			// 返回首页
			gotoHome: function(e) {
				common.formIdUpdate(e);
				wx.switchTab({
					url: '/pages/index/index'
				});
			},
			goBonusPage: function() {
				this.setData({
					isShowbox: 0
				});
				wx.navigateTo({
					url: '../rituall/rituall'
				});
			},
			//获取系统信息
			initNavHeight: function() {
				var that = this;
				wx.getSystemInfo({
					success: function(res) {
						that.setData({
							winWidth: res.windowWidth,
							winHeight: res.windowHeight
						});
					}
				});
			},
			bannerClosed: function() {
				this.setData({
					bannerApp: false
				});
			},
			// 跳转购物车
			goToCart: function(e) {
				common.formIdUpdate(e);
				wx.switchTab({
					url: '../cart/cart'
				});
			},
			productGoProduct: function(e) {
				var id = e.currentTarget.dataset.id;
				wx.navigateTo({
					url: '../product/product?productId=' + id
				});
			},
			productGoTheme: function(e) {
				var brand_id = e.currentTarget.dataset.brand;
				wx.navigateTo({
					url: '../listdetail/listdetail?cat_id=&title=&brand_id=' + brand_id
				});
			},
			productGoComment: function(e) {
				var productId = e.currentTarget.dataset.productid;
				wx.navigateTo({
					url: '../comment/comment?productId=' + productId
				});
			},
			aldminishare: function(e) {
				var that = this;
				var pickup = common.getStorageSync('getpickup');
				var url = 'pages/product/product?productId=' + that.itemData.goods_id + '&entryType=external&pickup_id=' + pickup.pickup_id;
				var data = {};
				data = e.currentTarget.dataset;
				data['path'] = url;
				wx.showToast({
					title: '分享生成中...',
					icon: 'loading'
				});
				wx.request({
					method: 'post',
					url: 'https://shareapi.aldwx.com/Main/action/Template/Template/applet_htmlpng',
					data: data,
					success: function(data) {
						if (data.data.code === 200) {
							wx.previewImage({
								urls: [data.data.data]
							});
						}

						that.clossShare(); // 关闭loading

						common.hideLoad(that);
					},
					complete: function() {
						common.hideLoad(that);
					},
					fail: function() {
						common.hideLoad(that);
					}
				});
			},
			// 分享图片
			closeSharePic: function() {
				this.setData({
					isShowSharePic: false
				});
			},
			drawPic: function() {
				let that = this;
				that.clossShare();
				common.showLoad(this); // let AcodePic = null;

				var productShareimg = "";
				var codePicImage = "";
				var drawImageUrl = ""; // let promise1 = new Promise(function (resolve, reject) {
				//   /* 获得要在画布上绘制的图片 */
				//   wx.getImageInfo({
				//     src: that.data.iconURL + "/product-share-card.png",
				//     success(res) {
				//       drawImageUrl = res.path;
				//       console.log("drawImageUrl", drawImageUrl)
				//       resolve(res);
				//     }
				//   })
				// });

				let promise2 = new Promise(function(resolve, reject) {
					/* 获得要在画布上绘制的图片 */
					// wx.downloadFile({
					//   url: that.data.skuImages, // 仅为示例，并非真实的资源
					//   success(res) {
					//     // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
					//     if (res.statusCode === 200) {
					//       productShareimg = res.tempFilePath;
					//       resolve(res);
					//     } else {
					//       wx.showToast({
					//         title: '网络繁忙，无法生成分享图',
					//         icon: 'none'
					//       })
					//       reject();
					//     }
					//   },
					//   fail(res) {
					//     wx.showToast({
					//       title: '下载接口没跑通',
					//       icon: 'none'
					//     })
					//     reject();
					//   }
					// })
					wx.getImageInfo({
						src: that.skuImages,

						success(res) {
							productShareimg = res.path;
							resolve(res);
						},

						fail(res) {
							wx.showToast({
								title: '网络繁忙，无法生成分享图',
								icon: 'none'
							});
							reject();
						}

					});
				});
				var pickup = common.getStorageSync('getpickup');
				let promise3 = new Promise(function(resolve, reject) {
					wx.request({
						//正式服
						url: 'https://wx.shop.haoyousheng.com.cn/v1/goods/getWXACodeUnlimit',
						//测试服
						// url: 'https://api-t.st-llshop.surex.cn/v1/goods/getWXACodeUnlimit',
						method: 'post',
						responseType: 'arraybuffer',
						//这一行非常重要，重中之重
						data: {
							secene: that.productId + '&' + pickup.pickup_id,
							page: "pages/product/product",
							application: 'goodBuy'
						},
						success: function(res) {
							// var base64 = wx.arrayBufferToBase64(res.data);
							// let AcodePic = "data:image/PNG;base64," + base64;
							// console.log("二维码获取临时地址")
							// wx.getImageInfo({
							//   src: base64,
							//   success(res) {
							//     codePicImage = res.path;
							//     console.log("codePicImage", codePicImage)
							//     resolve(res);
							//   }
							// })
							var timestamp = Date.parse(new Date());
							const filePath = `${wx.env.USER_DATA_PATH}/${'erweima' + timestamp}.${'jpg'}`;
							wx.getFileSystemManager().writeFile({
								filePath,
								data: res.data,
								encoding: 'binary',

								success() {
									codePicImage = filePath;
									resolve(filePath);
								},

								fail() {
									reject(new Error('ERROR_BASE64SRC_WRITE'));
								}

							});
						},
						fail: function(res) {
							reject();
						}
					});
				});
				/* 图片获取成功才执行后续代码 */

				Promise.all([promise2, promise3]).then(res => {
					/* 创建 canvas 画布 */
					const ctx = wx.createCanvasContext('shareImg'); // 填充背景色

					ctx.rect(0, 0, 283, 480);
					ctx.setFillStyle('#FFFFFF');
					ctx.fill(); // 背景上画圆

					ctx.beginPath();
					ctx.arc(142, -39, 185, 0, 2 * Math.PI);
					ctx.setFillStyle('#ffe150');
					ctx.fill(); // 圆角矩形加阴影

					let rec_x = 35,
						rec_y = 36,
						rec_r = 10,
						rec_w = 220,
						rec_h = 290;
					ctx.beginPath();
					ctx.moveTo(rec_x + rec_r, rec_y);
					ctx.arcTo(rec_x + rec_w, rec_y, rec_x + rec_w, rec_y + rec_h, rec_r);
					ctx.arcTo(rec_x + rec_w, rec_y + rec_h, rec_x, rec_y + rec_h, rec_r);
					ctx.arcTo(rec_x, rec_y + rec_h, rec_x, rec_y, rec_r);
					ctx.arcTo(rec_x, rec_y, rec_x + rec_w, rec_y, rec_r);
					ctx.setFillStyle('#FFFFFF');
					ctx.setShadow(0, 0, 15, '#DDDDDD');
					ctx.fill();
					ctx.setShadow(0, 0, 0, '#ffffff'); // 圆角矩形TAG

					let draw_x = 95,
						draw_y = 275,
						draw_r = 2,
						draw_w = 40,
						draw_h = 16;
					ctx.beginPath();
					ctx.moveTo(draw_x + draw_r, draw_y);
					ctx.arcTo(draw_x + draw_w, draw_y, draw_x + draw_w, draw_y + draw_h, draw_r);
					ctx.arcTo(draw_x + draw_w, draw_y + draw_h, draw_x, draw_y + draw_h, draw_r);
					ctx.arcTo(draw_x, draw_y + draw_h, draw_x, draw_y, draw_r);
					ctx.arcTo(draw_x, draw_y, draw_x + draw_w, draw_y, draw_r);
					ctx.setStrokeStyle('red');
					ctx.closePath();
					ctx.stroke();
					/* 绘制图像到画布  图片的位置你自己计算好就行 参数的含义看文档 */

					/* ps: 网络图片的话 就不用加../../路径了 反正我这里路径得加 */
					// ctx.setGlobalAlpha(0.1)
					// ctx.drawImage(that.data.bannerItem[0].src, -109, -109, 600, 600)
					// ctx.setGlobalAlpha(1)
					// ctx.drawImage(drawImageUrl, 31, 36, 222, 300);

					ctx.drawImage(productShareimg, 66, 71, 150, 150);
					ctx.drawImage(codePicImage, 101, 340, 80, 80);
					/* 绘制文字 位置自己计算 参数自己看文档 */

					ctx.setTextAlign('center'); //  位置

					ctx.setFillStyle('#555555'); //  颜色

					ctx.setFontSize(14); //  字号

					if (that.itemData.goods_name.length > 12) {
						ctx.fillText(that.itemData.goods_name.slice(0, 12), 283 / 2, 245); //  内容  不会自己换行 需手动换行

						ctx.fillText(that.itemData.goods_name.slice(12, 24), 283 / 2, 265); //  内容
					} else {
						ctx.fillText(that.itemData.goods_name, 283 / 2, 245); //  内容  不会自己换行 需手动换行
					} // 圆角矩形内容


					ctx.setTextAlign('center'); //  位置

					ctx.setFillStyle('red'); //  颜色

					ctx.setFontSize(10); //  字号

					ctx.fillText('抢购价', 115, 287); //  内容
					// 价格

					ctx.setTextAlign('center'); //  位置

					ctx.setFillStyle('red'); //  颜色

					ctx.setFontSize(14); //  字号

					ctx.fillText('¥' + that.skuSvipCurrent, 165, 289); //  内容
					// 底部提示

					ctx.setTextAlign('center'); //  位置

					ctx.setFillStyle('#555555'); //  颜色

					ctx.setFontSize(11); //  字号

					ctx.fillText('长按图片识别小程序码', 283 / 2, 445); //  内容

					ctx.setTextAlign('center'); //  位置

					ctx.setFillStyle('#AAAAAA'); //  颜色

					ctx.setFontSize(9); //  字号

					ctx.fillText('*实际价格以页面展示为准', 283 / 2, 460); //  内容
					// 原价

					ctx.setTextAlign('center'); //  位置

					ctx.setFillStyle('#AAAAAA'); //  颜色

					ctx.setFontSize(12); //  字号

					ctx.fillText('原价 ¥' + that.skuCurrent, 283 / 2, 310); //  内容

					ctx.beginPath();
					ctx.moveTo(100, 305);
					ctx.lineTo(183, 305);
					ctx.setStrokeStyle('#AAAAAA');
					ctx.stroke();
					common.hideLoad(that);
					/* 绘制 */

					that.setData({
						isShowSharePic: true
					});
					ctx.stroke();
					ctx.draw(false, () => {
						that.TransformationPic();
					});
				});
			},
			TransformationPic: function() {
				// 生成分享图
				let that = this;
				wx.canvasToTempFilePath({
					x: 0,
					y: 0,
					canvasId: 'shareImg',
					fileType: "jpg",
					quality: 1,

					success(res) {
						console.log("分享图生成成功");
						/* 这里 就可以显示之前写的 预览区域了 把生成的图片url给image的src */

						that.setData({
							preurl: res.tempFilePath
						});
					},

					fail(res) {
						wx.showModal({
							title: '消息提示',
							content: '生成分享图失败,请重试',
							showCancel: false
						});
					}

				});
			},
			saveSharePic: function() {
				let that = this;
				common.showLoad(this);
				wx.saveImageToPhotosAlbum({
					filePath: that.preurl,

					success(res) {
						common.hideLoad(that);
						that.setData({
							isShowSharePic: false,
							preurl: null
						});
						wx.showModal({
							title: '保存成功',
							content: '分享图保存成功',
							showCancel: false
						});
					},

					fail(res) {
						common.hideLoad(that);

						if (res.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
							wx.showModal({
								title: '提示',
								content: '未获取相册授权，是否获取',

								success(res) {
									if (res.confirm) {
										wx.openSetting({
											success(settingdata) {
												if (settingdata.authSetting['scope.writePhotosAlbum']) {
													that.saveSharePic();
												} else {
													wx.showToast({
														title: "拒绝授权将无法保存图片",
														icon: 'none',
														duration: 1500
													});
												}
											}

										});
									} else if (res.cancel) {
										wx.showToast({
											title: "拒绝授权将无法保存图片",
											icon: 'none',
											duration: 1500
										});
									}
								}

							});
						}
					}

				});
			},
			setzjModalStatus: function(e) {
				console.log(e);
				var animation = wx.createAnimation({
					duration: 250,
					timingFunction: "linear",
					delay: 0
				});
				animation.translateY(368).opacity(1).step();
				this.setData({
					animationData: animation.export()
				});
				this.setData({
					showzjModalStatus: true
				});
				setTimeout(function() {
					animation.translateY('-150px').translateX('-50%').step();
					this.setData({
						animationData: animation
					});

					if (e.currentTarget.dataset.status == 0) {
						this.setData({
							showzjModalStatus: false
						});
					}
				}.bind(this), 200);
			},
			// 切换租机 方案详情
			rentToggle: function(e) {
				let status = e.currentTarget.dataset.status;

				if (status != this.rentToggleStatus) {
					console.log(status);
					this.setData({
						rentToggleStatus: status
					});
				}
			},
			// 跳转任选活动
			to_activity: function(e) {
				let id = e.currentTarget.dataset.activity_id;
				wx.navigateTo({
					url: '../../packageA/select/select?entryType=external&id=' + id
				});
			},
			// 取消设置弹窗
			settingModalStatus: function() {
				this.setData({
					showSettingModalStatus: false
				});
			},
			// 拼团次数
			teamLabel2: function() {
				var that = this;
				var uri = app.getPath.teamLabel;
				var data = {
					team_id: that.itemData.team_id
				};
				common.ApiGateWayTest(uri, data, true, function(res) {
					if (res.data.success == 1) {
						that.setData({
							teamLabel: res.data.result.data
						});
						var nowtime = new Date().getTime() / 1000;

						if (that.teamLabel.start_time > nowtime || that.teamLabel.end_time > nowtime) {
							that.setData({
								showCountDown: true
							});

							if (that.teamLabel.status === 2) {
								that.countDown(that.teamLabel.start_time);
							} else if (that.teamLabel.status === 1) {
								that.countDown(that.teamLabel.end_time);
							}
						}
					}
				});
			},

			//获取拼团列表
			getTeamList() {
				var that = this;
				var url = app.getPath.teamList;
				var data = {
					goods_id: this.productId
				};
				common.ApiGateWayTest(url, data, true, function(res) {
					var res = res.data;

					if (res.success == 1) {
						if (res.result.data.length > 2) {
							that.setData({
								teamList: res.result.data.concat(res.result.data),
								team_num: res.result.data.length
							});
							console.log(that.teamList);
						} else {
							that.setData({
								teamList: res.result.data,
								team_num: res.result.data.length
							});
						}
					}
				});
			},

			//跳转拼团列表
			loadTeamList() {
				var that = this;
				wx.navigateTo({
					url: '../../packageA/team-list/team-list?entryType=external&goods_id=' + that.productId
				});
			},

			// 前往设置
			goSetting: function() {
				var that = this;
				wx.openSetting({
					success(res) {
						if (res.authSetting["scope.userLocation"] == true) {
							that.setData({
								showSettingModalStatus: false
							});
						}
					}

				});
			},

			// 切换提醒未提醒
			change_team() {
				let that = this;
				common.showLoad(this);
				let url = app.getPath.remindTeam;
				let data = {
					team_id: that.itemData.team_id,
					is_notice: that.check_remind ? '0' : '1'
				};
				common.ApiGateWayTest(url, data, true, function(res) {
					var res = res.data;

					if (res.success == 1) {
						if (res.result.status == 1) {
							that.setData({
								check_remind: !that.check_remind
							});
							common.toast(res.result.msg);
						} else if (res.result.status == 0) {
							common.toast(res.result.msg);
						} else if (res.result.status == 2) {
							that.setData({
								showPhoneModal: true
							});
						}

						common.hideLoad(that);
					}
				});
			},

			// 抢购提醒
			activeChangeMe(e) {
				var that = this;
				common.formIdUpdate(e);
				let url = app.getPath.fastbuy;
				let data = {
					notice_activity_id: that.itemData.notice_activity_id
				};
				common.ApiGateWayTest(url, data, true, function(res) {
					var resData = res.data;

					if (resData.success == 1) {
						if (resData.result.status == 1) {
							common.toast(resData.result.msg);
							that.setData({
								check_remind_activity: !that.check_remind_activity
							});
							return;
						} else if (resData.result.status == 2) {
							that.setData({
								showPhoneModal: true
							});
						} else {
							common.toast(resData.result.msg);
							return;
						}
					} else {
						common.toast(resData.msg);
						return;
					}
				});
			},

			//  跳转领券中心
			goCouponList() {
				console.log(6666)
				wx.navigateTo({
					url: '../couponCenter/couponCenter?entryType=external'
				});
			},

			// 关闭手机号授权弹窗
			closePhoneModal() {
				this.setData({
					showPhoneModal: false
				});
			},

			// 显示获取手机号授权弹窗
			toShowPhoneModal() {
				this.setData({
					showPhoneModal: true
				});
			},

			// 获取手机号授权
			getPhone: function(e) {
				var that = this;

				if (!(e.detail.encryptedData && e.detail.iv)) {
					return false;
				} // 新用户注册
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
								that.setData({
									showPhoneModal: false
								});
							} else {
								return;
							}
						});
					}
				});
				// #endif
			},
			back: function() {
				wx.navigateBack({
					delta: 1
				});
			},
			backHome: function() {
				wx.switchTab({
					url: '/pages/index/index'
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
	@import "./product.css";
</style>
