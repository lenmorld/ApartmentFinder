# read crimes CSV file
# each entry in CSV has LAT, LONG
# but this will be n^2 complexity
# N: apartments * N: crimes

# optimization after

# or another way
"""
geolocalize all crimes from LAT, LONG to boroughs- identified by Postal code
get total crimes per postal code
this gives a score to each borough

e.g. Lachine - H8T - X number of crimes

1. geo-localize all crime data and add a column
    can probably be done easily in Panda
    
    reverse geocoding : https://developers.google.com/maps/documentation/geocoding/intro#ReverseGeocoding
    
    e.g.
    http://maps.googleapis.com/maps/api/geocode/json?sensor=false&latlng=40.7135296,-73.9856844
"""

#  -*- coding: utf-8 -*-

import csv
import json
import pandas as pd
import requests
import pprint

#csvfile = open('crimes.csv', 'r')
df = pd.read_csv('crimes.csv', encoding = "ISO-8859-1")
# df = df[['LAT', 'LONG']]  -> {"LAT":45.5012532105,"LONG":-73.6206786362},{"LAT":45.5242817532,"LONG":-73.5758883043}
#df = map(list, df.values)
#jsonfile = open('crimes.json', 'w')

fieldnames = ("CATEGORIE", "DATE", "QUART", "PDQ", "X", "Y", "LAT", "LONG")

#reader = csv.DictReader( csvfile, fieldnames)
#for row in reader:

# df = df[['LAT', 'LONG']]
# df.to_json("crimes_lat_long.json", orient='values')  # -> [[45.6016777507,-73.5486926833],[45.4449528402,-73.6769260449],[45.6350960394,-73.5028680349],

def reverse_geocode_address(lat, long):
    # address = self.convert_french_accents(address)        # done in parse_apartment_page already

    try:
        # form URL with address in it
        url = " http://maps.googleapis.com/maps/api/geocode/json?sensor=false&latlng={},{}".format(lat, long)

        # request URL
        response = requests.get(url)
        response_json = response.json()

        # Google Map API response
        # https://developers.google.com/maps/documentation/javascript/geocoding#GeocodingResponses

        pprint.pprint(response_json)
        address = response_json['results'][0]['address_components']

        # zipcode is usually the last component, this is efficient and succinct
        # but may not be future-proof
        zipcode = address[len(address) - 1]['long_name']

        # print("{} is at {}, {}".format(zipcode, lat, long))

    except:
        status = response_json['status']
        error_message  = response_json['error_message']
        print(">> failed geocoding for {} {} because of : {}".format(lat, long, status))
        zipcode = "INV"

    return zipcode


crimes_per_borough = {}

for index, row in df.iterrows():
    # print(row['CATEGORIE'] + ':' + str(row['LAT']) + ':' + str(row['LONG']))

    zipcode_result = reverse_geocode_address(row['LAT'], row['LONG'])
    print("{} is at {}, {}".format(zipcode_result, row['LAT'], row['LONG']))

    # get first 3 characters which represent the borough e.g. H2L from H2L3W2
    borough_code = zipcode_result[:3]

    # create borough category if not exist yet, otherwise add 1
    if (borough_code in crimes_per_borough.keys()):
        crimes_per_borough[borough_code] = crimes_per_borough[borough_code] + 1
    else:
        crimes_per_borough[borough_code] = 1

        # 1. reverse-geocode LAT LONG to postal code e.g. H2L
    # 2. sum up each postal code area for each crime

    # pass


pprint.pprint(crimes_per_borough)