const Habit = require('../models/habit');
const User = require('../models/user');

// creating the habit 
module.exports.create = async function(req,res) {
    try {
        let habit = await Habit.findOne({title: req.body.title, user: req.user._id}).populate();
        if (habit) {
            return res.redirect('/');
        } else {
            let habit = await Habit.create({
                title: req.body.title,
                user: req.user._id,
                dates: {date: await getTodayDate(), completed: "none"}
            });
            req.flash('success',"Habit created successfully");
            return res.redirect('/');
        }
    } catch (err) {
        console.log("Error in creating habits: ",err);
        return;
    }
}

// updating the status from done to not done or not done to none
module.exports.statusUpdate = async function(req, res) {
    try {
        let id = req.query.id;
        let date = req.query.date;
        const habit = await Habit.findById(id);

        if (!habit) {
            console.log("No Habit exists");
            return res.redirect('/');
        }

        let dates = habit.dates;
        let found = false;
        dates.find((item,index)=> {
            if (item.date == date) {
                if (item.complete === 'y') {
                    item.complete = 'n';
                } else if (item.complete === 'n') {
                    item.complete = 'x';
                } else if (item.complete === 'x') {
                    item.complete = 'y';
                }
                found = true;
            }
        });

        if (!found) {
            dates.push({date: date, complete: 'y'});
        }

        habit.dates = dates;
        await habit.save();
        req.flash('success',"Habit status updated successfully");
        return res.redirect('/');
    } catch (err) {
        console.log("Error in status update ", err);
        return;
    }
}

// deleting a habit from the db
module.exports.deleteHabit = async function (req, res) {
    try {
        let id = req.query.id;
        let user = req.user._id;

        await Habit.deleteOne({_id: id, user: user});
        req.flash('success',"Habit deleted successfully");
        return res.redirect('/');
    } catch (err) {
        console.log("Error in deleting Habits",err);
        return;
    }
}

// editing the habit
module.exports.editHabit = async function(req,res) {
    try {
        let newTitle = req.body.title;
        let id = req.query.id;
        let user = req.user._id;
        
        let updatedResult = await Habit.findByIdAndUpdate(
            {
                _id: id,
                user: user
            }, {
                title: newTitle,
            }
        );
        req.flash('success',"Habit updated successfully");
        return res.redirect('/');
    } catch (err) {
        console.log("Error in edititng habits", err);
        return;
    }
}

function getTodayDate() {
    let today = new Date();
    let date = today.getDate();
    let month = today.getMonth()+1;
    let fullDate = month+ " " + date;
    return fullDate;
}