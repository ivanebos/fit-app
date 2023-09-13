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

### Bulit With
- **React.js**: Frontend Framework
- **Tailwind CSS**: Styling Framework
- **Node.js**: Backend Framework
- **Express.js**: Backend Framework
- **MongoDB**: Database
- **Postman**: Test API Endpoints
- **Web Tokens**: User Authentication
- **RESTful API**: Data Management
  
<a name="pages"></a>
## Pages 
### Login/Signup
**Descirption:** Login and Signup provides strong user authentication and secerity to protect each users pernonal data. 
**Functions:**
- Signup: you can create an accouting using a valid email that has not been used to create an accout before and a password demed strong
- Login: using your email and password assosiated to your account you can log in to the application to access your data and the rest of the application

**Example:**
<a name="login"></a>
### Home
**Descirption:** Home page displays all loged workouts for the month. displaying the routine colour in the calendar to see what your workout split looks like.

**Function:** you are able to log a routine of all routines you have created on any selected day. 

**Example:**

<a name="routines"></a>
### Routines
**Description:** 
- Routine page displays all created routine and routine attributes 
- A routine consists of a title, colour and list of exserises

**Functions:**
- You can create new routines with customized value. Note no option can be left blank
- You are able to edit all exsisting routines
- You are able to delete all exsisting routines

**Example:**

<a name="stats"></a>
### Stats
**Description:** Stats page consist of many statisitics derived from your loged routines
**Example:**
