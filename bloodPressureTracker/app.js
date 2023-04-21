// JSON Object
var BLOODPRESSURES = [];
var AVERAGES = {
    'avgSYS': 0,
    'avgDIA': 0,
    'avgPUL': 0,
}

// Query Submit for BP's
var bpSubmitButton = document.querySelector("#bp-submit-button");
// console.log("BP Submit Button:", bpSubmitButton);

bpSubmitButton.onclick = function () {
    // console.log("BP Submit Button Was Clicked!");
    var systolic = document.querySelector("#systolic-input");
    // console.log("Systolic input:", sys.value);
    var diastolic = document.querySelector("#diastolic-input");
    var pulse = document.querySelector("#pulse-input");

    if (systolic.value == "" || diastolic.value == "" || pulse.value == "") {
        // Show error popup
        
    } else {
        // Get date
        var date = new Date().toJSON().slice(0, 10);
        // Get time
        var time = new Date().toJSON().slice(11, 16);
        // time adjustment in-progress
        // var splitTime = time.split(":")
        // var adjustedTime = parseInt(splitTime[0]) -7 + ":" + splitTime[1];
        // console.log("time:", adjustedTime);
        createNewBloodPressure(systolic.value, diastolic.value, pulse.value, date, time);
        // Clear input fields
        systolic.value = "";
        diastolic.value = "";
        pulse.value = "";
    }
}

// Sign Up New User
var userSignUp = document.querySelector("#login-registration-btn-registration");
// console.log("Sign Up button", userSignUp);
userSignUp.onclick = function () {
    var first_name = document.querySelector("#login-registration-input-f-name");
    var last_name = document.querySelector("#login-registration-input-l-name");
    var email = document.querySelector("#login-registration-input-email");
    var password = document.querySelector("#login-registration-input-password");
    var birthdate = document.querySelector("#login-registration-input-birthdate");
    var registration_date = new Date().toJSON().slice(0, 10);
    // console.log("registration date:", registration_date);
    // Get date
    if ( first_name.value == "" || last_name.value == "" || email.value == "" || password.value == "" || birthdate.value == "") {
        alert("Please complete all fields.");
    } else {
        createNewUser(first_name.value, last_name.value, email.value, password.value, birthdate.value, registration_date);
        first_name.value = last_name.value = email.value = password.value = birthdate.value = "";
    }
}


