// NOTES
// This is a train schedule app using Firebase to host arrival and departure data. 
// App will retrieve and manipulate this information with Moment.js. 
// App will provide up-to-date information about various trains, 
//     including arrival times and minutes until arrival. 

// Initialize Firebase
var config = {
    apiKey: "AIzaSyD3oCh7JiGEIjF-3wo9Stau5IJepK8rJb4",
    authDomain: "train-schedule-16dd5.firebaseapp.com",
    databaseURL: "https://train-schedule-16dd5.firebaseio.com",
    projectId: "train-schedule-16dd5",
    storageBucket: "",
    messagingSenderId: "812226982759"
};
firebase.initializeApp(config);

var database = firebase.database();

// Initial Values
var currentTime = moment();

function clearInputs() {
    $("#trainName").val("");
    $("#trainDestination").val("");
    $("#firstTrain").val("");
    $("#trainFrequency").val("");
}

// Capture Button Click
$("#train-submit").on("click", function (event) {
    event.preventDefault();

    // Grabbed values from text boxes
    var trainName = $("#trainName-input").val().trim();
    var destination = $("#destination-input").val().trim();    
    var firstTime = $("#firstArrival-input").val().trim();    
    var frequency = $("#frequency-input").val().trim();

    console.log(moment('1:23 PM', 'hh:mm A').format('HH:mm'))

    // Code for handling the push
    database.ref().push({
        trainName,
        destination,
        firstTime,
        frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
    console.log(trainName, destination, firstTime, frequency);
    console.log("first time: " + firstTime);
    
    // Clear the input boxes
    clearInputs()
});


// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {

    console.log(childSnapshot.val());

    // Store everything into a variable.
    var tableTrain = childSnapshot.val().trainName;
    var tableDest = childSnapshot.val().destination;
    var tableStart = childSnapshot.val().firstTime;
    var tableFreq = childSnapshot.val().frequency;

    // Revert the start time by a year to ensure the next train time is in the future... 
    var tableStartConverted = moment(tableStart, "HH:mm").subtract(1, "years");
    var newFirst = moment(tableStart, "HH:mm");
    var diffTime = moment().diff(moment(tableStartConverted), "minutes");

    // Time apart (remainder)
    var tRemainder = diffTime % tableFreq;

    // Minute Until Train
    var tMinutesTillTrain = tableFreq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


    $("#train-display-table > tbody").append("<tr><td>" + tableTrain + "</td><td>" + tableDest + "</td><td>" +
        newFirst.format("HH:mm") + "</td><td>" + tableFreq + "</td><td>" + nextTrain.format("HH:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>");

})
