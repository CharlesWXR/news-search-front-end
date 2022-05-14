<template>
    <a-back-top />
    <main-title :imgSrc="require('@/assets/图2.png')" title="语 料 查 询" :background-pos="[0, -40]"></main-title>
    <div class="container">
        <!--a-row justify="center" style="text-align: center">
            <a-col :span="8">
                <a-typography-title style="color: #337ecc;"></a-typography-title>
            </a-col>
        </a-row-->
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
        <div v-show="show">
            <corpus-query-result :queryText="queryText" style="margin-top: 5vh" @finished="finished">
            </corpus-query-result>
        </div>
    </div>
</template>
<script>
import { ref, defineComponent } from "vue";
import CorpusQueryResult from "@/components/CorpusQueryResult.vue";
import MainTitle from "@/components/MainTitle.vue";

export default defineComponent({
    name: "CorpusView",
    components: {
        CorpusQueryResult,
        MainTitle,
    },
    emits: ['navChanged'],
    methods: {
        search() {
            if (this.queryText !== this.text) {
                this.queryText = this.text;
                this.loading = true;
            }
        },
        finished() {
            this.loading = false;
            this.show = true;
        }
    },
    setup(_, context) {
        context.emit('navChanged', 2);

        const queryType = ref(1);
        const loading = ref(false);
        const show = ref(false);
        const text = ref("");
        const queryText = ref("");

        return {
            queryType,
            loading,
            text,
            queryText,
            show,
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