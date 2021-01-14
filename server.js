const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
// import AES from 'crypto-js/aes';
const app = express();
app.use(cors())
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
app.get("/", (req, res) =>
    res.sendFile("assets/index.html", {
        root: __dirname,
    }));
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
app.post('/user', (req, res) => {
    // console.log(
    //     req
    // );
    con.query(
        "INSERT INTO POLICE VALUES('" +
        req.headers.policeid +
        "','" +
        req.headers.password +
        "','" +
        req.headers.stationid +
        "','" +
        req.headers.firstname + ' ' + req.headers.lastname +
        "','" +
        req.headers.address +
        "','" +
        req.headers.joindate +
        "','" +
        req.headers.fathername +
        "','" +
        req.headers.stationid +
        "')",
        (err, result) => {
            if (err) {
                res.statusCode = 404;
                res.end();
                console.log(err);
            } else {
                res.sendStatus(201);
            }
            console.log(result);
        }
    );
    // console.log(req.body.user + "inserted");
})
app.get("/user", (req, res) => {
    console.log(req.method);
    con.query(
        "SELECT * FROM POLICE WHERE PoliceID=" + req.headers.user + " AND password='" + req.headers.password + "'",
        (err, result) => {
            if (err || result == null || result.length == 0) {
                res.sendStatus(401).send();
                res.end();
            } else {
                res.sendStatus(201);
            }
            // res.statusCode = 201

        }
    );

});
app.get("/criminal", (req, res) => {
    res.sendFile("/assets/criminalrecords.html", {
        root: __dirname,
    });
});
app.get("/criminal.css", (req, res) => {
    res.sendFile("/assets/criminal.css", {
        root: __dirname,
    });
})
app.get("/user/data", (req, res) => {
    con.query("SELECT * FROM ARRESTS WHERE PoliceID=" + req.headers.user, (err, result) => {
        if (err) {
            res.sendStatus(401);
            console.log(err);
        } else {
            res.render('arrest-list', { title: 'Arrests List', userData: result });
        }
    })
})
app.listen(port, () => console.log(`Example app listening on port $port!`));