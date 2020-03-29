import requests
import json

def put():
    headers = {
        "Content-Type": 'application/json'
    }

    data ={"first_name": "Charles5",
    "last_name":"Charles5",
    "contacted":True,
    "notes":"test again UPDATE DD"}

    data = json.dumps(data)
    response = requests.put("http://127.0.0.1:8000/api/v1/leads/charlesdsmith25@gmail.com/", headers=headers, data=data)
    print(response.text)
    return response

def delete():
    headers = {
        "Content-Type": 'application/json'
    }

    response = requests.delete("http://127.0.0.1:8000/api/v1/leads/charles5@hotmail.com/", headers=headers)
    print(response.text)
    return response
delete()