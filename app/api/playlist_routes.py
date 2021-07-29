from flask import Blueprint, jsonify, request
from sqlalchemy import update
from app.models import Playlist, db
import ast
import os

playlist_routes = Blueprint('playlist', __name__)


@playlist_routes.route('/', methods=['GET', 'POST'])
def new_playlist():
    request_data = request.data.decode("utf-8")
    data = ast.literal_eval(request_data)
    user_id = data["user_id"]
    print("HERE IS YOUR DATA", user_id)
    # playlist = Playlist(
    #     name=,
    #     user_id=,
    #     img=''
    # )

    return {"Backend": user_id}
