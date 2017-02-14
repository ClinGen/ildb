"""
@package api
Case Vault Management API Controllers
"""
from flask import Blueprint, jsonify, request, flash
from api import log
from lib.casevaultdb import VcfSampleCollection, CaseCollection, VcfFileCollection
from api.auth import requires_auth
from werkzeug.utils import secure_filename
import vcf
import io
import os
import re
from api.task_queue import queue_vcf_import
from lib.settings import Settings
import sys

case_controllers = Blueprint('case_controllers', __name__)


@case_controllers.route('', methods=['GET'])
@requires_auth
def get_case_list():
    """ Retrieve a list of cases """

    list = CaseCollection().get_all()

    return jsonify(list)


@case_controllers.route('', methods=['POST'])
@requires_auth
def create_case():
    """ Create a new case """

    document = request.json

    return jsonify({'id': CaseCollection().add(document)})

@case_controllers.route('/<id>', methods=['POST'])
@requires_auth
def update_case(id):
    """ Update a case """

    document = request.json

    return jsonify({'id': CaseCollection().update_by_id(id, document)})


@case_controllers.route('/<id>', methods=['GET'])
@requires_auth
def get_case(id):
    """ Get a specific case by id """
    document = CaseCollection().get_by_id(id)
    document.pop("lastModified", None)
    return jsonify(document)

@case_controllers.route('/<id>', methods=['DELETE'])
@requires_auth
def delete_case(id):
    """ Delete a case """

    CaseCollection().delete(id)

    return jsonify({'result': 'ok'})


@case_controllers.route('/<id>/sample/<sampleId>', methods=['GET'])
@requires_auth
def get_case_sample(id, sampleId):
    """ Delete a VCF sample """

    return jsonify({'result': 'ok'})


@case_controllers.route('/<id>/sample/<sampleId>', methods=['DELETE'])
@requires_auth
def delete_case_samples(id, sampleId):
    """ Delete a VCF sample """

    return jsonify({'result': 'ok'})


@case_controllers.route('/<id>/sample', methods=['GET'])
@requires_auth
def get_case_samples(id):
    """ Get all gene samples for an case """
    list = VcfSampleCollection().get_by_caseid(id)

    # add query string to fetch (status and filter by ids)

    return jsonify(list)


@case_controllers.route('/<id>/sample', methods=['POST'])
#@requires_auth
def upload_case_samples(id):
    """
    Import multi-sample VCF file that mauy not be associated with a specific case
    """
    log.info('vcf import')

    # TODO: how do we correlate samples with cases and phenotype data?
    # Store documents
    try:
        # check if the post request has the file part
        if 'file' not in request.files:
            return jsonify({'error': 'no file in file part'})

        print(request.files)

        file = request.files['file']
        # if user does not select file, browser also
        # submit a empty part without filename
        if file.filename == '':
            flash('No file name provided')
            return jsonify({'error': 'no file name provided'})

        # this is used to ensure we can safely use the filename sent to us
        filename = secure_filename(file.filename)

        # TODO: File Validation

        file_id = VcfFileCollection().add(
            {'filename': filename,
                'status': 'uploading',
                'samples': 0,
                'caseId': id}
        )

        file.save(os.path.join(Settings.file_store, file_id + '.vcf'))

        queue_vcf_import(file_id)
        VcfFileCollection().update_by_id(file_id, {'status': 'queued'})
    except:
       log.error(sys.exc_info()[0])

    return jsonify({'result': 'ok'})

@case_controllers.route('/stats', methods=['GET'])
@requires_auth
def get_case_stats():
    """ Retrieve case statistics """

    return jsonify({
        'total': CaseCollection().get_total(),
        'gender': {
            'm': 120,
            'f': 80
        },
        'ethnicity': {
            'ne': 50,
            'se': 50,
            'hi': 100
        },
        'percentFamilyHistory': 50,
        'percentPatientHistory': 20,
        'percentWithClinicalIndications': 10
    })

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in ['vcf']
