from flask import Flask, render_template, Response, request, redirect, url_for, jsonify
from flask_cors import CORS
import mysql.connector
import ast
import password_backend
import json
from datetime import datetime

BACKEND_PORT = 5001

app = Flask(__name__)
CORS(app)

config = {
    'host': 'localhost',
    'user': 'Admin',
    'password': 'frith',
    'database': 'frith_friends'
}

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

@app.route('/')
def index():
    pass

@app.route('/add', methods=['PUT'])
def add():
    try:
        data = request.json
        addData = parse_dictionary(data['addData'])

        conn = mysql.connector.connect(**config)
        cursor = conn.cursor()
        print(f"INSERT INTO {data['tableName']} SET {addData}")

        # Using parameterized query to add a specific item by its ID
        cursor.execute(f"INSERT INTO {data['tableName']} SET {addData}")
   # Get timestamp value and adding it to the data
        tableName = data['tableName'] 
        changeDataDict = data['addData']
        current_timestamp = datetime.now()
        formatted_timestamp = current_timestamp.strftime('%Y-%m-%d %H:%M:%S')
        changeDataDict['change_timestamp'] = formatted_timestamp

        # # Convert data into sql format and get new table name
        changeData = parse_dictionary(changeDataDict)
        tableName+="_changes"

        # Insert data into database
        print(f"INSERT INTO {tableName} SET {changeData}");
        cursor.execute(f"INSERT INTO {tableName} SET {changeData}")
        conn.commit()
        cursor.close()
        conn.close()
        response = {"status": "success"}

    except Exception as e:
        response = {"status": "error", "message": str(e)}
    finally:
        cursor.close()
        conn.close()
    return jsonify(response)

@app.route('/update', methods=["PUT"])
def update():
    

    try:
        # print(request.json)
        data = request.json
        table_id_col = get_item_ids(data['tableName'])
        conn = mysql.connector.connect(**config)
        cursor = conn.cursor()
        updateData = parse_dictionary(data['updateData'])

        print(f"UPDATE {data['tableName']} SET {updateData} WHERE {table_id_col} = {data['itemId']}")
        # Using parameterized query to update a specific item by its ID
        cursor.execute(f"UPDATE {data['tableName']} SET {updateData} WHERE {table_id_col} = {data['itemId']}")

        # Get timestamp value and adding it to the data
        tableName = data['tableName'] 
        changeDataDict = data['updateData']
        current_timestamp = datetime.now()
        formatted_timestamp = current_timestamp.strftime('%Y-%m-%d %H:%M:%S')
        changeDataDict['change_timestamp'] = formatted_timestamp

        # # Convert data into sql format and get new table name
        changeData = parse_dictionary(changeDataDict)
        tableName+="_changes"

        # Insert data into database
        print(f"INSERT INTO {tableName} SET {changeData}");
        cursor.execute(f"INSERT INTO {tableName} SET {changeData}")

        conn.commit()
        response = {"status": "success"}
    except Exception as e:
        response = {"status": "error", "message": str(e)}
    finally:
        cursor.close()
        conn.close()
    return jsonify(response)


@app.route('/delete', methods=['DELETE'])
def delete():
    try:
        print(request.json)
        data = request.json
        table_id_col = get_item_ids(data['tableName'])
        delete_id = data['deleteId']

        conn = mysql.connector.connect(**config)
        cursor = conn.cursor()


        print(f"DELETE FROM {data['tableName']} WHERE {table_id_col} = {data['deleteId']}")
        # Using parameterized query to update a specific item by its ID
        cursor.execute(f"DELETE FROM {data['tableName']} WHERE {table_id_col} = {data['deleteId']}")
        conn.commit()
        cursor.close()
        conn.close()
        response = {"status": "success"}
        #except Exception as e:
        #    response = {"status": "error", "message": str(e)}
        return jsonify(response)
    except Exception as e:
        conn.close()
        return jsonify({"status": "error", "message": str(e)})

def get_item_ids(table_name):
    # I moved it to the top because we don't need to redefine it every time
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

# TODO
# take an array of tables
# join all tables
# add a new column to list with [bottom level location, ..., top level locatoion]
#    * Locations are recursively related
@app.route('/get_table', methods=['GET'])
def get_table():
    table_name = request.args.get('table_name')
    
    if table_name is None:
        return jsonify({"status": "error", "message": "Table name and row ID are required."})

    conn = mysql.connector.connect(**config)
    cursor = conn.cursor()
    
    try:
        # Use a parameterized query to retrieve data from the specified table and row
        cursor.execute(f'SELECT * FROM {table_name}')
        rows = cursor.fetchall()
        conn.close()
        

        # Get column names from the cursor description
        column_names = [desc[0] for desc in cursor.description]

        # Convert rows to a list of dictionaries
        data = [dict(zip(column_names, row)) for row in rows]

        return jsonify({"status": "success", "data": data})
    except Exception as e:
        conn.close()
        return jsonify({"status": "error", "message": str(e)})
    
