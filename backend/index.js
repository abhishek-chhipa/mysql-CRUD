const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const mysql = require("mysql2");
const app = express();
const port = 3000;

app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

app.use(bodyparser.json());


// SET UP DATABASE
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "exampledb",
  port: 3306,
});

// Connect to the database

db.connect((err) => {
  if (err) console.log(err, "dbError");
  else console.log("DB connection established");
});



// get all users
app.get("/user", (req, res) => {
  // Write out the query
  let qr = `select * from users`;
  // use the query string
  db.query(qr, (err, result) => {
    if (err) console.log(err, "query error message");
    if (result.length > 0) {
      res.send({
        message: "All users",
        data: result,
      });
    }
  });
});

// get user by id
app.get('/user/:id', (req, res) => {
  // store the request user id
    let gID = req.params.id;
    let qr = `select * from users where id = ${gID}`;
    db.query(qr, (err, result) => {
      if (err) console.log(err, "query error message");
      if (result.length > 0) {
        res.send({
          message: "single user",
          data: result,
        });
      }else{
        res.send({
          message: "No user found",
          data: result,
        });
      }
    });
})

// POST (CREATE) users

app.post('/user',(req,res) => {
    console.log(req.body, "createdata");
    let fName = req.body.fullname;
    let eMail = req.body.email;
    let mobile = req.body.mobile;

    let qr = `insert into users(fullname,email,mobile)
                values('${fName}','${eMail}','${mobile}')`;
    
    db.query(qr,(err,result)=> {
        if(err) console.log(err,"insert error");
        console.log(result, "result");

        res.send({
            message: "User created",
        })
    })
})


// PUT (UPDATE) single user data
app.put('/user/:id',(req,res)=>{
    console.log(req.body, "Update user");
    let gID = req.params.id;
    let fName = req.body.fullname;
    let eMail = req.body.email;
    let mb = req.body.mobile;

    let qr = `update users set fullname = '${fName}', email = '${eMail}', mobile = '${mb}'
              where id = ${gID}`;
    
    db.query(qr,(err,result)=>{
        if(err) console.log(err,"update error");

        res.send({
            message: "User updated",
        })
    })

});

// DELETE (DELETE) single user data

app.delete('/user/:id',(req,res)=>{
    console.log(req.params.id,'deleted usr id');
    let gID = req.params.id;
    let qr = `delete from users where id = '${gID}'`;
    db.query(qr,(err,result)=>{
        if(err) console.log(err,"delete error");

        res.send({
            message:"user deleted successfully",
        })
    })
})

// LISTEN 
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
