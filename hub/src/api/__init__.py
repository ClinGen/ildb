from flask import Flask

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
