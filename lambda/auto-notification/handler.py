import json
import requests
import os

WEBHOOK_URL = os.environ['WEBHOOK_URL']

def run(event, context):
    print (event)
    body = json.loads(event['body'])

    repository = body['repository']
    sender = body['sender']
    commits = []
    if 'commits' in body:
        commits = body['commits']

    repo = repository['name']
    username = sender['login']

    sendToTeam(repo, username, commits)

    response = {
        "statusCode": 200,
        "body": '{ message: "Processed!"}'
    }

    return response

    # Use this code if you don't use the http event with the LAMBDA-PROXY
    # integration
    """
    return {
        "message": "Go Serverless v1.0! Your function executed successfully!",
        "event": event
    }
    """

def sendToTeam(repo, username, commits):
    text = str(len(commits)) + " new commit(s) pushed to " + repo + " from " + username
    obj = {"text": text}
    response = requests.post(
        url = WEBHOOK_URL, json = obj,
        headers={'Content-Type': 'application/json'}
    )
    print (response.text)
