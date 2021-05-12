# webshop
 MB's web shop
A demo web shop built with React, Server-Side Rendering, NodeJS, GraphQL, MongoDB, Webpack, jsonwebtokens.

For the client side i used functional components with Hooks. Instead of using Redux i used a combination of useReducer, useContext, Router v5 and Hooks.
-Hooks
-useReducer
-useContext
-Router v5

The server is an Express server on NodeJS. It serves static pages with server-side rendering, before React takes over on the client side, using StaticRouter. It uses jsonwebtokens for authentication of admin commands.
-NodeJS
-Express
-StaticRouter

It uses a MongoDB and i use GraphQL for most of the requests. The database is very small so i decided to use vanilla GraphQL instead of Apollo.
-MongoDB
-GraphQL

There are no sessions. Normal users login with password that is hashed in the database. Their user info is then stored in the client and in localstorage until they log out. Admins receive a jsonwebtoken when logging in that is checked on every request to the server. Their info is not stored in local storage. There is protected routing for the admin page although it should be more secure on the client side.
-Login
-hashed password
-Local storage
-jsonwebtokens