@app.route('/get_table_attributes', methods=['GET'])
def get_table_attributes():
    table_name = request.args.get('table_name')
    
    if table_name is None:
        return jsonify({"status": "error", "message": "Table name is required."})

    conn = mysql.connector.connect(**config)
    cursor = conn.cursor()
    try:
        # Use a parameterized query to retrieve data from the specified table
        cursor.execute(f'SHOW COLUMNS FROM {table_name}')
        columns = cursor.fetchall()


        column_names = [c[0] for c in columns]
        print(column_names)

        conn.close()
        
        # Convert the retrieved row to a dictionary for JSON response
        columns = [desc[0] for desc in cursor.description]

        return jsonify({"status": "success", "data": column_names})
    
    except Exception as e:
        conn.close()
        return jsonify({"status": "error", "message": str(e)})
    

def parse_dictionary(dictionary):
    key_value_pairs = [f"{key} = \"{value}\"" for key, value in dictionary.items()]
    result = ', '.join(key_value_pairs)
    return result
    

@app.route('/login', methods=["POST"])
def login():
    data = request.json
    enteredUsername = data['username']
    enteredPassword = data['password']
    conn = mysql.connector.connect(**config)
    cursor = conn.cursor()
    
    try:
        # Using parameterized query to update a specific item by its ID
        cursor.execute(f"SELECT Password FROM User_Authentication WHERE Username = '{enteredUsername}'")
        userPasswordHash = cursor.fetchone()[0];
        if (password_backend.verify_password(userPasswordHash, enteredPassword)):
            response = {"status": "success"}
            cursor.execute(f"UPDATE user_authentication SET UserIsLoggedIn=1 WHERE Username='{enteredUsername}'")

        else:
            response = {"status": "error", "message": "Incorrect password"}

    except Exception as e:
        response = {"status": "error", "message": str(e)}
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify(response)

@app.route('/logout', methods=["POST"])
def logout():
    data = get_logged_in_users().json['data'][0]

    conn = mysql.connector.connect(**config)
    cursor = conn.cursor()
    
    try:
        cursor.execute(f"UPDATE user_authentication SET UserIsLoggedIn=0 WHERE Username='{data['Username']}'")
        response = {"status": "success"}
    except Exception as e:
        response = {"status": "error", "message": str(e)}

    conn.commit()
    cursor.close()
    conn.close()
    return jsonify(response)

@app.route('/create_user', methods=["PUT"])
def create_user():
    data = request.json

    if data['original_password'] != data['confirm_password']:
        return jsonify({"status": "error", "message": "Passwords do not match"})
    
    conn = mysql.connector.connect(**config)
    cursor = conn.cursor()
    try:
        # Using parameterized query to update a specific item by its ID
        cursor.execute(f"SELECT Username FROM User_Authentication")
        currentUsernames = cursor.fetchall();
        for element in currentUsernames:
            if data['username'] in element:
                return jsonify({"status": "error", "message": "Username already exists"})

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})

    password_hash = password_backend.hash_password(data['original_password'])

    try:
        print(f"INSERT INTO User_Authentication SET Username = '{data['username']}', Password = '{password_hash}', EncryptionType = 'argon2id', PasswordExpirationDate = '2023-12-31', UserIsLoggedIn = 0, UserType = '{data['account_type']}'")
        cursor.execute(f"INSERT INTO User_Authentication SET Username = '{data['username']}', Password = '{password_hash}', EncryptionType = 'argon2id', PasswordExpirationDate = '2023-12-31', UserIsLoggedIn = 0, UserType = '{data['account_type']}'")
        response = {"status": "success"}

    except Exception as e:
        response = {"status": "error", "message": str(e)}

    conn.commit()
    cursor.close()
    conn.close()
    return jsonify(response)


