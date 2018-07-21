var pacman = pacman || {};

pacman.GhostStatus = Object.freeze({"SEEKER" : 0, "FEARED" : 1});

pacman.Ghost = function(color){

  var speed         = 8;
  var position      = {x: 336, y: 240};

  color             = color || "red";
  var originalColor = color;

  var size          = 16;
  var status        = pacman.GhostStatus.SEEKER;

  var direction     = pacman.Direction.LEFT;
  var newDirection  = pacman.Direction.LEFT;

  function draw(map){

    move(map);
    pacman.graph.drawGhost(position, color);

  }

  function checkEdges(x, y){
    
    var c1 = speed;
    var c2 = pacman.BlockSize.WIDTH - speed;

    return !(position.x <= x + c1 || position.x >= x + c2) && !(position.y <= y + c1 || position.y >= y + c2);

  }

  function move(map) {
    
    var randomDirection;

    var directions = [
      {x: position.x - size - 1, y: position.y},
      {x: position.x + size, y: position.y},
      {x: position.x, y: position.y - size - 1},
      {x: position.x, y: position.y + size}
    ];

    if(direction == pacman.Direction.LEFT || direction == pacman.Direction.RIGHT)
      randomDirection = Math.floor((Math.random() * 2) + 2);
    
    if(direction == pacman.Direction.UP || direction == pacman.Direction.DOWN)
      randomDirection = Math.floor((Math.random() * 2) + 0);
    
    if(map.isWall(directions[direction]))
      randomDirection = Math.floor((Math.random() * 4)+ 0); 
    
    if(!map.isWall(directions[randomDirection])){

      var tilePosX = Math.floor(position.x / 32) * 32;
      var tilePosY = Math.floor(position.y / 32) * 32;

      if(checkEdges(tilePosX,tilePosY)){
        direction = randomDirection;
      }

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

  function setFeared(){

    reverseDirection();
    color  = "white";
    status = pacman.GhostStatus.FEARED;
    
    setTimeout(function(){
      
      reverseDirection();
      
      color = originalColor;
      status = pacman.GhostStatus.SEEKER;

    }, 6000);

  }

  function reverseDirection(){

    if(direction == pacman.Direction.LEFT)
      direction = pacman.Direction.RIGHT;
    else if(direction == pacman.Direction.RIGHT)
      direction = pacman.Direction.LEFT;
    else if(direction == pacman.Direction.UP)
      direction = pacman.Direction.DOWN;
    else
      direction = pacman.Direction.UP;

  }

  function reset(){

    color       = originalColor;
    position    = {x: 336, y: 240};
    status      = pacman.GhostStatus.SEEKER;
    
  }

  function isFeared(){
    return (status == pacman.GhostStatus.FEARED);
  }

  function getPosition(){
    return position;
  }

  return {
    draw: draw,
    getPosition: getPosition,
    setFeared: setFeared,
    isFeared: isFeared,
    reset: reset
  };

};