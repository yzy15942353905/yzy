<!--
 * @Author: Yz_brightFuture 10409053+yz-brightfuture@user.noreply.gitee.com
 * @Date: 2023-01-18 15:52:06
 * @LastEditors: Yz_brightFuture 10409053+yz-brightfuture@user.noreply.gitee.com
 * @LastEditTime: 2023-01-28 16:37:46
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
          <ImageList :imgList="[]" />
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
                  <em>65545</em>
                </div>
              </div>
            </div>
          </div>

          <div class="choose">
            <div class="chooseArea">
              <div class="choosed"></div>
              <dl>
                <dt class="title">租赁方式</dt>
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
                <el-input-number
                  v-model="num"
                  :min="1"
                  label="描述文字"
                ></el-input-number>
                <div style="margin-top: 20px">
                  <div>总价 {{ num * this.price }} 元</div>
                </div>
                <div style="margin-top: 20px">
                  <el-button type="danger">点我下单</el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { getById } from "@/api/modules/bicycle.js";
import ImageList from "./ImageList/ImageList.vue";
import Zoom from "./Zoom/Zoom.vue";
export default {
  components: {
    ImageList,
    Zoom,
  },
  data() {
    return {
      bicycleId: undefined,
      bicycleInfo: {},
      price: undefined,
      type: "/时",
      currentIndex: 0,
      num: 1,
      spuSaleAttrList: [],
    };
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
    addOrder() {
      // ...

      this.$router.push("/successHandOrder");
    },
    selectSpuSale(spuSaleAttr, index) {
      // 排他思想
      this.currentIndex = index;
      // 重新
      this.num = 1;
      this.price = spuSaleAttr.price;
      this.type = spuSaleAttr.type;
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