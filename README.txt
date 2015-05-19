GARAGE WEB APPLICATION
author: Christian Palazzo
email: palazzochristian@yahoo.it

DESCRIPTION
The web application is designed in order to meet the requirements of the assigment in the simplest way (i.e. there are no logs or error handling,form validations are implemented only frontend), I gave precedence to the time of realization. 
The application needs Node.js to run on your client, for further informations: https://nodejs.org/

RUN INSTRUCIONS
1) install Node.js on your client if not already installed
2) open a shell and go to the root directory of the Garage Web Application
3) type the command: node index.js
   in some Linux environments (i.e. Ubuntu) the command is: nodejs index.js
4) open a browser and go to http://localhost:3000

IMPORTANT
 - the Garage Web Application uses a remote MongoDB database-as-service, for a correct operation of the application the client needs an internet connection.

 - if the node command is not recognized by your system check whether the Node.js application path is set in the environmental variable of the OS (Windows). In Linux OS if you install Node.js through the official repository for your distribution you should not have problems. 


NOTES:
 if you want to take a look to the raw data stored in the database, run the application, open a browser and go to:
  - http://localhost:3000/list    (vehicles)
  - http://localhost:3000/levels  (levels, number of slots per level, slots available)
  - http://localhost:3000/types   (vehicle types)       

The application is highly configurable: it is possible to add, remove or modify in the database:
- levels;
- slots per level; 
- vehicle types;
- and of course vehicle items; 

the application will show the data dinamically. When a vehicle is added or removed the available slots are updated.
Moreover, the application is responsive, I wrote CSS from scratch without use of any CSS framework, try to resize your browser window. 
Unfortunately it was not possible to test the application on real devices, I used the emulators available on Google Chrome developers tools bar.

the 3 filters search, levels and type work togheter with an AND logic, while every single filter works with an OR logic. 

