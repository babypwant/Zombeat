from flask import Blueprint, jsonify, request
from sqlalchemy import update
from app.models import Playlist, db
import ast
import os

playlist_routes = Blueprint('playlist', __name__)


@playlist_routes.route('/', methods=['GET', 'POST', 'DELETE'])
def new_playlist():
    request_data = request.data.decode("utf-8")
    data = ast.literal_eval(request_data)
    all_playlist_number = Playlist.query.filter_by().all()
    playlist_number = all_playlist_number[-1].id + 1
    name = f'My Playlist #{playlist_number}'
    img = 'https://i.pinimg.com/originals/55/27/89/552789ccf1e4e919e17930976a5e62c9.jpg'
    user_id = data["user_id"]
    playlist = Playlist(
        name=name,
        user_id=user_id,
        img=img
    )
    db.session.add(playlist)

    # db.destroy
    db.session.commit()

    return {"Backend": name, "playlist_Id": playlist_number}


@playlist_routes.route('/edit', methods=['POST'])
def edit_playlist():
    request_data = request.data.decode("utf-8")
    data = ast.literal_eval(request_data)
    id = data["playlist_Id"]
    user_id = data["user_id"]
    playlist = Playlist.query.filter_by(id=id, user_id=user_id).first()
    
    print("YOUR DATA IS HERE ", playlist)
    return {"data": data}
