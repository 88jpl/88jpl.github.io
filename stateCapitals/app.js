var app = new Vue({
    el: "#app",
    data: {
        prompt: "What is the State Capital of",
        message: "Incorrect, try again.",
        highStreak: 0,
        streak: 0,
        questionBank: [
            ["Alabama","Montgomery"],
            ["Alaska","Juneau"],
            ["Arizona","Phoenix"],
            ["Arkansas","Little Rock"],
            ["California","Sacramento"],
            ["Colorado","Denver"],
            ["Connecticut","Hartford"],
            ["Delaware","Dover"],
            ["Florida","Tallahassee"],
            ["Georgia","Atlanta"],
            ["Hawaii","Honolulu"],
            ["Idaho","Boise"],
            ["Illinois","Springfield"],
            ["Indiana","Indianapolis"],
            ["Iowa","Des Moines"],
            ["Kansas","Topeka"],
            ["Kentucky","Frankfort"],
            ["Louisiana","Baton Rouge"],
            ["Maine","Augusta"],
            ["Maryland","Annapolis"],
            ["Massachusetts","Boston"],
            ["Michigan","Lansing"],
            ["Minnesota","Saint Paul"],
            ["Mississippi","Jackson"],
            ["Missouri","Jefferson City"],
            ["Montana","Helena"],
            ["Nebraska","Lincoln"],
            ["Nevada","Carson City"],
            ["New Hampshire","Concord"],
            ["New Jersey","Trenton"],
            ["New Mexico","Santa Fe"],
            ["New York","Albany"],
            ["North Carolina","Raleigh"],
            ["North Dakota","Bismarck"],
            ["Ohio","Columbus"],
            ["Oklahoma","Oklahoma City"],
            ["Oregon","Salem"],
            ["Pennsylvania","Harrisburg"],
            ["Rhode Island","Providence"],
            ["South Carolina","Columbia"],
            ["South Dakota","Pierre"],
            ["Tennessee","Nashville"],
            ["Texas","Austin"],
            ["Utah","Salt Lake City"],
            ["Vermont","Montpelier"],
            ["Virginia","Richmond"],
            ["Washington","Olympia"],
            ["West Virginia","Charleston"],
            ["Wisconsin","Madison"],
            ["Wyoming","Cheyenne"]
        ],
        answerPool: [
            ["Alabama","Huntsville","Birmingham","Mobile","Tuscaloosa"],
            ["Alaska","Anchorage","Fairbanks","Wasilla","Sitka"],
            ["Arizona","Tucson","Mesa","Chandler","Scottsdale"],
            ["Arkansas","Fayetteville","Fort Smith","Springdale","Jonesboro"],
            ["California","Los Angeles","San Diego","San Jose","San Francisco"],
            ["Colorado","Colorado Springs","Aurora","Fort Collins","Lakewood"],
            ["Connecticut","Bridgeport","Stamford","New Haven","Waterbury"],
            ["Delaware","Wilmington","Newark","Middletown","Smyrna"],
            ["Florida","Jacksonville","Miami","Tampa","Orlando"],
            ["Georgia","Columbus","Augusta","Macon","Savannah"],
            ["Hawaii","East Honolulu","Pearl City","Hilo","Kailua"],
            ["Idaho","Meridian","Nampa","Idaho Falls","Caldwell"],
            ["Illinois","Chicago","Aurora","Naperville","Joliet"],
            ["Indiana","Fort Wayne","Evansville","South Bend","Carmel"],
            ["Iowa","Cedar Rapids","Davenport","Sioux City","Iowa City"],
            ["Kansas","Wichita","Overland Park","Kansas City","Olathe"],
            ["Kentucky","Louisville","Lexington","Bowling Green","Owensboro"],
            ["Louisiana","New Orleans","Shreveport","Lafayette","Lake Charles"],
            ["Maine","Portland","Lewiston","Bangor","South Portland"],
            ["Maryland","Baltimore","Columbia","Germantown","Silver Spring"],
            ["Massachusetts","Worcester","Springfield","Cambridge","Lowell"],
            ["Michigan","Detroit","Grand Rapids","Warren","Sterling Heights"],
            ["Minnesota","Minneapolis","Rochester","Duluth","Bloomington"],
            ["Mississippi","Gulfport","Southaven","Biloxi","Hattiesburg"],
            ["Missouri","Kansas City","Saint Louis","Springfield","Columbia"],
            ["Montana","Billings","Missoula","Great Falls","Bozeman"],
            ["Nebraska","Omaha","Bellevue","Grand Island","Kearney"],
            ["Nevada","Las Vegas","Henderson","Reno","North Las Vegas"],
            ["New Hampshire","Manchester","Nashua","Dover","Rochester"],
            ["New Jersey","Newark","Jersey City","Paterson","Elizabeth"],
            ["New Mexico","Albuquerque","Las Cruces","Rio Rancho","Roswell"],
            ["New York","New York City","Hempstead","Brookhaven","Islip"],
            ["North Carolina","Charlotte","Greensboro","Durham","Winston-Salem"],
            ["North Dakota","Fargo","Grand Forks","Minot","West Fargo"],
            ["Ohio","Cleveland","Cincinnati","Toledo","Akron"],
            ["Oklahoma","Tulsa","Norman","Broken Arrow","Edmond"],
            ["Oregon","Portland","Eugene","Gresham","Hillsboro"],
            ["Pennsylvania","Philadelphia","Pittsburgh","Allentown","Erie"],
            ["Rhode Island","Cranston","Warwick","Pawtucket","East Providence"],
            ["South Carolina","Charleston","North Charleston","Mount Pleasant","Rock Hill"],
            ["South Dakota","Sioux Falls","Rapid City","Aberdeen","Brookings"],
            ["Tennessee","Memphis","Knoxville","Chattanooga","Clarksville"],
            ["Texas","Houston","San Antonio","Dallas","Fort Worth"],
            ["Utah","West Valley City","Provo","West Jordan","Orem"],
            ["Vermont","Burlington","South Burlington","Colchester","Rutland"],
            ["Virginia","Virginia Beach","Norfolk","Chesapeake","Arlington"],
            ["Washington","Seattle","Spokane","Tacoma","Vancouver"],
            ["West Virginia","Huntington","Morgantown","Parkersburg","Wheeling"],
            ["Wisconsin","Milwaukee","Green Bay","Kenosha","Racine"],
            ["Wyoming","Casper","Laramie","Gillette","Rock Springs"]
        ],
        options: [-1,-1,-1,-1,-1,-1,-1,-1],
        question: "",
        correctAnswer: "",
        passing: false,
        questionIndex: -1,
        incorrect: false
        
    },
    methods: {
        displayNextQuestion: function () {
            this.question = "";
            let nextIndex = Math.floor(Math.random() * this.questionBank.length);
            this.questionIndex = nextIndex;
            let nextResponse = this.questionBank[nextIndex];
            this.question = nextResponse[0];
            let btnCollection = document.getElementsByClassName("answer-button");
            for (i = 0; i < 8; i++) {
                btnCollection[i].classList.remove("incorrect");
            }
            this.loadOptions();


        },
        checkAnswer: function (index) {
            let value = this.options[index];
            if (value == this.questionBank[this.questionIndex][1]) {
                this.incorrect = false;
                // console.log("Correct");
                this.displayNextQuestion();
                this.streak += 1;
                if (this.streak > this.highStreak) {
                    this.highStreak = this.streak;
                }
                return true;
            } else {
                // console.log("Incorrect");
                incorrectAnswerButton = document.querySelector(`#answer-button-${index}`)
                incorrectAnswerButton.classList.add("incorrect");
                this.incorrect = true;
                this.streak = 0;
                return false;
            }
        },
        loadOptions: function () {
            this.options = [-1,-1,-1,-1,-1,-1,-1,-1];
            let answerSpot = Math.floor(Math.random() * 8);
            // console.log(this.questionBank[this.questionIndex][1]);
            this.options[answerSpot] = this.questionBank[this.questionIndex][1];
            for (i = 0; i < 8; i++) {
                if (this.options[i] == -1) {
                    this.options[i] = this.randomAnswer();
                }
            }
            // console.log(this.options);
            for (i = 0; i < 8; i++) {
                if (this.options[i] > 0 && this.options[i] < 5) {
                    this.options[i] = this.answerPool[this.questionIndex][this.options[i]];
                } else if (this.options[i] < 9) {
                    let extraAnswerStateIndex = Math.floor(Math.random() * 50);
                    if (extraAnswerStateIndex == this.questionIndex) {
                        extraAnswerStateIndex = Math.floor(Math.random() * 50);
                        if (extraAnswerStateIndex == this.questionIndex) {
                            extraAnswerStateIndex = Math.floor(Math.random() * 50);
                        }
                    }
                    this.options[i] = this.answerPool[extraAnswerStateIndex][this.options[i] - 4];
                }
            }
            // console.log(this.options);

        },  
        randomAnswer: function () {
            let randomNumber = Math.floor((Math.random() * 8) + 1);
            if (randomNumber == this.options[0] || randomNumber == this.options[1] || randomNumber == this.options[2] || randomNumber == this.options[3] ||
                randomNumber == this.options[4] || randomNumber == this.options[5] || randomNumber == this.options[6] || randomNumber == this.options[7]) {
                return this.randomAnswer();
            } else {
                // console.log(randomNumber);
                return randomNumber;
            }
        }
    },
    created: function() {
        this.displayNextQuestion();
    }
});