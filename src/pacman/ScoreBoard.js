var pacman = pacman || {};

pacman.ScoreBoard = function(){

  var modal       = $("<div></div>");
  var playerName  = $("<input type='text' />");

  var nickName    = "";
  var scoreBoard  = [];

  function openScoreBoard(){

    getName();

    modal.dialog({
      resizable:false,
      height: "auto",
      title: "Scores",
      width: 400,
      modal: true,
      draggable: false
    });

  }

  function getName(){

    modal.html("Your name: ");

    playerName.attr("placeholder", "Write your name and press enter");
    playerName.attr("title", "Write your name and press enter");

    playerName.val(nickName);
    modal.append(playerName);

    playerName.on("keyup", function(e){

      nickName = $(this).val();
      scoreBoard[scoreBoard.length-1].player = nickName;

      if(e.key == "Enter"){
        renderScoreBoard();
      }

    });

  }

  function renderScoreBoard(){

    modal.html("");
    var index = 1;

    scoreBoard.forEach(function(score){
      modal.append("<div><b>"+index+". Game</b> - Player: "+score.player+" - Score: "+score.score+"</div>");
      index++;
    });

  }

  function addScore(score){
    scoreBoard.push(score);
  }

  return {
    openScoreBoard: openScoreBoard,
    addScore: addScore,
  };

}();
