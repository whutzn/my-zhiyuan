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
      ],
      select1: '',
      select2: '',
      select3: '',
      school: ''
    };
  },
  methods: {
    queryInfo() {
      this.$api({
        url: "queryschoolinfo",
        method: "post",
        data: {
          pi: this.select2,
          ke: this.select1,
          area: this.select3,
          school: this.school
        }
      }).then(response => {
        // console.log("res", response);
        console.log('res1',response);
        this.curTitle = response.desc[0].school + "查询详情";
        this.tableData = [];
        response.desc.forEach(element => {
          var tmpEle = {
          date: "2018",
          name: "机械工程",
          num: "10",
          score: "552",
          order: "20002"
        };
        tmpEle.date = element.year;
        tmpEle.name = element.major_name;
        tmpEle.num = element.num;
        tmpEle.score = element.score_min;
        tmpEle.order = element.rank;
        this.tableData.push(tmpEle);
        });
      });
    },
  },
  created() {},
  mounted() {
    console.log(this.$global_msg.queryOptions,this.$global_msg.resultInfo);
    this.select3 = this.$global_msg.resultInfo.area;
    this.select1 = this.$global_msg.resultInfo.ke;
    this.select2 = this.$global_msg.resultInfo.pi;
    this.school = this.$global_msg.resultInfo.school;
    this.queryInfo();
  }
};
</script>

<style scoped type="text/less" lang="less">
@import "../assets/css/result.less";
</style>
