<template>
  <div id="app">
    App
    <Child />

    <ElButton>Element UI Button</ElButton>
  </div>
</template>

<script>
import './utils/a';
import BMixin from './utils/b-mixin';
import Child from './components/Child.vue';
import ElButton from 'element-ui/packages/button';
// import { ElButton } from 'element-ui';

function a() {}
function b() {}

export default {
  name: 'app',
  mixins: [BMixin],
  components: { Child, ElButton },
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
  created() {
    console.log('App inner created.');
  },
  mounted() {
    console.log('App inner mounted.');
  }
};
</script>

<style scoped>
#app {
  width: 200px;
  height: 200px;
  background-color: orange;
  border-radius: 10px;
  box-shadow: 0 0 4px rgb(192, 133, 23);
}
</style>
