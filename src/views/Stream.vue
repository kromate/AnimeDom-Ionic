<template>
  <IonContent>
    <div class="video-container mx-auto flex justify-center mt-3">
      <!-- Video -->
      <video
        id="video"
        playsinline
        x-webkit-airplay="allow"
        allowfullscreen="allow"
        preload="metadata"
        poster="@/assets/general/Poster.png"
        @ended="playing == false"
      >
        <source :src="$route.query.link" type="video/mp4" />
        <p>
          Your browser doesn't support HTML5 video.
          <a href="videos/mikethefrog.mp4">Download</a> the video instead.
        </p>
      </video>
      <!-- Video Controls -->
      <div id="video-controls">
        <button type="button" id="play-pause" class="play" @click="play_pause_btn()">
          <ion-icon :icon="playing ? pause : play"></ion-icon>
        </button>
        <p class="text-white font-bold">{{ video_current_time }} / {{ video_duration }}</p>
        <input type="range" id="seek-bar" value="0" @change="seek()" />
        <button type="button" id="mute" @click="mute_btn()">
          <ion-icon :icon="muted ? volumeMute : volumeHigh"></ion-icon>
        </button>
        <input
          type="range"
          id="volume-bar"
          min="0"
          max="1"
          step="0.1"
          value="1"
          @change="videoVolume()"
        />
        <button type="button" id="full-screen" @click="full_screen()">
          <ion-icon :icon="expand"></ion-icon>
        </button>
      </div>
    </div>
  </IonContent>
</template>

<script>
import { IonIcon } from "@ionic/vue";
import { expand, play, pause, volumeMute, volumeHigh } from "ionicons/icons";
import { IonContent } from "@ionic/vue";
// import "../helper/video.js";
export default {
  name: "stream",
  components: { IonContent, IonIcon },
  data() {
    return {
      playing: false,
      muted: true,
      expand,
      play,
      pause,
      volumeMute,
      volumeHigh,

      video: "",
      playButton: "",
      muteButton: "",
      fullScreenButton: "",
      seekBar: "",
      volumeBar: "",
      video_duration: "0:00",
      video_current_time: "0:00",
    };
  },

  methods: {
    formatTime(seconds) {
      let minutes = Math.floor(seconds / 60);
      minutes = minutes >= 10 ? minutes : "0" + minutes;
      seconds = Math.floor(seconds % 60);
      seconds = seconds >= 10 ? seconds : "0" + seconds;
      return minutes + ":" + seconds;
    },
    setTime() {
      this.video_duration = this.formatTime(Math.round(this.video.duration));
      setInterval(() => {
        this.video_current_time = this.formatTime(Math.round(this.video.currentTime));
      }, 500);
    },
    play_pause_btn() {
      this.setTime();
      if (this.video.paused == true) {
        this.video.play();
        this.playing = true;
      } else {
        this.video.pause();
        this.playing = false;
      }
    },
    mute_btn() {
      if (this.video.muted == false) {
        this.muted = true;
        this.video.muted = true;
      } else {
        // Unmute the video
        this.muted = false;
        this.video.muted = false;
      }
    },
    full_screen() {
      if (this.video.requestFullscreen) {
        this.video.requestFullscreen();
      } else if (this.video.mozRequestFullScreen) {
        this.video.mozRequestFullScreen(); // Firefox
      } else if (this.video.webkitRequestFullscreen) {
        this.video.webkitRequestFullscreen(); // Chrome and Safari
      }
    },

    videoVolume() {
      this.video.volume = this.volumeBar.value;
    },
    seek() {
      let time = this.video.duration * (this.seekBar.value / 100);
      this.video.currentTime = time;
    },
  },

  mounted() {
    this.video = document.getElementById("video");

    // Buttons
    this.playButton = document.getElementById("play-pause");
    this.muteButton = document.getElementById("mute");
    this.fullScreenButton = document.getElementById("full-screen");

    // // Sliders
    this.seekBar = document.getElementById("seek-bar");
    this.volumeBar = document.getElementById("volume-bar");

    this.video.addEventListener("timeupdate", () => {
      let value = (100 / this.video.duration) * this.video.currentTime;
      this.seekBar.value = value;
    });
    this.seekBar.addEventListener("mousedown", () => {
      this.video.pause();
    });

    this.seekBar.addEventListener("mouseup", () => {
      this.video.play();
    });
  },
  created() {
    if (this.$route.query.link == undefined) {
      this.$router.push("/");
    }
  },
};
</script>

<style scoped>
.video-container {
  width: 640px;
  max-width: 98vw;
  height: 365px;
  position: relative;
}

