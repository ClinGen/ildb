import sys
from os import path
import logging

sys.path.append(path.abspath('../lib'))

FORMAT = '%(levelname)-8s %(asctime)-15s %(message)s'
logging.basicConfig(level=logging.INFO, format=FORMAT)

log = logging.getLogger()
