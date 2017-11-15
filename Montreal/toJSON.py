# -*- coding: utf-8 -*-

import csv
import json
import pandas as pd

#csvfile = open('crimes.csv', 'r')
df = pd.read_csv('crimes.csv', encoding = "ISO-8859-1")
# df = df[['LAT', 'LONG']]  -> {"LAT":45.5012532105,"LONG":-73.6206786362},{"LAT":45.5242817532,"LONG":-73.5758883043}
#df = map(list, df.values)
#jsonfile = open('crimes.json', 'w')

fieldnames = ("ID","CATEGORIE","DATE","QUART", "PDQ", "X", "Y", "LAT", "LONG")
#reader = csv.DictReader( csvfile, fieldnames)
#for row in reader:
#
#for index, row in df.iterrows():
#    json.dump(row, jsonfile)
#    jsonfile.write('\n')

df = df[['LAT', 'LONG']] 
df.to_json("crimes_lat_long.json", orient='values')  # -> [[45.6016777507,-73.5486926833],[45.4449528402,-73.6769260449],[45.6350960394,-73.5028680349],