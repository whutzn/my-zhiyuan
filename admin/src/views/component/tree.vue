<template>
  <div class="file-contaniner">
    <h1>文件上传</h1>
    <div class="file-main">
      <el-upload
        class="upload-demo"
        action
        :show-file-list="false"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :on-success="handleSuccess"
        :on-error="handleError"
        :auto-upload="false"
        accept=".xls, .xlsx"
        :on-change="addFileToFormData"
      >
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <div slot="tip" class="el-upload__tip">只能上传xls/xlsx文件,建议一次上传一个</div>
      </el-upload>
    </div>
    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
  </div>
</template>
<script>
import { upload } from "@/api/api.js";
export default {
  components: {},
  data() {
    return {
      fileList: [],
      fileFormData: null // 将要上传的formdata数据
    };
  },
  methods: {
    submitUpload() {
      // this.$refs.upload.submit();
      upload(this.fileFormData)
        .then(res => {
          // this.$message("success", res);
          console.log("res", res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleSuccess(response, file, fileList) {
      this.$message("success", response);
      console.log(response, file, fileList);
    },
    handleError(err, file, fileList) {
      this.$message("error", err);
      console.log(err, file, fileList);
    },
    addFileToFormData(file) {
      this.fileFormData = new FormData();
      this.fileFormData.append("image", file.raw);
    }
  },
  created() {}
};
</script>
<style lang="scss" scoped>
.file-contaniner {
  text-align: -webkit-center;
}
.file-main {
  max-width: 600px;
}
</style>
