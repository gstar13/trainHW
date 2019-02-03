$(document).ready(function() { 



// render trains ///first train pushed back 1 year so it alwas comes before the current time
//create on click button for adding trains
   $("#submit-train").on("click", function (event) {
event.preventDefault();
  
    var trainName = $("#trainName").val();
    var newDestination = $("#destination").val();
    var firstTrainTime = $("#firstTrainTime").val();
    var newFrequency = $("#frequency").val();
   
   
    //create local temp object to hold train data
var newTrain = {
    newTrainName: trainName,
    destination: newDestination,
    firstTime: firstTrainTime,
    frequency: newFrequency,
   

};
  //upload new data to database
  database.ref().push(newTrain);
  //log all to the console
  console.log(newTrain.newtrainName); 
  console.log(newTrain.destination); 
  console.log(newTrain.firstTrainTime); 
  console.log(newTrain.frequency); 
    
    alert("new train added");
    //clear all of the text boxes
    $("#trainName").val("");
    $("#destination").val("");
    $("#firstTrainTime").val("");
    $("#frequency").val("");
});

//create firebase event for adding train to database and a row of new train info
database.ref().on("child_added", function (childSnapshot){
    console.log(childSnapshot.val());
    //store all in a variable
    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var firstTime = childSnapshot.val().firstTrainTime;
    var frequency = childSnapshot.val().frequency;
    //train info
    console.log(trainName);
    console.log(destination);
    console.log(firstTime);
    console.log(frequency);
////calc next arrival

var trainFreq;
var firstTrain= 0;
var firstTrainTimeConverted= moment(firstTrain,"HH:mm").subtract(1, "years");
console.log(firstTrainTimeConverted);

//current time
var currentTime = moment();
console.log("current time: " + moment(currentTime).format("HH:mm"));

//difference between times
var timeDiff = moment().diff(moment(firstTrainTimeConverted), "minutes");
console.log("difference in time: " + timeDiff);
//time apart (remainder)
var timeRemainder = timeDiff % trainFreq;
console.log(timeRemainder);

//minutes away
var tMinutesTillTrain = trainFreq - timeRemainder;
console.log("minutes till train: " + tMinutesTillTrain);

//next train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("arrival time: " + moment(nextTrain).format("HH:mm"));

//add each train time to the table
$("#train-table> tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency +
"</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>");


    //nextArrival.textContent = doc.data().[take first train time and add 60 until now]
    /////minutesAway.textContent = nextArrival-now in minutes

//calculate the the next arrival using math
//calc the minutes away
})
})
   




    





    

