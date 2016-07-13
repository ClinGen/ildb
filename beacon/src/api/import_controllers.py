"""
@package api
Data import controllers
"""
from flask import Blueprint, jsonify, Flask, request, redirect, url_for
from werkzeug.utils import secure_filename
from api.database import DataAccess
from api import app
import vcf
import io

import_controllers = Blueprint('import_controllers', __name__)

@import_controllers.route('/vcf', methods=['GET', 'POST'])
def import_vcf():
    """
    VCF file upload operation
    """
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            return jsonify({'error':'no file in file part'})

        print(request.files)

        file = request.files['file']
        # if user does not select file, browser also
        # submit a empty part without filename
        if file.filename == '':
            flash('No selected file')
            return jsonify({'error':'no file'})

        # this is used to ensure we can safely use the filename sent to us
        filename = secure_filename(file.filename)

        # load data from the stream into memory for processing
        data = file.read()
        vcf_reader = vcf.Reader(io.StringIO(data.decode('utf-8')))

        variants = list()
        for record in vcf_reader:
            
            #TODO accept multiple samples in a vcf file
            sample = record.samples[0]

            #TODO - there are better ways to handle this
                # Do we need to store the reference for this query
            allleles = []
            if sample.gt_bases is not None:
                alleles = sample.gt_bases.split('/')
                # remove duplicates
                alleles = set(alleles)

            for allele in alleles:
                variants.append(record.CHROM + '_' + str(record.POS) + '_' + allele)

        DataAccess().import_vcf({'build':'GRCh38', 'variants': variants})
        print (variants)

    # TODO: change this to return stats
    return jsonify({'result':'ok'})
