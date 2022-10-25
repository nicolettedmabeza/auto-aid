import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "service_project.settings")
django.setup()

# Import models from service_rest, here.
from service_rest.models import AutomobileVO


def get_autos():
    response = requests.get("http://inventory-api:8000/api/automobiles/")
    print(response)
    content = json.loads(response.content)
    for auto in content['autos']:
        AutomobileVO.objects.update_or_create(
            vin=auto["vin"],
            # defaults={
            #     "color": auto["color"],
            #     "year": auto["year"]
            # }
        )


def poll():
    while True:
        print('Service poller polling for data')
        try:
            get_autos()
            print("getting autos")

        except Exception as e:
            print("fail")
            print(e, file=sys.stderr)
        time.sleep(60)


if __name__ == "__main__":
    poll()
