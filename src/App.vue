<template>
  <NConfigProvider :locale="zhCN" :date-locale="dateZhCN">
    <AppProvider>
      <RouterView />
    </AppProvider>
  </NConfigProvider>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import autofit from "autofit.js";
import { zhCN, dateZhCN } from "naive-ui";
import { AppProvider } from "@/components/Application";

onMounted(() => {
  autofit.init(
    {
      renderDom: "#app",
      resize: true,
      transition: 0.3,
      delay: 300,
      designWidth: 1920,
      designHeight: 929,
      ignore: [],
    },
    false
  );
});
</script>

<style lang="less">
@import "styles/index.less";
.n-config-provider {
  width: 100%;
  height: 100%;
}
</style>
