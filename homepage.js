const aboutMeSquare = document.getElementById('aboutMeSquare');
const aboutMeUpArrow = document.getElementById('aboutMeUpArrow');
const myAboutMeItems = document.getElementsByClassName('my-about-me-items');
const aboutMeArray = Array.from(myAboutMeItems);
var buttonPresses = 0;

/* 
TODO: 
  * Create variable that increments whenever carouselUpArrow is called.
  * Place class add into switch statements to go through each array element (there is a better way but i dont know it yet)
  * When variable reaches 3 and cards are in orginal positions, reset variable and remove anim classes.
*/

function carouselIncrement() {
  if (buttonPresses < 3) {buttonPresses++;}
  else {
    buttonPresses = 0;
    carouselIncrement();
  }
}

function carouselUpArrow() {
  switch (buttonPresses) {
  // translate property in css x:-50% to center card, however transform is a new property and can stack with translate
    case 1:
      aboutMeArray[0].classList.add('animation-playback');
  /* this is fun and great but not functional for this task
  aboutMeArray.push(aboutMeArray[0]);
  aboutMeArray.shift();
  */
      aboutMeArray[1].classList.add('animation-playforward');
      aboutMeArray[2].classList.add('animation-playmiddle');
  // removing animations resets positions but not Array index because anim are set in classes
  // setTimeout(removeAnimations, 2000);
      break;
    case 2:
      aboutMeArray[0].classList.add('animation-playmiddle');
      aboutMeArray[1].classList.add('animation-playback');
      aboutMeArray[2].classList.add('animation-playforward');
      break;
  }
}

/* A function that should work if eventListener is placed on a good element 
   Maybe use a setTimeout(function, seconds) event instead*/
function removeAnimations() {
  for(let i=0;i<aboutMeArray.length;i++) {
    aboutMeArray[i].classList.remove('animation-playforward', 'animation-playmiddle', 'animation-playback');
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
/* not logging; maybe because element is changing position in array. need better action */
