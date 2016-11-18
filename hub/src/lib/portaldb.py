"""
database.py
Data access logic
"""

import datetime
import pymongo
import logging
from .collection_base import CollectionBase

FORMAT = '%(levelname)-8s %(asctime)-15s %(message)s'
logging.basicConfig(level=logging.INFO, format=FORMAT)

log = logging.getLogger()

DB_NAME = "portal"

class VaultsCollection(CollectionBase):
  def __init__(self):
    super().__init__('vaults')

class UserCollection(CollectionBase):
  def __init__(self):
    super().__init__('users', False)

class UserAuthHistoryCollection(CollectionBase):
  def __init__(self):
    super().__init__('users.auth_history')
