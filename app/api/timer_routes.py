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


@timer_routes.route('/info', methods=['GET', 'POST'])
def timer_info():
    request_data = request.data.decode("utf-8")
    data = ast.literal_eval(request_data)
    user_id = data["user_id"]
    print("HERE IS YOUR DATA", data)
    id = data["timer_id"]
    timer = Timer.query.filter_by(
        user_id=user_id, id=id).first()
    timer_info = timer.to_dict()
    return {"Success": timer_info}


@timer_routes.route('/edit', methods=['POST'])
def edit_playlist():
    request_data = request.data.decode("utf-8")
    data = ast.literal_eval(request_data)
    id = data["id"]
    user_id = data["user_id"]
    new_name = data["new_name"]
    time = data["new_time"]
    timer = Timer.query.filter_by(id=id, user_id=user_id).first()
    timer.name = new_name
    timer.time = time
    db.session.commit()
    return {"data": new_name}


@timer_routes.route('/delete', methods=['POST'])
def delete_timer():
    request_data = request.data.decode("utf-8")
    data = ast.literal_eval(request_data)
    id = data["timer_id"]
    user_id = data["user_id"]
    timer = Timer.query.filter_by(id=id, user_id=user_id).first()
    db.session.delete(timer)
    db.session.commit()
    return{"Successful": "=== Deleted Timer ==="}
