import os
import base64
import logging
import yaml
import importlib

# import case_plugins.common.backend

FORMAT = '%(levelname)-8s %(asctime)-15s %(message)s'
logging.basicConfig(level=logging.INFO, format=FORMAT)

log = logging.getLogger()

class CasePlugin(object):
    """ Plugin definition """
    def get_dict(self):
        """ return serializable dict version """
        return {
            'id': self.id,
            'edit_view': self.edit_view,
            'schema': self.schema
        }

def get_plugins():
    this_dir, this_filename = os.path.split(__file__)

    directories = [{'path':os.path.join(this_dir,o), 'folder': o} for o in os.listdir(this_dir) if (os.path.isdir(os.path.join(this_dir,o)) & ('__pycache__' not in o))]

    plugins = []

    for directory in directories:
        plugin = CasePlugin()

        plugin.id = directory['folder']

        with open(os.path.join(directory['path'], 'edit.html'), 'r') as f:
            plugin.edit_view = base64.b64encode(f.read().encode()).decode("utf-8")

        with open(os.path.join(directory['path'], 'schema.yml'), 'r') as f:
            plugin.schema = yaml.safe_load(f)
        
        plugin.event_handlers = getattr(importlib.import_module('case_plugins.' + directory['folder'] + '.backend'), 'BackendEvents')

        plugins.append(plugin)

        break
    
    return plugins