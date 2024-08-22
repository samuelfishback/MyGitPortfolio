const aboutMeUpArrow = document.getElementById('aboutMeUpArrow');
const myAboutMeItems = document.getElementsByClassName('my-about-me-items');

function carouselUpArrow() {
  console.log('clicked');
  // translate in css x:-50% to center card, stays consistent
  myAboutMeItems[0].style.translate = "-50% -100%";
}

aboutMeUpArrow.addEventListener('click', carouselUpArrow);