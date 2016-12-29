"""
@package api
Case Vault Query API Controllers
These API will be called by the central hub
"""
from flask import Blueprint, jsonify, request
from api import log
from lib.casevaultdb import VcfSampleCollection, CaseCollection

query_controllers = Blueprint('query_controllers', __name__)

@query_controllers.route('/')
def list_supported_casevault_queries():
    return jsonify({'1':'find variants', '2': 'find variants with clinical information'})

@query_controllers.route('/1/<chrom>/<position>/<allele>', methods=['GET'])
def query_one(chrom, position, allele):
    """ Case vault Query1 """

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

        # TODO validate family history parameter
        family_history = request.args.get('family_history')

    population = None
    if request.args.get('populations') is not None:
        log.info("population specified - " +  request.args.get('populations'))

        # TODO validate population parameter
        population = request.args.get('populations').split(',')
    
    # retrieve a list of cases matching a list of clinical indications and cases
    result = CaseCollection().get_by_clinical_history_population (
        case_list,
        clinic_ids,
        family_history,
        population
    )

    return jsonify({"count": len(result)})