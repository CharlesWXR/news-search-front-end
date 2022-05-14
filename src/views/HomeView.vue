<template>
  <div class="hook">
    <main-title :imgSrc="require('../assets/图片2.jpg')" :title="'港 澳 报 刊 词 汇 检 索'"></main-title>

    <div class="director">
      <a-card>
        <a-card-grid style="width: 25%; text-align: center">
          <a-row>
            <a-col :span="24">
              <a-typography-title :level="5">语料查询</a-typography-title>
            </a-col>
            <a-col :span="24">
              <a-typography-text :ellipsis="true" content="检索以获取语料释义及出处。"></a-typography-text>
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
              <a-typography-text :ellipsis="true" content="查看泛华语地区历年中文新词榜。"></a-typography-text>
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
              <a-typography-text :ellipsis="true" content="查看港澳报刊介绍。"></a-typography-text>
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
              <a-typography-title :level="5">词说粤语</a-typography-title>
            </a-col>
            <a-col :span="24">
              <a-typography-text :ellipsis="true" content="从多角度认识港澳文化。"></a-typography-text>
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
  <div class="introduction">
    <a-row justify="center" :gutter="[64, 32]">
      <a-col :span="10">
        <a-typography-title :level="3">语料查询</a-typography-title>
        <a-typography-paragraph>
          收纳自1966年至今的港澳代表性报刊，为您提供广时间跨度的权威语料查询服务。
          <ul>
            <li>
              释义图文结合
            </li>
            <li>
              例句详实
            </li>
            <li>
              原文全摘取
            </li>
          </ul>
          <a-typography-link @click="jumpToCorpus">前往检索 ></a-typography-link>
        </a-typography-paragraph>
      </a-col>
      <a-col :span="10">
        <img :src="require('@/assets/timer.png')" style="width: 200px; height: 200px;" />
      </a-col>
      <a-col :span="10" style="text-align: right;">
        <img :src="require('@/assets/cloud.png')" style="width: 200px; height: 200px;" />
      </a-col>
      <a-col :span="10">
        <a-typography-title :level="3">新词榜单</a-typography-title>
        <a-typography-paragraph>
          结合LIVAC华语中文新词榜，收录2008~2021年平面报刊港京台沪代表性新词及其释义，并提供按年检索服务，
          助您穿越历史风尘，透视时代热点。
        </a-typography-paragraph>
        <a-typography-link @click="jumpToNewWord">前往使用 ></a-typography-link>
      </a-col>
      <a-col :span="10">
        <a-typography-title :level="3">报刊介绍</a-typography-title>
        <a-typography-paragraph>
          精选港澳地区十份中文报刊为您呈现全面信息。
          <ul>
            <li>地图显经纬</li>
            <li>图片展风采</li>
            <li>报刊信息全知道</li>
          </ul>
          <a-typography-link @click="jumpToNewspaper">前往查看 ></a-typography-link>
        </a-typography-paragraph>
      </a-col>
      <a-col :span="10">
        <img :src="require('@/assets/newspaper.png')" style="width: 200px; height: 200px;" />
      </a-col>
      <a-col :span="10">
        <img :src="require('@/assets/multi-d.png')" style="width: 200px; height: 200px;" />
      </a-col>
      <a-col :span="10">
        <a-typography-title :level="3">词说粤语</a-typography-title>
        <a-typography-paragraph>
          多维度带您认识港澳文化。
          <ul>
            <li>节日习俗科普</li>
            <li>报刊词汇详解</li>
            <li>实地考察报告</li>
            <li>粤语音乐馆</li>
            <li>粤语诗社</li>
            <li>日常用语</li>
            <li>...</li>
          </ul>
          <a-typography-link @click="jumpToCantonese">进一步了解 ></a-typography-link>
        </a-typography-paragraph>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { RightCircleOutlined } from '@ant-design/icons-vue';
import { defineComponent } from "vue";
import MainTitle from "@/components/MainTitle.vue";

export default defineComponent({
  name: 'HomeView',
  methods: {
    jumpToCorpus() {
      this.$emit("navChanged", 2);
      this.$router.push("/corpus");
    },
    jumpToNewWord() {
      this.$emit("navChanged", 3);
      this.$router.push("/newword");
    },
    jumpToNewspaper() {
      this.$emit("navChanged", 4);
      this.$router.push("/newspaper");
    },
    jumpToCantonese() {
      this.$emit("navChanged", 5);
      this.$router.push("/cantonese");
    },
  },
  emits: ["navChanged"],
  components: {
    RightCircleOutlined,
    MainTitle,
  },
  setup(_, context) {
    context.emit('navChanged', 1);
  }
})
</script>

<style scoped lang="scss">
.hook {
  height: calc(100vh - 64px);
}

.director {
  padding-left: 10%;
  padding-right: 10%;
  margin-top: 2rem;
}

.introduction {
  margin-top: 5vh;
  padding-left: 15%;
  padding-right: 15%;
}
</style>