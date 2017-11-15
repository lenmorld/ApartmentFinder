#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Thu Jun  8 22:24:12 2017

@author: lenmor
"""

from peewee import *

db = SqliteDatabase('schools.db')

class School(Model):
  # These are all the fields it has
  # match up CharField/IntegerField/etc with correct type
  dbn = CharField(primary_key=True) # primary key = unique id
  school_name = CharField()
  boro = CharField()
  grade_span_min = IntegerField()
  grade_span_max = IntegerField()
  total_students = IntegerField()
  
  class Meta:
      database = db
      db_table = 'schools'
      
# Repeat with the SAT scores
class Score(Model):
  dbn = CharField(primary_key=True)
  school_name = CharField()
  number_of_test_takers = CharField()
  critical_reading_mean = IntegerField()
  mathematics_mean = IntegerField()
  writing_mean = IntegerField()
  
  class Meta:
    database = db
    db_table = 'sat_scores'