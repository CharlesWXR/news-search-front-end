<template>
    <a-back-top />
    <main-title :imgSrc="require('@/assets/图3.jpg')" title="泛 华 语 地 区 中 文 新 词 榜" :background-pos="[0, -60]">
    </main-title>
    <div class="container">
        <!--a-row justify="center">
            <a-col :span="8" style="text-align: center;">
                <a-typography-title style="color: #337ecc;">泛华语地区中文新词榜</a-typography-title>
            </a-col>
        </a-row-->
        <a-row justify="center">
            <a-col :span="4">
                <a-typography-title :level="3">请选择查询年份：</a-typography-title>
            </a-col>
            <a-col :span="4">
                <a-cascader v-model:value="yearSelected" style="width: 200px" placeholder="请选择年份" :allowClear="false"
                    :options="options">
                </a-cascader>
            </a-col>
        </a-row>

        <a-row justify="center" style="margin-top: 5vh;">
            <a-col :span="18" v-for="(wordgroup, index) in content.data" :key="index">
                <a-card>
                    <template #title>
                        <a-typography-title :level="4">{{ wordgroup.title }}</a-typography-title>
                    </template>
                    <a-card-grid style="width: 20%; text-align: center;" v-for="(word, index) in wordgroup.words"
                        :key="index">
                        {{ word.word }}
                    </a-card-grid>
                </a-card>
            </a-col>
        </a-row>
        <div>

        </div>
        <div v-for="(wordgroup, index) in content.data" :key="index">
            <a-divider />
            <a-typography-title :level="3">{{ wordgroup.title }}</a-typography-title>
            <a-list item-layout="vertical" size="large" :pagination="false" :data-source="wordgroup.words">
                <template #renderItem="{ item }">
                    <a-list-item :key="item.word">
                        <a-list-item-meta>
                            <template #title>
                                <a-typography-title :level="5">{{ item.word }}</a-typography-title>
                            </template>
                        </a-list-item-meta>
                        {{ item.explanation }}
                    </a-list-item>
                </template>
            </a-list>
        </div>
    </div>
</template>
<script>
import { ref, reactive, defineComponent, getCurrentInstance } from 'vue';
import MainTitle from "@/components/MainTitle.vue";
import { message } from 'ant-design-vue';

export default defineComponent({
    name: 'NewWordView',
    emits: ['navChanged'],
    components: {
        MainTitle,
    },
    watch: {
        yearSelected(newYear, oldYear) {
            this.queryForWords(newYear[1]);
        }
    },
    setup(_, context) {
        context.emit('navChanged', 3);
        const { appContext } = getCurrentInstance();
        const $http = appContext.config.globalProperties.$http;

        const yearSelected = ref([2020, 2021]);
        let options = [{
            value: 2020,
            label: '2020年~2021年',
            children: [],
        }, {
            value: 2010,
            label: '2010年~2019年',
            children: [],
        }, {
            value: 2000,
            label: '2000年~2009年',
            children: [],
        }]

        const generateArray = (start, count) => {
            let array = Array.from({ length: count },
                (_, index) => {
                    let t = index + start;
                    return {
                        value: t,
                        label: `${t}年`
                    }
                });
            return array;
        }

        options = options.map(x => {
            if (x.value == 2020)
                x.children = generateArray(2020, 2);
            else if (x.value === 2010)
                x.children = generateArray(2010, 10);
            else if (x.value === 2000)
                x.children = generateArray(2004, 6);
            return x;
        })

        const content = reactive({
            data: [],
        })

        const queryForWords = (year) => {
            $http.get('newword/' + year).then(
                response => {
                    let res = response.data;
                    if (res.code === 200) {
                        content.data = res.result;
                    }
                    else {
                        message.error('Unexpected error happend:' + res.message);
                    }
                })
                .catch(error => {
                    message.error('Unexpected error happend:' + error);
                })
        };

        queryForWords(yearSelected.value[1]);

        return {
            yearSelected,
            options,

            content,
            queryForWords,
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