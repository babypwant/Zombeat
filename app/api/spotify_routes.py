from flask import Blueprint, jsonify, request
import base64
from urllib.parse import urlencode
from urllib.request import Request, urlopen
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
    headers = {
        'Authorization': 'Basic ' + f'${encode_id}' + ':' + f'${encode_secret}',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    body = {'grant_type=client_credentials'}
    post_response = Request(
        'https://accounts.spotify.com/api/token', headers, body)
    if post_response.status_code == 200:
        pr = post_response.json()
        return pr['access_token'], pr['refresh_token'], pr['expires_in']
    else:
        return ("Error ===============================================================", post_response.status_code)
