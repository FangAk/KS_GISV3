<script setup>
import { ref, nextTick, unref, useAttrs, computed } from "vue";
import startDrag from "@/utils/Drag";
import { Close } from "@vicons/ionicons5";
import { basicProps } from "./props";
const emits = defineEmits(["on-close"]);
const props = defineProps({
  ...basicProps,
});
const attrs = useAttrs();
const showModal = ref(false);
const openModal = () => {
  showModal.value = true;
  nextTick(() => {
    const oBox = document.getElementById("drag-modal");
    const oBar = document.getElementById("drag-modal-bar");
    startDrag(oBar, oBox);
  });
};
const closeModal = (flag) => {
  showModal.value = false;
  if (flag == "selectWarnAddress") return;
  emits("on-close");
};
const getBindValue = computed(() => {
  return {
    ...attrs,
    ...unref(props),
  };
});
defineExpose({
  openModal,
  closeModal,
});
//
</script>
<template>
  <n-modal
    v-model:show="showModal"
    v-bind="getBindValue"
    id="drag-modal"
    class="customModal"
    @close="closeModal"
  >
    <template #default>
      <main class="main">
        <header v-if="props.titleName" class="w-full cursor-move" id="drag-modal-bar">
          <img v-if="props.imgSrc" :src="props.imgSrc" alt="" /> {{ props.titleName }}
        </header>
        <main class="content">
          <slot name="content"></slot>
        </main>
      </main>
      <!-- <footer v-if="props.footer">
        <slot name="footer"></slot>
      </footer> -->
    </template>
  </n-modal>
</template>
<style scoped lang="less">
.cursor-move {
  cursor: move;
  font-size: 20px;
}
.main {
  background-image: url("../../../assets/images/home/homefour/dialog_bg.png");
  background-size: 100% 100%;
  min-width: 300px;
  min-height: 300px;
  background-color: rgba(21, 57, 86, 1);
  border-radius: 0 0 3px 3px;
  position: relative;
  padding: 15px;
  .modal-close-bar {
    position: absolute;
    top: 13px;
    right: 10px;
    cursor: pointer;
    z-index: 1;
    color: #fff;
    height: 20px;
    width: 20px;
    background: transparent;
    transition: all 0.3s;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }
}
header {
  padding-top: 5px;
  color: #ffffff;
  font-weight: 600;
  font-size: 18px;
  padding-left: 5px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  img {
    width: 35px;
    margin: 15px 15px 0 0;
  }
}
.content {
  padding: 0 5px;
}
footer {
  height: 55px;
  width: 95%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
<style lang="less">
.customModal {
  width: auto !important;
  padding: 0 !important;
  .n-dialog__content {
    margin: 0 !important;
  }
  .n-base-close {
    top: -7px !important;
    right: -10px !important;
    color: #fff;
    &:hover {
      color: #fff !important;
    }
  }
}
</style>
