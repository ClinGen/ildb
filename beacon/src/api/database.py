"""
@package api
Data access API
"""

import pymongo

class DataAccess:
  """Implements data access layer"""

  def __init__(self):
    """DataAccess Constructor"""

  def query_operation1(self, chrom, position, allele, reference):
    """
    Query Operation 1 - Beacon Query

    @param chrom
    @param position
    @param allele
    @param reference
    """
    # TODO Pass confgiuration in on the constructor
    with pymongo.MongoClient(host='mongodb://mongo:27017') as mclient:
      db = mclient.clinbeacon

      # TODO parameter validation

      # handle the optional reference set
      #if reference is None:

      genome_data = db['genome']

      # search the genome database
      # we can add a limit since we are simply looking for an occurance
      cursor = genome_data.find(
        { 'variants': chrom + '_' + position + '_' + allele }
      )

      return sum(1 for i in cursor)

  def import_vcf(self, data):
    """
    Insert new import document

    @param document
    """
    # TODO Pass confgiuration in on the constructor
    with pymongo.MongoClient(host='mongodb://mongo:27017') as mclient:

      db = mclient.clinbeacon
      genome_data = db['genome']

      genome_data.insert_one(data)
