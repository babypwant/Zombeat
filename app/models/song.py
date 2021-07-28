from .db import db


class Song(db.Model):
    __tablename__ = 'songs'

    id = db.Column(db.Integer, primary_key=True)
    song_link = db.Column(db.String(255), nullable=False, unique=True)
    song_name = db.Column(db.String(255), nullable=False)
    artist_name = db.Column(db.String(255), nullable=False)
    album_name = db.Column(db.String(255), nullable=False)
    song_length = db.Column(db.Integer, nullable=False)
    song_img = db.Column(db.String(255), nullable=False)

    playlists = db.relationship('Playlist', back_populates='songs')

    def to_dict(self):
        return {
            "id": self.id,
            "song_link": self.song_link,
            "song_name": self.song_name,
            "artist_name": self.artist_name,
            "album_name": self.album_name,
            "song_length": self.song_length,
            "song_img": self.song_img,
        }
