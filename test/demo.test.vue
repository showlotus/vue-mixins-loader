<template>
  <div class="wrap" :style="imgStyle"></div>
</template>

<script>
import { formatField2Alias } from './utils/tools';
import TestMixin from './utils/mixin';

function a() {}

function b() {}

export default {
  name: 'tab-image',
  mixins: [TestMixin],
  inject: ['updateCurrComponentProp'],
  props: {
    initialBackgroundColor: String,
    initialBorderRadius: { type: Number, default: 8 },
    model: { type: Array, default: () => [] },
  },
  mounted() {
    formatField2Alias();
  },
};
</script>

<style scoped lang="less">
.wrap {
  width: 100%;
}
</style>
