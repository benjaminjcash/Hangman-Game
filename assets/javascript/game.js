var Hangman = {
    remainingGuesses : 26,
    score : 0,
    wordBank : ["something", "girl", "help", "because", "michelle", "blackbird", "julia", "birthday", "misery", "chains", "rain", "taxman", "wait", "boys", "yesterday"],
    targetWord : "",
    letterGuessed : "",
    userProgress: [],
    wrongLettersGuessed: [],
    validImputs: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
    audio: [new Audio("assets/audio/something.mp3"), new Audio("assets/audio/girl.mp3"), new Audio("assets/audio/help.mp3"), new Audio("assets/audio/because.mp3"), new Audio("assets/audio/michelle.mp3"),
        new Audio("assets/audio/blackbird.mp3"), new Audio("assets/audio/julia.mp3"), new Audio("assets/audio/birthday.mp3"), new Audio("assets/audio/misery.mp3"), new Audio("assets/audio/chains.mp3"),
        new Audio("assets/audio/rain.mp3"), new Audio("assets/audio/taxman.mp3"), new Audio("assets/audio/wait.mp3"), new Audio("assets/audio/boys.mp3"), new Audio("assets/audio/yesterday.mp3"),
        new Audio ("assets/audio/blisters.wav")],
    //Resets Game
    resetGame : function () {
        Hangman.remainingGuesses = 26;
        Hangman.score = 0;
        Hangman.userProgress = [];
        document.getElementById("usersGuess").innerHTML = "";
        document.getElementById("remainingGuesses").innerHTML = Hangman.remainingGuesses;
        document.getElementById("wrongLetters").innerHTML = "";
        document.getElementById("score"). innerHTML = Hangman.score;
        Hangman.chooseWord();
    },

    //Chooses targetWord.
    //Updates userProgress with all "_"s.
    chooseWord: function() {
        var randomNumber = Math.floor(Math.random()*this.wordBank.length);
        this.targetWord = this.wordBank[randomNumber];
            for (i=0; i <this.targetWord.length; i++){
            this.userProgress.push("_");
            };      
            for (i = 0; i < Hangman.userProgress.length; i++) {
            document.getElementById("usersGuess").innerHTML += " " + Hangman.userProgress[i];
            };
        Hangman.audio[randomNumber].play();     
    }, 

    //Checks if user has already guessed that letter and gives alert if already guessed.
    //Checks if letterGuessed is in each letter of targetWord.
    //Updates userProgress with the letterGuessed in the correct position.
    letterChecker: function () {
        if (Hangman.userProgress.includes(Hangman.letterGuessed) || Hangman.wrongLettersGuessed.includes(Hangman.letterGuessed)) {
            alert("You already guessed that letter!");
            return
        }
        for(i=0; i<Hangman.targetWord.length; i++) {
            if(Hangman.letterGuessed == Hangman.targetWord[i]) {
                Hangman.userProgress[i] = Hangman.letterGuessed;
            }
        }
    },

    //Checks if letterGuessed is in targetWord. If not, decreases ramainingGuesses and writes letter to wrongLettersGuessed
    wordChecker: function () {
        if (!(this.targetWord.includes(this.letterGuessed)) && !(Hangman.wrongLettersGuessed.includes(Hangman.letterGuessed))) {
            this.remainingGuesses--
            document.getElementById("remainingGuesses").innerHTML = Hangman.remainingGuesses;
            Hangman.wrongLettersGuessed.push(this.letterGuessed);
            document.getElementById("wrongLetters").innerHTML = "";
            for (i = 0; i < Hangman.wrongLettersGuessed.length; i++) {
                document.getElementById("wrongLetters").innerHTML += " " + Hangman.wrongLettersGuessed[i] + " ";
            }
        }
    },

    //Displays word onto the screen.
    userGuessDisplayer : function () {
        document.getElementById("usersGuess").innerHTML = "";
        for(i=0; i<Hangman.userProgress.length; i++) {
            document.getElementById("usersGuess").innerHTML += " "+Hangman.userProgress[i];
        }
    },

    //Checks for a win for the round. Stops playing current song.
    roundWinChecker: function () {
        var underScoreIndex = Hangman.userProgress.indexOf("_");
        if (underScoreIndex == -1) {
            Hangman.score++
            Hangman.userProgress = [];
            Hangman.wrongLettersGuessed = [];
            document.getElementById("score").innerHTML = Hangman.score;
            document.getElementById("usersGuess").innerHTML = "";
            document.getElementById("wrongLetters").innerHTML = "";
            var indexOfTargetWord = Hangman.wordBank.indexOf(Hangman.targetWord);
            Hangman.audio[indexOfTargetWord].pause();
            Hangman.chooseWord();
        }
    },

    //Checks for a win for the game, resets game if win.
    gameWinChecker: function () {
        if (Hangman.score == 5) {
            alert("You won!");
            Hangman.audio[15].play();
            alert("Do you want to play again?");
            Hangman.resetGame();
        }
    },

    //Checks for a loss.
    lossChecker: function () {
        if (Hangman.remainingGuesses == 0) {
            alert("You Lose!");
            Hangman.resetGame();
        }
    },

    //Initializes guessing.
    startGuessing: function () {
        document.onkeyup = (function (event) {
            Hangman.letterGuessed = event.key.toLowerCase();
            if (Hangman.validImputs.includes(Hangman.letterGuessed)) {
                Hangman.letterChecker();
                Hangman.wordChecker();
                Hangman.userGuessDisplayer();
                Hangman.roundWinChecker();
                Hangman.lossChecker();
                Hangman.gameWinChecker();
            } else {
                alert("That's an invalid selection!");
            }
        })
    },
}

Hangman.chooseWord();
Hangman.startGuessing();





