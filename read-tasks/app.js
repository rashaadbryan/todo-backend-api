const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

let response;

const searchParams = {
    TableName: "TaskTable"
};

exports.lambdaHandler = async (event, context) => {
    try {
        const tasks = await docClient.scan(searchParams).promise();
        
        if (Object.entries(tasks["Items"]).length === 0) {
            response = {
                'statusCode': 404,
                'body': JSON.stringify({
                    message: 'Sorry, no tasks have been found',
                })
            }
        } else {
            response = {
                'statusCode': 200,
                'body': JSON.stringify(tasks.Items)
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


