"""
database.py
Data access logic
"""

import datetime
import pymongo
from bson.objectid import ObjectId
from api.settings import Settings
from api import log

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
      
  def get_patient_samples(self, id):
    """
    Get a list of all the genome samples
    """

    with pymongo.MongoClient(host = Settings.mongo_connection_string) as mclient:
      db = mclient[DB_NAME]
      genome_data = db['genome']

      cursor = genome_data.find({'patientId':id},{})

      return list({"id":str(o["_id"])} for o in cursor)

class CollectionBase:
  """
  Collection base class provides general operations for a mongo collection
  """
  def __init__(self, collection_name, id_isobject = True):
    self.collection_name = collection_name
    self.id_isobject = id_isobject
    return

  def add(self, document):
    """
    Create a new item to the collection
    """
    with pymongo.MongoClient(host = Settings.mongo_connection_string) as mclient:
      db = mclient[DB_NAME]
      collection = db[self.collection_name]

      result = collection.insert_one(document)

      return str(result.inserted_id)

  def get_by_id(self, id):
    """
    Get an object by id
    """
    with pymongo.MongoClient(host = Settings.mongo_connection_string) as mclient:
      db = mclient[DB_NAME]
      collection = db[self.collection_name]

      doc = collection.find_one({'_id': ObjectId(id)})

      # update the doc to include a string version of the id
      doc['id'] = str(doc['_id'])
      del doc['_id']

      return doc

  def get_all(self):
    """
    Get all objects in the collection
    """
    with pymongo.MongoClient(host = Settings.mongo_connection_string) as mclient:
      db = mclient[DB_NAME]
      collection = db[self.collection_name]

      cursor = collection.find()
      # The following returns just the id's
      # cursor = patients_collection.find({},{})

      result = list()

      # convert the Object _id to string
      for doc in cursor:
        doc['id'] = str(doc['_id'])
        del doc['_id']
        result.append(doc)

      return result

  def update_by_id(id, updates):
    """
    Update fields in a document by the id
    """

    with pymongo.MongoClient(host = Settings.mongo_connection_string) as mclient:
      db = mclient[DB_NAME]
      collection = db[self.collection_name]

      result = db.restaurants.update_one (
      {
        "_id": ObjectId(id)},
        {
            "$set": updates,
            "$currentDate": {"lastModified": True}
        }
      )

  def delete(self, id):
    """
    Delete a document in the collection using the id
    """
    with pymongo.MongoClient(host = Settings.mongo_connection_string) as mclient:
      db = mclient[DB_NAME]
      collection = db[self.collection_name]

      collection.delete_one({'_id': ObjectId(id)})

class VcfFileCollection(CollectionBase):
  def __init__(self):
    super().__init__('vcf')

class VcfSampleCollection(CollectionBase):
  def __init__(self):
    super().__init__('vcf.samples')

class IndividualCollection(CollectionBase):
  def __init__(self):
    super().__init__('individuals')

class UserCollection(CollectionBase):
  def __init__(self):
    super().__init__('users')

class UserAuthHistoryCollection(CollectionBase):
  def __init__(self):
    super().__init__('users.auth_history')
