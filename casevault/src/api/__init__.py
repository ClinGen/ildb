from flask import Flask, request
import logging
from os import path

import sys
sys.path.append(path.abspath('../lib'))

FORMAT = '%(levelname)-8s %(asctime)-15s %(message)s'
logging.basicConfig(level=logging.INFO, format=FORMAT)

log = logging.getLogger()

# Define a new flask application
app = Flask(__name__)


@app.before_request
def before_request():
    print(request.path)

# Register query controllers with the app
from api.query_controllers import query_controllers
app.register_blueprint(query_controllers, url_prefix='/api/query')

# Register VCF controllers with the app
from api.vcf_controllers import vcf_controllers
app.register_blueprint(vcf_controllers, url_prefix='/api/vcf')

# Authentication controllers to the flask application
from api.auth_controllers import auth_controllers
app.register_blueprint(auth_controllers, url_prefix='/api/auth')

# System information controllers to the flask application
from api.info_controllers import info_controllers
app.register_blueprint(info_controllers, url_prefix='/api/info')

# Register case management controllers with the app
from api.case_controllers import case_controllers
app.register_blueprint(case_controllers, url_prefix='/api/case')
