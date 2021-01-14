var table = document.getElementsByTagName('table');
document.getElementsByClassName('policeId')[0].textContent = document.cookie.split("=")[1];
async function getData() {
    var data = await fetch('http://localhost:3000/user/data', {
        headers: {
            'Content-Type': 'application/json',
            'user': document.cookie.split("=")[1],
        }
    });
    // table[0].innerHTML += "<tr> <td > Sarada < /td> <td > 2011 TS0004 < /td> <td > Sasuke < /td> <td > Fraud < /td> <td > Domba residency, Street No .5 < /td> </tr>"
}
// console.log(document.cookie.split("=")[1]);