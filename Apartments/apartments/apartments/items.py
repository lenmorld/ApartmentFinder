# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/en/latest/topics/items.html

import scrapy


class ApartmentsItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    # pass

    apt_id = scrapy.Field()
    url = scrapy.Field()
    address = scrapy.Field()
    price = scrapy.Field()
    date_posted = scrapy.Field()
    num_bedrooms = scrapy.Field()
    num_bathrooms = scrapy.Field()
    desc = scrapy.Field()
    title = scrapy.Field()
    image = scrapy.Field()
    location = scrapy.Field()
    LAT = scrapy.Field()
    LONG = scrapy.Field()
    places = scrapy.Field()
