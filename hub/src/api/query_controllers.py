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

from api import log

from flask import Blueprint, jsonify, request
from api.database import DataAccess

query_controllers = Blueprint('query_controllers', __name__)

async def query_casevaults(future, req):

    # get a list of case vaults to query
    casevaults = DataAccess().get_casevaults()

    tasks = []

    async with aiohttp.ClientSession() as session:

        for casevault in casevaults:

            try:
                task = asyncio.ensure_future(fetch(casevault['endpoint'] + '/api/query/hub/1', req.json,  session))
            
                tasks.append(task)

            except Exception as e:
                log.error(str(e))

        responses = await asyncio.gather(*tasks)

        log.info([s.decode("utf-8") for s in responses])
            
        future.set_result([s.decode("utf-8") for s in responses])

        # format the results
        # results.append( {'casevault': casevault['name'], 'description': casevault['description'], 'result':resp} )


@query_controllers.route('/exec/<id>', methods=['POST'])
def execute_query(id):
    """
    Case Vault Query 1
    """

    loop = asyncio.get_event_loop()
    future = asyncio.Future()
    asyncio.ensure_future(query_casevaults(future, request))
    loop.run_until_complete(future)

    return jsonify(future.result())

async def fetch(url, body, session):
    tmp = {
        'parameters': body,
        'user':'hub'
    }
    log.info(tmp)
    async with session.post(url, data = json.dumps(tmp), headers = {'content-type': 'application/json'}) as response:
        return await response.read()