from .db import db


class Song(db.Model):
    __tablename__ = 'songs'

    id = db.Column(db.Integer, primary_key=True)
    api_id = db.Column(db.String(255), nullable=False, unique=True)
    song_name = db.Column(db.String(255), nullable=False)
    artist_name = db.Column(db.String(255), nullable=False)
    image_url = db.Column(db.String(500), nullable=False)
    duration_ms = db.Column(db.Integer)

    playlists = db.relationship('Playlist', back_populates='songs')

    def to_dict(self):
        return {
            "id": self.id,
            "api_id": self.api_id,
            "song_name": self.song_name,
            "artist_name": self.artist_name,
            "img": self.image_url,
            "duration_ms": self.duration_ms
        }
