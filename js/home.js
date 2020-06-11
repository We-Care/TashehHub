

if (localStorage.currUserID) {
    logout();
} else {
    document.getElementById('eventsButtonHome').style.display='none';
        // document.getElementById('eventsButtonAbout').style.display='none';
    loginSignup();
}
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
    //data sent to local storage
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
    //data retrieved from local storage
    
});

// <!--------------------- Ahmad-Start--------------------------> 

// signing popup

document.getElementById('inOutUp').addEventListener('click', displaySign);


function displaySign() {
    document.getElementById("innerDiv").style.display = "block";
    blurring();
}
function blurring() {
   

    var elements = document.getElementById('upperDivContainer');
    elements.classList = 'upperDivClass';
    elements.style.filter = 'blur(10px)';
}

var x = document.getElementById('upperDivContainer');
x.addEventListener('click', function () {
    
    x.classList.remove("upperDivClass");
    document.getElementById("innerDiv").style.display = "none";
})

// <!--------------------- Ahmad-End--------------------------> 

  /* <!---------------------Ali-Start--------------------------> */


///// Sider Code /////

// var slideIndex = 1;
// showSlides(slideIndex);

// function plusSlides(n) {
//   showSlides(slideIndex += n);
// }

// function currentSlide(n) {
//   showSlides(slideIndex = n);
// }

// function showSlides(n) {
//   var i;
//   var slides = document.getElementsByClassName("mySlides");
//   var dots = document.getElementsByClassName("dot");
//   if (n > slides.length) {slideIndex = 1}    
//   if (n < 1) {slideIndex = slides.length}
//   for (i = 0; i < slides.length; i++) {
//       slides[i].style.display = "none";  
//   }
//   for (i = 0; i < dots.length; i++) {
//       dots[i].className = dots[i].className.replace(" active", "");
//   }
//   slides[slideIndex-1].style.display = "block";
//   dots[slideIndex-1].className += " active";
// } 
  /* <!---------------------Ali-End--------------------------> */
