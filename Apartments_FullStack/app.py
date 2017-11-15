from flask import Flask, jsonify, request, render_template
import json
from pprint import pprint

API_PORT = 9402

app = Flask(__name__)

# get JSON at app load
# or even better, if app will be running permanently
# invoke crawling here

# load JSON file here
with open('apartments.json') as apt_file:
    data = json.load(apt_file)

# pprint(data)
# print(data[0]['LAT'])

@app.route('/')
def home():
    # return "<div>Hello world of HTML</div>"
    return render_template('index.html')

@app.route('/apartments')
def get_apartments():
    return jsonify(data)


app.run(port=API_PORT)