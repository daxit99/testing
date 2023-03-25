// define variables
var prompt = document.getElementById("prompt");
var input = document.getElementById("input");
var startBtn = document.getElementById("start-btn");
var submitBtn = document.getElementById("submit-btn");
var restartBtn = document.getElementById("restart-btn");
var result = document.getElementById("result");
var time = document.getElementById("time");

// const accessKey = 'Yj8x5s6OF65pW5DvucXLPoMaHVm3Ve1QH0ECRk76GZEM';
// const apiUrl = 'https://api.unsplash.com/photos/random?query=programming&orientation=landscape';

// // get a random photo from the Unsplash API
// async function getRandomPhoto() {
//   const response = await fetch(apiUrl, {
//     headers: {
//       'Authorization': `Client-ID ${accessKey}`
//     }
//   });
//   const data = await response.json();
//   return data.urls.full;
// }

// // set the background image of the body element to a random photo
// async function setRandomBackground() {
//   const photoUrl = await getRandomPhoto();
//   document.body.style.backgroundImage = `url(${photoUrl})`;
// }

// // call setRandomBackground on page load
// setRandomBackground();


var sentences = [
"The quick brown fox jumps over the lazy dog.",
"Sphinx of black quartz, judge my vow.",
"Pack my box with five dozen liquor jugs.",
"How vexingly quick daft zebras jump!",
"The five boxing wizards jump quickly.",
"Jaded zombies acted quaintly but kept driving their oxen forward.",
"The job requires extra pluck and zeal from every young wage earner.",
"Two driven jocks help fax my big quiz.",
"Woven silk pyjamas exchanged for blue quartz.",
"Amazingly few discotheques provide jukeboxes."
];

var currentSentence = "";
var currentIndex = 0;
var startTime = 0;
var endTime = 0;
var intervalId = null;

// generate random sentence and display
function generateSentence() {
var randomIndex = Math.floor(Math.random() * sentences.length);
currentSentence = sentences[randomIndex];
prompt.innerHTML = currentSentence;
}

// start the typing test and timer
function startTest() {
input.disabled = false;
input.focus();
startBtn.style.display = "none";
submitBtn.style.display = "block";
restartBtn.style.display = "none";
currentIndex = 0;
startTime = new Date().getTime();
intervalId = setInterval(function() {
var currentTime = new Date().getTime();
var timeTaken = (currentTime - startTime) / 1000;
time.innerHTML = "Time taken: " + timeTaken + " s";
}, 1000);
}

// stop the timer and submit the typing test, then display results
function submitTest() {
clearInterval(intervalId);
input.disabled = true;
submitBtn.style.display = "none";
restartBtn.style.display = "block";
endTime = new Date().getTime();
var timeTaken = (endTime - startTime) / 1000;
var words = currentSentence.split(" ").length;
var accuracy = calculateAccuracy();
var speed = calculateSpeed(timeTaken, words);
result.innerHTML = "Speed: " + speed + " WPM, Accuracy: " + accuracy + "%, Time taken: " + timeTaken + " s";
}

// restart the typing test
function restartTest() {
generateSentence();
input.value = "";
result.innerHTML = "";
time.innerHTML = "";
startTest();
}

// calculate the typing accuracy
function calculateAccuracy() {
var typedText = input.value;
var errorCount = 0;
for (var i = 0; i < typedText.length; i++) {
if (typedText[i] !== currentSentence[i]) {
errorCount++;
}
}
return ((currentSentence.length - errorCount) / currentSentence.length * 100).toFixed(2);
}

// calculate the typing speed
function calculateSpeed(timeTaken, words) {
var minutes = timeTaken / 60;
return (words / minutes).toFixed(0);
}

// initialize the typing test
function init() {
generateSentence();
startBtn.addEventListener("click", startTest);
submitBtn.addEventListener("click", submitTest);
restartBtn.addEventListener("click", restartTest);
}

init();