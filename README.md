# Template for a basic web app using Python Flask and MongoDB

This is a template for a basic web app using Flask and MongoDB. It uses Flask-Login for authentication, Flask-Pymongo for the database connection, Flask-Bcrypt for password hashing and Flask-Talisman for security. The front end uses Bootstrap for styling. The app features user verification by email, basic note recording and messaging between users with email notifications.

## How to use the template

Simply insert your MongoDB database URI and database name in the ```configuration.ini``` file. You can also add SMTP server login details to support sending registration emails and message notifications to users.

Run the app using the terminal command: ```python run.py```

## Live example

The app is live at [chriswilson.herokuapp.com](https://chriswilson.herokuapp.com) as a demonstration. It is essentially identical to the code in the repository but also uses Font Awesome for icons. Please note that if you enter any registration data it will be saved. Other users will be able to see the name you enter (for messaging purposes), but your email address will never be disclosed or passed to third parties. You can delete your registration from the profile page, or alternatively contact me to have your details removed.
