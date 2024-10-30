import base64
import json
import sqlite3

db  = sqlite3.connect("trr_robot.db", check_same_thread=False)

cursor = db.cursor()

cursor.execute('''CREATE TABLE IF NOT EXISTS tools
             (name text, size text, available text, image BLOB)''')

db.commit()

def insert_tool(name: str, size: str, availability: str, image):
    cursor = db.cursor()
    cursor.execute('''INSERT INTO tools (name, size, available, image) VALUES (?, ?, ?, ?)''', (name, size, availability, image))
    db.commit()

def remove_tool(name: str, size: str):
    cursor = db.cursor()
    cursor.execute('''DELETE FROM tools WHERE name = ? AND size = ?''', (name, size))
    db.commit

def get_tools():
    cursor = db.cursor()
    cursor.execute('''SELECT * FROM tools''')
    rows = cursor.fetchall()
    column_names = [description[0] for description in cursor.description]
    tools = [dict(zip(column_names, row)) for row in rows]
    for tool in tools:
        tool["image"] = base64.b64encode(tool["image"]).decode('utf-8')

    return json.dumps(tools)