var pacman = pacman || {};

pacman.BlockType = Object.freeze({"EMPTY": 0, "BLOCK": 1, "BISCUIT": 2, "PILL": 3, "FRUIT": 4});

pacman.Map = function(){

  var mapData = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 3, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 3, 1],
      [1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1],
      [1, 2, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1, 2, 1],
      [1, 2, 2, 2, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 2, 2, 2, 1],
      [1, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 1],
      [1, 2, 1, 2, 1, 2, 1, 1, 1, 0, 1, 1, 1, 2, 1, 2, 1, 2, 1],
      [1, 2, 1, 2, 1, 2, 1, 0, 0, 0, 0, 0, 1, 2, 1, 2, 1, 2, 1],
      [0, 0, 2, 2, 2, 2, 1, 1, 1, 0, 1, 1, 1, 2, 2, 2, 2, 0, 0],
      [1, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 1],
      [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1],
      [1, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 1],
      [1, 2, 2, 2, 1, 1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 2, 2, 2, 1],
      [1, 2, 1, 2, 2, 2, 2, 1, 2, 1, 2, 1, 2, 2, 2, 2, 1, 2, 1],
      [1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1],
      [1, 3, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 3, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];
  
  var eatables = 0;

  function draw(){
      
      eatables = 0;

      for(var y = 0; y < pacman.MapSize.Y; y++){
        for(var x = 0; x < pacman.MapSize.X; x++){

          var tile = mapData[y][x];
          var pos = { x: (x * pacman.BlockSize.WIDTH)  + (pacman.BlockSize.WIDTH / 2), 
                      y: (y * pacman.BlockSize.HEIGHT) + (pacman.BlockSize.HEIGHT / 2) };
         
          if(tile == pacman.BlockType.BLOCK)
            pacman.graph.drawBlock({x: x * pacman.BlockSize.WIDTH, y: y * pacman.BlockSize.HEIGHT}, 'blue');

          if(tile == pacman.BlockType.BISCUIT){
            eatables++;
            pacman.graph.drawBiscuit(pos);
          }

          if(tile == pacman.BlockType.PILL){
            eatables++;
            pacman.graph.drawPill(pos);
          }

          if(tile == pacman.BlockType.FRUIT){
            eatables++;
            pacman.graph.drawFruit(pos);
          }

        }
      }

  }
  
  function getTileByPosition(position){
    
    var x = Math.floor(position.x / pacman.BlockSize.WIDTH);
    var y = Math.floor(position.y / pacman.BlockSize.HEIGHT);

    return {
      x: x * pacman.BlockSize.WIDTH,
      y: y * pacman.BlockSize.HEIGHT,
      mapX: x,
      mapY: y,
      type: mapData[y][x]
    };

  }
  
  function isWall(position){

    var x = Math.floor(position.x / pacman.BlockSize.WIDTH);
    var y = Math.floor(position.y / pacman.BlockSize.HEIGHT);

    return (mapData[y][x] == 1) ? true : false;

  }

  function clearTile(tile){
    mapData[tile.mapY][tile.mapX] = 0;
  }

  function getTileByIndex(x,y){
    return mapData[y][x];
  }

  function haveEatables(){
    return eatables > 0;
  }
  
  function init(){

    var getRandomPos = function(){

      var randomX = Math.floor((Math.random() * pacman.MapSize.X) + 0);
      var randomY = Math.floor((Math.random() * pacman.MapSize.Y) + 0);

      return {x: randomX, y: randomY};

    };

    var randomPos = getRandomPos();

    while(mapData[randomPos.y][randomPos.x] != pacman.BlockType.BISCUIT){
      randomPos = getRandomPos();
    }

    mapData[randomPos.y][randomPos.x] = pacman.BlockType.FRUIT;

  }

  init();

  return {
    draw: draw,
    getTileByPosition: getTileByPosition,
    getTileByIndex: getTileByIndex,
    clearTile: clearTile,
    haveEatables: haveEatables,
    isWall: isWall
  };
  
};