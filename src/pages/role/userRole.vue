<template>
  <div>
    <h4 class="hear_bg">用户查询</h4>
    <el-form
      label-width="80px"
      :model="form"
      ref="form"
      :rules="rules"
      class="formstyle"
    >
      <el-row :gutter="5">
        <el-col :span="8">
          <el-form-item prop="nickName" label="昵称">
            <el-input
              placeholder="昵称"
              v-model.trim="form.nickName"
              clearable
            ></el-input> </el-form-item
        ></el-col>
        <el-col :span="8">
          <el-form-item prop="phone" label="手机号码">
            <el-input
              placeholder="手机号码"
              v-model.trim="form.phone"
              clearable
            ></el-input> </el-form-item
        ></el-col>
      </el-row>
      <el-row justify="center" type="flex" class="mt10">
        <el-button
          size="small"
          icon="el-icon-search"
          type="primary"
          @click="findPage(1)"
          >查 询</el-button
        >
      </el-row>
    </el-form>
    <h4 class="hear_bg">用户列表</h4>
    <el-table :data="tableData" style="width: 100%" border stripe>
      <el-table-column prop="id" label="用户id" width="80"> </el-table-column>
      <el-table-column prop="nickName" label="昵称"> </el-table-column>
      <el-table-column prop="phone" label="手机号码" width="180">
      </el-table-column>
      <el-table-column fixed="right" label="修改权限" width="280">
        <template slot-scope="scope">
          <el-select
            :popper-append-to-body="false"
            v-model="scope.row.role"
            value-key=""
            placeholder=""
            clearable
            filterable
            @change="(val) => selectChange(val, scope.row.id)"
          >
            <el-option
              v-for="item in options"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>
    </el-table>
    <div class="block pageStyle">
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="pageSize"
        :current-page.sync="pageNum"
        layout="total, prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {
  findPage,
  deleteById,
  getById,
  savaOrUpdate,
} from "@/api/modules/user.js";
import { updateUserRole, RoleList } from "@/api/modules/role.js";
export default {
  data() {
    return {
      form: {},
      rules: {},
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 10,
      options: [],
    };
  },
  methods: {
    async RoleList() {
      let result = await RoleList();

      if (result.code == 200) {
        this.options = result.data;
        for (let index = 0; index < this.options.length; index++) {
          this.options[index].roleId = this.options[index].roleId + "";
        }
      } else {
        this.$message.error(result.msg);
      }
      this.findPage(1);
    },
    async selectChange(roleId, userId) {
      let form = {
        roleId,
        userId,
      };
      let result = await updateUserRole(form);
      if (result.code == 200) {
        this.$message.success(result.msg);
        this.findPage(1);
      } else {
        this.$message.error(result.msg);
      }
    },

    async findPage(pageNum) {
      pageNum && (this.form.pageNum = pageNum);
      this.form.pageSize = this.pageSize;
      let result = await findPage(this.form);
      if (result.code == 200) {
        if (
          result.data == null ||
          result.data.records == null ||
          result.data.records.length == 0
        ) {
          this.$message({
            type: "warning",
            message: "您查询的结果不存在！",
          });
          this.tableData = [];
          this.total = 0;
        } else {
          this.tableData = result.data.records;
          this.total = result.data.total;
        }
      }
    },
    async lookdDetail(id) {},
    deleteById(id) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let result = await deleteById(id);

          if (result.code == 200) {
            this.$message.success(result.msg);
            this.findPage(1);
          } else {
            this.$message.error(result.msg);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    async update() {},
    handleCurrentChange(val) {
      this.findPage(val);
    },
  },
  created() {
    this.RoleList();
  },
};
</script>

<style lang="scss"></style>
