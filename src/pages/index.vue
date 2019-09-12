<template>
  <div class="warp">
    <div class="sliper">
      <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide v-for="musicImg in musicImgList" :key="musicImg.musicId">
          <img v-on:click="playMusic(musicImg.musicId)" :src="musicImg.imgUrl" alt />
        </swiper-slide>
      </swiper>
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
      <div class="swiper-pagination"></div>
    </div>
    <div class="searchMusic">
      <ul class="musicsList">
        <li v-for="music in musicList" v-on:click="playMusic(music.id)" :key="music.id">
          <img :src="music.imgUrl" alt />
          <div class="music_text">
            <span>{{music.name}}</span>
            <span>{{music.songer}}</span>
          </div>
        </li>
      </ul>
    </div>
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
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  components: {
    swiper,
    swiperSlide
  },
  name: "index",
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  data() {
    return {
      // swiper配置
      swiperOption: {
        autoplay: {
          delay: 3000, //1秒切换一次
          disableOnInteraction: false
        },
        // 轮播收尾链接
        loop:true,
        pagination: {
          el: ".swiper-pagination"
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        effect: "coverflow",
        slidesPerView: 2,
        centeredSlides: true
      },
      //   musicSearch: "http://musicapi.leanapp.cn/search?keywords=",
      musicHot: "http://www.young1024.com:666/top/list?idx=1",
      musicImgList: [
        {
          imgUrl: require("../assets/images/slider01.jpg"),
          musicId: "1388126434"
        },
        {
          imgUrl: require("../assets/images/slider02.jpg"),
          musicId: "502043537"
        },
        {
          imgUrl: require("../assets/images/slider03.jpg"),
          musicId: "1388799904"
        },
        {
          imgUrl: require("../assets/images/slider04.jpg"),
          musicId: "1389040913"
        },
        {
          imgUrl: require("../assets/images/slider05.jpg"),
          musicId: "1389071605"
        },
        {
          imgUrl: require("../assets/images/slider06.jpg"),
          musicId: "81401908"
        },
        {
          imgUrl: require("../assets/images/slider07.jpg"),
          musicId: "1388975952"
        }
      ],
      musics: [],
      musicId: "",
      searchText: "",
      hotMusicsId: [],
      musicTextUrl: "http://www.young1024.com:666/song/detail?ids=",
      musicUrl: "https://music.163.com/song/media/outer/url?id=",
      musicMoreUrl: "http://www.young1024.com:666/song/detail?ids=",
      music: [],
      musicList: []
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
        // console.log(me.hotMusicsId);
        // console.log(me.musicList);
      }
    });
    //  me.mySwiper.autoplay.stop();
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../assets/css/index.css";
.sliper {
  position: relative;
  width: 80%;
  min-width: 1200px;
  margin: auto;
}
.sliper .swiper-pagination {
  position: relative;
}
.sliper .swiper-pagination span + span {
  margin-left: 20px;
}
.warp .playMusic {
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
.warp .playMusic .playMusic_img {
  display: flex;
  width: 100%;
  height: 120px;
  align-items: center;
}
.warp .playMusic .playMusic_img img {
  width: 30%;
  margin: auto;
}
.warp .playMusic img:hover {
  width: 36%;
}
.warp .playMusic audio {
  width: 70%;
}
.warp .playMusic .playMusic_span {
  width: 100%;
  height: 90px;
  padding: 0 40px 30px;
}
.warp .playMusic .playMusic_span span {
  width: 42%;
  height: 90px;
  font-size: 12px;
  line-height: 36px;
  text-align: center;
}
</style>
