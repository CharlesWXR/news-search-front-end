<template>
    <div v-if="!empty">
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
            <!--a-row justify="center" style="text-align: center; margin-top: 10vh;">
                <a-col :span="8">
                    <a-typography-title :level="3" style="color: #337ecc;">两地报刊历史使用率</a-typography-title>
                </a-col>
                <a-col :span="24">
                    <apexchart type="line" :options="chartOptions" :series="series" height="500"></apexchart>
                </a-col>
            </-a-row-->
        </a-skeleton>
        <a-modal v-model:visible="visible" title="原文" @ok="handleOk" :key="presentIndex">
            <div style="white-space: Pre-wrap; word-break: normal; word-wrap: break-word; width: 100%;"
                v-html="fulltext">

            </div>
        </a-modal>
    </div>
    <div v-else style="margin-top: 5vh;">
        <a-empty>
            <template #description>
                <a-typography-title :level="4">暂未收录该词语</a-typography-title>
            </template>
        </a-empty>
    </div>
</template>
<script>
import { ref, watch, reactive, defineComponent, getCurrentInstance } from "vue";
// import VueApexCharts from "vue3-apexcharts";
import { message } from 'ant-design-vue';

// function generateDayWiseTimeSeries(baseval, count, yrange) {
//     let i = 0;
//     let series = [];
//     while (i < count) {
//         var x = baseval;
//         var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
//         series.push([x, y]);
//         baseval += 86400000 * 7;
//         i++;
//     }
//     return series;
// }

// {
//     title: '序号',
//     dataIndex: 'index',
//     key: 'index',
//     width: '10%',
// }, 
// , {
//         title: '句子',
//         dataIndex: 'sentence',
//         key: 'sentence',
//     }

const columns = [
    {
        title: '出处',
        dataIndex: 'sample',
        key: 'sample',
    }
];

// const chartOptions = {
//     xaxis: {
//         type: "datetime",
//         categories: [
//             "01/01/2003",
//             "02/01/2003",
//             "03/01/2003",
//             "04/01/2003",
//             "05/01/2003",
//             "06/01/2003",
//             "07/01/2003",
//             "08/01/2003"
//         ]
//     }
// };
// const series = [
//     {
//         name: "Series A",
//         data: generateDayWiseTimeSeries(new Date("11 Feb 2017").getTime(), 20, {
//             min: 10,
//             max: 20
//         })
//     },
//     {
//         name: "Series B",
//         data: generateDayWiseTimeSeries(new Date("11 Feb 2017").getTime(), 20, {
//             min: 10,
//             max: 20
//         })
//     }
// ];

export default defineComponent({
    name: "CorpusQueryResult",
    components: {
        // apexchart: VueApexCharts,
    },
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
        const dataSource = ref([]);
        const empty = ref(true);

        const loading = ref(false);
        const description = reactive({
            description: "",
            imgSrc: "",
        })

        const imgBase = "image/Corpus/";

        const query = (target) => {
            $http.get("corpus/" + target).then(
                response => {
                    let res = response.data;
                    loading.value = false;
                    context.emit("finished", true);
                    dataSource.value = [];
                    description.description = "";
                    description.imgSrc = "";

                    if (res.code === 200) {
                        let t = res.result;
                        if (t.length === 0) {
                            empty.value = true;
                            return;
                        }

                        empty.value = false;
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
            description,

            columns,
            dataSource,

            // chartOptions,
            // series,
            empty,
            visible,
            fulltext,
            presentIndex,
        }
    }
})
</script>