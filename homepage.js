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
  /* 
  removes class before animation can play, need a better solution
  aboutMeArray[0].classList.remove('animation-playback');
  aboutMeArray[1].classList.remove('animation-playback');
  aboutMeArray[2].classList.remove('animation-playback');
  */
}

//---------------- TESTING function ------------------
function checkClassArray() {
  for(let i=0;i<aboutMeArray.length;i++) {
    console.log(aboutMeArray[i].getAttribute('value'));
  }
}

aboutMeUpArrow.addEventListener('click', carouselUpArrow);
aboutMeSquare.addEventListener('click', checkClassArray);