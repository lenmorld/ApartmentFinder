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

CSV_FILE = 'crimes.csv'
CRIME_PER_BOROUGH_FILE = 'crime_per_borough.json'
# MAPQUEST_KEY = 'faOSrQi0CXGBeBA6Ri3rkp4cVJK7J7sG'         # lenmorvash1- crime-data-1
# MAPQUEST_KEY = 'aDpAAl2NvQw9kg1ibfm0g1mwujU6uKPL'           # lenmorvash1- my app
# MAPQUEST_KEY = 'UGgf9EsWAuJwxTJud3sP4ROHTiKfrTy1'              # lizone - crime-data-2
# MAPQUEST_KEY = 'N61Xllm8693poAb5eGdyQlOeei5o9htF'                    # crime-data-3
# MAPQUEST_KEY = 'TYCHAZGsbgGauuPQjhh1JDEhGIGl55gK'                    # lenmorvash11 myapp
MAPQUEST_KEY = 'RGbHZnX14kvMioUFFaRFpRoZfZ6SRmU2'                   # myapp2

df = pd.read_csv(CSV_FILE, encoding="ISO-8859-1")
# df = pd.read_csv(CSV_FILE, encoding="utf-8")
fieldnames = ("CATEGORIE", "DATE", "QUART", "PDQ", "X", "Y", "LAT", "LONG")

boroughs = pd.read_json(CRIME_PER_BOROUGH_FILE, typ='series')       # series better for scalar values
# boroughs = df1[0]

def reverse_geocode_address(lat, long):
    response_json = None
    postal_code = None
    street = None
    city = None

    try:
        # Google Maps limit 2500 per day
        # url = " http://maps.googleapis.com/maps/api/geocode/json?sensor=false&latlng={},{}".format(lat, long)

        # MapQuest 15k per month, for 75k rows, 5 rounds(accounts)
        url = "http://open.mapquestapi.com/geocoding/v1/reverse?key={}&location={},{}".format(MAPQUEST_KEY, lat, long)
        # print(url)
        response = requests.get(url)
        response_json = response.json()

        # ------------ Google Map API response -------------------
        # https://developers.google.com/maps/documentation/javascript/geocoding#GeocodingResponses

        # pprint.pprint(response_json)
        # address = response_json['results'][0]['address_components']
        #
        # # zipcode is usually the last component, this is efficient and succinct
        # # but may not be future-proof
        # zipcode = address[len(address) - 1]['long_name']
        # --------------------------------------------------------

        # -------------- MapQuest ---------------------------------
        # https://developer.mapquest.com/documentation/open/geocoding-api/reverse/get/

        # print(response_json)
        address = response_json['results'][0]['locations'][0]
        postal_code = address['postalCode']
        street = address['street']
        city = address['adminArea5']
        # ---------------------------------------------------------

        # print("{} is at {}, {}".format(zipcode, lat, long))

    except:
        # status = response_json['status']
        # error_message = response_json['error_message']

        if response_json is not None:
            error_message = response_json['info']['messages'][0]
        else:
            error_message = "Error before response"

        print(">> failed geocoding for {} {} because of : {}".format(lat, long, error_message))
        postal_code = "INV"

    return postal_code, street, city




crimes_per_borough = {}

for index, row in df.iterrows():

    lat = row['LAT']
    long = row['LONG']

    # data cleansing, some rows have 1,1 LAT, LONG
    if lat == 1 and long == 1:
        continue

    try:
        if not pd.isnull(row['POSTAL']) and not row['POSTAL'] == 'INV':
        # if row['POSTAL'] != 0:
            print("Already good")
            continue

            # input("continue")
    except KeyError:
        pass

    # print(row['CATEGORIE'] + ':' + str(lat) + ':' + str(long))

    postal_result, street, city = reverse_geocode_address(lat, long)
    print("{} is at {}, {}".format(postal_result, lat, long))

    # get first 3 characters which represent the borough e.g. H2L from H2L3W2
    if postal_result:
        borough_code = postal_result[:3]

        # create borough category if not exist yet, otherwise add 1
        # if borough_code in crimes_per_borough.keys():
        #     crimes_per_borough[borough_code] = crimes_per_borough[borough_code] + 1
        # else:
        #     crimes_per_borough[borough_code] = 1

        # using saved file
        if borough_code in boroughs.keys():
            boroughs[borough_code] = boroughs[borough_code] + 1
        else:
            boroughs[borough_code] = 1

        # pprint.pprint(crimes_per_borough)

        # add to csv columns
        # !! doing this will assign 1 postal to all of them df['POSTAL'] !!
        df.loc[index, 'POSTAL'] = postal_result
        df.loc[index, 'BOROUGH'] = borough_code
        df.loc[index, 'STREET'] = street
        df.loc[index, 'CITY'] = city

        # input("continue?")

    else:
        print("=== MapQuest could not process this one ===")


pprint.pprint(crimes_per_borough)
print(df)

# default is overwrite whole file
CRIME_FILE_ALT = 'crimes_out.csv'
# df.to_csv(CSV_FILE, encoding='ISO-8859-1', index=False)
df.to_csv(CSV_FILE, encoding="utf-8", index=False)

# write boroughs file

# crimes_per_borough_dict = df.from_dict(crimes_per_borough, orient='index')
# df1[0] = boroughs
boroughs.to_json(CRIME_PER_BOROUGH_FILE)

# df = pd.read_json(CRIME_PER_BOROUGH_FILE, encoding="ISO-8859-1")

# with open(CRIME_PER_BOROUGH_FILE, 'w') as outfile:
#     json.dump(crimes_per_borough, outfile)
