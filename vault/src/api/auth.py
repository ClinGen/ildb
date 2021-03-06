from functools import wraps
from flask import request, abort, g
import sys
import jwt
from api import log


def requires_auth(func):
    @wraps(func)
    def func_wrapper(*args, **kwargs):

        # decode the session cookie
        try:
            # look for the session token on the cookies or a header
            session_id = request.cookies.get('session_id') or request.headers.get('sessionid')

            log.info(session_id)

            # TODO: read secret from configuration
            session_id = jwt.decode(session_id, 'secret', algorithms=['HS256'])

            # add it to the request app context
            g.userid = session_id["userid"]

            # TODO: Validate the claims and token expiration
        except:
            log.error('unable to decode session')
            log.error(sys.exc_info()[0])
            abort(401)

        return func(*args, **kwargs)
    return func_wrapper
