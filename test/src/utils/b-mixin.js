export default {
  custom: 'b-mixin',
  created() {
    console.log('this is created from b-mixin.js -----', this.$options.name);
  },
  mounted() {
    console.log('this is mounted from b-mixin.js -----', this.$options.name);
  }
};
