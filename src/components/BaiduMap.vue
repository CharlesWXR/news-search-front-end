<template>
    <div id="map"></div>
</template>
<script>
import { BaiduMap } from "@/tools/BaiduMap";
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
    name: "BaiduMap",
    data() {
    },
    props: ["posx", "posy", "title", "description"],
    setup(props, context) {
        const ak = "f5D9GzznoIAipG5s08rmhaAbqj1Cka2c";
        const map = ref();

        const opts = {
            width: 400,
            hegith: 150,
        }

        BaiduMap(ak).then((mymap) => {
            // 创建地图实例
            map.value = new BMapGL.Map("map");
            let point = new BMapGL.Point(props.posx, props.posy);
            map.value.enableScrollWheelZoom(true);
            map.value.centerAndZoom(point, 14); //设置缩放级别

            let marker = new BMapGL.Marker(point);
            map.value.addOverlay(marker);

            const infoWindow = `
                <h3>${props.title}</h3>
                <hr>
                <p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>${props.description}</p>
            `;
            let info = new BMapGL.InfoWindow(infoWindow, opts);
            marker.addEventListener('click', () => {
                marker.openInfoWindow(info);
            });

            watch(
                props,
                (newVal) => {
                    map.value.clearOverlays();

                    let point = new BMapGL.Point(newVal.posx, newVal.posy);
                    map.value.flyTo(point, 14);

                    let marker = new BMapGL.Marker(point);
                    map.value.addOverlay(marker);

                    const infoWindow = `
                        <h3>${newVal.title}</h3>
                        <hr>
                        <p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>${newVal.description}</p>
                    `;
                    let info = new BMapGL.InfoWindow(infoWindow, opts);
                    marker.addEventListener('click', () => {
                        marker.openInfoWindow(info);
                    });
                }
            )
        });

        return {
            map,
        }
    }
})
</script>
<style scoped>
#map {
    height: 100%;
    width: 100%;
}
</style>