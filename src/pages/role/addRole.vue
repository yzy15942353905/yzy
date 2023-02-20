<!--
 * @Author: Yz_brightFuture 10409053+yz-brightfuture@user.noreply.gitee.com
 * @Date: 2023-02-10 11:12:15
 * @LastEditors: Yz_brightFuture 10409053+yz-brightfuture@user.noreply.gitee.com
 * @LastEditTime: 2023-02-10 13:37:11
 * @FilePath: \yzy-2\src\pages\role\addRole.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <h4 class="hear_bg">新增权限</h4>
    <el-form
      ref="roleForm"
      :model="roleForm"
      label-width="80px"
      :rules="rules"
      class="formstyle"
    >
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
      <el-row justify="center" type="flex">
        <el-button type="success" size="mini" @click="addRole">新增</el-button>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { addRole } from "@/api/modules/role";
export default {
  data() {
    return {
      rules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
        ],
      },
      roleForm: {},
    };
  },
  methods: {
    async addRole() {
      this.$refs["roleForm"].validate(async (valid) => {
        if (valid) {
          let result = await addRole(this.roleForm);
          if (result.code == 200) {
            this.$confirm(result.msg + "是否继续添加角色, 是否继续?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            })
              .then(() => {
                this.roleForm = {};
              })
              .catch(() => {
                this.$router.push("/roleSystem");
              });
            this.$message.success(result.msg);
          } else {
            this.$message.error(result.msg);
          }
        }
      });
    },
  },
};
</script>

<style>
</style>