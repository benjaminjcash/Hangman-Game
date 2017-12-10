var Hangman = {
    remainingGuesses : 10,
    score : 0,
    wordBank : ["help", "girl", "something"],
    targetWord : "",
    letterGuessed : "",
    userProgress: [],
    wrongLettersGuessed: [],

    //Resets Game
    resetGame : function () {
        Hangman.remainingGuesses = 10;
        Hangman.score = 0;
        Hangman.userProgress = [];
        document.getElementById("usersGuess").innerHTML = "";
        document.getElementById("remainingGuesses").innerHTML = Hangman.remainingGuesses;
        document.getElementById("wrongLetters").innerHTML = "";
        Hangman.chooseWord();
    },

    //Chooses targetWord.
    //Updates userProgress with all "_"s.
    chooseWord: function() {
        var randomNumber = Math.floor(Math.random()*this.wordBank.length);
        this.targetWord = this.wordBank[randomNumber];
        console.log(this.targetWord);
        for (i=0; i <this.targetWord.length; i++){
            this.userProgress.push("_");
        }
        for (i = 0; i < Hangman.userProgress.length; i++) {
            document.getElementById("usersGuess").innerHTML += " " + Hangman.userProgress[i];
        }
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

    //Checks for a win.
    winChecker: function () {
        var underScoreIndex = Hangman.userProgress.indexOf("_");
        if (underScoreIndex == -1) {
             alert("you won!");
             Hangman.score++
             document.getElementById("score").innerHTML = Hangman.score;
             document.getElementById("usersGuess").innerHTML = "";
             Hangman.userProgress = [];
             Hangman.chooseWord();
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
            if (Hangman.letterGuessed)
            Hangman.letterChecker();
            Hangman.wordChecker();
            Hangman.userGuessDisplayer();
            Hangman.winChecker();
            Hangman.lossChecker();
        })
    },

    

}

Hangman.chooseWord();
Hangman.startGuessing();



