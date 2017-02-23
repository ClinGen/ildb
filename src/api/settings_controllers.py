"""
@package api
Case Vault Reference Data API Controllers
"""
from flask import Blueprint, jsonify, request, Response
from api import log
from api.auth import requires_auth
from werkzeug.utils import secure_filename
import os
import base64
import json
import re
import sys
from PIL import Image

settings_controllers = Blueprint('settings_controllers', __name__)

@settings_controllers.route('')
@requires_auth
def get_vault_settings():
    
    trusted_hub = json.loads(base64.b64decode(os.environ.get('TRUSTED_HUB')))

    return jsonify(trusted_hub)

@settings_controllers.route('/endpoint')
@requires_auth
def get_endpoint_settings():

  hostname = request.headers.get('X-Forwarded-For') or request.headers.get('Host')

  endpoint = {
    'name': re.sub('[\W_]+', '', hostname),
    'description': 'case vault for ' + re.sub('[\d\W_]+', '', hostname),
    'endpoint': 'https://' + hostname,
    'pk': "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCjdoQwgek/BMIgs9E1NXd9jgTrGylnqUZBpr3oO/ai1j90JBs3Pu45prPX+NxfWWvfwk+raa/UZ37UrPgQEV7BDzITUbMFhi+dZdWRkHgGlEHrxyAD3+aAGxwFtKtHw5VxkXGb0V928oOUrO3mNhgbLXcu60SO+TvwJ/84OOzl2/XkaPf6HuXBh9GRTzrAKS6mWrodY7NiHYlqzCYFc9MB5aLfdVGyphxQwmSGSqpEsA9UO0qao3UPOTakFWuRmUyTGs6ziwUfCUJCGFqp6o1yBwKpLMKunyUtQ97TawdtEKInTw8/Euh6bXn1IHJg8rC/ndR4kmOYJhMVjxhzBEHB"
  }

  return Response(str(endpoint), 
            mimetype='application/json',
            headers={'Content-Disposition':'attachment;filename=vault-connection-info.json'})

@settings_controllers.route('/logo', methods=['POST'])
@requires_auth
def upload_logo():

    try:
        # check if the post request has the file part
        
        if 'file' not in request.files:
            log.info('file is not in files')
            return jsonify({'error': 'no file in file part'})

        file = request.files['file']
        # if user does not select file, browser also
        # submit a empty part without filename

        if file.filename == '':
            flash('No file name provided')
            return jsonify({'error': 'no file name provided'})

        # this is used to ensure we can safely use the filename sent to us
        filename = secure_filename(file.filename)

        file.save('/app/ui/tmp-' + filename)

        im = Image.open('/app/ui/tmp-' + filename)
        im.save('/app/ui/logo.png', 'PNG')

        os.remove('/app/ui/tmp-' + filename)

    except:
       log.error(sys.exc_info()[0])

    return jsonify({'result': 'ok'})
