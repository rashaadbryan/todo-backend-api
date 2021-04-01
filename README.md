# Todo RESTful API

A simple RESTful API for tasks built using Amazon Web Services (AWS)

## AWS Technologies & Languages 

- NodeJS
- AWS API Gateway (HttpApi)
- AWS Lambda
- AWS DynamoDB
- AWS X-Ray Tracing
- AWS Severless Application Model (SAM)

## Requirements

- AWS CLI
- SAM CLI
- Docker

## API Endpoints 

- /task (POST)
    - Create a new task by sending a POST request with a JSON object containing the title.
    - E.g. {"title": "Buy bread"}
    - On success a task json object will be in the response.
- /task (GET)
    - Get all tasks in the database by sending a GET request.
- /task/{id} (GET)
    - Get a task by its id by sending a GET request with a specified id.
    - E.g. /task/722eb430-92c8-11eb-8f75-9b9c3568cfab
- /task/{id} (PUT)
    - Update a task by its id by sending a PUT request with a specified id a JSON object containing updated completed value.
    - E.g. Send {"completed": true} to /task/722eb430-92c8-11eb-8f75-9b9c3568cfab
- /task/{id} (Delete)
    - Delete a task by sending a DELETE request with a specified id.
    - E.g. /task/722eb430-92c8-11eb-8f75-9b9c3568cfab

## AWS Deployment

- At the route of the directory run the comment `sam deploy --guided`.
- Follow the instuctions provided by SAM CLI.

## Running Project Locally

- At the route of the directory run the comment `sam local start-api`.
- The lambda functions will be mounted at 127.0.0.1 (localhost).
- E.g. Mounting CreateTaskFunction at http://127.0.0.1:3000/task [POST]
- In order for the lambda functions to query the database the database it must be created on AWS. See the AWS Deploymeny section for instructions.


