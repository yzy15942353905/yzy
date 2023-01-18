<!--
 * @Author: Yz_brightFuture 10409053+yz-brightfuture@user.noreply.gitee.com
 * @Date: 2023-01-17 14:35:43
 * @LastEditors: Yz_brightFuture 10409053+yz-brightfuture@user.noreply.gitee.com
 * @LastEditTime: 2023-01-18 15:56:28
 * @FilePath: \yzy-2\src\pages\bicycleList\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <ul>
      <li
        v-for="bicycle in bicycleList"
        :key="bicycle.id"
        @click="lookdDetail(bicycle.bicycleId)"
      >
        <div class="bicycle_img">
          <img :src="bicycle.bicycle_image" :alt="bicycle.bicycle_desc" />
        </div>
        <div class="bicycleDetail">
          <div class="bicycle_name">{{ bicycle.bicycleName }}</div>
          <div class="bicycle_desc">{{ bicycle.bicycleDesc }}</div>
          <div class="bicycle_price">{{ bicycle.priceHour }} 元起</div>
        </div>
      </li>
    </ul>
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
import { getBicycleList } from "@/api/modules/bicycle.js";
export default {
  data() {
    return {
      bicycleList: [
        {
          bicycle_name: "123",
          bicycle_image:
            "http://localhost:9090/file/63b67307dd12904752137840.jpg",
          bicycle_desc:
            "111111111111111111111111111111111111111111111111111111",
        },
        {
          bicycle_name: "123",
          bicycle_image:
            "http://localhost:9090/file/63b67307dd12904752137840.jpg",
          bicycle_desc:
            "111111111111111111111111111111111111111111111111111111",
        },
      ],
      form: {},
      total: 0,
      pageNum: 1,
      pageSize: 10,
    };
  },
  methods: {
    async getList(pageNum) {
      this.form.pageNum = pageNum;
      this.form.pageSize = this.pageSize;
      let result = await getBicycleList(this.form);
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
          this.bicycleList = [];
          this.total = 0;
        } else {
          this.bicycleList = result.data.records;
          this.total = result.data.total;
        }
      }
    },
    async lookdDetail(bicycleId) {
      // 跳转路由
      this.$router.push({
        path: "/bicycleDetail",
        query: {
          bicycleId: bicycleId,
        },
      });
    },
    handleCurrentChange(val) {
      this.getList(val);
    },
  },
  mounted() {
    this.getList(1);
  },
};
</script>

<style scoped>
ul {
  display: flex;
  justify-content: start;
  align-items: center;
  flex-wrap: wrap;
}
li {
  background-color: #ffffff;
  box-sizing: content-box;
  width: 18%;
  aspect-ratio: 1/1.2;
  margin-top: 10px;
  margin-right: 20px;
}
.bicycle_img {
  height: 75%;
  width: 100%;
}
img {
  margin: 20px;
  width: 80%;
  height: 80%;
}
.bicycleDetail {
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.bicycle_desc,
.bicycle_name,
.bicycle_price {
  margin: 3px 0;
}

.bicycle_desc {
  width: 100%;
  font-size: 12px;
  color: #b0b0b0;
  /* 1. */
  white-space: nowrap;
  /* 2 */
  overflow: hidden;
  /* 3 */
  text-overflow: ellipsis;
  text-align: center;
}
.bicycle_price {
  color: #ff6700;
}
</style>