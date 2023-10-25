<script setup>
import { ref, reactive, getCurrentInstance } from "vue";
import Featurelist from "@/config";


const FeatureRef = ref();
const list = [
  {
    name: "数据面板",
    checked: false,
  },
  {
    name: "功能菜单",
    checked: true,
  },
  {
    name: "专题图",
    checked: false,
  },
];
const {
  proxy: { $Data },
} = getCurrentInstance();
const { getTime } = $Data;
const Time = ref("");
setInterval(() => {
  Time.value = getTime();
}, 1000);

//详细信息
const detail = (v, index, i) => {
  Featurelist.forEach((item) => {
    item.list.forEach((x, idx, self) => {
      self[idx].checked = false;
    });
  });
  v.checked = true;
};
//类型切换
const changeType = (v) => {
  const obj = list.find((item) => item.checked);
  if (!obj) {
    v.checked = true;
  } else if (obj && obj.name === v.name) {
    v.checked = false;
  } else {
    obj.checked = false;
    v.checked = true;
  }
};
</script>

<template>
  <div id="Map">
    <div class="Feature">
      <div class="F_l">{{ Time }}</div>
      <div class="F_r">
        <div v-for="(item, index) in list" :key="index" @click="changeType(item)">
          {{ item.name }}
        </div>
      </div>
    </div>
    <div
      ref="FeatureRef"
      class="Featurelist"
      :style="list[1].checked ? { maxHeight: '500px' } : { maxHeight: 0 }"
    >
      <div v-for="(item, index) in Featurelist" :key="index">
        <div class="F_title">
          <img :src="item.defaultimage" alt="" />
          <span>{{ item.title }}</span>
        </div>
        <div class="F_content">
          <div @click="detail(v, index, x)" v-for="(v, x) in item.list" :key="x">
            <img v-show="v.checked" :src="v.checkedimage" alt="" />
            <img v-show="!v.checked" :src="v.defaultimage" alt="" />
            <span>{{ v.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
#Map {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #333;
  .Feature {
    width: 100%;
    padding: 0 15px;
    height: 90px;
    position: absolute;
    right: 0;
    top: 0;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    & > div {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    & > div:first-child {
      width: 12%;
    }
    & > div:last-child {
      width: 20%;
      letter-spacing: 3px;
    }
    .F_r {
      & > div {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: calc(100% / 3);
        height: 44px;
        clip-path: polygon(9% 0, 100% 0, 89% 100%, 0% 100%);
        background: linear-gradient(
          360deg,
          rgba(0, 239, 237, 0.35) 0%,
          rgba(0, 239, 237, 0.05) 48%,
          rgba(29, 93, 243, 0.35) 100%
        );
      }
    }
  }
  //功能列表
  .Featurelist {
    z-index: 1;
    width: 350px;
    background: #333;
    position: absolute;
    top: 100px;
    right: 15px;
    letter-spacing: 2px;
    font-size: 12px;
    color: #fff;
    border: 1px solid #00ffcc;
    transition: all 0.5s;
    overflow: hidden;
    div {
      width: 100%;
    }
    .F_title {
      display: flex;
      align-items: center;
      color: #00ffcc;
    }
    .F_content {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      & > div {
        margin: 8px;
        width: 20%;
        display: flex;
        align-items: center;
        flex-direction: column;
        cursor: pointer;
      }
    }
  }
}
</style>
