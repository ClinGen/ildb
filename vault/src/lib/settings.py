"""
settings.py
Configuration for Flask app
Important: Do not place secrets in this file.
"""

import os


class Settings(object):
    """
    Responsible for managing application configuration settings
    """

    # ENVIRONMENT SETTINGS
    # These settings change with the environment
    mongo_connection_string = os.environ.get('MONGO_CONNECTION_STRING')

    # Path to file share used to store
    file_store = os.environ.get('FILE_STORAGE_PATH')

    # Auth and security settings
    auth_session_secret = os.environ.get('AUTH_SESSION_SECRET')
    auth_redirect_url = os.environ.get('AUTH_REDIRECT_URL')
    auth_provider_url = os.environ.get('AUTH_PROVIDER_URL')
    auth_tenant = os.environ.get('AUTH_TENANT')
    auth_client_id = os.environ.get('AUTH_CLIENT_ID')
    admin_user = os.environ.get('ADMIN_USER')
    shared_key = os.environ.get('SHARED_KEY')

    # APPLICATION SETTINGS
    # These settings are static in the build and do not belong to the
    # environment
