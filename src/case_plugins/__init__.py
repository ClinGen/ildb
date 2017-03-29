import os
import base64
import logging

FORMAT = '%(levelname)-8s %(asctime)-15s %(message)s'
logging.basicConfig(level=logging.INFO, format=FORMAT)

log = logging.getLogger()

class PluginDefinition(object):
    """ Plugin definition """

def get_plugins():
    this_dir, this_filename = os.path.split(__file__)

    directories = [os.path.join(this_dir,o) for o in os.listdir(this_dir) if (os.path.isdir(os.path.join(this_dir,o)) & ('__pycache__' not in o))]

    plugins = []

    for directory in directories:
        plugin = {}
        log.info(directory)

        with open(os.path.join(directory, 'edit.html'), 'r') as f:
            plugin['edit_view'] = base64.b64encode(f.read().encode()).decode("utf-8")

        plugins.append(plugin)
    
    return plugins