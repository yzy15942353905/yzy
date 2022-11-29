<!--
 * @Description: 
 * @Date: 2022-11-24 16:38:36
 * @LastEditTime: 2022-11-28 16:14:08
 * @FilePath: \vue_test\src\pages\userList\index.vue
-->
<template>
  <div>
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
              v-model.trim="form.nickName"
              clearable
            ></el-input> </el-form-item
        ></el-col>
        <el-col :span="8">
          <el-form-item prop="nickName" label="昵称">
            <el-input
              v-model.trim="form.nickName"
              clearable
            ></el-input> </el-form-item
        ></el-col>
        <el-col :span="8">
          <el-form-item prop="nickName" label="昵称">
            <el-input
              v-model.trim="form.nickName"
              clearable
            ></el-input> </el-form-item
        ></el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      rules: {},
    };
  },
};
</script>

<style>
</style>