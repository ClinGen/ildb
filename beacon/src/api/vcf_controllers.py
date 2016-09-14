"""
@package api
Beacon Management API Controllers
"""
from flask import Blueprint, jsonify
from lib.beacondb import VcfSampleCollection
from api.auth import requires_auth

vcf_controllers = Blueprint('vcf_controllers', __name__)

@vcf_controllers.route('/files', methods = ['GET'])
@requires_auth
def get_files_list():
    """ Retrieve a list of VCF files """

    # TODO: Validate parameters, error handling, and logging
    # TODO: Make this bounded (paging)
    list = VcfFileCollection().get_all()

    return jsonify(list)

@vcf_controllers.route('/samples', methods = ['GET'])
@requires_auth
def get_samples_list():
    """ Retrieve a list of patient samples """

    # TODO: Validate parameters, error handling, and logging
    # TODO: Need to make this bounded (paging)
    list = VcfSampleCollection().get_all()

    return jsonify(list)

@vcf_controllers.route('/samples/<id>', methods = ['DELETE'])
@requires_auth
def delete_sample(id):
    """ Delete a VCF sample """

    VcfSampleCollection().delete(id)

    return jsonify({'result':'ok'})
