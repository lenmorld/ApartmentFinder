#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Mon Jun 12 21:31:10 2017

@author: lenmor
"""

from peewee import *

db = SqliteDatabase('montreal.db')

class Crime(Model):
    ID = CharField(primary_key=True)
    CATEGORIE = CharField()
    DATE = CharField()
    QUART = CharField()
    PDQ = IntegerField()
    LAT  = DoubleField()
    LONG = DoubleField()
    
    class Meta:
        database = db
        db_table = 'crimes'