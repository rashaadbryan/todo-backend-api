const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

let response;

let currentDate = new Date();

let params = {
    TableName: "TaskTable",
    ConditionExpression: "attribute_exists(id)"
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
                    message: 'Invalid json object'
                })
            };
        }

        let taskUpdate = JSON.parse(event.body);

        if(!taskUpdate.hasOwnProperty('completed') || Object.keys(taskUpdate).length != 1 || typeof taskUpdate.completed !== "boolean"){
            return response = {
                'statusCode': 400,
                'body': JSON.stringify({
                    message: 'Invalid data sent'
                })
            };
        }
    
        params.Key = {id: event.pathParameters.id};
        params.UpdateExpression = "set completed = :completedValue, updated_at = :updatedValue";
        params.ExpressionAttributeValues = {
            ":completedValue": taskUpdate.completed,
            ":updatedValue": new Date().toISOString()
        };

        await docClient.update(params).promise();

        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: 'Task updated'
            })
        };

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


