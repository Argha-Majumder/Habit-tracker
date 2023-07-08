# Habit Tracker

In this web app an user can view and track their habits and mark the status of the habits as done/not-done/none.

![image](https://github.com/Argha-Majumder/Habit-tracker/assets/81928385/c10b430c-e94d-444d-aa50-daa604f867d6)

## Technologies Used

1. NodeJS
2. Express
3. MongoDB
4. SCSS
5. Git

## Installation

Step-by-step process for installation:

1. First clone the repository using the command

```
git clone https://github.com/Argha-Majumder/Habit-tracker.git
```

2. The go to the directory where this file is located and install the required package using

```
npm install
```

3. Now start the server by opening a terminal and use this command

```
npm start
```

4. Then open any web browser and type 
https://localhost:8000

## Folder Structure

Habit-tracker
    
    |
    |----assets
    |       |-----css
    |       |-----images
    |       |-----js
    |       |-----scss
    |
    |----config
    |       |-----middleware.js
    |       |-----mongoose.js
    |       |-----passport-local-strategy.js
    |
    |----controllers
    |       |-----habit_controller.js
    |       |-----home_controller.js
    |       |-----users_controller.js
    |
    |----models
    |       |-----habit.js
    |       |-----user.js
    |
    |----routes
    |       |-----habit.js
    |       |-----index.js
    |       |-----users.js
    |
    |----views
    |       |-----_footer.ejs
    |       |-----_header.ejs
    |       |-----daily_view.ejs
    |       |-----home.ejs
    |       |-----layout.ejs
    |       |-----user_profile.ejs
    |       |-----user_sign_in.ejs
    |       |-----user_sign_up.ejs
    |       |-----weekly_view.ejs
    |
    |-----.gitignore
    |
    |-----index.js
    |
    |-----package-lock.json
    |
    |-----package.json
    |
    |-----README.md
