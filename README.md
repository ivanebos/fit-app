# Log Fit
## Table of Contents
1. [About the App](#about)  
2. [Pages](#pages)  
   a. [Login/Signup](#login)  
   b. [Home](#home)  
   c. [Routines](#routines)  
   d. [Stats](#stats)  
   
<a name="about"></a>
##  About the App 
Created **MERN** Stack application offering users a platform to manage workout routines and track their fitness journey while providing insightful statistics on their progress.

To ensure user data security, I've implemented web token-based user authentication

[Check it Out](https://logfit.netlify.app/)

[![Netlify Status](https://api.netlify.com/api/v1/badges/aff0e34c-55e4-4e6c-b331-6674ad82e822/deploy-status)](https://app.netlify.com/sites/logfit/deploys)


### Built With
- **React.js**: Frontend Framework
- **Tailwind CSS**: Styling Framework
- **Node.js**: Backend Framework
- **Express.js**: Backend Framework
- **MongoDB**: Database
- **Postman**: Test API Endpoints
- **Web Tokens**: User Authentication
- **RESTful API**: Data Management
- **Netlify**: Frontend Host
- **Render**: Backend Host
  
<a name="pages"></a>
## Pages 
### Login/Signup
**Description:** Login and Signup provides strong user authentication and security to protect each user's personal data. 
**Functions:**
- Signup: you can create an account using a valid email that has not been used to create an account before and a password deemed strong
- Login: using your email and password associated to your account you can log in to the application to access your data and the rest of the application

**Example:**
<a name="login"></a>
### Home
**Description:** The Home page displays all logged workouts for the month. displaying the routine colour in the calendar to see what your workout split looks like.

**Function:** You are able to log a routine of all routines you have created on any selected day. 

<a name="routines"></a>
### Routines
**Description:** 
- Routine page displays all created routine and routine attributes 
- A routine consists of a title, colour and list of exercises

**Functions:**
- You can create new routines with customized value. Note no option can be left blank
- You are able to edit all existing routines
- You are able to delete all existing routines

<a name="stats"></a>
### Stats
**Description:** Stats page consists of many statistics derived from your logged routines
