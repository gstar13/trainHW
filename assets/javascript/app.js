$(document).ready(function () {
     //initialize database
     var config = {
        apiKey: "AIzaSyCQDKHSQcNkLim5iyflvsnqag5lIFrUh30",
        authDomain: "gstar-ucla-example.firebaseapp.com",
        databaseURL: "https://gstar-ucla-example.firebaseio.com",
        projectId: "gstar-ucla-example",
        storageBucket: "gstar-ucla-example.appspot.com",
        messagingSenderId: "38165799591"
      };
                firebase.initializeApp(config);
                var database = firebase.database();

    // render trains ///first train pushed back 1 year so it alwas comes before the current time
    //create on click button for adding trains
    $("#submit-train").on("click", function (event) {
        event.preventDefault();
        

        var trainName = $("#trainName").val();
        var destination = $("#town").val();
        var firstTrainTime = $("#firstTrainTime").val();
        var newFrequency = $("#minutes").val();


        //create local temp object to hold train data
        var newTrain = {
            newTrainName: trainName,
            newDestination: destination,
            firstTime: firstTrainTime,
            frequency: newFrequency,


        };
        //upload new data to database
        database.ref().push(newTrain);
        //log all to the console
        console.log(newTrain.newTrainName);
        console.log(newTrain.newDestination);
        console.log(newTrain.firstTime);
        console.log(newTrain.frequency);

        alert("new train added");
        //clear all of the text boxes
        $("#trainName").val("");
        $("#town").val("");
        $("#firstTrainTime").val("");
        $("#minutes").val("");
    });

    //create firebase event for adding train to database and a row of new train info
    database.ref().on("child_added", function (childSnapshot) {
        console.log(childSnapshot.val());
        //store all in a variable
        var trainName = childSnapshot.val().newTrainName;
        var destination = childSnapshot.val().newDestination;
        var firstTrainTime = childSnapshot.val().firstTime;
        var frequency = childSnapshot.val().frequency;
        //train info
        console.log(trainName);
        console.log(destination);
        console.log(firstTrainTime);
        console.log(frequency);
        ////calc next arrival

        
        var firstTrain = 0;
        var firstTrainTimeConverted = moment(firstTrainTime, "HH:mm");
        console.log(firstTrainTimeConverted);

        //current time
        var currentTime = moment();
        console.log("current time: " + moment(currentTime).format("HH:mm"));


        //gotta try new things
        
        
        //difference between first left and now
        var timeDiff = moment.utc(moment(currentTime,"HH:mm").diff(moment(firstTrainTimeConverted, "HH:mm"))).format("HH:mm");
        console.log("difference in time: " + timeDiff, "mm");
        //time apart (remainder)
        var diffMinutes =moment.duration(currentTime.diff(firstTrainTimeConverted));
        console.log("the diff in minutes is: " + diffMinutes);

        //minutes away
        var tMinutesTillTrain = diffMinutes % frequency;
        console.log("minutes till train: " + tMinutesTillTrain);

        //next train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("arrival time: " + moment(nextTrain).format("HH:mm"));

        //add each train time to the table
        $("#train-table> tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency +
            "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>");


      
    })
})













