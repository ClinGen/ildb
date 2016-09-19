"""
Responsible for processing VCF file for data import
"""

import pymongo
import vcf
import os
import io
import re
from bson.objectid import ObjectId
from worker import log
from lib.settings import Settings
from lib.beacondb import VcfFileCollection, VcfSampleCollection

def import_vcf(file_id):

    VcfFileCollection().update_by_id(file_id, {'status': 'processing'})

    sample_count = 0

    try:
        stream = open(os.path.join(Settings.file_store, file_id + '.vcf'), 'r')
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

            VcfSampleCollection().add(
                {
                    'fileid': file_id,
                    'variants': variants
                })
    except:
        log.exception('error importing patient vcf')

    VcfFileCollection().update_by_id(file_id,
        {
            'status': 'complete',
            'samples': sample_count
        })
    log.info('import complete')