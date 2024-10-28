# trr_webserver

## Prerequisites
* Python (3.10+)
* NodeJS

## Initial Install
To the create the python virtual environment to run the flask backend, run:
```
cd backend
python -m venv venv

# For Linux
source venv/bin/activate

# For Windows
.\venv\Scripts\activate

pip install -r requirements.txt
```

To setup the frontend development environment, run:
```
cd frontend

npm install
```

## Running the Development Servers
### Backend Dev Server:
```
cd backend

# For Linux
source venv/bin/activate

# For Windows
.\venv\Scripts\activate

flask --app app run --debug
```
The IP address listed is the address of the backend

### Frontend Dev Server:
```
cd frontend

npm run dev
```
The IP address listed is the address of the frontend

### Launching ROSBridge Server:
```
ros2 launch rosbridge_server rosbridge_websocket_launch.xml
```