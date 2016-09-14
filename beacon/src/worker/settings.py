"""
settings.py
Configuration for Flask app
Important: Do not place secrets in this file.
"""

import os

class Settings:
  """
  Responsible for managing application configuration settings
  """

  # ENVIRONMENT SETTINGS
  # These settings change with the environment
  mongo_connection_string = os.environ.get('MONGO_CONNECTION_STRING')

  # Path to file share used to store
  file_store = os.environ.get('FILE_STORAGE_PATH')

  # APPLICATION SETTINGS
  # These settings are static in the build
