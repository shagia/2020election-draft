// home state
// var onHome = true
// runner view state
// var onRunner = false
// dual runner view state
// var onRunners = false


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
    var sideB = document.getElementById("infoSideB")
    const runnerDeets = document.getElementsByClassName("runnerName")
    const sectionDesc = document.getElementsByClassName("sectionDescription")
    const testName = "Tom"


    if (currSelect.length == 0) {
        console.log("Nothin's showin")
        states = [true, false, false]
        sideA.style.display = 'none'
        sideB.style.display = 'none'
    } else if (currSelect.length == 1) {
        console.log("One thing showin")
        states = [false, true, false]

        sideA.style.display = 'block'
        sideB.style.display = 'none'


        sideA.getElementsByClassName("runnerName")[0].innerHTML = runnerBase.runnerNames[ele]
        sideA.getElementsByClassName("runnerDetails")[0].innerHTML = runnerBase.runnerDesc[ele]

    } else if (currSelect.length == 2) {
        console.log("Two things showin")
        states = [false, false, true]

        sideB.style.display = 'block'

        sideB.getElementsByClassName("runnerName")[0].innerHTML = runnerBase.runnerNames[ele]
        sideB.getElementsByClassName("runnerDetails")[0].innerHTML = runnerBase.runnerDesc[ele]

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

    } else if (currSelect.length == 2) {

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