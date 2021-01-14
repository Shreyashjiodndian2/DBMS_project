var policeID;
var password;
// import AES from 'crypto-js/aes';
var loginButton = document.getElementById('loginButton');
async function login() {
    var auth = await fetch('http://localhost:3000/user', {
        method: 'GET',
        // body: JSON.stringify({
        //     'user': policeID,
        //     'password': password
        // }),
        headers: {
            'Content-Type': 'application/json',
            'user': policeID,
            'password': password
        }
    })
    if (auth.status == 401) {
        console.log('Access Denied');
        document.getElementById('warning').style.visibility = "visible"
    } else if (auth.status == 201) {
        console.log('Access Granted');
        document.cookie = "";
        document.cookie = "policeid=" + policeID;
        window.location.replace('http://localhost:3000/criminal');
    }
    // console.log(auth);
}
loginButton.addEventListener('click', () => {
    policeID = document.getElementById('user').value;
    password = document.getElementById('pass').value;
    login();
})