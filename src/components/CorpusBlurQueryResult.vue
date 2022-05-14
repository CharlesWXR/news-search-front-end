<template>
    <div v-if="!empty" v-for="(word, index) in words" :key="index">
        <a-skeleton active :loading="loading">
            <a-row :gutter="[32, 16]" justify="center">
                <a-col :span="16">
                    <a-row>
                        <a-col :span="24">
                            <a-typography-title :level="4">释义</a-typography-title>
                        </a-col>
                    </a-row>
                    <a-row>
                        <a-col :span="24">
                            <a-typography>{{ description.description }}</a-typography>
                        </a-col>
                    </a-row>
                </a-col>
                <a-col :span="6" v-if="description.imgSrc !== null && description.imgSrc !== ''">
                    <a-image :src="description.imgSrc" />
                </a-col>
            </a-row>
            <a-row style="margin-top: 5vh;">
                <a-col :span="24">
                    <a-table :dataSource="dataSource" :columns="columns" :pagination="false" bordered>
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
        const description = reactive({
            description: "",
            imgSrc: "",
        })

        const words = reactive({
            data: {}
        })

        const imgBase = "image/Corpus/";

        watch(
            props,
            (newVal) => {
                loading.value = true;

                $http.get("corpus/blur/" + newVal.queryText).then(
                    response => {
                        let res = response.data;
                        loading.value = false;
                        context.emit("finished", true);

                        if (res.code === 200) {
                            words.data = res.result;
                            empty.value = false;

                            for (let key in words.data) {

                            }
                            let re = new RegExp("(" + t[0].corpus.word + ")");
                            for (let index = 0, len = t.length; index < len; index++) {
                                let c = t[index].corpus;
                                if (c.imgsrc !== null)
                                    description.imgSrc = imgBase + c.imgsrc;

                                if (c.description !== null)
                                    description.description = c.description;

                                dataSource.value.push({
                                    index: index,
                                    sample: (c.sample).replace(re, `<strong>$1</strong>`),
                                    fulltext: (t[index].fulltext).replace(re, `<strong>$1</strong>`),
                                });
                            }
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
        )

        const visible = ref(false);
        const fulltext = ref("");
        const presentIndex = ref(0);

        return {
            loading,
            description,

            columns,
            dataSource,

            empty,
            visible,
            fulltext,
            presentIndex,
        }
    }
})
</script>