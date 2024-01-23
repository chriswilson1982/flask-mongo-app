# Template for a basic web app using Python Flask and MongoDB

This is a template for a web app using Flask and MongoDB. It uses Flask-Login for authentication, Flask-Pymongo for the database connection, Flask-Bcrypt for password hashing and Flask-Talisman for security. The front end uses Bootstrap for styling. The app features user verification by email, basic note recording and messaging between users with email notifications.

## How to use the template

Simply insert your MongoDB database URI and database name in the ```configuration.ini``` file. You can also add SMTP server login details to support sending registration emails and message notifications to users.

Run the app using the terminal command: ```python run.py```

## Live demo

The app is live for demonstration purposes at [demo.chriswilson.app](https://demo.chriswilson.app).
