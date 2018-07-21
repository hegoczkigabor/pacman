var pacman = pacman || {};

pacman.FPS       = 15;

pacman.MapSize   = Object.freeze({"X": 19, "Y" : 17});
pacman.BlockSize = Object.freeze({"WIDTH": 32, "HEIGHT": 32});
pacman.Direction = Object.freeze({"LEFT": 0, "RIGHT": 1, "UP": 2, "DOWN": 3});

pacman.Main = function(){

  var game = new pacman.Game();

  function mainLoop(){
    
    setTimeout(function(){

      window.requestAnimationFrame(mainLoop);
      var scoreBoard = game.getScoreBoard();

      document.getElementById("actual-score").innerHTML = scoreBoard.score;
      document.getElementById("actual-lives").innerHTML = scoreBoard.lives;

      game.draw();

    }, 1000 / pacman.FPS);

  }

  function init(ctx){
    
    ctx.canvas.width  = pacman.BlockSize.WIDTH  * pacman.MapSize.X;
    ctx.canvas.height = pacman.BlockSize.HEIGHT * pacman.MapSize.Y;

    document.addEventListener("keydown", function(e){
      game.keyDown(e);
    }, true);

    pacman.graph.init(ctx);
    mainLoop();

  }

  return {  
    init: init
  };

}();