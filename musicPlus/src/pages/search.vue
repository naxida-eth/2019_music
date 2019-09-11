<template>
  <div class="searchMusic">
    <ul class="musicsList">
      <li v-for="music in musicList" v-on:click="playMusic(music.id)" :key="music.id">
        <img :src="music.imgUrl" alt />
        <div class="music_text">
          <p>{{music.name}}</p>
          <p>{{music.songer}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "search",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      musicId: "",
      searchText: "",
      musicSearch: "http://www.young1024.com:666/search?keywords=",
      musicTextUrl: "http://www.young1024.com:666/song/detail?ids=",
      musics: [],
      musicList: []
    };
  },
  methods: {
    playMusic(musicId) {
      let me = this;
      me.$router.push({
        path: "playMusic",
        query: {
          musicId: musicId
        }
      });
    }
  },
  mounted() {
    let me = this;
    if (
      me.$route.query != "" &&
      me.$route.query != undefined &&
      me.$route.query != null
    ) {
      me.searchText = me.$route.query.searchText;
      let url = me.musicSearch + me.searchText;
      // console.log(url);
      me.$http.get(url).then(res => {
        // console.log(res.data);
        if (res.data.code === 200) {
          me.musics = res.data.result.songs;
          // console.log(me.musics);
          for (let i = 0, len = me.musics.length; i < len; i++) {
            let id = me.musics[i].id;
            let musicTextUrl = me.musicTextUrl + id;
            me.$http.get(musicTextUrl).then(ress => {
              // console.log(ress.data);
              if (ress.data.code === 200) {
                let name = ress.data.songs[0].name;
                let leng = ress.data.songs[0].ar.length;
                if (leng >= 6) {
                  leng = 6;
                }
                let songer = "";
                for (let j = 0; j < leng; j++) {
                  songer = songer + "&" + ress.data.songs[0].ar[j].name;
                }
                let imgUrl = ress.data.songs[0].al.picUrl;
                me.musicList.push({
                  id: id,
                  name: name,
                  songer: songer,
                  imgUrl: imgUrl
                });
              }
              // console.log(me.musicList);
            });
          }
        }
      });
    } else {
      me.msg = "网页出错辣！";
    }

    // console.log(me.searchText);
    // console.log("我是搜索页面");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.musicsList {
  display: flex;
  width: 72%;
  min-width: 1200px;
  margin: 40px auto 0;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: space-around;
}
.musicsList li {
  display: flex;
  width: 32%;
  height: 312px;
  padding: 24px;
  margin-bottom: 24px;
  color: #333333;
  align-items: center;
  background: #6ca4c548;
  flex-wrap: wrap;
  justify-content: space-around;
  opacity: 0.95;
}
.musicsList li img {
  width: 60%;
}
.musicsList li .music_text {
  display: flex;
  width: 28%;

  flex-wrap: wrap;
  justify-content: center;
  align-content: space-around;
}
.musicsList li .music_text p {
  margin-top: 20px;
  width: 80%;
}
.musicsList li:hover img {
  width: 70%;
}
</style>
