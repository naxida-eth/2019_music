<template>
  <div class="warp">
    <div class="sliper">
      <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide v-for="musicImg in musicImgList" :key="musicImg.musicId">
          <img v-on:click="playSwiperMusic(musicImg.musicId)" :src="musicImg.imgUrl" alt />
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
    },
    playSwiperMusic(musicId) {
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
</style>
