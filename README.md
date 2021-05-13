# webshop
 MB's webbshop  
 http://ec2-13-48-85-50.eu-north-1.compute.amazonaws.com:8181/  
 
A demo web shop built with React, Server-Side Rendering, NodeJS, GraphQL, MongoDB, Webpack, jsonwebtokens.

For the client side i used functional components with Hooks. Instead of using Redux i used a combination of useReducer, useContext, Router v5 and Hooks.  
-Hooks\
-useReducer\
-useContext\
-Router v5  

The server is an Express server on NodeJS. It serves static pages with server-side rendering, before the client takes over, using StaticRouter. It uses jsonwebtokens for authentication of admin commands.  
-NodeJS\
-Express\
-StaticRouter  

It uses a MongoDB and i use GraphQL for most of the requests. The database is very small so i decided to use vanilla GraphQL instead of Apollo.  
-MongoDB\
-GraphQL  

There are no sessions. Normal users login with password that is hashed in the database. Their user info is then stored in the client and in localstorage until they log out. Admins receive a jsonwebtoken when logging in that is checked on every request to the server. Their info is not stored in local storage. There is protected routing for the admin page although it should be more secure on the client side.  
-Login\
-hashed password\
-Local storage\
-jsonwebtokens  

Things yet to be implemented\
-a checkout page\
-animation for frontpage carousel\
-a seller's page\
-more form validation\
-more secure admin check on client side  

--------------------------------------------------------------------------------------------------------  
En fiktiv webbshop byggd som arbetsprov gjord med React, Server-Side Rendering, NodeJS, GraphQL, MongoDB, Webpack, jsonwebtokens.

I klientdelen använder jag functional components med Hooks. Istället för Redux använder jag useReducer, useContext, Router v5 och Hooks tillsammans.\
-Hooks\
-useReducer\
-useContext\
-Router v5  

Servern är en Express-server i NodeJS. Den levererar statiska sidor med server-side rendering, innan klienten tar över, och använder StaticRouter.  
-NodeJS\
-Express\
-Server-side Rendering\
-StaticRouter  

Appen använder MongoDB med GraphQL för de flesta requests. Databasen är väldigt liten så jag använder ren GraphQL istället för att använda Apollo.  
-MongoDB\
-GraphQL  

Appen använder inga sessions. Vanliga användare loggar in med lösenord som är hashat i databasen. Dens info sparas sen i localstorage tills de loggar ut. Admins får en jsonwebtoken när de loggar in som kollas varje gång de utför ett kommando mot servern. Deras info sparas inte i localstorage. Routing till adminsidan är skyddad även om det kunde varit hårdare koll i klienten.  
-Login\
-hashed password\
-Local storage\
-jsonwebtokens  


