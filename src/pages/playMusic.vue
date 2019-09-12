<template>
  <div class="playMusic">
    <div class="music">
      <img :src="music.musicImg" class="img-circle" />
      <div class="music_text">
        <div class="music_text_music">
          <label for>单曲</label>
          <span>{{music.musicName}}</span>
        </div>
        <div class="music_text_songer">
          <label for>歌手</label>
          <span>{{music.songer}}{{music.songer}}{{music.songer}}</span>
        </div>
        <audio id="audio" v-bind:src="musicUrl+musicId" controls="controls" autoplay="autoplay"></audio>
      </div>
    </div>
    <div class="lyric_text">
      <p v-for="lyric in musicLyric" v-bind:key="lyric.musicId">{{lyric.lyric}}</p>
    </div>
    <div class="lyric" id="lyric">
      <ul>
        <li :id="lyric.lyric_id" v-for="lyric in musicLyric" :key="lyric.lyricId">
          <p>{{lyric.lyric}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "playMusic",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      musicUrl: "https://music.163.com/song/media/outer/url?id=",
      musicId: "",
      musicLyricUrl: "https://api.imjad.cn/cloudmusic/?type=lyric&id=",
      musicLyric: [],
      musicMoreUrl: "http://www.young1024.com:666/song/detail?ids=",
      music: [],
      musicLyricText:[],
    };
  },
  mounted() {
    let me = this;
    if (
      me.$route.query.musicId != "" &&
      me.$route.query.musicId != undefined &&
      me.$route.query.musicId != null
    ) {
      me.musicId = me.$route.query.musicId;
      // console.log(me.musicId);
    }
    let lyricUrl = me.musicLyricUrl + me.musicId;
    let musicMoreUrl = me.musicMoreUrl + me.musicId;
    me.$http.get(lyricUrl).then(res => {
      let musicLyric = res.data.lrc.lyric;
      musicLyric = musicLyric.replace(/(\r\n)|(\n)/g, "");
      musicLyric = musicLyric.split("[");
      me.musicLyric = [];
      for (let i = 0, len = musicLyric.length; i < len; i++) {
        let musicLyric_time_and_lyric = musicLyric[i].split("]");
        let time = musicLyric_time_and_lyric[0];
        let lyric = musicLyric_time_and_lyric[1];
        let timer = time.split(".");
        let haomiao = timer[1];
        let fenzhong = timer[0].split(":");
        let miaoshu = fenzhong[0] * 60 + fenzhong[1] * 1;
        me.musicLyric.push({ lyric_id: miaoshu, lyric: lyric });
      }
      $("#audio")[0].addEventListener("timeupdate", function() {
        let time = this.currentTime;
        let timer = parseInt(time);
        for (var i = 0; i < timer; i++) {
          $("#" + i)
            .stop()
            .slideDown(300)
            .siblings()
            .hide();
        }
      });
    });

    me.$http.get(musicMoreUrl).then(res => {
      if (res.data.code === 200) {
        let music = res.data.songs[0];
        console.log(music);
        let musicName = music.name;
        let musicImg = music.al.picUrl;
        let leng = music.ar.length;
        let songer = "";
        for (let j = 0; j < leng; j++) {
          songer = songer + "&" + music.ar[j].name;
        }
        console.log(musicName);
        console.log(musicImg);
        console.log(songer);
        me.music = {
          musicName: musicName,
          musicImg: musicImg,
          songer: songer
        };
        console.log(me.music);
      }
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.music {
  display: flex;
  width: 80%;
  min-width: 1200px;
  margin: 100px auto 0;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
}
.music img {
  width: 24%;
  border: 40px solid black;
}
.music .music_text {
  display: flex;
  width: 26%;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
}
.music .music_text label {
  margin: 0;
  padding: 5px 12px;
  color: rgb(241, 234, 234);
  background: #dd2626;
}
.music .music_text .music_text_music,
.music .music_text .music_text_songer {
  display: flex;
  width: 100%;
  padding: 26px;
  justify-content: left;
  align-items: center;
}
.music .music_text .music_text_music label,
.music .music_text .music_text_songer label {
  display: block;
  float: left;
  width: 80px;
  margin-right: 30px;
}
.music .music_text .music_text_music span {
  font-size: 20px;
}
.music .lyric_text p.action{
  color: #ff4d4d;
  font-size: 30px;
}
</style>
