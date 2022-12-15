<template>
  <div class="user-container">
    <!-- 对话按钮 -->
    <div class="editButton">
      <el-button type="primary" @click="addUser">+ 新增</el-button>
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="searchForm.name" placeholder="查找用户"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 对话框(添加 编辑) -->
    <el-dialog :title="modelType === 0 ? '新增用户' : '编辑用户'" :visible.sync="dialogVisible" width="45%" :before-close="handleClose">
      <span>
        <!-- form表单 -->
        <el-form ref="userForm" :model="form" label-width="80px" :inline="true" :rules="rules">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input v-model="form.age" placeholder="请输入年龄"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-select v-model="form.sex" placeholder="请选择性别">
              <el-option label="男" :value="1"></el-option>
              <el-option label="女" :value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出生日期" prop="birth">
            <el-date-picker type="date" placeholder="请输入出生日期" v-model="form.birth" style="width: 100%" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
          <el-form-item label="地址" prop="addr">
            <el-input v-model="form.addr" placeholder="请输入地址"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancle">取 消</el-button>
        <el-button type="primary" @click="onsubmit">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 表格区域 -->
    <div class="command-table">
      <el-table :data="tableData" style="width: 100%" height="630" class="userTable">
        <el-table-column prop="name" label="姓名" style="width: 15%"> </el-table-column>
        <el-table-column prop="age" label="年龄" style="width: 15%"> </el-table-column>
        <el-table-column prop="sex" label="性别" style="width: 15%">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.sex === 1 ? '男' : '女' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="birth" label="出生日期" style="width: 20%"> </el-table-column>
        <el-table-column prop="addr" label="地址"> </el-table-column>
        <el-table-column label="操作" style="width: 15%">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleRemove(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination layout="prev, pager, next" :total="total" @current-change="changePage" class="pages"></el-pagination>
    </div>
  </div>
</template>

<script>
import { getUser, addUser, editUser, removeUser } from '@/api/index'
export default {
  name: 'v-User',
  data() {
    return {
      dialogVisible: false,
      form: {
        name: '',
        age: '',
        addr: '',
        birth: '',
        sex: ''
      },
      rules: {
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' },
          { min: 2, max: 5, message: '姓名长度在2到5个字符', trigger: 'blur' }
        ],
        age: [{ required: true, message: '年龄不能为空', trigger: 'blur' }],
        addr: [{ required: true, message: '地址不能为空', trigger: 'blur' }],
        birth: [{ required: true, message: '出生日期不能为空', trigger: 'change' }],
        sex: [{ required: true, message: '性别不能为空', trigger: 'change' }]
      },
      tableData: [],
      // 0表示打开的是新增按钮
      modelType: 0,
      total: 0, // 分页总数，默认为0
      pages: {
        page: 1,
        limit: 10
      },
      searchForm: {
        name: ''
      }
    }
  },
  methods: {
    handleClose() {
      this.$refs.userForm.resetFields()
      this.dialogVisible = false
    },
    handleAdd() {
      addUser(this.form).then(() => {
        // 更新列表数据
        this.getList(this.pages)
      })
    },
    handleEdit(row) {
      this.modelType = 1
      this.dialogVisible = true
      // 注意这里必须将对象序列化成json数据再反序列化成js对象进行深拷贝
      this.form = JSON.parse(JSON.stringify(row))
    },
    handleRemove(row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          removeUser({ id: row.id }).then(() => {
            this.getList(this.pages)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    addUser() {
      this.dialogVisible = true
      this.modelType = 0
    },
    onsubmit() {
      this.$refs.userForm.validate((valid) => {
        if (valid) {
          if (this.modelType === 0) {
            this.handleAdd(this.form)
          } else {
            // if (this.tableData.length === 1) {
            //   editUser(this.form).then(() => {
            //     this.getList({ ...this.form.name, ...this.pages })
            //   })
            // } else {
            //   editUser(this.form).then(() => {
            //     this.getList(this.pages)
            //   })
            // }
            editUser(this.form).then(() => {
              this.getList(this.pages)
            })
          }
          this.$refs.userForm.resetFields()
          this.dialogVisible = false
        }
      })
    },
    cancle() {
      this.handleClose()
    },
    getList(pages) {
      // 获取列表数据
      getUser({ params: pages }).then(({ data }) => {
        this.tableData = data.list
        this.total = data.count || 0
      })
    },
    changePage(val) {
      this.pages.page = val
      this.getList(this.pages)
    },
    onSubmit() {
      if (this.searchForm.name.trim().length === 0) {
        return alert('请输入用户名查询')
      } else {
        getUser({ params: { ...this.searchForm, ...this.pages } }).then(({ data }) => {
          this.tableData = data.list
          this.total = data.count || 0
        })
      }
    }
  },
  mounted() {
    this.getList(this.pages)
  }
}
</script>

<style lang="less" scoped>
.command-table {
  position: relative;
  margin-top: 50px;
  .userTable {
    height: 100%;
  }
  .pages {
    position: absolute;
    right: 20px;
  }
}
.editButton {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .demo-form-inline {
    .el-form-item {
      margin: 11px 0;
    }
  }
}
</style>
