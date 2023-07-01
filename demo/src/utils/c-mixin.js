export default {
  custom: 'c-mixin',
  props: {
    cProp: {
      type: String,
      default: 'cProp'
    }
  },
  data() {
    return {
      cMsg: 'this is c'
    };
  },
  created() {
    console.log('this is created from c-mixin.js');
  },
  mounted() {
    console.log('this is mounted from c-mixin.js');
  }
};
