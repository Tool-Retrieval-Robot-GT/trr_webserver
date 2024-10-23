# trr_webserver

## Initial Install
To the create the python virtual environment to run the flask backend, run:
```
cd backend
python -m venv venv

# For linux
source venv/bin/activate

# For windows
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

# For linux
source venv/bin/activate

# For windows
.\venv\Scripts\activate

flask --app server.py run
```
The IP address listed is the address of the backend

### Frontend Dev Server:
```
cd frontend

npm run dev
```
The IP address listed is the address of the frontend