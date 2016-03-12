// Variables for logging in.
var projectAPIKey = "DAK37713725dc7242e9acda3d88e68aa132";
var username = "arpan";
var password = "nihal111";

var callMade, callReceived;

function makeCall(userid) {
    fulluserid = userid + '@ferozepur.gmail.com';
    kandy.call.makecall(fulluserid, false);
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