function createHistoryOfPressures(data) {
    var bpHistoryArea = document.querySelector("#bp-output-area");
    bpHistoryArea.innerHTML = "";
    var tableHeaderList = ['Time','Systolic','Diastolic','Pulse'];
    data.forEach(element => {
        date = element['date'];
        if (document.getElementById(`${date}`) == null) {
            // Create new card to assemble data into
            var newBPDateCard = document.createElement("div");
            newBPDateCard.classList.add("bp-card");
            newBPDateCard.setAttribute("id", `${date}`);
            // Create interal card components
            // **Date area of card**
            var newDateForCard = document.createElement("div");
            newDateForCard.classList.add("bp-card-date");
            newDateForCard.innerHTML = date;
            newBPDateCard.appendChild(newDateForCard);
            // **Table to store Data
            var newTableForCard = document.createElement("table");
            newTableForCard.classList.add("bp-card-table");
            // ***Add header to table
            var newTableRowHeader = newTableForCard.insertRow();
            newTableRowHeader.setAttribute("id", "bp-table-header");
            var newTableRowData = newTableForCard.insertRow();
            for (i = 0; i < tableHeaderList.length; i++) {
                // Header
                var newTableHeader = newTableRowHeader.insertCell();
                newTableHeader.innerHTML = tableHeaderList[i];
                newTableRowHeader.appendChild(newTableHeader);
                // First Row
                var newCellContents = document.createElement("div");
                var inputDiv = document.createElement("div");
                inputDiv.innerHTML = `<input value="${element[tableHeaderList[i].toLowerCase()]}" size="8" type='text' pattern='[0-9]{3,8}' required>`;
                inputDiv.style.display = "none";
                inputDiv.setAttribute("class", `itemInput${element.id}`);
                newCellContents.appendChild(inputDiv);
                var outputDiv = document.createElement("div");
                outputDiv.setAttribute("class", `itemOutput${element.id}`);
                outputDiv.innerHTML = element[tableHeaderList[i].toLowerCase()];
                newCellContents.appendChild(outputDiv);
                var newTableRowCell = newTableRowData.insertCell();
                // console.log("elements to add:",element[tableHeaderList[i].toLowerCase()]);
                newTableRowCell.appendChild(newCellContents);
                // newTableRowCell.innerHTML = `${element[tableHeaderList[i].toLowerCase()]} <input style='display:none'>`;
            } 
            var newTableRowCell = newTableRowData.insertCell();
            newTableRowCell.innerHTML = `<input value="${element.date}" class='itemInputDate${element.id}' style='display:none' size="10" pattern='[0-9\-]{3,8}' required>
                                            <button id='btn-submit-edited-${element.id}' style='display:none' class='pressure-button' onclick='submitEditedPressure(${element.id});'>Submit</button>
                                            <button id='btn-cancel-edit-${element.id}' style='display:none' class='pressure-button' onclick='cancelEditPressure(${element.id});'>Cancel</button>
                                            <button id='btn-edit-${element.id}' class='edit-button pressure-button' onclick='editPressureButtonClicked(${element.id});'>Edit</button>
                                            <button id='btn-delete-${element.id}' class='pressure-button' onclick='deletePressureButton(${JSON.stringify(element)});'>Delete</button>`


            newBPDateCard.append(newTableForCard) 
            
            // Fill new container will data
            bpHistoryArea.append(newBPDateCard);
        } 
        // else a date card has been made so append to that
        else {
            var dateCardToAppendTo = document.getElementById(`${date}`);
            var cardTableArea = dateCardToAppendTo.lastChild;
            var newTableRowData = cardTableArea.insertRow();
            console.log("Date card already created:", cardTableArea);
            for (i = 0; i < tableHeaderList.length; i++) {
                // First Row
                var newTableRowCell = newTableRowData.insertCell();
                // console.log("elements to add:",element[tableHeaderList[i].toLowerCase()]);
                var newCellContents = document.createElement("div");
                var inputDiv = document.createElement("div");
                inputDiv.innerHTML = `<input value="${element[tableHeaderList[i].toLowerCase()]}" size="8" pattern='[0-9\:]{3,8}' required>`;
                inputDiv.style.display = "none";
                inputDiv.setAttribute("class", `itemInput${element.id}`);
                newCellContents.appendChild(inputDiv);
                var outputDiv = document.createElement("div");
                outputDiv.setAttribute("class", `itemOutput${element.id}`);
                outputDiv.innerHTML = element[tableHeaderList[i].toLowerCase()];
                newCellContents.appendChild(outputDiv);
                // var newTableRowCell = newTableRowData.insertCell();
                // console.log("elements to add:",element[tableHeaderList[i].toLowerCase()]);
                newTableRowCell.appendChild(newCellContents);
                // newTableRowCell.innerHTML = element[tableHeaderList[i].toLowerCase()];
            } 
            var newTableRowCell = newTableRowData.insertCell();
            newTableRowCell.innerHTML = `<input value="${element.date}" class=itemInputDate${element.id}  style='display:none' size="10" pattern='[0-9\-]{3,8}' required>
                                            <button id='btn-submit-edited-${element.id}' class='pressure-button' style='display:none' onclick='submitEditedPressure(${element.id});'>Submit</button>
                                            <button id='btn-cancel-edit-${element.id}' class='pressure-button' style='display:none' onclick='cancelEditPressure(${element.id});'>Cancel</button>
                                            <button id='btn-edit-${element.id}' class='edit-button pressure-button' onclick='editPressureButtonClicked(${element.id});'>Edit</button>
                                            <button id='btn-delete-${element.id}' class='pressure-button' onclick='deletePressureButton(${JSON.stringify(element)});'>Delete</button>`
        }
    })
}

