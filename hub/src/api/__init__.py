from flask import Flask
import logging

sys.path.append(path.abspath('../lib'))

FORMAT = '%(levelname)-8s %(asctime)-15s %(message)s'
logging.basicConfig(level=logging.INFO, format=FORMAT)

log = logging.getLogger()

# Define a new flask application
app = Flask(__name__)

# Add the Query controllers to the flask application
from api.query_controllers import query_controllers
app.register_blueprint(query_controllers, url_prefix='/api/query')

# Add the authentication controllers to the flask application
from api.auth_controllers import auth_controllers
app.register_blueprint(auth_controllers, url_prefix='/api/auth')

# Add the management controllers to the flask application
from api.casevault_controllers import casevault_controllers
app.register_blueprint(casevault_controllers, url_prefix='/api/casevault')
