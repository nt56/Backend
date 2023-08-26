//steps for creating express
//1. create a folder
//2. open with terminal that folder
//3. npm init -y
//4. open folder in VS Code
//5. npm i express
//6. create server.js file

//parsing --> getting or fetching the data

//creating express instance and giving name 'app'
const express = require('express');
const app = express();

//used to parse req.body in express --> PUT or POST
const bodyParser = require('body-parser');  
//specially parse JSON data & add it to the request.body object
app.use(bodyParser.json())  

//activate the server on 3000 port
app.listen(3000, () => {
    console.log("Your Server Started at port no. 3000");
})

//Routes ---> We used get() request on app and sending the response
app.get('/', (req,res) => {
    res.send("Hello");
})

//creating own route and defining the behaviour of the route
app.post('/api/cars', (request,response) => {
    const {name, brand} = request.body; //with the help of destructering we takeout name and brand from request body
    console.log(name);
    console.log(brand);
    response.send("Car Submitted Successfully....");
})

//connecting mongodb with express
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/myDatabase', {
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(() => {console.log("Connection Successfully...")})
.catch((error) => {console.log("Received An Error")});