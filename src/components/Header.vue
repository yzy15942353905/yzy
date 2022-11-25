<template>
  <div class="header">
    <i
      :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
      @click="closeOrOpen"
    ></i>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item
        v-for="breadCrumbItem in breadCrumbList"
        :key="breadCrumbItem.path"
        :to="breadCrumbItem.path"
      >
        {{ breadCrumbItem.meta.info }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      isCollapse: false,
    };
  },
  methods: {
    closeOrOpen() {
      this.isCollapse = !this.isCollapse;
      this.$emit("closeOrOpen");
    },
  },
  computed: {
    breadCrumbList() {
      return this.$route.matched;
    },
  },
  mounted() {},
};
</script>

<style scoped>
.header {
  width: 100%;
  display: flex;
  align-items: center;
  height: 60px;
  position: fixed;
  top: 0;
  background-color: #ffffff;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
}
</style>
