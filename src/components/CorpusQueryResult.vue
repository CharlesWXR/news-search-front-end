<template>
    <div>
        <a-skeleton active :loading="loading">
            <a-row>
                <a-col :span="16">
                    <a-typography>{{ description }}</a-typography>
                </a-col>
                <a-col :span="8">
                    <a-image :src="imgSrc" />
                </a-col>
            </a-row>
            <a-row style="margin-top: 5vh;">
                <a-col :span="24">
                    <a-table :dataSource="dataSource" :columns="columns" :pagination="false" bordered>
                        <template #bodyCell="{ column, record }">
                            <template v-if="column.key === 'reference'">
                                <a @click="jumpTo(record.href)">{{ record.reference }}</a>
                            </template>
                        </template>
                    </a-table>
                </a-col>
            </a-row>
            <a-row justify="center" style="text-align: center; margin-top: 10vh;">
                <a-col :span="8">
                    <a-typography-title :level="3" style="color: #337ecc;">两地报刊历史使用率</a-typography-title>
                </a-col>
                <a-col :span="24">
                    <apexchart type="line" :options="chartOptions" :series="series" height="300"></apexchart>
                </a-col>
            </a-row>
        </a-skeleton>
    </div>
</template>
<script>
import { ref, watch } from "vue";
import VueApexCharts from "vue3-apexcharts";

function generateDayWiseTimeSeries(baseval, count, yrange) {
    let i = 0;
    let series = [];
    while (i < count) {
        var x = baseval;
        var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
        series.push([x, y]);
        baseval += 86400000 * 7;
        i++;
    }
    return series;
}

const columns = [
    {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        width: '10%',
    }, {
        title: '出处',
        dataIndex: 'reference',
        key: 'reference',
        width: '40%',
    }, {
        title: '句子',
        dataIndex: 'sentence',
        key: 'sentence',
    }
];

const dataSource = [
    {
        index: 1,
        reference: 'zby',
        href: 'https://www.baidu.com',
        sentence: 'zzzz',
    }
];

const chartOptions = {
    xaxis: {
        type: "datetime",
        categories: [
            "01/01/2003",
            "02/01/2003",
            "03/01/2003",
            "04/01/2003",
            "05/01/2003",
            "06/01/2003",
            "07/01/2003",
            "08/01/2003"
        ]
    }
};
const series = [
    {
        name: "Series A",
        data: generateDayWiseTimeSeries(new Date("11 Feb 2017").getTime(), 20, {
            min: 10,
            max: 20
        })
    },
    {
        name: "Series B",
        data: generateDayWiseTimeSeries(new Date("11 Feb 2017").getTime(), 20, {
            min: 10,
            max: 20
        })
    }
];


export default {
    name: "CorpusQueryResult",
    components: {
        apexchart: VueApexCharts,
    },
    props: ["queryText"],
    emits: ["finished"],
    methods: {
        jumpTo(newAddr) {
            window.open(newAddr, '_blank');
        }
    },
    setup(props, context) {
        const loading = ref(false);
        const description = ref("");
        const imgSrc = ref("");

        watch(
            props,
            (newVal) => {
                console.log(newVal);
            }
        )

        return {
            loading,
            description,
            imgSrc,

            columns,
            dataSource,

            chartOptions,
            series,
        }
    }
}
</script>