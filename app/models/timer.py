from .db import db


class Timer(db.Model):
    __tablename__ = 'playlists'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    playlist_id = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, nullable=False)
    time = db.Column(db.Integer, nullable=False)

    users = db.relationship('User',  back_populates='playlists')
    songs = db.relationship('Song', back_populates='playlists')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'playlist_id': self.playlist_id,
            'user_id': self.user_id,
            'time': self.time,
        }

    def get_songs(self):
        return self.songs
