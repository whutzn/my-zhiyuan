<template>
  <div class="wrapper-main">
    <div class="banner-box"></div>
    <h3>{{curTitle}}</h3>
    <div class="wrapper-about" v-html="content">
      
    </div>
    <BackTop />
  </div>
</template>

<script>
import BackTop from "@/components/BackTop.vue";
export default {
  name: "content",
  components: {
    BackTop
  },
  data() {
    return {
      content: '',
      curTitle: ''
    }
  },
  methods: {
    getInfos(id) {
        this.$api({
        url: "getinfos",
        method: "post",
        data: {
            id: id
        }
      }).then(response => {
        console.log('res', response);
        this.content = '';
        response.desc.forEach(element => {
          console.log('element',element);
          this.content = element.content;
          this.curTitle = element.title;
        });
      });
    }
  },
  created() {
    
  },
  mounted() {
    console.log('id',this.$route.params.id);
    this.getInfos(this.$route.params.id);
  },
};
</script>

<style scoped type="text/less" lang="less">
@import "../assets/css/content.less";
</style>
