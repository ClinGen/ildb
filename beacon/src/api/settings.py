import os

settings = {
  MONGO_CONNECTION_STRING = os.environ.get('MONGO_CONNECTION_STRING')
  CLIENT_APP = os.path.join(ROOT_PATH, 'client')
}