function addTotalAveragesToContent() {
    var systolic = document.querySelector("#overall-average-systolic");
    var systolicCard = document.querySelector("#systolic-average-card");
    var diastolic = document.querySelector("#overall-average-diastolic");
    var diastolicCard = document.querySelector("#diastolic-average-card");
    var pulse = document.querySelector("#overall-average-pulse");
    var pulseCard = document.querySelector("#pulse-average-card");

    systolic.innerHTML = AVERAGES['avgSYS'];

    if (AVERAGES['avgSYS'] >= 140) {
        systolicCard.setAttribute("class", "red data-container");
    } else if (AVERAGES['avgSYS'] >= 130 && AVERAGES['avgSYS'] < 140) {
        systolicCard.setAttribute("class", "yellow data-container");
    } else {
        systolicCard.setAttribute("class", "green data-container");
    }
    diastolic.innerHTML = AVERAGES['avgDIA'];
    if (AVERAGES['avgDIA'] >= 90) {
        diastolicCard.setAttribute("class", "red data-container");
    } else if (AVERAGES['avgDIA'] >= 80 && AVERAGES['avgDIA'] < 90) {
        diastolicCard.setAttribute("class", "yellow data-container");
    } else {
        diastolicCard.setAttribute("class", "green data-container");
    }
    pulse.innerHTML = AVERAGES['avgPUL'];
    if (AVERAGES['avgPUL'] >= 90) {
        pulseCard.setAttribute("class", "red data-container");
    } else if (AVERAGES['avgPUL'] >= 80 && AVERAGES['avgPUL'] < 90) {
        pulseCard.setAttribute("class", "yellow data-container");
    } else {
        pulseCard.setAttribute("class", "green data-container");
    }
}

function getTotalAverages(data) {
    totalSYS = 0;
    totalDIA = 0;
    totalPUL = 0;
    data.forEach(element => {

        console.log("this is the elements:", element["systolic"]);
        totalSYS += parseInt(element["systolic"]);
        totalDIA += parseInt(element["diastolic"]);
        totalPUL += parseInt(element["pulse"]);
        
    });
    AVERAGES['avgSYS'] = Math.floor(totalSYS / data.length);
    AVERAGES['avgDIA'] = Math.floor(totalDIA / data.length);
    AVERAGES['avgPUL'] = Math.floor(totalPUL / data.length);
    console.log("averages obj", AVERAGES);
}
function loadPressuresFromServer() {
    fetch("https://s23-deploy-88jpl-production.up.railway.app/pressures", {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; utf-8"
        }
    }).then(function (response) {
        // Display flex
        var loginPrompt = document.querySelector("#login-prompt");
        var loginRegistration = document.querySelector("#login-registration");
        var loginAuthorization = document.querySelector("#login-authorization");
        var loginLogout = document.querySelector("#login-logout");
        //  Display grid
        var inputArea = document.querySelector("#input-area");
        var dataArea = document.querySelector("#data-area");
        //  Display block
        var bpOutputArea = document.querySelector("#bp-output-area");
        if (response.status == 401) {
            loginPrompt.style.display = "flex";
            // loginRegistration.style.display = "flex";
            // loginAuthorization.style.display = "flex";
            loginLogout.style.display = "none";
            inputArea.style.display = "none";
            dataArea.style.display = "none";
            bpOutputArea.style.display ="none";
            console.log("NOT LOGGED IN");
        } else if (response.status == 200) {
            loginPrompt.style.display = "none";
            loginRegistration.style.display = "none";
            loginAuthorization.style.display = "none";
            loginLogout.style.display = "flex";
            inputArea.style.display = "grid";
            dataArea.style.display = "grid";
            bpOutputArea.style.display ="block"
            response.json().then(function (data) {
            // console.log("data from server",data);
            bloodPressureData = data;
            // Call function to get total average
            getTotalAverages(data);
            addTotalAveragesToContent();
            // Call function to get last week average
            // Call function to calculate streak
            // Call function to create pressure history
            createHistoryOfPressures(bloodPressureData);
            })
        } else {
            loginPrompt.style.display = "flex";
            loginRegistration.style.display = "none";
            loginAuthorization.style.display = "none";
            loginLogout.style.display = "none";
            inputArea.style.display = "grid";
            dataArea.style.display = "grid";
            bpOutputArea.style.display ="block";
        }
    });
}

function createNewBloodPressure(systolic, diastolic, pulse, date, time) {
    var data = "systolic=" + encodeURIComponent(systolic) + "&" + "diastolic=" + encodeURIComponent(diastolic) + "&" + "pulse=" + encodeURIComponent(pulse) 
                    + "&" + "time=" + encodeURIComponent(time) + "&" + "date=" + encodeURIComponent(date);
    console.log("sending data to server:", data);
    fetch("https://s23-deploy-88jpl-production.up.railway.app/pressures", {
        method: "POST",
        credentials: "include",
        body: data,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; utf-8",
            "Content-Length": data.length
        }
    }).then(function (response) {
        // console.log("response", repsonse.status)
        if (response.status == 201) {
            loadPressuresFromServer();
        } else {
            console.log("Server response with", response.status, "when trying to add a new blood pressure.");
        }
    })
}

