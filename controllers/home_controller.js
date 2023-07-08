const Habit = require('../models/habit');
const User = require('../models/user');

module.exports.home = async function(req, res) {
    if (req.user) {
        let habits = await Habit.find({user: req.user._id});
        return res.render('home', {
            title: "Habit Tracker",
            habits: habits,
            weeklyDates: await getWeekDate()
        });
    } else {
        return res.render('home', {
            title: "Home"
        });
    }
};

function getWeekDate() {
    let months = ["","Jan", "Feb", "March", "Apr", "May", "June", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    let dates = [];
    for (let i=6; i>=0;i--) {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate()-i);
        let monthIndex = currentDate.getMonth()+1;
        let month = months[monthIndex];
        let day = currentDate.getDate();
        if (day < 10) {
            day = '0'+day;
        }
        dates.push(month+" "+day);
    }
    return dates;
}