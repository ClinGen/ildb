"""
@package api
Data import controllers
"""
from flask import Blueprint, jsonify

import_controllers = Blueprint('import_controllers', __name__)

@import_controllers.route('/')
def index():
    """ VCF file upload operation """
    return jsonify({"files":2})
