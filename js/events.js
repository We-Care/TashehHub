if (localStorage.currUserID) {
    logout();
} else {
    document.getElementById('eventsButtonHome').style.display='none';
        // document.getElementById('eventsButtonAbout').style.display='none';
    loginSignup();
}
document.getElementById('myEventsButton').addEventListener('click', myEventsButtonHandler);
function myEventsButtonHandler(event) {
    let currUser = JSON.parse(localStorage.getItem(localStorage.getItem('currUserID')));
    myEventsRender(currUser);
}
document.getElementById('exploreEventsButton').addEventListener('click', exploreEventsButtonHandler);
function exploreEventsButtonHandler(event) {
    let currUser = JSON.parse(localStorage.getItem(localStorage.getItem('currUserID')));
    exploreEventsRender(currUser);
}
document.getElementById('followedEventsButton').addEventListener('click', followedEventsButtonHandler);
function followedEventsButtonHandler(event) {
    let currUser = JSON.parse(localStorage.getItem(localStorage.getItem('currUserID')));
    followedEventsRender(currUser);
}
document.getElementById('createEventForm').addEventListener('submit', handleEventForm);
exploreEventsButtonHandler();

function handleEventForm(event) {
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


function Event(ownerID, eventID, owner, eventName, description, imageURL, date, maxNumberOfPeople, requirements) {
    this.eventID = eventID;
    this.owner = owner;
    this.ownerID = ownerID;
    this.eventName = eventName;
    this.description = description;
    this.imageURL = imageURL;
    this.date = date;
    this.maxNumberOfPeople = maxNumberOfPeople;
    this.eventFollowers = [];
    this.status = true;
    this.requirements = requirements; //array
    localStorage.setItem(this.eventID, JSON.stringify(this));
}

function followEvent(eventID) {
    let currUserID = localStorage.getItem('currUserID');
    let currUser = JSON.parse(localStorage.getItem(currUserID));
    currUser.followedEvents.push(eventID);// to save the event ID in userEvents followedEvents
    let currEvent = JSON.parse(localStorage.getItem(eventID));
    localStorage.setItem(currUser.userID, JSON.stringify(currUser));
    localStorage.setItem(eventID, JSON.stringify(currEvent));
};

function createEvent(currUser, eventName, description, imageURL, date, maxNumberOfPeople, requirements) {
    let totalNumberOfEvents = parseInt(localStorage.getItem('totalNumberOfEvents')) + 1 || 1;
    let eventID = 'eventID' + totalNumberOfEvents;

    localStorage.setItem('totalNumberOfEvents', totalNumberOfEvents)
    new Event(currUser.userID, eventID, currUser.userName, eventName, description, imageURL, date, maxNumberOfPeople, requirements);
    currUser.userEvents.push(eventID);   //Event.all.length to save the event ID in userEvents
    localStorage.setItem(currUser.userID, JSON.stringify(currUser));
};



function myEventsRender(currUser) {
    document.getElementById('enventCards').innerHTML = "";
    document.getElementById('followedEventsButton').classList='unActiveEventPagebutton w3-bar-item w3-button ';
    document.getElementById('exploreEventsButton').classList='unActiveEventPagebutton w3-bar-item w3-button ';
    // document.getElementById('followedEvents').innerHTML = "";
    // document.getElementById('myEvents').innerHTML = "";
    for (let i in currUser.userEvents) {
        let currEventID = currUser.userEvents[i];
        let currEvent = JSON.parse(localStorage.getItem(currEventID));
        let divE = document.getElementById('enventCards');

        let divE0 = document.createElement('div');
        divE.appendChild(divE0);
        divE0.id = currEventID + 'divE0';
        divE0.classList='card';
        divE0.style.backgroundImage=`url(${currEvent.imageURL})`;
        let divE2 = document.createElement('ul');
        divE0.appendChild(divE2);
        divE2.classList='text-div-container';
        
        divE2.insertAdjacentHTML("afterbegin", `<dt>Event creator:</dt> <dd>${currEvent.eventName}
        <dd>Description:</dd> <dt>${currEvent.description}</dt>
        <dd>Requirements</dd> <dt>${currEvent.requirements}</dt>
        <dd>Max number of people:</dd> <dt>${currEvent.maxNumberOfPeople}</dt>`);

        let divE3 = document.createElement('div');
        divE0.appendChild(divE3);
        divE3.classList='date';
        divE3.innerText= currEvent.date;

        let divE4 = document.createElement('div');
        divE0.appendChild(divE4);
        divE4.classList='tags';

        let divE5 = document.createElement('div');
        divE4.appendChild(divE5);
        divE5.classList='tag';
        divE5.innerText='Yallah '+currEvent.eventName;

        let divE6 = document.createElement('div');
        divE4.appendChild(divE6);
        divE6.classList='deleteButton tag-button';
        divE6.innerText='Delete Eevent';
        divE6.id =currEventID;

        // let currEventID = currUser.userEvents[i];
        // let currEvent = JSON.parse(localStorage.getItem(currEventID));
        // let divE = document.getElementById('myEvents');
        // let figureE = document.createElement('figure');
        // divE.appendChild(figureE);
        // figureE.id = currEventID + 'FigureE';
        // let imgE = document.createElement('img');
        // figureE.appendChild(imgE);
        // imgE.src = currEvent.imageURL;
        // imgE.alt = 'No Image';
        // let h3E = document.createElement('h3');
        // figureE.appendChild(h3E);
        // h3E.innerText = currEvent.owner;
        // let pE = document.createElement('p');
        // figureE.appendChild(pE);
        // pE.innerText = currEvent.date;
        // pE = document.createElement('p');
        // figureE.appendChild(pE);
        // pE.innerText = currEvent.maxNumberOfPeople;
        // pE = document.createElement('p');
        // figureE.appendChild(pE);
        // pE.innerText = currEvent.description;
        // pE = document.createElement('p');
        // figureE.appendChild(pE);
        // pE.innerText = currEvent.requirements;
        // let buttonE = document.createElement('button');
        // figureE.appendChild(buttonE);
        // buttonE.innerText = 'Delete Eevent';
        // buttonE.id = currEventID;
        // buttonE.classList = 'deleteButton';
    }
    document.getElementById('myEventsButton').classList=' w3-bar-item w3-button activeEventPagebutton';
    activateDeleteButton(currUser);
}
function exploreEventsRender(currUser) {
    document.getElementById('enventCards').innerHTML = "";
    document.getElementById('followedEventsButton').classList='unActiveEventPagebutton w3-bar-item w3-button ';
    document.getElementById('myEventsButton').classList='unActiveEventPagebutton w3-bar-item w3-button ';



    // document.getElementById('followedEvents').innerHTML = "";
    // document.getElementById('myEvents').innerHTML = "";

    let totalNumberOfUsers = localStorage.getItem('totalNumberOfUsers');
    let arrayEvents = [];

    for (let i = 1; i <= totalNumberOfUsers; i++) {
        let tempUserID = 'userID' + i;
        let tempUser = JSON.parse(localStorage.getItem(tempUserID));
        let tempUserEvntes = tempUser.userEvents;
        for (let index in tempUserEvntes) {
            console.log(tempUserEvntes[index]);
            console.log(currUser.userEvents.indexOf(tempUserEvntes[index]));
            console.log(currUser.followedEvents.indexOf(tempUserEvntes[index]));
            if (-1 === currUser.userEvents.indexOf(tempUserEvntes[index]) && -1 === currUser.followedEvents.indexOf(tempUserEvntes[index])) {
                arrayEvents.push(tempUserEvntes[index]);
            }
        }
    }
    arrayEvents = shuffle(arrayEvents);
    for (let i in arrayEvents) {
        let currEventID = arrayEvents[i];
        let currEvent = JSON.parse(localStorage.getItem(currEventID));
        let divE = document.getElementById('enventCards');
        let divE0 = document.createElement('div');
        divE.appendChild(divE0);
        divE0.id = currEventID + 'divE0';
        divE0.classList='card';
        divE0.style.backgroundImage=`url(${currEvent.imageURL})`;
        let divE2 = document.createElement('div');
        divE0.appendChild(divE2);
        divE2.classList='text-div-container';
        
        divE2.insertAdjacentHTML("afterbegin", `<dt>Event creator:</dt> <dd>${currEvent.eventName}
        <dd>Description:</dd> <dt>${currEvent.description}</dt>
        <dd>Requirements</dd> <dt>${currEvent.requirements}</dt>
        <dd>Max number of people:</dd> <dt>${currEvent.maxNumberOfPeople}</dt>`);

        let divE3 = document.createElement('div');
        divE0.appendChild(divE3);
        divE3.classList='date';
        divE3.innerText= currEvent.date;

        let divE4 = document.createElement('div');
        divE0.appendChild(divE4);
        divE4.classList='tags';

        let divE5 = document.createElement('div');
        divE4.appendChild(divE5);
        divE5.classList='tag';
        divE5.innerText='Yallah '+currEvent.eventName;

        let divE6 = document.createElement('div');
        divE4.appendChild(divE6);
        divE6.classList='joinButton tag-button';
        divE6.innerText='Join';
        divE6.id = currEvent.eventID;
        // let pE = document.createElement('p');
        // divE0.appendChild(pE);
        // pE.innerText = currEvent.date;
        // pE = document.createElement('p');
        // figureE.appendChild(pE);
        // pE.innerText = currEvent.maxNumberOfPeople;
        // pE = document.createElement('p');
        // figureE.appendChild(pE);
        // pE.innerText = currEvent.description;
        // pE = document.createElement('p');
        // figureE.appendChild(pE);
        // pE.innerText = currEvent.requirements;
        // let buttonE = document.createElement('button');
        // figureE.appendChild(buttonE);
        // buttonE.innerText = 'Join';
        // buttonE.id = currEventID;
        // buttonE.classList = 'joinButton';
    }

    // document.getElementById('exploreEventsButton').classList.remove('activeEventPagebutton');
    // document.getElementById('followedEventsButton').classList.remove
    document.getElementById('exploreEventsButton').classList='activeEventPagebutton w3-bar-item w3-button ';
    activateJoinButton(currUser, arrayEvents);

}
function followedEventsRender(currUser) {
    document.getElementById('enventCards').innerHTML = "";
    document.getElementById('exploreEventsButton').classList='unActiveEventPagebutton w3-bar-item w3-button ';
    document.getElementById('myEventsButton').classList='unActiveEventPagebutton w3-bar-item w3-button ';

    // document.getElementById('followedEvents').innerHTML = "";
    // document.getElementById('myEvents').innerHTML = ""; 
    for (let i in currUser.followedEvents) {
        let currEventID = currUser.followedEvents[i];
        let currEvent = JSON.parse(localStorage.getItem(currEventID));
        let divE = document.getElementById('enventCards');

        let divE0 = document.createElement('div');
        divE.appendChild(divE0);
        divE0.id = currEventID + 'divE0';
        divE0.classList='card';
        divE0.style.backgroundImage=`url(${currEvent.imageURL})`;
        let divE2 = document.createElement('ul');
        divE0.appendChild(divE2);
        divE2.classList='text-div-container';
        
        divE2.insertAdjacentHTML("afterbegin", `<dt>Event creator:</dt> <dd>${currEvent.eventName}
        <dd>Description:</dd> <dt>${currEvent.description}</dt>
        <dd>Requirements</dd> <dt>${currEvent.requirements}</dt>
        <dd>Max number of people:</dd> <dt>${currEvent.maxNumberOfPeople}</dt>`);

        let divE3 = document.createElement('div');
        divE0.appendChild(divE3);
        divE3.classList='date';
        divE3.innerText= currEvent.date;

        let divE4 = document.createElement('div');
        divE0.appendChild(divE4);
        divE4.classList='tags';

        let divE5 = document.createElement('div');
        divE4.appendChild(divE5);
        divE5.classList='tag';
        divE5.innerText='Yallah '+currEvent.eventName;

        let divE6 = document.createElement('div');
        divE4.appendChild(divE6);
        divE6.classList='unjoinButton tag-button';
        divE6.innerText='Unjoin';
        divE6.id =currEventID;


        // let currEventID = currUser.followedEvents[i];
        // let currEvent = JSON.parse(localStorage.getItem(currEventID));
        // let divE = document.getElementById('myEvents');
        // let figureE = document.createElement('figure');
        // divE.appendChild(figureE);
        // figureE.id = currEventID + 'FigureE';
        // let imgE = document.createElement('img');
        // figureE.appendChild(imgE);
        // imgE.src = currEvent.imageURL;
        // imgE.alt = 'No Image';
        // let h3E = document.createElement('h3');
        // figureE.appendChild(h3E);
        // h3E.innerText = currEvent.owner;
        // let pE = document.createElement('p');
        // figureE.appendChild(pE);
        // pE.innerText = currEvent.date;
        // pE = document.createElement('p');
        // figureE.appendChild(pE);
        // pE.innerText = currEvent.maxNumberOfPeople;
        // pE = document.createElement('p');
        // figureE.appendChild(pE);
        // pE.innerText = currEvent.description;
        // pE = document.createElement('p');
        // figureE.appendChild(pE);
        // pE.innerText = currEvent.requirements;
        // let buttonE = document.createElement('button');
        // figureE.appendChild(buttonE);
        // buttonE.innerText = 'Unjoin';
        // buttonE.id = currEventID;
        // buttonE.classList = 'unjoinButton';
    }
    document.getElementById('followedEventsButton').classList=' activeEventPagebutton w3-bar-item w3-button  ';
    activateUnjoinButton(currUser);

}
function activateDeleteButton(currUser) {
    let currUserEvents = currUser.userEvents;
    for (let i in currUserEvents) {
        document.getElementsByClassName('deleteButton')[i].addEventListener('click', handleDeleteEvent);
    }
function handleDeleteEvent(event) {
        let currEventID = event.target.id;
        // console.log('good'+currEventID);

        let currEvent = JSON.parse(localStorage.getItem(currEventID));

        let currEventFollowed = currEvent.followedEvents;
        for (let i in currEventFollowed) {
            let followerID = currEventFollowed[i];
            let follower = JSON.parse(localStorage.getItem(followerID));
            let indexFollowedEvents = follower.followedEvents.indexOf(currEvent.eventID);
            userFollower.followedEvents.splice(indexFollowedEvents, 1);
            localStorage.setItem(followerID, JSON.stringify(follower));
        }
        let indexFollowedEvents = currUser.userEvents.indexOf(currEventID);
        currUser.userEvents.splice(indexFollowedEvents, 1);
        localStorage.setItem(currUser.userID, JSON.stringify(currUser));
        document.getElementById(currEventID + 'divE0').style = 'display:none';
    }
}
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
function activateJoinButton(currUser, arrayEvents) {
    let currUserEvents = currUser.userEvents;
    for (let i in arrayEvents) {
        document.getElementsByClassName('joinButton')[i].addEventListener('click', handleJoiningEvent);
    }
    function handleJoiningEvent(event) {

        let currEventID = event.target.id;
        followEvent(currEventID);
        document.getElementById(currEventID + 'divE0').style = 'display:none';
    }
}
function unFollowEvent(currEvent) {
    let currUserID = localStorage.getItem('currUserID');
    let currUser = JSON.parse(localStorage.getItem(currUserID));

    let indexEventFollower = currEvent.eventFollowers.indexOf(currUser.userID);
    currEvent.eventFollowers.splice(indexEventFollower, 1);

    let indexFollowedEvent = currUser.followedEvents.indexOf(currEvent.eventID);
    currUser.followedEvents.splice(indexFollowedEvent, 1);
    localStorage.setItem(currUser.userID, JSON.stringify(currUser));
    localStorage.setItem(currEvent.eventID, JSON.stringify(currEvent));
}
function activateUnjoinButton(currUser) {
    let currUserEvents = currUser.followedEvents;
    for (let i in currUserEvents) {
        document.getElementsByClassName('unjoinButton')[i].addEventListener('click', handleUnjoiningEvent);
    }
    function handleUnjoiningEvent(event) {
        let currEventID = event.target.id;
        let currEvent = JSON.parse(localStorage.getItem(currEventID));
        console.log(currEvent);
        unFollowEvent(currEvent);
        document.getElementById(currEventID + 'divE0').style = 'display:none';
    }
}


// <!--------------------- Ahmad-Start--------------------------> 


//  event popup

 
//// event popupfunction blurEventsPage(){
    var elements = document.getElementById('events-div');
    document.getElementById('createEventBtn').addEventListener('click', displayCreateEventForm);
    function displayCreateEventForm() {
        elements.classList = 'upperDivClass';
        elements.style.filter = 'blur(20px)';
        document.getElementById("createEventForm").style.display = "block";
        // blurEventsPage();
    } var eventclickBlured = document.getElementById('events-div');eventclickBlured.addEventListener('click', function () {
        eventclickBlured.classList.remove("upperDivClass");
        document.getElementById("createEventForm").style.display = "none";
    })