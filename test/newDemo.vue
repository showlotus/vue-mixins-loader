<template>
  <div class="wrap" :style="imgStyle"></div>
</template>

<script>
import toolsMixin from 'D:/Code/vue-mixin-loader/test/vueLoaderTest/utils/tools.js';
import tools2Mixin from 'D:/Code/vue-mixin-loader/test/vueLoaderTest/utils/tools.cjs';
import { formatField2Alias } from './utils/tools';
import TestMixin from './utils/mixin';
const customMixin = {
  props: {
    block: {
      type: [Number, String],
      default: () => ({})
    }
  }
};
function a() {}
function b() {}
export default {
  name: 'tab-image',
  mixins: [TestMixin, toolsMixin, tools2Mixin, customMixin],
  inject: ['updateCurrComponentProp'],
  props: {
    initialBackgroundColor: String,
    initialBorderRadius: {
      type: Number,
      default: 8
    },
    model: {
      type: Array,
      default: () => []
    }
  },
  mounted() {
    formatField2Alias();
  }
};
</script>

<style scoped lang="less">
.wrap {
  width: 100%;
}
</style>
