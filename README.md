# myGarage
A Node.js-Express-MongoDB-AngularJS-jQuery Web Application

GARAGE WEB APPLICATION
author: Christian Palazzo
email: palazzochristian@yahoo.it

DESCRIPTION
The web application backend is implementented in Node.js, persistant data are stored in a MongoDB database. The frontend is developed in AngularJS, jQuery, HTML5, CSS3. No CSS frameworks used.  
The application needs Node.js and npm to run on your client, for further informations: https://nodejs.org/ and https://www.npmjs.com/ 

RUN INSTRUCIONS
- install Node.js on your client if not already installed (npm will be installed with Node.js)
- clone the project
- open a shell and go to the root directory of the Garage Web Application
- install the dependencies with the command: npm install
- the application is designed to run on Heroku hosting, to run locally on your machine you need to modify the file /static/js/services.js in order to implement local host and port for database data calls (look comments in the file)
- type the command: node
- in some Linux environments (i.e. Ubuntu) the command is: nodejs
- open a browser and go to http://localhost:3000

IMPORTANT
 - the Garage Web Application uses a remote MongoDB database-as-service, for a correct operation of the application the client needs an internet connection without use of HTTP proxy.

 - if the node command is not recognized by your system check whether the Node.js application path is set in the environmental variable of the OS (Windows). In Linux OS if you install Node.js through the official repository for your distribution you should not have problems.

NOTES:
 if you want to take a look to the raw data stored in the database, run the application, open a browser and go to:
  - http://localhost:3000/list    (vehicles)
  - http://localhost:3000/levels  (levels, number of slots per level, available slots)
  - http://localhost:3000/types   (vehicle types)

The application is highly configurable: if you add, remove or modify in the database:

- levels;
- slots per level; 
- vehicle types;
- and of course vehicle items; 

the application will show the data dinamically. When a vehicle is added or removed from the frontend, the available slots per level of the garage are updated.

Moreover, the application is responsive, I wrote CSS from scratch without use of any CSS framework, try to resize your browser window. 

Finally, the 3 filters search, levels and type work togheter with an AND logic, while each single filter works with an OR logic.

Actually the application is at version 1.1 and presents some bugs to fix. 