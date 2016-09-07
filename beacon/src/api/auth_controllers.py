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
import sys

auth_controllers = Blueprint('auth_controllers', __name__)

@auth_controllers.route('/login', methods=['POST'])
def login():
    """
    handle oidc reponse
    """
    client = Client(Settings.auth_client_id)

    user_jwt = jwt.decode(request.form['id_token'], verify=False)
    """
    The user JWT looks like the following sample:
    {'exp': 1471450431,
    'oid': '775ae09f-4b24-43ab-aedf-288a75855d08',
    'sub': 'CStosuMbvdWGvY2LQ_TAsvk1t96YgWRdQ4LdT3fnCbs',
    'c_hash': '9oSWc6X5ahpiS_RcOiQhAw',
    'ver': '2.0',
    'aud': 'f123a339-be25-420f-a843-ecad0938a050',
    'nonce': 'aLXyOyz36OEQKr2n',
    'name': 'Test User',
    'preferred_username': 'test@fs180.onmicrosoft.com',
    'iat': 1471446531,
    'nbf': 1471446531,
    'tid': '358c5b34-4387-4b88-9dc6-7feaa77483de',
    'iss': 'https://login.microsoftonline.com/358c5b34-4387-4b88-9dc6-7feaa77483de/v2.0'}
    """

    #TODO !!!! Validate 'tid' claim and the tenant signature.
    #TODO Store the oid for the user and the name, once the user authenticates we should use this to authorize users
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

    preferred_username = user_jwt['preferred_username']

    # verify the token is a valid user in the system
    # we can improve on this by checking status as well
    # maybe we will change this to check the tenant/role attributes instead
    username = UserCollection().get_by_id(preferred_username)

    # we keep a list of valide users in the database
    # ideally we would just check roles from the provider
    #      but there are some challenges managing the group and role claims in the provider right now
    #      and we may want to consider a simple authorization service or working out the claims
    if(username is None):
        if (preferred_username != Settings.admin_user):
            abort(401)
            # TODO add the seed admin user to the authorization store

    # TODO Add expiration to the jwt and support a refresh
    encoded = jwt.encode({'userid': user_jwt['preferred_username']}, 'secret', algorithm='HS256')

    # set the session token in a cookie
    # TODO make this HttpOnly
    response.set_cookie('session_id', encoded)

    # validate in the auth handler
    # jwt.decode(encoded, 'secret', algorithms=['HS256'])

    return response

@auth_controllers.route('/getauthrequest', methods=['GET'])
def make_authentication_request():
    print ('create authentication request')
    # consider storing a hash in state
    # what to hash in state might include cookie data, time, salt, etc...

    # force login in order to work around the Azure AD issue where a user may be logged in to the wrong domain.
    # Set prompt=login in the implicit flow request to force a new login
    state = rndstr()
    nounce = rndstr()
    request_args = {
        "response_type": "id_token code",
        "response_mode": "form_post",
        "state": state,
        "nonce": nounce,
        "prompt": "login",
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
