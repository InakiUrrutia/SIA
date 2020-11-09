let fullscreen = false;

let elem = document.documentElement;

document.addEventListener('keydown', function(event){
  if(event.key == 'f' || event.key == 'F'){ // fullscreen event
    if(!fullscreen){
      fullscreen = true;
      if (elem.requestFullscreen){
        elem.requestFullscreen();
      }
      else if (elem.mozRequestFullScreen){ /* Firefox */
        elem.mozRequestFullScreen();
      }
      else if (elem.webkitRequestFullscreen){ /* Chrome, Safari & Opera */
        elem.webkitRequestFullscreen();
      }
      else if (elem.msRequestFullscreen){ /* IE/Edge */
        elem.msRequestFullscreen();
      }
    }
    else{
      fullscreen = false;
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      else if (document.mozCancelFullScreen) { /* Firefox */
        document.mozCancelFullScreen();
      }
      else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
      }
      else if (document.msExitFullscreen) { /* IE/Edge */
        document.msExitFullscreen();
      }
    }
  }
});
