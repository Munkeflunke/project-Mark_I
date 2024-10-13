// Globale variabler og værdier
// Sætter en global RNG1 (Random Number Generator 1) til en tilfældig værdi mellem 1 og 20
let RNG1 = Math.floor(Math.random() * 20) + 1;
// Sætter en score med startværdi 0
let elementScore = 0;
// Sætter en highscore, der starter på et højt tal, så den altid kan slås
let elementHighsScore = 999;
// Initialiserer en global variabel til timeren, så den kan bruges flere steder
let time = null;
// Sætter timeren til at starte på 0 sekunder
let timeSeconds = 0;
// Sætter den hurtigste tid til et højt tal, så den kan slås
let fastestTime = 999;
// queryselectors  i "rigtig" rækkefølge"
//Guides fra https://codedamn.com/news/javascript/how-to-select-and-manipulate-dom-elements-in-javascript#what_is_the_document_object_model_dom
// Vælger 'Again' knappen fra DOM
const buttonAgain = document.querySelector("button.btn.again");

// Vælger class elementet, der viser det tilfældige tal
const rngNumber = document.querySelector(".number");

// Vælger 'Check' knappen
const checkGuess = document.querySelector(".btn.check");

// Vælger inputfeltet for brugerens gæt
const userGuess = document.querySelector(".guess");

// Vælger class elementet til feedback beskeder
const message = document.querySelector(".message");

// Vælger class elementet til at vise scoren
const userScore = document.querySelector(".label-score");

// Vælger class elementet til at vise highscoren
const userHighScore = document.querySelector(".label-highscore");

// Vælger timerens display class elementet
const timer = document.querySelector(".timer");

// Vælger rekordtimerens display class elementet
const recordTimer = document.querySelector(".recordTimer");

// Vælger listen over tidligere gæt
const getHistory = document.querySelector(".historyList");

// Vælger lydelementet for forkerte gæt på class
const wrongAudio = document.querySelector('.wrongAudio');

// Vælger lydelementet for korrekte gæt på class
const correctAudio = document.querySelector('.correctAudio');

// Vælger lydelementet for næsten korrekte gæt på class
const closeAudio = document.querySelector('.closeAudio');


console.log(`Det tilfældige tal er: ${RNG1}`);


// Timer funktionen/hjulet

// Funktion til at opdatere timeren hvert sekund/inkrimentere
const timeLoop = function() {
    // Inkrementerer timeSeconds med 1 hvert sekund
    timeSeconds += 1;
    // Opdaterer timerens visning
    updateTimerDisplay();
};

// Funktion til at starte timeren
const startTimer = function() {
    // Sikrer, at der ikke allerede kører en timer
    if (time === null) {
        // Starter timeLoop, som kører hvert sekund
        time = setInterval(timeLoop, 1000);
    }
};
//brug af arrays fx som logoer https://www.w3schools.com/js/js_arrays.asp
// Funktion til at opdatere timerens visning
const logo = (timeSeconds % 2 === 0) ? '⏳' : '⌛';
// array af loger
const updateTimerDisplay = function() {
    // Vælg ikon ('⏳' hvis timeSeconds er lige, '⌛' hvis timeSeconds er ulige)
    let logo;
    if (timeSeconds % 2 === 0) {logo = '⏳';} else {logo = '⌛'; // så hvert sekund skifter den mellem vores logoer i arrayet
    }
    // Opdaterer timerens tekstindhold med ikonet og den aktuelle tid
    timer.textContent = `${logo} Current time: ${timeSeconds}sec`;
};

// Funktion til at opdatere rekordtiden
const updateRecordTimer = function() {
    // Opdaterer fastestTime med den aktuelle timeSeconds
    fastestTime = timeSeconds;
    // Opdaterer rekordtimerens tekstindhold
    recordTimer.textContent = `🏆 Current time: ${timeSeconds}sec`;
};

// Funktion til at stoppe timeren
const stopTime = function() {
    // Stopper intervallet
    clearInterval(time);
    // Nulstiller time variablen
    time = null;
    // Opdaterer timerens tekstindhold
    timer.textContent = `⏳ Current time: ${timeSeconds}sec`;
};

// **Spilfunktioner**

// Funktion til at generere en ny RNG1 og nulstille spillet
const getRNG1 = function() {
    // Genererer et nyt tilfældigt tal til RNG1
    RNG1 = Math.floor(Math.random() * 20) + 1;
    // Logger det nye tilfældige tal for testformål
    console.log("Nyt tilfældigt tal (RNG1):", RNG1);
    // Sætter displaytallet tilbage til '?'
    rngNumber.textContent = "?";
    // Nulstiller tekstfarven til sort
    rngNumber.style.textContent = "black";
    // Sætter baggrundsfarven tilbage til grå
    rngNumber.style.backgroundColor = "#eee";
    // Nulstiller scoren til 0
    elementScore = 0;
    // Opdaterer scorevisningen
    userScore.textContent = "💯 Tries: " + elementScore;
    // Nulstiller tiden til 0
    timeSeconds = 0;
    // Tømmer brugerens gæt inputfelt
    userGuess.value = "";
    // Starter timeren igen
    startTimer();
};

