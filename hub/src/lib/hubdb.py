"""
@package api
Data access API
"""

import sys
import pymongo
from bson.objectid import ObjectId
from lib.settings import Settings
from clearnetcore.collection_base import CollectionBase

FORMAT = '%(levelname)-8s %(asctime)-15s %(message)s'
logging.basicConfig(level=logging.INFO, format=FORMAT)

log = logging.getLogger()

class CaseVaultCollection(CollectionBase):
  def __init__(self):
    super().__init__('casevaults')

class UserCollection(CollectionBase):
  def __init__(self):
    super().__init__('users', False)

class UserAuthHistoryCollection(CollectionBase):
  def __init__(self):
    super().__init__('users.auth_history')
