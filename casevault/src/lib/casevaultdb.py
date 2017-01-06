"""
database.py
Data access logic
"""

import datetime
import pymongo
from bson.objectid import ObjectId
import logging
from .collection_base import CollectionBase
from datetime import datetime, timedelta

FORMAT = '%(levelname)-8s %(asctime)-15s %(message)s'
logging.basicConfig(level=logging.INFO, format=FORMAT)

log = logging.getLogger()

DB_NAME = "casevault"


class VcfFileCollection(CollectionBase):

    def __init__(self):
        super().__init__('vcf')


class VcfSampleCollection(CollectionBase):

    def __init__(self):
        super().__init__('vcf.samples')

    def get_by_fileid(self, id):
        """
        Get a list of sample ids by cases
        """

        with self.mongo_client as mclient:
            db = mclient[DB_NAME]
            collection = db[self.collection_name]

            cursor = collection.find({'fileId': id}, {})

            return self.to_list(cursor)

    def get_by_caseid(self, id):
        """
        Get a list of sample ids by cases
        """

        with self.mongo_client as mclient:
            db = mclient[DB_NAME]
            collection = db[self.collection_name]

            cursor = collection.find({'caseId': id}, {})

            return self.to_list(cursor)

    def get_variants_count(self, chrom, position, allele, reference):
        """
        @return int

        @param chrom
        @param position
        @param allele
        @param reference
        """

        with self.mongo_client as mclient:
            db = mclient[DB_NAME]

            # This does not quite fit the 1:1 class:collection used in this wrapper since it works across multiple
            # At the moment the only query is on the
            genome_data = db[self.collection_name]

            # search the genome database
            # we can add a limit since we are simply looking for an occurance
            cursor = genome_data.find(
                {'variants': chrom + '_' + position + '_' + allele}
            )

            return sum(1 for i in cursor)

    def get_case_ids_by_variant(self, chrom, position, allele):
        """
        @return [caseIds]

        @param chrom
        @param position
        @param allele
        """

        with self.mongo_client as mclient:
            db = mclient[DB_NAME]

            # This does not quite fit the 1:1 class:collection used in this wrapper since it works across multiple
            # At the moment the only query is on the
            genome_data = db[self.collection_name]

            # search the genome database
            # we can add a limit since we are simply looking for an occurance
            cursor = genome_data.distinct (
                'caseId',
                {'variants': chrom + '_' + position + '_' + allele}
            )

            # return as an immutable tuple
            return tuple(cursor)

class CaseCollection(CollectionBase):

    def __init__(self):
        super().__init__('cases')
    
    def get_by_clinical_history_population(self, case_ids, clinical_ids = None, family_history = None, populations = None):

        with self.mongo_client as mclient:
            db = mclient[DB_NAME]

            case_data = db[self.collection_name]

            obj_ids = [ObjectId(i) for i in case_ids]

            query = {'_id': {'$in' : tuple(obj_ids)}}

            if clinical_ids is not None:
                query['clinicalIndications'] = {'$in': clinical_ids}

            if family_history is not None:
                query['familyHistoryOfCancer'] = True
            
            if populations is not None:
                query['ethnicity'] = {'$in': populations}

            cursor = case_data.find (query)

            return self.to_list(cursor)

    def get_total(self):
        with self.mongo_client as mclient:
            db = mclient[DB_NAME]

            case_data = db[self.collection_name]

            return case_data.count()

class UserCollection(CollectionBase):

    def __init__(self):
        super().__init__('users', False)

class QueryLogsCollection(CollectionBase):
    def __init__(self):
        super().__init__('query.logs')

    def num_query_count_since(self, days):
        """ Return the query count since the number of days passed """

        with self.mongo_client as mclient:
            db = mclient[DB_NAME]

            query_logs = db[self.collection_name]

            return query_logs.count({'datetime' : {'$gte': datetime.utcnow() - timedelta(days=days)}})


class UserAuthHistoryCollection(CollectionBase):

    def __init__(self):
        super().__init__('users.auth_history')
