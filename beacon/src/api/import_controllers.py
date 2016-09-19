"""
@package api
Data import controllers
"""
from flask import Blueprint, jsonify, Flask, request, redirect, url_for, flash
from werkzeug.utils import secure_filename
from lib.beacondb import VcfFileCollection, VcfSampleCollection
from api.auth import requires_auth
from lib.settings import Settings
from api import app
from api import log
import vcf
import io
import os
import re
import uuid
import sys

from api.task_queue import queue_vcf_import

import_controllers = Blueprint('import_controllers', __name__)

@import_controllers.route('/vcf', methods=['GET'])
def get_vcf_list():

    return jsonify(VcfFileCollection().get_all())

@import_controllers.route('/vcf', methods=['POST'])
@requires_auth
def import_vcf():
    """
    Import multi-sample VCF file that mauy not be associated with a specific patient
    """
    log.info('vcf import')
    # TODO: how do we correlate samples with patients and phenotype data?
    # Store documents
    try:
        # check if the post request has the file part
        if 'file' not in request.files:
            return jsonify({'error':'no file in file part'})

        print(request.files)

        file = request.files['file']
        # if user does not select file, browser also
        # submit a empty part without filename
        if file.filename == '':
            flash('No file name provided')
            return jsonify({'error':'no file name provided'})

        # this is used to ensure we can safely use the filename sent to us
        filename = secure_filename(file.filename)

        # TODO: File Validation

        file_id = VcfFileCollection().add (
            {'filename': filename,
            'status': 'uploading',
            'samples': 0}
        )

        file.save(os.path.join(Settings.file_store, file_id + '.vcf'))

        queue_vcf_import(file_id)
        VcfFileCollection().update_by_id(file_id, {'status': 'queued'})
    except:
        log.error(sys.exc_info()[0])

    return jsonify({'result':'ok'})

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in ['vcf']