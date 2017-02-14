"""
@package api
Case Vault Reference Data API Controllers
"""
from flask import Blueprint, jsonify, request
from api import log
import os

reference_data_controllers = Blueprint('reference_data_controllers', __name__)

@reference_data_controllers.route('/icd_codes/<version>')
def icd_codes(version):
    
    codes = []

    # TODO load reference data into memory or database
    with open('/app/data/icd10cm_codes_2017.txt') as f:
        for line in f:
            codes.append (
                {'code':line[0:8].strip(),
                'description':line[8:].strip()
                }
            )
            
    return jsonify(codes)
