var pacman = pacman || {};

pacman.Audio = function(){

  var sound             = {};
  var backgroundMusic   = null;

  sound.ready = new Audio("audio/ready.mp3");
  sound.siren = new Audio("audio/siren.mp3");
  sound.waza  = new Audio("audio/waza.mp3");
  
  sound.eatBiscuit = new Audio("audio/eating.mp3");
  sound.eatGhost   = new Audio("audio/eat-ghost.mp3");
  sound.eatPill    = new Audio("audio/eat-pill.mp3");
  sound.eatFruit   = new Audio("audio/eat-fruit.mp3");
  sound.ghostEaten = new Audio("audio/ghost-eaten.mp3");
  sound.die        = new Audio("audio/die.mp3");
  
  function playSound(sound_, callback){
    
    try{
      sound[sound_].play();
      if(callback)
        sound[sound_].onended = callback;
    }catch(err){
      console.error(err);
    }

  }

  function playMusic(music){
    
    try{

      if(backgroundMusic)
        backgroundMusic.pause();

      backgroundMusic = sound[music];
      backgroundMusic.loop = true;
      backgroundMusic.play();
    
    }catch(err){
      console.error(err);
    }

  }

  function pauseMusic(){
    
    try{
      backgroundMusic.pause();
    }catch(error){
      console.error(error);
    }

  }

  function continueMusic(){
   
   try{
     backgroundMusic.play();
   }catch(error){
     console.error(error);
   }

  }

  return {
    playSound: playSound,
    playMusic: playMusic,
    pauseMusic: pauseMusic,
    continueMusic: continueMusic
  };

}();