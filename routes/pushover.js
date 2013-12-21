var push = require( 'pushover-notifications' );

var TOKEN = "asD4LmDWiGMhnSBy6aUNyC5kfRZZ8S";

module.exports = {
    
   send: function (req, res) {

    var user = req.param('user');

    if (!user){
      return res.send(400, "User not found");
    }

    var body = JSON.parse(req.rawBody);

    var type = body.type;
    var project = body.project;

    console.log(type, project);

    var messageAction;
    var priority = 0;


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
        message: "Name : " + project.name + "\n" + "Time of " + type + ": " + project.created_date + "\n" + "URL : " + project.domain + "\n" + "Log on to modulus.io for more details\n"
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