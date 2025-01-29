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
  //The condition being less than 2 ensures that the variable buttonPresses never becomes 3 which does render the switch statement incomplete
  if (buttonPresses < 2) {
    buttonPresses++;
  } else {
    buttonPresses = 0;
  }
  //after the new value of the variable is set, call upon the animation funtion.
  carouselUpArrow()
}

function carouselUpArrow() {
  switch (buttonPresses) {
  // translate property in css x:-50% to center card, however transform is a new property and can stack with translate


    case 0:
      //remove the current animation to prevent the positions of the boxes from resetting before applying the animation which roughens the transition
      removeAnimations(2)
      aboutMeArray[0].classList.add('animation-playforward');
      aboutMeArray[1].classList.add('animation-playmiddle');
      aboutMeArray[2].classList.add('animation-playback');
      break;
    case 1:
      removeAnimations(0)
      aboutMeArray[0].classList.add('animation-playback');
  /* this is fun and great but not functional for this task
  aboutMeArray.push(aboutMeArray[0]);
  aboutMeArray.shift();
  */
      aboutMeArray[1].classList.add('animation-playforward');
      aboutMeArray[2].classList.add('animation-playmiddle');
  // removing animations resets positions but not Array index because anim are set in classes
     //setTimeout(()=> removeAnimations(1), 2000);
      break;
    case 2:
      removeAnimations(1)
      aboutMeArray[0].classList.add('animation-playmiddle');
      aboutMeArray[1].classList.add('animation-playback');
      aboutMeArray[2].classList.add('animation-playforward');
      break;
  }
}

/* A function that should work if eventListener is placed on a good element 
   Maybe use a setTimeout(function, seconds) event instead*/
function removeAnimations(index) {
  //initialize a variable of array for holding the current box(s) index before animation
  let indexArr;
  //Here is a little bit tricky but the array of arrays repurposes the array according to the current visible box index, so as to be able to set styles of the boxes in index order
  //the first value in the array of each of the outer array items is the element index while the second value is the z index it will hold
  if (index == 0) indexArr = [[0,'13'], [1,'12'], [2,'10']];
  if (index == 1) indexArr = [[1,'13'], [2,'12'], [0,'10']];
  if (index == 2) indexArr = [[2,'13'], [0,'12'], [1,'10']];

  let currentPositions = ["translate(0, 0) scale(1.0)", "translate(0, 0) scale(0.9)", "translate(0, 0) scale(0.8)"];

  for(let i=0;i<aboutMeArray.length;i++) {
    //set the boxes with their current positions before the animation in order to prevent a reset and enable a smooth transition from the current to the next position
    aboutMeArray[indexArr[i][0]].style.transform=`${currentPositions[i]}`
    //set the curent box with the proper z index for visibility.
    aboutMeArray[indexArr[i][0]].style.zIndex=`${indexArr[i][1]}`

    aboutMeArray[i].classList.remove('animation-playforward', 'animation-playmiddle', 'animation-playback');
    //console.log("removed", indexArr[i][0])
    //console.log(indexArr)
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
//aboutMeUpArrow.addEventListener('click', carouselUpArrow);
aboutMeSquare.addEventListener('click', function() {
  console.log(buttonPresses);
  checkClassArray();
});
/* not logging; maybe because element is changing position in array. need better action */