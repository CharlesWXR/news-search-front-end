<template>
    <div id="map"></div>
</template>
<script>
import { BaiduMap } from "@/tools/BaiduMap";
import { defineComponent } from "vue";

export default defineComponent({
    name: "BaiduMap",
    data() {
        return {

        }
    },
    setup() {
        const ak = "f5D9GzznoIAipG5s08rmhaAbqj1Cka2c";

        BaiduMap(ak).then((mymap) => {
            // 创建地图实例
            let map = new BMapGL.Map("map");
            let point = new BMapGL.Point(119.949506, 29.089524);
            map.centerAndZoom(point, 10); //设置缩放级别  
        });
    }
})
</script>
<style scoped>
#map {
    height: 100%;
    width: 100%;
}
</style>