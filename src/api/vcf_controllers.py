"""
@package api
Case Vault VCF file Management API Controllers
"""

import os
import sys

from flask import Blueprint, jsonify, request, flash
from werkzeug.utils import secure_filename
from lib.casevaultdb import VcfFileCollection, VcfSampleCollection
from api.auth import requires_auth
from api import app, log
from api.task_queue import queue_vcf_import
from lib.settings import Settings

vcf_controllers = Blueprint('vcf_controllers', __name__)

@vcf_controllers.route('/files', methods=['GET'])
@requires_auth
def get_files_list():
    """ Retrieve a list of VCF files """

    # TODO: Validate parameters, error handling, and logging
    # TODO: Make this bounded (paging)
    list = VcfFileCollection().get_all()

    return jsonify(list)


@vcf_controllers.route('/import', methods=['POST'])
@requires_auth
def import_vcf():
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
             'samples': 0}
        )

        file.save(os.path.join(Settings.file_store, file_id + '.vcf'))

        queue_vcf_import(file_id)
        VcfFileCollection().update_by_id(file_id, {'status': 'queued'})
    except:
        log.error(sys.exc_info()[0])

    return jsonify({'result': 'ok'})


@vcf_controllers.route('/<id>', methods=['DELETE'])
@requires_auth
def delete_file(id):
    """ Delete a VCF sample """

    VcfFileCollection().delete(id)

    return jsonify({'result': 'ok'})

@vcf_controllers.route('/samples', methods=['GET'])
@requires_auth
def get_samples_list():
    """ Retrieve a list of case samples """

    # TODO: Validate parameters, error handling, and logging
    # TODO: Need to make this bounded (paging)
    list = VcfSampleCollection().get_all()

    return jsonify(list)

@vcf_controllers.route('/samples/<id>', methods=['DELETE'])
@requires_auth
def delete_sample(id):
    """ Delete a VCF sample """

    VcfSampleCollection().delete(id)

    return jsonify({'result': 'ok'})

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in ['vcf']