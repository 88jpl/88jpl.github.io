// JSON object
var patientObject = {
    firstName: "Jeff",
    lastName: "Smith",
    DOB: 01/23/00,
    clinicName: "Western Physiotherapy",
    clinicLogoURL: "ptMockLogo.png",
    clinicColor: "green"


}
var listOfQuoteObjects = [];

// *** Account/Profile ***
// ** Setup variables **
var patientNameArea = document.querySelector("#patient-name");
console.log("Patient Name Area:", patientNameArea);
// patientNameArea.innerHTML = patientObject["firstName"] + " " + patientObject["lastName"];

// Function get random number for length of list
function randomNumberForList(the_list) {
    return Math.floor(Math.random()*the_list.length);
}
// Clinic Logo/Name changes
document.querySelector("#clinic-name").innerHTML = patientObject["clinicName"]
// Change color of clinic name from patient object
document.getElementById("clinic-name").style.color = patientObject["clinicColor"];
// Profile Picture Hover Shows Name
var patientPicture = document.querySelector("#patient-picture");
// console.log("patient picture area:", patientPicture);
patientPicture.onmouseover = function () {
    // console.log("picture was hovered");
    patientNameArea.innerHTML = patientObject["firstName"] + " " + patientObject["lastName"];
}
patientPicture.onmouseout = function () {
    // console.log("picture exited");
    patientNameArea.innerHTML = ""
}
//*** */ Daily Pain Report Form

// ** Prevent Default action of Submit form button
document.getElementById("pain-report-submit").addEventListener("click", 
function(event) {
    event.preventDefault()
});
// ** Query button for onclick
var painReportSubmitButton = document.querySelector("#pain-report-submit");
// console.log("Pain Report Submit:", painReportSubmitButton);
// * Onclick function to save form data as object
painReportSubmitButton.onclick = function () {
    console.log("Submit Daily Pain Report was clicked!");
    // get values
    var maxPain = document.getElementsByName("painChoice");
    // console.log(maxPainValue);
    var maxPainValue = "NA";
    // Get the Max pain input value
    for (i = 0; i < maxPain.length; i++) {
        if(maxPain[i].checked) {
            // console.log("maxPainValue:", i);
            maxPainValue = i;
        }
    }
    // Get the Notes input
    var painText = document.querySelector("#pain-text-input");
    // console.log("Pain text:", painText);
    var painReportArea = document.querySelector("#pain-report-area")

    // Get date
    var date = new Date().toJSON().slice(0, 10);
    console.log(date);
    // Get time
    var time = new Date().toJSON().slice(11, 16);
    var doesntExsist = document.getElementById(`${date}`);
    console.log("doesnt exisits test:", doesntExsist);
    if (maxPainValue != "NA" && document.getElementById(`${date}`) == null) {
        var painNote = document.createElement("div");
        painNote.classList.add('pain-note');
        painNote.setAttribute("id", `${date}`);
        var noteString = "Notes: ";
        if (painText.value == "") {
            noteString = "";
        }
        painNote.innerHTML = date + " @ " + time + " ---Pain Level: " + maxPainValue + "--- " + noteString + painText.value;
        console.log(painNote);
        painReportArea.append(painNote);

        
    }
    // Clear fields after submmited
    painText.value = "";
    maxPain[maxPainValue].checked = false;
}

fetch("https://api.jsonbin.io/v3/b/63cf2088ebd26539d0664983").then(function (response) {
    response.json().then(function (data) {
        console.log("data from server", data);
        listOfQuoteObjects = data["record"];
            // **Quote Logic**
// *Update Quote with random quote*
var quoteDisplay = document.querySelector("#quote-of-the-day");
var quoteAuthor = document.querySelector("#quote-of-the-day-author");
// console.log("This is the quote display area;", quoteDisplay);
// console.log("This is the quote author area:", quoteAuthor);
var randomIndex = randomNumberForList(listOfQuoteObjects);
// console.log(randomIndex);
console.log("Quote object:", listOfQuoteObjects[randomIndex]["quote"]);
quoteDisplay.innerHTML = listOfQuoteObjects[randomIndex]["quote"];
quoteAuthor.innerHTML = listOfQuoteObjects[randomIndex]["author"];
    })
});





