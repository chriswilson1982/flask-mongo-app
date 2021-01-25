from datetime import datetime
import uuid


# Message class
class Message():

    # Main initialiser
    def __init__(self, title, body, from_id, from_name, to_id, to_name, id="", deleted=False, hidden_for_sender=False):
        self.title = title
        self.body = body
        self.from_id = from_id
        self.from_name = from_name
        self.to_id = to_id
        self.to_name = to_name
        self.timestamp = datetime.utcnow()
        self.date_string = self.timestamp.strftime("%-d %b %Y %H:%M")
        self.id = uuid.uuid4().hex if not id else id
        self.deleted = deleted
        self.hidden_for_sender = hidden_for_sender

    # Return dictionary representation of object
    def dict(self):
        return {
            "title": self.title,
            "body": self.body,
            "from_id": self.from_id,
            "from_name": self.from_name,
            "to_id": self.to_id,
            "to_name": self.to_name,
            "timestamp": self.timestamp,
            "date_string": self.date_string,
            "id": self.id,
            "deleted": self.deleted,
            "hidden_for_sender": self.hidden_for_sender
        }
