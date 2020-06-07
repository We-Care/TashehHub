'use strict';
var currUserID;

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
  this.followedEvents =[];
  this.userEvents=[];
  Account.all.push(this);
}
Account.all = [];
Account.prototype.followEvent= function(eventId){
this.followEvent.push(eventId);// to save the event ID in userEvents followedEvents
Event.followers.push(currUserID);
};
Account.prototype.createEvent= function(eventName, description, imageURL, date, numberOfPeople, requirements){
    new Event (this.userName,eventName, description, imageURL, date, numberOfPeople, requirements);
     this.userEvents.push(Event.all.length);   //Event.all.length to save the event ID in userEvents
};
new Account('osama', 'o@g.com', '00'); // obj for testing
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




/////Events Part start//////



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
        numberOfPeople: getRndInteger(3, 10),
        status: vertiualEventStatus(),
        requirements: ['Mobile', 'sigar', 'lighter']

    },
    {
        imagePath: 'https://cdn.shopify.com/s/files/1/0034/8071/5309/products/37_1024x1024.png?v=1567609265',
        creator: usres[getRndInteger(0, usres.length - 1)],
        eventName: 'Shawerma Tasheeh',

        description: 'Shawarm is a dish in Middle Eastern cuisine consisting of meat cut into thin slices, stacked in a cone-like shape, and roasted on a slowly-turning vertical rotisserie or spit. Originally made of lamb or mutton, today\'s shawarma may also be chicken, turkey beef or veal. Thin slices are shaved off the cooked surface as it continuously rotates. Shawarma is one of the world\'s most popular street foods, especially in Egypt and the countries of the Levant, the Arabian Peninsula, and beyond.',

        date: '12/12/2021',
        numberOfPeople: getRndInteger(3, 10),
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
        var numberOfPeople = eventsArr[i].numberOfPeople;
        var status = eventsArr[i].status;
        var requirements = eventsArr[i].requirements;
        new Event(imagePath, creator, eventName, description, date, numberOfPeople, status, requirements);
    }
}
function Event(imagePath, creator, eventName, description, date, numberOfPeople, status, requirements) {
    this.imagePath = imagePath;
    this.creator = creator;
    this.eventName = eventName;
    this.description = description;
    this.date = date;
    this.numberOfPeople = numberOfPeople;
    this.status = status;
    this.requirements = requirements; //array
    Event.all.push(this);
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
verticalObjects();
console.log(Event.all)
//render events from the constructor
eventRender();


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
        numberOfPeople: getRndInteger(3, 10),
        status: vertiualEventStatus(),
        requirements: ['Mobile', 'sigar', 'lighter']

    },
    {
        imagePath: 'https://cdn.shopify.com/s/files/1/0034/8071/5309/products/37_1024x1024.png?v=1567609265',
        creator: usres[getRndInteger(0, usres.length - 1)],
        eventName: 'Shawerma Tasheeh',

        description: 'Shawarm is a dish in Middle Eastern cuisine consisting of meat cut into thin slices, stacked in a cone-like shape, and roasted on a slowly-turning vertical rotisserie or spit. Originally made of lamb or mutton, today\'s shawarma may also be chicken, turkey beef or veal. Thin slices are shaved off the cooked surface as it continuously rotates. Shawarma is one of the world\'s most popular street foods, especially in Egypt and the countries of the Levant, the Arabian Peninsula, and beyond.',

        date: '12/12/2021',
        numberOfPeople: getRndInteger(3, 10),
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
        var numberOfPeople = eventsArr[i].numberOfPeople;
        var status = eventsArr[i].status;
        var requirements = eventsArr[i].requirements;
        new Event(imagePath, creator, eventName, description, date, numberOfPeople, status, requirements);
    }
}
function Event(owner,eventName, description, imageURL, date, numberOfPeople, requirements) {
    this.owner = owner;
    this.eventName = eventName;
    this.description = description;
    this.imagePath = imageURL;
    this.date = date;
    this.numberOfPeople = numberOfPeople;
    this.status = true;
    this.requirements = requirements; //array
    Event.all.push(this);
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
verticalObjects();
console.log(Event.all)
//render events from the constructor
eventRender();


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


/////Events Part End//////
