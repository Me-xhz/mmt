import Vue from 'vue';
import App from './App';

//砍价、拼团、即将开团的组件
import pickUpGoods from './components/pickUpActivity/pickUpActivity'
Vue.component('pickUpGoods', pickUpGoods);

import loading from "./components/loading/loading";
Vue.component('loading', loading);

import loading2 from "./components/loading2/loading2";
Vue.component('loading2', loading2);

import pageBottomLogo from "./components/pageBottomLogo/pageBottomLogo";
Vue.component('pageBottomLogo', pageBottomLogo);

import pageBottomLogo2 from '@/components/pageBottomLogo2/pageBottomLogo2.vue'
Vue.component('pageBottomLogo2', pageBottomLogo2);

import notice from "./components/notice/notice";
Vue.component('notice', notice);

import envelopes from "./components/envelopes/envelopes";
Vue.component('envelopes', envelopes);

import invitationGuide from "./components/invitationGuide/invitationGuide";
Vue.component('invitationGuide', invitationGuide);

import navbar from "./components/navBar/navBar";
Vue.component('navbar', navbar);

import wxparsevideo from "./components/wxParseVideo.vue";
Vue.component('wxparsevideo', wxparsevideo);

import wxparseimg from "./components/wxParseImg.vue";
Vue.component('wxparseimg', wxparseimg);

import wxemojiview from "./components/WxEmojiView.vue";
Vue.component('wxemojiview', wxemojiview);

import wxparse0 from "./components/wxParse0.vue";
Vue.component('wxparse0', wxparse0);

import wxparse1 from "./components/wxParse1.vue";
Vue.component('wxparse1', wxparse1);

import wxparse2 from "./components/wxParse2.vue";
Vue.component('wxparse2', wxparse2);

import wxparse3 from "./components/wxParse3.vue";
Vue.component('wxparse3', wxparse3);

import wxparse4 from "./components/wxParse4.vue";
Vue.component('wxparse4', wxparse4);

import wxparse5 from "./components/wxParse5.vue";
Vue.component('wxparse5', wxparse5);

import wxparse6 from "./components/wxParse6.vue";
Vue.component('wxparse6', wxparse6);

import wxparse7 from "./components/wxParse7.vue";
Vue.component('wxparse7', wxparse7);

import wxparse8 from "./components/wxParse8.vue";
Vue.component('wxparse8', wxparse8);

import wxparse9 from "./components/wxParse9.vue";
Vue.component('wxparse9', wxparse9);

import wxparse10 from "./components/wxParse10.vue";
Vue.component('wxparse10', wxparse10);

import wxparse11 from "./components/wxParse11.vue";
Vue.component('wxparse11', wxparse11);

import hidebtn from "./components/hideBtn.vue";
Vue.component('hidebtn', hidebtn);

import customizedbtn from "./components/customizedBtn.vue";
Vue.component('customizedbtn', customizedbtn);

import minisubscribebtn from "./components/miniSubscribeBtn.vue";
Vue.component('minisubscribebtn', minisubscribebtn);

import minifollowbtn from "./components/miniFollowBtn.vue";
Vue.component('minifollowbtn', minifollowbtn);

import longsubscribebtn from "./components/longSubscribeBtn.vue";
Vue.component('longsubscribebtn', longsubscribebtn);

import longfollowbtn from "./components/longFollowBtn.vue";
Vue.component('longfollowbtn', longfollowbtn);


Vue.config.productionTip = false;

App.mpType = 'app';

const app = new Vue({
    ...App
});
app.$mount();
