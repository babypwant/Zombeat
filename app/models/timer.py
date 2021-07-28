from .db import db


class Timer(db.Model):
    __tablename__ = 'timers'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    playlist_id = db.Column(db.Integer, db.ForeignKey(
        'playlists.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    time = db.Column(db.Integer, nullable=False)

    # users = db.relationship('User',  back_populates='timers')
    # songs = db.relationship('Song', back_populates='timers')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'playlist_id': self.playlist_id,
            'user_id': self.user_id,
            'time': self.time,
        }

    def get_time(self):
        return self.time