// Tilføjer event listener til 'Again' knappen for at nulstille spillet
buttonAgain.addEventListener("click", getRNG1);

// **Funktioner der håndterer gæt udfald**

// Funktion når gættet er for lavt
const tooLow = function() {
    // Henter brugerens gæt
    const userGuessValue = userGuess.value;
    // Viser besked om, at gættet er for lavt
    message.textContent = "The number " + userGuessValue + " is too low";
    // Viser brugerens gæt på skærmen
    rngNumber.textContent = userGuessValue;
    // Øger scoren med 1
    elementScore = elementScore + 1;
    // Logger den aktuelle score
    console.log("Nuværende score:", elementScore);
    // Ændrer baggrundsfarven til rød
    rngNumber.style.backgroundColor = "red";
    // Opdaterer scorevisningen
    userScore.textContent = "💯 Tries: " + elementScore;
    // Afspiller lyden for forkert gæt
    wrongAudio.play();
    // Returnerer den opdaterede score
    return elementScore;
};

// Funktion når gættet er for højt
const tooHigh = function() {
    // Henter brugerens gæt
    const userGuessValue = userGuess.value;
    // Viser besked om, at gættet er for højt
    message.textContent = "The number " + userGuessValue + " is too high";
    // Øger scoren med 1
    elementScore = elementScore + 1;
    // Logger den aktuelle score
    console.log("Nuværende score:", elementScore);
    // Viser brugerens gæt på skærmen
    rngNumber.textContent = userGuessValue;
    // Ændrer baggrundsfarven til rød
    rngNumber.style.backgroundColor = "red";
    // Opdaterer scorevisningen
    userScore.textContent = "💯 Tries: " + elementScore;
    // Afspiller lyden for forkert gæt
    wrongAudio.play();
    // Returnerer den opdaterede score
    return elementScore;
};

// Funktion når gættet er korrekt
const correctGuess = function() {
    // Henter brugerens gæt
    const userGuessValue = userGuess.value;
    // Viser besked om, at gættet er korrekt
    message.textContent = "The number " + userGuessValue + " is correct";
    // Viser brugerens gæt på skærmen
    rngNumber.textContent = userGuessValue;
    // Ændrer baggrundsfarven til grøn
    rngNumber.style.backgroundColor = "green";
    // Afspiller lyden for korrekt gæt
    correctAudio.play();
    // Opdaterer rekordtiden, hvis det er den hurtigste
    if (fastestTime > timeSeconds)
        updateRecordTimer();
    // Opdaterer highscore, hvis scoren er bedre
    if (elementHighsScore > elementScore)
        updateHighscore();
    // Stopper timeren
    stopTime();
};

// Funktion når gættet er forkert men gyldigt
const wrongGuess = function() {
    // Henter brugerens gæt
    const userGuessValue = userGuess.value;
    // Viser besked om, at gættet er forkert
    message.textContent = "The number " + userGuessValue + " is not correct";
    // Øger scoren med 1
    elementScore = elementScore + 1;
    // Viser brugerens gæt på skærmen
    rngNumber.textContent = userGuessValue;
    // Logger den aktuelle score
    console.log("Nuværende score:", elementScore);
    // Ændrer baggrundsfarven til rød
    rngNumber.style.backgroundColor = "red";
    // Opdaterer scorevisningen
    userScore.textContent = "💯 Tries: " + elementScore;
    // Afspiller lyden for forkert gæt
    wrongAudio.play();
    // Returnerer den opdaterede score
    return elementScore;
};

// Funktion når gættet er tæt på det korrekte tal
const closeGuess = function() {
    // Henter brugerens gæt
    const userGuessValue = userGuess.value;
    // Viser besked om, at gættet er tæt på
    message.textContent = "The number " + userGuessValue + " is close but not correct";
    rngNumber.textContent = userGuessValue;
    // Øger scoren med 1
    elementScore = elementScore + 1;
    // Ændrer baggrundsfarven til gul
    rngNumber.style.backgroundColor = "yellow";
    // Opdaterer scorevisningen
    userScore.textContent = `💯 Tries: ${elementScore}`;
    // Afspiller lyden for tæt gæt
    closeAudio.play();
};

// Funktion til at opdatere highscore
const updateHighscore = function() {
    // Opdaterer elementHighsScore med den aktuelle score
    elementHighsScore = elementScore;
    // Opdaterer highscorevisningen
    userHighScore.textContent = "🥇 Fewest tries " + elementHighsScore;
};
// **Gæt Historik Funktioner**

