<template>
  <div class="wrap">
    <Child />
  </div>
</template>

<script>
import './utils/a';
import BMixin from './utils/b-mixin';
import Child from './components/Child.vue';

function a() {}
function b() {}

export default {
  name: 'test-component',
  mixins: [BMixin],
  components: { Child },
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
