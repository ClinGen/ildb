import datetime
import uuid
from lib.casevaultdb import VcfSampleCollection, CaseCollection, QueryLogsCollection
from query.query_base import QueryBase

class GeneralSnpCase(QueryBase):

  metadata = {
    'id':'1',
    'name':'general query',
    'description':'query for snp matching optional family history, population, or clnical ids',
    'help':'',
    'parameters': {
      'chrom' : {'type': 'str', 'required': True},
      'position': {'type': 'str', 'required': True},
      'allele': { 'type': 'str', 'required': True},
      'clinic_indications' : { 'type': 'str_arr', 'required': False},
      'family_history' : { 'type': 'bool', 'required': False},
      'populations' : { 'type': 'str_arr', 'required': False}
    }
  }

  def execute_hub_query(self, parameters):
    """ Case vault query to return results to the hub """

    # Query cases matching a specific snp
    # Using the casses returned and the additional filter criteria query for cases

    chrom = parameters['chrom']
    position = parameters['position']
    allele = parameters['allele']
    
    # get a list of cases matching a specific mutation
    case_list = VcfSampleCollection().get_case_ids_by_variant(
        chrom, position, allele)
        
    # If there are no cases matching the variant we can just return empty results
    if len(case_list) == 0:
        return 0
    
    clinic_ids = None
    if 'clinic_indications' in parameters:
        clinic_ids = parameters['clinic_indications'].split(',')
    
    family_history = None
    if 'family_history' in parameters:
        family_history = parameters['family_history']

    population = None
    if 'populations' in parameters:
        population = parameters['populations'].split(',')
    
    # retrieve a list of cases matching a list of clinical indications and cases
    result = CaseCollection().get_by_clinical_history_population (
        case_list,
        clinic_ids,
        family_history,
        population
    )

    return len(result)

def execute_casevault_query(self, parameters):
    """ Execute the query and return detailed results for the case vault """
