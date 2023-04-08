<template>
  <div class="wrap"></div>
</template>

<script>
import cMixin from '@utils/c-mixin.js';
import dMixin from 'D:/Code/vue-mixin-loader/test/src/utils/d-mixin.js';
import './utils/a';
import BMixin from './utils/b-mixin';
const customMixin = {
  custom: "custom-mixin",
  props: {
    block: {
      type: Object,
      default: function () {
        return {};
      }
    }
  },
  mounted: function () {
    console.log("this is VueMixinsLoader's mounted.");
  }
};
function a() {}
function b() {}
export default {
  name: 'test-component',
  mixins: [BMixin, cMixin, dMixin, customMixin],
  props: {
    prop1: String,
    prop2: {
      type: Number,
      default: 8
    },
    prop3: {
      type: Array,
      default: () => []
    }
  },
  mounted() {
    console.log('Test inner mounted');
  }
};
</script>

<style scoped>
.wrap {
  width: 200px;
  height: 200px;
  background-color: orange;
  border-radius: 10px;
  box-shadow: 0 0 4px rgb(192, 133, 23);
}
</style>
