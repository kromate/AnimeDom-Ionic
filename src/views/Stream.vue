<template>
  <IonContent class="mx-auto">
    <div id="video-container">
      <!-- Video -->
      <video
        id="video"
        playsinline
        x-webkit-airplay="allow"
        allowfullscreen="allow"
        preload="metadata"
        poster="@/assets/general/Poster.png"
      >
        <source
          src="https://gogo-cdn.com/download.php?url=aHR0cHM6LyAdrefsdsdfwerFrefdsfrersfdsrfer363435349URASDGHUSRFSJGYfdsffsderFStewthsfSFtrftesdfjZG40LmNsb3VkOXh4LmNvbS91c2VyMTM0Mi9mYWYwNzFmYTBiYzliYTM4NmViNmFiNjZiNmExZjJkMi9FUC4zNC4zNjBwLm1wND90b2tlbj0yaUZ0VzNtTl9jZ0p3d0M3TVhjSGl3JmV4cGlyZXM9MTYyMjI4NzgzNCZpZD0xNjIxNjM="
          type="video/mp4"
        />
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
        <input type="range" id="seek-bar" value="0" />
        <button type="button" id="mute" @click="mute_btn()">
          <ion-icon :icon="muted ? volumeHigh : volumeMute"></ion-icon>
        </button>
        <input type="range" id="volume-bar" min="0" max="1" step="0.1" value="1" />
        <button type="button" id="full-screen" @click="full_screen()">
          <ion-icon :icon="muted ? volumeHigh : volumeMute"></ion-icon>
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
    };
  },
  methods: {
    play_pause_btn() {
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
  },

  mounted() {
    // eslint-disable
    this.video = document.getElementById("video");

    // Buttons
    this.playButton = document.getElementById("play-pause");
    this.muteButton = document.getElementById("mute");
    this.fullScreenButton = document.getElementById("full-screen");

    // // Sliders
    // var seekBar = document.getElementById("seek-bar");
    // var volumeBar = document.getElementById("volume-bar");
  },
};
</script>

<style scoped>
#video-container {
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
  opacity: 0;
  -webkit-transition: opacity 0.3s;
  -moz-transition: opacity 0.3s;
  -o-transition: opacity 0.3s;
  -ms-transition: opacity 0.3s;
  transition: opacity 0.3s;
  background-image: linear-gradient(bottom, rgb(3, 113, 168) 13%, rgb(0, 136, 204) 100%);

  background-image: -webkit-gradient(
    linear,
    left bottom,
    left top,
    color-stop(0.13, rgb(3, 113, 168)),
    color-stop(1, rgb(0, 136, 204))
  );
}

#video-container:hover #video-controls {
  opacity: 0.9;
}

button {
  background: rgba(0, 0, 0, 0.5);
  border: 0;
  color: #eee;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  -o-border-radius: 3px;
  border-radius: 3px;
}

button:hover {
  cursor: pointer;
}

#seek-bar {
  width: 360px;
}

#volume-bar {
  width: 60px;
}
</style>
