<template>
  <a-layout>
    <div style="padding-left: 5%; background-color: white;">
      <a-menu v-model:selectedKeys="selectedKeys" mode="horizontal" :style="{ lineHeight: '64px' }">
        <a-menu-item :key="1">
          <router-link to="/" tag="div">首页</router-link>
        </a-menu-item>
        <a-menu-item :key="2">
          <router-link to="/corpus" tag="div">语料查询</router-link>
        </a-menu-item>
        <a-menu-item :key="3">
          <router-link to="/newword" tag="div">新词榜单</router-link>
        </a-menu-item>
        <a-menu-item :key="4">
          <router-link to="/newspaper" tag="div">报刊介绍</router-link>
        </a-menu-item>
        <a-menu-item :key="5">
          <router-link to="/cantonese" tag="div">词说粤语</router-link>
        </a-menu-item>
        <a-menu-item :key="6">
          <router-link to="/feedback" tag="div">帮助</router-link>
        </a-menu-item>
      </a-menu>
    </div>
    <a-layout-content class="content">
      <router-view @nevChanged="nevChanged"></router-view>
    </a-layout-content>
    <a-layout-footer>
      <div class="footer">
        港澳报刊词汇检索&copy; 2022
      </div>
    </a-layout-footer>
  </a-layout>
</template>
<script>
import HomeView from "@/views/HomeView.vue";
import { ref } from "vue";

export default {
  components: {
    HomeView
  },
  methods: {
    nevChanged(newVal) {
      console.log("invoked");
      this.selectedKeys[0] = newVal;
    }
  },
  setup() {
    const selectedKeys = ref([1]);

    return {
      selectedKeys,
    }
  }
}
</script>
<style lang="scss" scoped>
.content {
  min-height: calc(100vh - 64px - 70px);
  background-color: #FAFAFA;
}

.footer {
  width: 100%;
  text-align: center;
}
</style>
