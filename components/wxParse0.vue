<template>
<view>

    <!--<template is="wxParse1" data="{{item}}" />-->
    <!--判断是否是标签节点-->
    <block v-if="item.node == 'element'">
        <block v-if="item.tag == 'button'">
            <button type="default" size="mini">
                <block v-for="(item, index) in item.nodes" :key="index">
                    <component is="wxParse1" :item="item"></component>
                </block>
             </button>
        </block>
        <!--li类型-->
        <block v-else-if="item.tag == 'li'">
            <view :class="item.classStr + ' wxParse-li'" :style="item.styleStr">
                <view :class="item.classStr + ' wxParse-li-inner'">
                    <view :class="item.classStr + ' wxParse-li-text'">
                        <view :class="item.classStr + ' wxParse-li-circle'"></view>
                    </view>
                    <view :class="item.classStr + ' wxParse-li-text'">
                        <block v-for="(item, index) in item.nodes" :key="index">
                            <component is="wxParse1" :item="item"></component>
                        </block>
                    </view>
                </view>
            </view>
        </block>

        <!--video类型-->
        <block v-else-if="item.tag == 'video'">
            <component is="wxParseVideo" :item="item"></component>  
        </block>

        <!--img类型-->
        <block v-else-if="item.tag == 'img'">
            <component is="wxParseImg" :item="item"></component>
        </block>

        <!--a类型-->
        <block v-else-if="item.tag == 'a'">
            <view @tap="wxParseTagATap" :class="'wxParse-inline ' + item.classStr + ' wxParse-' + item.tag" :data-c="item.attr.href" :style="item.styleStr">
                <block v-for="(item, index) in item.nodes" :key="index">
                    <component is="wxParse1" :item="item"></component>
                </block>
            </view>
        </block>
        <block v-else-if="item.tag == 'table'">
            <view :class="item.classStr + ' wxParse-' + item.tag" :style="item.styleStr">
                <block v-for="(item, index) in item.nodes" :key="index">       
                    <component is="wxParse1" :item="item"></component>                 
                </block>
            </view>
        </block>

        <!--其他块级标签-->
        <block v-else-if="item.tagType == 'block'">
            <view :class="item.classStr + ' wxParse-' + item.tag" :style="item.styleStr">
                <block v-for="(item, index) in item.nodes" :key="index">       
                    <component is="wxParse1" :item="item"></component>                 
                </block>
            </view>
        </block>

        <!--内联标签-->
        <view v-else :class="item.classStr + ' wxParse-' + item.tag + ' wxParse-' + item.tagType" :style="item.styleStr">
            <block v-for="(item, index) in item.nodes" :key="index">       
                <component is="wxParse1" :item="item"></component>                 
            </block>
        </view>

    </block>

    <!--判断是否是文本节点-->
    <block v-else-if="item.node == 'text'">
        <!--如果是，直接进行-->
        <component is="WxEmojiView" :item="item"></component>
    </block>


</view>
</template>

<script>
    export default {
    		name: "wxParse0",
    		props: ["item"]
    	}
</script>
