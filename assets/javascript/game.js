var wordBank = ["hey jude", "let it be", "something",]

function hangman() {
    var randomnumber = Math.floor(Math.random()*wordBank.length);
    var chosenWord = wordBank[randomnumber];

    console.log(chosenWord);
    
    // Takes random chosen word, and displays the "ghost-spaces" on the screen.

    for (i = 0; i < chosenWord.length; i++) {

        var selectedLetter = chosenWord.charAt(i); 
        
        if (selectedLetter === " ") {
            var newDiv = document.createElement("div");
            newDiv.setAttribute("data", selectedLetter);
            newDiv.setAttribute("id", i)
            newDiv.className = "spacespaces";
            var wordcontainer = document.getElementById("wordcontainer");
            wordcontainer.appendChild(newDiv);   
        } else {
            var newDiv = document.createElement("div");
            newDiv.setAttribute("data", selectedLetter);
            newDiv.setAttribute("id", i)
            newDiv.className = "letterspaces";
            var wordcontainer = document.getElementById("wordcontainer");
            wordcontainer.appendChild(newDiv); 
        }     
    };

    document.onkeyup = function (event) {
        var letterPressed = event.key;        
        // var letterCheck = chosenWord.includes(letterPressed);
        console.log(letterPressed);
        
            for (i=0; i < chosenWord.length; i++) {
                var letterValue = document.getElementById(i).getAttribute("data");
                    if (letterValue === letterPressed) {
                        document.getElementById(i).innerHTML = letterPressed;
                    }
            }
    }

};

hangman();
