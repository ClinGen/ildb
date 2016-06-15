import pymongo

# this just returns the first 100 results
def main():
  with pymongo.MongoClient(host='mongodb://mongo:27017') as mclient:
    db = mclient.clinbeacon
    results = db.genome.aggregate([
        {'$limit': 100}
    ])

    for result in results:
      print(result)

if __name__ == '__main__': main()
