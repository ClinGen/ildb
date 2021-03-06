from celery import Celery
from lib.settings import Settings

celery_client = Celery(broker=Settings.mongo_connection_string)
celery_client.conf.CELERY_TASK_SERIALIZER = "json"

#@celery_client.task(name='tasks.process_import')

def queue_vcf_import(file_id):
    celery_client.send_task('tasks.process_import', [file_id], serializer='json')
