var unorderedArray = [10];
var orderedArray = [10];
var isOrdered = false;
const generatorButton = document.getElementById("randomNumberGenerator");
const organizerButton = document.getElementById("orderedNumberOrganizer");
const testButton = document.getElementById("testButton");
const randomNumberList = document.getElementById("randomNumberList");
const orderedNumberList = document.getElementById("orderedNumberList");

organizerButton.disabled = true;

function randomTo21() {
	return Math.ceil(Math.random() * 21);
}

function printUnordered(ar) {
	let li = document.createElement('li');
	li.className = "random-number";
	li.textContent = ar;
	randomNumberList.appendChild(li);
}

function printOrdered(ar) {
	let li = document.createElement('li');
	li.className = "random-number";
	li.textContent = ar;
	orderedNumberList.appendChild(li);
	isOrdered = true;
}

function nonRepeating() {
	for (i=0; i<unorderedArray.length; i++) {
		for (j=i+1; j<unorderedArray.length; j++) {
			if (unorderedArray[i] == unorderedArray[j]) {
				unorderedArray[j] = randomTo21();
				i=(-1);
				console.log(unorderedArray);
				break;
			}
		}
	}
}

function makeAscending() {
	for (i=0; i<unorderedArray.length; i++) {
		for (j=i+1; j<unorderedArray.length; j++) {
			if (unorderedArray[i] > unorderedArray[j]) {
				let a = unorderedArray[j];
				unorderedArray[j] = unorderedArray[i];
				unorderedArray[i] = a;
			}
		}
	}
	console.log(unorderedArray);
}

function printToPage(...ar) {
	unorderedArray.forEach(...ar);
}

function eraseOldNumbers() {
	let oldList = document.getElementsByClassName("random-number");
	while(oldList.length > 0) {
		oldList[0].remove();
	}
}

function generatorClick(e) {
	e.preventDefault();
	eraseOldNumbers();
	for (i=0; i<10; i++) {
		unorderedArray[i] = randomTo21();
	}
	console.log(unorderedArray);
	nonRepeating();
	printToPage(printUnordered);
	isOrdered = false;
	organizerButton.disabled = false;
}

function organizerClick(e) {
	e.preventDefault();
	if (isOrdered == false) {
		makeAscending();
		printToPage(printOrdered);
	}
}

generatorButton.addEventListener("click", generatorClick);
organizerButton.addEventListener("click", organizerClick);