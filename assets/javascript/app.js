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
        var database = firebase.database();

    // Initial Values
    var trainName = "";
    var destination = "";
    var firstTime = "";
    var frequency = 0;

    // Capture Button Click
    $("#add-user").on("click", function(event) {
      event.preventDefault();

      // Grabbed values from text boxes
      trainName = $("#trainName-input").val().trim();
      destination = $("#destination-input").val().trim();
      firstTime = $("#firstArrival-input").val().trim();
      frequency = $("#frequency-input").val().trim();

      // Code for handling the push
      database.ref().push({
        trainName,
        destination,
        firstTime,
        frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });

    });
