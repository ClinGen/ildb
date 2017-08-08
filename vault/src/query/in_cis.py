import datetime
import uuid
from lib.casevaultdb import VcfSampleCollection, CaseCollection, QueryLogsCollection
from query.query_base import QueryBase, QueryDesc, QueryDescParam

import logging
FORMAT = '%(levelname)-8s %(asctime)-15s %(message)s'
logging.basicConfig(level=logging.INFO, format=FORMAT)

log = logging.getLogger()


class InCis(QueryBase):

    metadata = {
        'id': '2',
        'name': 'variant is in-cis',
        'description': 'query for snp matching optional family history, population, or clnical ids',
        'help': '',
        'parameters': {
            'chrom': {'type': 'str', 'required': True},
            'position': {'type': 'str', 'required': True},
            'allele': {'type': 'str', 'required': True},
            'clinic_indications': {'type': 'str_arr', 'required': False},
            'family_history': {'type': 'bool', 'required': False},
            'populations': {'type': 'str_arr', 'required': False}
        }
    }
    
    @staticmethod
    def get_query_description():
        """ returns query details to the query controllers api """
        return InCis.metadata

    def execute_hub_query(self, parameters):
        """ Case vault query to return results to the hub """

        # Not implemented
        # TODO update this query
        return 0

def execute_casevault_query(self, parameters):
    """ Execute the query and return detailed results for the case vault """