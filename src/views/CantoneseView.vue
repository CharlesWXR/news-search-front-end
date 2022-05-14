<template>
    <main-title :imgSrc="require('@/assets/图5.jpg')" title="词 说 粤 语"></main-title>
    <div class="container">
        <a-list item-layout="horizontal" :data-source="elements.data">
            <template #renderItem="{ item }">
                <a-list-item>
                    <a @click="jumpTo(item.href)">{{ item.title }}</a>
                </a-list-item>
            </template>
        </a-list>
    </div>
</template>
<script>
import { reactive, defineComponent, getCurrentInstance } from "vue";
import MainTitle from "@/components/MainTitle.vue";
import { message } from 'ant-design-vue';

export default defineComponent({
    name: 'CantoneseView',
    components: {
        MainTitle,
    },
    emits: ['navChanged'],
    methods: {
        jumpTo(newAddr) {
            window.open(newAddr, '_blank');
        }
    },
    setup(_, context) {
        context.emit('navChanged', 5);
        const { appContext } = getCurrentInstance();
        const $http = appContext.config.globalProperties.$http;

        const elements = reactive({
            data: []
        })

        $http.get("/cantonese/").then(
            response => {
                let res = response.data;
                if (res.code === 200) {
                    elements.data = res.result;
                }
                else {
                    message.error('Unexpected error happend:' + response.message);
                }
            }).catch(error => {
                message.error('Unexpected error happend:' + error);
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