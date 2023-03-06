<!--
 * @Author: Yz_brightFuture 10409053+yz-brightfuture@user.noreply.gitee.com
 * @Date: 2023-02-10 11:12:15
 * @LastEditors: Yz_brightFuture 10409053+yz-brightfuture@user.noreply.gitee.com
 * @LastEditTime: 2023-03-02 10:52:32
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
      <el-row :gutter="200">
        <el-col :span="12">
          <el-form-item label="权限名称" prop="roleName">
            <el-input v-model="roleForm.roleName"></el-input>
          </el-form-item>
          <el-form-item label="权限描述">
            <el-input
              type="textarea"
              v-model="roleForm.roleDesc"
              resize="none"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-tree
            ref="tree"
            :data="data"
            show-checkbox
            node-key="id"
            default-expand-all
            :props="defaultProps"
          >
          </el-tree>
        </el-col>
      </el-row>

      <el-row justify="center" type="flex">
        <el-button
          type="success"
          size="mini"
          @click="addRole"
          icon="el-icon-circle-plus-outline"
          >新增</el-button
        >
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { addRole } from "@/api/modules/role";
import { asyncRoutes } from "@/router/index";
export default {
  data() {
    return {
      rules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
        ],
      },
      roleForm: {},
      data: asyncRoutes(),
      defaultProps: {
        children: "children",
        label: "name",
      },
    };
  },
  methods: {
    async addRole() {
      this.$refs["roleForm"].validate(async (valid) => {
        if (valid) {
          let zi = this.$refs.tree.getCheckedKeys(); //返回选中子节点的key
          let fu = this.$refs.tree.getHalfCheckedKeys(); //返回选中子节点的父节点的key
          let new1 = zi.concat(fu);
          this.roleForm.roleMenu = new1.join();
          this.roleForm.newRoleMenu = zi.join();
          let result = await addRole(this.roleForm);
          if (result.code == 200) {
            this.$confirm(result.msg + "是否继续添加角色, 是否继续?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            })
              .then(() => {
                this.roleForm = {};
                this.$nextTick(() => {
                  this.$refs.tree.setCheckedKeys([]);
                });
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
  mounted() {
    console.log(asyncRoutes);
  },
};
</script>

<style></style>
