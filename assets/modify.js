// const { response } = require("express");

var regex = /^[A-Za-z0-9 ]+$/
// var numRegex = /^[0-9 ]+$/;
var crimeDate = "";
var ipcSection = "";
var reason = "";
var stationID = "";
var CriminalID = "";
var criminalName = "";
var address = "";
var witnessName = "";
var witnessPhone = "";
var witnessAddress = "";
var witnessStatement = "";
var err = false;

async function reportCrime() {
    if (!err) {
        await fetch('http://localhost:3000/arrests', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'crimeDate': crimeDate,
                'ipcSection': ipcSection,
                'reason': reason,
                'stationID': stationID,
                'policeID': document.cookie.split("=")[1],
                'CriminalID': CriminalID,
                'criminalName': criminalName,
                'address': address,
                'witnessName': witnessName,
                'witnessPhone': witnessPhone,
                'witnessAddress': witnessAddress,
                'witnessStatement': witnessStatement,
            }
        }).then((response) => {
            if (response.status == 404) {
                alert("Please enter valid data");
            } else if (response.status >= 500) {
                alert("Please contact Developer")
            } else if (response.status == 201) {
                alert("Complaint registered successfully!!");
                window.location.href = "http://localhost:3000/criminal";
            }
        })
    }
}

document.getElementById("reportCrime").addEventListener("click", () => {
    crimeDate = document.getElementById('DateOfArrest').value;
    ipcSection = document.getElementById('ipcSection').value;
    reason = document.getElementById('reason').value;
    stationID = document.getElementById('policeid').value;
    CriminalID = document.getElementById('criminalid').value;
    criminalName = document.getElementById('cname').value;
    address = document.getElementById('criminaladdress').value;
    witnessName = document.getElementById('witness').value;
    witnessPhone = document.getElementById('pnhno').value;
    witnessAddress = document.getElementById('addressw').value;
    witnessStatement = document.getElementById('statement').value;

    if (!regex.test(ipcSection) || ipcSection == null || ipcSection.length == 0) {
        document.getElementById('ipcSection').style.border = "2px solid red"
        document.getElementById('ipcSection').style.borderRadius = '5px'
        err = true;
    }
    if (!regex.test(reason) || reason == null || reason.length == 0) {
        document.getElementById('reason').style.border = "2px solid red"
        document.getElementById('reason').style.borderRadius = '5px'
        err = true;
    }
    if (!regex.test(stationID) || stationID == null || stationID.length == 0) {
        document.getElementById('policeid').style.border = "2px solid red"
        document.getElementById('policeid').style.borderRadius = '5px'
        err = true;
    }
    if (!regex.test(CriminalID) || CriminalID == null || CriminalID.length == 0) {
        document.getElementById('criminalid').style.border = "2px solid red"
        document.getElementById('criminalid').style.borderRadius = '5px'
        err = true;
    }
    if (!regex.test(criminalName) || criminalName == null || criminalName.length == 0) {
        document.getElementById('cname').style.border = "2px solid red"
        document.getElementById('cname').style.borderRadius = '5px'
        err = true;
    }
    if (!regex.test(reason) || reason == null || reason.length == 0) {
        document.getElementById('policeid').style.border = "2px solid red"
        document.getElementById('policeid').style.borderRadius = '5px'
        err = true;
    }
    if (!regex.test(address) || address == null || address.length == 0) {
        document.getElementById('criminaladdress').style.border = "2px solid red"
        document.getElementById('criminaladdress').style.borderRadius = '5px'
        err = true;
    }
    if (!regex.test(witnessName) || witnessName == null || witnessName.length == 0) {
        document.getElementById('witness').style.border = "2px solid red"
        document.getElementById('witness').style.borderRadius = '5px'
        err = true;
    }
    if (!regex.test(witnessPhone) || witnessPhone == null || witnessPhone.length == 0) {
        document.getElementById('pnhno').style.border = "2px solid red"
        document.getElementById('pnhno').style.borderRadius = '5px'
        err = true;
    }
    if (!regex.test(witnessAddress) || witnessAddress == null || witnessAddress.length == 0) {
        document.getElementById('addressw').style.border = "2px solid red"
        document.getElementById('addressw').style.borderRadius = '5px'
        err = true;
    }
    if (!regex.test(witnessStatement) || witnessStatement == null || witnessStatement.length == 0) {
        document.getElementById('statement').style.border = "2px solid red"
        document.getElementById('statement').style.borderRadius = '5px'
        err = true;
    }
    reportCrime();
})
async function setData() {
    await fetch(window.location.href).then(
        (response) => {
            console.log(response.headers);
            document.getElementById('DateOfArrest').value = response.headers.get('crimeDate');
            document.getElementById('ipcSection').value = response.headers.get('ipcSection');
            document.getElementById('reason').value = response.headers.get('reason');
            // document.getElementById('policeid').value;
            document.getElementById('cname').value = response.headers.get('criminalName');
            document.getElementById('criminalid').value = response.headers.get('CriminalID');
            document.getElementById('criminaladdress').value = response.headers.get('address');
            document.getElementById('witness').value = response.headers.get('witnessName');
            document.getElementById('pnhno').value = response.headers.get('witnessPhone');
            document.getElementById('addressw').value = response.headers.get('witnessAddress');
            document.getElementById('statement').value = response.headers.get('witnessStatement');
        }
    )
}
setData();