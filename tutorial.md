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
