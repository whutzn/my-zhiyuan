<template>
  <div class="wrapper-main">
    <div class="banner-box"></div>
    <div class="wrapper-about">
      <div class="wrapper">
        <h1 id="about1">公司简介</h1>
        <div class="about-main">
          <img class="about-pic" src="../assets/img/test.png" />
          <div class="about-text">
            <h3>梦想拾代的使命是让考生没有难填报的志愿</h3>
            <p>武汉梦想拾代教育科技有限公司成立于2017年，公司成立的宗旨是为考生提供免费、准确、便捷的高考数据查询和高考前沿信息服务，让考生没有难填报的志愿和考生不浪费一分进入理想大学是我们梦想拾代员工的工作目标。</p>
            <p>
              梦想拾代的愿景
              <br />我们旨在构建免费的志愿填报和交流互动平台，让考生因梦想拾代的存在而美好，永远追求用户第一、开放共享。
            </p>
          </div>
        </div>
      </div>
      <div class="wrapper">
        <h1 id="about2">企业文化</h1>
        <div class="about-main">
          <img class="about-pic" src="../assets/img/test4.jpeg" />
          <div class="about-text">
            <h3>梦想拾代的企业文化</h3>
            <p>梦想拾代的文化关乎维护考生的利益。我们的大数据的所有参与者，包括考生、家长、高校和其他人士，都享有数据免费开放带来的机会。我们的成功和增长有赖于我们尊崇开放共享和时刻创新的精神，并始终如一地关注和满足广大使用者的需求。</p>
            <p>我们相信，无论公司成长到哪个阶段，我们为用户服务的使命感和强大的共同价值观都可以维护我们的企业文化以及公司的凝聚力。</p>
          </div>
        </div>
      </div>
      <div class="wrapper">
        <h1 id="about3">梦想拾代的价值观</h1>
        <p>梦想拾代的四个价值观对于我们如何服务用户、经营业务、工作生活和赋能社会扮演着重要的角色，四个价值观为：</p>
        <div class="about-main">
          <img class="about-pic" src="../assets/img/test5.jpg" />
          <div class="about-text">
            <h3>用户第一、员工第二</h3>
            <p>用户是公司存在的前提，服务好用户才能体现公司的价值，员工才能成长，公司才有意义。</p>
          </div>
        </div>
      </div>
      <div class="wrapper">
        <div class="about-main">
          <img class="about-pic" src="../assets/img/test3.jpeg" />
          <div class="about-text">
            <h3>开放共享、时刻创新</h3>
            <p>公司免费开放数据，为用户免费提供以前需要付费的服务，我们明白，只有时刻创新才能永立潮头，世界因创新而美好。</p>
          </div>
        </div>
      </div>
      <div class="wrapper">
        <div class="about-main">
          <img class="about-pic" src="../assets/img/test2.jpg" />
          <div class="about-text">
            <h3>健康生活、开心工作</h3>
            <p>只有健康的生活才能更好的照顾家庭，只有开心的工作才能充分发挥创造性和提高工作效率，认真生活生活才会公平的对待你。我们尊重每一个梦想拾代人的工作和生活态度，我们尊重每一个梦想拾代人的选择，这条价值观的考核，留给生活本身。</p>
          </div>
        </div>
      </div>
      <div class="wrapper">
        <div class="about-main">
          <img class="about-pic" src="../assets/img/test1.jpg" />
          <div class="about-text">
            <h3>服务高考、文明社会</h3>
            <p>高考是每年中国社会最重要的事情之一，让考生不浪费一分进入理想大学，就是让考生的个人价值充分体现，每一名学子都能实现个人价值，社会就会越来越文明。</p>
          </div>
        </div>
      </div>
    </div>
    <BackTop />
  </div>
</template>

<script>
import BackTop from "@/components/BackTop.vue";
export default {
  name: "about",
  components: {
    BackTop
  },
  data() {
    return {
      
    }
  },
  methods: {
  
  },
  mounted() {
    // this.gotoPosition()
    let curid = this.$route.params.id;
    if(curid !== 1) {
      document.querySelector(`#about${curid}`).scrollIntoView(true);
    }
  },
};
</script>

<style scoped lang="less">
@import "../assets/css/about.less";
</style>
