<template>
    <div v-if="!empty" v-for="(word, index) in words.processedData" :key="index" style="margin-top: 5vh">
        <a-skeleton active :loading="loading">
            <a-divider></a-divider>
            <a-row :gutter="[32, 16]" justify="center">
                <a-col :span="24">
                    <a-typography-title :level="3">{{ word.word }}</a-typography-title>
                </a-col>
                <a-col :span="16">
                    <a-row>
                        <a-col :span="24">
                            <a-typography-title :level="4">释义</a-typography-title>
                        </a-col>
                    </a-row>
                    <a-row>
                        <a-col :span="24">
                            <a-typography>{{ word.description }}</a-typography>
                        </a-col>
                    </a-row>
                </a-col>
                <a-col :span="6" v-if="word.imgSrc !== null && word.imgSrc !== ''">
                    <a-image :src="word.imgSrc" />
                </a-col>
            </a-row>
            <a-row style="margin-top: 5vh;">
                <a-col :span="24">
                    <a-table :dataSource="word.sample" :columns="columns" :pagination="false" bordered>
                        <template #bodyCell="{ column, record }">
                            <template v-if="column.key === 'sample'">
                                <a @click="showModal(record.fulltext, record.index)" v-html="record.sample"></a>
                            </template>
                        </template>
                    </a-table>
                </a-col>
            </a-row>
        </a-skeleton>

    </div>
    <div v-else style="margin-top: 5vh;">
        <a-empty>
            <template #description>
                <a-typography-title :level="4">暂未收录该词语</a-typography-title>
            </template>
        </a-empty>
    </div>
    <a-modal v-model:visible="visible" title="原文" @ok="handleOk" :key="presentIndex">
        <div style="white-space: Pre-wrap; word-break: normal; word-wrap: break-word; width: 100%;" v-html="fulltext">

        </div>
    </a-modal>
</template>
<script>
import { ref, watch, reactive, defineComponent, getCurrentInstance } from "vue";
import { message } from 'ant-design-vue';

const columns = [
    {
        title: '出处',
        dataIndex: 'sample',
        key: 'sample',
    }
];

export default defineComponent({
    name: "CorpusQueryResult",
    props: ["queryText"],
    emits: ["finished"],
    methods: {
        showModal(fulltext, index) {
            this.fulltext = fulltext;
            this.visible = true;
            this.presentIndex = index;
        },
        handleOk() {
            this.visible = false;
        }
    },
    setup(props, context) {
        const { appContext } = getCurrentInstance();
        const $http = appContext.config.globalProperties.$http;

        const empty = ref(true);
        const loading = ref(false);

        const words = reactive({
            data: {},
            processedData: [],
        })

        const imgBase = "image/Corpus/";

        const query = (target) => {
            $http.get("corpus/blur/" + target).then(
                response => {
                    let res = response.data;
                    loading.value = false;
                    context.emit("finished", true);

                    if (res.code === 200) {
                        words.data = res.result;
                        empty.value = false
                        words.processedData = [];

                        console.log(words);
                        for (let key in words.data) {
                            let re = new RegExp("(" + key + ")");
                            let corpuses = words.data[key];
                            let des = "";
                            let imgsrc = "";
                            let sample = [];

                            for (let index = 0, len = corpuses.length; index < len; index++) {
                                let c = corpuses[index].corpus;
                                if (c.imgsrc !== null)
                                    imgsrc = imgBase + c.imgsrc;

                                if (c.description !== null)
                                    des = c.description;

                                sample.push({
                                    index: index,
                                    sample: c.sample ? (c.sample).replace(re, `<strong>$1</strong>`) : "暂缺",
                                    fulltext: corpuses[index].fulltext ? (corpuses[index].fulltext).replace(re, `<strong>$1</strong>`) : corpuses[index].fulltext,
                                });
                            }

                            words.processedData.push({
                                word: key,
                                description: des,
                                imgSrc: imgsrc,
                                sample: sample
                            })
                        }
                        words.data = {};
                    }
                    else {
                        message.error('Unexpected error happend:' + response.message);
                    }
                }
            ).catch(error => {
                context.emit("finished", true);
                loading.value = false;
                message.error('Unexpected error happend:' + error);
            })
        }

        if (props.queryText !== null && props.queryText !== "")
            query(props.queryText);

        watch(
            props,
            (newVal) => {
                loading.value = true;
                query(newVal.queryText);
            }
        )

        const visible = ref(false);
        const fulltext = ref("");
        const presentIndex = ref(0);

        return {
            loading,
            empty,

            columns,
            words,

            visible,
            fulltext,
            presentIndex,
        }
    }
})
</script>