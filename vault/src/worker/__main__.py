"""
Celery background services

This module is used for services that need to perform background job processing
- VCF import processing
- Data maintenance and cleanup tasks
"""

import sys

from celery import Celery
from lib.settings import Settings
from worker.vcf_tasks import import_vcf

app = Celery(broker=Settings.mongo_connection_string)
app.conf.CELERY_ACCEPT_CONTENT = ['json']

@app.task(name='tasks.process_import')
def process_import(file_id):
  print('processing vcf file - ' + file_id)
  import_vcf(file_id)
  return True

if __name__ == '__main__':
  app.worker_main()