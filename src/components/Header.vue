<template>
  <div class="header flex">
    <div class="logo flex">
      <img class="pic" src="../assets/img/test.png" />
      <span class="title">让考生没有难填报的志愿 不浪费一分进入理想大学</span>
    </div>
    <div class="menu flex">
      <div class="menu-item-box flex">
        <el-menu
          class="el-menu-main"
          mode="horizontal"
          background-color="transparent"
          text-color="#fff"
          router
          active-text-color="#ffd04b"
        >
        <el-submenu class="menu-about" index="1">
            <template  slot="title">关于我们</template>
            <el-menu-item index="/about1">公司简介</el-menu-item>
            <el-menu-item index="/about2">文化和价值观</el-menu-item>
            <el-menu-item index="/about3">运营</el-menu-item>
          </el-submenu>
          <el-submenu class="menu-about" index="2">
            <template  slot="title">普通高校招生</template>
            <el-menu-item index="/product">普通文理</el-menu-item>
            <el-menu-item index="/product">技能高考</el-menu-item>
            <el-menu-item index="/product">高职单招</el-menu-item>
            <el-menu-item index="/product">艺术统考</el-menu-item>
          </el-submenu>
          <el-submenu class="menu-about" index="3">
            <template  slot="title">志愿填报</template>
            <el-menu-item index="/home">志愿填报一对一</el-menu-item>
            <el-menu-item index="/home">技能单招一对一</el-menu-item>
          </el-submenu>
          <el-submenu class="menu-about" index="4">
            <template  slot="title">联系我们</template>
            <el-menu-item index="/home">社区</el-menu-item>
            <el-menu-item index="/home">商务合作</el-menu-item>
          </el-submenu>
          <!-- <el-menu-item index="/product">资讯</el-menu-item> -->
        </el-menu>
      </div>
      <!-- <div class="menu-login-box flex">
                <div class="button-group-item">
                    <router-link to="/login" class="button button-link">{{$t('menu.login')}}</router-link>
                </div>
                <div class="button-group-item">
                    <router-link to="/register" class="button button-link">{{$t('menu.register')}}</router-link>
                </div>
      </div>-->
      <!-- <div class="language">
                <el-dropdown trigger="click" class="international" @command="handleSetLanguage">
                    <div>选择语言</div>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item :disabled="language==='zh'" command="zh">中文</el-dropdown-item>
                        <el-dropdown-item :disabled="language==='en'" command="en">English</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
      </div>-->
    </div>
  </div>
</template>

<script>
import { Message } from "element-ui";

export default {
  name: "Header",
  computed: {
    language() {
      return this.$store.getters.language;
    }
  },
  data() {
    return {
      
    };
  },
  methods: {
    handleSetLanguage(lang) {
      this.$i18n.locale = lang;
      this.$store.dispatch("setLanguage", lang);
      Message.success({
        message: this.$t("action.switchLanguage"),
        type: "success"
      });
    }
  }
};
</script>

<style scoped type="text/less" lang="less">
.wrapper-header {
  .header {
    height: 100px;
    justify-content: space-around;
    align-items: center;
    transition: background 1s ease-out;
  }
  &.headroom--top .header:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  .logo {
    align-items: center;
    .pic {
      height: 80px;
      width: 80px;
    }
  }
  .title {
    font-size: 1.5rem;
    border-left: 2px solid #ffffff;
    padding-left: 10px;
    margin-left: 7px;
    color: #fff;
    line-height: 2;
  }
  .menu {
    justify-content: center;
    align-items: center;
    .el-menu-main{
        border: none;
        .el-menu-item {
            font-size: 14px;
        }
    }
  }
  .banner-button {
    position: absolute;
    left: 46%;
    top: 83%;
    background: #455e9e;
    color: #fff;
    border: 1px solid #455e9e;
  }
  .language {
    margin-left: 50px;
    .el-dropdown-selfdefine {
      color: #fff;
    }
  }
  .menu-item-box {
    .menu-item {
      color: rgba(255, 255, 255, 0.8);
      padding: 15px 20px;
      cursor: pointer;
      position: relative;
      font-size: 1rem;
      a {
        text-decoration: none;
        color: rgba(255, 255, 255, 0.8);
      }
      &:hover {
        color: #fff;
        > a {
          color: #fff;
        }
      }
      &:after {
        content: " ";
        background: #fff;
        position: absolute;
        bottom: -4px;
        left: 50%;
        width: 0;
        height: 2px;
        transition: all 0.3s;
      }
      &:hover:after {
        width: 80%;
        margin-left: -40%;
      }
      &.active {
        color: #fff;
      }
    }
  }
  .menu-login-box {
    height: 60px;
    line-height: 60px;
    margin-left: 5px;

    .button-group-item {
      .button {
        padding-left: 15px;
        padding-right: 15px;
        font-size: 0.875rem;
        border: solid 1px rgba(255, 255, 255, 0);
      }
      &:hover {
        background-color: #455e9e;
      }
    }
    .button {
      color: #fff;
      text-decoration: none;
      border: 0;
    }
  }
  &.headroom--not-top .menu-login-box {
    .button-group-item {
      padding: 0px;
      a {
        margin-top: 10px;
        padding-top: 11px;
        padding-bottom: 11px;
        border-radius: 4px;
        transition: all 0.3s;
        &:hover {
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.15);
        }
      }
    }
  }
}
</style>