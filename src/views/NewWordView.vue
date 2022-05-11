<template>
    <a-back-top />
    <div class="container">
        <a-row justify="center">
            <a-col :span="8" style="text-align: center;">
                <a-typography-title style="color: #337ecc;">泛华语地区中文新词榜</a-typography-title>
            </a-col>
        </a-row>
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
        <a-row justify="center">
            <a-col :span="18">
                <a-card>
                    <template #title>
                        <a-typography-title :level="4">港京台</a-typography-title>
                    </template>
                    <a-card-grid style="width: 20%; text-align: center;" v-for="(brief, index) in content.brief['gjt']"
                        :key="index">{{ brief }}
                    </a-card-grid>
                </a-card>
            </a-col>
            <a-col :span="18">
                <a-card>
                    <template #title>
                        <a-typography-title :level="4">香港</a-typography-title>
                    </template>
                    <a-card-grid style="width: 20%; text-align: center;" v-for="(brief, index) in content.brief['xg']"
                        :key="index">{{ brief }}
                    </a-card-grid>
                </a-card>
            </a-col>
            <a-col :span="18">
                <a-card>
                    <template #title>
                        <a-typography-title :level="4">北京</a-typography-title>
                    </template>
                    <a-card-grid style="width: 20%; text-align: center;" v-for="(brief, index) in content.brief['bj']"
                        :key="index">{{ brief }}
                    </a-card-grid>
                </a-card>
            </a-col>
            <a-col :span="18">
                <a-card>
                    <template #title>
                        <a-typography-title :level="4">台湾</a-typography-title>
                    </template>
                    <a-card-grid style="width: 20%; text-align: center;" v-for="(brief, index) in content.brief['tw']"
                        :key="index">{{ brief }}
                    </a-card-grid>
                </a-card>
            </a-col>
        </a-row>
        <a-divider />
        <a-list item-layout="vertical" size="large" :pagination="false" :data-source="content.explanations">
            <template #renderItem="{ item }">
                <a-list-item :key="item.word">
                    <template #extra>
                        <a-image width="272" :src="item.imgSrc" />
                    </template>
                    <a-list-item-meta>
                        <template #title>
                            <a-typography-title :level="4">{{ item.word }}</a-typography-title>
                        </template>
                    </a-list-item-meta>
                    {{ item.explain }}
                </a-list-item>
            </template>
        </a-list>
    </div>
</template>
<script>
import { ref, reactive, defineComponent } from 'vue';

export default defineComponent({
    name: 'NewWordView',
    emits: ['navChanged'],
    setup(_, context) {
        context.emit('navChanged', 3);

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
            brief: {
                gjt: ['躺平主义', '元宇宙', '纸板床', '以疆制华', '核废水排放'],
                xg: ['a', 'b', 'c', 'd', 'e'],
                bj: ['a', 'b', 'c', 'd', 'e'],
                tw: ['a', 'b', 'c', 'd', 'e'],
            },
            explanations: [{
                word: "躺平主义",
                explain: "大陆网络词语「躺平」，指年轻人面对紧张社会，产生对生活、工作疲倦感的生活态度。「躺平主义」 反映青年经历挫折后，感到沮丧，对前景失去盼望，选择放弃面对，继而产生了无能为力的感受。",
                imgSrc: "/image/NewWord/2021/test1.jpg",
            }]
        })

        return {
            yearSelected,
            options,

            content,
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