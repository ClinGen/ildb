"""
@package api
Case Vault Query API Controllers
These API will be called by the central hub
"""
from flask import Blueprint, jsonify, request
from api import log
import datetime
import uuid
from lib.casevaultdb import VcfSampleCollection, CaseCollection, QueryLogsCollection

query_controllers = Blueprint('query_controllers', __name__)

@query_controllers.route('/stats')
def stats():
    
    return jsonify({'lastSevenDays': QueryLogsCollection().num_query_count_since(7)})

@query_controllers.route('/')
def list_supported_casevault_queries():
    return jsonify({'1':'find variants', '2': 'find variants with clinical information'})

@query_controllers.route('/1/<chrom>/<position>/<allele>', methods=['GET'])
def query_one(chrom, position, allele):
    """ Case vault Query 1 """

    # Query cases matching a specific snp
    # Using the casses returned and the additional filter criteria query for cases

    user = None
    if 'user' not in request.args:
        return jsonify({'error': 'user query string parameter is required and missing'}), 400

    requestId = str(uuid.uuid4())
    
    # get a list of cases matching a specific mutation
    case_list = VcfSampleCollection().get_case_ids_by_variant(
        chrom, position, allele)
        
    # If there are no cases matching the variant we can just return empty results
    if len(case_list) == 0:
        QueryLogsCollection().add({
            'queryId': requestId,
            'user': user,
            'queryId': '1',
            'count': 0,
            'datetime': datetime.datetime.utcnow(),
            'parameters': {
                'chrom': chrom,
                'position': position,
                'allele': allele
            }
        })
        return jsonify({"count": 0, "requestId": requestId})
    
    clinic_ids = None
    if 'clinic_indications' in request.args:
        log.info("clinic_indications specified - " +  request.args.get('clinic_indications'))

        clinic_ids = request.args.get('clinic_indications').split(',')
    
    family_history = None
    if 'family_history' in request.args:
        log.info("family_history specified - " +  request.args.get('family_history'))

        # TODO validate family history parameter
        family_history = request.args.get('family_history')

    population = None
    if 'populations' in request.args:
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

    count = len(result)

    QueryLogsCollection().add({
        'queryId': requestId,
        'user': user,
        'queryId': '1',
        'count': count,
        'datetime': datetime.datetime.utcnow(),
        'parameters': {
            'chrom': chrom,
            'position': position,
            'allele': allele,
            'clinic_ids': clinic_ids,
            'family_history': family_history,
            'populations': population
        }
    })

    return jsonify({"count": count, "requestId": requestId})