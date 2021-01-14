await fetch('http://localhost:3000/user/data', {
    headers: {
        'Content-Type': 'application/json',
        'user': document.cookie.split("=")[1],
    }
});