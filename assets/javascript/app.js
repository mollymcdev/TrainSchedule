
$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCKHXiagZMCEe67whN63Pzfa9YbqWP85FA",
        authDomain: "trainschedule-69271.firebaseapp.com",
        databaseURL: "https://trainschedule-69271.firebaseio.com",
        projectId: "trainschedule-69271",
        storageBucket: "trainschedule-69271.appspot.com",
        messagingSenderId: "337611574049"
    };
    firebase.initializeApp(config);

    var database = firebase.database();
    var trainName;
    var destination;
    var trainTime;
    var frequency;
    var nextArrival;
    //var minsAway;


    database.ref().on('child_added', function (snapshot) {

        var snapshot = snapshot.val();

        /*

        var convertedTrainTime = moment(trainTime).format('HH:mm');

        nextArrival = moment(trainTime).add(frequency, 'm');
        var convertedNextArrival = nextArrival.format('HH:mm');
        console.log(convertedNextArrival); 

        minsAway = moment(nextArrival).fromNow();*/


        var tableRow = $("<tr>");
        var trainNameRow = $("<td>").text(snapshot.trainName);
        var destinationRow = $("<td>").text(snapshot.destination);
        var frequencyRow = $("<td>").text(snapshot.frequency);
        var nextArrivalRow = $("<td>").text(snapshot.nextArrival);
        var minsAwayRow = $("<td>").text(snapshot.minsAway);


        $("#tableBody").append(tableRow, [trainNameRow, destinationRow, frequencyRow, nextArrivalRow, /*minsAwayRow*/]);

    });




    $("#submitBtn").on('click', function (event) {
        event.preventDefault();

        trainName = $("#trainName").val().trim();
        //console.log(trainName);
        destination = $("#destination").val().trim();
        //console.log(destination);
        trainTime = $("#trainTime").val().trim();
        //console.log(trainTime);
        frequency = $("#frequency").val().trim();
        //console.log(frequency);

        var today = moment()//.format('MMMM Do YYYY, HH:mm');
        console.log(today);

        var firstTrainTime = moment(trainTime, 'MMM Do YYYY, HH:mm');

        firstTrainTime.set('date', 1);

        console.log(firstTrainTime); 

        var nextArrival = firstTrainTime.add(frequency, 'm');
        console.log(nextArrival)


        database.ref().push({

            trainName: trainName,
            destination: destination,
            frequency: frequency,
            nextArrival: nextArrival.format('HH:mm'),
            // minsAway: minsAway


        });



    });

});
