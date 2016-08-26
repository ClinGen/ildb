"""
Responsible for processing VCF file for data import
"""

import pymongo
from bson.objectid import ObjectId

def import_vcf(file_path, database, context):
  """
  Process a VCF file import
  @file_path is the path to the file to import
  @database is the Mongo database object
  @context is the
  """

  # Load file from the file store
  # Update status in Mongo
  # Configure celery task completion

  variants = list()
  for record in vcf_reader:
      
      #TODO process multiple samples in a vcf file
      sample = record.samples[0]

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
              chrom = chrom[3:]
          variants.append(chrom + '_' + str(record.POS) + '_' + allele)

  DataAccess().import_vcf({'variants': variants})

  return None