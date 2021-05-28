import $ from "jquery";
import 'jquery'
import 'jquery-ui'
$(function(){

  // Return a DOM object
  var objectVideo = $('video');
  var video = objectVideo.get(0);
  setVolume(0.8); // Set default volume to 80%

  objectVideo.on('mouseenter mouseleave', function(e) {
      $(this).data('isHovered', e.type==='mouseenter');
  });

  $(document).on('keyup', function(e) {
      if (e.which == 32) {
          var fullScreen = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
          var isHovered  = objectVideo.data('isHovered');

          if (fullScreen || isHovered) {
              playVideo();
        viewContorls(3000);
          }
      }
  });

  objectVideo.click(function(){
    playVideo();
  });

  // Play/Pause control clicked
  $(".play").click(function(){
    playVideo();
  });

  function playVideo() {
    if(video.paused) {
      video.play();
      $(".play").removeClass("video-play");
      $(".play").addClass("video-pause");
    }
    else {
      video.pause();
      $(".play").addClass("video-play");
      $(".play").removeClass("video-pause");
    }
  }

  $('.videoContainer').mouseenter(function() {
    showControls();
  });
  $('.videoContainer').mouseleave(function() {
    hideControls();
  });


  var timer;
  $('.videoContainer').mousemove(function() {
    viewContorls(3000);
  });

  function viewContorls(ms) {
    if (timer) {
      clearTimeout(timer);
      timer = 0;
    }

    showControls()
    $('.videoContainer').css('cursor', 'auto');
    timer = setTimeout(function() {
      hideControls();
      $('.videoContainer').css('cursor', 'none');
    }, ms)
  }


  /*
  * Animate controls
  * --------------------------------------- */

  function showControls() {
    $('.control').fadeIn( 150 );
  }

  function hideControls() {
    $('.control').fadeOut( 150 );
  }


  /*
  * Fullscreen
  * --------------------------------------- */
  $(".fullscreen").click(function(){

    if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
      // exit full-screen
      $(".fullscreen").addClass('video-fullscreen-enter');
      $(".fullscreen").removeClass('video-fullscreen-exit');
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }

    }else if (document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled) {
      var i = document.getElementById("videoContainer");

      $(".fullscreen").removeClass('video-fullscreen-enter');
      $(".fullscreen").addClass('video-fullscreen-exit');

      // go full-screen
      if (i.requestFullscreen) {
        i.requestFullscreen();
      } else if (i.webkitRequestFullscreen) {
        i.webkitRequestFullscreen();
      } else if (i.mozRequestFullScreen) {
        i.mozRequestFullScreen();
      } else if (i.msRequestFullscreen) {
        i.msRequestFullscreen();
      }
    }
  });




  /*
  * Progress time
  * --------------------------------------- */
  setInterval(function(){
    // Update HTML5 video current play time
    $('.ctime').html(formatTime(Math.round(video.currentTime)));

    // Get HTML5 video time duration
    $('.ttime').html(formatTime(video.duration - Math.round(video.currentTime)));
  }, 500);


  function formatTime(seconds) {
   let minutes = Math.floor(seconds / 60);
    minutes = (minutes >= 10) ? minutes : "0" + minutes;
    seconds = Math.floor(seconds % 60);
    seconds = (seconds >= 10) ? seconds : "0" + seconds;
    return minutes + ":" + seconds;
  }

  var scrubber = $(".progress");
    var progress = $(".progress-bar");

  objectVideo.bind("timeupdate", videoTimeUpdateHandler);
    scrubber.bind("mousedown", scrubberMouseDownHandler);

  function videoTimeUpdateHandler() {
          var percent = video.currentTime / video.duration;
          updateProgressWidth(percent);
      }

      function scrubberMouseDownHandler(e) {
          var $this = $(this);
          var x = e.pageX - $this.offset().left;
          var percent = x / $this.width();
          updateProgressWidth(percent);
          updateVideoTime(percent);
      }

      function updateProgressWidth(percent) {
          progress.width((percent * 100) + "%");
      }

      function updateVideoTime(percent) {
          video.currentTime = percent * video.duration;
      }




  /*
  * Volume
  * --------------------------------------- */
  var savedVolume;
  $(".volume a").click( function (){
    if( $("video").prop('muted')) {
      $("video").prop('muted', false);
      setVolume(savedVolume)
    }else {
      $("video").prop('muted', true);
      savedVolume = video.volume;
      setVolume(0)
    }
  });


  $(".volume-slider").slider({
    orientation: "vertical",
    min: 0,
    max: 100,
    value: 80,
    range: "min",
    slide: function(event, ui) {
      setVolume(ui.value / 100);
    }
  });

  function setVolume($volume) {
    video.volume = $volume;

    switch(true) {
      case ($volume >= 0.8):
        // High
        $('.toggle-sound').addClass('video-volume-high');
        $('.toggle-sound').removeClass('video-volume-mediumm');
        $('.toggle-sound').removeClass('video-volume-low');
        $('.toggle-sound').removeClass('video-volume-muted');
        break;
      case ($volume < 0.8 && $volume >= 0.4):
        // Medium
        $('.toggle-sound').addClass('video-volume-medium');
        $('.toggle-sound').removeClass('video-volume-high');
        $('.toggle-sound').removeClass('video-volume-low');
        $('.toggle-sound').removeClass('video-volume-muted');
        break;
      case ($volume < 0.4 && $volume > 0):
        // Low
        $('.toggle-sound').addClass('video-volume-low');
        $('.toggle-sound').removeClass('video-volume-high');
        $('.toggle-sound').removeClass('video-volume-medium');
        $('.toggle-sound').removeClass('video-volume-muted');
        break;
      default:
        // Off
        $('.toggle-sound').addClass('video-volume-muted');
        $('.toggle-sound').removeClass('video-volume-high');
        $('.toggle-sound').removeClass('video-volume-medium');
        $('.toggle-sound').removeClass('video-volume-low');
    }
  }



  /* -------------------------- Safari Webkit -------------------------- */



  /*
   * Picture in Picture
   * --------------------------------------- */

  var PiP = document.getElementById('picture-in-picture');

  if (video.webkitSupportsPresentationMode && typeof video.webkitSetPresentationMode === "function") {
    // Toggle PiP when the user clicks the button.
    PiP.addEventListener("click", function() {
      $("#picture-in-picture").toggleClass("video-picture-in-picture-enter video-picture-in-picture-exit");
      video.webkitSetPresentationMode(video.webkitPresentationMode === "picture-in-picture" ? "inline" : "picture-in-picture");
    });
  } else {
    PiP.style.display = 'none';
  }



  /*
  * Airplay
  * --------------------------------------- */

  var airPlay = document.getElementById('airplay');

  if (window.WebKitPlaybackTargetAvailabilityEvent) {
    video.addEventListener('webkitplaybacktargetavailabilitychanged', function(event) {
      switch (event.availability) {
        case "available":
          airPlay.style.display = 'block';
          break;
        default:
          airPlay.style.display = 'none';
      }
      airPlay.addEventListener('click', function() {
        video.webkitShowPlaybackTargetPicker();
      });
    });
  }else {
    airPlay.style.display = 'none';
  }

// End document ready
});























