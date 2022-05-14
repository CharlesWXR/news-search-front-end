<template>
    <div class="title"
        :style="{ 'background-image': `url(${imgSrc})`, 'background-position': `${backgroundPos[0]}vh ${backgroundPos[1]}vh` }">
        <a-row style="height: 100%; width: 100%; position: relative;" justify="center">
            <a-col :span="12" style="position: absolute; bottom: 3%;">
                <a-typography-title :style="{ 'color': `${color}` }">{{ title }}</a-typography-title>
            </a-col>
        </a-row>
    </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
    name: 'MainTitle',
    props: {
        imgSrc: {
            type: String
        },
        title: {
            type: String
        },
        color: {
            type: String,
            default: 'white'
        },
        backgroundPos: {
            type: Array,
            default: () => [0, -20]
        }
    },
})
</script>

<style scoped>
.title {
    height: 60vh;
    text-align: center;
    background-repeat: no-repeat;
    background-size: cover;
}
</style>