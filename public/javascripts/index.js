"use strict";

//---------------- game object
const game = {};

// reference game blocks by number and immediately invoke (IIFE)
(() => {
  for(let i = 0; i < 9; i++){
    game[`number-${i}`] = document.getElementById(`number-${i}`);
  }
})();

//---------------- private keys
game.turnIs = "x";

//---------------- methods

game.makeMove = (item) => {
  game.turnIs === "x" ? (item.setAttribute("class", "col-md-4 x"), item.innerHTML = "x", game.turnIs = "o", game.checkWinStatus()) : (item.setAttribute("class", "col-md-4 o"), item.innerHTML = "o", game.turnIs = "x", game.checkWinStatus());
};

game.checkWinStatus = () => {
  if(
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
    console.log("x wins");
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
    console.log("o wins");
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
      // check whose turn it is, add corresponding class, and switch turn to other player
      game.makeMove(innerItem);
    });
  });
});
