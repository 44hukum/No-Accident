const express = require("express");
const expressSession = require("express-session");
const layouts = require('express-ejs-layouts');
// const csrf = require('csurf');
const app = express();
const http = require('http');
const server = http.createServer(app);

/**
 *  SocketIO
 */
 const { Server } = require('socket.io');
 const io = new Server(server);

const router = require("./routes/web");
const router2 = require("./routes/package");


app.set("view engine", "ejs");
const port = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: false })); //parse url encoded data
app.use(express.json()); //parse json encoded data\
app.use(express.static("public"));
app.use(layouts);
app.set('layoout','layouta','layoutb')

// /** USING CSRF */
// // app.use(csrf({cookie: true}))
// // app.use((req, res, next) => {
// //   res.locals._csrfToken = req.csrfToken()
// //   next()
// //   })
  
/** Working with session */


app.use(
  expressSession({
    secret: "helloworld",
    resave: true,
    cookie: {
      secure: false,
     },
    saveUninitialized: true,
  })
);

app.use("", router);
app.use("/package", router2);



/** Listen to the server */

io.on('connection', (socket) => {
  socket.on('temperature',(temperature)=>{
    io.emit('temperature',temperature);     //need to clean it
  })

  socket.on('data',(data)=>{
     io.emit('data',data);     //need to clean it
  })
});





server.listen(port, (err) => {
  if (err) {
    console.log("err", err);
  }
  console.log(`http://localhost:${port}`);
});


/**
 *  Database connection
 */

const mongoose = require("mongoose");
const e = require("express");

//Set up default mongoose connection
let mongoDB = "mongodb://localhost:27017/no_accident";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

//Get the default connection
let db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));


