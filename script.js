console.log("welcome to tic tac toe")

let music = new Audio("music.mp3")
let audioTurn = new Audio("ting.mp3")
let gameover = new Audio("gameover.wav")
let turn = "X"
let gameOver = false;

const changeTurn = () => {
    return turn === "X" ? "0" : "X"
}

// function to check for win
const checkWin = () => {
    const boxes = document.querySelectorAll(".box");
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    winPatterns.forEach(pattern => {
        const [a, b, c] = pattern;

        const valA = boxes[a].querySelector(".boxtext").innerText;
        const valB = boxes[b].querySelector(".boxtext").innerText;
        const valC = boxes[c].querySelector(".boxtext").innerText;

        if (valA && valA === valB && valB === valC) {
            document.querySelector('.info').innerText = valA + " Won";
            gameOver = true;
            gameover.play();
            document.querySelector('.imgbox img').style.width = "200px";

            // Draw dynamic line
            const rect1 = boxes[a].getBoundingClientRect();
            const rect3 = boxes[c].getBoundingClientRect();
            const containerRect = document.querySelector('.container').getBoundingClientRect();

            const x1 = rect1.left + rect1.width / 2 - containerRect.left;
            const y1 = rect1.top + rect1.height / 2 - containerRect.top;
            const x2 = rect3.left + rect3.width / 2 - containerRect.left;
            const y2 = rect3.top + rect3.height / 2 - containerRect.top;

            const length = Math.hypot(x2 - x1, y2 - y1);
            const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

            const line = document.querySelector('.line');
            line.style.width = `${length}px`;
            line.style.transform = `translate(${x1}px, ${y1}px) rotate(${angle}deg)`;
        }
    });
};

// function to check draw 
const checkDraw = ()=>{
    let boxtext = document.getElementsByClassName('boxtext');
    let filled = true;
    Array.from(boxtext).forEach(box =>{
        if(box.innerText === ""){
            filled = false;
        }
    });
    if (filled && !gameOver){
        document.querySelector('.info').innerText = "Match Draw ";
        gameOver = true;
        gameover.play()
    }

}



// Game Logic
music.volume = 0.22;
// music.play()
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector(".boxtext");
    element.addEventListener('click', () => {
        if (boxtext.innerText === '' && !gameOver) {
            boxtext.innerText = turn;
            turn = changeTurn();
            audioTurn.play();
            checkDraw();
            checkWin();
            if (!gameOver) {
                document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
            }
        }
    })
})

// Add event listener on reset

reset.addEventListener('click', () => {
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = ""
    });
    turn = "X"
    gameOver = false;
        document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
        document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0"
        document.querySelector('.line').style.width = "0";
})