from flask import Blueprint, jsonify, request
from sqlalchemy import update
import os

apikey = os.environ.get('API_FIN_PUBLIC')
apikey2 = os.environ.get('API_2_FIN')

playlist_routes = Blueprint('playlist', __name__)


@playlist_routes.route('/', methods=['GET', 'POST'])
def new_playlist():

    return {"Hello": "Are you there?"}
