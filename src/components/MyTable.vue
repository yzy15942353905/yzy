<template>
  <el-table
    :data="tableInfo.tableList"
    style="width: 100%"
    :border="tableInfo.isBorder"
    v-loading="tableInfo.isLoading"
    element-loading-text="加载中..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.1)"
  >
    <el-table-column type="expand" v-if="expent.isExpand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item
            v-for="tableExpent in expent.tableExpents"
            :key="tableExpent.id"
            :label="tableExpent.label"
          >
            <span>{{ props.row[tableExpent.prop] }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      v-for="table in tableInfo.tableListMap"
      :key="table.id"
      :prop="table.prop"
      :label="table.label"
      :width="table.width"
      :align="table.align"
    >
    </el-table-column>
    <el-table-column
      label="操作"
      v-if="handle.isHandle"
      :fixed="handle.handleFixed"
    >
      <template slot-scope="scope">
        <el-button
          v-for="handle in handle.handleList"
          :key="handle.id"
          :type="handle.type"
          :class="handle.class"
          :icon="handle.icon"
          :size="handle.size"
          @click="$emit(handle.callback, scope.row)"
          >{{ handle.label }}</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "MyTable",
  props: {
    tableInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  computed: {
    handle() {
      return this.tableInfo.handle;
    },
    expent() {
      return this.tableInfo.expent;
    },
  },
};
</script>

<style scoped>
tr > th {
  background-color: #edf6ff;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>