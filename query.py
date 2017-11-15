#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Thu Jun  8 22:44:37 2017

@author: lenmor
"""

from models import *

schools = School.get(School.school_name == 'Union Square Academy for Health Sciences')
# print (school.dbn)

schools = School.select().where(School.boro == 'Brooklyn')

print (schools.count())
for school in schools:
  print(school.school_name)
  
  
schools = School.select().where(School.boro == 'Manhattan').limit(5).order_by(School.total_students.asc())
for school in schools:
  print (school.school_name, school.total_students)
  
  
schools = School.select().where(School.boro == 'Bronx').limit(5).order_by(School.total_students.desc())
for school in schools:
  print (school.school_name, school.total_students)