<template>
  <div class="hook">
    <div class="title" :style="{ 'background-image': `url(${require('@/assets/front-huge.jpg')})` }">
      <a-row style="height: 100%; width: 100%; position: relative;" justify="center">
        <a-col :span="12" style="position: absolute; bottom: 3%;">
          <a-typography-title style="color: white;">港 澳 报 刊 词 汇 检 索</a-typography-title>
        </a-col>
      </a-row>
    </div>

    <div class="director">
      <a-card>
        <a-card-grid style="width: 25%; text-align: center">
          <a-row>
            <a-col :span="24">
              <a-typography-title :level="5">语料查询</a-typography-title>
            </a-col>
            <a-col :span="24">
              <a-typography-text :ellipsis="true">检索以获取语料释义、出处和使用频率。</a-typography-text>
            </a-col>
            <a-col :span="24" style="padding-top: 1rem;">
              <a-button shape="round" type="primary" ghost @click="jumpToCorpus">
                点我查询
                <right-circle-outlined />
              </a-button>
            </a-col>
          </a-row>
        </a-card-grid>
        <a-card-grid style="width: 25%; text-align: center">
          <a-row>
            <a-col :span="24">
              <a-typography-title :level="5">新词榜单</a-typography-title>
            </a-col>
            <a-col :span="24">
              <a-typography-text :ellipsis="true">查看泛华语地区历年中文新词榜。</a-typography-text>
            </a-col>
            <a-col :span="24" style="padding-top: 1rem;">
              <a-button shape="round" type="primary" ghost @click="jumpToNewWord">
                点我查询
                <right-circle-outlined />
              </a-button>
            </a-col>
          </a-row>
        </a-card-grid>
        <a-card-grid style="width: 25%; text-align: center; height: 100%;">
          <a-row>
            <a-col :span="24">
              <a-typography-title :level="5">报刊介绍</a-typography-title>
            </a-col>
            <a-col :span="24">
              <a-typography-text :ellipsis="true">查看港澳报刊介绍。</a-typography-text>
            </a-col>
            <a-col :span="24" style="padding-top: 1rem;">
              <a-button shape="round" type="primary" ghost @click="jumpToNewspaper">
                点我查询
                <right-circle-outlined />
              </a-button>
            </a-col>
          </a-row>
        </a-card-grid>
        <a-card-grid style="width: 25%; text-align: center">
          <a-row>
            <a-col :span="24">
              <a-typography-title :level="5">语料查询</a-typography-title>
            </a-col>
            <a-col :span="24">
              <a-typography-text :ellipsis="true">检索以获取语料释义、出处和使用频率。</a-typography-text>
            </a-col>
            <a-col :span="24" style="padding-top: 1rem;">
              <a-button shape="round" type="primary" ghost @click="jumpToCantonese">
                点我查询
                <right-circle-outlined />
              </a-button>
            </a-col>
          </a-row>
        </a-card-grid>
      </a-card>
    </div>
  </div>
</template>

<script>
import { RightCircleOutlined } from '@ant-design/icons-vue';

export default {
  name: 'HomeView',
  methods: {
    jumpToCorpus() {
      this.$emit("nevChanged", 2);
      this.$router.push("/corpus");
    },
    jumpToNewWord() {
      this.$emit("nevChanged", 3);
      this.$router.push("/newword");
    },
    jumpToNewspaper() {
      this.$emit("nevChanged", 4);
      this.$router.push("/newspaper");
    },
    jumpToCantonese() {
      this.$emit("nevChanged", 5);
      this.$router.push("/cantonese");
    },
  },
  emits: ["nevChanged"],
  components: {
    RightCircleOutlined,
  }
}
</script>

<style scoped lang="scss">
.hook {
  height: calc(100vh - 64px);
}

.title {
  height: 60vh;
  text-align: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0px -20vh;
}

.director {
  padding-left: 10%;
  padding-right: 10%;
  margin-top: 2rem;
}
</style>