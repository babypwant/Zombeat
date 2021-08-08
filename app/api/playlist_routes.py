from flask import Blueprint, jsonify, request
from flask.wrappers import Response
from sqlalchemy import update
from app.models import Playlist, db, Song
from app.models.playlist import saved_songs
import ast
import os

playlist_routes = Blueprint('playlist', __name__)


@playlist_routes.route('/', methods=['GET', 'POST', 'DELETE'])
def new_playlist():
    request_data = request.data.decode("utf-8")
    data = ast.literal_eval(request_data)
    all_playlist_number = Playlist.query.filter_by().all()
    playlist_number = all_playlist_number[-1].id
    name = data["new_name"]
    img = 'https://i.pinimg.com/originals/55/27/89/552789ccf1e4e919e17930976a5e62c9.jpg'
    user_id = data["user_id"]
    playlist = Playlist(
        name=name,
        user_id=user_id,
        img=img
    )
    db.session.add(playlist)
    db.session.commit()

    return {"Backend": name, "playlist_Id": playlist_number}


@playlist_routes.route('/edit', methods=['POST'])
def edit_playlist():
    request_data = request.data.decode("utf-8")
    data = ast.literal_eval(request_data)
    id = data["id"]
    user_id = data["user_id"]
    new_name = data["new_name"]
    playlist = Playlist.query.filter_by(id=id, user_id=user_id).first()
    playlist.name = new_name
    db.session.commit()
    return {"data": "=== Successfully updated name === "}


@playlist_routes.route('/delete', methods=['POST'])
def delete_playlist():
    request_data = request.data.decode("utf-8")
    data = ast.literal_eval(request_data)
    id = data["playlist_Id"]
    user_id = data["user_id"]
    playlist = Playlist.query.filter_by(id=id, user_id=user_id).first()
    db.session.delete(playlist)
    db.session.commit()
    return{"Successful": "=== Deleted Playlist ==="}


@playlist_routes.route('/id', methods=["POST"])
def playlist_id():
    all_playlist_number = Playlist.query.filter_by().all()
    playlist_number = all_playlist_number[-1].id
    return {"id": playlist_number}


@playlist_routes.route('/all', methods=["POST"])
def all_playlist():
    request_data = request.data.decode("utf-8")
    data = ast.literal_eval(request_data)
    user_id = data["user_id"]
    all_playlist_raw_data = Playlist.query.filter_by(user_id=user_id).all()
    all_playlist = []
    for playlist in all_playlist_raw_data:
        formated_data = playlist.to_dict()
        all_playlist.append(formated_data)
    return {"Success": all_playlist}


@playlist_routes.route('/info', methods=['GET', 'POST'])
def playlist_info():
    request_data = request.data.decode("utf-8")
    data = ast.literal_eval(request_data)
    user_id = data["user_id"]
    id = data["id"]
    playlist = Playlist.query.filter_by(
        user_id=user_id, id=id).first()
    playlist_info = playlist.to_dict()
    return {"Success": playlist_info}


@playlist_routes.route('/all/<int:id>', methods=['GET', 'POST'])
def get_all_playlists(id):
    all_playlists = []
    playlists = Playlist.query.filter_by(user_id=id).all()
    for playlist in playlists:
        formated_data = playlist.to_dict()
        all_playlists.append(formated_data)
    return {"all_playlists": all_playlists}


@playlist_routes.route('/new/song', methods=["POST"])
def save_song():
    request_data = request.data.decode("utf-8")
    data = ast.literal_eval(request_data)
    song_link = data["song_link"]
    song_name = data["song_name"]
    artist_name = data["artist_name"]
    album_name = data["album_name"]
    song_length = data["song_length"]
    song_img = data["song_img"]
    check = Song.query.filter_by(song_link=song_link).first()
    if check == None:
        print(" == New Song Added == ")
        song = Song(
            song_link=song_link,
            song_name=song_name,
            artist_name=artist_name,
            album_name=album_name,
            song_length=song_length,
            song_img=song_img
        )
        db.session.add(song)
        db.session.commit()
        new_song = Song.query.filter_by(song_link=song_link).first()
        id = new_song.id
        return {"id": id}
    elif check != None:
        id = check.id
        return{"id": id}


@playlist_routes.route('/add/song', methods=["POST"])
def add_song():
    request_data = request.data.decode("utf-8")
    data = ast.literal_eval(request_data)
    song_id = data["song_id"]
    playlist_id = data["playlist_id"]
    saved_song_test = db.session.query(saved_songs).filter_by(
        song_id=song_id, playlist_id=playlist_id).first()
    if saved_song_test == None:
        print("HERE IS YOUR INFORMATION", song_id, "HERE TOO", playlist_id)
        saved_tabled = saved_songs.insert().values(
            song_id=song_id, playlist_id=playlist_id)
        db.session.execute(saved_tabled)
        db.session.commit()
        return{"== Executed ==": song_id}
    elif saved_song_test != None:
        return {"Already in db": song_id}
