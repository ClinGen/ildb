"""
@package api
Case Vault Reference Data API Controllers
"""
from flask import Blueprint, jsonify, request
from api import log

reference_data_controllers = Blueprint('reference_data_controllers', __name__)

@reference_data_controllers.route('/icd_codes/<version>')
def list_supported_casevault_queries(version):
    
    codes = ()

    with open('../data/icd10cm_code_2017.txt') as f:
        for line in f:
            codes.push (
                line
            )
            
    return jsonify(codes)
