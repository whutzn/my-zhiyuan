<template>
  <div class="wrapper-main">
    <div class="banner-box" v-if="msg != 1"></div>
    <div class="wrapper-content">
      <sticky>
        <div style="background: #FAFAFA; ">
          <h1 style="margin: 0; line-height: 1.5">新闻列表</h1>
          <!-- <router-link to="/product/list">新闻一</router-link>
          <router-link to="/product/edit">新闻二</router-link>-->
          <div class="news_tab">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
              <el-tab-pane label="普通文理" name="1"></el-tab-pane>
              <el-tab-pane label="技能高考" name="2"></el-tab-pane>
              <el-tab-pane label="高职单招" name="3"></el-tab-pane>
              <el-tab-pane label="艺术统考" name="4"></el-tab-pane>
            </el-tabs>
          </div>

          <div class="news_list">
            <ul>
              <li v-for="(item,index) in infosList">
                <router-link :to="{name:'content', params:{id:item.id}}">{{item.title}}</router-link>
                <span>[{{item.publicTime}}]</span>
              </li>
            </ul>
          </div>
        </div>
      </sticky>
      <keep-alive>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import Sticky from "@/components/Sticky";
export default {
  name: "product",
  components: { Sticky },
  props: {
    msg: {
      type: Number,
      value: 0
    }
  },
  data() {
    return {
      infosList: [
        {
          id: 1,
          title: "新闻一",
          publicTime: "1480854958842"
        },
        {
          id: 2,
          title: "新闻二",
          publicTime: "1480854958842"
        }
      ],
      menuList: [
        {
          label: "普通文理",
          value: 1
        },
        {
          label: "技能高考",
          value: 2
        },
        {
          label: "高职单招",
          value: 3
        },
        {
          label: "艺术统考",
          value: 4
        }
      ],
      activeName: "2"
    };
  },
  methods: {
    handleClick(tab, event) {
      this.getInfos(this.activeName);
    },
    timeFormatter(value) {
      var da = new Date(
        value
          .replace("/Date(", "")
          .replace(")/", "")
          .split("+")[0]
      );

      return (
        da.getFullYear() +
        "-" +
        (da.getMonth() + 1) +
        "-" +
        da.getDate() +
        " " +
        da.getHours() +
        ":" +
        da.getMinutes() +
        ":" +
        da.getSeconds()
      );
    },
    getInfos(type) {
      this.$api({
        url: "getinfos",
        method: "post",
        data: {
          type: type
        }
      }).then(response => {
        this.infosList = [];
        response.desc.forEach(element => {
          var curElement = {
            id: 1,
            title: "新闻一",
            publicTime: "1480854958842"
          };
          curElement.id = element.id;
          curElement.title = element.title;
          curElement.publicTime = this.timeFormatter(element.create_time);
          this.infosList.push(curElement);
        });
      });
    }
  },
  mounted() {
    this.getInfos(this.activeName);
  }
};
</script>

<style scoped type="text/less" lang="less">
@import "../assets/css/product.less";
</style>