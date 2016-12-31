"""
@package api
Case Vault Query API Controllers
These API will be called by the central hub
"""
import requests
from flask import Blueprint, jsonify, request
from api.database import DataAccess
from api.auth import requires_auth

casevault_controllers = Blueprint('casevault_controllers', __name__)

@casevault_controllers.route('', methods=['GET'])
@requires_auth
def get_tenant_list():
  """
  Get a list of the tenants
  """

  casevaults = DataAccess().get_casevaults()

  return jsonify(casevaults)

@casevault_controllers.route('/<id>', methods=['GET'])
@requires_auth
def get_tenant(id):
  """
  Get a tenant by id
  """
  casevaults = DataAccess().get_casevault(id)

  return jsonify(casevaults)

@casevault_controllers.route('', methods=['POST'])
@requires_auth
def add_tenant():
  """
  Add a new tenant to the system
  """
  document = request.json
    
  return jsonify({'id':DataAccess().add_casevault(document)})

@casevault_controllers.route('/<id>', methods=['DELETE'])
@requires_auth
def delete_tenant(id):
  """
  Delete a tenant
  """
  DataAccess().delete_casevault(id)

  return jsonify({'result':'ok'})

@casevault_controllers.route('/<id>', methods=['POST'])
@requires_auth
def update_tenant(id):
  """
  Update a tenant
  """

  document = request.json

  DataAccess().update_casevault(id, document)

  return jsonify({'result':'ok'})
