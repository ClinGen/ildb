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

  # APPLICATION SETTINGS
  # These settings are static in the build
