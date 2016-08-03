"""
@package api
Beacon Query API Controllers
These API will be called by the central hub
"""
import requests
from flask import Blueprint, jsonify, request
from api.database import DataAccess
from api.auth import requires_auth

manage_controllers = Blueprint('manage_controllers', __name__)

@manage_controllers.route('/', methods=['GET'])
@requires_auth
def get_tenant_list():
  """
  Get a list of the tenants
  """

  return;

@manage_controllers.route('/<id>', methods=['GET'])
@requires_auth
def get_tenant(id):
  """
  Get a tenant by id
  """

  return;

@manage_controllers.route('/', methods=['POST'])
@requires_auth
def add_tenant():
  """
  Add a new tenant to the system
  """
  #beacons = DataAccess().get_beacons()

@manage_controllers.route('/<id>', methods=['DELETE'])
@requires_auth
def delete_tenant(id):
  """
  Delete a tenant
  """

  return;

@manage_controllers.route('/<id>', methods=['POST'])
@requires_auth
def update_tenant(id):
  """
  Update a tenant
  """

  return;
