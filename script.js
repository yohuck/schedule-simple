// Sets the time at the top of the page
let current = $("#currentDay");
let timeNow;

// Updates time every second
setInterval(function(){
    current.text(moment().format('dddd, MMM Do. h:mm:ss a'));
    timeNow = moment().format('HH');
    timeNow = 15
    update();
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
let latePM = $('#23');
let workDay = [nineAM, tenAM, elevenAM, twelvePM, onePM, twoPM, threePM, fourPM, fivePM, latePM];

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


workDay.forEach(element => {
    element[0].addEventListener('click', function(){
        let input = document.createElement("input")
        element[0].children[1].append(input)
        console.log(element[0].children[1])
    })  
})