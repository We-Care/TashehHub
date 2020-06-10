'use strict';
// if(localStorage.getItem('totalNumberOfUsers') >0){
//     generateFakeAcounts();
// }


function Account(userName, email, password, userID) {
    this.userName = userName;
    this.email = email;
    this.password = password;
    this.userID = userID;
    this.followedEvents = [];
    this.userEvents = [];
    localStorage.setItem(this.userID, JSON.stringify(this));
}
function logout() {
    let buttonE = document.getElementById('inOutUp');
    buttonE.innerText = 'Log out';
    buttonE.addEventListener('click', function (event) {
        console.log('good');
        localStorage.removeItem('currUserID');
        window.location.href = 'index.html';
        
        loginSignup();
    });
}
function loginSignup() {
    let buttonE = document.getElementById('inOutUp');
    buttonE.innerText = 'Sign in';

    
    document.getElementById('signUpForm').addEventListener('submit', handleSignUp);
    function handleSignUp(event) {
        event.preventDefault();
        let name = event.target.name.value;
        let email = event.target.email.value;
        let password = event.target.password.value;
        let totalNumberOfUsers = parseInt(localStorage.getItem('totalNumberOfUsers')) + 1 || 1;
        let switchKey = true;
        // for (let index = 0; index < totalNumberOfUsers; index++) {
        //     let tempUserEmail =JSON.parse(localStorage.getItem('userID'+index)).email;
        //     if(tempUserEmail === email){
        //         alert('This email is already used');
        //         switchKey = false;
        //         break;
        //     }
        // }
        if (switchKey) {
            new Account(name, email, password, 'userID' + totalNumberOfUsers);
            localStorage.setItem('totalNumberOfUsers', totalNumberOfUsers);
            localStorage.setItem('currUserID', 'userID' + totalNumberOfUsers);
            logout();
            window.location.href = 'event.html';
            alert('new account')
        }
    }

    document.getElementById('signInForm').addEventListener('submit', handleSignIn);
    function handleSignIn(event) {
        event.preventDefault();

        let email = event.target.email.value;
        let password = event.target.password.value;
        let i = 0;
        let allUsersEmails = localStorage.getItem('allUsersEmails');
        let totalNumberOfUsers = localStorage.getItem('totalNumberOfUsers') || 1;

        for (let i = 1; i < totalNumberOfUsers + 1; i++) {
            let tempUser = JSON.parse(localStorage.getItem('userID' + i));
            if (tempUser.email == email) {

                if (tempUser.password == password) {
                    let currUserID = tempUser.userID;
                    localStorage.setItem('currUserID', currUserID);
                    alert('Welcome ' + tempUser.userName);
                    logout();
                    window.location.href = 'event.html';
                    break;
                }
                if (i == totalNumberOfUsers) {
                    alert('You have entered a wrong passowrd. Try again!')
                    break;

                }
            }
            if (i == totalNumberOfUsers) {
                alert('You have entered a wrong Email. Try again or create an account if you don\'t already have one ')

            }
        }

    }

}
// function generateFakeAcounts(){
//     let name = event.target.name.value;
//     let email = event.target.email.value;
//     let password = event.target.password.value;
//     new Account(name, email, password);
//     let currtotalNumberOfUsers = localStorage.getItem('totalNumberOfUsers');
//     localStorage.setItem('totalNumberOfUsers', currtotalNumberOfUsers + 1)
//     alert('new account')
// }
