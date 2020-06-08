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
    this.userID = 'userID' + (localStorage.getItem('totalNumberOfUsers') + 1);
    this.followedEvents = [];
    this.userEvents = [];
    Account.all.push(this);
    localStorage.setItem(this.userID, JSON.stringify(this));
}
Account.all = [];
Account.allUsersEmails = [];
function followEvent(currUser, eventID) {
    currUser.followedEvents.push(eventID);// to save the event ID in userEvents followedEvents
    let currEvent=localStorage.getItem(eventID);
    currUser.eventFollowers.push(currUser.userID);
    localStorage.setItem(currUser.userID, JSON.stringify(currUser));
    localStorage.setItem(eventID, JSON.stringify(currEvent));
};
function createEvent(currUser, eventName, description, imageURL, date, maxNumberOfPeople, requirements) {
    let totalNumberOfEvents =parseInt(localStorage.getItem('totalNumberOfEvents')) + 1 ||1;
    let eventID = 'eventID'+totalNumberOfEvents;
    
    localStorage.setItem('totalNumberOfEvents',totalNumberOfEvents)
    new Event(currUser.userID,eventID, currUser.userName, eventName, description, imageURL, date, maxNumberOfPeople, requirements);
    currUser.userEvents.push(eventID);   //Event.all.length to save the event ID in userEvents
    localStorage.setItem(currUser.userID, JSON.stringify(currUser));
};
document.getElementById('signUpForm').addEventListener('submit', handleSignUp);
function handleSignUp(event) {
    event.preventDefault();
    let name = event.target.name.value;
    let email = event.target.email.value;
    let password = event.target.password.value;
    new Account(name, email, password);
    let currtotalNumberOfUsers = localStorage.getItem('totalNumberOfUsers');
    localStorage.setItem('totalNumberOfUsers', currtotalNumberOfUsers + 1)
    alert('new account')
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
                alert('Welcome ' + tempUser.userName)
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
document.getElementById('createEventForm').addEventListener('submit', handleEventForm);
function handleEventForm(event) {
    event.preventDefault();
    let eventName = event.target.eventName.value;
    let description = event.target.description.value;
    let imageURL = event.target.imageURL.value;
    let date = event.target.date.value;
    let maxNumberOfPeople = event.target.maxNumberOfPeople.value;
    let requirements = event.target.requirements.value;
    let currUser = localStorage.getItem('currUserID');
    currUser = JSON.parse(localStorage.getItem(currUser));
    createEvent(currUser, eventName, description, imageURL, date, maxNumberOfPeople, requirements);
}

/////Events Part Start//////
//dammy creators
var usres = ['Osama', 'Ahmad', 'Ali', 'Ibraheem', 'Othman', 'Wassem', 'Abed Alrahman'];
//dammy events
var eventsArr = [
    {
        imagePath: 'https://ihg.scene7.com/is/image/ihg/intercontinental-aqaba-4008417344-2x1?wid=1440&fit=fit,1',
        creator: usres[getRndInteger(0, usres.length - 1)],
        eventName: 'Aqaba Tasheeh',

        description: 'al-ʿAqaba, al-ʿAgaba, pronounced [æl ˈʕæqaba, alˈʕagaba]) is the only coastal city in Jordan and the largest and most populous city on the Gulf of Aqaba.[4] Situated in southernmost Jordan, Aqaba is the administrative centre of the Aqaba Governorate.',
        date: '01/01/2021',
        maxNumberOfPeople: getRndInteger(3, 10),
        status: vertiualEventStatus(),
        requirements: ['Mobile', 'sigar', 'lighter']

    },
    {
        imagePath: 'https://cdn.shopify.com/s/files/1/0034/8071/5309/products/37_1024x1024.png?v=1567609265',
        creator: usres[getRndInteger(0, usres.length - 1)],
        eventName: 'Shawerma Tasheeh',

        description: 'Shawarm is a dish in Middle Eastern cuisine consisting of meat cut into thin slices, stacked in a cone-like shape, and roasted on a slowly-turning vertical rotisserie or spit. Originally made of lamb or mutton, today\'s shawarma may also be chicken, turkey beef or veal. Thin slices are shaved off the cooked surface as it continuously rotates. Shawarma is one of the world\'s most popular street foods, especially in Egypt and the countries of the Levant, the Arabian Peninsula, and beyond.',

        date: '12/12/2021',
        maxNumberOfPeople: getRndInteger(3, 10),
        status: vertiualEventStatus(),//should pass date to decide //true or flase
        requirements: ['STOMACH', 'Mobile', 'sigar', 'lighter']

    }
];
//filling in  verticalObjects into the constructor
function verticalObjects() {

    for (var i in eventsArr) {
        var imagePath = eventsArr[i].imagePath;
        var creator = eventsArr[i].creator;
        var eventName = eventsArr[i].eventName;
        var description = eventsArr[i].description;
        var date = eventsArr[i].date;
        var maxNumberOfPeople = eventsArr[i].maxNumberOfPeople;
        var status = eventsArr[i].status;
        var requirements = eventsArr[i].requirements;
        new Event(imagePath, creator, eventName, description, date, maxNumberOfPeople, status, requirements);
    }
}
function Event(ownerID,eventID, owner, eventName, description, imageURL, date, maxNumberOfPeople, requirements) {
    this.eventID= eventID;
    this.owner = owner;
    this.ownerID = ownerID;
    this.eventName = eventName;
    this.description = description;
    this.imagePath = imageURL;
    this.date = date;
    this.maxNumberOfPeople = maxNumberOfPeople;
    this.eventFollowers = [];
    this.status = true;
    this.requirements = requirements; //array
    localStorage.setItem(this.eventID, JSON.stringify(this));

}
Event.all = [];

function vertiualEventStatus() {
    var rand = Math.ceil(Math.random());
    var status;
    if (rand) {
        status = true;
    } else {
        status = false;
    }
    return status;
}
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var testImage = 'https://images.unsplash.com/photo-1523895665936-7bfe172b757d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb';
var testH3 = 'Ahmad';
var testP = 'Osama';
//fill the constructor with data
// verticalObjects();-----------------------
//render events from the constructor
// eventRender();--------------------------


function eventRender() {
    var divE = document.getElementById('events-div');
    for (var i in Event.all) {
        var figureE = document.createElement('figure');
        divE.appendChild(figureE);
        var buttonE = document.createElement('button');
        figureE.appendChild(buttonE);
        // buttonE.setAttribute('style',`"background-image: url(${testImage})"`);
        //buttonE.style.background-image='url('+testImage+')';

        /*  var eventImg = document.createElement('img');
            eventImg.setAttribute('src',Event.all[i].imagePath)
            eventImg.style.width = "200px";
            eventImg.style.height = "200px"; */

        buttonE.style.backgroundImage = "url(" + Event.all[i].imagePath + ")";
        buttonE.style.width = "200px";
        buttonE.style.height = "200px";
        // buttonE.style.object-fit = "cover";


        var figCaptionE = document.createElement('figcaption');
        figureE.appendChild(figCaptionE);
        var h3E = document.createElement('h3');
        figCaptionE.appendChild(h3E);
        h3E.innerText = Event.all[i].creator;//
        var pE = document.createElement('p');
        figCaptionE.appendChild(pE);
        pE.innerText = Event.all[i].description;//
        var ulE = document.createElement('ul');
        figCaptionE.appendChild(ulE);
        for (let index = 0; index < Event.all[i].requirements.length; index++) {
            var liE = document.createElement('li');
            liE.textContent = Event.all[i].requirements[index];
            ulE.appendChild(liE);
        }
    }

}


for (let i =0;i<localStorage.getItem('totalNumberOfEvents');i++) {
    document.getElementsByClassName('joinEvent')[i].addEventListener('submit', handleJoiningEvent);
}
function handleJoiningEvent(event) {
    let eventID = event.target.id.value;
    let currUser = localStorage.getItem('currUser');
    followEvent(currUser, eventID);
}



/////Events Part End//////

