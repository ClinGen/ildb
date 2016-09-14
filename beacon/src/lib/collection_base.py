import datetime
import pymongo
import logging
from bson.objectid import ObjectId
from api.settings import Settings

FORMAT = '%(levelname)-8s %(asctime)-15s %(message)s'
logging.basicConfig(level=logging.INFO, format=FORMAT)

log = logging.getLogger()

DB_NAME = "clinbeacon"

class CollectionBase:
  """
  Collection base class provides general operations for a mongo collection
  """
  def __init__(self, collection_name, id_isobject = True):
    self.collection_name = collection_name
    self.id_isobject = id_isobject
    return

  @property
  def mongo_client(self):
    return pymongo.MongoClient(host = Settings.mongo_connection_string)

  def add(self, document):
    """
    Create a new item to the collection
    """
    with self.mongo_client as mclient:
      db = mclient[DB_NAME]
      collection = db[self.collection_name]

      result = collection.insert_one(document)

      return str(result.inserted_id)

  def get_by_id(self, id):
    """
    Get an object by id
    """
    with self.mongo_client as mclient:
      db = mclient[DB_NAME]
      collection = db[self.collection_name]

      # if the collection uses
      if self.id_isobject:
        id = ObjectId(id)

      doc = collection.find_one({'_id': id})

      if doc is None:
        return None

      # update the doc to include a string version of the id
      doc['id'] = str(doc['_id'])
      del doc['_id']

      return doc

  def get_all(self):
    """
    Get all objects in the collection
    """
    with self.mongo_client as mclient:
      db = mclient[DB_NAME]
      collection = db[self.collection_name]

      cursor = collection.find()
      # The following returns just the id's
      # cursor = patients_collection.find({},{})

      return self.to_list(cursor)

  def update_by_id(id, updates):
    """
    Update fields in a document by the id
    """

    with self.mongo_client as mclient:
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
    with self.mongo_client as mclient:
      db = mclient[DB_NAME]
      collection = db[self.collection_name]

      collection.delete_one({'_id': ObjectId(id)})

  #
  # Helper Methods
  #
  def to_list(self, cursor):
    result = list()

    # convert the Object _id to string
    for doc in cursor:
      doc['id'] = str(doc['_id'])
      del doc['_id']
      result.append(doc)

    return result