<template>
  <div class="swiper-container" ref="mySwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(img, index) in imgList" :key="img.id">
        <img
          :src="img.imgUrl"
          :title="img.imgName"
          :class="
            imgId == '' && index == 0
              ? 'active'
              : img.id == imgId
              ? 'active'
              : ''
          "
          @mouseenter="handOffImg(img.imgUrl, img.id)"
        />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <!-- <div class="swiper-pagination"></div> -->

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import _ from "lodash";
import Swiper from "swiper";
export default {
  name: "ImageList",
  props: ["imgList"],
  data() {
    return {
      imgId: "",
    };
  },
  methods: {
    myswiper() {
      var effect = 0;
      var swiper = new Swiper(this.$refs.mySwiper, {
        speed: 2500,
        slidesPerView: 3,
        spaceBetween: 30,
        watchSlidesProgress: true,
        on: {
          setTranslate: function () {
            var slides = this.slides;
            for (var i = 0; i < slides.length; i++) {
              var slide = slides.eq(i);
              var progress = slides[i].progress;
              //slide.html(progress.toFixed(2)); 看清楚progress是怎么变化的
              slide.css({ opacity: "", background: "" });
              slide.transform(""); //清除样式

              if (effect == 1) {
                slide.transform("scale(" + (1 - Math.abs(progress) / 8) + ")");
              } else if (effect == 2) {
                slide.css("opacity", 1 - Math.abs(progress) / 6);
                slide.transform(
                  "translate3d(0," + Math.abs(progress) * 20 + "px, 0)"
                );
              } else if (effect == 3) {
                slide.transform("rotate(" + progress * 30 + "deg)");
              } else if (effect == 4) {
                slide.css(
                  "background",
                  "rgba(" +
                    (255 - Math.abs(progress) * 20) +
                    "," +
                    (127 + progress * 32) +
                    "," +
                    Math.abs(progress) * 64 +
                    ")"
                );
              }
            }
          },
          setTransition: function (transition) {
            for (var i = 0; i < this.slides.length; i++) {
              var slide = this.slides.eq(i);
              slide.transition(transition);
            }
          },
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    },
    handOffImg: _.debounce(function (imgUrl, id) {
      this.imgId = id;
      this.$bus.$emit("handOffImg", imgUrl);
    }, 50),
    // handOffImg(imgUrl, id) {
    //   this.imgId = id;
    //   this.$bus.$emit("handOffImg", imgUrl);
    // },
  },
  watch: {
    imgList: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          this.myswiper();
        });
      },
    },
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;
    .active {
      border: 2px solid #f60;
      padding: 1px;
    }
    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      // &:hover {
      //   border: 2px solid #f60;
      //   padding: 1px;
      // }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>