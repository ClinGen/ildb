"""
@package api
Data import controllers
"""
from flask import Blueprint, jsonify, redirect, request, make_response
from api.database import DataAccess
from oic import rndstr
from oic.oic import Client
from oic.oic.message import AuthorizationResponse
import jwt

auth_controllers = Blueprint('auth_controllers', __name__)

@auth_controllers.route('/login', methods=['POST'])
def login():
    """
    handle oidc reponse
    """
    client = Client("f123a339-be25-420f-a843-ecad0938a050")

    user_jwt = jwt.decode(request.form['id_token'], verify=False)

    print(request.form['id_token'])
    print (user_jwt)
    # TODO Fix the token validation
    """
    auth_response = client.parse_response(AuthorizationResponse,
        info = request.form,
        sformat = "dict",
        verify = False)
    """

    # TODO validate the token

    response = make_response(redirect('/'))

    # verify the token is a valid user in the system
    # we can improve on this by checking status as well
    username = DataAccess().get_user(user_jwt['preferred_username'])
    if(username is None):
        # TODO log this and display a proper exception
        abort(401)

    encoded = jwt.encode({'userid': user_jwt['preferred_username']}, 'secret', algorithm='HS256')

    # set the session token in a cookie
    response.set_cookie('session_id', encoded)

    # validate in the auth handler
    # jwt.decode(encoded, 'secret', algorithms=['HS256'])

    return response

@auth_controllers.route('/getauthrequest', methods=['GET'])
def make_authentication_request():
    # consider storing a hash in state
    # what to hash in state might include cookie data, time, salt, etc...
    state = rndstr()
    nounce = rndstr()
    request_args = {
        "response_type": "id_token code",
        "response_mode": "form_post",
        "state": state,
        "nonce": nounce,
        "redirect_uri": "http://localhost:5000/api/auth/login",
        "scope":"openid email profile"
    }

    # Client Id
    client = Client("f123a339-be25-420f-a843-ecad0938a050")

    auth_req = client.construct_AuthorizationRequest(request_args=request_args)
    login_url = auth_req.request("https://login.microsoftonline.com/fs180.onmicrosoft.com/oauth2/v2.0/authorize")

    print(login_url)

    return redirect(login_url)
