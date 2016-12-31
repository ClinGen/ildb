"""
@package api
Case Vaults Query API Controllers
These API will be called by the central hub
"""
import sys
import requests
from flask import Blueprint, jsonify, request
from api.database import DataAccess

query_controllers = Blueprint('query_controllers', __name__)

@query_controllers.route('/1/<chrom>/<position>/<allele>', methods=['GET'])
def query1(chrom, position, allele):
    """
    Case Vault Query 1
    """
    
    casevaults = DataAccess().get_casevaults()

    results = []
    for casevault in casevaults:
        print(casevault['endpoint'] + request.path, file=sys.stderr)
        resp = requests.get(casevault['endpoint'] + request.path + '?' + request.query_string.decode("utf-8"), timeout=5).json()
        print(resp, file=sys.stderr)
        results.append( {'casevault': casevault['name'], 'description': casevault['description'], 'result':resp} )

    return jsonify(results)
