<template>
  <div class="warp">
    <div class="header">
      <ul>
        <li class="header_li_logo">
          <label>Music</label>
        </li>
        <li class="header_li_menu" v-for="item in headMenuUl" :key="item.id">{{item.name}}</li>
        <li class="header_li_search">
          <input type="text" v-model="search" v-on:change="getMusic" />
        </li>
        <li class="header_li_audio">
          <audio id="audio" v-bind:src="musicUrl+musicId" controls="controls" autoplay="autoplay"></audio>
        </li>
      </ul>
    </div>
    <div class="lyric" id="lyric">
      <ul>
        <li :id="lyric.lyric_id" v-for="lyric in musicLyric" :key="lyric.lyricId">
          <p>{{lyric.lyric}}</p>
        </li>
      </ul>
    </div>
    <ul class="musicsList">
      <li v-for="music in musicList" :key="music.id">
        <img :src="music.imgUrl" alt />
        <div class="musicsList">
          <span>{{music.name}}</span>
          <span>{{music.songer}}</span>
        </div>
        <span v-on:click="playMusic(music.id)">播放</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      headMenuUl: [
        { name: "发现音乐", id: 1 },
        { name: "音乐排行榜", id: 2 },
        { name: "待续", id: 3 }
      ],
      //   musicSearch: "http://musicapi.leanapp.cn/search?keywords=",
      musicSearch: "http://www.young1024.com:666/search?keywords=",
      musicUrl: "https://music.163.com/song/media/outer/url?id=",
      musicLyricUrl: "https://api.imjad.cn/cloudmusic/?type=lyric&id=",
      musicHot: "http://www.young1024.com:666/top/list?idx=1",
      musicLyric: [],
      musics: [],
      musicId: "",
      search: "",
      hotMusicsId: [],
      musicTextUrl: "http://www.young1024.com:666/song/detail?ids=",
      musicList: []
    };
  },
  methods: {
    getMusic() {
      let me = this;
      let url = me.musicSearch + me.search;
      console.log(url);
      me.$http.get(url).then(res => {
        console.log(res.data);
        if (res.data.code === 200) {
          console.log(res.data.result.songs);
          me.musics = res.data.result.songs;
          console.log(me.musics);
        }
      });
    },
    playMusic(musicId) {
      let me = this;
      let url = me.musicLyricUrl + musicId;
      me.musicId = musicId;
      me.$http.get(url).then(res => {
        let musicLyric = res.data.lrc.lyric;
        musicLyric = musicLyric.replace(/(\r\n)|(\n)/g, "");
        musicLyric = musicLyric.split("[");
        me.musicLyric=[];
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
        // console.log(me.musicLyric);
      });
    }
  },
  mounted() {
    let me = this;
    let url = me.musicHot;
    me.$http.get(url).then(res => {
      //   console.log(res.data);
      if (res.data.code === 200) {
        for (let i = 0, len = 30; i < len; i++) {
          let id = res.data.privileges[i].id;
          let musicTextUrl = me.musicTextUrl + id;
          me.hotMusicsId.push(res.data.privileges[i].id);
          me.$http.get(musicTextUrl).then(ress => {
            // console.log(ress.data);
            if (ress.data.code === 200) {
              let name = ress.data.songs[0].name;
              let leng = ress.data.songs[0].ar.length;
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
        console.log(me.hotMusicsId);
        console.log(me.musicList);
      }
    });
  }
};
$(function() {
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
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../assets/css/index.css";
</style>
