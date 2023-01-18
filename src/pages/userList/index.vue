<!--
 * @Description: 
 * @Date: 2022-11-24 16:38:36
 * @LastEditTime: 2023-01-16 13:46:41
 * @FilePath: \vue_test\src\pages\userList\index.vue
-->
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
        <el-col :span="8">
          <el-form-item prop="sex" label="性别">
            <el-select
              v-model="form.sex"
              placeholder="请选择"
              style="width: 100%"
              clearable=""
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select> </el-form-item
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
      <el-table-column prop="sex" label="性别" width="80"> </el-table-column>
      <el-table-column prop="points" label="积分" width="80"> </el-table-column>
      <el-table-column prop="credit" label="信誉度" width="80">
      </el-table-column>
      <el-table-column prop="address" label="地址" width="300">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="180">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="280">
        <template slot-scope="scope">
          <el-button
            @click="lookdDetail(scope.row.id)"
            class="viewBtn"
            type="text"
            icon="el-icon-view"
            >查看详情</el-button
          >
          <el-button
            @click="deleteById(scope.row.id)"
            type="text"
            class="deleteBtn"
            icon="el-icon-delete"
            >删除</el-button
          >
          <el-button
            @click="update(scope.row)"
            type="text"
            icon="el-icon-edit"
            class="editBtn"
            >修改</el-button
          >
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
import { findPage, deleteById, getById, savaOrUpdate } from "@/api/modules/user.js";
export default {
  data() {
    return {
      form: {},
      rules: {},
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 10,
      options: [
        { lable: "男", value: "男" },
        { lable: "女", value: "女" },
        { lable: "保密", value: "保密" },
      ],
    };
  },
  methods: {
    async findPage(pageNum) {
      this.form.pageNum = pageNum;
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
    async deleteById(id) {
      let result = await deleteById(id);

      if (result.code == 200) {
        this.$message.success(result.msg);
        // this.findPage(1);
      } else {
        this.$message.error(result.msg);
      }
    },
    async update() {},
    handleCurrentChange(val) {
      this.findPage(val);
    },
  },
  mounted() {
    this.findPage(1);
  },
};
</script>

<style>
</style>