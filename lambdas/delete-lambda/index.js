const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });

exports.handler = (event, context, callback) => {
  let params = {
    TableName: 'SecretEncrypt',
    Key: {
      uuid: event.uuid,
    },
    ReturnValues: 'ALL_OLD',
  };

  docClient.delete(params, function(err, data) {
    if (err) {
      callback(err, null);
    } else {
      if (data.Attributes) {
        callback(null, { message: 'Successful deletion.' });
      } else {
        callback(null, {
          errorMessage: 'Secret not found or has already been seen.',
        });
      }
    }
  });
};
