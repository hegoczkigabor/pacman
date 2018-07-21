var pacman = pacman || {};

pacman.GameState = Object.freeze({"MENU": 0, "READY": 1, "PLAYING": 2, "PAUSED": 3, "DYING": 4});

pacman.Game = function(){

  var state           = pacman.GameState.MENU;

  var map             = new pacman.Map();
  var player          = new pacman.Player();

  var ghosts          = [];
  var scoreBoard      = {score: 0, lives: 1};

  var playerSize      = player.getSize();

  var scoreForGhost   = 300;
  var ghostEatTimeout = null;

  function menu(){

    gameState = pacman.GameState.MENU;

    map.draw();
    pacman.graph.writeText("Press N to start a new game", 145, 250);

  }

  function ready(){ 

    state = pacman.GameState.READY;

    pacman.Audio.pauseMusic();
    pacman.graph.clearScreen();

    map.draw();
    pacman.graph.writeText("READY...", 265, 250);

    pacman.Audio.playSound("ready", function(){
      pacman.Audio.playMusic("siren");
      state = pacman.GameState.PLAYING;
    });

  }

  function resetGame(){
    
    state = pacman.GameState.PLAYING;
    
    scoreBoard.lives -= 1;
    player.setStartPosition();
    
    ghosts.forEach(function(ghost){
      ghost.reset();
    });

    pacman.Audio.playMusic("siren");

  }
  
  function pacmanDies(){

    state = pacman.GameState.DYING;

    pacman.graph.clearScreen();

    pacman.Audio.pauseMusic();
    pacman.Audio.playSound("die");

    if(playerSize >= 1){
      map.draw();
      pacman.graph.drawPacmanDies(player.getPosition(), playerSize, 'yellow');
      playerSize--;
    }else{
      playerSize = player.getSize();
      if(scoreBoard.lives >= 1)
        resetGame();
      else
        endGame();
    }

  }

  function eatPill(tile){

    pacman.Audio.playSound("eatPill");

    map.clearTile(tile);
    scoreBoard.score += 50;

    pacman.Audio.playMusic("waza");

    ghosts.forEach(function(ghost){
      ghost.setFeared();
    });

    setTimeout(() => {
      if(state == pacman.GameState.PLAYING)
        pacman.Audio.playMusic("siren");
    }, 6000);

  }

  function eatBiscuit(tile){
    pacman.Audio.playSound("eatBiscuit");
    map.clearTile(tile);
    scoreBoard.score += 10;
  }

  function eatGhost(ghost){

    pacman.graph.writeText(player.getPosition(), scoreForGhost);

    scoreBoard.score += scoreForGhost;
    scoreForGhost    += 300;

    clearTimeout(ghostEatTimeout);

    ghostEatTimeout = setTimeout(function(){
      scoreForGhost = 300;
    }, 5000);

    pacman.Audio.playSound("eatGhost");
    pacman.Audio.playSound("ghostEaten");

    ghost.reset();

  }

  function eatFruit(tile){
    map.clearTile(tile);
    scoreBoard.score += 500;
    pacman.Audio.playSound("eatFruit");
  }

  function ghostPlayerInteraction(ghost) {

    var ghostPosition  = ghost.getPosition();
    var playerPosition = player.getPosition();

    if(Math.abs(ghostPosition.x - playerPosition.x) < 28 && Math.abs(ghostPosition.y - playerPosition.y) < 28){
      if(ghost.isFeared())
        eatGhost(ghost);
      else
        pacmanDies();
    }

    ghost.draw(map);

  }

  function pause(){
    pacman.graph.writeText("Game paused. Press P to continue.", 130, 250);
  }

  function endGame(){

    state = pacman.GameState.MENU;
    
    pacman.Audio.pauseMusic();

    pacman.ScoreBoard.addScore(scoreBoard);
    pacman.ScoreBoard.openScoreBoard();

  }

  function gameplay(){

    pacman.graph.clearScreen();

    var playerPosition = player.getPosition();
    var tile           = map.getTileByPosition(playerPosition);

    if(tile.type == pacman.BlockType.BISCUIT)
      eatBiscuit(tile);
    if(tile.type == pacman.BlockType.PILL)
      eatPill(tile);
    if(tile.type == pacman.BlockType.FRUIT)
      eatFruit(tile);
      
    if(!map.haveEatables())
      endGame();
    
    map.draw();
    
    ghosts.forEach(function(ghost){
      ghostPlayerInteraction(ghost);
    });

    player.move(map);
    player.draw();

  }

  function draw(){

    if(state == pacman.GameState.PLAYING)
      gameplay();
    else if(state == pacman.GameState.PAUSED)
      pause();
    else if(state == pacman.GameState.MENU)
      menu();
    else if(state == pacman.GameState.DYING)
      pacmanDies();

  }

  function keyDown(e){

    if(state == pacman.GameState.PLAYING){

      if(e.key == "ArrowRight"){
        player.setDirection(pacman.Direction.RIGHT);      
      }else if(e.key == "ArrowLeft"){
        player.setDirection(pacman.Direction.LEFT);
      }else if(e.key == "ArrowUp"){
        player.setDirection(pacman.Direction.UP);
      }else if(e.key == "ArrowDown"){
        player.setDirection(pacman.Direction.DOWN);
      }

    }

    if(e.key == "n"){
      if(state != pacman.GameState.READY)
        newGame();
    }
    
    if(e.key == "p"){
      if(state == pacman.GameState.PLAYING){
        pacman.Audio.pauseMusic();
        state = pacman.GameState.PAUSED;
      }else if(state == pacman.GameState.PAUSED){
        pacman.Audio.continueMusic();
        state = pacman.GameState.PLAYING;
      }
    }

  }

  function newGame(){

    map        = new pacman.Map();
    player     = new pacman.Player();

    scoreBoard = {lives: 1, score: 0};
    ghosts     = [];
    
    var colors = ["red", "purple", "green", "pink"];

    for(var i = 0; i < 4; i++){
      ghosts.push(new pacman.Ghost(colors[i]));
    }

    ready();
    
  }

  function getScoreBoard(){
    return scoreBoard;
  }

  return {
    draw: draw,
    newGame: newGame,
    getScoreBoard: getScoreBoard,
    keyDown: keyDown
  };

};
