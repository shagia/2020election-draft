// home state
// var onHome = true
// runner view state
// var onRunner = false
// dual runner view state
// var onRunners = false
var csvData
const navBarSource = document.getElementById('navBar');

const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQCjrJ9uA1brSWer7j14KBGqywYX63GkyenG6l79zbVirQWKsVSHK9cx6NKRnGhGkXQHPYV2o-HPdyQ/pub?output=csv"
async function fetchData(url_){
  const data = await fetch(url_)
            .then(res => res.text()) // convert body stream to string text
            .then(res => d3.csvParse(res)); //d3 csv parse string texts to array of objects
  
  return data;
}
async function init(){
  csvData = await fetchData(url); // fetch data await for async function to continue
  var newNode = document.createElement('div')
  console.log(csvData);

  csvData.forEach(function(element) {
    console.log(element);
    newNode.className = 'iconContainer';
    navBarSource.appendChild(newNode);


  })

}
init();



/* The states let describes what's being shown on the screen. The first state, 0, is for the home screen, the second state, 1, is for the single column runner screen, and the third state, 2, is for the dual column runner screen. */

let states = [true, false, false]


// Runners currently selected
var currSelect = []

// Gets the parent navbar
const navBar = document.getElementById("navBar")
// Gets the children of navbar
const navBarItems = navBar.getElementsByClassName("iconContainer")
// Converts the children to an array because HTMLcollection is not a REAL array
const navBarItemsArray = Array.prototype.slice.call(navBarItems)


// function to add multiple listeners to classes -- really nice!
function addEventListenerList(list, event, fn) {
    for (var i = 0, len = list.length; i < len; i++) {
        list[i].addEventListener(event, fn, false);
    }
}



// This is to support what states are being shown based on currSelect's items 
function updateStateDOM(ele) {

    var sideA = document.getElementById("infoSideA")
    const runnerDeets = document.getElementsByClassName("runnerName")
    const sectionDesc = document.getElementsByClassName("sectionDescription")
    const runnerDesc = document.getElementsByClassName("sectionDescription1")
    const testName = "Tom"


    if (currSelect.length == 0) {
        console.log("Nothin's showin")
        states = [true, false, false]
        sideA.style.display = 'none'
    } else if (currSelect.length == 1) {
        console.log("One thing showin")
        states = [false, true, false]

        sideA.style.display = 'block'

        sideA.getElementsByClassName("runnerName")[0].innerHTML = csvData[ele].Name
        sideA.getElementsByClassName("runnerDetails")[0].innerHTML = csvData[ele].Description
        sideA.getElementsByClassName("sectionDescription1")[0].innerHTML = csvData[ele].Education
        sideA.getElementsByClassName("sectionDescription2")[0].innerHTML = csvData[ele].Health
        sideA.getElementsByClassName("sectionDescription3")[0].innerHTML = csvData[ele].Immigration
        sideA.getElementsByClassName("sectionDescription4")[0].innerHTML = csvData[ele].Civil
        sideA.getElementsByClassName("sectionDescription5")[0].innerHTML = csvData[ele].Environment
        sideA.getElementsByClassName("sectionDescription6")[0].innerHTML = csvData[ele].Gun_Control


        /*sideA.getElementsByClassName("runnerName")[0].innerHTML = runnerBase.runnerNames[ele]
        sideA.getElementsByClassName("runnerDetails")[0].innerHTML = runnerBase.runnerDesc[ele]
        sideA.getElementsByClassName("sectionDescription1")[0].innerHTML = runnerBase.runnerEducation[ele]
        sideA.getElementsByClassName("sectionDescription2")[0].innerHTML = runnerBase.runnerHealth[ele]
        sideA.getElementsByClassName("sectionDescription3")[0].innerHTML = runnerBase.runnerImmigration[ele]
        sideA.getElementsByClassName("sectionDescription4")[0].innerHTML = runnerBase.runnerCivil[ele]
        sideA.getElementsByClassName("sectionDescription5")[0].innerHTML = runnerBase.runnerEnvironment[ele]
        sideA.getElementsByClassName("sectionDescription6")[0].innerHTML = runnerBase.runnerGunControl[ele]*/



    }
}



addEventListenerList(navBarItemsArray, 'click', function() {
    console.log(this.textContent);
    var getChildren = this.getElementsByClassName("iconImg")[0];

    if (this == currSelect[0]) {
        console.log(getChildren.dataset.number);
        currSelect.shift()
        updateStateDOM(getChildren.dataset.number)

    } else if (this == currSelect[1]) {

        console.log(getChildren.dataset.number);
        currSelect.shift()
        updateStateDOM(getChildren.dataset.number)

    } else if (this == currSelect[0] && this ) {

    	console.log(getChildren.dataset.number);
        currSelect.shift()
        updateStateDOM(getChildren.dataset.number)
    }

    else if (currSelect.length == 1) {

        console.log(getChildren.dataset.number);
        currSelect.shift()
        currSelect.push(this)
        updateStateDOM(getChildren.dataset.number)

    } else {
        console.log(getChildren.dataset.number);
        currSelect.push(this);
        updateStateDOM(getChildren.dataset.number);
    }

})