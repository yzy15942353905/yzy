<!--
 * @Description: 
 * @Date: 2022-11-24 16:38:36
 * @LastEditTime: 2023-02-08 13:35:57
 * @FilePath: \vue_test\src\pages\userList\index.vue
-->
<template>
  <div>
    <h4 class="hear_bg">自行车查询</h4>
    <el-form
      label-width="100px"
      :model="form"
      ref="form"
      :rules="rules"
      class="formstyle"
    >
      <el-row :gutter="5">
        <el-col :span="8">
          <el-form-item prop="bicycleName" label="昵称">
            <el-input
              placeholder="自行车名称"
              v-model.trim="form.bicycleName"
              clearables
            ></el-input> </el-form-item
        ></el-col>
        <el-col :span="8">
          <el-form-item prop="address" label="地区">
            <el-select
              v-model="form.address"
              placeholder="请选择"
              style="width: 100%"
              clearable=""
            >
              <el-option
                v-for="item in address_options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option> </el-select></el-form-item
        ></el-col>
        <el-col :span="8">
          <el-form-item prop="status" label="状态">
            <el-select
              v-model="form.status"
              placeholder="请选择"
              style="width: 100%"
              clearable=""
            >
              <el-option
                v-for="item in status_options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select> </el-form-item
        ></el-col>
        <el-col :span="8">
          <el-form-item prop="bicycleType" label="自行车类型">
            <el-select
              v-model="form.bicycleType"
              placeholder="请选择"
              style="width: 100%"
              clearable=""
            >
              <el-option
                v-for="item in bicycleType_options"
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
    <h4 class="hear_bg">自行车列表</h4>
    <el-table :data="tableData" style="width: 100%" border stripe>
      <el-table-column prop="bicycleId" label="自行车id" width="80">
      </el-table-column>
      <el-table-column prop="bicycleName" label="自行车名称" width="180">
      </el-table-column>
      <el-table-column
        prop="bicycleType"
        label="自行车类型"
        width="180"
        :formatter="getBicycleType"
      >
      </el-table-column>
      <el-table-column prop="address" label="所属地区" width="80">
      </el-table-column>
      <el-table-column prop="priceHour" label="时价(元)" width="80">
      </el-table-column>
      <el-table-column prop="priceDate" label="日价(元)" width="80">
      </el-table-column>
      <el-table-column prop="priceMonth" label="月价(元)" width="80">
      </el-table-column>
      <el-table-column
        prop="isDama"
        label="是否损坏"
        width="80"
        :formatter="getIsDama"
      >
      </el-table-column>
      <el-table-column prop="bicycleDesc" label="自行车描述" width="180">
      </el-table-column>
      <el-table-column
        prop="status"
        label="自行车状态"
        width="180"
        :formatter="getStatus"
      >
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="280">
        <template slot-scope="scope">
          <el-button
            @click="lookdDetail(scope.row.bicycleId)"
            class="viewBtn"
            type="text"
            icon="el-icon-view"
            >查看详情</el-button
          >
          <el-button
            v-if="scope.row.status == 3"
            @click="putShelf(scope.row.bicycleId)"
            type="text"
            class="editBtn"
            icon="el-icon-position"
            >上架</el-button
          >
          <el-button
            v-if="scope.row.status == 1"
            @click="offShelf(scope.row.bicycleId)"
            type="text"
            class="deleteBtn"
            icon="el-icon-delete"
            >下架</el-button
          >
          <el-button
            v-if="scope.row.isDama == 0"
            @click="maintain(scope.row.bicycleId)"
            type="text"
            icon="el-icon-refresh-left"
            class="addBtn"
            >维修</el-button
          >
          <el-button
            @click="update(scope.row.bicycleId)"
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
import {
  getBicycleListMange,
  saveOrUpdate,
  putShelf,
  offShelf,
  maintain,
} from "@/api/modules/bicycle.js";
export default {
  data() {
    return {
      form: {},
      rules: {},
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 5,
      bicycleType_options: [
        {
          value: "1",
          label: "山地车",
        },
        {
          value: "2",
          label: "普通自行车",
        },
      ],
      address_options: [
        {
          value: "1001",
          label: "地区1",
        },
        {
          value: "1002",
          label: "地区2",
        },
      ],
      status_options: [
        {
          value: "1",
          label: "空闲",
        },
        {
          value: "2",
          label: "出租",
        },
        {
          value: "3",
          label: "下架",
        },
      ],
    };
  },
  methods: {
    getIsDama(row) {
      let obj = {
        1: "否",
        0: "是",
      };
      return obj[row.isDama];
    },
    getStatus(row) {
      let obj = {
        1: "空闲",
        2: "出租中",
        3: "下架",
      };
      return obj[row.status];
    },
    getBicycleType(row) {
      let obj = {
        1: "山地车",
        2: "普通自行车",
      };
      return obj[row.bicycleType];
    },
    async findPage(pageNum) {
      pageNum && (this.form.pageNum = pageNum);
      this.form.pageSize = this.pageSize;
      let result = await getBicycleListMange(this.form);
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
      let result = "";
      if (result.code == 200) {
        this.$message.success(result.msg);
        this.findPage(1);
      } else {
        this.$message.error(result.msg);
      }
    },
    async update() {},
    async putShelf(bicycleId) {
      let result = await putShelf(bicycleId);
      if (result.code == 200) {
        this.$message.success(result.msg);
        this.findPage(1);
      } else {
        this.$message.error(result.msg);
      }
    },
    async offShelf(bicycleId) {
      let result = await offShelf(bicycleId);
      if (result.code == 200) {
        this.$message.success(result.msg);
        this.findPage(1);
      } else {
        this.$message.error(result.msg);
      }
    },
    async maintain(bicycleId) {
      let result = await maintain(bicycleId);
      if (result.code == 200) {
        this.$message.success(result.msg);
        this.findPage(1);
      } else {
        this.$message.error(result.msg);
      }
    },
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