function createNewUser(first_name, last_name, email, password, birthdate, registration_date) {
    var data = "first_name=" + encodeURIComponent(first_name) + "&" + "last_name=" + encodeURIComponent(last_name) + "&" + "email=" + encodeURIComponent(email) 
                    + "&" + "password=" + encodeURIComponent(password) + "&" + "birthdate=" + encodeURIComponent(birthdate) + "&" + "registration_date=" + encodeURIComponent(registration_date);
    console.log("sending data to server:", data);
    fetch("https://s23-deploy-88jpl-production.up.railway.app/users", {
        method: "POST",
        credentials: "include",
        body: data,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; utf-8",
            "Content-Length": data.length
        }
    }).then(function (response) {
        console.log("response", response.status);
        var loginPrompt = document.querySelector("#login-prompt");
        var loginRegistration = document.querySelector("#login-registration");
        var loginAuthorization = document.querySelector("#login-authorization");
        var loginLogout = document.querySelector("#login-logout");
        if (response.status == 201) {
            alert("New Account Created!")
            loginPrompt.style.display = "none";
            loginRegistration.style.display = "none";
            loginAuthorization.style.display = "flex";
            loginLogout.style.display = "none";
            // console.log("User created!");
        } else {
            alert("Error in creating new account!")
            // console.log("Server responseded with", response.status, "when creating a new user.");
        }
    })
}

