import os
import sys
import pymongo

def main():

  if (len(sys.argv) < 2):
    print ('parameters expected')
    print ('Examples:')
    print ('python tools.py adduser test@fs180.onmicrosoft.com')
    return
  
  # adduser
  # expect a userid for example 'python tools.py adduser test@fs180.onmicrosoft.com'
  if (sys.argv[1] == 'adduser'):
    if (len(sys.argv) < 3):
      print ('adduser command requires additional parameter')
      return
    
    connection_string = os.environ.get('MONGO_CONNECTION_STRING')
    if(connection_string == None):
      print ('export settings first using the following command')
      print ('source dev-settings.sh')
      return

    userid = sys.argv[2]

    with pymongo.MongoClient(host = connection_string) as mclient:
      db = mclient['clinbeacon']
      user_data = db['users']
      user_data.insert_one({'_id':userid})

  # addtenant
  # expect a tenant name and endpoint for example 'python tools.py addtenant Test http://beacon.westus.cloudapp.azure.com'
  if (sys.argv[1] == 'addtenant'):
    if (len(sys.argv) < 4):
      print ('addtenant command requires name and endpoint positional parameters')
      return
    
    connection_string = os.environ.get('MONGO_CONNECTION_STRING')
    if(connection_string == None):
      print ('export settings first using the following command')
      print ('source dev-settings.sh')
      return

    tenant = sys.argv[2]
    endpoint = sys.argv[3]

    with pymongo.MongoClient(host = connection_string) as mclient:
      db = mclient['clinbeacon']
      user_data = db['tenants']
      user_data.insert_one({'name':tenant, 'endpoint':endpoint})
if __name__ == '__main__': main()
