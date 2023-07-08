function openForm() {
    document.getElementById('myForm').style.display = "block";
}

function closeForm() {
    document.getElementById('myForm').style.display = "none";
}

function openEditForm() {
    document.querySelectorAll('.edit-form')[0].style.display = "block";
}

function closeEditForm() {
    document.querySelectorAll('.edit-form')[0].style.display = "none";
}


function changeView() {
    let weeklyView = document.querySelectorAll(".weekly-view");
    let dailyView = document.querySelectorAll(".daily-view");
    let changeButton = document.getElementById("change-view");
    if (changeButton.innerHTML == "Show Weekly") {
        for (let day of dailyView) {
            day.style.display = "none";
        }

        for (let week of weeklyView) {
            week.style.display = "flex";
        }

        changeButton.innerHTML = "Show Daily";
    } else {
        for (let day of dailyView) {
            day.style.display = "flex";
        }
        for (let week of weeklyView) {
            week.style.display = "none";
        }
        
        changeButton.innerHTML = "Show Weekly";
    }
}