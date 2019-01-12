from flask import Flask

app = Flask(__name__)

@app.route('/')
def index():
    return '<a href="https://www.vexels.com/vectors/preview/127670/flat-flower-plant-tub"> Flat flower plant tub </a> | designed by Vexels'

if __name__ == '__main__':
    app.run(host='192.168.1.29', port=80)