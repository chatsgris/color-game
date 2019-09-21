var rgb = document.querySelector("#rgb");
var squares = document.querySelectorAll("td");
var newColors = document.querySelector("#newColors");
var colorList = getColorList();
var rgbColor;
var isEasy = false;
var easy = document.querySelector("#easy");
var hard = document.querySelector("#hard");

function getColorList() {
	var colorList = [];
	for(var i=0; i<18; i++) {
		colorList.push(Math.ceil(Math.random() * 255));
	};
	return colorList;
}

function getSquareOrder() {
	var inputList;
	if (isEasy) {
		inputList = [0,1,2];
	} else {
		inputList = [0,1,2,3,4,5];
	}
	var outputList = [];
	for(var i=inputList.length; i>0; i--) {
		var x = inputList.splice(Math.ceil(Math.random() * (i-1)),1);
		outputList.push(x);
	}
	return outputList;
}

function setRgb(rgb) {
	rgbColor = colorList.slice(0,3).join(", ");
	rgb.textContent = rgbColor;
}

function setColortoSquare(squareOrder) {
	squareOrder.forEach(function(i) {
		var color = "rgb(" + colorList.splice(0,3).join() + ")";
		squares[i].style.background = color;
	});
}

function selectSquare() {
	if (this.style.background.includes(rgbColor)){
		alert("Correct guess!");
		reset();
	} else {
		this.style.background = "rgb(47,53,66)";
	}
}

function reset() {
	colorList = getColorList();
	setRgb(rgb);

	if (isEasy) {
		for(var i=3; i<6; i++){
			squares[i].style.display = "none";
		}
	} else {
		for(var i=0; i<6; i++){
			squares[i].style.display = "";
		}
	}

	squareOrder = getSquareOrder();
	setColortoSquare(squareOrder);
}

function selectEasy() {
	isEasy = true;
}

function selectHard() {
	isEasy = false;
}

/*set the rgb color*/ 
setRgb(rgb);

/*set colors to squares*/
var squareOrder = getSquareOrder();
setColortoSquare(squareOrder);

/*add event listener to new colors*/
newColors.addEventListener("click", reset);

/*add event listener to squares*/
for(var i=0; i<squareOrder.length; i++){
	squares[i].addEventListener("click", selectSquare);
}

/*add event listener to easy and hard buttons*/
easy.addEventListener("click", function(){
	isEasy = true;
	reset();
})
hard.addEventListener("click", function(){
	isEasy = false;
	reset();
})
