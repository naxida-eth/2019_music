<template>
  <div id="app">
    <div class="header">
      <ul>
        <li class="header_li_logo">
          <label @click="backUrl('/')">Music</label>
        </li>
        <li class="header_li_menu" v-for="item in headMenuUl" :key="item.id">
            <span @click="backUrl(item.url)">{{item.name}}</span>
          </li>
        <li class="header_li_search">
          <input type="text" v-model="searchText" v-on:change="getMusic" />
        </li>
      </ul>
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  name: "App",
  // props: ["musicId"],
  data() {
    return {
      headMenuUl: [
        { name: "发现音乐", id: 1 ,url:'/'},
        { name: "音乐排行榜", id: 2 },
        { name: "待续", id: 3 }
      ],
      musicId: "",
      searchText: "",
      musicSearch: "http://www.young1024.com:666/search?keywords="
    };
  },
  methods: {
    playMusic(musicId) {
      let me = this;
    },
    getMusic() {
      let me = this;
      me.$router.push({
        path: "search",
        query: {
          searchText: me.searchText
        }
      });
      location.reload();
    },
    backUrl(url){
      let me = this;
      me.$router.push({
        path:url
      })
    }
  }
};
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
* {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
.header {
  width: 100%;
  min-width: 1200px;
  height: 68px;
  padding: 0;
  color: #cccccc;
  background: #242424;
}
.header ul {
  display: flex;
  width: 72%;
  min-width: 1200px;
  height: 68px;
  margin: 0 auto;
  padding: 0 64px;
  justify-content: space-around;
  align-items: center;
}
.header ul > li {
  line-height: 68px;
  cursor:pointer;
}
.header ul > li span{
  padding: 12px
}
.header ul > li span:hover{
  color: #ffffff;
  background: #f02424
}
.header ul .header_li_logo {
  color: #fff;
  padding-left: 60px;
  font-size: 18px;
  background: url("assets/images/logo.png") 12px center no-repeat;
}
.header ul .header_li_logo label {
  margin-bottom: 0;
}
.header ul .header_li_menu {
  padding: 0;
  margin: 0;
}
.header ul li.header_li_search {
  display: flex;
  justify-content: center;
  align-items: center;
}
.header ul li.header_li_search input {
  height: 36px;
  color: #242424;
  text-indent: 10px;
  line-height: 38px;
}
/* .header ul li.header_li_audio {
  display: flex;
  align-items: center;
} */
.lyric {
  position: fixed;
  bottom: 80px;
}
.lyric ul {
  position: relative;
  height: 40px;
  width: 80%;
  min-width: 600px;
  margin: auto;
  text-align: center;
}
.lyric ul li {
  position: absolute;
  display: none;
  top: 0;
  width: 100%;
  font-size: 32px;
  line-height: 40px;
}
</style>
