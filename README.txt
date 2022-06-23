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