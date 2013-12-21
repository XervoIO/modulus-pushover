var push = require( 'pushover-notifications' );

var moment = require('moment');

var TOKEN = "asD4LmDWiGMhnSBy6aUNyC5kfRZZ8S";

module.exports = {
    
   send: function (req, res) {

    var user = req.param('user');

    if (!user){
      console.log("ERRR USER NOT found");
      return res.send(400, "User not found");
    }

    console.log("parsing body");


    var type = req.body.type;
    var project = req.body.project;

    console.log(type, project);

    var messageAction;
    var priority = 0;

    var time = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");


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


    var p = new push( {
        user: user,
        token: TOKEN,
        priority: priority
    });

    var msg = {
        title: project.name + messageAction,
        message: "Project name : " + project.name + "\n\n" + "Time of " + type + ": " + time + "\n\n" + "Project URL : " + project.domain + "\n\n" + "Log on to modulus.io for more details\n"
    };

    p.send( msg, function( err, result ) {
        if ( err ) {
            throw err;
        }

        console.log( result );
    });
    
    // Send a JSON response
    return res.send(200);
  },

  
};