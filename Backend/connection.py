from flask import Flask, render_template, Response, request, redirect, url_for, jsonify
from flask_cors import CORS
import mysql.connector
import ast

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
    updateData = parse_dictionary(data['updateData'])
    print(f"UPDATE {data['tableName']} SET {updateData} WHERE {table_id_col} = {data['itemId']}")
    # Using parameterized query to update a specific item by its ID
    cursor.execute(f"UPDATE {data['tableName']} SET {updateData} WHERE {table_id_col} = {data['itemId']}")
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

@app.route('/get_data', methods=['GET'])
def get_data():
    table_name = request.args.get('table_name')
    row_id = request.args.get('row_id')
    
    if table_name is None or row_id is None:
        return jsonify({"status": "error", "message": "Table name and row ID are required."})

    conn = mysql.connector.connect(**config)
    cursor = conn.cursor()
    
    try:
        # Use a parameterized query to retrieve data from the specified table and row
        cursor.execute(f'SELECT * FROM {table_name} WHERE {get_item_ids(table_name)} = %s', (row_id,))
        row = cursor.fetchone()
        conn.close()
        
        if row is None:
            return jsonify({"status": "error", "message": "Row not found."})
        
        # Convert the retrieved row to a dictionary for JSON response
        columns = [desc[0] for desc in cursor.description]
        data = dict(zip(columns, row))
        return jsonify({"status": "success", "data": data})
    except Exception as e:
        conn.close()
        return jsonify({"status": "error", "message": str(e)})

def parse_dictionary(dictionary):
    key_value_pairs = [f"{key} = \"{value}\"" for key, value in dictionary.items()]
    result = ', '.join(key_value_pairs)
    return result

if __name__ == '__main__':
    app.run(debug=True)