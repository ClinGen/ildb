from os import path
import sys

from query.general_snp_case import GeneralSnpCase

sys.path.append(path.abspath('../lib'))

# List of registered query implementations supported by this vault
query_collection = [
    GeneralSnpCase
  ]
