//TODO: Move to React soon
var csvData = []
const navBarSource = document.getElementById('navBar');
// Runners currently selected
var currSelect = []
var currLocation = [];
var rawLocation = [];
//Tool to split location coordinates into an array for Mapbox
const splitFunc = location => location.split(", ");

//Mapbox interaction
function flyToLocation(coords) {
    map.flyTo({
        center: (coords),
        zoom: 9
    });
}

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
        generateIcon(csvData[i], i)
    }
}
init();

function generateIcon(csvRowEntry, key) {
    // gets csv row and key and generates icons
    var newAnchor = document.createElement('a')
    newAnchor.className = 'iconContainer iconImg';
    newAnchor.href = "#";
    newAnchor.dataset.number = key

    var imgNode = document.createElement('img')
    var divNode = document.createElement('div')
    divNode.className = 'iconName'
    imgNode.src = csvData[key].Image
    imgNode.className = 'iconImgSrc'

    var textNode = document.createTextNode(csvRowEntry.Name);

    newAnchor.appendChild(imgNode);
    divNode.appendChild(textNode);
    newAnchor.appendChild(divNode);
    newAnchor.addEventListener('click', navClick); // add event in each a link, call navClick
    navBarSource.appendChild(newAnchor);
}

function navClick(event) {
    //All icons now refer to this function, therefore no need to call the children of a DOM object
    const dataNumber = this.dataset.number;
    console.log("coming from: ", dataNumber);

    function grabLocation(ele) {
        rawLocation = csvData[dataNumber].Location
        console.log(rawLocation);

        currLocation = splitFunc(rawLocation)
        console.log(currLocation);

    }
    grabLocation(this);
    currSelect = dataNumber;
    updateStateDOM(dataNumber);
    flyToLocation(currLocation);

}


function updateStateDOM(ele) {
    console.log(this)
    var sideA = document.getElementById("infoSideA")
    var sideIntro = document.getElementById("infoIntro")
    const runnerDeets = document.getElementsByClassName("runnerName")
    const sectionDesc = document.getElementsByClassName("sectionDescription")
    const runnerDesc = document.getElementsByClassName("sectionDescription1")
    const runnerPic = document.getElementById("headShotSrc")

    sideA.style.display = 'block'
    sideIntro.style.display = 'none'
    runnerPic.src = csvData[ele].Image

    sideA.getElementsByClassName("runnerName")[0].innerHTML = csvData[ele].Name
    sideA.getElementsByClassName("runnerDetails")[0].innerHTML = csvData[ele].Description
    sideA.getElementsByClassName("sectionDescription1")[0].innerHTML = csvData[ele].Education
    sideA.getElementsByClassName("sectionDescription2")[0].innerHTML = csvData[ele].Health
    sideA.getElementsByClassName("sectionDescription3")[0].innerHTML = csvData[ele].Immigration
    sideA.getElementsByClassName("sectionDescription5")[0].innerHTML = csvData[ele].Environment
    sideA.getElementsByClassName("sectionDescription6")[0].innerHTML = csvData[ele].Gun_Control


}