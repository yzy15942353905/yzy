<!--
 * @Description: 
 * @Date: 2022-11-26 15:47:08
 * @LastEditTime: 2023-02-10 13:38:09
 * @FilePath: \vue_test\src\pages\role\index.vue
-->
<template>
  <div>
    <div v-for="item in roleInfo" :key="item.roleId">
      <el-descriptions title="权限信息" :column="2" class="descriptionsStyle">
        <el-descriptions-item label="权限id">{{
          item.roleId
        }}</el-descriptions-item>
        <el-descriptions-item label="权限名称">{{
          item.roleName
        }}</el-descriptions-item>
        <el-descriptions-item label="描述">{{
          item.roleDesc
        }}</el-descriptions-item>
        <el-descriptions-item label="操作">
          <el-button
            type="primary"
            size="mini"
            @click="afterUpdate(item.roleId)"
            >修改</el-button
          >
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <el-dialog title="修改权限信息" :visible.sync="dialogVisible" width="70%">
      <el-form ref="roleForm" :model="roleForm" label-width="80px">
        <el-row :gutter="10" justify="center" type="flex">
          <el-col :span="12">
            <el-form-item label="权限id">
              <el-input v-model="roleForm.roleId" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10" justify="center" type="flex">
          <el-col :span="12">
            <el-form-item label="权限名称" prop="roleName">
              <el-input v-model="roleForm.roleName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10" justify="center" type="flex">
          <el-col :span="12">
            <el-form-item label="权限描述">
              <el-input
                type="textarea"
                v-model="roleForm.roleDesc"
                resize="none"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" @click="updateRole">修 改</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRoleList, getRoleById, updateRole } from "@/api/modules/role";
export default {
  data() {
    return {
      roleInfo: [],
      dialogVisible: false,
      roleForm: {},
      rules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    async getRoleList() {
      let result = await getRoleList();
      if (result.code == 200) {
        if (result.data.records.length == 0) {
          this.$message.warning("您查询的结果不存在！");
        } else {
          this.roleInfo = result.data.records;
        }
      } else {
        this.$message.error(result.msg);
      }
    },
    // 更新之前
    async afterUpdate(roleId) {
      let result = await getRoleById(roleId);
      if (result.code == 200) {
        this.roleForm = result.data;
        this.dialogVisible = true;
      } else {
        this.$message.error(result.msg);
      }
    },
    // 更新
    async updateRole() {
      this.$refs["roleForm"].validate(async (valid) => {
        if (valid) {
          let result = await updateRole(this.roleForm);
          if (result.code == 200) {
            this.$message.success(result.msg);
            this.dialogVisible = false;
            this.getRoleList();
          } else {
            this.$message.error(result.msg);
          }
        }
      });
    },
  },
  mounted() {
    this.getRoleList();
  },
};
</script>

<style scoped>
.descriptionsStyle {
  margin-bottom: 5vh;
  border: 1px solid #fafbfe;
  transition: all 0.3s;
  padding: 10px 10px;
}
.descriptionsStyle:hover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
</style>