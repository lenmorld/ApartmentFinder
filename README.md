
## Backend

### Flask


Flask web application with data processing, geocoding and mapping to CartoDB


### Scraping

- Get apartment data from Kijiji, postprocess to:
    - get Lat, Long by geocoding address (Google Maps API)
    - get num of places around lat, long given radius  (Yelp Business Search API)


    - Kijiji apartments scraper
	Module: Scrapy project


	command:
	```
	$ scrapy crawl apartments
	$ scrapy crawl apartments  -o apt4.json -t json
    ```

	INPUT: base url for scraping (kijij urls)

	model: items.py
	crawler: spiders/ApartmentCrawler.py

    ```
	flow:
        crawl apartment lists from given set of urls (base url + wildcards) → apartment list
        for each apartment item in apartment list
            get all info (defined in model) needed using xpath
                item.[apt_id, url, price, title, location, desc, date_posted, image]
            spawn a request to crawl specific apartment item's page
            parse apartment page
            ignore if no address specified
            postprocess item:
                convert french accents in address (causes errors in google geocode)
                item.[LAT, LONG] ← geocode_address(address)
                item.places ← search_places(...)

                write {item} to json

    ```


- geocode_address(address)
	INPUT: physical address
	OUTPUT: lat, long

- search_places(term, location, lat, long, url)
	Yelp places script : get number of establishments given a lat, long
			      location and url not used yet

    hardcoded params:
    LIMIT  - limit search results
    RADIUS – radius from given lat, long
    query YELP API for businesses


#### sample output:

```json
[
   {
      "apt_id":"1265540559",
      "url":"/v-appartement-condo-4-1-2/ville-de-montreal/le-quartet-piscine-exterieure-grands-appartements-renoves/1265540559",
      "price":"$875.00",
      "title":"Le Quartet - Piscine exterieure - Grands appartements renoves",
      "location":"City of Montreal",
      "desc":"English text at the end. Lappartement - Grandeur : 4 12 (2 chambres) - Quatrieme etage - Autres : plancher de bois franc et chauffage a eau chaude - Loyer : 875 $/mois (bail de 12 mois) incluant le ...",
      "date_posted":"08/11/2017",
      "image":"https://i.ebayimg.com/00/s/NTM2WDgwMA==/z/4VwAAOSwblZZHwUt/$_35.JPG",
      "address":"95 Boulevard Deguire, Saint-Laurent, QC H4N 1N5, Canada",
      "LAT":45.5308758,
      "LONG":-73.6699575,
      "places":3
   },
   {
      "apt_id":"1313411555",
      "url":"/v-location-court-terme/ville-de-montreal/mile-end-plateau-appart-spacieux-a-louer-21-nov-au-1er-fevrier/1313411555",
      "price":"$1,150.00",
      "title":"Mile End/Plateau appart. spacieux a louer 21 nov. au 1er fevrier",
      "location":"City of Montreal",
      "desc":"Charmant, appartement lumineux 4 1/2 meuble, dans le coeur du Mile-End, rez-de-chaussee, spacieux et tres lumineux. L'appartement est meuble et il y a tout le necessaire pour cuisiner. 2 chambres ...",
      "date_posted":"< 3 hours ago",
      "image":"https://i.ebayimg.com/00/s/ODAwWDYwMA==/z/aN0AAOSwDkVaDE-c/$_35.JPG",
      "address":"Montreal, QC H2T2W2",
      "LAT":45.5205715,
      "LONG":-73.5916,
      "places":50
   }, ...
]
```




## Frontend

#### React-Redux

#### Crime data

1. Map Montreal crime data - too much data points so use clsutering or heatmap

![Montreal Crime Data Clustered](https://raw.githubusercontent.com/lenmorld/Flask-sample/3_Apartments/MontrealCrimeDataClustered.png "Montreal Crime Data Clustered]")

2. -> heatmap


REFERENCES:

http://jonathansoma.com/tutorials/webapps/

