# -*- coding: utf-8 -*-

from flask import Flask
from flask import render_template

from dev.models import *

app = Flask(__name__)

@app.route('/')
def index():
    school_count = School.select().count()
    schools = School.select().order_by(School.school_name.asc())
    return render_template('index.html', count=school_count, schools=schools)
#    return '<h1>Hello World!</h1>'

#@app.route('/schools/clemente')
#def school():
#    return render_template('school.html')
#    return 'PS15 Roberto Clemente'

@app.route('/schools/<dbn>')
def school(dbn):
    school_id = dbn;
    school = School.select().where(School.dbn == school_id).get()
    return render_template('school.html', school = school)
#     grandma = Person.select().where(Person.name == 'Grandma L.').get()

@app.route('/map')
def map_it():
    schools = School.select().order_by(School.school_name.asc())
    return render_template('carto.html', schools=schools)
    
if __name__ == '__main__':
    try:
        app.run(debug=True, port=8082)
    except:
        print("haha")
        input()
    
