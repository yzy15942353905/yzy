<!--
 * @Author: Yz_brightFuture 10409053+yz-brightfuture@user.noreply.gitee.com
 * @Date: 2023-01-18 15:52:06
 * @LastEditors: Yz_brightFuture 10409053+yz-brightfuture@user.noreply.gitee.com
 * @LastEditTime: 2023-03-02 11:27:00
 * @FilePath: \yzy-2\src\pages\bicycleList\bicycleDetail.vue
 * @Description: 自行车详情页
-->
<template>
  <div class="detail">
    <!-- 主要内容区域 -->
    <section class="con">
      <!-- 主要内容区域 -->
      <div class="mainCon">
        <!-- 左侧放大镜区域 -->
        <div class="previewWrap">
          <!--放大镜效果-->
          <Zoom :imgList="bicycleInfo" />
          <!-- 小图列表 -->
          <!-- <ImageList :imgList="[]" /> -->
        </div>
        <!-- 右侧选择区域布局 -->
        <div class="InfoWrap">
          <div class="goodsDetail">
            <h3 class="InfoName">
              {{ bicycleInfo.bicycleName }}
            </h3>
            <p class="news">
              {{ bicycleInfo.bicycleDesc }}
            </p>
            <div class="priceArea">
              <div class="priceArea1">
                <div class="title">
                  价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格
                </div>
                <div class="price">
                  <i>¥</i>
                  <em>{{ price + type }}</em>
                  <span>降价通知</span>
                </div>
                <div class="remark">
                  <i>累计评价</i>
                  <em>{{ commentCount }}条</em>
                </div>
              </div>
            </div>
          </div>

          <div class="choose">
            <div class="chooseArea">
              <div class="choosed"></div>
              <dl>
                <dt class="title">租赁方式:</dt>
                <dd
                  :class="
                    currentIndex === index ? 'chooseDd active' : 'chooseDd'
                  "
                  v-for="(spuSaleAttr, index) in spuSaleAttrList"
                  :key="spuSaleAttr.type"
                  @click="selectSpuSale(spuSaleAttr, index)"
                >
                  {{ spuSaleAttr.title }}
                </dd>
              </dl>
            </div>
            <div>
              <div>
                租赁时长：
                <el-input-number
                  v-model="num"
                  :min="1"
                  label="描述文字"
                ></el-input-number>
                {{ type }}
                <div style="margin-top: 20px">
                  请选择优惠卷：
                  <el-select
                    :popper-append-to-body="false"
                    style="position: relative"
                    v-model="form.couponId"
                    placeholder="请选择"
                    @focus="selectFocus"
                    @change="selectChange"
                    clearable
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.couponId"
                      :label="item.couponName"
                      :value="item.couponId"
                    >
                      <span style="float: left">{{ item.couponName }}</span>
                      <span
                        style="float: right; color: #8492a6; font-size: 13px"
                        >{{ item.couponDesc }}</span
                      >
                    </el-option>
                  </el-select>
                </div>
                <div style="margin-top: 20px">
                  <div>总价 {{ rentTotal }} 元</div>
                </div>
                <div style="margin-top: 20px">
                  <div>优惠后总价 {{ discoutTotal }} 元</div>
                </div>

                <div style="margin-top: 20px">
                  <el-button type="danger" @click="addOrder"
                    >点我下单</el-button
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- 评论区 -->
    <section>
      <CommentArea
        :bicycleId="this.$route.query.bicycleId"
        @getCommentCount="getCommentCount"
      />
    </section>
  </div>
</template>

