function checkUser() {
    let res = false;
    console.log("user authentication triggered");
    credentials=JSON.parse(localStorage.getItem('credentials'));
    console.log(credentials)
    for (user of credentials['users']) {
        console.log(user)
        console.log(user.username);
        if (document.getElementById('username').value === user.username) {
            if (document.getElementById('password').value === user.password) {
                res = true;
                console.log("logged in successfully");
                localStorage.setItem('currentUser',JSON.stringify(user));
                window.location.href = '../restaurantHome/index.html';
                break;
            }
            else {
                res = true;
                // alert('Incorrect password!');
                let passwordInput = document.getElementById('password');
                passwordInput.setCustomValidity('');
                passwordInput.setCustomValidity('Incorrect password!'); 
                passwordInput.reportValidity(); 
            }
            break;
        }

    }
    if (res === false) {
        let userNameInput = document.getElementById('username');
        userNameInput.setCustomValidity('');
        userNameInput.setCustomValidity('User not found!'); 
        userNameInput.reportValidity();
        console.log("user not found");
    }


}