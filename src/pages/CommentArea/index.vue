<!--
 * @Author: Yz_brightFuture 10409053+yz-brightfuture@user.noreply.gitee.com
 * @Date: 2023-02-02 16:55:15
 * @LastEditors: Yz_brightFuture 10409053+yz-brightfuture@user.noreply.gitee.com
 * @LastEditTime: 2023-02-03 13:36:50
 * @FilePath: \yzy-2\src\pages\CommentArea\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <h4 class="hear_bg">自行车评价</h4>
    <div class="comment" v-if="commentList != 0">
      <div v-for="item in commentList" :key="item.id" class="commentArea">
        <el-row :gutter="10" :offset="2">
          <el-col :span="4" class="commentMainLeft">
            <!-- 头像 -->
            <div class="block">
              <el-avatar :size="50" :src="item.avatar"></el-avatar>
            </div>
            <!-- 用户名 -->
            <div>
              {{ item.nickName }}
            </div>
          </el-col>
          <el-col :span="20" class="commentMain">
            <!-- star -->
            <el-rate
              v-model="item.star"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{ value }分"
            >
            </el-rate>
            <!-- 评论 -->
            <div class="commentContent">
              {{ item.commentContent }}
            </div>
            <!-- 租赁的自行车名称 -->
            <div style="color: #999; font-size: 15px; margin-top: 12px">
              {{ item.bicycleName }}
            </div>
            <div style="color: #999; font-size: 15px">
              {{ item.createTime }}
            </div>
            <!-- 右下角 举报 -->
            <el-button type="text" size="small">举报</el-button>
          </el-col>
        </el-row>
      </div>
    </div>

    <el-empty description="该自行车暂无评价" v-else></el-empty>
  </div>
</template>

<script>
import { getBicycleComment } from "@/api/modules/comment";
export default {
  data() {
    return {
      commentList: [],
    };
  },
  props: ["bicycleId", "getCommentCount"],
  methods: {
    async getBicycleComment() {
      let form = {
        bicycleId: this.bicycleId,
        // 不展示违规评论
        isBan: 0,
      };
      let result = await getBicycleComment(form);
      if (result.code == 200) {
        this.commentList = result.data.records;
        this.$emit("getCommentCount", result.data.size);
      }
    },
  },
  mounted() {
    this.getBicycleComment();
  },
};
</script>

<style scoped>
.comment {
  border: 1px solid #e3e3e3;
}
.commentArea {
  height: 140px;
  width: 100%;
  border-bottom: 1px #e3e3e3 solid;
}
.commentMainLeft {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.commentMain {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
}
.commentMain > * {
  padding: 5px 0;
}
.commentContent {
  /* 1. */
  white-space: nowrap;
  /* 2 */
  overflow: hidden;
  /* 3 */
  text-overflow: ellipsis;
}
</style>