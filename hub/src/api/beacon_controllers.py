"""
@package api
Beacon Query API Controllers
These API will be called by the central hub
"""
import requests
from flask import Blueprint, jsonify, request
from api.database import DataAccess
from api.auth import requires_auth

beacon_controllers = Blueprint('beacon_controllers', __name__)

@beacon_controllers.route('', methods=['GET'])
@requires_auth
def get_tenant_list():
  """
  Get a list of the tenants
  """

  beacons = DataAccess().get_beacons()

  return jsonify(beacons);

@beacon_controllers.route('/<id>', methods=['GET'])
@requires_auth
def get_tenant(id):
  """
  Get a tenant by id
  """
  beacon = DataAccess().get_beacon(id)

  return jsonify(beacon);

@beacon_controllers.route('', methods=['POST'])
@requires_auth
def add_tenant():
  """
  Add a new tenant to the system
  """
  document = request.json
    
  return jsonify({'id':DataAccess().add_beacon(document)})

@beacon_controllers.route('/<id>', methods=['DELETE'])
@requires_auth
def delete_tenant(id):
  """
  Delete a tenant
  """
  DataAccess().delete_beacon(id)

  return jsonify({'result':'ok'})

@beacon_controllers.route('/<id>', methods=['POST'])
@requires_auth
def update_tenant(id):
  """
  Update a tenant
  """

  document = request.json

  DataAccess().update_beacon(id, document)

  return jsonify({'result':'ok'})
