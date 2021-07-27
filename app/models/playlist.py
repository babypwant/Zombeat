from .db import db


class Playlist(db.Model):
    __tablename__ = 'playlists'

    id = db.Column(db.Integer, primary_key=True)
    playlist_name = db.Column(db.String(40))
    playlist_image_url = db.Column(db.String(255))
    user_id = db.Column(db.Integer, nullable=False)

    users = db.relationship('User',  back_populates='playlists')
    songs = db.relationship('Song', back_populates='playlists')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.playlist_name,
            'img': self.playlist_image_url,
            'user': self.user_id,
        }

    def get_songs(self):
        return self.songs
