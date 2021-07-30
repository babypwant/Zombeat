from flask import Blueprint, jsonify, request
from flask.wrappers import Response
from sqlalchemy import update
from app.models import Playlist, db, playlist
import ast
import os

playlist_routes = Blueprint('playlist', __name__)


@playlist_routes.route('/', methods=['GET', 'POST', 'DELETE'])
def new_playlist():
    request_data = request.data.decode("utf-8")
    data = ast.literal_eval(request_data)
    all_playlist_number = Playlist.query.filter_by().all()
    playlist_number = all_playlist_number[-1].id
    name = f'My Playlist #{playlist_number + 1}'
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
    id = data["playlist_Id"]
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
    # request_data = request.data.decode("utf-8")
    # data = ast.literal_eval(request_data)
    # id = data["user_id"]
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
    playlist_id = data["playlist_id"]
    playlist = Playlist.query.filter_by(
        user_id=user_id, playlist_id=playlist_id).first()
    playlist_info = playlist.to_dict()
    return {"Success": playlist_info}
