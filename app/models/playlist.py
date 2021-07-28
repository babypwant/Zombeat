from .db import db

# need a way to connect songs w playlists since there no simple column for
# storing an entire object into a column on sqlalchemy database
# reach out to alenajndro about how he implemented it in his own project


# alenajdro said make a joings table in with the playlist?
# said might be a weird implementation but lets try it out

saved_songs = db.Table(
    'saved_songs',
    db.Model.metadata,
    db.Column("song_id", db.Integer, db.ForeignKey(
        "songs.id"), primary_key=True),
    db.Column("playlist_id", db.Integer, db.ForeignKey(
        "playlists.id"), primary_key=True)
)


class Playlist(db.Model):
    __tablename__ = 'playlists'
    __table_args__ = {'extend_existing': True}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    img = db.Column(db.String(255))
    songs = db.Column(db.Integer)

    users = db.relationship('User',  back_populates='playlists')
    songs = db.relationship('Song', secondary=saved_songs,
                            back_populates='playlists')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'user_id': self.user_id,
            'img': self.img,
        }

    def get_songs(self):
        return self.songs
