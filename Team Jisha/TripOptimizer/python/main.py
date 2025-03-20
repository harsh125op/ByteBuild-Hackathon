import json
import os
from fastapi import FastAPI
from requests import post
from fastapi.middleware.cors import CORSMiddleware
import uvicorn


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins="*"
)


def get_destinations():
    with open(os.getcwd() + '/python/destinations.json') as file:
        content = file.read()
        print(content)
        destinations = json.loads(content)
    print(destinations)
    return destinations


@app.get(path = '/get_iternary/{destination}')
def get_iternary(destination: str): 
    return get_destinations()[destination]
    # res = post(url='https://www.tripadvisor.in/data/graphql/ids',
    #      headers={
    #          'accept': '*/*',
    #       'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
    #       'content-type': 'application/json',
    #       'Access-Control-Allow-Origin': '*'
    #      },
    #      data="[{\"variables\":{\"geoId\":297683,\"geoIdLong\":297683,\"includeGeoData\":true,\"languageTag\":\"en-IN\",\"pageName\":\"Tourism\",\"localTime\":\"2025-03-19T14:28:04.325Z\",\"limit\":1000,\"locale\":\"en-IN\"},\"extensions\":{\"preRegisteredQueryId\":\"78d271947db146c0\"}},{\"variables\":{\"params\":{\"entryId\":\"3yVrY8Gwfon4tqdXVWa0Ta\"}},\"extensions\":{\"preRegisteredQueryId\":\"9a0160c61a94a951\"}},{\"variables\":{\"params\":{\"entryId\":\"2HGWS8qwQmTcVO43IOBHwW\"}},\"extensions\":{\"preRegisteredQueryId\":\"9a0160c61a94a951\"}},{\"variables\":{\"params\":{\"entryId\":\"4myqUWE1pOpCtQMRcokAEK\"}},\"extensions\":{\"preRegisteredQueryId\":\"9a0160c61a94a951\"}},{\"variables\":{\"params\":{\"entryId\":\"5bmS7cQBbydWO6fZTg3pt2\"}},\"extensions\":{\"preRegisteredQueryId\":\"9a0160c61a94a951\"}},{\"variables\":{\"params\":{\"entryId\":\"7lYX5AXCMY8cvFJaA4lw17\"}},\"extensions\":{\"preRegisteredQueryId\":\"9a0160c61a94a951\"}},{\"variables\":{\"params\":{\"entryId\":\"7KvSrX86836XuabRZ1DZXk\"}},\"extensions\":{\"preRegisteredQueryId\":\"9a0160c61a94a951\"}},{\"variables\":{\"request\":[{\"collectionId\":\"3yVrY8Gwfon4tqdXVWa0Ta\"},{\"collectionId\":\"2HGWS8qwQmTcVO43IOBHwW\"},{\"collectionId\":\"4myqUWE1pOpCtQMRcokAEK\"},{\"collectionId\":\"5bmS7cQBbydWO6fZTg3pt2\"},{\"collectionId\":\"7lYX5AXCMY8cvFJaA4lw17\"},{\"collectionId\":\"7KvSrX86836XuabRZ1DZXk\"}]},\"extensions\":{\"preRegisteredQueryId\":\"a1ebd99f2f6b0832\"}},{\"variables\":{\"locationIds\":[11852959,7912152,10049090,319695,317329,19774919,19412106,321262,1595132,3705651]},\"extensions\":{\"preRegisteredQueryId\":\"6772f1c147551462\"}},{\"variables\":{\"detailId\":0,\"geoId\":297683},\"extensions\":{\"preRegisteredQueryId\":\"e3fca2feb0f0fdf1\"}},{\"variables\":{\"request\":[{\"numberOfContents\":12,\"randomContentWithGeoInput\":{\"locationIds\":[297683,12396672,28963],\"pageType\":\"TOURISM\",\"pageContentId\":\"297683\"}}]},\"extensions\":{\"preRegisteredQueryId\":\"343a07f958a70310\"}}]"
    #     #  data="[{\"variables\":{\"geoId\":297684,\"geoIdLong\":297683,\"includeGeoData\":true,\"languageTag\":\"en-IN\",\"pageName\":\"Tourism\",\"localTime\":\"2025-03-19T14:28:04.325Z\",\"limit\":10,\"locale\":\"en-IN\"},\"extensions\":{\"preRegisteredQueryId\":\"78d271947db146c0\"}}]"
    #      )
    
    # return res.json()


@app.get(path = '/get_cities')
def get_cities():
    return get_destinations().keys()
    