"""
@package api
Data import controllers
"""
from flask import Blueprint, jsonify
from api.auth import requires_auth

info_controllers = Blueprint('info_controllers', __name__)

@info_controllers.route('/ping')
def ping():
    """
    Simple ping test to verify a connection can be made to the case vault
    """
    return jsonify({"resp":1})

@info_controllers.route('/version')
@requires_auth
def version():
    """
    return version information for the hub
    authentication is required to retrieve information about a case vault, including version
    """

    # TODO: Move to environment variable or build
    return jsonify({'version': 1})

