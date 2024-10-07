console.log(document);

const RNG1 = Math.floor(Math.random() * 100) + 1;

const buttonAgain = document.querySelectorAll(".btn.again");

console.log(buttonAgain)
/*/
1. again button is a reset
2. between 1-20 needs to be true for the guess
3.input bar needs to be shown/checked for relevance to(nr)
4. get a random nr that needs to be guessed
5. add score if random nr=guessed nr
6. change highscore if its > than score
7. add a history of answers, last 3 answers, when more than 3 answers delete the last answer,
8. Maybe add a "suggested nr"
9. add sound triggers for button clicks
10.

1.
add event listener buttonagain click "href to website"
    a refresh, maybe a poossible solution is to delete all(data)
2.
limit input (1-20), if input > (1-20)
    error number is too big, if >input error message is too small
3. check input if input = randomnr
    4. mathfloor randomnr that is a randomnr whenever that you have pressed button, os that its a new number everytime
add a total of 3 guesses for each nr before it(dissaperas)
5.
if nr not correct score=+1, if score is correct and score <highscore = set score new high score
also if correct nr is called change ? to correct nr
6.
innertext write guess 1, guess 2, guess 3, if guesses > more than 3, move guess down list and remove "first" guess(" and move 2 to 1 and 3 to 2 to make room for new guess)
7. add a suggested nr that has a untold relevance to the randomnr, like my its half of the number or maybe its 1/4 or maybe its *2 something like that, at random
8. play soundseffecs if true or false guess, display animation if correct answer
/*/





const alerts = document.querySelector("#alertBtn");

const alertfunction = function()  {
    alert("thanks for visiting bikes for refugees")
};


const addTextFunction = function() {
    addText.innerText += " Add some text"
};

