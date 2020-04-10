<template>
  <div class="content">
    <h1>这是内容管理</h1>
    <div class="content-main">
      <el-table
        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%"
      >
        <el-table-column label="序号" prop="id"></el-table-column>
        <el-table-column label="日期" prop="date"></el-table-column>
        <el-table-column label="标题" prop="name"></el-table-column>
        <el-table-column label="类型" prop="name"></el-table-column>
        <el-table-column align="right">
          <template slot="header" slot-scope="scope">
            <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
          </template>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination style="margin-top: 20px;" @current-change="handleCurrentChange" background layout="prev, pager, next" :total="1000"></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      tableData: [
        {
          id: 1,
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id: 2,
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          id: 3,
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          id: 4,
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      search: ""
    };
  },
  computed: {},
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          console.log("cur_data", this.tableData[index]);
          this.$message("success", "删除成功!", 1000);
        })
        .catch(() => {
          this.$message("info", "已取消删除", 500);
        });
    },
    handleCurrentChange(val) {
      console.log('当前页',val)
    }
  }
};
</script>
<style lang="scss" scoped>
.content {
  height: 100%;
  width: 100%;
  h1 {
    font-size: 20px;
  }
  text-align: center;
  .content-main {
    width: 80%;
    display: inline-table;
  }
}
</style>
