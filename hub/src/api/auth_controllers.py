"""
@package api
Data import controllers
"""
from flask import Blueprint, jsonify, redirect, request
from oic import rndstr
from oic.oic import Client
from oic.oic.message import AuthorizationResponse
from . import app

auth_controllers = Blueprint('auth_controllers', __name__)

@auth_controllers.route('/login')
def login():
    """ handle oidc reponse """
    # TODO: read settings from configuration
    client = Client("5228375a-4339-47ec-ab4d-98f5efa78724")

    #response = client.parse_response(AuthorizationResponse,
    #    info = dict(request.args.items(multi=True)),
    #    sformat = "dict")

    return jsonify({"test":2})

@auth_controllers.route('/getAuthRequest', methods=['GET'])
def make_authentication_request():
    state = rndstr()
    nounce = rndstr()
    request_args = {
        "response_type": "id_token",
        "state": state,
        "nonce": nounce,
        "redirect_uri": "http://localhost:5000/api/auth/login",
        "scope":"openid"
    }

    # Client Id
    client = Client("5228375a-4339-47ec-ab4d-98f5efa78724")

    auth_req = client.construct_AuthorizationRequest(request_args = request_args)
    login_url = auth_req.request("https://login.windows.net/common/oauth2/authorize")

    print(login_url)

    return redirect(login_url)