// Array til at gemme brugerens gæt
let guessHistory = [];

// Henter historiklisten fra DOM'en
const historyList = getHistory;

// Maksimum antal gæt, vi tillader i historikken
const maxGuesses = 5;

// Funktion til at opdatere historikken med brugerens gæt
const updateHistory = function() {
    // Henter brugerens aktuelle gæt og tilføjer det til historikken
    const userGuessValue = userGuess.value;
    guessHistory.push(userGuessValue);

    // Opretter et nyt 'li' element for hvert gæt
    const listItem = document.createElement('li');
    listItem.textContent = `Guess: ${userGuessValue}`;

    // Tjekker om der allerede er et første element i listen
    if (historyList.firstElementChild) {
        // Indsætter elementet i toppen af listen
        historyList.insertBefore(listItem, historyList.firstElementChild);
    } else {
        // Hvis listen er tom, tilføjes elementet i bunden
        historyList.appendChild(listItem);
    }

    // Fjerner det ældste gæt, hvis der er flere end det maksimale antal tilladte gæt
    if (guessHistory.length > maxGuesses) {
        guessHistory.shift();
        historyList.removeChild(historyList.lastElementChild);
    }
};
// Funktion til at tjekke om gættet er tæt på RNG1
const checkCloseGuess = function(userGuessValue, RNG1) {
    // Returnerer true, hvis forskellen er mindre eller lig med 5 og gættet er positivt
    return Math.abs(userGuessValue - RNG1) <= 5 && userGuessValue > 0;
};

// **Funktion til at tjekke brugerens gæt**
const guessCheck1 = function() {
    // Logger antallet af gange der er gættet
    console.log("Gættet antal gange:", elementScore);
    // Konverterer brugerens gæt til et tal
    const userGuessValue = Number(userGuess.value);
    // Tjekker om gættet er for højt
    if (userGuessValue > 20) {
        // Kalder funktionen tooHigh
        tooHigh();
        // Logger det tilfældige tal
        console.log("Tilfældige tal (RNG1):", RNG1);
        // Opdaterer gæt historikken
        updateHistory(userGuessValue);
        // Tjekker om gættet er for lavt
    } else if (userGuessValue <= 0) {
        // Kalder funktionen tooLow
        tooLow();
        // Logger det tilfældige tal
        console.log("Tilfældige tal (RNG1):", RNG1);
        // Opdaterer gæt historikken
        updateHistory(userGuessValue);
        // Tjekker om gættet er korrekt
    } else if (userGuessValue === RNG1) {
        // Kalder funktionen correctGuess
        correctGuess();
        // Logger det tilfældige tal
        console.log("Tilfældige tal (RNG1):", RNG1);
        // Tjekker om gættet er tæt på
    } else if (checkCloseGuess(userGuessValue, RNG1)) {
        // Kalder funktionen closeGuess
        closeGuess();
        // Logger det tilfældige tal
        console.log("Tilfældige tal (RNG1):", RNG1);
        // Opdaterer gæt historikken
        updateHistory(userGuessValue);
        // Hvis gættet er forkert
    } else {
        // Kalder funktionen wrongGuess
        wrongGuess();
        // Logger det tilfældige tal
        console.log("Tilfældige tal (RNG1):", RNG1);
        // Opdaterer gæt historikken
        updateHistory(userGuessValue);
    }
};

// Tilføjer event listener til 'Check' knappen for at udføre guessCheck1 funktionen ved klik
checkGuess.addEventListener("click", guessCheck1);

// Starter timeren når 'Check' knappen klikkes
checkGuess.addEventListener("click", startTimer());

// Tilføjer event listener for at tillade brugeren at trykke 'Enter' for at indsende deres gæt
document.addEventListener('keyup', function(event) {
    // Tjekker om den trykkede tast er 'Enter'
    if (event.code === 'Enter') {
        // Kalder funktionen guessCheck1
        guessCheck1();
    }
});

//brugte inspirationer
console.log(" JavaScript commandlist her: https://cheatsheets-js.com/");
console.log("If/else  functions: https://cheatsheets-js.com/#if-else-switch");
console.log("Html manipulation: https://frontendmasters.com/blog/patterns-for-memory-efficient-dom-manipulation/");
console.log("queries: https://textual.textualize.io/guide/queries/");
console.log("Timer/interval: https://cheatsheets-js.com/#setTimeout-setInterval");
console.log("String manipulation i JavaScript: https://cheatsheets-js.com/#strings");
console.log("Emoji list https://getemoji.com/")
console.log("Events: https://slingacademy.com/article/the-modern-javascript-dom-cheat-sheet/#event-handling");
