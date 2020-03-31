<template>
    <div class="wrapper-main">
        <div class="banner-box"></div>
        <div class="wrapper-content">
            <sticky>
               <div style="background: #FAFAFA; ">
                   <h1 style="margin: 0; line-height: 1.5">新闻列表</h1>
                   <router-link to="/product/list">新闻一</router-link>
                   <router-link to="/product/edit">新闻二</router-link>
               </div>
            </sticky>
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
    </div>
</template>

<script>
    import Sticky from '@/components/Sticky'
    export default {
        name: "product",
        components: { Sticky },
        data() {
            return {

            }
        }
    }
</script>

<style scoped type="text/less" lang="less">
    @import "../assets/css/product.less";
</style>