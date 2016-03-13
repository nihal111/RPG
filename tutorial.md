# **Kandy**

# Getting Started
In this tutorial, we will help you out with basics of using Kandy's Javascript SDK in your Web applications and projects.

## Create an account

The first thing to do is to [create an account](https://developer.kandy.io/signup). This should take no more than 5 minutes.

## Creating a project

After creating an account, login at developer.kandy.io .
Create a project by entering a **Name** and a **Domain**.

## Add Kandy Script to your page

To begin, you will need to include the Kandy Javascript library in your **HTML** page:

```<script src="https://kandy-portal.s3.amazonaws.com/public/javascript/kandy/2.5.0/kandy.js"></script>```

With this, you will have a global object `kandy` in your Javascript environment.The library, `kandy.js`, includes the functions you will call to make voice and video calls, manage address books, send/receive instant messages, share data in group sessions, and more. A minified version of `kandy.js`, `kandy.min.js`, is available at:

```<script src="https://kandy-portal.s3.amazonaws.com/public/javascript/kandy/2.5.0/kandy.min.js" ></script>```

## The API Key

You will need to use the API key in the script of your HTML page. **Note** that you should use the **Project API key** and not the **Account API key**.

![API Key](https://gb-kandy-portal-production.s3.amazonaws.com/uploads/documentation_resource/file/380/exampleDevDashboard.png)

You should **never** include **Secret API keys** in your client-side application. Only trusted application servers should have secret keys as they permit you to perform destructive actions like deleting users.

# Now with using Javascript for Video Calls

You need to use functions of Kandy specific to video calls for this. This includes a number of function which are explained below.

Declare a variable for  your projectAPIKey
```
        projectAPIKey = "#projectAPIKey";

```
Setting up Event handler for a successful login.
```

		function onLoginSuccess() {
		    console.log("Login was successful.");
        if(toCall) {
          $("#initialize-call-btn").click();
        }
		}
```
Setting up Event handler for a failed login.
```

		function onLoginFailure() {
		    console.log("Login failed. Make sure you input the user's credentials!");
		}
```

Set up a SaveData function (Useful if you have a login page) The AccessToken feature doesn't work well. Logging in a person again before we initiate a call is a good method to follow.
```        
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
```
Setup a loadData() function to log the use in again using values stored in local storage by storeData function.
```

        function loadData() {
        document.getElementById('proceed').style.visibility = "hidden";
        document.getElementById('question').style.visibility = "hidden";
		   var account = localStorage.getItem('_account');
		   if (!account)
		   {
         console.log("Error retrieving");
		   }
		   else
		   {
          //decodes a string data encoded using base-64
          account = atob(account);
          //parses to Object the JSON string
          account = JSON.parse(account);
          //do what you need with the Object
          username=account.User;
          password=account.Pass;
        }
        console.log("loading "+username+" "+password);
        $('#username').text(username);
        document.getElementById("username_span").innerHTML=username;
        kandy.login(projectAPIKey, username, password, onLoginSuccess, onLoginFailure);

}  
window.onload = loadData;
//Call the loadData() function on the completion of loading of webpage```

Include the following code to incorporate the ringing sounds on your system when you receive a call.
```
var $audioRingIn = $('<audio>', { loop: 'loop', id: 'ring-in' });
      var $audioRingOut = $('<audio>', { loop: 'loop', id: 'ring-out' });

      // Load audio source to DOM to indicate call events
      var audioSource = {
        ringIn: [
          { src: 'https://kandy-portal.s3.amazonaws.com/public/sounds/ringin.mp3', type: 'audio/mp3' },
          { src: 'https://kandy-portal.s3.amazonaws.com/public/sounds/ringin.ogg', type: 'audio/ogg' }
          ],
        ringOut: [
          { src: 'https://kandy-portal.s3.amazonaws.com/public/sounds/ringout.mp3', type: 'audio/mp3' },
          { src: 'https://kandy-portal.s3.amazonaws.com/public/sounds/ringout.ogg', type: 'audio/ogg' }]
      };

      audioSource.ringIn.forEach(function(entry) {
        var $source = $('<source>').attr('src', entry.src);
        $audioRingIn.append($source);
      });

      audioSource.ringOut.forEach(function(entry) {
        var $source = $('<source>').attr('src', entry.src);
        $audioRingOut.append($source);
      });
```
To setup Kandy API for video chatting, include the following configuration.
```
        kandy.setup({
          // Registers the DOM-elements of ID "incoming-video" and "outgoing-video" to Kandy's Video Chat API

          remoteVideoContainer: $('#incoming-video')[0],
          localVideoContainer: $('#outgoing-video')[0],
          // listeners registers events to handlers
          // You can handle all Kandy Events by registering it here
          listeners: {
            callinitiated: onCallInitiate,
            callinitiatefailed: onCallInitiateFail,
            callincoming: onCallIncoming,
        	callestablished: onCallEstablished,
            oncall: onCall,
            callended: onCallTerminate,
            callendfailed: onCallEndedFailed
          }
        });
```

Following is the code for making changes to your UI according to different states of the call viz. onCall(), onCallEstablished() etc.

```
       var username, UIState = {};

      UIState.authenticated = function() {
        $('#login-form').addClass('hidden');
        $('#logged-in').removeClass('hidden');
        $('.username').text(username);
      };

      UIState.unauthenticated = function() {
        $('#login-form').removeClass('hidden');
        $('#logged-in').addClass('hidden');
        $('.username').text('');
      };

      UIState.initial = function() {
        console.log('initial');

        $audioRingIn[0].pause();
        $audioRingOut[0].pause();

        $('#call-form p, #incoming-call p, #call-connected p').text('');
        $('#incoming-call, #call-connected, .call-terminator, #resume-call-btn').addClass('hidden');
        $('#call-form, .call-initializer').removeClass('hidden')
      };

      var toCall = false;
```
Setting up Event handler for Initiating a Call.
```

      function onCallInitiate(call) {
        callId = call.getId();

        $audioRingIn[0].pause();
        $audioRingOut[0].play();

        $('#username-calling').text('Calling ' + $('#user_to_call').val());
        UIState.callinitialized();
      }

```
Setting up Event handler on Failure of a Call.
```
      function onCallInitiateFail() {
        console.log("call initiate fail");

        $audioRingOut[0].pause();
        UIState.initial();
        alert('call failed');
      }

      UIState.callinitialized = function() {
        console.log("Call Initialised");

        $('.call-initializer').addClass('hidden');
      };
```
Setting up Event handler for onClick event of Call Button.
```
      $('#initialize-call-btn').on('click', function() {
        var username = $('#user_to_call').val();
```
Incorporating Kandy APIs makeCall() method used to make a call.
```
        kandy.call.makeCall(username, true);
      });
        // Event handler for oncall event
      function onCall(call) {
        console.log("OnCall");
        $audioRingOut[0].pause();
        UIState.oncall();
      }
```
Setting up Event handler for Call Ended event.
```
      function onCallTerminate(call) {
        console.log("Cancelled");
        callId = null;

        $audioRingOut[0].play();
        $audioRingIn[0].pause();

        UIState.initial();
      }

```
Setting up Event handler for handling an incoming call.
```
		function onCallIncoming(call) {
		    console.log("Incoming call from " + call.callerNumber);

		    // Store the call id, so the callee has access to it.
		    callId = call.getId();
		    kandy.call.answerCall(callId, true);

		    // Handle UI changes. A call is incoming.
		    document.getElementById("accept-call").disabled = false;
		    document.getElementById("decline-call").disabled = false;

		}
```
Setting up Event handler if the call has been established.
```
		function onCallEstablished(call) {
		    console.log("Call established.");

		    // Handle UI changes. Call in progress.
		    document.getElementById("make-call").disabled = true;
		    document.getElementById("mute-call").disabled = false;
		    document.getElementById("hold-call").disabled = false;
		    document.getElementById("end-call").disabled = false;
		}

```
Setting up Event handler if the Call Fails.
```

        function onCallEndedFailed() {
           console.debug('callendfailed');
           callId = null;
        }
```


This completes the javascript part of the tutorial.

Now lets move on to **HTML**.
The given below code includes all classes required to make the above javascript work.
```
<head>
<!--Load Bootstrap CSS-->
    <link rel="stylesheet" media="screen" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css" />
    <link rel="stylesheet" media="screen" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap-theme.min.css" />

    <!--Load Kandy JS files --><script src="https://code.jquery.com/jquery-1.7.2.min.js"></script>
    <script src="https://kandy-portal.s3.amazonaws.com/public/javascript/kandy/2.5.0/kandy.js"></script>
</head>
  <body>
    <div class="container">
      <div class="row">
        <div class="col-xs-8 col-xs-offset-2" id="activity-container">

          <div class="visible" id="logged-in">
            <hr />
            <div class="clearfix">
              <p class="h4 pull-left">
                <strong><span id="username_span" class="username"></span></strong>
              </p>
              <button class="btn btn-danger pull-right" id="logout-btn">Logout</button>
            </div>
            <hr />
            <div id="video-container">
              <h3>
                Video
              </h3>
              <div class="row">
                <div class="col-sm-6">
                  <div class="video" id="incoming-video"></div>
                </div>
                <div class="col-sm-6">
                  <div class="video" id="outgoing-video"></div>
                </div>
              </div>
            </div>
            <hr /><div id="call-form">
              <h4>
                Make a Call
              </h4>
              <p id="username-calling"></p>
              <div class="form-group call-initializer">
                <label for="user_to_call">Enter Callee Username</label>
                <input type="text" name="user_to_call" id="user_to_call" class="form-control" placeholder="name@company.com" />

              </div>
              <div class="form-group call-initializer">
                <button class="btn btn-success" id="initialize-call-btn">Call</button>
              </div>
              <div class="form-group call-terminator hidden">
                <button class="btn btn-danger" id="initialize-end-btn">End Call</button>
              </div>
            </div><div class="hidden" id="call-connected">
              <h4>
                Call Connected
              </h4>
              <p id="username-connected"></p>
              <div class="btn-toolbar">
                <button class="btn btn-danger" id="end-call-btn">End Call</button><button class="btn btn-warning" id="hold-call-btn">Hold Call</button><button class="btn btn-success hidden" id="resume-call-btn">Resume Call</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  </body>
```
