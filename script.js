// Sets the time at the top of the page
let current = $("#currentDay");
let timeNow;

let second = () => {
current.text(moment().format('dddd, MMM Do. h:mm:ss a'));
    timeNow = moment().format('HH');
    timeNow = 15
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
second();
update();

let hasEventListener = false;

let typeIn = document.createElement('input')
typeIn.setAttribute('placeholder','')
workDay.forEach(element => {
    // adds input functionality to each time block.
    element[0].children[0].addEventListener('click', function(){
        hasEventListener = true;
        typeIn = document.createElement('input');
        typeIn.setAttribute('autofocus', true);
        typeIn.setAttribute('placeholder','Add your task')
        element[0].children[1].append(typeIn);
        if (element[0].children[1])
        // adds enter for save functionality
        typeIn.addEventListener('keypress', function(event){
            if (event.keyCode == 13){
                let textToPass = typeIn.value;
                typeIn.value = ''
                typeIn.remove()
                let input = document.createElement("div");
                input.setAttribute('class','entry');
                let text = document.createElement("h3");
                text.textContent = textToPass;
                input.append(text);
                element[0].children[1].append(input)
            }
        })
        // adds save button functionality
        element[0].children[2].addEventListener('click', function(){
            if( typeIn) {
                let textToPass = typeIn.value;
                typeIn.value = ''
                typeIn.remove()
                let input = document.createElement("div");
                input.setAttribute('class','entry');
                let text = document.createElement("h3");
                text.textContent = textToPass;
                input.append(text);
                element[0].children[1].append(input)
            } else console.log('nothing to enter yet')
            
        })
    }) 


    element[0].children[1].addEventListener('click', function(){
        if(hasEventListener == false) {   
            hasEventListener = true; 
            typeIn = document.createElement('input');
            typeIn.setAttribute('autofocus',true);
            typeIn.setAttribute('placeholder','Add your task')
            element[0].children[1].append(typeIn);
            // adds enter for save functionality
            typeIn.addEventListener('keypress', function(event){
                if (event.keyCode == 13){
                    hasEventListener = false;
                    let textToPass = typeIn.value;
                    typeIn.value = ''
                    typeIn.remove()
                    let input = document.createElement("div");
                    input.setAttribute('class','entry');
                    let text = document.createElement("h3");
                    text.textContent = textToPass;
                    input.append(text);
                    element[0].children[1].append(input)
                }
            })
            // adds save button functionality
            element[0].children[2].addEventListener('click', function(){
                if( typeIn) {
                    hasEventListener = false
                    let textToPass = typeIn.value;
                    typeIn.value = ''
                    typeIn.remove()
                    let input = document.createElement("div");
                    input.setAttribute('class','entry');
                    let text = document.createElement("h3");
                    text.textContent = textToPass;
                    input.append(text);
                    element[0].children[1].append(input)
                } else console.log('nothing to enter yet')
            })
        }
    }) 
})


