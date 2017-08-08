from os import path
import sys

from query.general_snp_case import GeneralSnpCase
from query.in_cis import InCis
from query.phenotype_for_variant import PhenotypeForVariant
from query.denovo import Denovo

sys.path.append(path.abspath('../lib'))

# List of registered query implementations supported by this vault
query_collection = [
    GeneralSnpCase,
    InCis,
    PhenotypeForVariant,
    Denovo
  ]