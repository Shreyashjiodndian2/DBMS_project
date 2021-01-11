const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
// import AES from 'crypto-js/aes';
const app = express();
const port = 3000;

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "user",
});
con.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("Connected!");
    // var sql = "create table CRIMINAL(CriminalID varchar(8),Cname varchar(10),Address varchar(30),constraint pkc primary key(CriminalID));"
    // con.query(sql, (err, res) => {
    //     if (err) {
    //         throw err;
    //     }
    //     console.log('CRIMINAL table created');
    // })
});
// , email VARCHAR(30) NOT NULL, address VARCHAR(30) NOT NULL, joinDate DATE NOT NULL, stationID INT;
// , lastName VARCHAR(50) NOT NULL, fatherName VARCHAR(50) NOT NULL

app.use(cors());
app.get("/login", (req, res) =>
    res.sendFile("assets/index.html", {
        root: __dirname,
    })
);
app.get("/style.css", (req, res) =>
    res.sendFile("assets/style.css", {
        root: __dirname,
    })
);
app.get("/index.js", (req, res) =>
    res.sendFile("assets/index.js", {
        root: __dirname,
    })
);
app.get("/blue.jpg", (req, res) =>
    res.sendFile("assets/blue.jpg", {
        root: __dirname,
    })
);
app.get("/register", (req, res) =>
    res.sendFile("/assets/register.html", {
        root: __dirname,
    })
);
app.get("/style1.css", (req, res) =>
    res.sendFile("/assets/style1.css", {
        root: __dirname,
    })
);
app.get("/register.js", (req, res) => {
    res.sendFile("/assets/register.js", {
        root: __dirname,
    });
});
app.get("/user", (req, res) => {
    if (req.method == "GET") {
        con.query(
            "SELECT * FROM user WHERE name=" + req.body.user,
            (err, result) => {
                if (err || result == null || result.length == 0) {
                    res.sendStatus(401).send();
                    res.end();
                }
                // res.statusCode = 201
                res.sendStatus(201).send("Authorized");
            }
        );
    } else if (req.method == "POST") {
        con.query(
            "INSERT INTO POLICE VALUES('" +
            req.body.policeID +
            "','" +
            req.body.password +
            "','" +
            req.body.stationID +
            "','" +
            req.body.firstName + ' ' + req.body.lastName +
            "','" +
            req.body.address +
            "','" +
            req.body.joinDate +
            "','" +
            req.body.fatherName +
            "')",
            (err, result) => {
                if (err) {
                    res.sendStatus(403).send("Retry");
                    throw err;
                }
                console.log(result);
            }
        );
        res.sendStatus(201).send("User Created");
        console.log(req.body.user + "inserted");
    }
});
app.listen(port, () => console.log(`Example app listening on port $port!`));