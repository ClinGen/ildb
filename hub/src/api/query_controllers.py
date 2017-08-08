"""
@package api
Case Vaults Query API Controllers
These API will be called by the central hub
"""
import sys
import asyncio
import aiohttp
import async_timeout
import retrying
import json
import ssl

from api import log

from flask import Blueprint, jsonify, request, g
from api.database import CaseVaultCollection
from api.auth import requires_auth

query_controllers = Blueprint('query_controllers', __name__)

@query_controllers.route('', methods=['GET'])
@requires_auth
def get_queries(req):
    """
    get query metadata
    """

async def query_casevaults(future, id, req, user):

    # get a list of case vaults to query
    casevaults = CaseVaultCollection().get_all()

    tasks = []

    # configure SSL seccions context
    sslcontext = ssl.create_default_context(ssl.Purpose.CLIENT_AUTH)

    sslcontext.load_cert_chain('/app/client.pem', password="1234")

    # for now we disable the hostname check
    sslcontext.check_hostname = False
    conn = aiohttp.TCPConnector(ssl_context=sslcontext)

    async with aiohttp.ClientSession(connector=conn) as session:

        for casevault in casevaults:

            try:

                task = asyncio.ensure_future(fetch(casevault, casevault['endpoint'] + '/api/query/hub/' + id, req.json,  session, user))

                tasks.append(task)

            except Exception as e:
                log.error(str(e))

        responses = await asyncio.gather(*tasks)
            
        future.set_result(responses)

        # format the results
        # results.append( {'casevault': casevault['name'], 'description': casevault['description'], 'result':resp} )

@query_controllers.route('/exec/<id>', methods=['POST'])
@requires_auth
def execute_query(id):
    """
    Case Vault Query 1
    """

    user = g.userid

    loop = asyncio.get_event_loop()
    future = asyncio.Future()
    log.info('request sent')
    asyncio.ensure_future(query_casevaults(future, id, request, user))
    loop.run_until_complete(future)

    return jsonify(future.result())

async def get_response(casevault, response):

    try:
        output = await response.json()
    except Exception as e:
        log.info(str(await response.text()))
        return {
            "error":str(e),
            "count": 0
            }

    log.info(str(output))

    tmp = {
        "casevault":casevault['name'],
        "description":casevault['description'],
        "logo":casevault['endpoint'] + '/logo.png',
        "result": {
            "count": output['result']
        }
    }

    return tmp

async def fetch(casevault, url, body, session, user):
    log.info(str(body))
    tmp = {
        'parameters': body,
        'user': user
    }

    with aiohttp.Timeout(10):
        async with session.post(url, data = json.dumps(tmp), headers = {'content-type': 'application/json'}, timeout=15) as response:
            return await get_response(casevault, response)
