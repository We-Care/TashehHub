'use strict';
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
  container.classList.remove("right-panel-active");
});

function Account(userName, email, password) {
  this.userName = userName;
  this.email = email;
  this.password = password;
  this.userID;
  Account.all.push(this);
}
Account.all = [];
new Account('osama', 'o@g.com', '00'); // ogj for testing
document.getElementById('signUpForm').addEventListener('submit', handleSignUp);
function handleSignUp(event) {
  event.preventDefault();
  let name = event.target.userName.value;
  let email = event.target.email.value;
  let password = event.target.password.value;
  new Account(name, password, email);
  let index = Account.all.length -1;
  Account.all[index].userID=index;
  alert('new account')
}

document.getElementById('signInForm').addEventListener('submit', handleSignIn);
function handleSignIn(event) {
  event.preventDefault();

  let email = event.target.email.value;
  let password = event.target.password.value;
  let currUserID;
  let i = 0;
  for (i in Account.all) {
    if (Account.all[i].email == email) {
      
      if (Account.all[i].password == password) {
        currUserID = Account.all[i];
        alert('Welcome ' + Account.all[i].userName)
        break;
      }
      if (i == Account.all.length-1) {
        alert('You have entered a wrong passowrd. Try again!')
        break;

      }
    }
    if (i == Account.all.length-1) {
      alert('You have entered a wrong Email. Try again or create an account if you don\'t already have one ')

    }
  }

}

