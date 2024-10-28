import sqlite3
import os

def convert_to_binary_data(filename):
    with open(os.path.join(os.path.dirname(os.path.abspath(__file__)), filename), 'rb') as file:
        binary_data = file.read()
    return binary_data

db  = sqlite3.connect("trr_robot.db")

cursor = db.cursor()

cursor.execute('''CREATE TABLE IF NOT EXISTS tools
             (name text, size text, available text, image BLOB)''')

tool_name = 'Hammer'
tool_size = 'Medium'
tool_available = 'Yes'
image_path = "./hammer.jpg"

image_data = convert_to_binary_data(image_path)

# Insert a new record into the tools table
cursor.execute('''INSERT INTO tools (name, size, available, image) VALUES (?, ?, ?, ?)''',
               (tool_name, tool_size, tool_available, image_data))

db.commit()