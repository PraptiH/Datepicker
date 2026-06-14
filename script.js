const monthYear = document.getElementById('monthYear')
const prevBtn = document.getElementById('prevBtn')
const nextBtn = document.getElementById('nextBtn')
const dates = document.querySelector('.dates')
const todaysDate = document.getElementById('todaysDate')
const dropdownYear = document.getElementById('dropdownYear')
const selectYear = document.getElementById('selectYear')
const calendarIcon = document.getElementById('calendarIcon')


const currentDate = new Date()
let currentYear = currentDate.getFullYear()
let currentMonth = currentDate.getMonth()
let startYear = currentYear - 26


const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"]


function populateYearDropdown() {
    selectYear.innerHTML = ""

    for (let year = currentYear; year >= startYear; year--) {
        const option = document.createElement("option")
        option.value = year
        option.textContent = year
        selectYear.appendChild(option)
    }
   
}

function renderCalender() {

    dates.innerHTML = ""
    monthYear.textContent = `${months[currentMonth]} ${currentYear}`
    const firstDay = new Date(currentYear, currentMonth, 1).getDay()
    const totalDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
    const totalDaysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate()

    let row = document.createElement('tr')

    for (let i = 0; i < firstDay; i++) {
        const prevMonth = document.createElement('td')
        prevMonth.textContent = totalDaysInPrevMonth - firstDay + 1 + i
        prevMonth.classList.add('otherMonth')
        row.appendChild(prevMonth)
    }

    for (let i = 1; i <= totalDaysInMonth; i++) {
        const day = document.createElement('td')
        day.textContent = i
        day.classList.add('date')
        row.appendChild(day)

        if (row.children.length === 7) {
            dates.appendChild(row)
            row = document.createElement('tr')
        }

        if (
            i === currentDate.getDate() &&
            currentMonth === currentDate.getMonth() &&
            currentYear === currentDate.getFullYear()
        ) {
            day.classList.add('currentDate')
            todaysDate.value = `${i}/${currentMonth + 1}/${currentYear}`
            console.log(i)
        }
    }

    let nextMonthDay = 1
    while (row.children.length < 7) {
        const nextMonth = document.createElement('td')
        nextMonth.textContent = nextMonthDay++
        nextMonth.classList.add('otherMonth')
        row.appendChild(nextMonth)
    }


    if (row.children.length > 0) {
        dates.appendChild(row)
    }


}

prevBtn.addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--
    }
    renderCalender()
})

nextBtn.addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++
    }
    renderCalender()
})

calendarIcon.addEventListener('click', () => {
    populateYearDropdown()
    if (typeof selectYear.showPicker === 'function') {
        selectYear.showPicker()
    } else {
        selectYear.focus()
        selectYear.click()
    }
})

selectYear.addEventListener('change', () => {
    currentYear = Number(selectYear.value)
    renderCalender()
})

populateYearDropdown()
renderCalender()