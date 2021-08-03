from flask import Blueprint, jsonify, request
from flask.wrappers import Response
from sqlalchemy import update
from app.models import Timer, db
import ast
import os

timer_routes = Blueprint('timers', __name__)


@timer_routes.route('/new', methods=['GET', 'POST'])
def timer():
    request_data = request.data.decode("utf-8")
    data = ast.literal_eval(request_data)
    name = data["name"]
    playlist_id = data["playlist_id"]
    user_id = data["user_id"]
    time = data["time"]
    print(data)
    timer = Timer(
        name=name,
        playlist_id=playlist_id,
        user_id=user_id,
        time=time,
    )
    db.session.add(timer)
    db.session.commit()

    return {"YOU HIT THE BACKEND": name}


@timer_routes.route('/all', methods=['GET', 'POST'])
def get_all_timers():
    request_data = request.data.decode("utf-8")
    data = ast.literal_eval(request_data)
    user_id = data["user_id"]
    all_timers = []
    timers = Timer.query.filter_by(user_id=user_id).all()
    for timer in timers:
        formated_data = timer.to_dict()
        all_timers.append(formated_data)
    return {"all_timers": all_timers}
