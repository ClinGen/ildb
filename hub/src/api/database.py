"""
@package api
Data access API
"""

import pymongo

class DataAccess:
  """Implements data access layer"""

  def __init__(self):
    """DataAccess Constructor"""

  def get_beacons(self):
    """
      Get beacons
    """
    # Pass confgiuration in on the constructor
    with pymongo.MongoClient(host='mongodb://mongohub:27017') as mclient:
      db = mclient.clingenhub
      
      # filter for current and active tenants with beacons
      return list(db.tenants.find())

