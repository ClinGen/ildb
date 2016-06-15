

Create a network used to run this test app
```
docker network create vcfmongo
```

Create a mongodb server
```
docker run -d --net vcfmongo --net-alias mongo --name mongo mongo:3.3.6
```

Create a python dev instance (from the vcfmongo directory). After this container is created you can connect to it again using docker attach.
```
docker run -it --net vcfmongo --name vcfmongo -v `pwd`/src:/app -v `cd ../../sampledata; pwd`:/data -w /app python:3.4.4 bash
```

Attach to your container again
```
docker run vcfmongo
docker attach vcf mongo
```

From the container terminal run the following
```
pip install -r requirements.txt
```

Import some data into mongodb using something like the following
```
python import.py /data/NA12878.garvan.nextera.exome.snps.indels.vcf
```

Drop the database using the following
```
python drop.py
```

Alternatively docker compose can be used, but it's a bit tricky getting it working right in development environment

## Data model
1. Document for each row in a VCF or one for each column
2. Document size limit in MondoDB is 16MB
3. Do we create a document for each record for every patient
4. We might want to consider storing only the parts of the document wee need in Mongo specifically for the queries we want to support and store the raw compressed data
5. Maybe we can group by chrom