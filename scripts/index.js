testCredentials = {
    'users': [
        {
            'id': 1,
            'username': 'joel',
            'password': 'joel@123',
            'adderss': 'kochi',
            'phone_no': 9098544212
        },
        {
            'id': 2,
            'username': 'gopika',
            'password': 'gopika@123',
            'adderss': 'trivandrum',
            'phone_no': 9098544212
        }
    ]

}

function checkUser() {
    let res = false;
    console.log("user authentication triggered");
    // credentials=localStorage.getItem('');
    for (user of testCredentials['users']) {
        console.log(user.username);
        if (document.getElementById('username').value === user.username) {
            if (document.getElementById('password').value === user.password) {
                res = true;
                console.log("logged in successfully");
                window.location.href = 'restaurantHome.html';
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