const aboutMeSquare = document.getElementById('aboutMeSquare');
const aboutMeUpArrow = document.getElementById('aboutMeUpArrow');
const myAboutMeItems = document.getElementsByClassName('my-about-me-items');
const aboutMeArray = Array.from(myAboutMeItems);
const firstCard = document.getElementById('firstCard'); // remove after test
var buttonPresses = 0;
let positions = 
  [
    {top: '3rem', zIndex: '13', transform: 'scale(1.0)'},
    {top: '0rem', zIndex: '12', transform: 'scale(0.9)'},
    {top: '-3rem', zIndex: '11', transform: 'scale(0.8)'}
  ];
  
function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

let animationDuration = 500; //in miliseconds
/* 
TODO: 
  * add function for keeping time and animation duration
  ✓ create function for ease out formula
  * create function for moving boxes (animation)
  ✓ remove animation classes from css
*/

// Starts at zero on page load. After three, resets to one, not zero
function carouselIncrement() {
  buttonPresses < 2 ? buttonPresses++ : buttonPresses = 0;
}

function carouselUpArrow() {
  animateCards(firstCard, positions[buttonPresses], animationDuration);
	carouselIncrement();
  //switch (buttonPresses) {}
	//let's get the first card working before adding switch
	
}

function animateCards(myItem, endPosition, duration){
	const startTime = performance.now();
	const startTop = parseInt(myItem.style.top);
	const endTop = parseInt(endPosition.top);
	console.log(startTop);
	console.log(endTop);
	
  function animationStep(currentTime){
	  const elapsed = currentTime - startTime;
    const t = Math.min(elapsed / duration, 1); // normalize time to [0,1]
		const easingT = easeInOutQuad(t);
		
		myItem.style.top = startTop + (endTop - startTop) * easingT + 'rem';
		
		if (t < 1) {
			requestAnimationFrame(animationStep); // continue animation
		}
	}
  requestAnimationFrame(animationStep); // start animation	
}

//---------------- TESTING function ------------------
function checkClassArray() {
  for(let i=0;i<aboutMeArray.length;i++) {
    console.log(aboutMeArray[i].getAttribute('value'));
    console.log(aboutMeArray[i].classList);
  }
}
//----------------------------------------------------

aboutMeUpArrow.addEventListener('click', carouselUpArrow);
aboutMeSquare.addEventListener('click', function() {
  console.log(buttonPresses);
	console.log(firstCard.style.top);
  //checkClassArray();
});