var table = document.getElementsByTagName('table');
console.log();
document.getElementById('policeId').innerHTML = document.cookie.split("=")[1];
// document.getElementsByTagName("nav")[0].innerHTML += "<h3 class=" + document.cookie.split("=")[1] + " style='background-color: aliceblue;'></h3>"
async function getData() {
    await fetch('http://localhost:3000/user/data', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'user': document.cookie.split("=")[1],
        }
    }).then(
        (response) => {
            if (response.status == 401) {
                document.getElementById("tablewrap").style.visibility = "hidden"
                document.getElementById("errorMsg").style.visibility = "visible"
            } else {
                // console.log(response.json());
                response.json().then(
                    (data) => {
                        JSON.parse(data).forEach(element => {
                            document.getElementsByTagName("table")[0].innerHTML += "<td>" + element["Arrestid"] + "</td> <td>" + element['CName'] + "</td> <td >" + element['CriminalID'] + " </td> <td > " + element['reason'] + " </td> <td > " + element['date'] + " </td> <td ><a href='http://localhost:3000/user/data/" + element['Arrestid'] + "'>modify</a></td>"
                        });
                    }
                )
            }
        }
    );
}


document.getElementById('logoutBtn').onclick = () => {
    document.cookie = "police="
    window.location.replace("http://localhost:3000/")
}

getData()

// console.log(document.cookie.split("=")[1]);