var push = require( 'pushover-notifications' );

var moment = require('moment');

//Api token from push over
var TOKEN = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";


module.exports = {
    
   send: function (req, res) {

    //Grab user token from params
    var user = req.param('user');

    //if no user is found, return a 400
    if (!user){
      return res.send(400, "User not found");
    }

    //Modulus will include an object in the POST request
    //Grab the type of action
    var type = req.body.type;
    //Grab the project details
    var project = req.body.project;

    var messageAction;
    // Pushover has priorty settings. Learn more here: https://pushover.net/api#priority
    var priority = 0;

    // Grab current time
    var time = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");

    //We want the message to be different depending on the type
    switch(type){
    case "start":
      messageAction = " has been started.";
      break;
    case "stop":
      messageAction = " has stopped.";
      break;
    case "restart":
      messageAction = " has been restarted.";
      break;
    case "deploy":
      messageAction = " has been deployed.";
      break;
    case "scale":
      messageAction = " has scaled.";
      break;
    case "crash":
      messageAction = " has crashed.";
      priority = 2;
      break;
    default:
      return res.send(400, "Type not found");
    }

    //Create a Pushover object with the user, token , and priority 
    var p = new push( {
        user: user,
        token: TOKEN,
        priority: priority
    });

    //Create our message and title
    var msg = {
        title: project.name + messageAction,
        message: "Project name : " + project.name + "\n\n" + "Time of " + type + ": " + time + "\n\n" + "Project URL : " + project.domain + "\n\n" + "Log on to modulus.io for more details\n"
    };

    //Send to phone
    p.send( msg, function( err, result ) {

        if ( err ) {
            throw err;
        }

    });
    
    // Send a 200 response
    return res.send(200);
  },

  
};