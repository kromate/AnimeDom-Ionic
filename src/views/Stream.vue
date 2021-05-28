<template>
  <IonContent class="mx-auto">
    <div id="videoContainer" class="videoContainer">
      <video
        id="video"
        playsinline
        x-webkit-airplay="allow"
        allowfullscreen="allow"
        preload="metadata"
        poster="@/assets/general/Poster.png"
      >
        <source
          src="https://gogo-cdn.com/download.php?url=aHR0cHM6LyAawehyfcghysfdsDGDYdgdsfsdfwstdgdsgtert9URASDGHUSRFSJGYfdsffsderFStewthsfSFtrftesdfjZG4xMnguY2xvdWQ5eHguY29tL3VzZXIxMzQyL2Y5NTFkZjI1ZWNmMzE4NDAwZjAyNjFhYjAwNTRlMjY4L0VQLjguMzYwcC5tcDQ/dG9rZW49b21VdXpNaGg3SGZYdjdkcVJJdTVWUSZleHBpcmVzPTE2MjIyMDkyNjYmaWQ9MTYyMDkx"
          type="video/mp4"
        />
        <p>Your browser does not support the video tag.</p>
      </video>

      <div class="control">
        <a class="play video-play" @click="playing = !playing"
          ><ion-icon :icon="playing ? pause : play"></ion-icon
        ></a>

        <div class="progress">
          <div class="progress-bar"></div>
        </div>
        <div class="time">
          <span class="ctime">0:00</span>
          <span class="stime"> / </span>
          <span class="ttime">0:00</span>
        </div>
        <div class="volume">
          <a class="toggle-sound video-volume-high"> </a>
          <div class="volume-piller">
            <div class="volume-slider"></div>
          </div>
        </div>
        <a id="picture-in-picture" class="video-picture-in-picture-enter"></a>
        <a id="airplay" class="video-airplay"></a>
        <a class="fullscreen video-fullscreen-enter"><ion-icon :icon="expand"></ion-icon></a>
      </div>
    </div>
  </IonContent>
</template>

<script>
import { IonIcon } from "@ionic/vue";
import { expand, play, pause } from "ionicons/icons";
import { IonContent } from "@ionic/vue";
import "../helper/video.js";
export default {
  name: "stream",
  components: { IonContent, IonIcon },
  data() {
    return {
      playing: false,
      expand,
      play,
      pause,
    };
  },
};
</script>

<style scoped>
.videoContainer {
  position: relative;
  width: 720px;
  max-width: 98vw;
  font-family: Arial;
  background-color: black;
}
.videoContainer video {
  width: 100%;
  /* height: 100%; */
  display: block;
}

/* ---- Controls ---- */
.control {
  width: 100%;
  height: 30px;
  background-color: #262626;
  position: absolute;
  left: 0px;
  bottom: 0px;
  display: flex;
  z-index: 2147483647;
  /* ---- Progress ---- */
}
.control label {
  display: block;
  padding: 0px 10px;
  color: white;
  line-height: 30px;
}
.control a {
  display: block;
  width: 40px;
  height: 30px;
  color: #bebebe;
  text-align: center;
  text-decoration: none;
  line-height: 30px;
  position: relative;
  cursor: pointer;
  font-size: 14px;
}
.control a:hover {
  color: #33b5d5;
  text-decoration: none;
  background-color: #3f3f3f;
}
.control .play {
  margin-right: 5px;
}
.control .progress {
  width: 100%;
  height: 10px;
  background: #1b1b1b;
  -webkit-backdrop-filter: blur(20px);
  box-shadow: inset 0 -5px 10px rgba(0, 0, 0, 0.1);
  float: left;
  cursor: pointer;
  padding: 0;
  margin: 0;
  position: absolute;
  left: 0px;
  top: -10px;
  font-variant: normal;
  opacity: 0.7;
  overflow-x: hidden;
}
.control .progress-bar {
  background: #33b5d5;
  box-shadow: inset -30px 0px 69px -20px #33b5d5;
  height: 100%;
  position: relative;
  z-index: 999;
  width: 0;
}
.control .progress-bar:before {
  width: 5px;
  height: 10px;
  top: 0px;
  right: 0px;
  content: " ";
  background-color: #fff;
  position: absolute;
}
.control .time {
  color: #fff;
  font-weight: bold;
  font-size: 10px;
  line-height: 30px;
  width: 100%;
}

