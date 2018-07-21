var pacman = pacman || {};

pacman.graph = function(){

  var ctx = null;
  
  function clearScreen(){
    ctx.clearRect(0, 0, pacman.BlockSize.WIDTH * pacman.MapSize.X, pacman.BlockSize.HEIGHT * pacman.MapSize.Y);
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.fillRect(0,0, pacman.BlockSize.WIDTH * pacman.MapSize.X, pacman.BlockSize.HEIGHT * pacman.MapSize.Y);
  }

  function drawBlock(pos, color){
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(pos.x, pos.y, pacman.BlockSize.WIDTH, pacman.BlockSize.HEIGHT); 
  }

  function drawCircle(center, radius, color, angle){

    ctx.beginPath();

    ctx.fillStyle = color;
    ctx.arc(center.x, center.y, radius, angle.startAngle * Math.PI, angle.endAngle * Math.PI, false);

    ctx.fill();

  }

  function drawPacman(position, size, color, direction){
      
      var directions = [
        [{startAngle:1.25, endAngle:0.25},{startAngle:1.75, endAngle:0.75}],
        [{startAngle:0.25, endAngle:1.25},{startAngle:0.75, endAngle:1.75}],
        [{startAngle:0.25, endAngle:1.25},{startAngle:1.75, endAngle:0.75}],
        [{startAngle:1.25, endAngle:0.25},{startAngle:0.75, endAngle:1.75}]
      ];
      
      drawCircle(position, size, color, directions[direction][0]);
      drawCircle(position, size, color, directions[direction][1]);

  }

  function drawPacmanDies(position, size, color){
    drawCircle(position, size, color, {startAngle:0, endAngle: 2});
  }

  function drawBiscuit(pos){
    
    ctx.beginPath();
    
    ctx.fillStyle = "rgb(255,165,0)";
    ctx.arc(pos.x, pos.y, 5, 0, 2 * Math.PI, false);

    ctx.fill();

  }

  function drawPill(pos){

    ctx.beginPath();

    ctx.fillStyle = "white";
    ctx.arc(pos.x, pos.y, 5, 0, 2 * Math.PI, false);

    ctx.fill();

  }

  function drawGhost(pos2, color){

    var pos = {x: pos2.x - 13.5, y: pos2.y + 16};

    ctx.beginPath();

    ctx.moveTo(pos.x, pos.y);
    ctx.lineTo(pos.x, pos.y - 14);
    ctx.bezierCurveTo(pos.x, pos.y - 22, pos.x+6, pos.y-28, pos.x+14, pos.y-28);
    ctx.bezierCurveTo(pos.x+22, pos.y-28, pos.x+28, pos.y-22, pos.x+28, pos.y-14);
    ctx.lineTo(pos.x+28, pos.y);
    ctx.lineTo(pos.x+23,pos.y-5);
    ctx.lineTo(pos.x+18, pos.y);
    ctx.lineTo(pos.x+14, pos.y-5);
    ctx.lineTo(pos.x+9, pos.y);
    ctx.lineTo(pos.x+4, pos.y-5);
    ctx.lineTo(pos.x, pos.y);
    
    ctx.fillStyle = color;
    ctx.fill();

    ctx.beginPath();

    ctx.fillStyle = "black";

    ctx.arc(pos.x + 8, pos.y - 15, 4, 0, 2 * Math.PI, false);
    ctx.arc(pos.x + 20, pos.y - 15, 4, 0, 2 * Math.PI, false);

    ctx.fill();

  }

  function drawFruit(pos){

    var topLeft = {x: pos.x - 16, y: pos.y - 16};

    ctx.beginPath();

    ctx.bezierCurveTo(topLeft.x + 10, topLeft.y + 20, topLeft.x + 16, topLeft.y - 5, topLeft.x + 22, topLeft.y + 23);
    
    ctx.strokeStyle = "green";
    ctx.lineWidth = 2;

    ctx.stroke();
    
    drawCircle({x: topLeft.x + 10, y: topLeft.y + 20}, 4, 'red', {startAngle: 0, endAngle: 2});
    drawCircle({x: topLeft.x + 22, y: topLeft.y + 23}, 4, 'red', {startAngle: 0, endAngle: 2});
    
  }

  function writeText(text, posX, posY){
    
    ctx.beginPath();

    ctx.font        = "24px concertOne";
    ctx.fillStyle   = 'yellow';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    
    ctx.fillText(text, posX, posY);
    ctx.strokeText(text, posX, posY);
    
    ctx.fill();
    ctx.stroke();

  } 

  function init(_ctx){
    ctx = _ctx;
  }

  return {
    init: init,
    drawPill: drawPill,
    drawFruit: drawFruit,
    drawGhost: drawGhost,
    writeText: writeText,
    drawBlock: drawBlock,
    clearScreen: clearScreen,
    drawPacman: drawPacman,
    drawPacmanDies: drawPacmanDies,
    drawCircle: drawCircle,
    drawBiscuit: drawBiscuit,
  };

}();