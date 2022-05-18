// Sets the time at the top of the page
let current = $("#currentDay");
let timeNow;

// To run on interval - sets the time text and calls the update to change block colors on hour change
let second = () => {
current.text(moment().format('dddd, MMM Do. h:mm:ss a'));
    timeNow = moment().format('HH');
    // timeNow = 15
    update();
}

// Updates time every second
setInterval(function(){
    second();
}, 1000)

// Accesses the rows by time
let nineAM = $("#09");
let tenAM = $('#10');
let elevenAM = $('#11');
let twelvePM = $('#12');
let onePM = $('#13');
let twoPM = $('#14');
let threePM = $('#15');
let fourPM = $('#16');
let fivePM = $('#17');
let workDay = [nineAM, tenAM, elevenAM, twelvePM, onePM, twoPM, threePM, fourPM, fivePM];

// Updates time blocks based on current time
let update = () => {
    workDay.forEach( element => {
        // past times
        if (element[0].id < timeNow){
            element[0].classList.add('past')
            if (element[0].classList.contains('current')) {
                element[0].classList.remove('current')
            }
            if (element[0].classList.contains('future')) {
                element[0].classList.remove('future');
            }
        } 
        // current time
        else if (element[0].id == timeNow ){
            element[0].classList.add('current')
            if (element[0].classList.contains('future')) {
                element[0].classList.remove('future')
            }
            if (element[0].classList.contains('past')){
                element[0].classList.remove('past');
            }
        } 
        // future
        else {
            element[0].classList.add('future');
            if (element[0].classList.contains('current')){
                element[0].classList.remove('current')
            }
        }
    })
}

// Initialization of time and format for rows on page load
second();
update();


workDay.forEach(element => {
    // Ensures event inputs do not stack.
    let hasEventListener = false;
    let typeIn = document.createElement('input');
    typeIn.setAttribute('placeholder','');  
    // Callback function for input functionality
    let createInput = () => {
        // console.log(element[0])
        if (hasData[element[0].id] == true){
            hasEventListener = true;
            typeIn.setAttribute('autofocus', true)
            typeIn.setAttribute('value', element[0].children[1].textContent.trim())
            if (element[0].children[1].children.length === 1){
                element[0].children[1].children[0].remove()
            element[0].children[1].append(typeIn)}
            else console.log('okay')
            } 
        else {
        hasEventListener = true;
        typeIn.setAttribute('autofocus', true);
        typeIn.setAttribute('placeholder','Add your task')
        element[0].children[1].append(typeIn);
        }
    }
    // Callback for save functionality
    let saveFunc = () => {
        hasEventListener = false;
        let textToPass = typeIn.value;
        typeIn.remove();
        typeIn.value = ''
        let input = document.createElement("div");
        input.setAttribute('class','entry');
        let text = document.createElement("h3");
        text.textContent = textToPass;
        input.append(text);
        element[0].children[1].append(input);
        let idToPass = element[0].id
        hasData[idToPass] = true;
        console.log(hasData)
        storageCallback(idToPass,textToPass);
        }
    // Callback for adding save button and return to save
    let saveFunctions = () => {
        // adds return for save functionality
        typeIn.addEventListener('keypress', function(event){
            if (event.keyCode == 13){
                saveFunc();
            }
        })
        // adds save button functionality
        element[0].children[2].addEventListener('click', function(){
            saveFunc();
        })
        }
    // Callback Function to save local storage
    let storageCallback = (id, text) => {
        let storedItems = localStorage.getItem('storedLocalItems');
        storedItems = storedItems? JSON.parse(storedItems) : {};
        storedItems[id] = text;
        localStorage.setItem('storedLocalItems',JSON.stringify(storedItems));
    }
    // click time to add event
    element[0].children[0].addEventListener('click', function(){
        createInput();
        saveFunctions();
    }) 
    // click row to add event -- checks to block stacking
    element[0].children[1].addEventListener('click', function(){
        console.log(element[0].children[1].children.length == 0)
        if(hasEventListener == false) {   
            createInput();
            saveFunctions();
        } else console.log('hello')
    }) 
})

let hasData = {
    09: false,
    10: false,
    11: false,
    12: false,
    13: false,
    14: false,
    15: false,
    16: false,
    17: false
}

console.log(hasData)

const storedEvents = JSON.parse(localStorage.getItem('storedLocalItems'));
console.log(storedEvents)

for (let id in storedEvents){
    hasData[id] = true;
    let format = "#" + id
    let toAppend = $(format);
    toAppend = toAppend.children()[1]
    let text = document.createElement("h3");
        text.textContent = storedEvents[id];
        toAppend.append(text);
}

console.log(hasData)