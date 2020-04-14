<template>
  <div class="content">
    <h1>内容管理</h1>
    <div class="content-main">
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column label="序号" width="50" type="index"></el-table-column>
        <el-table-column label="日期" align="center" prop="date"></el-table-column>
        <el-table-column label="标题" align="center" prop="title"></el-table-column>
        <el-table-column label="类型" align="center" prop="type"></el-table-column>
        <el-table-column align="right">
          <template v-slot:default="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top: 20px;"
        @current-change="handleCurrentChange"
        background
        layout="prev, pager, next"
        :total="1000"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { getInfoList, removeInfo } from "@/api/api.js";

const INFO_TYPES = {
  "1": "普通文理",
  "2": "技能高考",
  "3": "高职单招",
  "4": "艺术统考",
  "10": "关于我们"
};

const INFOS_TYPE = [
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
];

export default {
  components: {},
  data() {
    return {
      tableData: [
        {
          id: 1,
          date: "2016-05-02",
          title: "王小虎",
          type: "上海市普陀区金沙江路 1518 弄"
        }
      ],
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
          removeInfo({ id: this.tableData[index].id })
            .then(res => {
              console.log("delete", res);
              this.$message("success", "删除成功!", 1000);
              this.getList();
            })
            .catch(err => {
              this.$message("error", err);
            });
        })
        .catch(() => {
          this.$message("info", "已取消删除", 500);
        });
    },
    handleCurrentChange(val) {
      console.log("当前页", val);
    },
    getList() {
      getInfoList()
        .then(res => {
          console.log("list", res);

          this.tableData = [];
          res.desc.forEach(element => {
            let curEle = {
              id: 1,
              date: "2016-05-02",
              title: "王小虎",
              type: "标题"
            };
            curEle.id = element.id;
            curEle.date = element.create_time;
            curEle.title = element.title;
            curEle.type = INFO_TYPES[element.type];
            this.tableData.push(curEle);
          });
          // this.$message("success", res.desc);
        })
        .catch(err => {
          this.$message("error", err);
        });
    }
  },
  mounted() {
    this.getList();
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
