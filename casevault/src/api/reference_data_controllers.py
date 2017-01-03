"""
@package api
Case Vault Reference Data API Controllers
"""
from flask import Blueprint, jsonify, request
from api import log

reference_data_controllers = Blueprint('reference_data_controllers', __name__)

@reference_data_controllers.route('/icdcodes/<version>')
def list_supported_casevault_queries():
    return jsonify([{'code':12345,'description':523425}])
