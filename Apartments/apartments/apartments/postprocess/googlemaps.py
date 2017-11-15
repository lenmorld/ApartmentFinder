import requests


def geocode_address(address):
    # address = self.convert_french_accents(address)        # done in parse_apartment_page already

    try:
        # form URL with address in it

        # "http://maps.googleapis.com/maps/api/geocode/json?sensor=false&address=91-30 METROPOLITAN AVENUE,  QUEENS, NY"
        url = "http://maps.googleapis.com/maps/api/geocode/json?sensor=false&address={}".format(address)

        # request URL
        response = requests.get(url)

        # examine JSON, e.g {u'lat': 40.7135296, u'lng': -73.9856844}
        # print(response.json())
        coords = response.json()['results'][0]['geometry']['location']

        # assign lat, lang to school object
        latitude = coords['lat']
        longitude = coords['lng']

        print("{} is at {}, {}".format(address, latitude, longitude))

    except:
        print(">> failed geocoding for {}".format(address))

    return latitude, longitude