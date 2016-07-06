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

        filename = secure_filename(file.filename)

        test = file.read()

        vcf_reader = vcf.Reader(io.StringIO(test.decode("utf-8")))

        variants = list()
        for record in vcf_reader:
            
            #TODO we are just working wiht the first sample in the file
            sample = record.samples[0]

            #TODO - there are better ways to handle this
                # Do we need to store the reference for this query
            alleles = sample.gt_bases.split('/')
            for allele in alleles:
                variants.append(record.CHROM + '_' + str(record.POS) + '_' + allele)

        DataAccess().import_vcf({'build':'GRCh38', 'variants': variants})
        print (variants)

    return jsonify({'result':'ok'})
