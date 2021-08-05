from flask import Blueprint, jsonify, request
from flask.wrappers import Response
from sqlalchemy import update
from app.models import Playlist, db
import ast
import os

spotify_routes = Blueprint('spotify', __name__)


@spotify_routes.route('/', methods=['GET', 'POST', 'DELETE'])
def get_token():
    client_id = os.process.env.CLIENT_ID
    client_secret = os.process.env.CLIENT_SECRET
    headers = {
        'Authorization': 'Basic ' + f'e0a081299571483cba0a00ed8dd15a96' + ':' + f'fbbc6109c0424b06b088a168beb3f012',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    body = {'grant_type=client_credentials'}
    post_response = request.post('https://accounts.spotify.com/api/token')
    if post_response.status_code == 200:
        pr = post_response.json()
        return pr['access_token'], pr['refresh_token'], pr['expires_in']
    else:
        return ("Error", post_response.status_code)
