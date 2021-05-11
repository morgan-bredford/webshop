import express from 'express'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import App from '../client/App'
import path from "path"
import html from './utils/html'
import ServerApp from './ServerApp'
import { StaticRouter } from 'react-router'
import mongoose from 'mongoose'
import cors from 'cors'
import { graphqlHTTP } from 'express-graphql'
import dbRouter from './database/db'
import { validateToken } from './utils/jwt'
import schema from './database/graphql.schema'
import Product from './database/product.model'
import { URL } from '../url'
import axios from 'axios'

require("dotenv").config()

const app = express()
app.use(express.json())
app.use(cors())
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))
app.use("/db", dbRouter)
app.use(express.static(path.resolve(__dirname, '..', 'public')))

app.listen(8181, () => console.log('server running'))

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
})

let state = {
    email: '',
    firstname: '',
    lastname: '',
    adress: '',
    id: '',
    loggedIn: false,
    admin: false
}

app.get('/', (req,res) => {
    return res.send( html(ReactDOMServer.renderToString(
        <ServerApp  url={req.url}/>
    ), state) )
})

app.get('/login', (req,res) => {
    state = {...state, ltest: 'ltest'}
    return res.send( html(ReactDOMServer.renderToString(
        <ServerApp  url={req.url}/>
    ), state) )
})

app.get('/admin', validateToken, (req,res) => {
    return res.send( html(ReactDOMServer.renderToString(
        <ServerApp  url={req.url} />
    ), state) )
})

app.get('/register', (req,res) => {
    return res.send( html(ReactDOMServer.renderToString(
        <ServerApp  url={req.url} />
    ), state) )
})

app.get('/category', (req,res) => {
    const { category } = req.query
    state = {...state, current_category: category}
    return res.send( html(ReactDOMServer.renderToString(
        <ServerApp  url={req.url} state={state} />
    ), state) )
})

app.get('/search', (req,res) => {
    const { search } = req.query
    state = {...state, current_search: search}
    return res.send( html(ReactDOMServer.renderToString(
        <ServerApp  url={req.url} />
    ), state) )
})

app.get('/userpage', (req,res) => {
    return res.send( html(ReactDOMServer.renderToString(
        <ServerApp  url={req.url} />
    ), state) )
})

app.get('/products/:productId', (req,res) => {
    const { productId } = req.params
    axios
        .post( URL + "/graphql", {query : `
        {
            product(_id: "${productId}") {
                _id,
                name,
                category,
                price,
                quantity,
                image,
                description,
                seller {
                    name,
                }
            }
        }`})
        .then((resx) => {
            state = { ...state, current_product: resx.data.data.product }
            return res.send( html(ReactDOMServer.renderToString(
                <ServerApp  url={req.url} state={state} />
            ), state) )
        })
        .catch(err => {
            res.status(400).json({ error: "Product Doesn't Exist" })
        })
})





app.get('/*', (req,res) => {
    return res.send( html(ReactDOMServer.renderToString(
        <ServerApp  url={req.url}/>
    ), state) )
})