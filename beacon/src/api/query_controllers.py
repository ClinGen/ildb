"""
@package api
Beacon Query API Controllers
These API will be called by the central hub
"""
from flask import Blueprint, jsonify
from api.database import DataAccess

query_controllers = Blueprint('query_controllers', __name__)

@query_controllers.route('/1/<chrom>/<position>/<allele>', defaults = { 'reference' : None }, methods=['GET'])
@query_controllers.route('/1/<chrom>/<position>/<allele>/<reference>', methods = ['GET'])
def beacon_query(chrom, position, allele, reference):
    """ Canonical Query1 """
    
    # Validate parameters
    result = DataAccess().query_operation1(chrom, position, allele, reference)

    return jsonify({"count":result})
