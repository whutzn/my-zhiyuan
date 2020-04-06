<template>
  <div class="wrapper-main">
    <div class="banner-box"></div>
    <h3>{{curTitle}}</h3>
    <div class="result-main">
      <el-table :data="tableData" stripe border>
        <el-table-column prop="date" label="年份" width="120" align="center"></el-table-column>
        <el-table-column prop="name" label="专业" width="240" align="center"></el-table-column>
        <el-table-column prop="num" label="招生计划" width="120" align="center"></el-table-column>
        <el-table-column prop="score" label="最低分" width="120" align="center"></el-table-column>
        <el-table-column prop="order" label="最低位次" width="120" align="center"></el-table-column>
      </el-table>
    </div>
    <BackTop />
  </div>
</template>

<script>
import BackTop from "@/components/BackTop.vue";
export default {
  name: "result",
  components: {
    BackTop
  },
  data() {
    return {
      content: "",
      curTitle: "查询详情",
      tableData: [
        {
          date: "2018",
          name: "机械工程",
          num: "10",
          score: "552",
          order: "20002"
        },
        {
          date: "2017",
          name: "工商管理",
          num: "8",
          score: "550",
          order: "20012"
        },
        {
          date: "2016",
          name: "材料工程",
          num: "20",
          score: "556",
          order: "19988"
        }
      ]
    };
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
        console.log("res", response);
        this.content = "";
        response.desc.forEach(element => {
          console.log("element", element);
          this.content = element.content;
          this.curTitle = element.title;
        });
      });
    }
  },
  created() {},
  mounted() {
    // console.log('id',this.$route.params.id);
    // this.getInfos(this.$route.params.id);
  }
};
</script>

<style scoped type="text/less" lang="less">
@import "../assets/css/result.less";
</style>
