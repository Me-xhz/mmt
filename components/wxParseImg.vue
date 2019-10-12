<template>

    <image lazy-load="true" :class="item.classStr + ' wxParse-' + item.tag" :data-from="item.from" :data-src="item.attr.src" :data-idx="item.imgIndex" :src="item.attr.src" mode="aspectFit" @load="wxParseImgLoad" @tap="wxParseImgTap" :style="'width:' + item.width + 'px;'"></image>

</template>

<script>
    export default {
    		name: "wxParseImg",
    		props: ["item"]
    	}
</script>
