<template>
  <div class="editor-container">
    <!-- <p class="expain">
      富文本编辑器是重要并且核心的功能，我们最终选择了vue2-editor，轻量高效，详细请见官方
      <a href="https://www.awesomes.cn/repo/davidroyer/vue2-editor" target="_blank">文档</a>
    </p>-->
    <div class="editor-head">
      <el-select v-model="value" placeholder="请选择类别">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-input v-model="title" class="editor-title" placeholder="请输入标题"></el-input>
      <el-button type="primary" class="btn" @click="submitBtn">提交</el-button>
    </div>
    <vue-editor id="editor" useCustomImageHandler @image-added="handleImageAdded" v-model="content"></vue-editor>
    <el-divider content-position="center">预览</el-divider>

    <div class="ql-editor" v-html="content"></div>

    <el-divider content-position="center">End</el-divider>
  </div>
</template>
<script>
import { upload, submitInfo } from "@/api/api.js";
import { messages } from "@assets/js/common.js";
import { VueEditor } from "vue2-editor";
export default {
  data() {
    return {
      content: "",
      options: [
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
      value: "",
      title: ""
    };
  },
  components: {
    VueEditor
  },
  methods: {
    /**
     * @param {Object} file 图片参数
     * @param {Object} Editor 编辑器实例
     */
    handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      let formData = new FormData();
      formData.append("image", file);
      //上传图片
      upload(formData)
        .then(res => {
          let url = "https://api.dreamtime.city/images/" + res.desc;
          Editor.insertEmbed(cursorLocation, "image", url);
          resetUploader();
        })
        .catch(err => {
          console.log(err);
        });
    },
    submitBtn() {
      if (this.title == "") {
        this.$message("error", "请输入标题");
      } else if (this.value == "") {
        this.$message("error", "请选择类别");
      } else if (this.content == "") {
        this.$message("error", "请输入正文");
      } else
        submitInfo({
          title: this.title,
          content: this.content,
          type: this.value
        })
          .then(res => {
            console.log(res);
            this.$message("success", res.desc);
            this.title = "";
            this.value = "";
            this.content = "";
          })
          .catch(err => {
            this.$message("error", err);
          });
    }
  }
};
</script>

<style >
@import "~vue2-editor/dist/vue2-editor.css";

/* Import the Quill styles you want */
@import "~quill/dist/quill.core.css";
@import "~quill/dist/quill.bubble.css";
@import "~quill/dist/quill.snow.css";
.editor-container {
  padding: 40px;
}
.expain {
  font-size: 16px;
  line-height: 60px;
  background: #f2f6fc;
  margin-bottom: 20px;
}
.expain a {
  color: #bdb7ff;
}

.editor-head {
  margin: 20px;
}
.editor-head .btn {
  margin-left: 30px;
}
.editor-title {
  width: 300px;
  margin-left: 30px;
}
#editor {
  height: 400px;
}
</style>

