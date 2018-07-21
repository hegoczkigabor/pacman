var pacman = pacman || {};

pacman.Player = function(){

  var speed        = 8;
  var startPos     = {x: 48, y: 464};
  var position     = {x:startPos.x,y:startPos.y};

  var size         = 16;
  var color        = 'yellow';

  var moving       = false;

  var direction    = pacman.Direction.RIGHT;
  var newDirection = pacman.Direction.RIGHT;

  function draw(){

    if(moving)
      pacman.graph.drawPacman(position, size, color, direction);
    else
      pacman.graph.drawCircle(position, size, color, {startAngle: 0*Math.PI, endAngle: 2*Math.PI}); 

    moving = !moving;

  }
  
  function checkEdges(x, y){

    var c1 = speed;
    var c2 = pacman.BlockSize.WIDTH - speed;

    return !(position.x <= x + c1 || position.x >= x + c2) && !(position.y <= y + c1 || position.y >= y + c2);

  }

  function move(map){
    
    var directions = [
      {x: position.x - size - 1, y: position.y},
      {x: position.x + size, y: position.y},
      {x: position.x, y: position.y - size - 1},
      {x: position.x, y: position.y + size}
    ];

    if(!map.isWall(directions[newDirection])){

      var tilePosX = Math.floor(position.x / 32) * 32;
      var tilePosY = Math.floor(position.y / 32) * 32;

      if(checkEdges(tilePosX,tilePosY))
        direction = newDirection;

    }
    
    if(!map.isWall(directions[direction])){

      if(direction == pacman.Direction.LEFT)
        position.x -= speed;
      if(direction == pacman.Direction.RIGHT)
        position.x += speed;
      if(direction == pacman.Direction.UP)
        position.y -= speed;
      if(direction == pacman.Direction.DOWN)
        position.y += speed;

    }
    
    if(position.x > 608){
      direction = pacman.Direction.RIGHT;
      position.x = 8;
    }
    else if(position.x < 0){
      direction = pacman.Direction.LEFT;
      position.x = 608;
    }
  
  }

  function setDirection(direction){
    newDirection = direction;
  }

  function getPosition(){
    return position;
  }

  function getSize(){
    return size;
  }

  function setStartPosition(){
    position = {x: startPos.x,y: startPos.y};
  }

  return {
    draw: draw,
    move: move,
    getPosition: getPosition,
    getSize: getSize,
    setDirection: setDirection,
    setStartPosition: setStartPosition
  };

};