"""
@package api
Data import controllers
"""
from flask import Blueprint, jsonify

info_controllers = Blueprint('info_controllers', __name__)

@info_controllers.route('/version')
def version():
    """
    return version information for the hub
    """
    
    # return this from environment variables set by container
    return jsonify({"version":2})
