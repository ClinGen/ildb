"""
@package api
Beacon Management API Controllers
"""
from flask import Blueprint, jsonify
from api.database import DataAccess

manage_controllers = Blueprint('manage_controllers', __name__)

@manage_controllers.route('/samples', methods = ['GET'])
def get_samples_list():
    """ Retrieve a list of patient samples """

    # TODO: Validate parameters, error handling, and logging
    # TODO: Need to make this bounded (paging)
    list = DataAccess().get_samples_list()

    return jsonify(list)
