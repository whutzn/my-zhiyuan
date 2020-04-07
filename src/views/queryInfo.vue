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
          <a v-bind:href="post.link" target="_blank">
            <img v-bind:src="post.img" />
            <small>{{ post.author }}</small>
            {{ post.title }}
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

class Post {
  constructor(title, link, author, img) {
    this.title = title;
    this.link = link;
    this.author = author;
    this.img = img;
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
      select: "",
      postList: [
        // new Post(
        //   "Feathers.js",
        //   "http://feathersjs.com/",
        //   "Chuck",
        //   "https://cdn.worldvectorlogo.com/logos/feathersjs.svg"
        // )
      ],
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
      select4: ''
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
              "http://feathersjs.com/",
              curname[0] + "等"+ curname.length + "个专业",
              "https://cdn.worldvectorlogo.com/logos/feathersjs.svg"
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
              "http://feathersjs.com/",
              curname[0] + "等"+ curname.length + "个专业",
              "https://cdn.worldvectorlogo.com/logos/feathersjs.svg"
            )
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
