<script>
var app = getApp().globalData;

export default {
  data() {
    return {
      a: 'asdadasdad'
    };
  },

  components: {},
  props: {},
  onLoad: function () {
    this.setData({
      a: 'aaaaaaaaa'
    });
  },
  methods: {
    setData: function (obj) {
      let that = this;
      let keys = [];
      let val, data;
      Object.keys(obj).forEach(function (key) {
        keys = key.split('.');
        val = obj[key];
        data = that.$data;
        keys.forEach(function (key2, index) {
          that[key] = obj[key];
        });
      });
    }
  }
};
</script>
<style>
@import "./template.css";
</style>