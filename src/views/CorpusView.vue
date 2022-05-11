<template>
    <a-back-top />
    <div class="container">
        <a-row justify="center" style="text-align: center">
            <a-col :span="8">
                <a-typography-title style="color: #337ecc;">语 料 查 询</a-typography-title>
            </a-col>
        </a-row>
        <a-row justify="end">
            <a-col span="auto">
                <a-radio-group v-model:value="queryType">
                    <a-radio-button :value="1">一般检索</a-radio-button>
                    <a-radio-button :value="2">高级检索</a-radio-button>
                    <a-radio-button :value="3">句篇检索</a-radio-button>
                </a-radio-group>
            </a-col>
            <a-col :span="4"></a-col>
        </a-row>
        <a-row>
            <a-col :span="16" :offset="4">
                <a-input-search size="large" v-model:value="text" placeholder="请输入需要查询的内容..." :loading="loading"
                    enter-button @search="search" :allow-clear="true" :maxlength="30" show-count />
            </a-col>
        </a-row>
        <corpus-query-result :queryText="queryText" style="margin-top: 3vh"></corpus-query-result>
    </div>
</template>
<script>
import { ref } from "vue";
import CorpusQueryResult from "@/components/CorpusQueryResult.vue";

export default {
    name: "CorpusView",
    components: {
        CorpusQueryResult,
    },
    methods: {
        search() {
            if (this.queryText !== this.text) {
                this.queryText = this.text;
                this.loading = true;
            }
        }
    },
    setup() {
        const queryType = ref(1);
        const loading = ref(false);
        const text = ref("");
        const queryText = ref("");

        return {
            queryType,
            loading,
            text,
            queryText,
        }
    }
}
</script>

<style scoped>
.container {
    padding-left: 10%;
    padding-right: 10%;
    padding-top: 5vh;
}
</style>