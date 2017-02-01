"""
@package api
Case Vault Reference Data API Controllers
"""
from flask import Blueprint, jsonify, request, Response
from api import log
import os

settings_controllers = Blueprint('settings_controllers', __name__)

@settings_controllers.route('')
def get_vault_settings():
    
    settings = {
      'name': 'development hub',
      'description': 'this is a development hub',
      'thumbprint': '935093f16909002acd98626df485fa22b41d9dfd',
      'location': 'http://localhost:5051',
      'domain': '127.0.0.1'
    }
            
    return jsonify(settings)

@settings_controllers.route('/endpoint')
def get_endpoint_settings():
  endpoint = {
    'name': 'demo valut',
    'description': 'my demo vault',
    'fqdn': '127.0.0.1:5001',
    'publicKey': "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCjdoQwgek/BMIgs9E1NXd9jgTrGylnqUZBpr3oO/ai1j90JBs3Pu45prPX+NxfWWvfwk+raa/UZ37UrPgQEV7BDzITUbMFhi+dZdWRkHgGlEHrxyAD3+aAGxwFtKtHw5VxkXGb0V928oOUrO3mNhgbLXcu60SO+TvwJ/84OOzl2/XkaPf6HuXBh9GRTzrAKS6mWrodY7NiHYlqzCYFc9MB5aLfdVGyphxQwmSGSqpEsA9UO0qao3UPOTakFWuRmUyTGs6ziwUfCUJCGFqp6o1yBwKpLMKunyUtQ97TawdtEKInTw8/Euh6bXn1IHJg8rC/ndR4kmOYJhMVjxhzBEHB"
  }

  return Response(str(endpoint), 
            mimetype='application/json',
            headers={'Content-Disposition':'attachment;filename=vault-connection-info.json'})