<template>
    <a-back-top />
    <main-title :imgSrc="require('@/assets/图4.jpg')" title="报 刊 介 绍" :background-pos="[0, -23]" />
    <div class="container">
        <a-row justify="center">
            <a-radio-group v-model:value="selected" button-style="solid" @change="selectChange">
                <a-radio-button v-for="name in names" :key="name" :value="name">
                    {{ name }}
                </a-radio-button>
            </a-radio-group>
        </a-row>
        <a-row style="margin-top: 5vh; min-height: 50vh;" justify="center" :gutter="[16, 32]">
            <a-col :span="14">
                <a-row :gutter="[32, 32]">
                    <a-col :span="24">
                        <a-typography-title :level="3">
                            {{ content.data.name }}
                        </a-typography-title>
                    </a-col>
                    <a-col :span="24">
                        <a-typography>{{ content.data.description }}</a-typography>
                    </a-col>
                    <a-col :span="16" v-if="content.data.imgsrc && content.data.imgsrc !== ''">
                        <a-image :src="'/image/Newspaper/' + content.data.imgsrc"></a-image>
                    </a-col>
                    <a-col :span="8" v-if="content.data.href !== null && content.data.href !== ''">
                        <a-button type="primary" shape="round" @click="jumpTo(content.data.href)">
                            <template #icon>
                                <left-circle-outlined />
                            </template>
                            前往官网
                        </a-button>
                    </a-col>
                </a-row>
            </a-col>
            <a-col :span="10" v-if="content.data.posx != -1">
                <baidu-map :posx="content.data.posx" :posy="content.data.posy" :title="content.data.name"
                    :description="content.data.brief"></baidu-map>
            </a-col>
        </a-row>
    </div>
</template>

<script>
import BaiduMap from "@/components/BaiduMap.vue";
import MainTitle from "@/components/MainTitle.vue";
import { defineComponent, getCurrentInstance, reactive, ref } from "vue";
import { message } from 'ant-design-vue';
import { LeftCircleOutlined } from "@ant-design/icons-vue";

export default defineComponent({
    name: 'NewspaperView',
    emits: ['navChanged'],
    components: {
        BaiduMap,
        MainTitle,
        LeftCircleOutlined,
    },
    methods: {
        jumpTo(target) {
            window.open(target, '_blank');
        },
        selectChange() {
            this.$http.get("/newspaper/" + this.selected)
                .then(response => {
                    let res = response.data;
                    if (res.code === 200) {
                        this.content.data = res.result;
                        this.content.data["brief"] = this.processBrief();
                    }
                    else {
                        message.error('Unexpected error happend:' + res.message);
                    }
                })
                .catch(error => {
                    message.error('Unexpected error happend:' + error);
                });
        }
    },
    setup(_, context) {
        context.emit('navChanged', 4);

        const { appContext } = getCurrentInstance();
        const $http = appContext.config.globalProperties.$http;

        const content = reactive({
            data: {},
        });
        const names = ref([]);

        const selected = ref("");

        const processBrief = () => {
            let t = "";
            if (content.data.time !== null && content.data.time.length > 0)
                t += `<pre>创刊时间：${content.data.time}</pre>`;

            if (content.data.location !== null && content.data.location.length > 0)
                t += `<pre>地址：${content.data.location}</pre>`;

            return t;
        }

        $http.get("/newspaper/").then(
            response => {
                let res = response.data;
                if (res.code === 200) {
                    names.value = res.result.names;
                    content.data = res.result.first;
                    selected.value = content.data.name;
                    content.data["brief"] = processBrief();
                }
                else {
                    message.error('Unexpected error happend:' + res.message);
                }
            })
            .catch(error => {
                message.error('Unexpected error happend:' + error);
            });


        return {
            content,
            names,

            selected,
            processBrief,
        }
    }
});
</script>

<style scoped>
.container {
    padding-left: 10%;
    padding-right: 10%;
    padding-top: 5vh;
    padding-bottom: 5vh;
}
</style>