/* global d3, addeventlistenerlist, updatestatedom */

var csvData = []
const navBarSource = document.getElementById('navBar');
/* The states let describes what's being shown on the screen. The first state, 0, is for the home screen, the second state, 1, is for the single column runner screen, and the third state, 2, is for the dual column runner screen. */
let states = [true, false, false]
// Runners currently selected
var currSelect = []

// Gets the parent navbar
const navBar = document.getElementById("navBar")


const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQCjrJ9uA1brSWer7j14KBGqywYX63GkyenG6l79zbVirQWKsVSHK9cx6NKRnGhGkXQHPYV2o-HPdyQ/pub?output=csv"
async function fetchData(url_) {
    const data = await fetch(url_)
        .then(res => res.text()) // convert body stream to string text
        .then(res => d3.csvParse(res)); //d3 csv parse string texts to array of objects

    return data;
}



async function init() {
    csvData = await fetchData(url); // fetch data await for async function to continue

    for (let i = 0; i < csvData.length; i++) {

        // Draws a node for each array in the csv, gets the relevant array key through the current iteration number
        /******
        No Neeed to declare generateIcon function inside a for loop,
        othewise for each iteration you will be spending computing redeclaring a function,
        deafeating the purporse of code reuse, i've moved it away, plus 
    
        your original function you pass i as parameter key, but then use csvData[i] which is not
        delcared in the scope of generateIcon.
    
        What you probably want to do is to generateIcon(csvData[i]) passing the current csvRowEntry row you're
        interating over and the index for the key as you've design
         
         you can add the addEventListener on your generate Icon too
        *******/
        generateIcon(csvData[i], i)
    }

    // Gets the children of navbar
    const navBarItems = document.getElementById("navBar").getElementsByClassName("iconContainer")
    const iconImgItems = document.getElementById("navBar").getElementsByClassName("iconImg")
    // Converts the children to an array because HTMLcollection is not a REAL array
    const navBarItemsArray = Array.from(navBarItems)
    console.log(navBarItemsArray);
    /*const iconImgItemsArray = Array.prototype.slice.call()*/

    /* remove window load , eventlistener is on generteIcon */

}
init();


function generateIcon(csvRowEntry, key) {
    // gets csv row and key an generate icons
    var newAnchor = document.createElement('a')
    newAnchor.className = 'iconContainer iconImg';
    newAnchor.href = "#";
    newAnchor.dataset.number = key

    var imgNode = document.createElement('img')
    imgNode.src = "https://picsum.photos/100/100"
    imgNode.className = 'iconImgSrc'

    var textNode = document.createTextNode(csvRowEntry.Name);

    newAnchor.appendChild(imgNode);
    newAnchor.appendChild(textNode);
    newAnchor.addEventListener('click', navClick); // add event in each a link, call navClick
    navBarSource.appendChild(newAnchor);
}

function navClick(event) {
    //**this** is the dom scope for the element the event is coming
    //therefore you don't need to select it, **this** is the selection
    const dataNumber = this.dataset.number;
    console.log("coming from: ", dataNumber);
    currSelect = dataNumber;
    updateStateDOM(dataNumber);
}


function updateStateDOM(ele) {

    console.log(this)

    var sideA = document.getElementById("infoSideA")
    const runnerDeets = document.getElementsByClassName("runnerName")
    const sectionDesc = document.getElementsByClassName("sectionDescription")
    const runnerDesc = document.getElementsByClassName("sectionDescription1")
    const testName = "Tom"

    sideA.style.display = 'block'

    sideA.getElementsByClassName("runnerName")[0].innerHTML = csvData[ele].Name
    sideA.getElementsByClassName("runnerDetails")[0].innerHTML = csvData[ele].Description
    sideA.getElementsByClassName("sectionDescription1")[0].innerHTML = csvData[ele].Education
    sideA.getElementsByClassName("sectionDescription2")[0].innerHTML = csvData[ele].Health
    sideA.getElementsByClassName("sectionDescription3")[0].innerHTML = csvData[ele].Immigration
    sideA.getElementsByClassName("sectionDescription5")[0].innerHTML = csvData[ele].Environment
    sideA.getElementsByClassName("sectionDescription6")[0].innerHTML = csvData[ele].Gun_Control

}