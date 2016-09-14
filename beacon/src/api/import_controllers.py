"""
@package api
Data import controllers
"""
from flask import Blueprint, jsonify, Flask, request, redirect, url_for, flash
from werkzeug.utils import secure_filename
from lib.beacondb import VcfFileCollection, VcfSampleCollection
from api.auth import requires_auth
from api import app
from api import log
import vcf
import io
import re
import uuid

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
        log.info('scrubbed file name %s', filename)

        # load data from the stream into memory for processing
        data = file.read()
        stream = io.StringIO(data.decode('utf-8'))
        vcf_reader = vcf.Reader(stream)

        samples = next(vcf_reader).samples
        sample_count = len(samples)
        
        stream.seek(0)
        vcf_reader = vcf.Reader(stream)

        for i in range(0, sample_count):
            stream.seek(0)
            vcf_reader = vcf.Reader(stream)
            variants = list()
            for record in vcf_reader:
                sample = record.samples[i]

                #TODO - there are better ways to handle this
                    # Do we need to store the reference for this query
                allleles = []
                if sample.gt_bases is not None:
                    alleles = re.split(r'[\\/|]', sample.gt_bases)
                    # remove duplicates
                    alleles = set(alleles)

                for allele in alleles:
                    chrom = record.CHROM
                    # remove preceeding chr if exists
                    if (re.match('chr', chrom, re.I)):
                        chrom = chrom[3:].upper()
                    if chrom in ['1', '2', '3', '4', '5', '6', '7', '8', '9','10','11','12','13','14','15','16','17','18','19','20','21','22', 'X', 'Y', 'M' ]:
                        variants.append(chrom + '_' + str(record.POS) + '_' + allele)

            VcfSampleCollection().add({'variants': variants})
    except:
        log.exception('error importing patient vcf')

    log.info('import complete')

    # TODO: change this to return stats
    return jsonify({'result':'ok'})
