from flask import Flask
from flask import render_template, jsonify, url_for

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html', text="Hello World!")

@app.route('/hello_world')
def hello_world():
    return 'Hello World!'


if __name__ == '__main__':
    app.run()
    # default runs at http://127.0.0.1:5000/