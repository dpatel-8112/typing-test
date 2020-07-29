const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text code").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");


var timer = [0,0,0,0];
var interval;
var timerRunning = false;
var word = 0;
var wordCountStart = 0;


function leadingZero(time) {
    if (time <= 9) {
        time = "0" + time;
    }
    return time;
}



function runTimer() {
    let currentTime = leadingZero(timer[0]) + " : " + leadingZero(timer[1]) + " : " + leadingZero(timer[2]);
    theTimer.innerHTML = currentTime;
    timer[3]++;

    timer[0] = Math.floor((timer[3]/100)/60);
    timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}





function spellCheck() {
    let textEntered = testArea.value;
    let originTextMatch = originText.substring(0,textEntered.length);
    

    if (textEntered == originText) {
        clearInterval(interval);
        testWrapper.style.borderColor = "#429890";
    } else {
        if (textEntered == originTextMatch) {
            testWrapper.style.borderColor = "#65CCf3";
            speedCount();
        } else {
            testWrapper.style.borderColor = "#E95D0F";
        }
    }

}



function speedCount(){
let textEntered = testArea.value;

for(var i=wordCountStart; i<textEntered.length; i++){
	if(textEntered[i] == ' ' ){
		wordCountStart = i+1;
		word++;
		
	}
	else if(textEntered[i] == '!' ){
		word++;
	clearInterval(interval);
	}


document.getElementById('speed').innerHTML = ((word/((timer[0]*60)+timer[1]))*60).toFixed(2) + " words per minute";
}

}






function start() {
    let textEnteredLength = testArea.value.length;
    if (textEnteredLength === 0 && !timerRunning) {
        timerRunning = true;
        interval = setInterval(runTimer, 10);
    }
    console.log(textEnteredLength);
}






function reset() {
    clearInterval(interval);
    interval = null;
    timer = [0,0,0,0];
    timerRunning = false;

    testArea.value = "";
    theTimer.innerHTML = "00 : 00 : 00";
    testWrapper.style.borderColor = "grey";
    document.getElementById('speed').innerHTML = " ";
}







testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);