'use strict';
if (!localStorage.getItem('totalNumberOfUsers')) {
    generateFakeAcounts();
}


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
    let currUserID = localStorage.getItem('currUserID');
    let currUserName = JSON.parse(localStorage.getItem(currUserID)).userName;
    document.getElementById('welcomeSpan').innerText = `Welcome, ${currUserName}!`;
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
        // let totalNumberOfUsers = parseInt(localStorage.getItem('totalNumberOfUsers')) + 1 || 1;
        let totalNumberOfUsers = parseInt(localStorage.getItem('totalNumberOfUsers'));
        console.log(totalNumberOfUsers);
        let switchKey = true;
        for (let index = 1; index < totalNumberOfUsers + 1; index++) {
            if (!localStorage.getItem('totalNumberOfUsers')) {
                break
            }
            let tempUserEmail = JSON.parse(localStorage.getItem('userID' + index)).email;
            if (tempUserEmail === email) {
                alert('This email is already used');
                switchKey = false;
                break;
            }
        }
        if (switchKey) {
            new Account(name, email, password, 'userID' + (totalNumberOfUsers+1));
            localStorage.setItem('totalNumberOfUsers', (totalNumberOfUsers+1));
            localStorage.setItem('currUserID', 'userID' + (totalNumberOfUsers+1));
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
function generateFakeAcounts() {

    localStorage.setItem("userID1", JSON.stringify({ userName: 'Razan', email: 'razan@gmail.com', password: 'razan', userID: 'userID1', followedEvents: [], userEvents: ['eventID1', 'eventID2', 'eventID3', 'eventID4', 'eventID5', 'eventID6'] }));
    localStorage.setItem('totalNumberOfUsers',1);
    generateFakeEvants();
}
function generateFakeEvants() {
    let event1 = {
        "eventID": "eventID1",
        "owner": "Razan",
        "ownerID": "userID1",
        "eventName": "Wadi Rum",
        "description": "A group trip to explore and to camp at Wadi Rum",
        "imageURL": "https://q-xx.bstatic.com/xdata/images/hotel/840x460/187907080.jpg?k=3ffe4ecca5caccdd2719a2801f2c9250231c97c9d5e809ca4d84a6e72a2143a1&o=",
        "date": "2020-06-29",
        "maxNumberOfPeople": "5",
        "eventFollowers": [],
        "status": true,
        "requirements": "30JD for the camp enterance fee and don\'t forget your gear"
    };
    let event2 = {
        "eventID": "eventID2",
        "owner": "Razan",
        "ownerID": "eventID1",
        "eventName": "Shawarma",
        "description": "Join us to have fun and to eat Shawarma together",
        "imageURL": "https://sc01.alicdn.com/kf/HTB11XdXPXXXXXazaFXXq6xXFXXX8/202537732/HTB11XdXPXXXXXazaFXXq6xXFXXX8.jpg",
        "date": "2020-7-1",
        "maxNumberOfPeople": "4",
        "eventFollowers": [],
        "status": true,
        "requirements": "5JD for the meal"
    };
    let event3 = {
        "eventID": "eventID3",
        "owner": "Razan",
        "ownerID": "userID1",
        "eventName": "Reading Event",
        "description": "Bring your child to enjoy reading with us",
        "imageURL": "https://www.readingrockets.org/sites/default/files/field/image/readaloud-1.jpg",
        "date": "2020-06-20",
        "maxNumberOfPeople": "20",
        "eventFollowers": [],
        "status": true,
        "requirements": "No fee. Just prepare a lunch box for your kid"
    };
    let event4 = {
        "eventID": "eventID4",
        "owner": "Razan",
        "ownerID": "userID1",
        "eventName": "Mustang Meeting",
        "description": "Mustang Meeting','A Mustang meeting to let your car meet its cousins",
        "imageURL": "https://www.conceptcarz.com/images/articleimages/ford-largest-mustang-meeting-belgium-01-800.jpg",
        "date": "2020-07-15",
        "maxNumberOfPeople": "100",
        "eventFollowers": [],
        "status": true,
        "requirements": "Just bring your Mustang and don\'t forget to wash it :D"
    };
    let event5 = {
        "eventID": "eventID5",
        "owner": "Razan",
        "ownerID": "userID1",
        "eventName": "Tree Planting Event",
        "description": "Let us save the enviroment and make our city prettier",
        "imageURL": "https://d119urb6x3h6hn.cloudfront.net/_resized/s3-eu-west-1_amazonaws_com/treesforcities/images/47577040_10155741798461389_9088717338882080768_o_27fcd33b573cd19389562fd3c770f261.jpg",
        "date": "2020-07-5",
        "maxNumberOfPeople": "50",
        "eventFollowers": [],
        "status": true,
        "requirements": "Just bring your tree with you and we\'ll provide"
    };
    let event6 = {
        "eventID": "eventID6",
        "owner": "Razan",
        "ownerID": "userID1",
        "eventName": "Expats in Jordan Meeting",
        "description": "A meeting for Expats in Jordan to exchange experience and to have fun",
        "imageURL": "https://jordantimes.com/sites/default/files/styles/news_inner/public/4Know-your-country.jpg?itok=zRUy_8Y0",
        "date": "2020-06-20",
        "maxNumberOfPeople": "20",
        "eventFollowers": [],
        "status": true,
        "requirements": "3JD for Cafe enterance fee and don\'t forget your gear"
    }
    localStorage.setItem('eventID1',JSON.stringify(event1));
    localStorage.setItem('eventID2',JSON.stringify(event2));
    localStorage.setItem('eventID3',JSON.stringify(event3));
    localStorage.setItem('eventID4',JSON.stringify(event4));
    localStorage.setItem('eventID5',JSON.stringify(event5));
    localStorage.setItem('eventID6',JSON.stringify(event6));
    localStorage.setItem('totalNumberOfEvents',6);


    // new Event ('userID1','eventID1','Razan','Wadi Rum','A group trip to explore and to camp at Wadi Rum', 'https://q-xx.bstatic.com/xdata/images/hotel/840x460/187907080.jpg?k=3ffe4ecca5caccdd2719a2801f2c9250231c97c9d5e809ca4d84a6e72a2143a1&o=','2020-06-29','5','30JD for the camp enterance fee and don\'t forget your gear');

    // new Event ('userID1','eventID2','Razan','Shawarma','Join us to have fun and to eat Shawarma together', 'https://sc01.alicdn.com/kf/HTB11XdXPXXXXXazaFXXq6xXFXXX8/202537732/HTB11XdXPXXXXXazaFXXq6xXFXXX8.jpg','2020-7-1','4','5JD for the meal');    
    // new Event ('userID1','eventID3','Razan','Reading Event','Bring your child to enjoy reading with us', 'https://lh3.googleusercontent.com/proxy/4w6FaMTKHpKdC375b4A_7xHiX4EwbG2Orbs0IGK69N1Bm2JZcrwPLW7ZQsqjPQvb5ide_wuVTBXWZa3YOeyuh2qPNiokQdQ9FqFMA-PDqDGGM0IvilSP6O7BKAhaQH0I1PV5QwEuS9QWaY6m7qnIpTY62msFSj9N37gvWOm6ZoINbfSXygTnVqnFQlE','2020-06-20','20','No fee. Just prepare a lunch box for your kid');

    // new Event ('userID1','eventID4','Razan','Mustang Meeting','A Mustang meeting to let your car meet its cousins', 'https://www.conceptcarz.com/images/articleimages/ford-largest-mustang-meeting-belgium-01-800.jpg','2020-07-15','100','Just bring your Mustang and don\'t forget to wash it :D');

    // new Event ('userID1','eventID5','Razan','Tree Planting Event','Let us save the enviroment and make our city prettier', 'https://d119urb6x3h6hn.cloudfront.net/_resized/s3-eu-west-1_amazonaws_com/treesforcities/images/47577040_10155741798461389_9088717338882080768_o_27fcd33b573cd19389562fd3c770f261.jpg','2020-07-5','50','Just bring your tree with you and we\'ll provide');

    // new Event ('userID1','eventID6','Razan','Expats in Jordan Meeting','A meeting for Expats in Jordan to exchange experience and to have fun', 'https://lh3.googleusercontent.com/proxy/B0SVN0hbQbJ8VQiCCMp8wOJvBAKpjt_XUpfgXY0JUnRuAvC0WmHMov-oaXENAEBSwi4xIV1t5s-jLbmL7xPw1Q-iQmiObJXXctYUDYWiDupUzyl1uKK4iIxG3A0bHw','2020-06-20','20','3JD for Cafe enterance fee and don\'t forget your gear');
    // localStorage.setItem('totalNumberOfEvents',6);

}
