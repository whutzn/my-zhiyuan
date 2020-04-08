<template>
  <div class="wrapper-main">
    <div class="banner-box"></div>
    <div class="search-box">
      <h2 class="title">志愿查询</h2>
      <div class="search-wrapper">
        <el-select v-model="select3" @change="getInfo" slot="prepend" class="area-select myselect" placeholder="地区">
            <el-option
              v-for="item in area_options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-select v-model="select1" slot="prepend" class="myselect" placeholder="科类">
            <el-option
              v-for="item in ke_options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-select v-model="select2" slot="prepend" class="myselect" placeholder="批次">
            <el-option
              v-for="item in pi_options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        <el-input placeholder="请输入分数/排名" v-model="keyword" class="input-with-select">
          <el-select v-model="select4" slot="prepend" placeholder="请选择分数/排名">
            <el-option
              v-for="item in type_options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-button @click="toQuery" slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <div class="wrapper">
        <div class="card" v-for="post in filteredList">
          <a @click="getResult(post)" >
            <img src="https://cdn.worldvectorlogo.com/logos/feathersjs.svg" />
            <small>{{ post.name }}</small>
            {{ post.school }}
          </a>
        </div>
      </div>
      <el-pagination
        @current-change="handleCurrentChange"
        background
        layout="prev, pager, next"
        :total="parseInt(totalPage)"
      ></el-pagination>
    </div>
    <BackTop />
  </div>
</template>

<script>
import BackTop from "@/components/BackTop.vue";
import { Notification } from "element-ui";


class Post {
  constructor(school, rank, score, school_code, name) {
    this.school = school;
    this.rank = rank;
    this.score = score;
    this.school_code = school_code;
    this.name = name
  }
}
export default {
  name: "queryInfo",
  components: {
    BackTop
  },
  data() {
    return {
      keyword: "",
      postList: [],
      totalPage: 1,
      curPage: 1,
      ke_options: [],
      pi_options: [],
      area_options: [],
      type_options: [{
        label: '分数',
        value: 1
      },{
        label: '排名',
        value: 2
      }],
      select1: '',
      select2: '',
      select3: '',
      select4: null
    }
  },
  methods: {
    toQuery() {
      if(this.keyword == '') {
        Notification.error({
            title: '错误提示',
            message: '请输入分数',
            type: 'error'
        });
        return;
      }

      this.$api({
        url: "queryschool",
        method: "post",
        data: {
          pi: this.select2,
          ke: this.select1,
          area: this.select3,
          score: parseInt(this.keyword),
          pageSize: 10,
          pageNum: this.curPage,
        }
      }).then(response => {
        // console.log("res", response);
        this.postList = [];
        this.totalPage = parseInt(Math.ceil(response.desc[1][0].total));
        console.log('total', this.totalPage )
        this.$global_msg.queryResult = response.desc[0]
        console.log(this.$global_msg.queryResult);
        response.desc[0].forEach(element => {
          let curname = element.names.split(',');
          this.postList.push(
            new Post(
              element.school || "",
              element.rank,
              element.score_min,
              element.school_code,
              curname[0] + "等"+ curname.length + "个专业"   
            )
          );
        });
      });
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.curPage = val;
      this.toQuery();
    },
    getInfo() {
      this.$api({
        url: "getinfo",
        method: "post",
        data: {
          area: this.select3
        }
      }).then(response => {
        console.log("res", response);
        this.pi_options = [];
        this.ke_options = [];
        this.select1 = '';
        this.select2 = '';
        response.desc[0].forEach(element => {
          var curElement = {label: '', value: ''};
          curElement.label = element.pi;
          curElement.value = element.pi;
          this.pi_options.push(curElement);
        });
        response.desc[1].forEach(element => {
          var curElement = {label: '', value: ''};
          curElement.label = element.ke;
          curElement.value = element.ke;
          this.ke_options.push(curElement);
        });
      });
    },
    getArea() {
      this.$api({
        url: "getarea",
        method: "post",
      }).then(response => {
        this.area_options = [];
        response.desc.forEach(element => {
          var curElement = {label: '', value: ''};
          curElement.label = element.area;
          curElement.value = element.area;
          this.area_options.push(curElement);
        });
      });
    },
    getResult(data) {
      console.log('clickdata',data);
      data.area = this.select3;
      data.ke = this.select1;
      data.pi = this.select2;
      data.feng = this.keyword;
      this.$global_msg.resultInfo = data;
      this.$router.push({path:'/result'+ data.school_code})
    }
  },
  computed: {
    filteredList() {
      return this.postList; 
      // return this.postList.filter(post => {
      //   return post.title.toLowerCase().includes(this.keyword.toLowerCase());
      // });
    }
  },
  mounted: function(){
    this.getArea()
    if(this.$global_msg.queryResult.length > 0){
      this.keyword = this.$global_msg.queryOptions.keyword;
      this.ke_options = this.$global_msg.queryOptions.ke_options;
      this.pi_options =  this.$global_msg.queryOptions.ke_options;
      this.area_options = this.$global_msg.queryOptions.ke_options;
      this.select1 =  this.$global_msg.queryOptions.select1;
      this.select2 =  this.$global_msg.queryOptions.select2;
      this.select3 = this.$global_msg.queryOptions.select3;
      this.select4 = this.$global_msg.queryOptions.select4;

      let response = this.$global_msg.queryResult;
      this.postList = [];
        this.totalPage = parseInt(Math.ceil(response[1][0].total));
        console.log('total', this.totalPage )
        this.$global_msg.queryResult = response[0]
        console.log(this.$global_msg.queryResult);
        response[0].forEach(element => {
          let curname = element.names.split(',');
          this.postList.push(
            new Post(
              element.school || "",
              element.rank,
              element.score_min,
              element.school_code,
              curname[0] + "等"+ curname.length + "个专业"            )
          );
        });
    }
    // this.getInfo()
  }
};
</script>

<style scoped type="text/less" lang="less">
   @import "../assets/css/query.less";
</style>