@app.route('/get_table_data', methods=["PUT"])
def get_table_data():
    table_names = request.json['tableName']
    
    if table_names is None:
        return jsonify({"status": "error", "message": "Table name is required."})

    conn = mysql.connector.connect(**config)
    cursor = conn.cursor()
    
    try:
        # Use a parameterized query to retrieve data from the specified table and row
        data = []
        for table in table_names:
            cursor.execute(f"""WITH RECURSIVE Storage_Medium_Path AS (
            SELECT
                child_sm_id,
                parent_sm_id,
                CAST(parent_sm_id AS CHAR(200)) AS parent_ids
            FROM Storage_Medium_Location

            UNION ALL

            SELECT
                sml.child_sm_id,
                sml.parent_sm_id,
                CONCAT(smp.parent_ids, ',', sml.parent_sm_id)
            FROM Storage_Medium_Path smp
            JOIN Storage_Medium_Location sml ON smp.child_sm_id = sml.parent_sm_id
            )

            SELECT *
            FROM (
            SELECT
                c.*,
                cl.sm_id,
                smp.parent_ids,
                ROW_NUMBER() OVER (PARTITION BY c.{get_item_ids(table)} ORDER BY LENGTH(smp.parent_ids) DESC) AS rn
            FROM {table} c
            LEFT JOIN {table}_Location cl ON c.{get_item_ids(table)} = cl.{get_item_ids(table)}
            LEFT JOIN Storage_Medium_Path smp ON cl.sm_id = smp.child_sm_id
            ) AS ranked
            WHERE rn = 1""")

            rows = cursor.fetchall()
            # Get column names from the cursor description
            column_names = [desc[0] for desc in cursor.description]

            # Convert rows to a list of dictionaries
            data += [dict(zip(column_names, row)) for row in rows]

        for row in data:
            del row['rn']
            
        conn.close()

        return jsonify({"status": "success", "data": data})
    except Exception as e:
        conn.close()
        return jsonify({"status": "error", "message": str(e)})
    
@app.route('/get_logged_in_users', methods=['GET'])
def get_logged_in_users():
    conn = mysql.connector.connect(**config)
    cursor = conn.cursor()
    
    try:
        data = []
        # Use a parameterized query to retrieve data from the specified table and row
        cursor.execute(f'SELECT Username, UserType FROM user_authentication WHERE UserIsLoggedIn = 1;')
        users = cursor.fetchall()
        column_names = [desc[0] for desc in cursor.description]

        # Convert rows to a list of dictionaries
        data += [dict(zip(column_names, user)) for user in users]
        conn.close()
        return jsonify({"status": "success", "data": data})
    except Exception as e:
        conn.close()
        return jsonify({"status": "error", "message": str(e)})

@app.route('/get_items', methods=['GET'])
def get_items():
    table_name = request.args.get('table_name')
    if table_name is None:
        return jsonify({"status": "error", "message": "Table name is required."})
    try:
        conn = mysql.connector.connect(**config)
        cursor = conn.cursor()
        # Use a parameterized query to retrieve data from the specified table
        cursor.execute(f'SELECT name FROM {table_name}')
        items = cursor.fetchall()

        item_names = [item[0] for item in items]
        print(item_names)

        conn.close() 
        # Convert the retrieved row to a dictionary for JSON response
        return jsonify({"status": "success", "data": item_names})

    except Exception as e:
        conn.close()
        return jsonify({"status": "error", "message": str(e)})

@app.route('/get_changes', methods=['GET'])
def get_changes():
    table_name = request.args.get('table_name')
    item_name = request.args.get('item_name')
    query = request.args.get('query')
    if table_name is None or item_name is None or query is None:
        return jsonify({"status": "error", "message": "Table name and item name is required."})
    try:
        table_name += "_changes"
        conn = mysql.connector.connect(**config)
        cursor = conn.cursor()
        # Use a parameterized query to retrieve data from the specified table
        print(f"SELECT {query}, change_timestamp FROM {table_name} WHERE name='{item_name}'")
        cursor.execute(f"SELECT {query}, change_timestamp FROM {table_name} WHERE name='{item_name}'")
        items = cursor.fetchall()

        item_names = [item[0] for item in items]
        print(item_names)
        timestamps = [item[1].strftime('%Y-%m-%d %H:%M:%S') for item in items]
        #timestamps = [item[1] for item in items]

        data = [{'x': timestamp, 'y': item} for item, timestamp in zip(item_names, timestamps)]

        print(data)

        conn.close() 
        # Convert the retrieved row to a dictionary for JSON response
        return jsonify({"status": "success", "data": data})

    except Exception as e:
        conn.close()
        return jsonify({"status": "error", "message": str(e)})


if __name__ == '__main__':
    app.run(debug=True, port=BACKEND_PORT)