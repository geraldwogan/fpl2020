# fpl2020

This assignment (CA2-Website) uses React to render components, a Rest API for data fetching and originally, xampp as a web server, as of summer 2022, SQL server was being used instead when running this locally.

Home page for this project is: http://localhost:3000/routes.html

## How I setup up this project again after college.

### React

- Install Node.js from here -> https://nodejs.org/en/download/
Angular requires a relatively up-to-date LTS version of node. 

- Install Node Package Manager (npm), this is already installed when Node.js is installed.

### REST API

- Install MySQL from here -> https://dev.mysql.com/downloads/windows/installer/8.0.html
    - I installed Server and Workbench
    - Server
        - Configure this with legacy security (password = `root`)
        - When installation and configuration is complete the server should automatically be running on the port you chose (I chose 3306, this is the default)
    - Workbench
        - Will automatically detect the above server. 
        - Click into this and run your SQL script (fpl2020\fpl2020_restapi\model\fpl2020y3.sql) to create all SQL resources.

- Install Express: npm install express

- Navigate to restapi directory in cmd and run -> `node index.js` or preferably `nodemon index.js`

## Old README.txt - from when I first completed this assignment in Winter 2020

===How to run everything needed for a2 assignment===

Note to Self:

This assignment (CA2-Website) uses React to render components, a Rest API for data fetching and xampp as a web server.

You need three Command Prompts to run everything.

--- 1. Run xampp
C:\Users\Gerald>F:
F:\>cd xampp
F:\xampp>xampp_start.exe

--- 2. Run Rest API server 
if index.js file is here -> C:\Users\Gerald\a2\fpl2020_restapi\index.js
C:\Users\Gerald>cd a2
C:\Users\Gerald\a2>cd fpl2020_restapi
C:\Users\Gerald\a2\fpl2020_restapi>nodemon index.js
OR 
C:\Users\Gerald\a2\fpl2020_restapi>node index.js

--- 3. Run React
if React folder is here -> C:\Users\Gerald\a2\fpl2020_react\index.js
C:\Users\Gerald>cd a2
C:\Users\Gerald\a2>cd fpl2020_react
C:\Users\Gerald\a2\fpl2020_react>npm start

React will open up a tab in the default web browser
http://localhost:3000

Home page for this project is: http://localhost:3000/routes.html

To recreate the a2 folder. 
1. Copy & Paste fpl2020_restapi folder in.
2. Create new React project inside a2 called fpl2020_react and paste the public folder inside that.
	C:\Users\Gerald>cd a2
	C:\Users\Gerald\a2>npx create-react-app fpl2020_react
	C:\Users\Gerald\a2>cd fpl2020_react
	C:\Users\Gerald\a2\fpl2020_react>npm start