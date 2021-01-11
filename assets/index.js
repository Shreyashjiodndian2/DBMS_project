var policeID;
var password;
import AES from 'crypto-js/aes';
var loginButton = document.getElementById('loginButton');
loginButton.addEventListener('click', () => {
    policeID = document.getElementById('user').value;
    password = document.getElementById('pass').value;
    var auth = await fetch('https://localhost:3000/user', {
        method: 'POST',
        body: JSON.stringify({
            'user': policeID,
            'password': AES.encrypt(password, 'secretKey').toString()
        }),
        headers: {
            'Content-Type': 'application/json'
        } 
    })
    console.log(auth);
})