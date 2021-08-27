from flask import Blueprint, jsonify, request
import base64
import requests
import os
from flask.wrappers import Response


spotify_routes = Blueprint('spotify', __name__)


@spotify_routes.route('/token', methods=['GET', 'POST'])
def get_token():
    client_id = os.environ['CLIENT_ID']
    client_secret = os.environ['CLIENT_SECRET']
    ascii_id = client_id.encode('ascii')
    ascii_secret = client_secret.encode('ascii')
    encode_id = base64.b64encode(ascii_id)
    encode_secret = base64.b64encode(ascii_secret)
    formatted_id = encode_id.decode('ascii')
    formatted_secret = encode_secret.decode('ascii')
    print('Basic ' + f'{formatted_id}' + ':' + f'{formatted_secret}')
    request_body = {
        "grant_type": 'client_credentials',
        "redirect_uri": 'https://spotify-clone-aa.herokuapp.com/dashboard',
        "client_id": client_id,
        "client_secret": client_secret,
    }

    post_response = requests.post(
        'https://accounts.spotify.com/api/token',
        data=request_body,
        headers={
            'Content-Type': 'application/x-www-form-urlencoded'
        })
    tok = post_response.json()

    return tok
