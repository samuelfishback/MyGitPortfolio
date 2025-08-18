const aboutMeSquare = document.getElementById('aboutMeSquare');
const aboutMeUpArrow = document.getElementById('aboutMeUpArrow');
const myAboutMeItems = document.getElementsByClassName('my-about-me-items');
const aboutMeArray = Array.from(myAboutMeItems);
const firstCard = document.getElementById('firstCard'); // remove after test
firstCard.style.top = '3rem';
var buttonPresses = 0;
let frontCardPosition = '-32rem';
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
  ✓ add function for keeping time and animation duration
  ✓ create function for ease out formula
  * create function for moving boxes (animation)
  ✓ remove animation classes from css
*/

function animateFrontCard() {
	const startTime = performance.now();
	const startPosition = parseInt(firstCard.style.top);
	let endPosition = parseInt(frontCardPosition);
	
	function animationFirstStep(currentTime){
		const elapsed = currentTime - startTime;
		const t = Math.min(elapsed / 1000, 1);
		// the miliseconds for the animation to finish
		const easingT = easeInOutQuad(t);
		
		firstCard.style.top = startPosition + (endPosition - startPosition) * easingT + 'rem';
		
		if (t < 1) {
			requestAnimationFrame(animationFirstStep);
		}
	}
	
	function animationSecondStep(currentTime) {
		const elapsed = currentTime - startTime;
		const t = Math.min(elapsed / 500, 1);
		const easingT = easeInOutQuad(t);
		
		//changing subtrahend changes entire animation height
		endPosition = parseInt(startPosition) - 0;
		firstCard.style.top = startPosition + (endPosition - startPosition) * easingT + 'rem';
		
		if (t < 1) {
			requestAnimationFrame(animationSecondStep);
		}
	}
	requestAnimationFrame(animationFirstStep);
	//requestAnimationFrame(animationSecondStep);
}

function carouselIncrement() {
  buttonPresses < 2 ? buttonPresses++ : buttonPresses = 0;
}

// unused until first card is complete
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

//----------------------------------------------------

aboutMeUpArrow.addEventListener('click', animateFrontCard);

aboutMeSquare.addEventListener('click', function() {
  console.log(buttonPresses);
	console.log(firstCard.style.top);
  //checkClassArray();
});