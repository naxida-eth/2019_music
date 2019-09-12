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
    <div class="playMusic img-circle">
      <div class="playMusic_img">
        <img
          :src="music.musicImg"
          class="img-circle"
          @click="musicMore(music.musicId)"
          :alt="music.musicName"
        />
      </div>
      <audio :src="musicUrl+music.musicId" controls="controls" autoplay="autoplay"></audio>
      <div class="playMusic_span">
        <span>{{music.musicName}}</span>
        <span>{{music.songer}}</span>
      </div>
    </div>
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
      musicMoreUrl: "http://www.young1024.com:666/song/detail?ids=",
      musicUrl: "https://music.163.com/song/media/outer/url?id=",
      musics: [],
      musicList: [],
      music: []
    };
  },
  methods: {
    playMusic(musicId) {
      let me = this;
      let musicMoreUrl = me.musicMoreUrl + musicId;
      me.$http.get(musicMoreUrl).then(res => {
        if (res.data.code === 200) {
          let music = res.data.songs[0];
          console.log(music);
          let musicName = music.name;
          let musicImg = music.al.picUrl;
          let leng = music.ar.length;
          leng = leng > 3 ? 3 : leng;
          let songer = "";
          for (let j = 0; j < leng; j++) {
            songer = songer + "&" + music.ar[j].name;
          }
          // console.log(musicName);
          // console.log(musicImg);
          // console.log(songer);
          me.music = {
            musicId: musicId,
            musicName: musicName,
            musicImg: musicImg,
            songer: songer
          };
          // console.log(me.music);
        }
      });
    },
    musicMore(musicId) {
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
                let imgUrl = ress.data.songs[0].al.picUrl + "?param=230y230";
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
  align-items: center;
}
.musicsList li {
  display: flex;
  width: 32%;
  height: 300px;
  margin-bottom: 24px;
  color: #333333;
  align-items: center;
  background: #6ca4c548;
  flex-wrap: wrap;
  justify-content: space-around;
  opacity: 0.95;
}
/* .musicsList li .musicsList_img {
  width: 60%;
  min-width: 230px;
  height: 230px;
   margin: auto; 
} */
.musicsList li .musicsList_img img {
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
  width: 66%;
}


.searchMusic .playMusic {
  position: fixed;
  display: flex;
  width: 300px;
  height: 300px;
  left: 40px;
  bottom: 20px;
  background: rgba(33, 166, 219, 0.459);
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
}
.searchMusic .playMusic .playMusic_img {
  display: flex;
  width: 100%;
  height: 120px;
  align-items: center;
}
.searchMusic .playMusic .playMusic_img img {
  width: 30%;
  margin: auto;
}
.searchMusic .playMusic img:hover {
  width: 36%;
}
.searchMusic .playMusic audio {
  width: 70%;
}
.searchMusic .playMusic .playMusic_span {
  width: 100%;
  height: 90px;
  padding: 0 40px 30px;
}
.searchMusic .playMusic .playMusic_span span {
  width: 42%;
  height: 90px;
  font-size: 12px;
  line-height: 36px;
  text-align: center;
}
</style>
