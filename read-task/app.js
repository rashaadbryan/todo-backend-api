const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

let response;

let searchParams = {
    TableName: "TaskTable"
};


exports.lambdaHandler = async (event, context) => {
    try {

        searchParams.Key = {id: event.pathParameters.id};

        const task = await docClient.get(searchParams).promise();
        
        if (Object.entries(task).length === 0) {
            return response = {
                'statusCode': 404,
                'body': JSON.stringify({
                    message: 'Sorry, that task does not exist',
                })
            }
        } else {
            return response = {
                'statusCode': 200,
                'body': JSON.stringify(task.Item)
            }
        }
    } catch (err) {
        console.log(err);
        response = {
            'statusCode': 500,
            'body': JSON.stringify({
                message: 'Sorry, service is down'
            })
        }
    }
    return response
};


