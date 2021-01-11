var firstName;
var lastName;
var fatherName;
var email;
var address;
var joinDate;
var stationID;
var password;
var cnf_pass;
var policeID;
// const zxcvbn = require("")
// Const Crypto = require('crypto');


var loginButton = document.getElementById('registerBtn');
var regex = /^[A-Za-z0-9 ]+$/
var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
var err = false;
var strength = {
    0: "Worst",
    1: "Bad",
    2: "Weak",
    3: "Good",
    4: "Strong"
}

var password = document.getElementById('pass');
var meter = document.getElementById('password-strength-meter');
var text = document.getElementById('password-strength-text');

password.addEventListener('input', function () {
    var val = password.value;
    var result = zxcvbn(val);

    // Update the password strength meter
    meter.value = result.score;

    // Update the text indicator
    if (val !== "") {
        text.innerHTML = "Strength: " + strength[result.score];
    } else {
        text.innerHTML = "";
    }
});

async function register() {
    if (!err) {
        var auth = await fetch('https://localhost:3000/user', {
            method: 'POST',
            body: JSON.stringify({
                'firstName': firstName,
                'lastName': lastName,
                'fatherName': fatherName,
                'email': email,
                'address': address,
                'stationID': stationID,
                'joinDate': joinDate,
                'password': password,
                'policeID': policeID
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(auth);
    }
}

loginButton.addEventListener('click', () => {
    firstName = document.getElementById('firstName').value;
    lastName = document.getElementById('lastName').value;
    fatherName = document.getElementById('fatherName').value;
    email = document.getElementById('email').value;
    address = document.getElementById('address').value;
    joinDate = document.getElementById('joined').value
    stationID = document.getElementById('station').value;
    password = document.getElementById('pass').value;
    cnf_pass = document.getElementById('passCnf').value;
    policeID = document.getElementById('policeID').value;

    //validation part
    if (!regex.test(firstName)) {
        document.getElementById('firstName').style.border = "2px solid red"
        document.getElementById('firstName').style.borderRadius = '5px'
        err = true;
    }
    if (!regex.test(lastName)) {
        document.getElementById('lastName').style.border = "2px solid red"
        document.getElementById('lastName').style.borderRadius = '5px'
        err = true;
    }
    if (!regex.test(fatherName)) {
        document.getElementById('fatherName').style.border = "2px solid red"
        document.getElementById('fatherName').style.borderRadius = '5px'
        err = true;
    }
    if (!emailReg.test(email)) {
        document.getElementById('email').style.border = "2px solid red"
        document.getElementById('email').style.borderRadius = '5px'
        err = true;
    }
    if (password != cnf_pass) {
        document.getElementById('passCnf').style.border = "2px solid red"
        document.getElementById('passCnf').style.borderRadius = '5px'
        err = true;
    }
    if (policeID == null) {
        document.getElementById('policeID').style.border = "2px solid red"
        document.getElementById('policeID').style.borderRadius = '5px'
        err = true;
    }
    // console.log(firstName + lastName + fatherName + email + password);
    register();
})