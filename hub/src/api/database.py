"""
@package api
Data access API
"""

import sys
import pymongo
from bson.objectid import ObjectId
from lib.settings import Settings

DB_NAME = "clearnethub"
CASEVAULT_COLLECTION = "casevaults"

class DataAccess:
  """Implements data access layer"""

  def __init__(self):
    """DataAccess Constructor"""

  ##
  ## Casevault Methods
  ##
  def get_casevaults(self):
    """
    Get a list of the casevaults
    """
    # Pass confgiuration in on the constructor
    with pymongo.MongoClient(host = Settings.mongo_connection_string) as mclient:
      db = mclient[DB_NAME]
      
      # filter for current and active tenants with casevaults

      cursor = db[CASEVAULT_COLLECTION].find()
      return list(
        {
          "id":str(o["_id"]),
          "name":o["name"],
          "description":o["description"],
          "endpoint":o["endpoint"]
        } for o in cursor)

  def add_casevault(self, document):
    """
    Add a new casevault
    """
    with pymongo.MongoClient(host = Settings.mongo_connection_string) as mclient:
      db = mclient[DB_NAME]

      tenant_data = db[CASEVAULT_COLLECTION]

      result = tenant_data.insert_one(document)

      return str(result.inserted_id)

  def update_casevault(self, id, casevault):
    """
    Update a casevault
    """
    with pymongo.MongoClient(host = Settings.mongo_connection_string) as mclient:
      db = mclient[DB_NAME]

      tenant_data = db[CASEVAULT_COLLECTION]

      tenant_data.replace_one({'_id': ObjectId(id)}, casevault)

      return True

  def delete_casevault(self, id):
    """
    Delete a casevault
    """
    with pymongo.MongoClient(host = Settings.mongo_connection_string) as mclient:
      db = mclient[DB_NAME]

      tenant_data = db[CASEVAULT_COLLECTION]

      tenant_data.delete_one({'_id': ObjectId(id)})

  def get_casevault(self, id):
    """
    Get Casevault Details
    """
    with pymongo.MongoClient(host = Settings.mongo_connection_string) as mclient:
      db = mclient[DB_NAME]

      tenant_data = db[CASEVAULT_COLLECTION]

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
