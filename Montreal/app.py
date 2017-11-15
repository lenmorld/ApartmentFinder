# -*- coding: utf-8 -*-

import json

from flask import Flask
from flask import render_template
from playhouse.shortcuts import model_to_dict

app = Flask(__name__)

@app.route('/')
def index():
    crimes_count = Crime.select().count()
    crimes = Crime.select().order_by(Crime.DATE.desc())
    # convert peewee results Model to JSON
    ctr = 1
    json_data = []
    for crime in crimes:
    	json_data.append(model_to_dict(crime))
    	ctr += 1
    	# limit results to not overload browser
    	if(ctr > 500):
    		break

    return render_template('index.html', crimes_count=crimes_count, data=json.dumps(json_data))


if __name__ == '__main__':
    try:
        app.run(debug=True, port=8084)
    except:
        input()