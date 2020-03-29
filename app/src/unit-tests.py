import unittest
import requests
import json

class Tests(unittest.TestCase):

    def test_get_all(self):
        # http://127.0.0.1:8000/api/v1/leads/

        headers = {
            "Content-Type": 'application/json'
        }

        response = requests.get("http://127.0.0.1:8000/api/v1/leads/", headers=headers)
        self.assertEqual(response.status_code, 200)

    def test_post_lead(self):
        headers = {
        "Content-Type": 'application/json'
        }

        data ={"first_name": "Jane",
        "last_name":"Doe",
        "contacted":"Yes they were but they're in quarantine",
        "notes":"test",
        "email": "testemail9@gmail.com"}

        data = json.dumps(data)
        response = requests.post("http://127.0.0.1:8000/api/v1/leads/", headers=headers, data=data)
        self.assertEqual(response.status_code, 201)

    def test_update_lead(self):
        headers = {
        "Content-Type": 'application/json'
        }

        data ={"first_name": "Jane",
        "last_name":"Doe",
        "contacted":"Yes they were but they're in quarantine",
        "notes":"test"
        }

        data = json.dumps(data)
        response = requests.put("http://127.0.0.1:8000/api/v1/leads/charlesdsmith2777@gmail.com/", headers=headers, data=data)
        self.assertEqual(response.status_code, 200)

    def test_delete_lead(self):
        headers = {
        "Content-Type": 'application/json'
        }

        response = requests.delete("http://127.0.0.1:8000/api/v1/leads/testemail6@gmail.com/", headers=headers)
        self.assertEqual(response.status_code, 200)

if __name__ == '__main__':
    unittest.main()