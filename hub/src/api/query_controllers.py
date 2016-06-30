"""
@package api
Beacon Query API Controllers
These API will be called by the central hub
"""
from flask import Blueprint, jsonify
from . import database

query_controllers = Blueprint('query_controllers', __name__)

@query_controllers.route('/1/<build>/<gene>/<coordinates>/<mutation>', methods=['GET'])
def query1(build, gene, coordinates):
    """ Canonical Query1 """
    
    # Validate parameters

    return jsonify({"test":1})
