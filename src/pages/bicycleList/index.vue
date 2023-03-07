<!--
 * @Author: Yz_brightFuture 10409053+yz-brightfuture@user.noreply.gitee.com
 * @Date: 2023-01-17 14:35:43
 * @LastEditors: Yz_brightFuture 10409053+yz-brightfuture@user.noreply.gitee.com
 * @LastEditTime: 2023-03-06 15:19:47
 * @FilePath: \yzy-2\src\pages\bicycleList\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <Search @getSearch="getSearch" />
    <el-row :gutter="20">
      <el-col
        :span="6"
        v-for="bicycle in bicycleList"
        :key="bicycle.id"
        style="margin-top: 20px"
      >
        <el-card :body-style="{ padding: '0px' }" shadow="hover">
          <img
            :src="bicycle.bicycleImage"
            class="image"
            @error="setDefaultImage"
            @click="lookdDetail(bicycle.bicycleId)"
          />

          <div style="padding: 14px">
            <div class="bottom clearfix bicycleDetail">
              <span>{{ bicycle.bicycleName }}</span>
              <div class="bicycle_desc">{{ bicycle.bicycleDesc }}</div>
              <div class="bicycle_price">{{ bicycle.priceHour }} 元起</div>
            </div>
            <span style="float: left; font-size: 30px; color: #f7ba2a">
              <i
                :class="
                  bicycle.isCollection == '1'
                    ? 'el-icon-star-on'
                    : 'el-icon-star-off'
                "
                @click="collectionOrCancel(bicycle)"
              ></i
            ></span>
            <el-button
              type="text"
              class="button"
              style="float: right"
              @click="lookdDetail(bicycle.bicycleId)"
              >查看详情</el-button
            >
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import defaultImage from "@/assets/img/default.png";
import { getBicycleList } from "@/api/modules/bicycle.js";
import { cancelCollection, collection } from "@/api/modules/collection";
import Search from "@/components/Search.vue";
import _ from "lodash";
export default {
  components: { Search },
  data() {
    return {
      bicycleList: [],
      form: {},
      userId: undefined,
      total: 0,
      pageNum: 1,
      pageSize: 9999,
    };
  },
  methods: {
    // 列表查询
    async getList(pageNum) {
      this.form.pageNum = pageNum;
      this.form.pageSize = this.pageSize;
      // 获取当前用户id 查询收藏列表
      this.form.userId = this.userId;
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
    // 查看详情
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
    // 收藏与取消收藏
    collectionOrCancel: _.throttle(async function (bicycleInfo) {
      let data = {
        bicycleId: bicycleInfo.bicycleId,
        userId: this.userId,
      };
      if (bicycleInfo.isCollection == "1") {
        // 已经收藏，点击取消收藏
        let result = await cancelCollection(data);
        if (result.code == 200) {
          this.getList();
          this.$message.success(result.msg);
        } else {
          this.$message.error(result.msg);
        }
      } else {
        // 没有收藏，点击收藏
        let result = await collection(data);
        if (result.code == 200) {
          this.getList();
          this.$message.success(result.msg);
        } else {
          this.$message.error(result.msg);
        }
      }
    }, 1000),
    setDefaultImage(e) {
      e.target.src = defaultImage;
    },
    getSearch(...args) {
      console.log("args", args);
    },
  },

  mounted() {
    this.userId = this.$store.state.userInfo.userInfo.id;
    this.getList(1);
  },
};
</script>

<style scoped>
.bicycle_img {
  height: 75%;
  width: 100%;
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
.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}
.image {
  width: 100%;
  aspect-ratio: 1/1;
  display: block;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
</style>
