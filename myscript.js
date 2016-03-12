// Variables for logging in.
var projectAPIKey = "DAK37713725dc7242e9acda3d88e68aa132";
var username = "arpan";
var password = "nihal111";

var callMade, callReceived;

function makeCall(userid) {
    fulluserid = userid + '@ferozepur.gmail.com';
    kandy.call.makeCall(fulluserid, false);
}

function answerCall(callId) {
    kandy.call.answerCall(callId, false)
}

function endCall() {
    try {
        kandy.call.endCall(callMade);
    } catch(err) {
        console.log("Call made to nahi kata-"+err);
    }

    try {
        kandy.call.endCall(callReceived);
    } catch(err) {
        console.log("Call received to nahi kata-"+err);
    }
}

function onCallInitiated(call, callee) {
    console.log("Call initiated with"+callee);
    callMade = call.getId();
}

function onCallIncoming(call) {
    console.log("Call incoming");
    callReceived = call.getId();
    answerCall(callReceived);
}   

function onCallEnded(call) {
    console.log("Call Ended");
}

function onCallEstablished(call) {
    console.log("Call established");
}

// Setup at the start of the application.
// Configure Kandy for the features we want to use.
kandy.setup({
    // Events to listen for.
    listeners: {
        callinitiated: onCallInitiated,
        callincoming: onCallIncoming,
        callended: onCallEnded,
        callestablished: onCallEstablished,
    },

});
/*
 * Log the user in / out depending on current status.
 * Here's where we call Kandy's functions.
 */
function toggleLogin() {
    username=document.getElementById('username').value;
    alert(username);
    saveData(username,password);
    kandy.login(projectAPIKey, username, password, onLoginSuccess, onLoginFailure);
}

// What to do on a successful login.
function onLoginSuccess() {

    console.log("Login was successful for "+username);
    isLoggedIn = true;
    console.log(kandy.getUserDetails.email);
    alert("logged in " +username);
    location.href='main'
}

// What to do on a failed login.
function onLoginFailure() {
    console.log("Login failed.");
}

function saveData(user, pass) {
   var account = {
     User: user,
     Pass: pass
   };
   console.log("saving "+user+ " "+pass);
   //converts to JSON string the Object
   account = JSON.stringify(account);
   //creates a base-64 encoded ASCII string
   account = btoa(account);
   //save the encoded accout to web storage
   localStorage.setItem('_account', account);
}

function loadData() {
   var account = localStorage.getItem('_account');
   if (!account) 
   {
    username="arpan"
    password="nihal111"
   }
   else
   {
   localStorage.removeItem('_account');
   //decodes a string data encoded using base-64
   account = atob(account);
   //parses to Object the JSON string
   account = JSON.parse(account);
   //do what you need with the Object
   username=account.User; 
   password=account.Pass;
    }
    console.log("loading "+user+" "+pass);
   kandy.login(projectAPIKey, username, password, onLoginSuccess, onLoginFailure);
   
}