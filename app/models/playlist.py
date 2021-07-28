from .db import db


class Playlist(db.Model):
    __tablename__ = 'playlists'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    user_id = db.Column(db.Integer, nullable=False)
    img = db.Column(db.String(255))

    users = db.relationship('User',  back_populates='playlists')
    songs = db.relationship('Song', back_populates='playlists')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'user_id': self.user_id,
            'img': self.img,
        }

    def get_songs(self):
        return self.songs
