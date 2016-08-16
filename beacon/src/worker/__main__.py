"""
Celery background services

This module is used for services that need to perform background job processing
- VCF import processing
- Data maintenance and cleanup tasks
"""

import sys

from celery import Celery
from worker.settings import Settings

app = Celery(broker=Settings.mongo_connection_string)

@app.task(name='tasks.process_import')
def process_import(sample_id):
  print('hello ' + sample_id)
  return 5

if __name__ == '__main__':
  app.send_task('tasks.process_import', ['norm2'])
  app.worker_main()