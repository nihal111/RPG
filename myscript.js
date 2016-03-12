// Variables for logging in.
var projectAPIKey = "DAK37713725dc7242e9acda3d88e68aa132";
var username = "arpan";
var password = "nihal111";

// Setup at the start of the application.
// Configure Kandy for the features we want to use.
kandy.setup({
    // Containers for streaming elements.
    remoteVideoContainer: htmlElementRemote,
    localVideoContainer: htmlElementLocal,
    // Events to listen for.
    listeners: {
        callinitiated: onCallInitiated,
        callinitiatefailed: onCallInitiateFailed,
        callincoming: onCallIncoming,
        callanswered: onCallAnswered,
        callanswerfailed: onCallAnswerFailed,
        callrejected: onCallRejected,
        callrejectfailed: onCallRejectFailed,
        callhold: onCallHold,
        callunhold: onCallUnHold,
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

// Utility function for appending messages to the message div.
function log(message) {
    document.getElementById("messages").innerHTML += "<div>" + message + "</div>";
}

// What to do on a successful login.
function onLoginSuccess() {
    log("Login was successful.");
    isLoggedIn = true;
}

// What to do on a failed login.
function onLoginFailure() {
    log("Login failed.");
}

// What to do on a succesful logout.
function onLogoutSuccess() {
    log("Logout was successful.");
    isLoggedIn = false;
}