const monthSelect = document.getElementById("month-select");
const yearSelect = document.getElementById("year-select");
const calendar = document.getElementById('calendar');
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let nav = 0;

window.addEventListener("load", function () {

    monthSelect.value = new Date().getMonth();
    yearSelect.value = new Date().getFullYear();

});


window.addEventListener('load', function() {
    loadColorsFromLocalStorage();
    updateCalendar();
});


window.addEventListener("load", function () {
    updateCalendar();

});


populateYearDropdown();


function populateYearDropdown() {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 100; 
    const endYear = currentYear + 100;   

    for (let year = startYear; year <= endYear; year++) {
        const option = document.createElement("option");
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    }

   
    yearSelect.addEventListener("change", updateCalendar);


    populateMonthDropdown();
}


function populateMonthDropdown() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    for (let i = 0; i < months.length; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = months[i];
        monthSelect.appendChild(option);
    }
    monthSelect.addEventListener("change", updateCalendar);

}







let month = 0; 
function updateCalendar() {
  
     month = monthSelect.value;
    const year = yearSelect.value;
   
    load(month, year);
    setTimeout(()=>{
        loadColorsFromLocalStorage()
    },1)
}

function load(month, year) {
    const dt = new Date();

   

    const day = dt.getDate();
    const firstDayOfMonth = new Date(year, month, 1);
    console.log(firstDayOfMonth)
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    console.log(daysInMonth)
    
    const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });
    console.log(dateString)
    const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);
  
    // Clear the calendar
    calendar.innerHTML = '';
  
 

    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
        const daySquare = document.createElement('div');
        daySquare.classList.add('day');
  
        if (i > paddingDays) {
            daySquare.innerText = i - paddingDays;
  
            if (i - paddingDays === day ) {
                daySquare.id = 'currentDay';
            }
        } else {
            daySquare.classList.add('padding');
        }
  
        calendar.appendChild(daySquare);    
    }
}






function highlightDay(date, month) {
    const dayDivs = document.querySelectorAll('.day');
    dayDivs.forEach((dayDiv) => {
        if (dayDiv.innerText === date) {
            const isGreen = dayDiv.style.backgroundColor === 'green';
            dayDiv.style.backgroundColor = isGreen ? 'white' : 'green';

            
            const storageKey = `${month}-${date}`;
            localStorage.setItem(storageKey, JSON.stringify(isGreen ? 'white' : 'green'));
        }
    });
}





function loadColorsFromLocalStorage() {
    const dayDivs = document.querySelectorAll('.day');
    dayDivs.forEach((dayDiv) => {
        const date = dayDiv.innerText;
        const month = monthSelect.value; 

        
        const storageKey = `${month}-${date}`;
        const color = JSON.parse(localStorage.getItem(storageKey));

        if (color) {
            dayDiv.style.backgroundColor = color;
        }
    });
}


setTimeout(()=>{
    loadColorsFromLocalStorage()
},1)

document.querySelector('button').addEventListener('click', function() {
    const enteredDate = document.querySelector('input').value;
    highlightDay(enteredDate,month);
});




