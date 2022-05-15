<template>
    <div v-if="!empty" style="margin-top: 5vh;">
        <a-skeleton active :loading="loading">
            <a-row :gutter="[32, 16]" justify="center"
                style="white-space: Pre-wrap; word-break: normal; word-wrap: break-word;">
                <a-col :span="24" v-for="(text, index) in result" :key="index">
                    <a-typography-text v-html="text"></a-typography-text>
                    <a-divider></a-divider>
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
</template>
<script>
import { ref, watch, defineComponent, getCurrentInstance } from "vue";
import { message } from 'ant-design-vue';

export default defineComponent({
    name: "CorpusQueryResult",
    components: {
    },
    props: ["queryText"],
    emits: ["finished"],
    methods: {

    },
    setup(props, context) {
        const { appContext } = getCurrentInstance();
        const $http = appContext.config.globalProperties.$http;

        const loading = ref(false);
        const empty = ref(false);
        const result = ref([]);

        const query = (target) => {
            $http.get("corpus/fulltext/" + target).then(
                response => {
                    let res = response.data;
                    loading.value = false;
                    context.emit("finished", true);

                    let re = new RegExp("(" + target + ")");
                    if (res.code === 200) {
                        result.value = [];
                        for (let i = 0, length = res.result.length; i < length; i++) {
                            result.value.push(res.result[i].replace(re, `<strong>$1</strong>`));
                            result.value[i] = result.value[i].replace(/^(.+?)[\s]/, `<h3 style="text-align:center;">$1</h3>`)
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


        return {
            loading,
            empty,

            result,
        }
    }
})
</script>