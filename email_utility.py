from flask import url_for, render_template
import smtplib
import ssl
import configparser
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from verification import generate_confirmation_token


# Common email sending function
def send_email(receiver_email, subject, plaintext, html):

    # Connection configuration
    config = configparser.ConfigParser()
    config.read('configuration.ini')
    email_config = config['EMAIL']
    SMTP_SERVER = email_config['SMTP_SERVER']
    PORT = 587  # For starttls
    SENDER_EMAIL = email_config['SENDER_EMAIL']
    PASSWORD = email_config['PASSWORD']

    # Message setup
    message = MIMEMultipart("alternative")
    message["Subject"] = subject
    message["From"] = SENDER_EMAIL
    message["To"] = receiver_email

    # Turn text into plain or HTML MIMEText objects
    part1 = MIMEText(plaintext, "plain")
    part2 = MIMEText(html, "html")

    # Add HTML/plain-text parts to MIMEMultipart message
    # The email client will try to render the last part first
    message.attach(part1)
    message.attach(part2)

    # Create a secure SSL context
    context = ssl.create_default_context()

    # Try to log in to server and send email
    try:
        server = smtplib.SMTP(SMTP_SERVER, PORT)
        server.ehlo()
        server.starttls(context=context)  # Secure the connection
        server.ehlo()
        server.login(SENDER_EMAIL, PASSWORD)
        server.send_message(message)
    except Exception as e:
        # Print error messages to stdout
        print(e)
        return False
    finally:
        server.quit()
        return True


# Convenience function - registration / verification email
def send_registration_email(user):
    token = generate_confirmation_token(user.email)
    confirm_url = url_for('confirm_email', token=token, _external=True)
    subject = "Registration successful - Please verify your email address."
    plaintext = f"Welcome {user.display_name()}.\nPlease verify your email address by following this link:\n\n{confirm_url}"
    html = render_template('verification_email.html',
                           confirm_url=confirm_url, user=user)
    send_email(user.email, subject, plaintext, html)


# Convenience function - message received notification
def send_message_email(from_user, to_user, message):
    subject = f"{from_user.display_name()} sent you a message"
    plaintext = f"{to_user.display_name()} sent you this message:\n\n{message.title}\n\n{message.body}"
    html = render_template(
        'message_email.html', from_user=from_user, to_user=to_user, message=message)
    send_email(to_user.email, subject, plaintext, html)
