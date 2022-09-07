const express = require("express");
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');
const isAuth = require("./is_auth");
const cookieParser = require("cookie-parser");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const multer = require('multer');
const myenv = require('dotenv').config()

var serviceAccount = require('./admin.json');
const { getNextKeyDef } = require("@testing-library/user-event/dist/keyboard/getNextKeyDef");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.dburl,
    authDomain: process.env.authdomain,
});

var db = admin.database();

const app = express();

const transporter = nodemailer.createTransport(sendgridTransport({
  auth: {
    api_key: process.env.mailkey
  }
}));

const fileStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './images')
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now())
  }
});

var upload = multer({storage: fileStorage});

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json())

app.use(cookieParser());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods',
                  'GET, POST, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
})

app.use("/login", async (req, res) => {
  var usernameIsCorrect = false;
  var passwordIsCorrect = false;
  var email;

  await db.ref("users").once('value', function(snap){
    snap.forEach(function(childNodes){
        if(childNodes.val().username === req.body.username && childNodes.val().password === req.body.password ) {
            usernameIsCorrect = true;
            passwordIsCorrect = true;
            email = childNodes.val().email;
        }
  })
  })

  if(usernameIsCorrect && passwordIsCorrect){
    const token = jwt.sign({username: req.body.username}, "asecrettoken", {expiresIn: "1h"});
    res.cookie('token', token, { httpOnly: true }).json({loggedIn: true, currentUser: req.body.username, email: email});
  }
  else{
    res.json({loggedIn: false});
  }

})

app.use("/register", async (req, res) => {
  var exist = false;
  await db.ref("users").once('value', function(snap){
    snap.forEach(function(childNodes){
        if(childNodes.val().username === req.body.username) {
            exist = true;
        }
   })
  })

  if(!exist){
    await db.ref("users").push().set({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    })
    // transporter.sendMail({
    //   to: req.body.email,
    //   from: 'janakan2002@gmail.com',
    //   subject: "User Registered",
    //   html: "<div style='background-color: orange; height: 100px; font-size: 30px'><b>MyPet</b></div><h1>Hi there! This is a confirmation from MyPet that you have registered.</h1><img src='https://www.cdc.gov/healthypets/images/covid/dog-and-cat.jpg?_=46111'/>"
    // }).catch(err => {
    //   console.log(err);
    // })
  }
  res.json({userExists: exist});
  
}) 
app.use("/viewpets", isAuth, (req, res) => {
    const currentPets = [];
    db.ref("pets").on('value', function(snap){
        snap.forEach(function(childNodes){
            if(childNodes.val().username === req.username) {
                currentPets.push({
                    id: childNodes.key,
                    pet: childNodes.val().pet,
                    breed: childNodes.val().breed,
                    name: childNodes.val().name,
                    age: childNodes.val().age,
                    weight: childNodes.val().weight,
                    file: childNodes.val().file,
                });
            }
       })
     })
     

    res.json({ pets: currentPets });
  })

  app.use("/viewappts", isAuth, (req, res) => {
    const currentAppts = [];
    db.ref("appointments").on('value', function(snap){
        snap.forEach(function(childNodes){
            if(childNodes.val().username === req.username) {
                currentAppts.push({
                    id: childNodes.key,
                    name: childNodes.val().name,
                    date: childNodes.val().date,
                    time: childNodes.val().time,
                    type: childNodes.val().type,
                });
            }
       })
     })
     

    res.json({ appts: currentAppts });
  })

  app.use("/deleteappt/:id", isAuth, async (req, res) => {
    if(req.username) {
      await db.ref("appointments").on('value', function(snap){
        snap.forEach(function(childNodes){
            if(childNodes.key === req.params.id) {
              db.ref('appointments').child(childNodes.key).remove();
            }
        })
      })
      // transporter.sendMail({
      //   to: req.body.email,
      //   from: 'janakan2002@gmail.com',
      //   subject: "Appointment Cancelled",
      //   html: "<div style='background-color: orange; height: 100px; font-size: 30px'><b>MyPet</b></div><h1>Hi there, this is a confirmation from MyPet that you have cancelled an appointment.</h1><img src='https://www.cdc.gov/healthypets/images/covid/dog-and-cat.jpg?_=46111'/>"
      // }).catch(err => {
      //   console.log(err);
      // })
      res.json({message: "Deleted"});
    }
    else {
      res.json({message: "Not Deleted"});
    }
    
  })

  app.use("/deletepet/:id" , isAuth, async (req, res) => {
    var name;
    if(req.username) {
      await db.ref("pets").on('value', function(snap){
        snap.forEach(function(childNodes){
            if(childNodes.key === req.params.id) {
                name = childNodes.val().name;
            }
       })
     })
     await db.ref('pets').child(req.params.id).remove();
      await db.ref("appointments").on('value', function(snap){
        snap.forEach(function(childNodes){
            if(childNodes.val().name === name) {
              db.ref('appointments').child(childNodes.key).remove();
              // transporter.sendMail({
              //   to: req.body.email,
              //   from: 'janakan2002@gmail.com',
              //   subject: "Appointment Cancelled",
              //   html: "<div style='background-color: orange; height: 100px; font-size: 30px'><b>MyPet</b></div><h1>Hi there, this is a confirmation from MyPet that you have removed a pet and all appointments for that pet will be cancelled.</h1><img src='https://www.cdc.gov/healthypets/images/covid/dog-and-cat.jpg?_=46111'/>"
              // }).catch(err => {
              //   console.log(err);
              // })
            }
       })
     })

      res.json({message: "Deleted"});
    }
    else {
      res.json({message: "Not Deleted"});
    }
    
  })

  app.use("/getnames", isAuth, (req, res) => {
    const petNames = [];
    db.ref("pets").on('value', function(snap){
      snap.forEach(function(childNodes){
          if(childNodes.val().username === req.username) {
              petNames.push(childNodes.val().name);
          }
     })
   })
    res.json({names: petNames});
  })

app.use("/addappt", isAuth, (req, res) => {
    if(req.username) {
       db.ref("appointments").push().set({
        username: req.body.username,
        name: req.body.name,
        date: req.body.date,
        time: req.body.time,
        type: req.body.type,
      })
      // transporter.sendMail({
      //   to: req.body.email,
      //   from: 'janakan2002@gmail.com',
      //   subject: "Appointment Scheduled",
      //   html: "<div style='background-color: orange; height: 100px; font-size: 30px'><b>MyPet</b></div><h1>Hi there, this is a confirmation from MyPet that you have booked an appointment.</h1><img src='https://www.cdc.gov/healthypets/images/covid/dog-and-cat.jpg?_=46111'/>"
      // }).catch(err => {
      //   console.log(err);
      // })
      res.json({succeeded: true});
    }
    else {
      res.json({succeeded: false});
    }
    
  }) 

  app.use("/addpet", upload.single('vacfile'), isAuth, (req, res) => {
    if(req.username) {
       db.ref("pets").push().set({
        username: req.body.username,
        pet: req.body.pet,
        breed: req.body.breed,
        name: req.body.name,
        age: req.body.age,
        weight: req.body.weight,
        file: req.body.file
      })
      res.json({succeeded: true});  
    }
    else {
      res.json({succeeded: false}); 
    }
    
  }) 
  
  app.use("/isloggedin", isAuth, (req, res) => {
    if(req.username) {
      res.json({loggedIn: true});
    }
    else {
      res.json({loggedIn: false});
    }
    
  })

  app.use("/notloggedin", isAuth, (req, res) => {
    res.clearCookie("token").json({message: "Logged out"});
  })

app.listen(3001);