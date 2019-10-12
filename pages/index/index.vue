<template>
	<view>
		<!-- <import src="../template/template.wxml" /> -->
		<view class="Advertisement" v-if="showAdver && showPage">
			<!-- 广告弹窗显示 -->
			<view class="AdvertisementAbs">
				<view class="AdimageBox">
					<image mode="widthFix" class="AdvertisementImg" :src="advertisementAd[0].ad_code"></image>
					<form report-submit="true" class="AdvertisementOut-view" @submit="advertisementOut">
						<button class="AdvertisementOut" :data-ad_id="advertisementAd[0].ad_id" :style="'background-image:url(' + iconURL + '/btn-index-closs.png)'"
						 formType="submit"></button>
					</form>
				</view>
				<form report-submit="true" class="reportIndex-view" @submit="goWebView" :data-item="advertisementAd[0]" data-type="1">
					<button class="reportIndex-btn" formType="submit"></button>
				</form>
			</view>
			<!-- 新人红包拆后显示图 -->
			<!-- <view class='AdvertisementAbs'>
    <view class='AdimageBox'>
      <image mode='widthFix' class='AdvertisementImg' src='{{advertisementAd[0].close_img}}'></image>
      <form report-submit='true' class='AdvertisementOut-view' bindsubmit='advertisementOut'>
        <button class='AdvertisementOut' data-ad_id='{{advertisementAd[0].ad_id}}' style="background-image:url({{iconURL}}/btn-index-closs.png)" formType='submit'></button>
      </form>
    </view>
    <image mode='widthFix' class='AdvertisementImg' src='{{advertisementAd[0].close_img}}'></image>
    <scroll-view scroll-y='true' class='coupon-box' wx:if="{{advertisementAd[0].coupon&&showCouponList}}">
      <view class='coupon-wrap' style='background-image:url({{iconURL}}/img_qdhbyhqkp@2x.png)' wx:for="{{advertisementAd[0].coupon}}">
        <view class='left'>
          <text class='price1'>￥</text>
          <text class='price2'>{{item.money}}</text>
        </view>
        <view class='right'>
          <view class='text1 ellipsis'>{{item.name}}</view>
          <view class='text2 ellipsis'>{{item.description}}</view>
          <view class='text2' style='white-space:nowrap;'>{{item.use_start_time}}-{{item.use_end_time}}</view>
        </view>
        <form report-submit='true' bindsubmit='advertisementOut'>
          <button type='warn' class='get_btn t3' data-ad_id='{{advertisementAd[0].ad_id}}' formType='submit'>去使用</button>
        </form>
      </view>
    </scroll-view>
  </view> -->
		</view>
		<!-- 优惠券领取成功后显示 -->
		<view class="Advertisement" v-if="showCouponsSuccess && showPage">
			<view class="AdvertisementAbs">
				<view class="AdimageBox">
					<image mode="widthFix" class="AdvertisementImg" :src="advertisementAd[0].close_img"></image>
					<form report-submit="true" class="AdvertisementOut-view" @submit="advertisementOut">
						<button class="AdvertisementOut" :style="'background-image:url(' + iconURL + '/btn-index-closs.png)'" formType="submit"></button>
					</form>
				</view>
				<view class="coupon-box">
					<scroll-view scroll-y="true" class="coupon-box-scroll">
						<view class="coupon-wrap" :style="'background-image:url(' + iconURL + '/img_qdhbyhqkp@2x.png)'" v-for="(item, index) in popupCouponsList"
						 :key="index">
							<view class="left" v-if="item.coupon_type == 0">
								<text class="price1">¥</text>
								<text class="price2">{{item.value}}</text>
							</view>
							<view class="left" v-if="item.coupon_type == 1">
								<text class="price2">{{item.value}}</text>
								<text class="price1">折</text>
							</view>
							<view class="right">
								<view class="text1 ellipsis">{{item.name}}</view>
								<view class="text2 ellipsis">{{item.description}}</view>
								<view class="text2" style="white-space:nowrap;">{{item.use_end_date}}</view>
							</view>
						</view>
					</scroll-view>
					<view class="shadow"></view>
				</view>
			</view>
		</view>
		<!-- #ifdef MP-WEIXIN -->
		<!--添加小程序提示-->
		<view class="add-tips" @tap="toShowTips" :style="'top: ' + (navBarHeight - 8) + 'px'" v-if="showTips && pickup.pickup_id">
			<image :src="iconURL + '/xiaochengxutixing02.png'" mode="widthFix"></image>
			<text class="tip-text">添加到「我的小程序」购物更方便</text>
			<!-- <view class="iconfont icon-btn_qiapianguanbianniux close-tips" catchtap="closeTips"></view> -->
		</view>
		<view class="drawer_screen" v-if="showMoreTips" @click.stop="closeAllTips">

		</view>
		<view class="showAddTips" scroll-y="true" v-if="showMoreTips" :style="'top: ' + navBarHeight + 'px'">
			<view class="addTipsBox" @click.stop="closeAllTips">
				<view class="tips-font">1、点击</view>
				<image class="tips-img-add" :src="iconURL + '/clickAddTips.png'"></image>
				<image :src="iconURL + '/guidethearrow01.png'" class="tip-img-arrow">

				</image>
			</view>
			<view class="addTipsBox">
				<view class="tips-font">2、点击添加到“我的小程序”</view>
				
				<image class="tips-img-to-add" :src="iconURL + '/addToMyTips.png'"></image>
			</view>
			<view class="addTipsBox">
				<view class="tips-font">3、在微信首页下拉，从“我的小程序” 快速进入“买买提”</view>
				<image class="tips-img-third" :src="iconURL + '/addHint01.png'"></image>
			</view>
			<view class="addTipsBtnBox">
				<view class="addTipsBtn" @tap="closeAllTips">
					我知道了
				</view>
			</view>
		</view>
		<!-- #endif -->
		<!-- 新厂首页 -->
		<!-- 正式版 -->
		<view class="page zhengshi" v-if="showPage && pickup.pickup_type == 0">
			<form report-submit="true" @submit="goTissue" v-if="showTissue">
				<view class="index-tissue">
					<button formType="submit" class="tissue-button"></button>
					<image class="tissue" :src="iconURL + '/index-tissue03.gif'"></image>
				</view>
			</form>
			<view class="navbar-box" :style="'height: ' + navBarHeight + 'px'">
				<view :style="'height: ' + navBarHeight + 'px'"></view>
				<view class="navbar-menu" :style="'height: ' + navBarHeight + 'px'">
					<view class="navbar-left">
						<navigator hover-class="none" class="pickup" url="../pickup2/pickup2">
							<view class="iconfont icon-btn_dizhix"></view>
							<text class="pickup_content">{{pickup.cityName}}</text>
							<image class="right_icon" :style="'background-image:url(' + iconURL + '/btn_xyh_12@2x.png)'"></image>
						</navigator>
					</view>
				</view>
			</view>
			<image class="swiper-header-bg" :src="iconURL + '/index-swiper-bg.png'" v-if="adList[0].ad_link != ''"></image>
			<!-- <view class="indexSearch white-bg-color">
    <navigator hover-class="none" class='pickup' url='../pickup/pickup'>
      <view class='iconfont icon-btn_dizhix'></view>
      <view class='pickup_content'>{{pickup.cityName||city.cityName}}</view>
      <image class='right_icon' style='background-image:url({{iconURL}}/btn_xyh_12@2x.png)'></image>
    </navigator>
    <view class="searchButton" bindtap="goSearch">
      <view class='iconfont icon-img_sousuox'></view>
      <text class='text_content_normal'>搜索</text>
    </view>
  </view> -->
			<!-- 轮播开始 -->
			<view class="swipers newSwipers indexAd indexAd2" id="topHeight " v-if="adList[0].ad_link != ''">
				<swiper :indicator-color="indicatorColor" :current="indexAdcurrent" indicator-active-color="#ffbb44"
				 :indicator-dots="indicatorDots" :circular="circular" :autoplay="!autoplay" :interval="interval" :duration="duration">
					<swiper-item v-for="(item, index) in adList" :key="index">
						<image mode="aspectFill" class="adImg newAdimg" :src="item.ad_code"></image>
						<form class="index-from-indexAd new" @submit="goWebView" data-type="2" :data-item="item" report-submit="true">
							<button form-type="submit"></button>
						</form>
						<view class="countDownDemo" v-if="item.activity_start_time != 0">
							<view class="countDown-text">{{item.activity_status == 0 ? "距活动开始" : "距活动结束仅剩:"}}</view>
							<countDown :type="2" :isShowMs="true" :time-text="time-text" :doc-text="doc-text" :timestamp="(item.activity_status == 0 ? item.activity_start_time * 1000 : item.activity_end_time * 1000)"></countDown>
						</view>
					</swiper-item>
				</swiper>
			</view>
			<!-- 轮播结束 -->
			<!-- <view class='service_title'>
    <view class='service_item'>
      <view class='iconfont icon-img_pinzhibaozhangx'></view>
      <view>{{service_title[0]}}</view>
    </view>
    <view class='service_item'>
      <view class='iconfont icon-img_jisutihuox'></view>
      <view>{{service_title[1]}}</view>
    </view>
    <view class='service_item'>
      <view class='iconfont icon-img_wuyoutuikuanx'></view>
      <view>{{service_title[2]}}</view>
    </view>
  </view> -->
			<!-- barList开始 -->

			<view class="newlyweds-img">
				<view class="newlyweds-img-box">
					<view class="iconfont icon-yuanzhuangzhengpin newLywds-icon"></view>
					<view class="newLywds-text">原装正品</view>
				</view>
				<view class="newlyweds-img-box">
					<view class="iconfont icon-img_jisutihuox newLywds-icon"></view>
					<view class="newLywds-text">次日送达</view>
				</view>
				<view class="newlyweds-img-box">
					<view class="iconfont icon-bianjietihuo newLywds-icon"></view>
					<view class="newLywds-text">便捷提货</view>
				</view>
				<view class="newlyweds-img-box">
					<view class="iconfont icon-fangxingoumai newLywds-icon"></view>
					<view class="newLywds-text">放心购买</view>
				</view>
			</view>
			<view class="barList white-bg-color">
				<view :class="'bar_item ' + (barList.length == 5 || barList.length == 10 ? 'bar_item_5' : '')" v-for="(item, index) in barList"
				 :key="index">
					<view hover-class="none">
						<image class="bar_icon" mode :src="item.icon_img"></image>
						<text>{{item.name}}</text>
					</view>
					<form @submit="goBar" :data-url="item.url" :data-index="index" class="index-from-barItem" report-submit="true">
						<button form-type="submit"></button>
					</form>
				</view>
			</view>
			<!-- barList结束 -->



			<!-- 新人限时一元开始 -->
			<!-- <view class='ac_new_person' wx:if="{{acticity_new_person.is_new}}">
    <view class='ac_wrap'>
      <image class='ac_bg' src='{{iconURL}}/home-newlyweds.png'></image>
      <navigator hover-class="none" url='/pages/product/product?entryType=external&productId={{item.goods_id}}' class='ac_item' wx:for="{{acticity_new_person.goood_detail}}" wx:key="{{item.goods_id}}">
        <view class='good_pic'>
          <image mode='aspectFit' src='{{item.list_img}}'></image>
        </view>
        <view class='one_price'>
          <text class='price1'>￥</text>
          <text class='price2'>{{item.shop_price}}</text>
          <text class='price3'>疯抢</text>
        </view>
      </navigator>
    </view>
  </view> -->
			<!-- 新人限时一元结束 -->

			<!-- 首页广告图片 -->
			<swiper class="promotion" :current="singleAdcurrent" indicator-active-color="#ffbb44" indicator-color="#ffffff"
			 indicator-dots="true" v-if="singleAd.length > 1">
				<swiper-item v-for="(item, index) in singleAd" :key="index">
					<image :src="item.ad_code"></image>
					<form @submit="goWebView" data-type="3" class="index-from-singleAd" :data-item="item" report-submit="true">
						<button form-type="submit"></button>
					</form>
				</swiper-item>
			</swiper>
			<view class="promotion" v-if="singleAd[0].ad_code&&singleAd.length==1">
				<image :src="singleAd[0].ad_code"></image>
				<form @submit="goWebView" data-type="3" class="index-from-singleAd" :data-item="singleAd[0]" report-submit="true">
					<button form-type="submit"></button>
				</form>
			</view>

			<!-- 三活动专区 -->
			<!-- 变动模块 -->
			<view class="configure-block white-bg-color" v-if="indexModel2 && indexModel2[0][0]['route'].length>=2">
				<configureModel :list="indexModel2"></configureModel>
			</view>
			<!-- 变动模块结束 -->


			<!-- 限时秒杀 -->
			<view class="sale_wrap" v-if="acticity_buy.activity_id > 0">
				<!-- 头部 -->
				<!-- <view class='head'>
      <view class='left'>
        <image class='img_xsms' src='{{iconURL}}/img_xsms@2x.png'></image>
        <text>限时秒杀</text>
      </view>
      <view class='right'>
        <view
          class='time-item {{item.activity_id==scKill_id?"time-item-actived":""}}'
          wx:for="{{scKillList}}"
          data-scKill_id='{{item.activity_id}}' data-scKill_idx='{{index}}' bindtap='scKillactived'
        >{{item.name}}</view>
      </view>
    </view> -->
				<!-- state  0:已结束  1：正在进行  2：预告 -->
				<!-- <view class='countDown' wx:for="{{scKillList}}" wx:if="{{scKillList.length>0&&good_list.length>0}}" hidden='{{item.activity_id!=scKill_id}}' wx:key="{{item.activity_id}}">
      <!-- <view class='countDown-line-lf'></view> --
      <text data-activity_id='{{item.activity_id}}'>
        <block wx:if="{{item.progress.state==0}}">本场已结束</block>
        <block wx:if="{{item.progress.state==1}}">距离优惠结束</block>
        <block wx:if="{{item.progress.state==2}}">距离优惠开始</block>
      </text>
      <countDown timestamp="{{item.progress.start_time}}" wx:if="{{item.progress.state==2}}"></countDown>
      <countDown timestamp="{{item.progress.end_time}}" wx:if="{{item.progress.state==1}}"></countDown>
      <!-- <view class='countDown-line-rt'></view> --
    </view> -->
				<!-- 商品列表 -->
				<view class="goodList white-bg-color">
					<view class="goodList-header row">
						<view class="bar-header">{{acticity_buy.time}}</view>
						<view class="bar-header-text">限量抢购</view>
						<view class="countdown-text">{{ acticity_buy.progress.state==1 ? '距结束' : '距开始'}}</view>
						<countDown :timestamp="acticity_buy.progress.start_time" v-if="acticity_buy.progress.state==2"></countDown>
						<countDown :timestamp="acticity_buy.progress.end_time" v-if="acticity_buy.progress.state==1"></countDown>
						<view class="more t2" @tap="goBar" data-url="/pages/flashSale/flashSale">
							<text>更多</text>
							<text class="t2 iconfont icon-btn_gerenzhongxinyoujiantoux"></text>
						</view>
					</view>
					<view scroll-x="true" class="gallery" :style="'background-image:url(' + iconURL + '/jbbj.png)'">
						<view class="good_card3" v-for="(item, index) in acticity_buy.goood_detail" :key="index">
							<view hover-class="none">
								<view class="good_pic3 good_pic inequacy_wrap">
									<image class="goods_lable" v-if="item.goods_lable.length>0" :src="item.goods_lable"></image>
									<view class="discount_label" v-if="item.img_content&&item.img_content.length>0 && type != 3">{{item.img_content}}</view>
									<view class="inequacy" v-if="item.is_enough==0">
										<image :src="iconURL + '/inequacy02.png'"></image>
									</view>

									<image lazy-load="true" mode="aspectFit" :src="item.list_img"></image>
								</view>
								<view class="good_info3">
									<view class="title mb12 t4">{{item.goods_name}}</view>
									<view class="price red-font-color mb12" :style="'text-align:' + align">
										<text class="small">￥</text>
										<text class="mr6">{{item.shop_price}}</text>
										<view class="tab" v-if="item.is_special_price">特价</view>
										<!-- <view class='tab' wx:if="{{item.is_new}}">上新</view> -->
										<text class="small ml6 sPrice">¥{{item.market_price}}</text>
									</view>
									<view class="buy_btn" :style="'background-image:url(' + iconURL + '/btn_syq@2x01.png)'">
										<text class="fw-500">抢</text>
										<text class="icon-btn_sanjiaoxiaojiantoux1 iconfont"></text>
									</view>
								</view>
							</view>
							<form @submit="goToProduct" class="index-from-goodCard" :data-name="item.goods_name" :data-goods-id="item.goods_id"
							 report-submit="true">
								<button form-type="submit"></button>
							</form>
						</view>
					</view>
					<!-- <goodList list="{{acticity_buy.goood_detail}}" type="3" symbolSize="small" align="center"></goodList> -->
					<!-- <view class='row between'>
        <view class="good_card2"  wx:for="{{scKill_list}}" wx:key="{{item.goods_id}}">
          <view class='good_pic2 good_pic inequacy_wrap' catchtap='goToProduct' data-goodsId='{{item.goods_id}}' style="background-image:url({{iconURL}}/cstp.png)">
            <!-- 标签 --
            <image class='goods_lable' wx:if="{{item.goods_lable.length>0}}" src='{{item.goods_lable}}'></image>

            <!-- 商品图 --
            <image mode='scaleToFill' class='list_img' src='{{item.list_img}}'></image>
            <!-- 已抢完 --
            <image class='inequacy' src='{{iconURL}}/inequacy01.png' wx:if="{{item.is_enough==0}}"></image>
            <!-- <view class='prom_info' wx:if="{{item.prom_info.prom_label}}">{{item.prom_info.prom_label}}</view> --
          </view>
          <!-- 限时秒杀 --
          <view class='good_info2'>
            <view class='title' catchtap='goToProduct' data-goodsId='{{item.goods_id}}'>{{item.goods_name}}</view>
            <view class='price red-font-color' catchtap='goToProduct' data-goodsId='{{item.goods_id}}'>
              <text class='small'>￥</text>
              <text>{{item.shop_price}}</text>
              <!-- <view class='tab' wx:if="{{item.is_special_price}}">特价</view> --
              <!-- <view class='tab' wx:if="{{item.is_new}}">上新</view> --
              <text class='small sPrice'>￥{{item.market_price}}</text>
            </view>
            <view class='get_btn'>
              <!-- <button class='btn3' wx:if="{{item.state==0}}">立即抢购</button> --
              <!-- --
              <!-- 立即抢购按钮 --
              <form bindsubmit='addShopCart' wx:if="{{item.state==1 && item.is_enough == 1 && item.buy_now == 0}}"  data-type="bottomcart" data-productId='{{item.goods_id}}' data-type="addcart" report-submit='true'>
                <button class='btn1 btn' data-productId='{{item.goods_id}}' data-type="addcart" style="background-image:url({{iconURL}}/img_red_btn.png)" formType="submit">立即抢购</button>
              </form>
              <form bindsubmit='nowPurchase' wx:if="{{item.state==1 && item.is_enough == 1 && item.buy_now == 1}}" data-type="bottomcart" data-productId='{{item.goods_id}}' data-type="addcart" report-submit='true'>
                <button class='btn1 btn' data-productId='{{item.goods_id}}' data-type="addcart" style="background-image:url({{iconURL}}/img_red_btn.png)" formType="submit">立即抢购</button>
              </form>
              <!-- 即将开始按钮 --
              <button class='btn2 btn' wx:if="{{item.state==2&&item.is_enough == 1}}">即将开始</button>
              <!-- 原价购买按钮 --
              <form bindsubmit='addShopCart' wx:if="{{(item.state==0 || item.is_enough == 0) && item.buy_now == 0}}" data-type="bottomcart" data-productId='{{item.goods_id}}' data-type="addcart" report-submit='true'>
                <button class='btn4 btn' data-productId='{{item.goods_id}}' data-type="addcart" formType="submit">原价购买</button>
              </form>
              <form bindsubmit='nowPurchase' wx:if="{{(item.state==0 || item.is_enough == 0) && item.buy_now == 1}}" data-type="bottomcart" data-productId='{{item.goods_id}}' report-submit='true'>
                <button class='btn4 btn' data-productId='{{item.goods_id}}' formType="submit">原价购买</button>
              </form>
            </view>
          </view>
        </view>
      </view> -->
				</view>
			</view>

			<!-- 限量抢购 -->
			<!-- <view>
    <view class='flashSale_title' wx:if="{{activitylist.length>0}}">{{flashSale_title}}</view>

    <view class='status_bar_box' wx:if="{{activitylist.length>0}}">
      <view class='status_bar'>
        <!-- wx:if="{{item.progress.state!=0}}" --
        <view class='status {{item.activity_id==activity_id?"actived":""}}' wx:for="{{activitylist}}" wx:key="{{item.activity_id}}" wx:if="{{item.progress.state!=0}}" data-activity_id='{{item.activity_id}}' data-actived_idx='{{index}}' bindtap='actived'>
          <!-- <view>{{item.name}}</view> --
          <view class='text'>{{item.progress.state==1?'':item.namen}}{{item.progress.desn}}</view>
        </view>
      </view>
    </view>

    <!-- state  0:已结束  1：正在进行  2：预告 --
    <view class='countDown' wx:for="{{activitylist}}" wx:if="{{activitylist.length>0&&good_list.length>0}}" hidden='{{item.activity_id!=activity_id}}' wx:key="{{item.activity_id}}">
      <!-- <view class='countDown-line-lf'></view> --
      <text data-activity_id='{{item.activity_id}}'>
        <block wx:if="{{item.progress.state==0}}">本场已结束</block>
        <block wx:if="{{item.progress.state==1}}">距离恢复原价</block>
        <block wx:if="{{item.progress.state==2}}">距优惠开始</block>
      </text>
      <countDown timestamp="{{item.progress.start_time}}" wx:if="{{item.progress.state==2}}"></countDown>
      <countDown timestamp="{{item.progress.end_time}}" wx:if="{{item.progress.state==1}}"></countDown>
      <!-- <view class='countDown-line-rt'></view> --
    </view>
    <!-- 商品列表 --
    <view class='good_list' scroll-y="true" wx:if="{{activitylist.length>0}}">
      <!-- url='/pages/product/product?productId={{item.goods_id}}'  --
      <view hover-class="none" wx:for="{{good_list}}" wx:key="{{index}}" class='bg-ff'>
        <view class='good_box'>
          <view class='good_wrap bor-b'>
            <!-- 商品图片 --
            <view class='good_pic' style="background-image:url({{iconURL}}/cstp.png)" catchtap='goToProduct' data-goodsId='{{item.goods_id}}'>
              <image class='goods_lable' wx:if="{{item.goods_lable.length>0}}" src='{{item.goods_lable}}'></image>
              <view class='discount_label' wx:if="{{item.img_content&&item.img_content.length>0}}">{{item.img_content}}</view>
              <image src='{{item.list_img}}'></image>
              <image style="background-image:url({{iconURL}}/inequacy01.png)" class='inequacy' wx:if="{{item.is_enough == 0}}"></image>
            </view>
            <view class='good_info'>
              <view catchtap='goToProduct' data-goodsId='{{item.goods_id}}'>
                <!-- 商品名称  --
                <view class='good_name'>
                  <text class='good_tag' wx:if="{{item.activity_label}}">{{item.activity_label}}</text>{{item.goods_name}}</view>
                <!-- 商品价格 --
                <view class="good_price {{item.state == 0?'prise_pos':''}}">¥
                  <text class='larger'>{{item.shop_price}}</text>
                  <text class='small' wx:if="{{item.shop_price != item.market_price}}">¥{{item.market_price}}</text>
                  <view class='tab' wx:if="{{item.is_special_price && item.is_special_price == 1}}">特价</view>
                </view>
                <!-- 商品进度条 --
                <view class='percent_bar middle_pos' wx:if="{{item.state==1}}">
                  <!-- <view class='percent' style='width:{{100-item.percent}}%'></view> -->
			<!-- <text class='percent_num' wx:if="{{item.percent>0}}">{{item.percent}}%</text> -->
			<!-- <text class='percent_num' style='font-style:oblique;' wx:if="{{item.percent==0}}">已售罄</text> -->
			<!-- <text class='percent_num' wx:if="{{item.state==1 && item.is_enough == 1 && item.percent == 100}}">还剩{{item.goods_amount}}件</text> -->
			<!-- <text class='percent_num' wx:if="{{item.state==1 && item.is_enough == 1}}">已售{{item.goods_sell_num}}件</text>
                <text class='percent_num' wx:if="{{item.state==1 && item.is_enough == 0}}">{{item.goods_amount}}件已抢完</text> --
                  <view class='percent' style='width:50%'></view>
                  <view class='percent_text'>
                    <text class='percent_item item-color'>已售{{item.goods_sell_num}}份</text>
                    <text class='percent_item'>剩余{{item.goods_amount - item.goods_sell_num}}份</text>
                  </view>
                </view>
                <!-- 商品数量 --
                <view class='good_num middle_pos' wx:if="{{item.state==2}}">限量{{item.goods_amount}}件</view>
              </view>
              <!-- <view class='bb'></view> --
              <!-- <form bindsubmit='goToProduct' wx:if="{{item.state==1 && item.is_enough == 1 && item.buy_now == 1}}" data-goodsId='{{item.goods_id}}'>
                <button class='btn1' data-goodsId='{{item.goods_id}}' style="background-image:url({{iconURL}}/img_red_btn.png)" formType="submit">立即抢购</button>
              </form> --
              <view class='get_btn'>
                <!-- <button class='btn3' wx:if="{{item.state==0}}">立即抢购</button> --
                <form bindsubmit='addShopCart' wx:if="{{item.state==1 && item.is_enough == 1 && item.buy_now == 0}}" data-type="bottomcart" data-productId='{{item.goods_id}}' data-type="addcart" report-submit='true'>
                  <button class='btn1' data-productId='{{item.goods_id}}' data-type="addcart" style="background-image:url({{iconURL}}/img_red_btn.png)" formType="submit">立即抢购</button>
                </form>
                <form bindsubmit='nowPurchase' wx:if="{{item.state==1 && item.is_enough == 1 && item.buy_now == 1}}" data-type="bottomcart" data-productId='{{item.goods_id}}' data-type="addcart" report-submit='true'>
                  <button class='btn1' data-productId='{{item.goods_id}}' data-type="addcart" style="background-image:url({{iconURL}}/img_red_btn.png)" formType="submit">立即抢购</button>
                </form>

                <button class='btn2' wx:if="{{item.state==2&&item.is_enough == 1}}">即将开始</button>
                <form bindsubmit='addShopCart' wx:if="{{(item.state==0 || item.is_enough == 0) && item.buy_now == 0}}" data-type="bottomcart" data-productId='{{item.goods_id}}' data-type="addcart" report-submit='true'>
                  <button class='btn4' data-productId='{{item.goods_id}}' data-type="addcart" formType="submit">原价购买</button>
                </form>
                <form bindsubmit='nowPurchase' wx:if="{{(item.state==0 || item.is_enough == 0) && item.buy_now == 1}}" data-type="bottomcart" data-productId='{{item.goods_id}}' report-submit='true'>
                  <button class='btn4' data-productId='{{item.goods_id}}' formType="submit">原价购买</button>
                </form>
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class='no_good_list bg-ff' wx:if='{{isGoodListBool}}'>暂无商品推荐，更多商品请查看分类</view>
    </view>
    <view bindtap='goCategory' class="refreshEnd text_content_little color_gray white-bg-color" wx:if="{{!refresh&&good_list.length>0}}">
      <text class='refresh-text'>点击查看更多商品</text>
    </view>
  </view> -->

			<!-- 聚合专题type=2,单一专题type=1 -->
			<!-- <view class='subject mb16 mt16' wx:key="index" wx:for="{{subjuctList}}" wx:for-item="sub" style="padding-bottom:{{sub.type==1?'0':'32rpx'}};">

    <subject list="{{sub.info}}" wx:if="{{sub.type==2}}" />

    <view class='subject1' wx:if="{{sub.type==1}}">
      <view class='title mb32' style='background-image:url({{sub.info.top_img}})'>
        <navigator class='more' url="/pages/projectPage/projectPage?type=3&id={{sub.info.subject_id}}">
          <text>更多</text>
          <icon class='iconfont icon-btn_gengduo_xiangyoujiantoux'></icon>
        </navigator>
      </view>
      <navigator url='/pages/product/product?productId={{sub.info.goods_id}}' class='pic3 mb16' wx:if="{{sub.info.recommend_goods_img}}">
        <image src='{{sub.info.recommend_goods_img}}'></image>
      </navigator>
      <goodList list="{{sub.info.goodsInfo}}" type="3" align="left" />
    </view>
  </view> -->

			<!-- 变动模块 -->
			<view class="configure-block white-bg-color" v-if="indexModel && indexModel.length > 0">
				<configureModel :list="indexModel"></configureModel>
			</view>
			<!-- 变动模块结束 -->

			<view class="randomLock randomLock3">
				<view class="randomLock_title " :style="'background-image:url(' + iconURL + '/choiceness.png)'"></view>
				<!-- <import src="../listdetailTemplate/listdetailTemplate.wxml" /> -->
				<!-- <goodList :lists="shopList" :type="2" :align="left"></goodList> -->
				<goodList :lists="shopList" :type="2" :align="left"></goodList>
			</view>
			<view v-if="!refresh" class="not-more">
				<text class="not-more-text t2">找不到想要的？请告诉我们</text>
				<view class="not-more-btn">
					<text @tap="goBar" data-url="/pages/problem/feedBook/feedBook" class="not-more-btn-text">留言反馈</text>
				</view>
			</view>
			<!-- 最下方的加载小球 -->
			<!-- <loadingbottom v-if="showPage && shopList.length>0 && !refresh"></loadingbottom> -->
			<loadingbottom v-if="refresh"></loadingbottom>
			<!-- <pageBottomLogo v-if="showPage && teamGoodsList.length>0 && checkShowBottom"></pageBottomLogo> -->
			<pageBottomLogo v-if="!refresh"></pageBottomLogo>
			<!--SKU弹窗-->
			<view class="drawer_screen" @click.stop="setModalStatus" v-if="showModalStatus"></view>
			<view :animation="animationData" :style="'opacity:1;z-index:' + (itemData.buy_now==1?'2000':'1200') + ';'" class="drawer_attr_box"
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
								<i class="icon_rmb">¥</i>
								<text>{{skuSvipCurrent}}</text>
								<text v-if="skuSvipCurrent != skuCurrent" class="small">¥{{skuCurrent}}</text>
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
							<button class="amount-button" data-alpha-beta="0" @click.stop="changeNum">
								<i :class="'amount-icon ' + (undel ? 'cant-del' : '')">-</i>
							</button>
							<!-- 数值 -->
							<view class="amount-input">{{buynum}}</view>
							<!-- 加号 -->
							<button class="amount-button" data-alpha-beta="1" @click.stop="changeNum">
								<i :class="'amount-icon ' + (unadd ? 'cant-del' : '')">+</i>
							</button>
						</view>
					</view>
					<form @submit="addShopCart" v-if="buy_now == 0" data-type="bottomcart" :data-productId="productid" report-submit="true">
						<button type="primary" class="buy_now_btn" :data-productId="productid" formType="submit" data-type="bottomcart">加入购物车</button>
					</form>
					<form @submit="nowPurchase" v-if="buy_now == 1" data-type="bottomcart" :data-productId="productid" report-submit="true">
						<button type="primary" class="buy_now_btn" :data-productId="productid" formType="submit" data-type="bottomcart">立即购买</button>
					</form>
					<!-- <button class='buy_now_btn' wx:if="{{itemData.buy_now==1}}" catchtap='nowPurchase'>立即购买</button> -->
				</view>
			</view>
			<!-- 去签到页 -->
			<!-- <view class='to_sign' bindtap='to_sign' wx:if="{{signcheckStatus!=2}}">
    <image class='bx' src='{{iconURL}}/baoxiang.gif'></image>
    <text>{{signcheckStatus?"转盘抽大奖":"签到领福利"}}</text>
    <text class='iconfont icon-btn_xiangyoudajiantoux'></text>
  </view> -->
			<!-- 回到顶部 -->
			<view class="to_top" v-if="to_top" @tap="tap_to_top">
				<image :src="iconURL + '/to_top01.png'"></image>
			</view>
			<!-- <button class='to_share' open-type="share">
    <image src='{{iconURL}}/button-icon-share01.png'></image>
  </button> -->
		</view>

		<!-- 新厂首页 -->
		<!-- 测试版 -->
		<view class="index-newlyweds ceshi" v-if="showPage && pickup.pickup_type == 1">
			<view class="navbar-box" :style="'height: ' + navBarHeight + 'px'">
				<view :style="'height: ' + navBarHeight + 'px'"></view>
				<view class="navbar-menu" :style="'height: ' + navBarHeight + 'px'">
					<view class="navbar-left">
						<!-- <navigator hover-class="none" class="pickup" :url=`../pickup2/pickup2?cityName=${pickup.cityName}`>
							<view class="iconfont icon-btn_dizhix"></view>
							<text class="pickup_content">{{pickup.cityName||city.cityName}}</text>
							<image class="right_icon" :style="'background-image:url(' + iconURL + '/btn_xyh_12@2x.png)'"></image>
						</navigator> -->
						<view class="pickup" @click="navPick2">
							<view class="iconfont icon-btn_dizhix"></view>
							<text class="pickup_content">{{pickup.cityName}}</text>
							<image class="right_icon" :style="'background-image:url(' + iconURL + '/btn_xyh_12@2x.png)'"></image>
						</view>
					</view>
				</view>
			</view>
			<image class="swiper-header-bg" :src="iconURL + '/index-swiper-bg.png'" v-if="adList[0].ad_link != ''"></image>
			<view class="index-newlyweds-list">
				<!-- 过渡版本广告 -->
				<view class="swipers newSwipers indexAd" id="topHeight topHeight3" v-if="adList[0].ad_link != ''">
					<swiper :indicator-color="indicatorColor" :current="indexAdcurrent" indicator-active-color="#ffbb44"
					 :indicator-dots="indicatorDots" :circular="circular" :autoplay="!autoplay" :interval="interval" :duration="duration">
						<swiper-item v-for="(item, index) in adList" :key="index">
							<image mode="aspectFill" class="adImg newAdimg" :src="item.ad_code"></image>
							<form class="index-from-indexAd new" @submit="goWebView" data-type="2" :data-item="item" report-submit="true">
								<button form-type="submit"></button>
							</form>
						</swiper-item>
					</swiper>
				</view>
				<view class="newlyweds-img">
					<view class="newlyweds-img-box">
						<view class="iconfont icon-yuanzhuangzhengpin newLywds-icon"></view>
						<view class="newLywds-text">原装正品</view>
					</view>
					<view class="newlyweds-img-box">
						<view class="iconfont icon-img_jisutihuox newLywds-icon"></view>
						<view class="newLywds-text">次日送达</view>
					</view>
					<view class="newlyweds-img-box">
						<view class="iconfont icon-bianjietihuo newLywds-icon"></view>
						<view class="newLywds-text">便捷提货</view>
					</view>
					<view class="newlyweds-img-box">
						<view class="iconfont icon-fangxingoumai newLywds-icon"></view>
						<view class="newLywds-text">放心购买</view>
					</view>
				</view>
				<!-- 首页专题广告 -->
				<view class="subject-ad-list" v-if="subjectAdList.length>=2">
					<view class="subject-ad-li" v-for="(item, index) in subjectAdList" :key="index" v-if="index<2">
						<image class="subject-ad-li" :src="item.ad_code">

						</image>
						<form class="index-from-indexAd new" @submit="goWebView" v-if="index<2" data-type="2" :data-item="item"
						 report-submit="true">
							<button form-type="submit"></button>
						</form>
					</view>

				</view>

				<!-- 活动tab切换 -->
				<view class="team-tab-box" id="slider-bar-team">
					<view :class="'team-tab ' + (sliderBarFixed ? 'on' : '')" :style="'top: ' + (sliderBarFixed ? navBarHeight : '') + 'px'">
						<view :class="'team-tab-li ' + (teamNum==0?'team-active':'')" data-num="0" @tap="change_team_tab">正在拼团</view>
						<view :class="'team-tab-li ' + (teamNum==1?'team-active':'')" data-num="1" @tap="change_team_tab">正在砍价</view>
						<view :class="'team-tab-li ' + (teamNum==2?'team-active':'')" data-num="2" @tap="change_team_tab">即将开团</view>
					</view>
				</view>
				<view class="team-box" v-if="teamGoodsList.length>0">
					<pickUpGoods :goodsList="teamGoodsList" :type="teamNum" @showPhoneModal="toShowPhoneModal" :getRemind="getRemind"></pickUpGoods>
				</view>
				<view class="team-box-none" v-if="teamGoodsList.length==0">
					<image class="team-img-none" :src="iconURL + '/buhuoindex.png'">

					</image>
					<view class="goods_none">
						小提正在努力补货中，敬请期待~
					</view>
				</view>
				<!-- <view class="team-box" wx:if="{{pickUpActivity.team_in_progress.goods_list&&pickUpActivity.team_in_progress.goods_list.length>0}}">
      <view class="team-title">
        <image src="{{iconURL}}/team_now.png"></image>
      </view>
      <pickUpGoods goodsList="{{pickUpActivity.team_in_progress.goods_list}}" type="0"></pickUpGoods>
    </view>
    <view class="team-box" wx:if="{{pickUpActivity.bargain_in_progress.goods_list&&pickUpActivity.bargain_in_progress.goods_list.length>0}}">
      <view class="team-title">
        <image src="{{iconURL}}/bargain_now.png"></image>
      </view>
      <pickUpGoods goodsList="{{pickUpActivity.bargain_in_progress.goods_list}}" type="1"></pickUpGoods>
    </view>
    <view class="team-box" wx:if="{{pickUpActivity.be_team.goods_list&&pickUpActivity.be_team.goods_list.length>0}}">
      <view class="team-title">
        <image src="{{iconURL}}/team_progress.png"></image>
      </view>
      <pickUpGoods goodsList="{{pickUpActivity.be_team.goods_list}}" type="2"></pickUpGoods>
    </view> -->
				<view class="index-footer-img">
					<image :src="item.image" mode="widthFix" v-for="(item, index) in pickUpActivity.index_footer_img" :key="index"></image>
				</view>

				<!-- 获取手机号弹窗 -->
				<view class="drawer_screen" v-if="showPhoneModal"></view>
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
			</view>
			<!--闪送按钮-->
			<view>
				<view :class="'conpun-postion-box ' + (takeoutAnimation ? 'takeout-active' : '')" v-if="shop_id!=0">
					<view class="conpun-postion-img" @tap="goTakeoutShop">
						<image class="imgbox" :src="iconURL + '/bargain-conpun-ad-imgbox.png'"></image>
						<image class="imgbtn" :src="iconURL + '/bargain-conpun-ad-imgbtn.png'"></image>
						<view class="text">红包天天送</view>
					</view>
				</view>
			</view>
			<!-- <view class="drawer_screen" wx:if="{{showPacketAd}}"  catchtap="hide_packet_ad"></view>
  <view class="packetAd" wx:if="{{showPacketAd}}" bindtap="getPacket">
    <image mode="widthFix">

    </image>
    <view class='iconfont closs icon-btn_guanbianniux' catchtap="hide_packet_ad"></view>
  </view>

  <view class="drawer_screen" wx:if="{{showPacketCoupon}}"  catchtap="hide_packet_coupon"></view>
  <view class="packetCoupon" wx:if="{{showPacketCoupon}}">
    <view class="packet-all-coupon {{showPacketCoupon?'packet-active':''}}">

    </view>
    <view class='iconfont closs icon-btn_guanbianniux' catchtap="hide_packet_coupon"></view>
  </view> -->
			<pageBottomLogo v-if="showPage && teamGoodsList.length>0 && checkShowBottom"></pageBottomLogo>
		</view>

		<no_warehouse v-if="!showPage" :city="city" :isAuthorization="isAuthorization" @openevent="openSet"></no_warehouse>
		<view class="drawer_screen" v-if="choosePickupShow"></view>
		<view class="choosePickup-model" v-if="choosePickupShow">
			<view class="model-title">温馨提示</view>
			<view class="row model-desc">
				<view class="iconfont icon-gantanhao desc-icon"></view>
				<view class="desc-text">当前位置存在多个工厂服务</view>
			</view>
			<view class="model-msg-title">请选择您所在的工厂：</view>
			<view class="row model-box-main" @tap="choosePickupChange" :data-index="index" v-for="(item, index) in choosePickupList"
			 :key="index">
				<view class="model-text">{{item.cityName}}</view>
				<view :class="'iconfont ' + (chooseSelectIndex == index ? 'icon-btn_xuanzhongx' : 'icon-btn_weixuanzhongx')"></view>
			</view>
			<view class="model-btn" @tap="choosePickupSubmit">确定</view>
		</view>
		<loadingBottom v-if="showBottomLoading"></loadingBottom>
		<!-- 公众号组件 -->
		<official-account v-if="showOfficial" class="official" @load="gzhBindload" @error="gzhBindload"></official-account>
		<!-- 红包-顶部通知消息 -->
		<notice type="1"></notice>
		<!-- 红包-侧边栏提示信息 -->
		<!-- <view class="redEnvelops-sidebar red {{takeoutAnimation ? 'sidebar-active' : ''}}" wx:if="{{homeSituation.is_show == 1 && pickup.pickup_type == 0 && (homeSituation.status == 1 || homeSituation.status == 2)}}">
  <view class="sidebar-box" bindtap="getEnvelopes" data-item="{{homeSituation}}">
    <view class="redEnvelops-sidebar-red-pack">
      <image class="img-main" src="{{iconURL}}/redEnvelops-sidebar-red-pack.png" mode="widthFix"></image>
      <image class="img-bg" src="{{iconURL}}/redEnvelops-sidebar-red-pack-bg.png" mode="widthFix"></image>
    </view>
  </view>
