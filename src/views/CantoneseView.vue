<template>
    <div class="container">
        <a-row :gutter="[8, 24]">
            <a-col :span="6" v-for="(element, index) in elements.data" :key="index">
                <a-card hoverable style="width: 100%;">
                    <template #cover>
                        <a-image :src="element.imgSrc" />
                    </template>
                    <a href="javascript: void(0);" @click="jumpTo(element.href)">
                        <a-card-meta :title="element.title">
                            <template #description>{{ element.brief }}</template>
                        </a-card-meta>
                    </a>
                </a-card>
            </a-col>
        </a-row>
    </div>
</template>
<script>
import { reactive, defineComponent } from "vue";

export default defineComponent({
    name: 'CantoneseView',
    emits: ['navChanged'],
    methods: {
        jumpTo(newAddr) {
            window.open(newAddr, '_blank');
        }
    },
    setup(_, context) {
        context.emit('navChanged', 5);

        const elements = reactive({
            data: [{
                title: "111",
                brief: "222",
                imgSrc: 'image/Cantonese/test1.jpg',
                href: "http://www.baidu.com/"
            }, {
                title: "111",
                brief: "333",
                imgSrc: 'image/Cantonese/test1.jpg',
                href: "http://www.baidu.com/"
            }, {
                title: "111",
                brief: "444",
                imgSrc: 'image/Cantonese/test1.jpg',
                href: "http://www.baidu.com/"
            }, {
                title: "111",
                brief: "444",
                imgSrc: 'image/Cantonese/test1.jpg',
                href: "http://www.baidu.com/"
            }, {
                title: "111",
                brief: "444",
                imgSrc: 'image/Cantonese/test1.jpg',
                href: "http://www.baidu.com/"
            }, {
                title: "111",
                brief: "444",
                imgSrc: 'image/Cantonese/test1.jpg',
                href: "http://www.baidu.com/"
            }, {
                title: "111",
                brief: "444",
                imgSrc: 'image/Cantonese/test1.jpg',
                href: "http://www.baidu.com/"
            }]
        })

        return {
            elements,
        }
    }
})
</script>
<style scoped>
.container {
    padding-left: 10%;
    padding-right: 10%;
    padding-top: 5vh;
}
</style>