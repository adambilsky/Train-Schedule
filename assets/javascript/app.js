// NOTES
// This is a train schedule app using Firebase to host arrival and departure data. 
// App will retrieve and manipulate this information with Moment.js. 
// App will provide up-to-date information about various trains, 
//     including arrival times and minutes until arrival. 
// When adding trains, administrators should be able to submit the following:    
//     * Train Name
//     * Destination 
//     * First Train Time -- in military time
//     * Frequency -- in minutes
// * App will calculate when the next train will arrive relative to the current time.

// * Users from many different machines must be able to view same train times. //
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

// Capture Button Click
$("#train-submit").on("click", function (event) {
    event.preventDefault();

    // Grabbed values from text boxes
    var trainName = $("#trainName-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTime = moment($("#firstArrival-input").val().trim(),"HH:mm").format("X");
    var frequency = $("#frequency-input").val().trim();
        
    // Code for handling the push
    database.ref().push({
        trainName,
        destination,
        firstTime,
        frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
    console.log(trainName, destination, firstTime, frequency);

});
// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

  // Store everything into a variable.
  var newTrain = childSnapshot.val().trainName;
  var newDest = childSnapshot.val().destination;
  var newStart = childSnapshot.val().firstTime;
  var newFreq = childSnapshot.val().frequency;

  var firstTimeConverted = moment(newStart, "HH:mm").subtract(1, "years");
    var newFirst = moment(newStart, "HH:mm");
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % newFreq;
  console.log(tRemainder);

  // Minute Until Train
  var tMinutesTillTrain = newFreq - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


  $("#train-display-table > tbody").append("<tr><td>" + newTrain + "</td><td>" + newDest + "</td><td>" +
  newFirst.format("HH:mm") + "</td><td>" + newFreq + "</td><td>" + nextTrain.format("HH:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>");

})
  