function submitEditedPressure(id) {
    var date = document.querySelector(`.itemInputDate${id}`);
    var data = document.querySelectorAll(`.itemInput${id} > input`);
    console.log("date of submit", date);
    var submitData = "systolic=" + encodeURIComponent(data[1].value) + "&diastolic=" + encodeURIComponent(data[2].value) + "&pulse=" + encodeURIComponent(data[3].value)
                     + "&date=" + encodeURIComponent(date.value) + "&time=" + encodeURIComponent(data[0].value) + "&id=" + encodeURIComponent(id);
    console.log("submitData = ", submitData);
    fetch(`https://s23-deploy-88jpl-production.up.railway.app/pressures/${id}`, {
        method: "PUT",
        credentials: "include",
        body: submitData,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; utf-8",
            "Content-Length": data.length
        }
    }).then(function (response) {
        // console.log("response", repsonse.status)
        if (response.status == 201) {
            loadPressuresFromServer();
        } else {
            console.log("Server response with", response.status, "when trying to add a new blood pressure.");
        }
    })
}
function cancelEditPressure(id) {
    // console.log("Edit clicked!", id);
    // Show the hidden input fields for editing
    var theHiddenInputs = document.querySelectorAll(`.itemOutput${id}`);
    theHiddenInputs.forEach(item => {
        item.style.display = "block";
    })
    // Hide the output display while editing
    var theNonHiddenOutputs = document.querySelectorAll(`.itemInput${id}`);
    theNonHiddenOutputs.forEach(item => {
        item.style.display = "none";
    })
    // Hide edit button & show submit button
    var theSubmitEditedButton = document.querySelector(`#btn-submit-edited-${id}`);
    var theEditButton = document.querySelector(`#btn-edit-${id}`);
    var theDeleteButton = document.querySelector(`#btn-delete-${id}`);
    var theCancelEditButton = document.querySelector(`#btn-cancel-edit-${id}`);
    // Show date input area
    var theDateInputArea = document.querySelector(`.itemInputDate${id}`);
    theDateInputArea.style.display = "none";
    // var theCancelEditButton = document.querySelector("#");
    theSubmitEditedButton.style.display = "none";
    theEditButton.style.display = "inline-block";
    theDeleteButton.style.display = "inline-block";
    theCancelEditButton.style.display = "none";
}
function editPressureButtonClicked(id) {
    // console.log("Edit clicked!", id);
    // Show the hidden input fields for editing
    var theHiddenInputs = document.querySelectorAll(`.itemInput${id}`);
    theHiddenInputs.forEach(item => {
        item.style.display = "block";
    })
    // Hide the output display while editing
    var theNonHiddenOutputs = document.querySelectorAll(`.itemOutput${id}`);
    theNonHiddenOutputs.forEach(item => {
        item.style.display = "none";
    })
    // Hide edit button & show submit button
    var theSubmitEditedButton = document.querySelector(`#btn-submit-edited-${id}`);
    var theEditButton = document.querySelector(`#btn-edit-${id}`);
    var theDeleteButton = document.querySelector(`#btn-delete-${id}`);
    var theCancelEditButton = document.querySelector(`#btn-cancel-edit-${id}`);
    // Show date input area
    var theDateInputArea = document.querySelector(`.itemInputDate${id}`);
    theDateInputArea.style.display = "inline-block";
    theSubmitEditedButton.style.display = "inline-block";
    theEditButton.style.display = "none";
    theDeleteButton.style.display = "none";
    theCancelEditButton.style.display = "inline-block";
}
function deletePressureButton(element) {
    console.log("Delete clicked!", element)
    if (confirm("Do you really want to delete the pressure from " + element.date + " @ " + element.time + "?")){
        fetch ("https://s23-deploy-88jpl-production.up.railway.app/pressures/" + element.id, {
            method: "DELETE",
            credentials: "include"
        }).then(function (response) {
            if (response.status == 200) {
                loadPressuresFromServer();
            } else {
                console.log("Server responded with:", response.status);
            }
        })
    }
}
function authenticateUser(username, password) {
    if (username == "" || password == "") {
        alert("Email and Password must not be empty!");
    } else {
        var data = "email=" + encodeURIComponent(username) + "&" + "password=" + encodeURIComponent(password) ;
        // console.log("sending data to server:", data);
        fetch("https://s23-deploy-88jpl-production.up.railway.app/sessions", {
            method: "POST",
            credentials: "include",
            body: data,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; utf-8",
                "Content-Length": data.length
            }
        }).then(function (response) {
            // console.log("response", response.status);
            if (response.status == 201) {
                alert("Successfully logged in!");
                loadPressuresFromServer();
                return true;
            } else {
                alert("Failed Login Attempt!");
                // console.log("Server responseded with", response.status, "when trying to login.");
                return false;
            }
        })
    }
}
var loginButton = document.querySelector("#login-authorization-btn-login");
loginButton.onclick = function () {
    var loginEmail = document.querySelector("#login-authorization-input-email");
    var loginPassword = document.querySelector("#login-authorization-input-password");
    authenticateUser(loginEmail.value, loginPassword.value);
    loginEmail.value =  loginPassword.value = "";
}
var loginPrompt = document.querySelector("#login-prompt");
var loginRegistration = document.querySelector("#login-registration");
var loginAuthorization = document.querySelector("#login-authorization");
var loginLogout = document.querySelector("#login-logout");
var signUpBtn = document.querySelector("#btn-login-signup");
signUpBtn.onclick = function () {
    loginPrompt.style.display = "none";
    loginRegistration.style.display = "flex";
    loginAuthorization.style.display = "none";
    loginLogout.style.display = "none";
}
var promptRegisterBtn = document.querySelector("#login-authorization-btn-register");
promptRegisterBtn.onclick = function () {
    loginPrompt.style.display = "none";
    loginRegistration.style.display = "flex";
    loginAuthorization.style.display = "none";
    loginLogout.style.display = "none";
}
var promptLoginBtn = document.querySelector("#btn-login-login");
promptLoginBtn.onclick = function () {
    loginPrompt.style.display = "none";
    loginRegistration.style.display = "none";
    loginAuthorization.style.display = "flex";
    loginLogout.style.display = "none";
}
var promptAlreadyHaveAccount = document.querySelector("#login-registration-login-btn");
promptAlreadyHaveAccount.onclick = function () {
    loginPrompt.style.display = "none";
    loginRegistration.style.display = "none";
    loginAuthorization.style.display = "flex";
    loginLogout.style.display = "none";
}
var logoutBtn = document.querySelector("#btn-login-logout");
logoutBtn.onclick = function () {
    if (confirm("Did you want to logout?")){
        fetch("https://s23-deploy-88jpl-production.up.railway.app/sessions", {
            method: "DELETE",
            credentials: "include",
            // headers: {
            //     "Content-Type": "application/x-www-form-urlencoded; utf-8",
            // }
        }).then(function (response) {
            // console.log("response", response.status);
            if (response.status == 200) {
                loadPressuresFromServer();
            } else {
                console.log("Server responseded with", response.status, "when trying to login.");
            }
        })
    } 
}
loadPressuresFromServer();