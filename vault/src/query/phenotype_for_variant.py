import datetime
import uuid
from lib.casevaultdb import VcfSampleCollection, CaseCollection, QueryLogsCollection
from query.query_base import QueryBase, QueryDesc, QueryDescParam

class PhenotypeForVariant(QueryBase):

    metadata = {
        'id': '3',
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
        return PhenotypeForVariant.metadata

    def execute_hub_query(self, parameters):
        """ Case vault query to return results to the hub """
        
        # Not implemented
        # TODO update this query
        return 0

def execute_casevault_query(self, parameters):
    """ Execute the query and return detailed results for the case vault """