#video-controls {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 5px;
  opacity: 1;
  -webkit-transition: opacity 0.3s;
  -moz-transition: opacity 0.3s;
  -o-transition: opacity 0.3s;
  -ms-transition: opacity 0.3s;
  transition: opacity 0.3s;
  background-image: linear-gradient(
    linear,
    left bottom,
    left top,
    color-stop(0.13, rgb(18 18 18)),
    color-stop(1, rgb(28 29 28 / 89%))
  );

  background-image: -webkit-gradient(
    linear,
    left bottom,
    left top,
    color-stop(0.13, rgb(18 18 18)),
    color-stop(1, rgb(28 29 28 / 89%))
  );
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: space-around;
  align-items: center;
}

.video-container:hover #video-controls {
  opacity: 0.9;
}

button {
  background: transparent;
  outline: none;
  border: 0;
  color: #eee;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  -o-border-radius: 3px;
  border-radius: 3px;
}

ion-icon.md.hydrated {
  width: 30px;
  color: wjite;
  box-shadow: 1px 2px 3px black;
}
button:hover {
  cursor: pointer;
}

#seek-bar {
  width: 260px;
}

#volume-bar {
  width: 60px;
}

input[type="range"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: none;
  cursor: pointer;
  display: inline-block;
  height: 100%;
  min-height: 50px;
  overflow: hidden;
  width: 230px;
}
input[type="range"]:focus {
  box-shadow: none;
  outline: none;
}
input[type="range"]::-webkit-slider-runnable-track {
  background: #1b291d;
  content: "";
  height: 6px;
  pointer-events: none;
  border: 1px solid #d5d5d5;
}
input[type="range"]::-webkit-slider-thumb {
  height: 20px;
  width: 20px;
  -webkit-appearance: none;
  appearance: none;
  background: #1b291d;
  border-radius: 50%;
  box-shadow: 5px 0 0 -8px #f6f6f6, 6px 0 0 -8px #f6f6f6, 7px 0 0 -8px #f6f6f6, 8px 0 0 -8px #f6f6f6,
    9px 0 0 -8px #f6f6f6, 10px 0 0 -8px #f6f6f6, 11px 0 0 -8px #f6f6f6, 12px 0 0 -8px #f6f6f6,
    13px 0 0 -8px #f6f6f6, 14px 0 0 -8px #f6f6f6, 15px 0 0 -8px #f6f6f6, 16px 0 0 -8px #f6f6f6,
    17px 0 0 -8px #f6f6f6, 18px 0 0 -8px #f6f6f6, 19px 0 0 -8px #f6f6f6, 20px 0 0 -8px #f6f6f6,
    21px 0 0 -8px #f6f6f6, 22px 0 0 -8px #f6f6f6, 23px 0 0 -8px #f6f6f6, 24px 0 0 -8px #f6f6f6,
    25px 0 0 -8px #f6f6f6, 26px 0 0 -8px #f6f6f6, 27px 0 0 -8px #f6f6f6, 28px 0 0 -8px #f6f6f6,
    29px 0 0 -8px #f6f6f6, 30px 0 0 -8px #f6f6f6, 31px 0 0 -8px #f6f6f6, 32px 0 0 -8px #f6f6f6,
    33px 0 0 -8px #f6f6f6, 34px 0 0 -8px #f6f6f6, 35px 0 0 -8px #f6f6f6, 36px 0 0 -8px #f6f6f6,
    37px 0 0 -8px #f6f6f6, 38px 0 0 -8px #f6f6f6, 39px 0 0 -8px #f6f6f6, 40px 0 0 -8px #f6f6f6,
    41px 0 0 -8px #f6f6f6, 42px 0 0 -8px #f6f6f6, 43px 0 0 -8px #f6f6f6, 44px 0 0 -8px #f6f6f6,
    45px 0 0 -8px #f6f6f6, 46px 0 0 -8px #f6f6f6, 47px 0 0 -8px #f6f6f6, 48px 0 0 -8px #f6f6f6,
    49px 0 0 -8px #f6f6f6, 50px 0 0 -8px #f6f6f6, 51px 0 0 -8px #f6f6f6, 52px 0 0 -8px #f6f6f6,
    53px 0 0 -8px #f6f6f6, 54px 0 0 -8px #f6f6f6, 55px 0 0 -8px #f6f6f6, 56px 0 0 -8px #f6f6f6,
    57px 0 0 -8px #f6f6f6, 58px 0 0 -8px #f6f6f6, 59px 0 0 -8px #f6f6f6, 60px 0 0 -8px #f6f6f6,
    61px 0 0 -8px #f6f6f6, 62px 0 0 -8px #f6f6f6, 63px 0 0 -8px #f6f6f6, 64px 0 0 -8px #f6f6f6,
    65px 0 0 -8px #f6f6f6, 66px 0 0 -8px #f6f6f6, 67px 0 0 -8px #f6f6f6, 68px 0 0 -8px #f6f6f6,
    69px 0 0 -8px #f6f6f6, 70px 0 0 -8px #f6f6f6, 71px 0 0 -8px #f6f6f6, 72px 0 0 -8px #f6f6f6,
    73px 0 0 -8px #f6f6f6, 74px 0 0 -8px #f6f6f6, 75px 0 0 -8px #f6f6f6, 76px 0 0 -8px #f6f6f6,
    77px 0 0 -8px #f6f6f6, 78px 0 0 -8px #f6f6f6, 79px 0 0 -8px #f6f6f6, 80px 0 0 -8px #f6f6f6,
    81px 0 0 -8px #f6f6f6, 82px 0 0 -8px #f6f6f6, 83px 0 0 -8px #f6f6f6, 84px 0 0 -8px #f6f6f6,
    85px 0 0 -8px #f6f6f6, 86px 0 0 -8px #f6f6f6, 87px 0 0 -8px #f6f6f6, 88px 0 0 -8px #f6f6f6,
    89px 0 0 -8px #f6f6f6, 90px 0 0 -8px #f6f6f6, 91px 0 0 -8px #f6f6f6, 92px 0 0 -8px #f6f6f6,
    93px 0 0 -8px #f6f6f6, 94px 0 0 -8px #f6f6f6, 95px 0 0 -8px #f6f6f6, 96px 0 0 -8px #f6f6f6,
    97px 0 0 -8px #f6f6f6, 98px 0 0 -8px #f6f6f6, 99px 0 0 -8px #f6f6f6, 100px 0 0 -8px #f6f6f6,
    101px 0 0 -8px #f6f6f6, 102px 0 0 -8px #f6f6f6, 103px 0 0 -8px #f6f6f6, 104px 0 0 -8px #f6f6f6,
    105px 0 0 -8px #f6f6f6, 106px 0 0 -8px #f6f6f6, 107px 0 0 -8px #f6f6f6, 108px 0 0 -8px #f6f6f6,
    109px 0 0 -8px #f6f6f6, 110px 0 0 -8px #f6f6f6, 111px 0 0 -8px #f6f6f6, 112px 0 0 -8px #f6f6f6,
    113px 0 0 -8px #f6f6f6, 114px 0 0 -8px #f6f6f6, 115px 0 0 -8px #f6f6f6, 116px 0 0 -8px #f6f6f6,
    117px 0 0 -8px #f6f6f6, 118px 0 0 -8px #f6f6f6, 119px 0 0 -8px #f6f6f6, 120px 0 0 -8px #f6f6f6,
    121px 0 0 -8px #f6f6f6, 122px 0 0 -8px #f6f6f6, 123px 0 0 -8px #f6f6f6, 124px 0 0 -8px #f6f6f6,
    125px 0 0 -8px #f6f6f6, 126px 0 0 -8px #f6f6f6, 127px 0 0 -8px #f6f6f6, 128px 0 0 -8px #f6f6f6,
    129px 0 0 -8px #f6f6f6, 130px 0 0 -8px #f6f6f6, 131px 0 0 -8px #f6f6f6, 132px 0 0 -8px #f6f6f6,
    133px 0 0 -8px #f6f6f6, 134px 0 0 -8px #f6f6f6, 135px 0 0 -8px #f6f6f6, 136px 0 0 -8px #f6f6f6,
    137px 0 0 -8px #f6f6f6, 138px 0 0 -8px #f6f6f6, 139px 0 0 -8px #f6f6f6, 140px 0 0 -8px #f6f6f6,
    141px 0 0 -8px #f6f6f6, 142px 0 0 -8px #f6f6f6, 143px 0 0 -8px #f6f6f6, 144px 0 0 -8px #f6f6f6,
    145px 0 0 -8px #f6f6f6, 146px 0 0 -8px #f6f6f6, 147px 0 0 -8px #f6f6f6, 148px 0 0 -8px #f6f6f6,
    149px 0 0 -8px #f6f6f6, 150px 0 0 -8px #f6f6f6, 151px 0 0 -8px #f6f6f6, 152px 0 0 -8px #f6f6f6,
    153px 0 0 -8px #f6f6f6, 154px 0 0 -8px #f6f6f6, 155px 0 0 -8px #f6f6f6, 156px 0 0 -8px #f6f6f6,
    157px 0 0 -8px #f6f6f6, 158px 0 0 -8px #f6f6f6, 159px 0 0 -8px #f6f6f6, 160px 0 0 -8px #f6f6f6,
    161px 0 0 -8px #f6f6f6, 162px 0 0 -8px #f6f6f6, 163px 0 0 -8px #f6f6f6, 164px 0 0 -8px #f6f6f6,
    165px 0 0 -8px #f6f6f6, 166px 0 0 -8px #f6f6f6, 167px 0 0 -8px #f6f6f6, 168px 0 0 -8px #f6f6f6,
    169px 0 0 -8px #f6f6f6, 170px 0 0 -8px #f6f6f6, 171px 0 0 -8px #f6f6f6, 172px 0 0 -8px #f6f6f6,
    173px 0 0 -8px #f6f6f6, 174px 0 0 -8px #f6f6f6, 175px 0 0 -8px #f6f6f6, 176px 0 0 -8px #f6f6f6,
    177px 0 0 -8px #f6f6f6, 178px 0 0 -8px #f6f6f6, 179px 0 0 -8px #f6f6f6, 180px 0 0 -8px #f6f6f6,
    181px 0 0 -8px #f6f6f6, 182px 0 0 -8px #f6f6f6, 183px 0 0 -8px #f6f6f6, 184px 0 0 -8px #f6f6f6,
    185px 0 0 -8px #f6f6f6, 186px 0 0 -8px #f6f6f6, 187px 0 0 -8px #f6f6f6, 188px 0 0 -8px #f6f6f6,
    189px 0 0 -8px #f6f6f6, 190px 0 0 -8px #f6f6f6, 191px 0 0 -8px #f6f6f6, 192px 0 0 -8px #f6f6f6,
    193px 0 0 -8px #f6f6f6, 194px 0 0 -8px #f6f6f6, 195px 0 0 -8px #f6f6f6, 196px 0 0 -8px #f6f6f6,
    197px 0 0 -8px #f6f6f6, 198px 0 0 -8px #f6f6f6, 199px 0 0 -8px #f6f6f6, 200px 0 0 -8px #f6f6f6,
    201px 0 0 -8px #f6f6f6, 202px 0 0 -8px #f6f6f6, 203px 0 0 -8px #f6f6f6, 204px 0 0 -8px #f6f6f6,
    205px 0 0 -8px #f6f6f6, 206px 0 0 -8px #f6f6f6, 207px 0 0 -8px #f6f6f6, 208px 0 0 -8px #f6f6f6,
    209px 0 0 -8px #f6f6f6, 210px 0 0 -8px #f6f6f6, 211px 0 0 -8px #f6f6f6, 212px 0 0 -8px #f6f6f6,
    213px 0 0 -8px #f6f6f6, 214px 0 0 -8px #f6f6f6, 215px 0 0 -8px #f6f6f6, 216px 0 0 -8px #f6f6f6,
    217px 0 0 -8px #f6f6f6, 218px 0 0 -8px #f6f6f6, 219px 0 0 -8px #f6f6f6, 220px 0 0 -8px #f6f6f6,
    221px 0 0 -8px #f6f6f6, 222px 0 0 -8px #f6f6f6, 223px 0 0 -8px #f6f6f6, 224px 0 0 -8px #f6f6f6,
    225px 0 0 -8px #f6f6f6, 226px 0 0 -8px #f6f6f6, 227px 0 0 -8px #f6f6f6, 228px 0 0 -8px #f6f6f6,
    229px 0 0 -8px #f6f6f6, 230px 0 0 -8px #f6f6f6;
  margin-top: -8px;
  border: 1px solid #777;
}
input[type="range"]::-moz-range-track {
  width: 230px;
  height: 12px;
}
input[type="range"]::-moz-range-thumb {
  height: 28px;
  width: 28px;
  background: #383a3a;
  border-radius: 50%;
  border: 1px solid #777;
  position: relative;
}
input[type="range"]::-moz-range-progress {
  height: 12px;
  background: #737c81;
  border: 0;
  margin-top: 0;
}
input[type="range"]::-ms-track {
  background: transparent;
  border: 0;
  border-color: transparent;
  border-radius: 0;
  border-width: 0;
  color: transparent;
  height: 12px;
  margin-top: 10px;
  width: 230px;
}
input[type="range"]::-ms-thumb {
  height: 28px;
  width: 28px;
  background: #41bea8;
  border-radius: 50%;
  border: 1px solid #777;
}
input[type="range"]::-ms-fill-lower {
  background: #737c81;
  border-radius: 0;
}
input[type="range"]::-ms-fill-upper {
  background: #f6f6f6;
  border-radius: 0;
}
input[type="range"]::-ms-tooltip {
  display: none;
}
</style>
