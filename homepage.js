const aboutMeSquare = document.getElementById('aboutMeSquare');
const aboutMeUpArrow = document.getElementById('aboutMeUpArrow');
const myAboutMeItems = document.getElementsByClassName('my-about-me-items');
const aboutMeArray = Array.from(myAboutMeItems);
var buttonPresses = 0;
let positions = 
  [
    {top: '3rem', z-index: '13', transform: 'scale(1.0)'},
    {top: '0rem', z-index: '12', transform: 'scale(0.9)'},
    {top: '-3rem', z-index: '11', transform: 'scale(0.8)'}
  ];
/* 
TODO: 
  * add function for keeping time and animation duration
  * create function for ease out formula
  * create function for moving boxes (animation)
  * remove animation classes from css
*/

// Starts at zero on page load. After three, resets to one, not zero
function carouselIncrement() {
  if (buttonPresses < 3) {buttonPresses++;}
  else {
    buttonPresses = 0;
    carouselIncrement();
  }
}

function carouselUpArrow() {
  switch (buttonPresses) {
  }
}

//---------------- TESTING function ------------------
function checkClassArray() {
  for(let i=0;i<aboutMeArray.length;i++) {
    console.log(aboutMeArray[i].getAttribute('value'));
    console.log(aboutMeArray[i].classList);
  }
}

aboutMeUpArrow.addEventListener('click', carouselIncrement);
aboutMeUpArrow.addEventListener('click', carouselUpArrow);
aboutMeSquare.addEventListener('click', function() {
  console.log(buttonPresses);
  checkClassArray();
});