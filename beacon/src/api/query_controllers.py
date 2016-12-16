"""
@package api
Beacon Query API Controllers
These API will be called by the central hub
"""
from flask import Blueprint, jsonify, request
from lib.beacondb import VcfSampleCollection, IndividualCollection

query_controllers = Blueprint('query_controllers', __name__)


@query_controllers.route('/1/<chrom>/<position>/<allele>', defaults={'reference': None}, methods=['GET'])
@query_controllers.route('/1/<chrom>/<position>/<allele>/<reference>', methods=['GET'])
def beacon_query(chrom, position, allele, reference):
    """ Canonical Query1 """

    # Validate parameters
    result = VcfSampleCollection().get_variants_count(
        chrom, position, allele, reference)

    return jsonify({"count": result})

@query_controllers.route('/2/<chrom>/<position>/<allele>', methods=['GET'])
def query_one(chrom, position, allele):
    """ Canonical Query2 """

    if request.args.get('clinids') is not None:
        result = VcfSampleCollection().get_indviduals_with_clinical(
            chrom, position, allele, request.args.get('clinids').split(','))

        return jsonify(result)
    else:
        # Validate parameters
        result = VcfSampleCollection().get_variants_count(
            chrom, position, allele, None)
        
        return jsonify({"count": result})
