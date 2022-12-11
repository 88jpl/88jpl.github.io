var app = new Vue({
    el: "#app",
    data: {
        prompt: "What is the Big-O of",
        message: "Incorrect, try again.",
        // messageColor: "",
        // answerReady: true,
        // gradient: "",
        highStreak: 0,
        streak: 0,
        // messageBank: [
        //     "Yes",
        //     "No",
        //     "Maybe",
        //     "Ask Again Tomorrow",
        //     "Probably",
        //     "Probably Not"
        // ],
        questionBank: [
            ["Quicksort", 3],
            ["Mergesort", 3],
            ["Factoring", 8],
            ["T.O.H.", 6],
            ["Multiplying Matrices", 5],
            // ["Max Sub Sequence", 4],
            ["Bubblesort", 4],
            ["Adding Matricies", 4],
            ["Multiplying", 4],
            ["Linear Search", 2],
            ["Countingsort", 2],
            ["Adding", 2],
            ["Bucketsort", 2],
            ["Travelling Salesmen", 7],
            ["Hash Table (Insert/Delete/Retrieve)", 1],
            ["Balanced Binary Search(BST)", 0],
            ["Degraded Binary Search(BST)", 2],
            ["Linked List", 2],
            ["Python List", 2],
            ["2-3 Tree", 0]
        ],
        answerPool: [
            "log(2)n", 
            "1",
            "n",
            "n log(n)",
            "n^2",
            "n^3",
            "2^n",
            "n!",
            "10^(n/2)"
        ],
        options: [-1,-1,-1,-1],
        question: "",
        correctAnswer: "",
        passing: false,
        questionIndex: -1,
        incorrect: false
    },
    methods: {
        // askQuestion: function () {
        //     if (!this.isValidQuestion()) {return;}

        //     let nextIndex = Math.floor(Math.random() * this.messageBank.length);
        //     let nextResponse = this.messageBank[nextIndex];
        //     this.message = "";
        //     this.answerReady = false;
        //     this.messageColor = "rgba(255,255,255,0)";
        //     this.message = nextResponse;
        //     this.prompt = "Ask another question";
        //     this.question = "";
        // },
        // isValidQuestion: function () {
        //     return this.question[this.question.length-1] == "?";
        // },
        displayNextQuestion: function () {
            this.question = "";
            let nextIndex = Math.floor(Math.random() * this.questionBank.length);
            this.questionIndex = nextIndex;
            let nextResponse = this.questionBank[nextIndex];
            this.question = nextResponse[0];
            this.loadOptions();

        },
        checkAnswer: function (index) {
            let value = this.options[index];
            if (value == this.questionBank[this.questionIndex][1]) {
                this.incorrect = false;
                console.log("Correct");
                this.displayNextQuestion();
                this.streak += 1;
                if (this.streak > this.highStreak) {
                    this.highStreak = this.streak;
                }
                return true;
            } else {
                console.log("Incorrect");
                this.incorrect = true;
                this.streak = 0;
                return false;
            }
        },
        loadOptions: function () {
            this.options = [-1,-1,-1,-1];
            let answerSpot = Math.floor(Math.random() * 4);
            this.options[answerSpot] = this.questionBank[this.questionIndex][1];
            for (i = 0; i < 4; i++) {
                if (this.options[i] == -1) {
                    this.options[i] = this.randomAnswer();
                }
            }
        },
        randomAnswer: function () {
            let randomNumber = Math.floor(Math.random() * 8);
            if (randomNumber == this.options[0] || randomNumber == this.options[1] || randomNumber == this.options[2] || randomNumber == this.options[3]) {
                return this.randomAnswer();
            } else {
                console.log(randomNumber);
                return randomNumber;
            }
        }
    },
    created: function() {
        this.displayNextQuestion();
    }
});