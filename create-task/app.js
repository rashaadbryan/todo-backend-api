const AWS = require('aws-sdk');
const uuid = require('uuid');
const docClient = new AWS.DynamoDB.DocumentClient();

let response;

let currentDate = new Date();

let params = {
    TableName: "TaskTable"
};

function isJSON(data) {
    try {
        JSON.parse(data);
    } catch (e) {
        console.log(e);
        return false;
    }
    return true;
}


exports.lambdaHandler = async (event, context) => {
    try {
        if (event.body == null || event.body == undefined) {
            return response = {
                'statusCode': 400,
                'body': JSON.stringify({
                    message: 'No data sent'
                })
            };
        }

        if (isJSON(event.body) == false) {
            return response = {
                'statusCode': 400,
                'body': JSON.stringify({
                    message: 'Invalid task object'
                })
            };
        }

        let newTask = JSON.parse(event.body);

        if(!newTask.hasOwnProperty('title') || Object.keys(newTask).length != 1){
            return response = {
                'statusCode': 400,
                'body': JSON.stringify({
                    message: 'Invalid data sent'
                })
            };
        }

        newTask.id = uuid.v1();
        newTask.completed = false;
        newTask.creation_date = currentDate.toISOString();
        newTask.updated_at = currentDate.toISOString();
        params.Item = newTask;

        await docClient.put(params).promise();

        response = {
            'statusCode': 201,
            'body': JSON.stringify(newTask)
        };

    } catch (err) {
        console.log(err);
        response = {
            'statusCode': 500,
            'body': JSON.stringify({
                message: 'Sorry, service is down'
            })
        };
    }

    return response
};


