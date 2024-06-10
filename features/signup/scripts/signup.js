document.getElementById('signupForm').addEventListener('submit', signup);

function signup(e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const address = document.getElementById("address").value;
  const phone_no = document.getElementById("phone_no").value;

  addUser(username, password, address, phone_no);
}

function addUser(username, password, address, phone_no) {
  const storedCredentials = localStorage.getItem('credentials');
  const credentials = storedCredentials ? JSON.parse(storedCredentials) : { 'users': [] };
  const newUserId = credentials.users.length + 1;

  const newUser = {
    'id': newUserId,
    'username': username,
    'password': password,
    'address': address,
    'phone_no': phone_no
  };

  credentials.users.push(newUser);

  localStorage.setItem('credentials', JSON.stringify(credentials));
  alert('user created')
  window.location.href='../login/index.html';


  console.log(localStorage.getItem('credentials'));

}
