$(document).ready(function(){ 

    // Initialize Firebase

  var config = {
    apiKey: "AIzaSyAfSox5qLFAdntvaDR-LUItxTJEZDKRftA",
    authDomain: "gorgoplex-v2.firebaseapp.com",
    databaseURL: "https://gorgoplex-v2.firebaseio.com",
    projectId: "gorgoplex-v2",
    storageBucket: "gorgoplex-v2.appspot.com",
    messagingSenderId: "638093383355"
  };
  firebase.initializeApp(config);
    
     var database = firebase.database();;
    // Set-up initial variable
     var trainName = "";
     var destiNation = "";
     var freQuency = "";
     var nextArrival = "";
     var minutesAway = "";
    
    //MM time set up
       
    
    // save/add train data
     
       $("#addtrain").on("click",function(event){
    
           // Cancel
           event.preventDefault();
    
           trainName = $("#trainname").val().trim();
           destiNation = $("#destination").val().trim();
           firstTrainTime = $("#firsttraintime").val().trim();
           freQuency = $("#frequency").val().trim();
    
           var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
           console.log(firstTrainTime);
    
           var currentTime = moment();
           console.log(currentTime);
           
           var diffTime = moment().diff(moment(firstTimeConverted),"minutes");
           console.log(diffTime);
    
           var remainder = diffTime % freQuency;
           console.log(remainder);
    
           minutesAway = freQuency - remainder;
           console.log(minutesAway);
    
           nextArrival = moment().add(minutesAway, "minutes");
           console.log(nextArrival);
    
           var tnextArrival = moment(nextArrival).format("HH:mm");
           
    
    
    
           // Train Firerbase Data
           database.ref().push({
               trainName : trainName,
               destiNation : destiNation,
               firstTrainTime : firstTrainTime,
               Whenthetraincomes : Whenthetraincomes,
               nextArrival : tnextArrival,
               minutesAway: minutesAway,
               dateAdded: firebase.database.ServerValue.TIMESTAMP
    
           });
    
           console.log(trainName);
           console.log(destiNation);
           console.log(firstTrainTime);
           console.log(freQuency);
    
           $("#trainname").val("");
           $("#destination").val("");
           $("#firsttraintime").val("");
           $("#whenthetraincomes").val("");
       });
    
    //  Add Train schedule
    
       database.ref().on("child_added", function(snap, prevChildKey){
    
           // Firebase assign snap varibles
           var trainnameSnap = snap.val().trainName;
           var destinationSnap = snap.val().destiNation;
           var frequencySnap = snap.val().freQuency;
           var nextarrivalSnap = snap.val().nextArrival;
           var minutesawaySnap = snap.val().minutesAway;
    
           $("#tablebody").append("<tr><td>" + trainnameSnap + "</td><td>" + destinationSnap + "</td><td>" + frequencySnap + "</td><td>" + nextarrivalSnap + "</td><td>" + minutesawaySnap + "</td></tr>");
    
       });
    
    });