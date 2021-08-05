from flask import Blueprint, jsonify, request
import base64
from urllib.parse import urlencode
from urllib.request import Request, urlopen
import urllib
import requests
import os
from flask.wrappers import Response


spotify_routes = Blueprint('spotify', __name__)


@spotify_routes.route('/token', methods=['GET', 'POST'])
def get_token():
    client_id = os.environ['CLIENT_ID']
    client_secret = os.environ['CLIENT_SECRET']
    print("HERE IS CLIENT ID", client_id)
    print("HERE IS CLIENT ID", client_secret)

    post_response = requests.post(
        'https://accounts.spotify.com/api/token',
        data='grant_type=client_credentials',
        headers={
            'Authorization': 'Basic ' + f'${client_id}' + ':' + f'${client_secret}',
            'Content-Type': 'application/x-www-form-urlencoded'
        })
    tok = post_response.json()
    print("HERE IS YOUR RESPONSE", tok)

    return tok
    # if post_response:
    #     pr = post_response.json()
    #     print("DATA HERE", pr)
    #     return{"NICE, BAXKEND HERE": "Cool"}
    # else:
    #     return ("Error ===============================================================", post_response.status_code)
