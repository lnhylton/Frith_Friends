from flask import Flask, render_template, Response, request, redirect, url_for, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

config = {
    'host': 'localhost',
    'user': 'root', # Change this to admin if necessary
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

@app.route('/update', methods=['PUT'])
def update():
    #try:
    print(request.json)
    data = request.json
    table_id_col = get_item_ids(data['tableName'])
    conn = mysql.connector.connect(**config)
    cursor = conn.cursor()

    # Using parameterized query to update a specific item by its ID
    cursor.execute(f'UPDATE {data['tableName']} SET {data['updateData']} WHERE {table_id_col} = {data['itemId']}')
    conn.commit()
    cursor.close()
    conn.close()
    response = {"status": "success"}
    #except Exception as e:
    #    response = {"status": "error", "message": str(e)}
    return jsonify(response)

def get_item_ids(table_name):
    # Define a dictionary to map table names to their respective ID column names
    table_to_id_column = {
        "consumable": "c_id",
        "consumable_location": "c_id",
        "machine": "m_id",
        "machine_location": "m_id",
        "non_consumable": "nc_id",
        "non_consumable_location": "nc_id",
        "room": "r_id",
        "storage_medium": "sm_id",
    }

    return table_to_id_column[table_name]


if __name__ == '__main__':
    app.run(debug=True)