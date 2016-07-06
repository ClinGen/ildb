"""
@package api
Beacon Query API Controllers
These API will be called by the central hub
"""
import requests
from flask import Blueprint, jsonify, request
from api.database import DataAccess

query_controllers = Blueprint('query_controllers', __name__)

@query_controllers.route('/1/<chrom>/<position>/<allele>', defaults = { 'reference' : None }, methods=['GET'])
@query_controllers.route('/1/<chrom>/<position>/<allele>/<reference>', methods = ['GET'])
def query1(chrom, position, allele, reference):
    """
    Canonical Query1
    """
    
    # TODO: Validate parameters
    
    beacons = DataAccess().get_beacons()

    # TODO: These can run in parallel
    # TODO: Validate the response from these calls
    # TODO: Make this async message based
    # TODO: The hub query API will be made meta-data defined
    results = []
    for beacon in beacons:
        resp = requests.get(beacon.endpoint + request.path).json()
        results.append( {'beacon': beacon.name, 'result':resp} )

    return jsonify(results)
