const aboutMeUpArrow = document.getElementById('aboutMeUpArrow');
const myAboutMeItems = document.getElementsByClassName('my-about-me-items');

function carouselUpArrow() {
  // translate property in css x:-50% to center card, however transform is a new property and can stack with translate
  myAboutMeItems[0].style.transform = "scale(0.8) translate(0, -120%)";
}

aboutMeUpArrow.addEventListener('click', carouselUpArrow);