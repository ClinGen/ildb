"""
database.py
Data access logic
"""

import pymongo
from bson.objectid import ObjectId
from api.settings import Settings

DB_NAME = "clinbeacon"

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
    with pymongo.MongoClient(host = Settings.mongo_connection_string) as mclient:
      db = mclient[DB_NAME]

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
    with pymongo.MongoClient(host = Settings.mongo_connection_string) as mclient:

      db = mclient[DB_NAME]
      genome_data = db['genome']

      genome_data.insert_one(data)

  def get_samples_list(self):
    """
    Get a list of all the genome samples
    """

    with pymongo.MongoClient(host = Settings.mongo_connection_string) as mclient:
      db = mclient[DB_NAME]
      genome_data = db['genome']

      cursor = genome_data.find({},{})

      return list({"id":str(o["_id"])} for o in cursor)

  def delete_sample(self, id):
    """
    Delete  a sample from the database
    """

    with pymongo.MongoClient(host = Settings.mongo_connection_string) as mclient:
      db = mclient[DB_NAME]
      genome_data = db['genome']

      genome_data.delete_one({'_id': ObjectId(id)})
      
  def get_user(self, id):
    """
    Get a user by id which will be the email address
    """

    with pymongo.MongoClient(host = Settings.mongo_connection_string) as mclient:
      db = mclient[DB_NAME]
      user_data = db['users']

      user = user_data.find_one({'_id': id})

      return user