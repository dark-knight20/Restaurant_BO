function checkUser() {
    let res = false;
    const credentials=JSON.parse(localStorage.getItem('credentials'));
    for (user of credentials['users']) {
        if (document.getElementById('username').value === user.username) {
            if (document.getElementById('password').value === user.password) {
                res = true;
                localStorage.setItem('currentUser',JSON.stringify(user));
                window.location.href = '../restaurantHome/index.html';
                break;
            }
            else {
                res = true;
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
    }
}