</view> -->
		<view :class="'redEnvelops-sidebar msg ' + (takeoutAnimation ? 'sidebar-active' : '')" v-if="homeSituation.is_show == 1 && pickup.pickup_type == 0">
			<view class="sidebar-box" @tap="getEnvelopes" :data-item="homeSituation">
				<view class="redEnvelops-sidebar-red-pack">
					<image :class="'img-msg ' + ((homeSituation.status == 3 || homeSituation.status == 4) && !takeoutAnimation ? 'pulse' : '') + ' ' + ((homeSituation.status == 1 || homeSituation.status == 2) && !takeoutAnimation ? 'pulseMax' : '')"
					 :src="homeSituation.show_img" mode="widthFix"></image>
				</view>
				<view class="number" v-if="homeSituation.status == 3">{{homeSituation.notice_msg_num}}</view>
			</view>
		</view>
		<!-- 红包-可领取红包 -->
		<envelopes :show="showRedEnvel" :rid="homeSituation.red_packet_id" :showType="showRedEnvelType"></envelopes>
		<!-- loading -->
		<loading v-if="loadingShow"></loading>

	</view>
</template>

<script>
	var app = getApp().globalData;
	var app2 = getApp()
	var common = require("../../utils/common.js");
	var event = require("../../utils/event.js");
	import countDown from "../../components/countDown/countDown";
	import goodList from "../../components/goodList/goodList";
	import subject from "../../components/subject/subject";
	import configuremodel from "./configureModel/configureModel";
	import no_warehouse from "../../components/no_warehouse/no_warehouse";
	import pickupgoods from "../../components/pickUpActivity/pickUpActivity";
	import loadingbottom from "../../components/loadingBottom/loadingBottom";
	export default {

		data() {
			return {
				//有工厂后显示index
				switch_index: true,
				// 自提点
				pickup: {
					cityName: '请选择提货点'
				},
				navBarHeight: app.navBarHeight,
				showTissue: false,
				listScroll: true,
				showAdver: false,
				indicatorDots: false,
				autoplay: false,
				buy_now: 0,
				showSearchBG: false,
				scrollTop: 0,
				duration: 500,
				interval: 5000,
				singleAdcurrent: 0,
				indexAdcurrent: 0,
				indicatorColor: "#fff",
				indicatorActiveColor: "#eb3c39",
				circular: true,
				adList: [],
				service_title: [],
				barList: [],
				acticity_new_person: [],
				acticity_buy: {},
				page_size: 10,
				shopList: [],
				page: 1,
				refresh: true,
				checkSessionKey: app.checkSessionKey,
				iconURL: app.dataBase.iconURL,
				// showCloseImg: false,
				showCouponList: false,
				// 限时抢购
				flashSale_title: '',
				ac_load_btn: true,
				actived_idx: 1,
				activity_id: 0,
				activitylist: [],
				good_list: [],
				total: 0,
				timer_btn: false,
				singleAd: [],
				advertisementAd: [],
				AdClickBtn: true,
				isGoodListBool: false,
				// 商详
				productId: 0,
				itemData: {},
				showSKUstatus: 0,
				optionalAttrs: {},
				skuImages: '',
				bannerItem: [],
				buynum: 1,
				// 属性选择
				firstIndex: -1,
				choosed_sku: '',
				cartAmount: 0,
				// 弹窗SKU，不能减不能加
				undel: true,
				unadd: false,
				// SKU的VIP价格和非SVIP是否相同
				isPriceEqual: false,
				canPurchase: false,
				//模块
				indexModel: null,
				// 新厂图片数据
				newFactoryList: [],
				// 分享信息
				share_data: {
					share_title: "",
					share_img: ""
				},
				// 公众号组件显示
				showOfficial: true,
				showTips: true,
				pickUpActivity: {},
				takeoutAnimation: false,
				choosePickupShow: false,
				chooseSelectIndex: 0,
				choosePickupList: [],
				showMoreTips: false,
				shop_id: 0,
				showPacketAd: true,
				showPacketCoupon: false,
				subjectAdList: [],
				packetModal: [],
				teamNum: 0,
				teamGoodsList: [],
				team_page: 1,
				team_page_size: 20,
				bargain_page: 1,
				bargain_page_size: 20,
				be_team_page: 1,
				be_team_page_size: 20,
				bargainList: [],
				teamList: [],
				beTeamList: [],
				sliderBarFixed: false,
				// 领券成功弹窗
				showCouponsSuccess: false,
				showPhoneModal: false,
				getRemind: false,
				checkShowBottom: false,
				showBottomLoading: false,
				homeSituation: {},
				showRedEnvel: false,
				showRedEnvelType: 1,
				confirmData: {},
				entryData: "",
				recommendList: [],
				height: "",
				isAuthorization: "",
				signcheckStatus: "",
				showCloseImg: false,
				popupCouponsList: "",
				to_top: false,
				animationData: "",
				showModalStatus: false,
				productid: 0,
				showfwModalStatus: false,
				showShareModalStatus: false,
				showBonusModal: false,
				brandID: "",
				skuSvipCurrent: "",
				skuCurrent: "",
				sku_price: "",
				min_sku_price: "",
				sku_svip_price: "",
				min_sku_svip_price: "",
				currentStock: "",
				hasDefaultSKU: "",
				sumbitName: "",
				indexModel2: "",
				loadingShow: false,
				showPage: true,
				city: {}
			};
		},

		components: {
			countDown,
			goodList,
			subject,
			configuremodel,
			no_warehouse,
			pickupgoods,
			loadingbottom,
		},
		props: {},
		onLoad: function(options) {
			//这里解决app端打开页面不加载数据
			// #ifdef APP-PLUS
			setTimeout(() => {
				this.loadData()
			}, 1000)
			// #endif
			
			console.log('onLoad');
			let than = this
			if (this.showPage) {
				this.getNewFactory()
			}

			uni.$on('update', (data) => {
				// console.log(data);
				than.showPage = data.showPage
			})

			common.showLoad(this);
			wx.showShareMenu({
				withShareTicket: true
			});
			// 设置reload 为true 才允许加载数据，为了返回当前页，onShow不重新加载数据使用
			// 加载页面时先设置默认值
			common.setStorageSync('reLoad', true);
			var pickupId = common.getStorageSync('getpickup');
			this.setData({
				entryData: options
			}); // 监听checkSessionKey

			event.on('show', this, function(data) {
				this.setData({
					showCouponsSuccess: false,
					AdClickBtn: true
				});
			}); // 监听小程序后台后隐藏关注组件

			event.on('hide', this, function(res) {
				this.setData({
					showOfficial: false
				});
			});

			if (!app.checkSessionKey) {
				event.on('checkSessionKey', this, function(data) {
					this.checkSessionKey = data;
				});
			}

			this.getPacketModal();
		},

		onReady() {
			common.hideLoad(this);
		},

		onShow: function(that2) {
			// common.setStorageSync('isOldUser', 0);
			// console.log('onShow');
			//当onShow在别处调用执行时，会出现this的问题

			var that = that2 || this;


			//渲染页面时，执行正在拼团
			//使用缓存工厂的数据
			var pickupId = common.getStorageSync('getpickup');
			that.pickup = pickupId

			that.setInviteShareLogin();

			if (pickupId.pickup_type == 0) {
				that.signcheck();
			}
			if (pickupId && that.pickup.pickup_id != pickupId.pickup_id && that.pickup.pickup_id != undefined) {
				if (pickupId.pickup_type == 0) {
					that.loadData();
				} else {

					that.getPickUpAcitivity();
				}

				that.setData({
					pickup: pickupId
				});
			}
			// 定位检测



			if (common.getStorageSync('reLoad')) {
				common.setStorageSync('reLoad', false);
			} else {
				if (pickupId.pickup_type == 0) {
					that.getHomeSituation();
				}
				return;
			}

			that.setData({
				pickup: common.getStorageSync('getpickup'),
				good_list: [],
				page: 1
			});
			// 外部携带的参数
			var options = that.entryData;

			if (options && options.tissue == 'true') {
				this.setData({
					showTissue: true
				});
			}
			// 判断是否第一次进入 且是从外部进入，如二维码扫码 && app.firstlaunchApp
			// options && options.entryType && options.entryType == 'external'
			if (options && (options.atitude || options.pickup_id) && !pickupId) {

				if (options.atitude) {
					that.getExternal(options.atitude, 1).then(function() {
						// 关闭开关，让app知道已经不是第一次进入当前页
						app.firstlaunchApp = false; // 清空data内携带参数

						that.entryData = {};
						var city = common.getStorageSync('city');
						var pickup = common.getStorageSync('getpickup');
						var data = {
							pickup: pickup,
							city: city,
							isAuthorization: true
						};
						data.showPage = true;
						that.setData(data);
						that.loadData(city); // 外部已带经纬度定位，无需再调用定位接口，所以将缓存定位改为真，让页面可以显示

						common.setStorageSync('authSetting', {
							'scope.userLocation': true
						});
					});
				} else {
					that.getExternal(options.pickup_id, 2).then(function() {
						// 关闭开关，让app知道已经不是第一次进入当前页
						app.firstlaunchApp = false; // 清空data内携带参数

						that.entryData = {};
						var city = common.getStorageSync('city');
						var pickup = common.getStorageSync('getpickup');
						var data = {
							pickup: pickup,
							city: city,
							isAuthorization: true
						};
						data.showPage = true;
						that.setData(data);
						that.loadData(city); // 外部已带经纬度定位，无需再调用定位接口，所以将缓存定位改为真，让页面可以显示

						common.setStorageSync('authSetting', {
							'scope.userLocation': true
						});
					});
				}

				return;
			}

			that.local(function(city) {
				// console.log('pickupIdpickupId', pickupId)
				var data = {
					city: city,
					isAuthorization: common.getStorageSync('authSetting')['scope.userLocation']
				};
				// console.log('data', data)
				that.setData(data);
				// 关闭开关，让app知道已经不是第一次进入当前页
				// console.log('app.firstlaunchApp', app.firstlaunchApp)
				app.firstlaunchApp = false;
				// 判断是否有开启定位和仓库
				if (city.warehouse_id != -1 && pickupId.pickup_id) {
					that.showAddTips();
					data.showPage = true;
					that.setData(data);

				} else {
					data.showPage = false;
					that.setData(data);
					return false;
				}

				that.setData({
					page: 1,
					shopList: [],
					recommendList: [],
					good_list: []
				});

				if (pickupId.pickup_type == 0) {
					that.loadData(city);
					that.getAdvertisement();
				} else {
					// console.log('getPickUpAcitivity();')
					that.getPickUpAcitivity(city);
					that.getAdvertisement();
				}

				that.getIndexShareInfo();
				that.getShopPickUp();
			});
			//获取屏幕宽度，根据比例设置轮播的高度
			wx.getSystemInfo({
				success: function(res) {
					that.setData({
						height: res.windowWidth / 1.70454545
					});
				}
			});
		},
		// 获取手机号去登录注册
		// getPhone: function(e) {
		//   var url = e.currentTarget.dataset.url;
		//   var that = this;
		//   common.checkLogin(e, function() {
		//     // 登录成功，修改app与user页面的checkSessionKey状态
		//     app.checkSessionKey = true;
		//     that.data.checkSessionKey = true;
		//     // 登录成功，跳转
		//     wx.navigateTo({
		//       url: url
		//     })
		//   })
		// },
		// bar 跳转
		// 上拉加载
		//滑到最底部执行事件
		onReachBottom: function() {
			console.log('滑到最底部执行事件')
			var pickupId = common.getStorageSync('getpickup');

			if (pickupId.pickup_type == 0) {
				if (this.refresh) {
					this.setData({
						page: this.page + 1
					});
					this.getIndexProducts(); // this.getActivitygoodslist()
				}
			} else {
				if (this.teamNum == 1) {
					if (this.bargainList.length > 0 && this.bargainList.length % this.bargain_page_size == 0) {
						this.bargain_page = this.bargainList.length / this.bargain_page_size + 1;
						this.setData({
							showBottomLoading: true
						});
						this.getBargainActivity();
					}
				} else if (this.teamNum == 0) {
					if (this.teamList.length > 0 && this.teamList.length % this.team_page_size == 0) {
						this.team_page = this.teamList.length / this.team_page_size + 1;
						this.setData({
							showBottomLoading: true
						});
						this.getTeamList();
					}
				} else if (this.teamNum == 2) {
					if (this.beTeamList.length > 0 && this.beTeamList.length % this.be_team_page_size == 0) {
						this.be_team_page = this.beTeamList.length / this.be_team_page_size + 1;
						this.setData({
							showBottomLoading: true
						});
						this.getBeTeamList();
					}
				}
			}
		},
		// 下拉刷新
		onPullDownRefresh: function() {

			this.setData({
				page: 1,
				shopList: [],
				recommendList: [],
				good_list: [],
				showAdver: false,
				showCouponsSuccess: false
			});
			common.setStorageSync('reLoad', true); // this.onShow();

			if (this.pickup.pickup_type == 0) {
				this.loadData();
			} else {
				this.getPickUpAcitivity();
			}
		},
		//前往更多
		// goMore: function(){
		//   wx.navigateTo({
		//     url: '../category/category',
		//   })
		// },
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
						title: that.share_data.share_title,
						path: '/pages/index/index?pickup_id=' + pickup.pickup_id,
						imageUrl: that.share_data.share_img
					};
				}
			} else {
				return {
					title: that.share_data.share_title,
					path: '/pages/index/index?pickup_id=' + pickup.pickup_id,
					imageUrl: that.share_data.share_img
				};
			}
		},
		created: function() {

		},
		methods: {
			//跳到工厂页面
			navPick2() {
				var city = common.getStorageSync('city');
				console.log(city);
				uni.navigateTo({
					// url:`/pickup2/pickup2?cityName=${pickup.cityName}`
					url: `/pages/pickup2/pickup2?warehouse_id=${city.warehouse_id}`
				})
			},
			// 从外部二维码扫码，带经纬度和外部标识external
			getExternal: function(value, type) {
				var that = this;
				var uri = app.getPath.getpickup;
				console.log('获取提货点');
				if (type == 1) {
					var data = {
						atitude: value
					};
				} else {
					var data = {
						pickup_id: value
					};
				}

				return new Promise(function(resolve, reject) {
					// 获取提货点
					common.ApiGateWayTest(uri, data, true, function(res) {
						console.log('获取提货点', res);
						if (res && res.data && res.data.success == 1) {
							if (type == 1) {
								var res = res.data.result.cities;
							} else {
								var res = res.data.result.cities.pick_up;
							}

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
									'pickup_type': res.pickup_type,
									'cityName': res.pickup_name,
									'pickup_address': res.pickup_address,
									'pickup_contact': res.pickup_contact,
									'pickup_phone': res.pickup_phone
								}
							}, function(res) {
								resolve('获取id成功');
							});
						}
					});
				});
			},

			//关闭首页弹窗
			closeTips() {
				this.setData({
					showTips: false
				});
			},

			// 显示添加小程序提示
			showAddTips() {
				setTimeout(() => {
					this.setData({
						showTips: false
					});
				}, 10000); // var date=new Date().toLocaleDateString();
				// if(wx.getStorageSync("add-tips")){
				//   var tips=wx.getStorageSync("add-tips");
				//   if(date===tips){
				//     this.setData({
				//       showTips:false
				//     })
				//   }else{
				//     this.setData({
				//       showTips:true
				//     })
				//     wx.setStorageSync("add-tips", date);
				//   }
				// }else{
				//   wx.setStorageSync("add-tips",date);
				// }
			},

			//显示加入小程序帮助
			toShowTips() {
				this.setData({
					showMoreTips: true
				});
			},

			//关闭加入小程序帮助
			closeAllTips() {
				this.setData({
					showMoreTips: false,
					showTips: false
				});
			},

			// 获取数据
			loadData: function(city) {
				var warehouse_id = common.getStorageSync('warehouse_id');

				if (city) {
					if (city.warehouse_id != warehouse_id) {
						this.getAdvertisement();
					}

					common.setStorageSync('warehouse_id', city.warehouse_id);
				}

				var that = this;
				// 全部接口回调完成后停止下拉动画
				// that.getScKillList(), that.getDate(), that.getActivitylist(), that.getSubjuctList(), that.getActivitynewperson(),
				Promise.all([that.getpickuplistr(), that.getAd(), that.getBar(), that.getsingleAd(), that.getIndexProducts(), that
					.getHomeSituation()
				]).then(function(res) {
					if (!res[0]) {
						common.setStorageSync('reLoad', true);
						that.$options.onShow[0](that)
						return;
					} else {
						wx.stopPullDownRefresh();
					}
				});

				if (wx.createSelectorQuery) {
					wx.createSelectorQuery().select('#topHeight').boundingClientRect(function(rect) {
						if (rect && rect.top) {
							that.setData({
								scrollTop: rect.top // 节点的上边界坐标

							});
						}
					}).exec();
				} else {
					wx.showModal({
						title: '提示1',
						content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
					});
				}
			},

			// 新厂首页获取数据
			getNewFactory(city) {
				var that = this;
				that.getAdvertisement();
				that.getNewAd();
				that.getSubjectAd();
				var uri = app.getPath.newFactory;
				common.ApiGateWayTest(uri, '', true, function(res) {
					var resData = res.data;

					if (resData.success == 1) {
						that.setData({
							newFactoryList: resData.result.data
						});
					} else {
						common.toast(resData.msg);
						return;
					}

					wx.stopPullDownRefresh();
				});
			},

			// 获取首页分享数据
			getIndexShareInfo() {
				var that = this;
				var uri = app.getPath.indexShareInfo;
				var data = {
					type: 5
				};
				common.ApiGateWayTest(uri, data, true, function(res) {
					var resData = res.data;

					if (resData.success == 1) {
						if (resData.result.data != '' && resData.result.data != null) {
							that.setData({
								share_data: resData.result.data
							});
						}
					} else {
						common.toast(resData.msg);
						return;
					}
				});
			},

			// 定位检测
			local: function(callback) {
				var that = this;
				that.setData({
					isAuthorization: common.getStorageSync('authSetting')['scope.userLocation']
				});
				var city = common.getStorageSync('city');
				var pickup = common.getStorageSync('getpickup');
				// console.log('pickup', city);
				if (app.firstlaunchApp && pickup.pickup_id == undefined) {
					// 进入app后首次打开当前页面   没仓库的情况下 先获取地理定位
					if (that.isAuthorization) {
						// 增加加载，防止未加载完当前定位就点击
						common.showLoad(that);
					}
					// console.log('请求定位位置');
					common.getpickup(function(res) {
						var city = res.cities;

						if (city.choose_pickup && city.choose_pickup.length > 1) {
							console.log('if');
							that.setData({
								choosePickupShow: true,
								choosePickupList: city.choose_pickup
							});
							callback && typeof callback === "function" && callback(city);
							common.hideLoad(that);
							return;
						} else {
							// console.log(that);
							common.setStorageSync('reLoad', true);
							that.$options.onShow[0](that)
							callback && typeof callback === "function" && callback(city);
							common.hideLoad(that);
						}
					});
				} else {
					// 有自提点的情况下，直接 取自提点 不重新请求
					// 第二次进入当前页（从选择定位页面进入），直接用仓库地址请求数据
					callback && typeof callback === "function" && callback(city);
				}
			},
			// 打开定位回调
			openSet: function(e) {
				var that = this;
				that.setData({
					isAuthorization: e.detail.isAuthorization
				});
				common.setStorageSync('reLoad', true);
				app.dataBase.isRefresh = true;
				that.$options.onShow[0](that)
			},
			//跳转分类页
			goCategory: function() {
				wx.switchTab({
					url: '/pages/category/category'
				});
			},
			// 获取是否签到
			signcheck: function() {
				var that = this;
				var uri = app.getPath.signcheck;
				return new Promise(function(resolve, reject) {
					common.ApiGateWayTest(uri, {}, true, function(res) {
						if (res && res.data && res.data.success == 1) {
							var data = res.data.result;
							that.setData({
								signcheckStatus: data.status
							});
							resolve('success signcheck');
						}
					});
				});
			},
			to_sign: function() {
				// 判断是否登录或者老用户
				var isOldUser = common.getStorageSync('isOldUser');

				if (!app.checkSessionKey || isOldUser == 2) {
					wx.navigateTo({
						url: '/pages/register/register?isGetCoupon=1'
					});
				}

				var pickup = common.getStorageSync('getpickup');
				// app.aldstat.sendEvent("on_index_floatSign", {
				// 	"提货点": pickup.cityName
				// });

				if (this.signcheckStatus == 0) {
					wx.navigateTo({
						url: "/pages/sign/sign?entryType=external"
					});
				} else if (this.signcheckStatus == 1) {
					wx.navigateTo({
						url: "/packageB/tools/turntable"
					});
				}
			},
			// 获取轮播图
			getAd: function() {

				var that = this;
				var uri = app.getPath.adlist;
				var data = {
					pid: 1
				};
				// console.log(uri, data);
				return new Promise(function(resolve, reject) {

					common.ApiGateWayTest(uri, data, true, function(res) {
						// console.log(res);
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
							console.log('adList', that.adList)
							resolve('successAd');
						}
					});
				});
			},
			// 新版本获取轮播图
			getNewAd: function() {
				var that = this;
				var uri = app.getPath.adlist;
				var data = {
					pid: 6
				};

				return new Promise(function(resolve, reject) {
					common.ApiGateWayTest(uri, data, true, function(res) {
						// console.log('66666666', res);
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
			// 跳转指定	
			goWebView: function(e) {
				// console.log(e.currentTarget.dataset.item.media_type);
				var item = e.currentTarget.dataset.item;
				var type = e.currentTarget.dataset.type;
				console.log('type', type);
				if (type == 1) {
					var pickup = common.getStorageSync('getpickup');
				} else if (type == 2) {
					var pickup = common.getStorageSync('getpickup');
					// console.log(pickup);
				} else if (type == 3) {
					var pickup = common.getStorageSync('getpickup');
				} else if (type == 4) {
					var pickup = common.getStorageSync('getpickup');
				}

				if (item.media_type != 9) {
					common.goAdWebView(e);
					this.adclose(item.ad_id, 0);
					this.setData({
						showAdver: false
					});
				} else if (item.media_type == 9) {
					// if (item.take_type == 2) {
					//   // 点击领取弹窗优惠券
					//   // 判断是否登录或者老用户
					//   var isOldUser = common.getStorageSync('isOldUser');
					//   if (!app.checkSessionKey || isOldUser == 2) {
					//     wx.navigateTo({
					//       url: '/pages/register/register?isGetCoupon=1'
					//     })
					//   }
					//   if (!app.checkSessionKey || isOldUser == 2) {
					//     event.on('isGetCoupon', this, function (data) {
					//       this.getCoupon(item.ad_link, item.ad_id, 2)
					//     })
					//   } else {
					//     this.getCoupon(item.ad_link, item.ad_id, 2)
					//   }
					// }
					// 首页优惠券领券
					var isOldUser = common.getStorageSync('isOldUser');

					if (!app.checkSessionKey || isOldUser == 2) {
						common.goRegister();
						return false;
					} else {
						this.getCoupons(item.ad_id);
					}
				}
			},
			//  限时抢购
			// 时间
			getDate: function() {
				var that = this;
				this.timer = setInterval(function() {
					// 精确到秒
					var timestamp = Math.floor(new Date().getTime() / 1000); // 限时秒杀判断刷新
					// var scKill_idx = that.data.scKill_idx;
					// var btn3 = that.data.scKillList[scKill_idx].progress.start_time/1000 - timestamp;
					// var btn4 = that.data.scKillList[scKill_idx].progress.end_time/1000 - timestamp;
					// if (btn3 == -3 || btn4 == -3){
					//   wx.showLoading({
					//     title: '更新中',
					//     icon: 'none'
					//   })
					//   that.setData({
					//     page: 1,
					//     scKill_list: []
					//   })
					//   that.getScKillList();
					// }
					// 限量抢购判断刷新

					var actived_idx = that.actived_idx;
					var btn1 = that.activitylist[actived_idx].progress.start_time / 1000 - timestamp;
					var btn2 = that.activitylist[actived_idx].progress.end_time / 1000 - timestamp;

					if (btn1 == -3 || btn2 == -3) {
						common.showLoad(that);
						that.setData({
							page: 1,
							good_list: [],
							timer_btn: true
						});
						that.getActivitylist();
					}
				}, 1000);
			},
			// 限时秒杀
			// scKillactived: function (e) {
			//   var that = this;
			//   var d = e.currentTarget.dataset;
			//   // 防止点击过快，重复加载数据
			//   if (!that.data.ac_load_btn) {
			//     return false;
			//   }
			//   that.setData({
			//     scKill_id: d.sckill_id,
			//     scKill_idx: d.sckill_idx,
			//     page: 1,
			//     scKill_list: []
			//   })
			//   that.getSckillgoodslist();
			// },
			// getScKillList:function(){
			//   var that = this;
			//   var uri = app.getPath.scKill;
			//   return new Promise(function (resolve, reject) {
			//     common.ApiGateWayTest(uri, {}, true, function (res) {
			//       var res = res.data;
			//       if (res.success == 1) {
			//         // 先置默认值
			//         var activity_id = 0;
			//         var actived_idx = 0;
			//         var lists = res.result.lists;
			//         // 如果没有数据
			//         if (lists.length == 0) {
			//           // 全清空
			//           that.setData({
			//             scKillList: [],
			//             scKill_id,
			//             scKill_idx,
			//           })
			//           return false;
			//         }
			//         that.getDate();
			//         var btn = true;
			//         for (var i = 0; i < lists.length; i++) {
			//           var state = lists[i].progress.state;
			//           // 判断正在抢购中
			//           if (state == 1) {
			//             activity_id = lists[i].activity_id;
			//             actived_idx = i;
			//             btn = false;
			//             break;
			//           }
			//         }
			//         // 没有判断距离最近的即将开始
			//         if (btn) {
			//           for (var i = 0; i < lists.length; i++) {
			//             var state = lists[i].progress.state;
			//             if (state == 2) {
			//               activity_id = lists[i].activity_id;
			//               actived_idx = i;
			//               btn = false;
			//               break;
			//             }
			//           }
			//         }
			//         // 再无则取中间项
			//         if (btn) {
			//           activity_id = lists[2].activity_id;
			//           actived_idx = 2;
			//         }
			//         that.setData({
			//           scKillList: lists,
			//           scKill_id: activity_id,
			//           scKill_idx:actived_idx
			//         })
			//         that.getSckillgoodslist();
			//         resolve('限时秒杀成功')
			//       }
			//     })
			//   })
			// },
			// getSckillgoodslist(callback){
			//   var that = this;
			//   wx.showLoading({
			//     title: '更新中',
			//     icon: 'none'
			//   })
			//   // 关闭开关
			//   that.data.ac_load_btn = false;
			//   var uri = app.getPath.activitygoodslist;
			//   var data = {
			//     page: 1,
			//     page_size: 2,
			//     activity_id: this.data.scKill_id
			//   }
			//   common.ApiGateWayTest(uri, data, true, function (res) {
			//     if (res.statusCode == 500) {
			//       wx.hideLoading();
			//       return false;
			//     }
			//     var res = res.data;
			//      // 循环活动列表，得到当前选中的状态
			//     var nowState = that.data.scKillList[that.data.scKill_idx];//当前选中的index
			//     for (let i in that.data.scKillList) {
			//       if (that.data.scKillList[i].activity_id == that.data.scKill_id) {
			//         // 当前选中的活动的状态，
			//         var nowState = that.data.scKillList[i].progress.state;
			//       }
			//     }
			//     if (res.success == 1) {
			//       var lists = res.result.lists;
			//       // 给所有的商品列表项添加状态
			//       for (var i = 0; i < lists.length; i++) {
			//         lists[i].state = nowState;
			//       }
			//       var good_list = lists;
			//       // if (good_list.length > 0) {
			//       //   var isGoodListBool = false;
			//       // } else {
			//       //   var isGoodListBool = true;
			//       // }
			//       that.setData({
			//         scKill_list: good_list,
			//         // total: res.result.total,
			//         // isGoodListBool
			//       })
			//       // 打开开关
			//       that.data.ac_load_btn = true;
			//       wx.hideLoading();
			//     }
			//   })
			// },
			// 限量抢购判断选中
			actived: function(e) {
				var that = this;
				var d = e.currentTarget.dataset;

				if (!that.ac_load_btn) {
					return false;
				}

				that.setData({
					activity_id: d.activity_id,
					actived_idx: d.actived_idx,
					page: 1,
					good_list: []
				});
				that.getActivitygoodslist();
			},

			// 获取限量抢购上面部分信息
			getActivitylist() {
				var that = this;
				var uri = app.getPath.activitylist;
				return new Promise(function(resolve, reject) {
					common.ApiGateWayTest(uri, {}, true, function(res) {
						var res = res.data;

						if (res.success == 1) {
							// 先置默认值
							var activity_id = 0;
							var actived_idx = 0;
							var lists = res.result.lists; // 如果没有数据

							if (lists.length == 0) {
								that.setData({
									activitylist: [],
									activity_id,
									actived_idx,
									flashSale_title: ''
								});
								return false;
							}

							that.getDate();
							var flashSale_title = '';
							var btn = true;

							for (var i = 0; i < lists.length; i++) {
								var state = lists[i].progress.state; // 判断正在抢购中

								if (state == 1) {
									activity_id = lists[i].activity_id;
									actived_idx = i; // flashSale_title = lists[i].time + '限量抢购';

									btn = false;
									break;
								}
							} // 没有判断距离最近的即将开始


							if (btn) {
								for (var i = 0; i < lists.length; i++) {
									var state = lists[i].progress.state;

									if (state == 2) {
										activity_id = lists[i].activity_id;
										actived_idx = i; // flashSale_title = lists[i].time + '限量抢购';

										btn = false;
										break;
									}
								}
							} // 再无则取中间项


							if (btn) {
								activity_id = lists[2].activity_id;
								actived_idx = 2; // flashSale_title = lists[2].time + '限量抢购';
							}

							that.setData({
								activitylist: lists,
								activity_id: activity_id,
								actived_idx,
								flashSale_title: '下单无门槛，全场免邮费'
							});
							that.getActivitygoodslist();
							resolve('getActivitylist success');
						}
					});
				});
			},

			// 获取限量抢购商品列表信息
			getActivitygoodslist(callback) {
				var that = this;
				common.showLoad(that); // 关闭开关

				that.ac_load_btn = false;
				var uri = app.getPath.activitygoodslist;
				var data = {
					page: this.page,
					page_size: this.page_size,
					activity_id: this.activity_id
				};
				common.ApiGateWayTest(uri, data, true, function(res) {
					if (res.statusCode == 500) {
						common.hideLoad(that);
						return false;
					}

					var res = res.data;
					var nowState = that.activitylist[that.actived_idx];

					for (let i in that.activitylist) {
						if (that.activitylist[i].activity_id == that.activity_id) {
							var nowState = that.activitylist[i].progress.state;
						}
					}

					if (res.success == 1) {
						var lists = res.result.lists; // 给所有的商品列表项添加状态

						for (var i = 0; i < lists.length; i++) {
							lists[i].state = nowState;
						} // var good_list = [...that.data.good_list, ...lists];


						var good_list = that.good_list ? that.good_list.concat(lists) : lists;

						if (good_list.length > 0) {
							var isGoodListBool = false;
						} else {
							var isGoodListBool = true;
						}

						that.setData({
							good_list: good_list,
							total: res.result.total,
							isGoodListBool
						});

						if (that.good_list.length < that.total) {
							that.refreshFun(true);
						} else {
							that.refreshFun(false);
						} // 打开开关


						that.ac_load_btn = true;
						common.hideLoad(that);
					}
				});
			},

			// 广告图片
			getsingleAd: function() {
				var that = this;
				var uri = app.getPath.adlist;
				var data = {
					pid: 4
				};
				common.ApiGateWayTest(uri, data, true, function(res) {
					if (res && res.data && res.data.success == 1) {
						var data = res.data.result;
						that.setData({
							singleAd: data,
							singleAdcurrent: 0
						});
					}
				});
			},
			// 领取弹窗优惠券-新人
			getCoupon: function(coupon_id, ad_id, take_type) {
				var that = this; // 防止多次点击

				if (!this.AdClickBtn) {
					return false;
				} else {
					this.AdClickBtn = false;
				}

				var uri = app.getPath.addCoupon;
				var data = {
					coupon_id
				};
				common.ApiGateWayTest(uri, data, true, function(res) {
					if (res && res.data && res.data.success == 1) {
						var result = res.data.result; // common.toast(result.state_desc);

						that.adclose(ad_id, 1);
						that.setData({
							showCouponList: true
						});

						if (take_type == 2) {
							that.setData({
								showCloseImg: true
							});
						}
					} else {
						// 防点击开关打开
						that.AdClickBtn = true;
					}
				});
			},

			// 首页领券
			getCoupons(ad_id) {
				var that = this; // 防止多次点击

				if (!this.AdClickBtn) {
					return false;
				} else {
					this.AdClickBtn = false;
				}

				var uri = app.getPath.addAdCoupon;
				var data = {
					ad_id: ad_id
				};
				common.ApiGateWayTest(uri, data, true, function(res) {
					var resData = res.data;

					if (resData.success == 1 && resData.result.state == 0) {
						that.setData({
							popupCouponsList: resData.result.couponInfo,
							showAdver: false,
							showCouponsSuccess: true
						});
					} else {
						that.setData({
							showAdver: false
						});
						that.AdClickBtn = true;
						common.toast(resData.result.state_desc);
						return;
					}
				});
			},

			adclose: function(ad_id, is_close) {
				var that = this;
				var uri = app.getPath.adclose;
				var data = {
					ad_id,
					is_close
				};
				common.ApiGateWayTest(uri, data, true, function(res) {
					return;
				});
			},
			// 弹窗广告
			getAdvertisement: function() {
				var that = this;
				var uri = app.getPath.adlist;
				var data = {
					pid: 5
				};
				common.ApiGateWayTest(uri, data, true, function(res) {
					if (res && res.data && res.data.success == 1) {
						var data = res.data.result;

						if (typeof data == 'object' && data.constructor == Array && data[0].ad_code && data[0].ad_code != '') {
							var pickup = common.getStorageSync('getpickup');
							// app.aldstat.sendEvent("exposure_index_popup", {
							// 	"提货点": pickup.cityName
							// });
							that.setData({
								advertisementAd: data,
								showAdver: true,
								showCouponsSuccess: false
							});
						} else if (data[0].media_type == 9 && data[0].ad_code == '') {
							that.setData({
								advertisementAd: data,
								showAdver: false
							});
							that.getCoupons(data[0].ad_id);
						} else {
							that.setData({
								showAdver: false
							});
						}
					}
				});
			},

			advertisementOut(e) {
				var that = this;
				var ad_id = e.detail.target.dataset.ad_id;

				if (app.checkSessionKey) {
					common.formIdUpdate(e);

					if (ad_id && ad_id > 0) {
						that.adclose(ad_id, 0);
					}
				}

				that.setData({
					showAdver: false,
					showCouponsSuccess: false,
					AdClickBtn: true
				});
			},

			// 获取bar列表
			getBar: function() {
				var that = this;
				var uri = app.getPath.barList;
				return new Promise(function(resolve, reject) {
					common.ApiGateWayTest(uri, '', true, function(res) {
						if (res && res.data && res.data.success == 1) {
							var data = res.data.result;

							for (var i = 0; i < data.barList.length; i++) {
								// 	类型（1.签到 2.领券中心 3.专题 4.活动页 5.限时抢购 6.门店支付 7.通用活动 8.砍价活动）
								switch (data.barList[i].type) {
									case 1:
										data.barList[i].url = '/pages/sign/sign?entryType=external';
										break;

									case 2:
										data.barList[i].url = '/pages/couponCenter/couponCenter?entryType=external';
										break;

									case 3:
										if (data.barList[i].position > 0) {
											data.barList[i].url = '/pages/index/configureModelPage/configureModelPage?position=' + data.barList[i].position;
										} else {
											data.barList[i].url = '/pages/projectPage/projectPage?entryType=external&type=3&id=' + data.barList[i].id;
										}

										break;

									case 4:
										data.barList[i].url = '/pages/activity/activity?entryType=external&activity_id=' + data.barList[i].id; // data.barList[i].url = '/packageA/select/select?id='+66;

										break;

									case 5:
										data.barList[i].url = '/pages/flashSale/flashSale';
										break;

									case 6:
										data.barList[i].url = '../../packageB/topay/topay';
										break;

									case 7:
										data.barList[i].url = '/packageA/select/select?entryType=external&id=' + data.barList[i].id;
										break;

									case 8:
										data.barList[i].url = '/packageA/bargain/bargain?entryType=external&activity_bargain_id=' + data.barList[
											i].id;
										break;

									default:
										data.barList[i].url = '';
								}
							}

							that.setData({
								barList: data.barList,
								service_title: data.service_title
							});
							resolve('barSuccess');
						} else {
							common.toast('网络错误');
						}
					});
				});
			},
			goBar: function(e) {
				let url = e.currentTarget.dataset.url;
				let index = e.currentTarget.dataset.index;
				var pickup = common.getStorageSync('getpickup');
				console.log(url);
				if (app.checkSessionKey) {
					common.formIdUpdate(e);
				}

				// app.aldstat.sendEvent("on_index_tabbar_" + (Number(index) + 1), {
				// 	"提货点": pickup.cityName
				// });
				wx.navigateTo({
					url: url
				});
			},
			// 获取新人活动列表
			getActivitynewperson: function() {
				var that = this;
				var uri = app.getPath.activitynewperson;
				return new Promise(function(resolve, reject) {
					common.ApiGateWayTest(uri, '', true, function(res) {
						if (res && res.data && res.data.success == 1) {
							var data = res.data.result;
							that.setData({
								acticity_new_person: data.acticity_new_person
							});
							resolve('barSuccess');
						}
					});
				});
			},
			// 获取抢购接口
			getActivityindex: function() {
				var that = this;
				var uri = app.getPath.activityindex;
				return new Promise(function(resolve, reject) {
					common.ApiGateWayTest(uri, '', true, function(res) {
						if (res && res.data && res.data.success == 1) {
							var data = res.data.result;
							that.setData({
								acticity_buy: data.acticity_buy
							});
							resolve('barSuccess');
						} else {
							common.toast('网络错误');
						}
					});
				});
			},
			// 首页专题列表
			// getSubjuctList:function(){
			//     var that = this;
			//     var uri = app.getPath.subjuctList;
			//     return new Promise(function (resolve, reject) {
			//         common.ApiGateWayTest(uri, '', true, function (res) {
			//             if (res && res.data && res.data.success == 1) {
			//                 var data = res.data.result.subjectList;
			//                 that.setData({subjuctList:data})
			//               resolve('subjuctListSuccess');
			//             } else {
			//                 common.toast('网络错误');
			//             }
			//         })
			//     })
			// },
			// 获取精选推荐
			getIndexProducts: function(page) {
				var that = this;
				var uri = app.getPath.goodsRecommend;
				var data = {
					page: this.page,
					page_size: this.page_size
				};
				return new Promise(function(resolve, reject) {
					common.ApiGateWayTest(uri, data, true, function(res) {
						if (res && res.data) {
							var data = res.data;

							if (data.success == 1) {
								var list = data.result.products; // var imglist = data.result.products;
								// var list = [];
								// var dataList = [];
								// for(var i in imglist){
								//   list.push(imglist[i]);
								//   if((Number(i)+1)%2 == 0){
								//     dataList.push(list);
								//     list = [];
								//   }
								//   if(i == imglist.length-1 && list.length > 0){
								//     dataList.push(list);
								//   }
								// }
								// that.setData({
								//   shopList: that.data.shopList.concat(dataList)
								// })

								that.setData({
									shopList: that.shopList.concat(list)
								});
								//把请求过来的值传给子组件,每一次下拉这个值都会改变that.shopList
								// uni.$emit('shopList', that.shopList)
								// console.log(that.shopList)
								if (data.result.products.length < that.page_size) {
									that.refreshFun(false);
									that.setData({
										showBottomLoading: false
									});
								} else {
									that.refreshFun(true);
									that.setData({
										showBottomLoading: true
									});
								}
							} else if (data.success == 0) {
								that.refreshFun(false);
							}

							resolve('productsSuccess');
						} else {
							common.toast('网络错误');
						}
					});
				});
			},
			// 是否允许上拉加载
			refreshFun: function(data) {
				this.setData({
					refresh: data
				});
			},
			// 去搜索页面
			goSearch: function() {
				wx.navigateTo({
					url: '../search/search?keyWord=' + this.keyWord
				});
			},
			tap_to_top: function() {
				wx.pageScrollTo({
					scrollTop: 0,
					duration: 300
				});
			},
			// 滚动判断
			onPageScroll: function(e) {
				var that = this;
				const query = wx.createSelectorQuery();
				query.select('#slider-bar-team').boundingClientRect(res => {
					if (res && res.top) {
						if (res.top < that.navBarHeight && !that.sliderBarFixed) {
							that.setData({
								sliderBarFixed: true
							});
						} else if (res.top > that.navBarHeight && that.sliderBarFixed) {
							that.setData({
								sliderBarFixed: false
							});
						}
					}
				}).exec();

				if (e.scrollTop > 150 && !that.to_top) {
					that.setData({
						to_top: true
					});
				} else if (e.scrollTop < 150 && that.to_top) {
					that.setData({
						to_top: false
					});
				}

				if (!this.takeoutAnimation) {
					this.setData({
						takeoutAnimation: true
					});
				} else {
					this.endScroll();
				} // if (e.scrollTop > that.data.scrollTop) {
				//   this.setData({
				//     showSearchBG: true
				//   })
				// } else {
				//   this.setData({
				//     showSearchBG: false
				//   })
				// }

			},
			endScroll: function() {
				clearTimeout(this.scroll);
				this.scroll = setTimeout(function() {
					if (this.takeoutAnimation) {
						this.setData({
							takeoutAnimation: false
						});
					}
				}.bind(this), 500);
			},

			//
			// 跳转商品页
			goToProduct(e) {
				var goodsid = e.currentTarget.dataset.goodsId;
				var goodsName = e.currentTarget.dataset.name;
				var pickup = common.getStorageSync('getpickup');
				// app.aldstat.sendEvent("on_index_rushToBuy", {
				// 	"提货点": pickup.cityName,
				// 	"名称": goodsName,
				// 	"提货点&名称": pickup.cityName + "_" + goodsName
				// });

				if (app.checkSessionKey) {
					common.formIdUpdate(e);
				}

				wx.navigateTo({
					url: '/pages/product/product?entryType=external&productId=' + goodsid
				});
			},

			// SKU弹窗
			setModalStatus: function(type) {
				if (this.showSKUstatus == 0) {
					this.showSKUstatus = 1;
				} else {
					this.showSKUstatus = 0;
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

				if (this.showSKUstatus == 1) {
					this.setData({
						showModalStatus: true
					});
				}

				setTimeout(function() {
					animation.translateY(0).step();
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
			//添加到购物车
			addShopCart: function(e) {
				// 未登录跳转
				var isOldUser = common.getStorageSync('isOldUser');

				if (!app.checkSessionKey || isOldUser == 2) {
					common.goRegister();
					return false;
				}

				var that = this;

				if (this.productid == e.target.dataset.productid) {
					addCart(e);
				} else {
					this.loadProductDetail(e).then(function() {
						addCart(e);
					});
				}

				function addCart(e) {
					if (!that.checkCanPurchase()) return;
					var product = that.itemData;
					var type = e.currentTarget.dataset.type;
					that.setData({
						buy_now: 0
					}); // type == 'addcart' &&

					if (that.currentAttrs.length == product.properties.length) {
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

						var invurl = app.getPath.addCart;

						if (product.pre_info && product.pre_info.is_pre == 1) {
							invurl = app.getPath.addCart;
						}

						var invdata = {
							goods_id: product.goods_id,
							sku_key: product_id,
							amount: that.buynum
						};
						// app.aldstat.sendEvent("加入购物车", {
						// 	"商品名称": that.itemData.report.goods_name,
						// 	"用户名": that.itemData.report.nick_name
						// });
						common.formIdUpdate(e);
						common.ApiGateWayTest(invurl, invdata, true, function(ret) {
							if (!ret) return;

							if (ret.data.success != 0) {
								that.currentAttrs = [];
								that.setData({
									cartAmount: ret.data.result.cart_num,
									productid: 0
								});
								common.toast(ret.data.msg);

								if (type == 'bottomcart') {
									that.setData({
										showModalStatus: false,
										showSKUstatus: 0
									});
								}
							} else {
								common.toast(ret.data.msg);
								return;
							}
						});
					} else {
						// type != 'addcart' ||
						if (that.showSKUstatus == 0) {
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
				}
			},
			// 立即购买
			nowPurchase: function(e) {
				var that = this; // 跳转登录

				var isOldUser = common.getStorageSync('isOldUser');

				if (!app.checkSessionKey || isOldUser == 2) {
					common.goRegister();
					return false;
				}

				if (that.productid == e.target.dataset.productid) {
					nowPurchaseSub(e);
				} else {
					that.loadProductDetail(e).then(function() {
						nowPurchaseSub(e);
					});
				}

				function nowPurchaseSub(e) {
					if (!that.checkCanPurchase()) return;
					var product = that.itemData;
					that.setData({
						buy_now: 1
					});

					if (that.currentAttrs.length == product.properties.length) {
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
						// 	"商品名称": that.itemData.report.goods_name,
						// 	"用户名": that.itemData.report.nick_name
						// });
						common.formIdUpdate(e);
						common.ApiGateWayTest(invurl, invdata, true, function(ret) {
							if (!ret) return;

							if (ret.data.result.is_enough != 1) {
								common.toast(ret.data.result.msg);
								return;
							} else {
								that.currentAttrs = []; // showSKUstatus 0关闭  1展开  重置为关闭

								that.setData({
									showModalStatus: false,
									showSKUstatus: 0,
									cartAmount: ret.data.result.cart_num,
									productid: 0
								});
								wx.navigateTo({
									url: '/pages/confirm/confirm'
								});
							}
						});
					} else {
						if (that.showSKUstatus == 0) {
							that.setModalStatus();
							that.setData({
								showfwModalStatus: false,
								showShareModalStatus: false,
								showBonusModal: false
							});
						} else {
							common.toast('请选择商品款式');
						}
					} // 立即购买的缓存


					common.setStorage({
						key: "nowPay",
						data: that.confirmData
					});
				}
			},
			// 商品详情数据获取
			loadProductDetail: function(e) {
				var productid = e.target.dataset.productid;
				this.setData({
					productid: e.target.dataset.productid
				});
				var that = this;
				common.showLoad(that);
				var uri = app.getPath.goodsInfo;
				var skuAmounturi = app.getPath.getSkuAmount;
				var data = {
					goods_id: productid
				};
				return new Promise(function(resolve, reject) {
					common.ApiGateWayTest(uri, data, true, function(res) {
						if (res.statusCode == 200) {
							var productlist = res.data.result; // productlist.min_buy_amount = productlist.min_buy_amount ? productlist.min_buy_amount : 1;

							var content = productlist.goods_content;
							var introContent = productlist.detail_explain;
							var islike = productlist.is_liked;
							productlist.current_price = productlist.shop_price;
							productlist.price = productlist.market_price; // WxParse.wxParse('content', 'html', content, that, 0);
							// WxParse.wxParse('introContent', 'html', introContent, that, 0);

							that.setData({
								itemData: productlist,
								bannerItem: productlist.gallery,
								indicatorDots: productlist.gallery.length > 1 ? true : false,
								buynum: productlist.min_buy_amount,
								// isLike: islike,
								brandID: productlist.cat_id,
								skuSvipCurrent: productlist.shop_price,
								skuCurrent: productlist.market_price
							});
							that.setDefaultSKU(productlist); // that.loadipRecommend();
							// that.getGoodsRecommend();

							that.isPriceEqualFun();
							common.hideLoad(that);
						} else if (res.statusCode == 500) {
							common.hideLoad(that);
							return;
							common.toast("网络错误");
						} else {
							common.hideLoad(that);
							common.toast("获取购物车数量失败");
						}

						resolve('获取商详信息');
					});
					common.ApiGateWayTest(skuAmounturi, '', true, function(res) {
						if (res.statusCode == 200) {
							that.setData({
								cartAmount: res.data.result.cart_num
							});
						}
					});
				});
			},
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
					skuSvipCurrent: parseFloat(skuSvipCurrent).toFixed(2),
					skuCurrent: skuCurrent,
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
						skuSvipCurrent: that.itemData.current_price,
						skuCurrent: that.itemData.price
					});
					that.setAttrsClass();
					return;
				}

				var choosed_sku = '';
				var sku_price = 0;
				var sku_svip_price = 0;
				var skuSvipCurrent = that.itemData.current_price;
				var skuCurrent = that.itemData.price;
				that.setData({
					choosed_sku: choosed_sku,
					sku_price: sku_price,
					sku_svip_price: sku_svip_price,
					skuSvipCurrent: skuSvipCurrent,
					skuCurrent: skuCurrent
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
					var skuSvipCurrent = sku_svip_price;
					var skuCurrent = sku_price;
					that.setData({
						choosed_sku: choosed_sku,
						sku_price: sku_price,
						sku_svip_price: sku_svip_price,
						skuSvipCurrent: skuSvipCurrent,
						skuCurrent: skuCurrent,
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

			gzhBindload(e) {
				if (e.detail.status != 0) {
					this.setData({
						showOfficial: false
					});
				}
			},

			getConfigureIndexModel2: function() {
				var that = this;
				var uri = app.getPath.indexmodel;
				var data = {
					position: 3
				};
				common.ApiGateWayTest(uri, data, true, function(res) {
					if (res && res.data && res.data.success == 1) {
						that.setData({
							indexModel2: res.data.result.lists
						});
					}
				});
			},
			getConfigureIndexModel: function() {
				var that = this;
				var uri = app.getPath.indexmodel;
				var data = {
					position: 1
				};
				common.ApiGateWayTest(uri, data, true, function(res) {
					if (res && res.data && res.data.success == 1) {
						that.setData({
							indexModel: res.data.result.lists
						});
					}
				});
			},

			//获取首页团购
			getPickUpAcitivity(city) {
				var that = this;
				Promise.all([that.getpickuplistr()]).then(function(res) {
					if (!res[0]) {
						common.setStorageSync('reLoad', true);
						that.$options.onShow[0](that)
						return;
					} else {
						that.getNewAd();
						that.getSubjectAd();
						that.bargain_page = 1;
						that.bargain_page_size = 20;
						that.team_page = 1;
						that.team_page_size = 20;
						that.be_team_page = 1;
						that.be_team_page_size = 20;
						that.teamList = [];
						that.beTeamList = [];
						that.bargainList = [];
						that.teamGoodsList = [];
						that.getAllActivity();
						wx.stopPullDownRefresh();
					}
				}); // common.ApiGateWayTest(url,"",true,function (res) {
				//       var res=res.data
				//     if(res.success==1){
				//       let pickUpArr = res.result.data;
				//       that.setData({
				//         pickUpActivity: pickUpArr
				//       })
				//       if (that.data.teamNum == 0) {
				//         that.setData({
				//           teamGoodsList: pickUpArr.team_in_progress.goods_list
				//         })
				//       } else if (that.data.teamNum == 1) {
				//         that.setData({
				//           teamGoodsList: pickUpArr.bargain_in_progress.goods_list
				//         })
				//       } else if (that.data.teamNum == 2) {
				//         that.setData({
				//           teamGoodsList: pickUpArr.be_team.goods_list
				//         })
				//       }
				//   } else {
				//     common.toast(res.msg);
				//     return
				//   }
				//   wx.stopPullDownRefresh()
				// })
			},

			getAllActivity() {
				let that = this;

				if (that.teamNum == 0) {
					console.log('获取首页拼团信息');
					that.getTeamList();
				} else if (that.teamNum == 1) {
					that.getBargainActivity();
				} else if (that.teamNum == 2) {
					that.getBeTeamList();
				}
			},

			// 选择提货点(重叠提货点)
			choosePickupChange(e) {
				this.setData({
					chooseSelectIndex: e.currentTarget.dataset.index
				});
			},

			// 设置提货点(重叠提货点)
			choosePickupSubmit() {
				this.setData({
					choosePickupShow: false
				});
				common.setStorageSync('getpickup', this.choosePickupList[this.chooseSelectIndex ? this.chooseSelectIndex : 0]);
				common.setStorageSync('reLoad', true);
				this.$options.onShow[0](this)
			},

			// 前往领取纸巾
			goTissue(e) {
				common.formIdUpdate(e);
				var url =
					'https://share.lltjs.com/app/index.php?i=2&c=entry&from=account&account=a450f613484aea3458ac7a7eba952d720d671557&xid=&do=entry&m=llt_afan';
				app.dataBase.pageUrl = url;
				common.goWebview();
				this.setData({
					showTissue: false
				});
			},

			// 跳转店铺
			goTakeoutShop() {
				var that = this;
				wx.navigateTo({
					url: '/packageA/takeout-shop/takeout-shop?entryType=external&shop_id=' + that.shop_id
				});
			},

			// 获取店铺id
			getShopPickUp() {
				var that = this;
				var url = app.getPath.getShopPickUp;
				common.ApiGateWayTest(url, '', true, function(res) {
					var res = res.data;

					if (res.success == 1) {
						that.setData({
							shop_id: res.result.shop_id
						});
					}
				});
			},

			// 首页弹窗领红包
			getPacket() {
				this.setData({
					showPacketAd: false,
					showPacketCoupon: true
				});
			},

			// 关闭弹窗红包广告
			hide_packet_ad() {
				this.setData({
					showPacketAd: false
				});
			},

			hide_packet_coupon() {
				this.setData({
					showPacketCoupon: false
				});
			},

			// 获取首页专题广告
			getSubjectAd() {
				var that = this;
				var uri = app.getPath.adlist;
				var data = {
					pid: 9
				};
				return new Promise(function(resolve, reject) {
					common.ApiGateWayTest(uri, data, true, function(res) {
						if (res && res.data && res.data.success == 1) {
							var data = res.data.result;
							that.setData({
								subjectAdList: data
							});
							resolve('successAd');
						}
					});
				});
			},

			// 获取首页弹窗广告
			getPacketModal() {
				var that = this;
				var uri = app.getPath.adlist;
				var data = {
					pid: 10
				};
				return new Promise(function(resolve, reject) {
					common.ApiGateWayTest(uri, data, true, function(res) {
						if (res && res.data && res.data.success == 1) {
							var data = res.data.result;
							that.setData({
								packetModal: data
							});
							resolve('successAd');
						}
					});
				});
			},

			// 切换活动tab
			change_team_tab(e) {
				let that = this;
				let num = e.currentTarget.dataset.num;
				if (num == that.teamNum) return;
				common.showLoad(that);
				this.setData({
					teamNum: num
				});
				this.bargain_page = 1;
				this.bargain_page_size = 20;
				this.team_page = 1;
				this.team_page_size = 20;
				this.be_team_page = 1;
				this.be_team_page_size = 20;
				this.teamList = [];
				this.beTeamList = [];
				this.bargainList = [];
				this.teamGoodsList = [];
				this.setData({
					checkShowBottom: false,
					showBottomLoading: false
				});

				if (that.sliderBarFixed) {
					if (common.compareVersion('2.3.1') >= 0) {
						wx.pageScrollTo({
							selector: '#slider-bar-team'
						});
					} else {
						wx.pageScrollTo({
							scrollTop: 0
						});
					}
				}

				that.getAllActivity();
			},

			//获取首页拼团信息
			getTeamList() {
				console.log('获取首页拼团信息');
				let that = this;
				let url = app.getPath.getTeamActivity;
				let data = {
					page: that.team_page,
					page_size: that.team_page_size,
					type: 1
				};
				common.ApiGateWayTest(url, data, true, function(res) {
					console.log('获取首页拼团信息', res);
					var resData = res.data;

					if (resData.success === 1) {
						if (resData.result.data.length < that.team_page_size) {
							that.setData({
								checkShowBottom: true
							});
						}

						let teamList = that.teamList;
						that.teamList = teamList.length > 0 ? [...teamList, ...resData.result.data] : resData.result.data;
						that.teamList = that.teamList.map(item => {
							item.shop_price = parseFloat(item.shop_price);
							item.market_price = parseFloat(item.market_price);
							return item;
						});
						that.setData({
							showBottomLoading: false,
							teamGoodsList: that.teamList
						});
						console.log('teamGoodsList', that.teamGoodsList);
						common.hideLoad(that);
					}
				});
			},

			// 获取首页砍价信息
			getBargainActivity() {

				let that = this;
				let url = app.getPath.getBargainActivity;
				let data = {
					page: that.bargain_page,
					page_size: that.bargain_page_size
				};
				common.ApiGateWayTest(url, data, true, function(res) {

					var resData = res.data;

					if (resData.success === 1) {
						if (resData.result.data.length < that.bargain_page_size) {
							that.setData({
								checkShowBottom: true
							});
						}

						let bargainList = that.bargainList;
						that.bargainList = bargainList.length > 0 ? [...bargainList, ...resData.result.data] : resData.result.data;
						that.bargainList = that.bargainList.map(item => {
							item.shop_price = parseFloat(item.shop_price);
							item.market_price = parseFloat(item.market_price);
							return item;
						});
						that.setData({
							showBottomLoading: false,
							teamGoodsList: that.bargainList
						});
						common.hideLoad(that);
					}
				});
			},



			//获取首页即将拼团信息
			getBeTeamList() {
				let that = this;
				let url = app.getPath.getTeamActivity;
				let data = {
					page: that.be_team_page,
					page_size: that.be_team_page_size,
					type: 2
				};
				common.ApiGateWayTest(url, data, true, function(res) {
					var resData = res.data;

					if (resData.success === 1) {
						if (resData.result.data.length < that.team_page_size) {
							that.setData({
								checkShowBottom: true
							});
						}

						let beTeamList = that.beTeamList;
						that.beTeamList = beTeamList.length > 0 ? [...beTeamList, ...resData.result.data] : resData.result.data;
						that.beTeamList = that.beTeamList.map(item => {
							item.shop_price = parseFloat(item.shop_price);
							item.market_price = parseFloat(item.market_price);
							return item;
						});
						that.setData({
							showBottomLoading: false,
							teamGoodsList: that.beTeamList
						});
						common.hideLoad(that);
					}
				});
			},

			// 新厂首页轮播改变触发
			newSwiperChange(e) {
				this.setData({
					indexAdcurrent: e.detail.current
				});
			},

			// 红包-获取左侧提示信息
			getHomeSituation() {
				var that = this;
				var url = app.getPath.sureHomeSituation;
				common.ApiGateWayTest(url, '', true, function(res) {
					var resData = res.data;

					if (resData.success == 1) {
						that.setData({
							homeSituation: resData.result
						});
						var entry_share_info = {
							user_id: resData.result.user_id,
							invite_share_img: resData.result.invite_share_img,
							invite_share_text: resData.result.invite_share_text,
							urge_share_img: resData.result.urge_share_img,
							urge_share_text: resData.result.urge_share_text,
							rule_img: resData.result.rule_img
						};
						common.setStorageSync('entry_share_info', entry_share_info);
					}
				});
			},

			// 红包-左侧点击跳转（领红包）
			getEnvelopes(e) {
				var item = e.currentTarget.dataset.item;
				var that = this;
				var pickupId = common.getStorageSync('getpickup');
				// app.aldstat.sendEvent("index_urging_report", {
				// 	"提货点": pickupId.cityName
				// });

				if (item.status == 2 || item.status == 3) {
					wx.navigateTo({
						url: '/packageB/invitation-share/invitation-share?type=2'
					});
				} else if (item.status == 4) {
					wx.navigateTo({
						url: '/packageB/invitation-share/invitation-share?type=1'
					});
				} else if (item.status == 1) {
					that.setData({
						showRedEnvel: true,
						showRedEnvelType: item.status
					});
				}
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

			// 红包-邀请分享进入
			setInviteShareLogin() {
				var that = this;
				var url = app.getPath.inviteShareLogin;
				var shareTicket_info = common.getStorageSync('shareTicket_info');

				if (shareTicket_info && shareTicket_info != '') {
					wx.getShareInfo({
						shareTicket: shareTicket_info.shareTicket,
						success: function(res) {
							var data = {
								user_id: shareTicket_info.query.user_id,
								wx_scene: shareTicket_info.scene,
								encrypted_data: JSON.stringify(res)
							};
							common.ApiGateWayTest(url, data, true, function(res) {
								var resData = res.data;

								if (resData.result.success) {
									common.setStorageSync('shareTicket_info', '');
								}
							});
						},
						fail: function(res) {
							var data = {
								user_id: shareTicket_info.query.user_id,
								wx_scene: shareTicket_info.scene,
								encrypted_data: ''
							};
							common.ApiGateWayTest(url, data, true, function(res) {
								var resData = res.data;

								if (resData.result.success) {
									common.setStorageSync('shareTicket_info', '');
								}
							});
						}
					});
				}
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
									getRemind: true,
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
			// 重新获取提货点信息
			getpickuplistr: function() {
				var that = this;
				var uri = app.getPath.pickupInfo;
				var pickupId = common.getStorageSync('getpickup');
				return new Promise(function(resolve, reject) {
					common.ApiGateWayTest(uri, '', true, function(res) {
						var resData = res.data;

						if (resData.success == 1) {
							if (resData.result.pickup_type != pickupId.pickup_type) {
								common.setStorageSync('getpickup', resData.result);
								resolve(false);
							} else {
								resolve(true);
							}
						} else {
							reject();
						}
					});
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
<style lang="scss">
	@import "./index.css";
</style>