<script>
import { getById } from "@/api/modules/bicycle.js";
import { getMyUsableCoupon } from "@/api/modules/coupon.js";
import { submitOrder } from "@/api/modules/order.js";
import ImageList from "./ImageList/ImageList.vue";
import Zoom from "./Zoom/Zoom.vue";
import CommentArea from "@/pages/CommentArea";
export default {
  components: {
    ImageList,
    Zoom,
    CommentArea,
  },
  data() {
    return {
      form: {
        bicycleId: "",
        userId: "",
        rentType: "",
        rentTime: "",
        ifCoupon: "",
        couponId: "",
        rentTotal: "",
        discoutTotal: "",
        deposit: "",
      },
      discout: "",
      options: [],
      bicycleId: undefined,
      bicycleInfo: {},
      price: undefined,
      type: "/时",
      currentIndex: 0,
      num: 1,
      spuSaleAttrList: [],
      // 评论数量
      commentCount: 0,
    };
  },
  computed: {
    rentTotal() {
      return this.price * this.num;
    },
    discoutTotal() {
      return this.discout
        ? (this.price * this.num * this.discout).toFixed(0)
        : this.rentTotal;
    },
    // 押金为优惠前总价的20%
    deposit() {
      return (this.rentTotal * 0.2).toFixed(0);
    },
    // 租赁方式码值
    typeCode() {
      let obj = {
        "/时": 1,
        "/天": 2,
        "/月": 3,
      };
      return obj[this.type];
    },
  },
  watch: {
    rentTotal() {
      this.form.couponId = "";
    },
  },
  methods: {
    async getById(bicycleId) {
      let result = await getById(bicycleId);
      if (result.code == 200) {
        this.bicycleInfo = result.data;
        // 默认价格取时价，因为便宜
        this.price = this.bicycleInfo.priceHour;
        // 获取三种租赁类型价格
        this.spuSaleAttrList.push({
          type: "/时",
          title: "按小时",
          price: result.data.priceHour,
        });
        this.spuSaleAttrList.push({
          type: "/天",
          title: "按天",
          price: result.data.priceDate,
        });
        this.spuSaleAttrList.push({
          type: "/月",
          title: "按月",
          price: result.data.priceMonth,
        });
      } else {
        this.$message.warning(result.msg);
      }
    },
    // 下单
    async addOrder() {
      // ...
      this.form.userId = this.$store.state.userInfo.userInfo.id;
      this.form.bicycleId = this.$route.query.bicycleId;
      this.form.rentType = this.typeCode;
      this.form.rentTime = this.num;
      this.form.ifCoupon = this.form.couponId != "" ? 1 : 0;
      this.form.rentTotal = this.rentTotal;
      this.form.discoutTotal = this.discoutTotal;
      this.form.deposit = this.deposit;
      this.form.startTime = this.$commonUtils.getTime({ sfm: true });
      let days = 0;
      let hours = 0;
      if (this.typeCode == 1) {
        hours = this.num;
      } else if (this.typeCode == 2) {
        days = this.num;
      } else {
        days = this.num * 31;
      }
      this.form.expectEndTime = this.change_date(days, hours);
      let result = await submitOrder(this.form);
      if (result.code == 200) {
        this.$router.push("/successHandOrder");
      } else {
        this.$message.error(result.msg);
      }
    },
    selectSpuSale(spuSaleAttr, index) {
      // 排他思想
      this.currentIndex = index;
      // 重新
      this.num = 1;
      this.price = spuSaleAttr.price;
      this.type = spuSaleAttr.type;
    },
    // 获取当前订单可用的优惠卷
    async selectFocus() {
      let form = {
        userId: this.$store.state.userInfo.userInfo.id,
        price: this.rentTotal,
      };
      let result = await getMyUsableCoupon(form);
      if (result.code == 200) {
        this.options = result.data;
      } else {
        this.options = [];
        this.$message.warning(result.msg);
      }
    },
    // 获取当前选择的优惠卷折扣
    selectChange(couponId) {
      for (let index = 0; index < this.options.length; index++) {
        if (this.options[index].couponId == couponId) {
          this.discout = this.options[index].couponDiscount;
          break;
        }
      }
    },
    // 获取评论数量
    getCommentCount(val) {
      this.commentCount = val;
    },
    change_date: function (days, hours) {
      // 参数表示在当前日期下要增加的天数
      var now = new Date();
      // + 1 代表日期加，- 1代表日期减
      now.setDate(now.getDate() + 1 * days);
      var year = now.getFullYear();
      var month = now.getMonth() + 1;
      var day = now.getDate();
      now.setHours(now.getHours() + hours);
      let hour = now.getHours() <= 9 ? "0" + now.getHours() : now.getHours();
      let minutes =
        now.getMinutes() <= 9 ? "0" + now.getMinutes() : now.getMinutes();
      let seconds =
        now.getSeconds() <= 9 ? "0" + now.getSeconds() : now.getSeconds();
      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }
      return (
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hour +
        ":" +
        minutes +
        ":" +
        seconds
      );
    },
  },
  mounted() {
    let bicycleId = this.$route.query.bicycleId;
    if (bicycleId) {
      this.getById(bicycleId);
    } else {
      this.$message.warning("请检查自行车ID!");
    }
  },
};
</script>

