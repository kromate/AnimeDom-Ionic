<template>
  <IonContent>
    <div id="video-container mx-auto">
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
        <input type="range" id="seek-bar" value="0" @change="seek()" />
        <button type="button" id="mute" @click="mute_btn()">
          <ion-icon :icon="muted ? volumeHigh : volumeMute"></ion-icon>
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
  background-image: linear-gradient(
    linear,
    left bottom,
    left top,
    color-stop(0.13, rgb(24 84 15)),
    color-stop(1, rgb(65 191 46 / 89%))
  );

  background-image: -webkit-gradient(
    linear,
    left bottom,
    left top,
    color-stop(0.13, rgb(24 84 15)),
    color-stop(1, rgb(65 191 46 / 89%))
  );
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: space-around;
  align-items: center;
}

#video-container:hover #video-controls {
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
  width: 43px;
  color: black;
  box-shadow: 1px 2px 3px black;
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
