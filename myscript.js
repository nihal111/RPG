// Variables for logging in.
var projectAPIKey = "DAK37713725dc7242e9acda3d88e68aa132";
var username = "arpan";
var password = "nihal111";

var callMade, callReceived;

function makeCall(userid) {
    kandy.call.makecall(userid, false);
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

function onCallInitiateFailed() {
    console.log("Call initiation failed!");
}

function onCallIncoming(call) {
    console.log("Call incoming");
    callReceived = call.getId();
    answerCall(callReceived);
}

function onCallAnswered() {
    console.log("Call answered");
}

function onCallAnswerFailed() {
    console.log("Call answering failed");
}

function onCallEnded(call) {
    console.log("Call Ended");
}

function onCallEndFailed() {
    console.log("Call end failed");
}

function onCallEstablished(call) {
    console.log("Call established");
}

function onCallStateChanged() {
    console.log("Call state changed");
}

// Setup at the start of the application.
// Configure Kandy for the features we want to use.
kandy.setup({
    // Events to listen for.
    listeners: {
        callinitiated: onCallInitiated,
        callinitiatefailed: onCallInitiateFailed,
        callincoming: onCallIncoming,
        callanswered: onCallAnswered,
        callanswerfailed: onCallAnswerFailed,
        callended: onCallEnded,
        callendfailed: onCallEndFailed,
        callestablished: onCallEstablished,
        callstatechanged: onCallStateChanged
    },

});

// Status of the user.
var isLoggedIn = false;

/*
 * Log the user in / out depending on current status.
 * Here's where we call Kandy's functions.
 */
function toggleLogin() {
   if(isLoggedIn) {
       kandy.logout(onLogoutSuccess);
   } else {
       kandy.login(projectAPIKey, username, password, onLoginSuccess, onLoginFailure);
   }
}

// What to do on a successful login.
function onLoginSuccess() {

    console.log("Login was successful.");
    isLoggedIn = true;
    location.href='/main'
}

// What to do on a failed login.
function onLoginFailure() {
    console.log("Login failed.");
}

// What to do on a succesful logout.
function onLogoutSuccess() {
    console.log("Logout was successful.");
    isLoggedIn = false;
}
