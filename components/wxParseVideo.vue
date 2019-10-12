<template>

    <!--增加video标签支持，并循环添加-->
    <view :class="item.classStr + ' wxParse-' + item.tag" :style="item.styleStr">
        <video :class="item.classStr + ' wxParse-' + item.tag + '-video'" :src="item.attr.src"></video>
    </view>

</template>

<script>
    export default {
    		name: "wxParseVideo",
    		props: ["item"]
    	}
</script>
