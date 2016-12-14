"""
@package api
Beacon Management API Controllers
"""
from flask import Blueprint, jsonify, request, flash
from api import log
from lib.beacondb import VcfSampleCollection, IndividualCollection, VcfFileCollection
from api.auth import requires_auth
from werkzeug.utils import secure_filename
import vcf
import io
import os
import re
from api.task_queue import queue_vcf_import
from lib.settings import Settings
import sys

patient_controllers = Blueprint('patient_controllers', __name__)


@patient_controllers.route('', methods=['GET'])
@requires_auth
def get_patient_list():
    """ Retrieve a list of patients """

    list = IndividualCollection().get_all()

    return jsonify(list)


@patient_controllers.route('', methods=['POST'])
@requires_auth
def create_patient():
    """ Create a new patient """

    document = request.json

    return jsonify({'id': IndividualCollection().add(document)})


@patient_controllers.route('/<id>', methods=['GET'])
@requires_auth
def get_patient(id):
    """ Get a specific patient by id """
    return jsonify(IndividualCollection().get_by_id(id))


@patient_controllers.route('/<id>', methods=['DELETE'])
@requires_auth
def delete_patient(id):
    """ Delete a patient """

    IndividualCollection().delete(id)

    return jsonify({'result': 'ok'})


@patient_controllers.route('/<id>/sample/<sampleId>', methods=['GET'])
@requires_auth
def get_patient_sample(id, sampleId):
    """ Delete a VCF sample """

    return jsonify({'result': 'ok'})


@patient_controllers.route('/<id>/sample/<sampleId>', methods=['DELETE'])
@requires_auth
def delete_patient_samples(id, sampleId):
    """ Delete a VCF sample """

    return jsonify({'result': 'ok'})


@patient_controllers.route('/<id>/sample', methods=['GET'])
@requires_auth
def get_patient_samples(id):
    """ Get all gene samples for an individual """
    list = VcfSampleCollection().get_by_individualid(id)

    # add query string to fetch (status and filter by ids)

    return jsonify(list)


@patient_controllers.route('/<id>/sample', methods=['POST'])
#@requires_auth
def upload_patient_samples(id):
    """
    Import multi-sample VCF file that mauy not be associated with a specific patient
    """
    log.info('vcf import')

    # TODO: how do we correlate samples with patients and phenotype data?
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
                'patientId': id}
        )

        file.save(os.path.join(Settings.file_store, file_id + '.vcf'))

        queue_vcf_import(file_id)
        VcfFileCollection().update_by_id(file_id, {'status': 'queued'})
    except:
       log.error(sys.exc_info()[0])

    return jsonify({'result': 'ok'})


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in ['vcf']
