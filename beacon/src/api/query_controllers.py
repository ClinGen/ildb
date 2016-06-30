"""
@package api
Beacon Query API Controllers
These API will be called by the central hub
"""
from flask import Blueprint, jsonify
from api.database import DataAccess

query_controllers = Blueprint('query_controllers', __name__)

@query_controllers.route('/1/<build>/<gene>/<coordinates>/<bases>', methods=['GET'])
def query1(build, gene, coordinates, bases):
    """ Canonical Query1 """
    
    # Validate parameters
    result = DataAccess().query_operation1(build, gene, coordinates, bases.replace('>','/'))

    return jsonify({"count":result})