<style lang="less" scoped>
button {
  cursor: pointer;
  &[disabled] {
    color: #c0c4cc;
    cursor: not-allowed;
  }
}
.detail {
  .con {
    width: 1200px;
    margin: 15px auto 0;

    .conPoin {
      padding: 9px 15px 9px 0;

      & > span + span:before {
        content: "/\00a0";
        padding: 0 5px;
        color: #ccc;
      }
    }

    .mainCon {
      overflow: hidden;
      margin: 5px 0 15px;

      .previewWrap {
        float: left;
        width: 400px;
        position: relative;
      }

      .InfoWrap {
        width: 700px;
        float: right;

        .InfoName {
          font-size: 14px;
          line-height: 21px;
          margin-top: 15px;
        }

        .news {
          color: #e12228;
          margin-top: 15px;
        }

        .priceArea {
          background: #fee9eb;
          padding: 7px;
          margin: 13px 0;

          .priceArea1 {
            overflow: hidden;
            line-height: 28px;
            margin-top: 10px;

            .title {
              float: left;
              margin-right: 15px;
            }

            .price {
              float: left;
              color: #c81623;

              i {
                font-size: 16px;
              }

              em {
                font-size: 24px;
                font-weight: 700;
              }

              span {
                font-size: 12px;
              }
            }

            .remark {
              float: right;
            }
          }

          .priceArea2 {
            overflow: hidden;
            line-height: 28px;
            margin-top: 10px;

            .title {
              margin-right: 15px;
              float: left;
            }

            .fixWidth {
              width: 520px;
              float: left;

              .red-bg {
                background: #c81623;
                color: #fff;
                padding: 3px;
              }

              .t-gray {
                color: #999;
              }
            }
          }
        }

        .support {
          border-bottom: 1px solid #ededed;
          padding-bottom: 5px;

          .supportArea {
            overflow: hidden;
            line-height: 28px;
            margin-top: 10px;

            .title {
              margin-right: 15px;
              float: left;
            }

            .fixWidth {
              width: 520px;
              float: left;
              color: #999;
            }
          }
        }

        .choose {
          .chooseArea {
            overflow: hidden;
            line-height: 28px;
            margin-top: 10px;

            dl {
              overflow: hidden;
              margin: 13px 0;

              dt {
                margin-right: 15px;
                float: left;
              }

              dd {
                float: left;
                margin-right: 5px;
                color: #666;
                line-height: 24px;
                padding: 2px 14px;
                border-top: 1px solid #eee;
                border-right: 1px solid #bbb;
                border-bottom: 1px solid #bbb;
                border-left: 1px solid #eee;

                &.active {
                  color: green;
                  border: 1px solid green;
                }
              }
            }
          }

          .cartWrap {
            .controls {
              width: 48px;
              position: relative;
              float: left;
              margin-right: 15px;

              .itxt {
                width: 38px;
                height: 37px;
                border: 1px solid #ddd;
                color: #555;
                float: left;
                border-right: 0;
                text-align: center;
              }

              .plus,
              .mins {
                width: 15px;
                text-align: center;
                height: 19px;
                line-height: 17px;
                background: #f1f1f1;
                color: #666;
                position: absolute;
                right: -5px;
                border: 1px solid #ccc;
              }

              .mins {
                right: -5px;
                top: 19px;
                border-top: 0;
                &[disabled] {
                  color: #c0c4cc;
                  cursor: not-allowed;
                }
              }
              .mins .plus {
                right: -8px;
              }
            }

            .add {
              float: left;

              a {
                background-color: #e1251b;
                padding: 0 25px;
                font-size: 16px;
                color: #fff;
                height: 36px;
                line-height: 36px;
                display: block;
              }
            }
          }
        }
      }
    }
  }

  .product-detail {
    width: 1200px;
    margin: 30px auto 0;
    overflow: hidden;

    .aside {
      width: 210px;
      float: left;
      border: 1px solid #ccc;

      .tabWraped {
        height: 40px;

        h4 {
          border-top: 3px solid #fff;
          float: left;
          line-height: 37px;
          width: 105px;
          text-align: center;
          border-bottom: 1px solid #ccc;

          &.active {
            border-top: 3px solid #e1251b;
            border-bottom: 0;
            font-weight: normal;
          }
        }
      }

      .tabContent {
        padding: 10px;

        .tab-pane {
          display: none;

          &.active {
            display: block;
          }

          &:nth-child(1) {
            .partList {
              overflow: hidden;

              li {
                width: 50%;
                float: left;
                border-bottom: 1px dashed #ededed;
                line-height: 28px;
              }
            }

            .goodsList {
              & > li {
                margin: 5px 0 15px;
                border-bottom: 1px solid #ededed;
                padding-bottom: 5px;

                .list-wrap {
                  .p-img {
                    text-align: center;

                    img {
                      width: 152px;
                    }
                  }

                  .price {
                    font-size: 16px;
                    color: #c81623;
                  }

                  .operate {
                    text-align: center;
                    margin: 5px 0;

                    a {
                      background-color: transparent;
                      border: 1px solid #8c8c8c;
                      color: #8c8c8c;
                      display: inline-block;
                      padding: 2px 14px;
                      line-height: 18px;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    .detail {
      width: 980px;
      float: right;

      .fitting {
        border: 1px solid #ddd;
        margin-bottom: 15px;

        .kt {
          border-bottom: 1px solid #ddd;
          background: #f1f1f1;
          color: #333;
          padding: 5px 0 5px 15px;
        }

        .good-suits {
          height: 170px;
          padding-top: 10px;

          .master {
            width: 127px;
            height: 165px;
            text-align: center;
            position: relative;
            float: left;

            img {
              width: 87px;
            }

            p {
              color: #c81623;
              font-size: 16px;
              font-weight: 700;
            }

            i {
              position: absolute;
              top: 48px;
              right: -25px;
              font-size: 16px;
            }
          }

          .suits {
            width: 668px;
            height: 165px;
            float: left;

            .suitsItem {
              float: left;
              width: 127px;
              padding: 0 20px;
              text-align: center;

              img {
                width: 120px;
                height: 130px;
              }

              p {
                font-size: 12px;
              }

              label {
                display: block;
                position: relative;

                input {
                  vertical-align: middle;
                }

                span {
                  vertical-align: middle;
                }
              }
            }
          }

          .result {
            border-left: 1px solid #ddd;
            width: 153px;
            height: 165px;
            padding-left: 20px;
            float: left;

            .num {
              font-size: 14px;
              margin-bottom: 10px;
              margin-top: 10px;
            }

            .price-tit {
              font-weight: bold;
              margin-bottom: 10px;
            }

            .price {
              color: #b1191a;
              font-size: 16px;
              margin-bottom: 10px;
            }

            .addshopcar {
              background-color: #e1251b;
              border: 1px solid #e1251b;
              padding: 10px 25px;
              font-size: 16px;
              color: #fff;
              display: inline-block;
              box-sizing: border-box;
            }
          }
        }
      }

      .intro {
        .tab-wraped {
          background: #ededed;
          // border: 1px solid #ddd;
          overflow: hidden;

          li {
            float: left;

            & + li > a {
              border-left: 1px solid #ddd;
            }

            &.active {
              a {
                // border: 0;
                background: #e1251b;
                color: #fff;
              }
            }

            a {
              display: block;
              height: 40px;
              line-height: 40px;
              padding: 0 11px;
              text-align: center;
              color: #666;
              background: #fcfcfc;
              border-top: 1px solid #ddd;
              border-bottom: 1px solid #ddd;
            }
          }
        }

        .tab-content {
          .tab-pane {
            display: none;

            &.active {
              display: block;
            }

            &:nth-child(1) {
              .goods-intro {
                padding-left: 10px;

                li {
                  margin: 10px 0;
                }
              }

              .intro-detail {
                img {
                  width: 100%;
                }
              }
            }
          }
        }
      }
    }
  }
}
.chooseDd {
  &.active {
    background-color: #e1251b !important;
    color: #fff !important;
  }
  padding: 0 10px;
  height: 20px;
  text-align: center;
  line-height: 40px;
  border: #e1251b 1px solid;
}
.choosed {
  display: flex;
  justify-content: center;
}
</style>
