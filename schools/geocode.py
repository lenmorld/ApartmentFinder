# -*- coding: utf-8 -*-

from models import *
import requests
from time import sleep

# run migration (adding, removing or changing your DB)

try:
    db.execute_sql("ALTER TABLE schools ADD COLUMN latitude DECIMAL(9, 6)")
    db.execute_sql("ALTER TABLE schools ADD COLUMN longitude DECIMAL(9, 6)")
except:
    print("already added columns, skipping that part")

#schools = School.select()

#for school in schools:
#    print (school.full_address())


# get all schools that haven't been geo coded yet
# by selecting where latitude is NULL

schools = School.select().where(School.latitude >> None)

for school in schools:
    # wait a few seconds between each to not be banned and be polite
    sleep(1)
    
    try:
        # form URL with address in it
        # "http://maps.googleapis.com/maps/api/geocode/json?sensor=false&address=91-30 METROPOLITAN AVENUE,  QUEENS, NY"
        url = "http://maps.googleapis.com/maps/api/geocode/json?sensor=false&address={}".format(school.full_address())
        
        # request URL
        response = requests.get(url)
        
        # examine JSON, e.g {u'lat': 40.7135296, u'lng': -73.9856844}
        # print(response.json())
        coords = response.json()['results'][0]['geometry']['location']
        
        # assign lat, lang to school object
        school.latitude = coords['lat']
        school.longitude = coords['lng']
        
        # save to DB
        school.save()
        
        print("{} is at {}, {}".format(school.school_name, school.latitude, school.longitude))
        
    except:
        print(">> failed geocoding for {}".format(school.school_name))