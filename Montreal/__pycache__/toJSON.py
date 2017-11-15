# -*- coding: utf-8 -*-

import csv
import json

csvfile = open('crimes.csv', 'r')
jsonfile = open('crimes.json', 'w')

fieldnames = ("ID","CATEGORIE","DATE","QUART", "PDQ", "X", "Y", "LAT", "LONG")
reader = csv.DictReader( csvfile, fieldnames)
for row in reader:
    json.dump(row, jsonfile)
    jsonfile.write('\n')