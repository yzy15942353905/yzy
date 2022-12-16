<!--
 * @Description: 
 * @Date: 2022-11-30 15:57:44
 * @LastEditTime: 2022-12-16 13:29:57
 * @FilePath: \vue_test\src\components\TagList.vue
-->
<template>
  <div style="position: relative">
    <el-scrollbar class="scrollbar">
      <div class="main">
        <li
          @contextmenu.prevent="openRightMenu($event, index)"
          @dragstart="dragstart($event)"
          @dragover.self="dragover($event)"
          @dragend="dragend($event)"
          :draggable="tag.name == '首页' ? false : true"
          v-for="(tag, index) in tagList"
          :key="tag.path"
          :class="tag.path == $route.fullPath ? 'cur' : ''"
          :name="tag.name"
          :path="tag.path"
          @click="toRoute($event.target, tag.path)"
        >
          {{ tag.name }}
          <i
            v-if="tag.name != '首页'"
            draggable="false"
            class="el-icon-circle-close"
            @click="deleteItem($event, index)"
          ></i>
        </li>
      </div>
    </el-scrollbar>
    <div class="rightMenu" v-show="rightMenuFlag" ref="rightMenu">
      <li
        @click="deleteItem(rightMenuNode, rightMenuNodeIndex)"
        v-if="!isIndexPage"
      >
        关闭当前
      </li>
      <li v-show="!isLastNode" @click="closeRight">关闭右侧</li>
      <li v-show="!isOnlyOne" @click="closeOther">关闭其他</li>
      <li @click="closeAll">关闭全部</li>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  data() {
    return {
      tagList: undefined,
      curDrag: undefined,
      parentNode: undefined,
      rightMenuFlag: false,
      rightMenuNode: undefined,
      rightMenuNodeIndex: undefined,
      isLastNode: undefined,
      isOnlyOne: undefined,
      isIndexPage: false,
    };
  },

  methods: {
    deleteItem(e, delIndex) {
      // console.log(e.target.tagName, delIndex);
      // 判断删除请求是由I标签发起还是LI标签发起
      let target = e.target.tagName == "I" ? e.target.parentNode : e.target;
      let children = Array.from(target.parentNode.children);
      let preNode = target.previousSibling;
      let nextNode = target.nextElementSibling;
      if (target.classList.contains("cur")) {
        if (delIndex == children.length - 1) {
          preNode && this.toRoute(preNode, preNode.getAttribute("path"));
        } else {
          nextNode && this.toRoute(nextNode, nextNode.getAttribute("path"));
        }
      }

      this.tagList.splice(delIndex, 1);
    },
    toRoute(target, path) {
      // console.log(target, path);
      if (target == null || path == null) {
        alert("参数不能为空！");
        return;
      }
      if (path == this.$route.fullPath) return;
      // 点击激活
      Array.from(target.parentNode.children).forEach((item) => {
        item.classList.remove("cur");
      });
      target.classList.add("cur");

      // 跳转
      this.$router.push(path);
    },

    // 拖拽方法
    dragstart(e) {
      this.curDrag = e.target;
      this.parentNode = e.target.parentNode;
    },
    dragover: _.throttle(function (e) {
      if (e.target == this.parentNode || e.target == this.curDrag) return;
      let children = Array.from(this.parentNode.children);
      if (children.indexOf(this.curDrag) > children.indexOf(e.target)) {
        if (e.target.innerText == "首页") return;
        this.parentNode.insertBefore(this.curDrag, e.target);
      } else {
        this.parentNode.insertBefore(this.curDrag, e.target.nextElementSibling);
      }
    }, 200),

    dragend(e) {},
    closeMenu() {
      this.rightMenuFlag = false;
    },
    openRightMenu(e, index) {
      let parentNode = [...e.target.parentNode.children];
      for (let index = 0; index < parentNode.length; index++) {
        console.log(e.target.getAttribute("path"));
        console.log(parentNode[index].getAttribute("path"));
        if (
          parentNode[index].getAttribute("path") ==
          e.target.getAttribute("path")
        ) {
          this.rightMenuNodeIndex = index;
          break;
        }
      }
      this.rightMenuNode = e;

      this.isIndexPage =
        this.rightMenuNode.target.innerText == "首页" ? true : false;
      this.isLastNode =
        this.rightMenuNodeIndex ==
        this.rightMenuNode.target.parentNode.children.length - 1
          ? true
          : false;
      this.isOnlyOne =
        this.rightMenuNode.target.parentNode.children.length == 1
          ? true
          : false;
      this.rightMenuFlag = true;
      this.$refs["rightMenu"].style.top = e.pageY - 60 + "px";
      this.$refs["rightMenu"].style.left = e.pageX - 200 + "px";
    },

    closeAll() {
      this.tagList = [];
      this.$router.push("/index");
    },
    closeOther() {
      this.tagList = [{ name: "首页", path: "/index" }];

      this.rightMenuNode.target.getAttribute("class").includes("cur")
        ? this.tagList.push({
            name: this.rightMenuNode.target.getAttribute("name"),
            path: this.rightMenuNode.target.getAttribute("path"),
          })
        : this.$router.push(this.rightMenuNode.target.getAttribute("path"));
    },
    closeRight() {
      let length = this.rightMenuNode.target.parentNode.children.length;
      this.tagList.splice(
        this.rightMenuNodeIndex + 1,
        length - 1 - this.rightMenuNodeIndex
      );
      this.$router.push(this.rightMenuNode.target.getAttribute("path"));
    },
  },
  computed: {},
  mounted() {
    this.tagList = JSON.parse(sessionStorage.getItem("tagList"))
      ? JSON.parse(sessionStorage.getItem("tagList"))
      : [{ name: "首页", path: "/index" }];
  },
  watch: {
    $route() {
      let flag = true;
      this.tagList.forEach((item) => {
        if (item.path == this.$route.fullPath) flag = false;
      });
      if (flag)
        this.tagList.push({
          name: this.$route.name,
          path: this.$route.fullPath,
        });
    },
    rightMenuFlag(value) {
      if (value) {
        document.body.addEventListener("click", this.closeMenu);
      } else {
        document.body.removeEventListener("click", this.closeMenu);
      }
    },
    tagList: {
      deep: true,
      handler() {
        sessionStorage.setItem("tagList", JSON.stringify(this.tagList));
      },
    },
  },
};
</script>

<style scoped>
.main {
  position: relative;
  display: flex;
  justify-content: start;
  align-items: center;
  height: 40px;
  margin-bottom: 20px;
}
.main li {
  height: 40px;
  line-height: 40px;
  list-style-type: none;
  padding: 0 20px;
  cursor: pointer;
  /* 文字强制一行显示 */
  white-space: nowrap;
  transition: all 0.5s;
}
/* .main li:hover {
  background-color: aqua;
} */
.cur {
  background-color: aqua;
}

i:hover {
  color: skyblue;
}
.rightMenu {
  position: absolute;
  z-index: 9999;
  border: 1px solid #eee;
  width: 100px;
  border-radius: 10px;
}
.rightMenu li {
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 10px;
}
.rightMenu li:hover {
  background-color: #eee;
}
.scrollbar {
  max-width: 100%;
}
</style>