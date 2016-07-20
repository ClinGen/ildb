"""
@package api
Beacon Management API Controllers
"""
from flask import Blueprint, jsonify
from api.database import DataAccess
from api.auth import requires_auth

manage_controllers = Blueprint('manage_controllers', __name__)

@manage_controllers.route('/samples', methods = ['GET'])
@requires_auth
def get_samples_list():
    """ Retrieve a list of patient samples """

    # TODO: Validate parameters, error handling, and logging
    # TODO: Need to make this bounded (paging)
    list = DataAccess().get_samples_list()

    return jsonify(list)

@manage_controllers.route('/samples/<id>', methods = ['DELETE'])
@requires_auth
def delete_sample(id):
    """ Delete a VCF sample """

    DataAccess().delete_sample(id)

    return jsonify({'result':'ok'})
