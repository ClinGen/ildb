"""
@package api
Data import controllers
"""
from flask import Blueprint, jsonify, redirect, request, make_response, abort
from api.database import DataAccess
from oic import rndstr
from oic.oic import Client
from oic.oic.message import AuthorizationResponse
from api.settings import Settings
import jwt

auth_controllers = Blueprint('auth_controllers', __name__)

@auth_controllers.route('/login', methods=['POST'])
def login():
    """
    handle oidc reponse
    """
    client = Client(Settings.auth_client_id)

    user_jwt = jwt.decode(request.form['id_token'], verify=False)

    print(request.form['id_token'])
    print (user_jwt)
    # TODO Update token validation to retrieve certificate
    """
    auth_response = client.parse_response(AuthorizationResponse,
        info = request.form,
        sformat = "dict",
        verify = False)
    """
    
    response = make_response(redirect('/'))

    # verify the token is a valid user in the system
    # we can improve on this by checking status as well
    # maybe we will change this to check the tenant/role attributes instead
    username = DataAccess().get_user(user_jwt['preferred_username'])

    # we keep a list of valide users in the database
    # ideally we would just check roles from the provider
    #      but there are some challenges managing the group and role claims in the provider right now
    #      and we may want to consider a simple authorization service or working out the claims
    if(username is None):
        # TODO log this and display a proper exception see if we can shift the authorization to role/group claims from the provider
        abort(401)

    encoded = jwt.encode({'userid': user_jwt['preferred_username']}, 'secret', algorithm='HS256')

    # set the session token in a cookie
    response.set_cookie('session_id', encoded)

    # validate in the auth handler
    # jwt.decode(encoded, 'secret', algorithms=['HS256'])

    return response

@auth_controllers.route('/getauthrequest', methods=['GET'])
def make_authentication_request():
    print ('create authentication request')
    # consider storing a hash in state
    # what to hash in state might include cookie data, time, salt, etc...
    state = rndstr()
    nounce = rndstr()
    request_args = {
        "response_type": "id_token code",
        "response_mode": "form_post",
        "state": state,
        "nonce": nounce,
        "redirect_uri": Settings.auth_redirect_url,
        "scope":"openid profile"
    }

    print (Settings.auth_client_id)

    client = Client(Settings.auth_client_id)

    auth_req = client.construct_AuthorizationRequest(request_args = request_args)

    provider_url = Settings.auth_provider_url
    if Settings.auth_tenant is not None:
        provider_url = provider_url.replace("{{tenant}}", Settings.auth_tenant)

    login_url = auth_req.request(provider_url)

    print(login_url)

    return redirect(login_url)
