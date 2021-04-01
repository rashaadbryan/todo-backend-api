const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

let response;

let params = {
    TableName: "TaskTable",
    ConditionExpression: "attribute_exists(id)"
};

exports.lambdaHandler = async (event, context) => {
    try {
        params.Key = {id: event.pathParameters.id};

        await docClient.delete(params).promise();

        response = {
            'statusCode': 204
        }
    } catch (err) {
        console.log(err);

        if (err.hasOwnProperty('statusCode') && err.statusCode == 400) {
            response = {
                'statusCode': 404,
                'body': JSON.stringify({
                    message: 'Sorry, task not found'
                })
            }
        } else {
            response = {
                'statusCode': 500,
                'body': JSON.stringify({
                    message: 'Sorry, service is down'
                })
            }
        }
    }
    return response
};


