<template>
    <div class="container">
        <a-row justify="center" style="text-align: center">
            <a-col :span="8">
                <a-typography-title style="color: #337ecc;">语 料 查 询</a-typography-title>
            </a-col>
        </a-row>
        <a-row justify="end">
            <a-col :span="auto">
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
                <a-input-search size="large" v-model:value="value" placeholder="请输入需要查询的内容..." :loading="loading"
                    enter-button />
            </a-col>
        </a-row>
        <router-view></router-view>
    </div>
</template>
<script>
import { ref } from "vue";

export default {
    name: "CorpusView",
    setup() {
        const queryType = ref(1);
        const loading = ref(false);

        return {
            queryType,
            loading,
        }
    }
}
</script>

<style>
.container {
    padding-left: 10%;
    padding-right: 10%;
    padding-top: 5vh;
}
</style>