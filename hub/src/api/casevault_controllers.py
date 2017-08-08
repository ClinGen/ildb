"""
@package api
Case Vault Query API Controllers
These API will be called by the central hub
"""
import requests
from flask import Blueprint, jsonify, request
from api.database import CaseVaultCollection
from api.auth import requires_auth
import json

casevault_controllers = Blueprint('casevault_controllers', __name__)

@casevault_controllers.route('', methods=['GET'])
@requires_auth
def get_vaults_list():
  """
  Get a list of the tenants
  """

  casevaults = CaseVaultCollection().get_all()

  return jsonify(casevaults)

@casevault_controllers.route('/<id>', methods=['GET'])
@requires_auth
def get_vault(id):
  """
  Get a vault by id
  """
  casevaults = CaseVaultCollection().get_by_id(id)

  return jsonify(casevaults)

@casevault_controllers.route('', methods=['POST'])
@requires_auth
def add_vault():
  """
  Add a new vault to the system
  """
  document = request.json
    
  return jsonify({'id':CaseVaultCollection().add(document)})

@casevault_controllers.route('/<id>', methods=['DELETE'])
@requires_auth
def delete_vault(id):
  """
  Delete a tenant
  """
  CaseVaultCollection().delete(id)

  return jsonify({'result':'ok'})

@casevault_controllers.route('/<id>', methods=['POST'])
@requires_auth
def update_vault(id):
  """
  Update a tenant
  """

  document = request.json

  CaseVaultCollection().update_by_id(id, document)

  return jsonify({'result':'ok'})
