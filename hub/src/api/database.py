"""
@package api
Data access API
"""

import sys
import pymongo
from bson.objectid import ObjectId
from api.settings import Settings

DB_NAME = "clingenhub"
BEACON_COLLECTION = "beacons"

class DataAccess:
  """Implements data access layer"""

  def __init__(self):
    """DataAccess Constructor"""

  ##
  ## Beacon Methods
  ##
  def get_beacons(self):
    """
    Get a list of the beacons
    """
    # Pass confgiuration in on the constructor
    with pymongo.MongoClient(host = Settings.mongo_connection_string) as mclient:
      db = mclient[DB_NAME]
      
      # filter for current and active tenants with beacons

      cursor = db[BEACON_COLLECTION].find()
      return list(
        {
          "id":str(o["_id"]),
          "name":o["name"],
          "description":o["description"],
          "endpoint":o["endpoint"]
        } for o in cursor)

  def add_beacon(self, document):
    """
    Add a new beacon
    """
    with pymongo.MongoClient(host = Settings.mongo_connection_string) as mclient:
      db = mclient[DB_NAME]

      tenant_data = db[BEACON_COLLECTION]

      result = tenant_data.insert_one(document)

      return str(result.inserted_id)

  def update_beacon(self, id, beacon):
    """
    Update a beacon
    """
    with pymongo.MongoClient(host = Settings.mongo_connection_string) as mclient:
      db = mclient[DB_NAME]

      tenant_data = db[BEACON_COLLECTION]

      tenant_data.replace_one({'_id': ObjectId(id)}, beacon)

      return True

  def delete_beacon(self, id):
    """
    Delete a beacon
    """
    with pymongo.MongoClient(host = Settings.mongo_connection_string) as mclient:
      db = mclient[DB_NAME]

      tenant_data = db[BEACON_COLLECTION]

      tenant_data.delete_one({'_id': ObjectId(id)})

  def get_beacon(self, id):
    """
    Get Beacon Details
    """
    with pymongo.MongoClient(host = Settings.mongo_connection_string) as mclient:
      db = mclient[DB_NAME]

      tenant_data = db[BEACON_COLLECTION]

      tenant = tenant_data.find_one({'_id': ObjectId(id)})

      return {
                "id":str(tenant["_id"]),
                "name":tenant["name"],
                "description":tenant["description"],
                "endpoint":tenant["endpoint"]
              }

  ##
  ## User Collection Methods
  ##
  def get_user(self, id):
    """
    Get a user by id which will be the email address
    """

    with pymongo.MongoClient(host = Settings.mongo_connection_string) as mclient:
      db = mclient[DB_NAME]

      # If the users collection does not exist then return an empty user
      if 'users' not in db.collection_names():
        return None
      
      user_data = db['users']

      user = user_data.find_one({'_id': id})

      return user

  def get_user_roles(self, id):
    """
    Get a users roles by id
    """
    user = self.get_user(id)

    return user.roles
