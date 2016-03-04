"use strict";

// connect websockets
const ws = io.connect();

// websocket subscribers
ws.on('connect', () => {
    console.log('socket connected');
  });

ws.on("receivedPlayerMove", (item) => {
   const gameItem =  game[`${item.item}`];
   game.makeMove(gameItem, true);
});

//---------------- game object
const game = {};

// reference game blocks by number, set as keys on game object, and immediately invoke (IIFE)
(() => {
  for(let i = 0; i < 9; i++){
    game[`number-${i}`] = document.getElementById(`number-${i}`);
  }
})();

//---------------- private keys
game.turnIs = "x";

//---------------- methods

game.makeMove = (item, emitted) => {

  if(game.turnIs === "x"){
      item.setAttribute("class", "col-md-4 x");
      item.innerHTML = "x";
      game.turnIs = "o";
      game.checkWinStatus();
      //if event not emitted over socket, prevents double emit
        if(emitted === false){
          ws.emit('playerMoved',
            { "item": item.getAttribute("id"),
              "class": "col-md-4 x"
            });
        }
  } else{
    item.setAttribute("class", "col-md-4 o");
    item.innerHTML = "o";
    game.turnIs = "x";
    game.checkWinStatus();
    //if event not emitted over socket, prevents double emit
    if(emitted === false){
      ws.emit('playerMoved',
        { "item": item.getAttribute("id"),
          "class": "col-md-4 o"
        });
    }
  }
};

game.checkWinStatus = () => {
  let tieCount = 0;

  // check tie status
  for(let i =0; i < 9; i++){
    if(game[`number-${i}`].getAttribute("class")==="col-md-4 x" || game[`number-${i}`].getAttribute("class")==="col-md-4 o"){
      tieCount +=1;
    }
  }

  if(tieCount === 9){
    game.annouceWinner("It's a tie");
  } else if(
    // check x win status
      // win combination one
      game["number-0"].getAttribute("class")==="col-md-4 x" && game["number-1"].getAttribute("class")==="col-md-4 x" && game["number-2"].getAttribute("class")==="col-md-4 x" ||
      // win combination two
      game["number-0"].getAttribute("class")==="col-md-4 x" && game["number-3"].getAttribute("class")==="col-md-4 x" && game["number-6"].getAttribute("class")==="col-md-4 x" ||
      // win combination three
      game["number-0"].getAttribute("class")==="col-md-4 x" && game["number-4"].getAttribute("class")==="col-md-4 x" && game["number-8"].getAttribute("class")==="col-md-4 x" ||
      // win combination four
      game["number-1"].getAttribute("class")==="col-md-4 x" && game["number-4"].getAttribute("class")==="col-md-4 x" && game["number-7"].getAttribute("class")==="col-md-4 x" ||
      // win combination five
      game["number-2"].getAttribute("class")==="col-md-4 x" && game["number-5"].getAttribute("class")==="col-md-4 x" && game["number-8"].getAttribute("class")==="col-md-4 x" ||
      // win combination six
      game["number-2"].getAttribute("class")==="col-md-4 x" && game["number-4"].getAttribute("class")==="col-md-4 x" && game["number-6"].getAttribute("class")==="col-md-4 x" ||
      // win combination seven
      game["number-3"].getAttribute("class")==="col-md-4 x" && game["number-4"].getAttribute("class")==="col-md-4 x" && game["number-5"].getAttribute("class")==="col-md-4 x" ||
      // win combination eight
      game["number-6"].getAttribute("class")==="col-md-4 x" && game["number-7"].getAttribute("class")==="col-md-4 x" && game["number-8"].getAttribute("class")==="col-md-4 x"
  ){
    // clear tie count
    // announce winner
    game.annouceWinner("x wins");
  } else if(
    // check o win status
      // win combination one
      game["number-0"].getAttribute("class")==="col-md-4 o" && game["number-1"].getAttribute("class")==="col-md-4 o" && game["number-2"].getAttribute("class")==="col-md-4 o" ||
      // win combination two
      game["number-0"].getAttribute("class")==="col-md-4 o" && game["number-3"].getAttribute("class")==="col-md-4 o" && game["number-6"].getAttribute("class")==="col-md-4 o" ||
      // win combination three
      game["number-0"].getAttribute("class")==="col-md-4 o" && game["number-4"].getAttribute("class")==="col-md-4 o" && game["number-8"].getAttribute("class")==="col-md-4 o" ||
      // win combination four
      game["number-1"].getAttribute("class")==="col-md-4 o" && game["number-4"].getAttribute("class")==="col-md-4 o" && game["number-7"].getAttribute("class")==="col-md-4 o" ||
      // win combination five
      game["number-2"].getAttribute("class")==="col-md-4 o" && game["number-5"].getAttribute("class")==="col-md-4 o" && game["number-8"].getAttribute("class")==="col-md-4 o" ||
      // win combination six
      game["number-2"].getAttribute("class")==="col-md-4 o" && game["number-4"].getAttribute("class")==="col-md-4 o" && game["number-6"].getAttribute("class")==="col-md-4 o" ||
      // win combination seven
      game["number-3"].getAttribute("class")==="col-md-4 o" && game["number-4"].getAttribute("class")==="col-md-4 o" && game["number-5"].getAttribute("class")==="col-md-4 o" ||
      // win combination eight
      game["number-6"].getAttribute("class")==="col-md-4 o" && game["number-7"].getAttribute("class")==="col-md-4 o" && game["number-8"].getAttribute("class")==="col-md-4 o"
  ){
    game.annouceWinner("o wins");
  }

  // set tie count to 0
  tieCount = 0;

};

// alerts winner and clears board
game.annouceWinner = (winMsg) => {
  // alert message message
  alert(winMsg);

  // clear board
    //loop through game squares, clear x and o content, and remove x and o classes
    for(let i =0; i < 9; i++){
      game[`number-${i}`].innerHTML = "";
      game[`number-${i}`].setAttribute("class", "col-md-4");
    }

};


//----------------- attach event listeners to each button in game
// get row divs
const gameButtons = document.getElementsByClassName("row");
// convert collection to array and iterate over each
Array.from(gameButtons).map((item, index)=>{
  // convert collection to array and attach event listener
  Array.from(item.getElementsByTagName("button")).map((innerItem, innerIndex) => {
    // this will be one of the nine buttons, attach event listener to each
    innerItem.addEventListener("click", () => {
      // if player has already moved in block, alert user
      if(innerItem.getAttribute("class")=== "col-md-4 o" || innerItem.getAttribute("class")=== "col-md-4 x" ){
        alert("You Can't Move here!");
      // else move on square
      } else {
        // check whose turn it is, add corresponding class, and switch turn to other player
        game.makeMove(innerItem, false);
      }
    });
  });
});
