// when the user click start game, game should start
// player one will get o and player 2 will get X

let isGameStart = false;
let player1 = "O";
let player2 = "X";
let turn = 1;
const winPattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const startBtn = document.querySelector(".btn");
const boxes = document.querySelectorAll(".box");
const dynamicText = document.querySelector("#dynamicText");

const gameStart = (e) => {
  // as the game starts, all boxes becomes null

  if (isGameStart == false) {
    isGameStart = true; // game starts
    boxes.forEach((box) => {
      box.firstChild.innerText = ""; // resetting
      //unlock all the boxes
      box.setAttribute("isLocked", "false");
    });
    e.target.innerText = "Reset"; // give option to reset now

    // start turn with player 1: change text and turn = 1
    turn = 1;
    dynamicText.innerText = "Turn: Player 1";
  } 
  else {
    // reset button clicked
    isGameStart = false; // game ended
    boxes.forEach((box) => {
      box.firstChild.innerText = "-"; // resetting
      //unlock all the boxes
      box.setAttribute("isLocked", "true");
    });

    e.target.innerText = "Start Game"; // give option to start new game now
    dynamicText.innerText = "Start Game";
  }
};

const changePlayer = () => {
  if (turn == 1) {
    turn = 2;
    dynamicText.innerText = "Turn: Player 2";
    return player1;
  } else {
    turn = 1;
    dynamicText.innerText = "Turn: Player 1"; // turn changed
    return player2;
  }
};

const getBoxVal = (e) => {
  // know if locked
  let isLocked = e.target.getAttribute("isLocked");
  if (isGameStart && isLocked == "false") { // if game is started and item is not locked,
    // change innertext as per turn
    e.target.firstChild.innerText = changePlayer();
    // now lock the box
    e.target.setAttribute("isLocked", "true");


    // check if player won 
    let isWinner = checkWinner();
    if(isWinner)
    {
        // stop the game and announce the winner
        dynamicText.innerText = `${(turn==2)?("Player 1 WON!"):("Player 1 WON!")}`;
        // and lock all boxes
        isGameStart = false; // game ended
    }
    
  
  }
};

const checkIfFilled = () => {
  if (isGameStart) {
    // check if all boxes are locked
    let flag = 0;
    boxes.forEach((box) => {
      let locked = box.getAttribute("isLocked");
      if (locked == "false") flag = 1;
    });
    
    if(flag!=1) {
    //   console.log("Yes filled");
        isGameStart = false;
        dynamicText.innerText = "Game ended, REMATCH BNTA HAI!!"
      // if filled, reset the game
    }
  }
};

const checkWinner = () => {
  // find whose turn it is... if innertext of clicked row and column
  // and the 2 diagonal matches, user wins, announce the winner or cont with game

  let list = [];
  boxes.forEach((box) => {
    list.push(box.firstChild.innerText);
  });
  let tocmp = [];
  if (turn == 1) {
    list.forEach((item, idx) => {
      if (item == player2) tocmp.push(idx);
    });
  } // when turn is 2
  else {
    list.forEach((item, idx) => {
      if (item == player1) tocmp.push(idx);
    });
  }
  // console.log(list, tocmp)

  // check for each pattern in winpattern, and return true if any pattern is included in tocmp
  let isWinner = winPattern.some((pattern) => {
    return pattern.every((val) => tocmp.includes(val));
  });
  //  console.log(isWinner);

  return isWinner;
};


boxes.forEach((box) => {
  box.addEventListener("click", getBoxVal);

  // check if won the game
  // if someone won, announce winner

  // check if game ended
  box.addEventListener("click", checkIfFilled);
});
startBtn.addEventListener("click", gameStart);

// one is not allowed to chnage the already filled box,
// it should be locked once filled in

// keep on checking with every button click if anyone won the game, or all
// boxes are filled
