"""
@package api
Data access API
"""

import pymongo
from api.settings import Settings

DB_NAME = "clingenhub"

class DataAccess:
  """Implements data access layer"""

  def __init__(self):
    """DataAccess Constructor"""

  def get_beacons(self):
    """
      Get beacons
    """
    # Pass confgiuration in on the constructor
    with pymongo.MongoClient(host = Settings.mongo_connection_string) as mclient:
      db = mclient[DB_NAME]
      
      # filter for current and active tenants with beacons
      return list(db.tenants.find())

  def get_user(self, id):
    """
    Get a user by id which will be the email address
    """

    with pymongo.MongoClient(host = Settings.mongo_connection_string) as mclient:
      db = mclient[DB_NAME]
      user_data = db['users']

      user = user_data.find_one({'_id': id})

      return user

  def get_user_roles(self, id):
    """
    Get a users roles by id
    """
    user = self.get_user(id)

    return user.roles