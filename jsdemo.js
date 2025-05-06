let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset"); // for Reset button
let newBtn = document.querySelector("#new-btn"); // for New Game button inside message
let messageContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;

let winningCombinations = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

// Game logic
const checkWinner = () => {
    for (let pattern of winningCombinations) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {

              // Highlight winning boxes
              boxes[pattern[0]].classList.add("winner");
              boxes[pattern[1]].classList.add("winner");
              boxes[pattern[2]].classList.add("winner");
  
            showWinner(pos1);
            return;
        }
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, winner is ${winner}`;
    messageContainer.classList.remove("hide");
    disableBoxes();
};

const disableBoxes = () => {
    boxes.forEach((box) => box.disabled = true);
};

const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    });
};

const resetGame = () => {
    turnO = true;
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("winner"); // 💡 remove winner class
    });
    messageContainer.classList.add("hide");
};


// Click logic for boxes
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        checkWinner();
    });
});

// Button event listeners
resetBtn.addEventListener("click", resetGame);
newBtn.addEventListener("click", resetGame);
