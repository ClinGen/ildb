import os
from flask import send_from_directory
from api import app

client = os.path.join(os.path.dirname(os.path.abspath(__file__)), "ui")
output = os.path.join(os.path.dirname(os.path.abspath(__file__)), ".tmp")

# static files served from nginx in production
@app.route('/<path:path>', methods=['GET'])
def static_proxy(path):
    if os.path.isfile(os.path.join(output, path)):
        return send_from_directory(output, path)
    return send_from_directory(client, path)

# home page served from nginx in production
@app.route('/', methods=['GET'])
def default_index():
    return send_from_directory(client, 'index.html')
    
if __name__ == '__main__': 
    app.run(host='0.0.0.0', port=80)
