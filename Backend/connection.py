from flask import Flask, render_template, Response, request, redirect, url_for, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

config = {
    'host': 'localhost',
    'user': 'Admin',
    'password': 'frith',
    'database': 'frith_friends'
}

@app.route('/')
def index():
    pass

@app.route('/add', methods=['POST'])
def add():
    print(request.json['data'])
    data = request.json['data']
    conn = mysql.connector.connect(**config)
    cursor = conn.cursor()
    cursor.execute(f'INSERT INTO consumable VALUES {data}')
    conn.commit()
    cursor.close()
    conn.close()
    response = {"status": "success"}
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)