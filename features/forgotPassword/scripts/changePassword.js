function changePassword() {
    let userTest = false;
    const credentials = JSON.parse(localStorage.getItem('credentials'));
    const newPassword = document.getElementById('new_password').value;
    const username = document.getElementById('username').value;
    const phoneNumber = document.getElementById('phone_number').value;
    for (user of credentials['users']) {
        if (username == user.username) {
            userTest = true;
            if (phoneNumber == user.phone_no) {
                user.password = newPassword;
                localStorage.setItem('credentials', JSON.stringify(credentials));
                alert("password changed!")
                window.location.href = '../login/index.html';
            }
            else {
                const phoneTag = document.getElementById('phone_number');
                phoneTag.setCustomValidity('');
                phoneTag.setCustomValidity('There is no such registered phone number');
                phoneTag.reportValidity();
            }
            break;
        }
        else {
            if (userTest==false) {
                const userTag = document.getElementById('username');
                userTag.setCustomValidity('');
                userTag.setCustomValidity('wrong username!');
                userTag.reportValidity();
            }
        }
    }
}
