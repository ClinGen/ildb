import pymongo

def main():
  with pymongo.MongoClient(host='mongodb://mongo:27017') as mclient:
    mclient.drop_database('clinbeacon')

if __name__ == '__main__': main()
