<template>
  <div class="spec-preview">
    <img :src="bicycleImage || imgList.bicycleImage" ref="small" />
    <div
      class="event"
      @mouseenter="enterEvent"
      @mouseleave="leaveEvent"
      @mousemove="moveEvent"
    ></div>
    <div class="big" v-if="flag">
      <img v-if="flag" :src="bicycleImage || imgList.bicycleImage"  ref="big"/>
    </div>
    <div v-if="flag" class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  data() {
    return {
      //小图片传来的url
      bicycleImage: '',
      flag: false,
    };
  },
  props: ["imgList"],
  mounted() {
    this.$bus.$on("handOffImg", (bicycleImage) => {
      this.bicycleImage = bicycleImage;
    });
  },
  methods: {
    enterEvent() {
      this.flag = true;
    },
    leaveEvent() {
      this.flag = false;
    },
    moveEvent(event) {
      var small = this.$refs.small;
      var mask = this.$refs.mask;
      var big = this.$refs.big;

      //最大移动距离
      var moveBig = small.offsetWidth - mask.offsetWidth;
      var maskMoveX = 240 + mask.offsetWidth / 2;
      var maskMoveY = 240 + mask.offsetHeight / 2;

      var maskX = event.pageX - maskMoveX;
      var maskY = event.pageY - maskMoveY;

      //限制mask在小图片中移动
      if (maskX > moveBig) maskX = moveBig;
      if (maskX < 0) maskX = 0;
      if (maskY > moveBig) maskY = moveBig;
      if (maskY < 0) maskY = 0;

      mask.style.left = maskX + "px";
      mask.style.top = maskY + "px";

      big.style.top = -((maskY * big.offsetHeight) / small.offsetHeight) + "px";
      big.style.left = -((maskX * big.offsetWidth) / small.offsetWidth) + "px";
    },
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  // .event:hover ~ .mask,
  // .event:hover ~ .big {
  //   display: block;
  // }
}
</style>