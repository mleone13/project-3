const PORT = 3001
const express = require('express')
const { MongoClient } = require('mongodb')
const { v4: uuidv4 } = require('uuid')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const bcrypt = require('bcrypt')
require('dotenv').config()

const uri = process.env.URI

const app = express()
app.use(express.urlencoded({ extended: false }));
app.use(express.json())


const path = require('path');
// import ApolloServer
const { ApolloServer } = require('apollo-server-express');
const { authMiddleware } = require('./utils/auth');
// import our typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');


// create a new Apollo server and pass in our schema data
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
});



app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
    await server.start();
    // integrate our Apollo server with the Express application as middleware
    server.applyMiddleware({ app });

    // Serve up static assets
    //this and appget for concurrent
    //First, we check to see if the Node environment is in production. 
    //If it is, we instruct the Express.js server to serve any files in the 
    //React application's build directory in the client folder. We don't have 
    //a build folder yet—because remember, that's for production only!

    //The next set of functionality we created was a wildcard GET route for 
    //the server. In other words, if we make a GET request to any location on 
    //the server that doesn't have an explicit route defined, respond with the 
    //production-ready React front-end code.
    if (process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '../client/build')));
    }

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build/index.html'));
        // res.set('Access-Control-Allow-Origin', '*');
        // res.send({ "msg": "This has CORS enabled 🎈" })
    });

    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`API server running on port ${PORT}!`);
            // log where we can go to test our GQL API
            console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
        })
    })
};

// Call the async function to start the server
startApolloServer(typeDefs, resolvers)