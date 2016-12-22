"""
@package api
Beacon Query API Controllers
These API will be called by the central hub
"""
from flask import Blueprint, jsonify, request
from api import log
from lib.beacondb import VcfSampleCollection, IndividualCollection

query_controllers = Blueprint('query_controllers', __name__)

@query_controllers.route('/')
def list_supported_beacon_queries():
    return jsonify({'1':'find variants', '2': 'find variants with clinical information'})

@query_controllers.route('/1/<chrom>/<position>/<allele>', defaults={'reference': None}, methods=['GET'])
@query_controllers.route('/1/<chrom>/<position>/<allele>/<reference>', methods=['GET'])
def beacon_query(chrom, position, allele, reference):
    """ Canonical Query1 """

    # Validate parameters
    result = VcfSampleCollection().get_variants_count(
        chrom, position, allele, reference)

    return jsonify({"count": result})

@query_controllers.route('/2/<chrom>/<position>/<allele>', methods=['GET'])
def query_two(chrom, position, allele):
    """ Canonical Query2 """

    # Query cases matching a specific snp
    # Using the casses returned and the additional filter criteria query for cases

    # get a list of cases matching a specific mutation
    case_list = VcfSampleCollection().get_case_ids_by_variant(
        chrom, position, allele)
        
    # If there are no cases matching the variant we can just return empty results
    if len(case_list) == 0:
        return jsonify([])
    
    clinic_ids = None
    if request.args.get('clinic_indications') is not None:
        log.info("clinic_indications specified - " +  request.args.get('clinic_indications'))

        clinic_ids = request.args.get('clinic_indications').split(',')
    
    family_history = None
    if request.args.get('family_history') is not None:
        log.info("family_history specified - " +  request.args.get('family_history'))

        # TODO validate the parameter
        family_history = request.args.get('family_history')

    population = None
    if request.args.get('populations') is not None:
        log.info("population specified - " +  request.args.get('populations'))

        # TODO validate the parameter
        population = request.args.get('populations')
    
    # retrieve a list of cases matching a list of clinical indications and patients
    result = IndividualCollection().get_by_clinical_history_population (
        case_list,
        clinic_ids,
        family_history,
        population
    )

    return jsonify(result)