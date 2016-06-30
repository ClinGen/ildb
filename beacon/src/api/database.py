"""
@package api
Data access API
"""

import pymongo

class DataAccess:
  """Implements data access layer"""
  def __init__(self):
    """Constructor of DataAccess"""

  def query_operation1(self, build, gene, coordinate, bases):
    """Query Operation 1"""
    # Pass confgiuration in on the constructor
    with pymongo.MongoClient(host='mongodb://mongo:27017') as mclient:
      db = mclient.clinbeacon
      print (bases)
      cursor = db.genome.find(
          {"chrom":gene,
          "pos":int(coordinate),
          "gt_bases":bases}
        )

      return sum(1 for i in cursor)
