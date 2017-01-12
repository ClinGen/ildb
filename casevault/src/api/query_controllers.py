"""
@package api
Case Vault Query API Controllers
These API will be called by the central hub
"""
from flask import Blueprint, jsonify, request
from api import log
import datetime
import uuid
import query
from lib.casevaultdb import VcfSampleCollection, CaseCollection, QueryLogsCollection

query_controllers = Blueprint('query_controllers', __name__)

@query_controllers.route('/stats')
def stats():
    
    return jsonify({'lastSevenDays': QueryLogsCollection().num_query_count_since(7)})

@query_controllers.route('/history')
def history():
    """ retrieve query logs """
    return jsonify(QueryLogsCollection().get_all())

@query_controllers.route('/')
def list_supported_casevault_queries():
    return jsonify({'1':'find variants', '2': 'find variants with clinical information'})

@query_controllers.route('/hub/<id>', methods=['POST'])
def execute_query(id):
    """ Execute a case vault query and return the results """

    # Get the json payload from the request
    query_request = request.get_json(force=True)

    user = query_request['user']
    if not user:
        return jsonify({'error': 'user property is required by the hub when sending a request'}), 400

    # Get the query object
    query_type =  next(q for q in query.query_collection if q.metadata['id'] == id)
    if query_type is None:
        return jsonify({'error': 'query id ' + id + ' was not found in the casevault'})

    query_instance = query_type()
    
    # Validate parameters

    # Generate a request id to uniquely identify this request to the case vault
    request_id = str(uuid.uuid4())

    # Execute the query
    res = query_instance.execute_hub_query(query_request['parameters'])

    # Log query execution and results
    QueryLogsCollection().add({
        'queryId': request_id,
        'user': user,
        'count': res,
        'datetime': datetime.datetime.utcnow(),
        'parameters': query_request['parameters']
    })

    # return results

    return jsonify({"result": res, "requestId": request_id})
