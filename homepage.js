const aboutMeSquare = document.getElementById('aboutMeSquare');
const aboutMeUpArrow = document.getElementById('aboutMeUpArrow');
const myAboutMeItems = document.getElementsByClassName('my-about-me-items');
const aboutMeArray = Array.from(myAboutMeItems);

function carouselUpArrow() {
  // translate property in css x:-50% to center card, however transform is a new property and can stack with translate
  aboutMeArray[0].classList.add('animation-playback');
  aboutMeArray.push(aboutMeArray[0]);
  aboutMeArray.shift();
  aboutMeArray[0].classList.add('animation-playforward');
  aboutMeArray[1].classList.add('animation-playmiddle');
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

aboutMeUpArrow.addEventListener('click', carouselUpArrow);
aboutMeSquare.addEventListener('click', checkClassArray);
/* not logging; maybe because element is changing position in array. need better action */
aboutMeArray[2].addEventListener('animationEnd', function() {
  console.log('End');
});