/* ----- Fullscreen ----- */
.videoContainer:-webkit-full-screen {
  width: 100%;
  height: 100%;
}
.videoContainer:-ms-fullscreen {
  width: 100%;
  height: 100%;
}
.videoContainer:fullscreen {
  width: 100%;
  height: 100%;
}

.videoContainer:-ms-fullscreen {
  width: 100%;
  height: 100%;
}

.videoContainer:-webkit-full-screen {
  width: 100%;
  height: 100%;
}

video:-webkit-full-screen::media-controls-panel,
video:-webkit-full-screen::media-controls,
video:-webkit-full-screen::media-text-track-container {
  display: none !important;
  opacity: 0;
}

video:-ms-fullscreen::media-controls-panel,
video:-ms-fullscreen::media-controls,
video:-ms-fullscreen::media-text-track-container {
  display: none !important;
  opacity: 0;
}

video:fullscreen::media-controls-panel,
video:fullscreen::media-controls,
video:fullscreen::media-text-track-container {
  display: none !important;
  opacity: 0;
}

video:-ms-fullscreen::-ms-media-controls-panel,
video:-ms-fullscreen::-ms-media-controls,
video:-ms-fullscreen::-ms-media-text-track-container {
  display: none !important;
  opacity: 0;
}

video:-moz-full-screen::-moz-media-controls-panel,
video:-moz-full-screen::-moz-media-controls,
video:-moz-full-screen::-moz-media-text-track-container {
  display: none !important;
  opacity: 0;
}

video:-o-full-screen::-o-media-controls-panel,
video:-o-full-screen::-o-media-controls,
video:-o-full-screen::-o-media-text-track-container {
  display: none !important;
  opacity: 0;
}

video:-webkit-full-screen::-webkit-media-controls-panel,
video:-webkit-full-screen::-webkit-media-controls,
video:-webkit-full-screen::-webkit-media-text-track-container {
  display: none !important;
  opacity: 0;
}

.volume {
  width: 30px;
}

.volume:hover {
  background-color: #3f3f3f;
}

.volume a {
  width: 30px;
}

.volume:hover .volume-piller {
  display: block;
}

.volume-piller {
  width: 30px;
  height: 120px;
  bottom: 30px;
  display: none;
  overflow: hidden;
  position: absolute;
  z-index: 10100;
  background-color: #3f3f3f;
}

.volume-slider {
  position: relative;
  margin: 0 auto;
  height: 100px;
  width: 6px;
  background-color: #1d1d1d;
  border-radius: 10px;
  top: 15px;
}

.ui-slider-range-min {
  height: 300px;
  width: 6px;
  position: absolute;
  background: #2ea7cc;
  border: none;
  border-radius: 10px;
  outline: none;
  bottom: 0;
}

.ui-slider-handle {
  width: 12px;
  height: 12px;
  border-radius: 20px;
  background: #fff;
  position: absolute;
  margin-left: -3px;
  margin-bottom: -6px;
  cursor: pointer;
  outline: none;
}

/* ----- Ignore this ---- */
* {
  margin: 0;
  padding: 0;
  -webkit-touch-callout: none;
  /* iOS Safari */
  -webkit-user-select: none;
  /* Chrome/Safari/Opera */
  /* Konqueror */
  -moz-user-select: none;
  /* Firefox */
  -ms-user-select: none;
  /* Internet Explorer/Edge */
  user-select: none;
  -webkit-font-smoothing: antialiased;
}

body {
  font-family: "Raleway", sans-serif;
}

.videoContainer {
  margin: 0 auto;
  box-shadow: 0 2px 12px gray;
}

p {
  font-size: 0.9rem;
}
</style>
