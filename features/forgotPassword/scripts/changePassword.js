let testCredentials = {
    'users': [
        {
            'id': 1,
            'username': 'joel',
            'password': 'joel@123',
            'adderss': 'kochi',
            'phone_no': '9098544212'
        },
        {
            'id': 2,
            'username': 'gopika',
            'password': 'gopika@123',
            'adderss': 'trivandrum',
            'phone_no': '9098544212'
        }
    ]

}
function changePassword() {
    let userTest = false;
    let credentials = localStorage.getItem('credentials');
    let newPassword = document.getElementById('new_password').value;
    let username = document.getElementById('username').value;
    let phoneNumber = document.getElementById('phone_number').value;
    for (user of credentials['users']) {
        if (username == user.username) {
            userTest = true;
            if (phoneNumber == user.phone_no) {
                user.password = newPassword;
                localStorage.setItem('credentials', JSON.stringify(credentials));
                alert("password changed!")
                window.location.href = 'index.html';
            }
            else {
                // alert("There is no such registered phone number");
                let phoneTag = document.getElementById('phone_number');
                phoneTag.setCustomValidity('');
                phoneTag.setCustomValidity('There is no such registered phone number');
                phoneTag.reportValidity();
            }
            break;
        }
        else {
            if (userTest==false) {
                let userTag = document.getElementById('username');
                userTag.setCustomValidity('');
                userTag.setCustomValidity('wrong username!');
                userTag.reportValidity();
            }

            // alert("wrong username");
        }
    }
}
