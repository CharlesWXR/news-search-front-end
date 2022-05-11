<template>
    <a-back-top />
    <div class="container">
        <a-row justify="center" style="text-align: center">
            <a-col :span="8">
                <a-typography-title style="color: #337ecc;">报 刊 介 绍</a-typography-title>
            </a-col>
        </a-row>
        <div style="height: 80vh;">
            <baidu-map></baidu-map>
        </div>
    </div>
</template>

<script>
import BaiduMap from "@/components/BaiduMap.vue";
import { defineComponent } from "vue";

export default defineComponent({
    name: "NewspaperView",
    components: {
        BaiduMap,
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