
import os
import sys
import pymongo
import vcf
import json

from pprint import pprint

def main():


  if (len(sys.argv) < 2):
    print ('import file expected - python import.py import.vcf')
    return
  
  vcfFile = sys.argv[1]

  if not (os.path.isfile(vcfFile) ):
    print('file not found - ' + vcfFile)
    return
  
  print('importing file ' + vcfFile)

  #vcf_reader = vcf.Reader(open('/data/individual-small.vcf'), 'r')
  vcf_reader = vcf.Reader(open(vcfFile), 'r')

  print ('begining import of the following samples')
  pprint(vcf_reader.samples)

  #open a connect to mongodb
  with pymongo.MongoClient(host='mongodb://mongo:27017') as mclient:

        # get a database from the client
        db = mclient.clinbeacon

        # get a collection for the genome data
        genome_data = db['genome']

        # the following creates a document for every cell and some of the data may currently be duplicate or not needed
        # we might want to explore more efficient approaches
        # we can also do batch writes to mongo to help optimize the import process

        counter = 0
        progressindex = 0

        sys.stdout.write ("processing...\\")

        for record in vcf_reader:
          for sample in record.samples:
            doc = {
              'sample': sample.sample,
              'chrom': record.CHROM,
              'pos': record.POS,
              'ref': record.REF,
              'qual': record.QUAL,
              'calldata': convert_call_data(sample.data),
              'gt_alleles': sample.gt_alleles,
              'gt_bases': sample.gt_bases,
              'gt_nums': sample.gt_nums,
              'phased': sample.phased,
              'ploidity': sample.ploidity
            }
            if (counter % 200 == 0):
              progressindex += 1
              if (progressindex > 3):
                progressindex = 0
              sys.stdout.write("\b%s" % ['\\', '|', '/', '-'][progressindex])
              sys.stdout.flush()
            
            counter+=1
            genome_data.insert_one(doc)

        print('\nIMPORT COMPLETE:')
        print('{0} documents imported'.format(counter))

def convert_call_data(f):
  return dict((name, getattr(f, name)) for name in dir(f) if not (name.startswith('_') or name == 'count' or name == 'index') )

if __name__ == '__main__': main()
