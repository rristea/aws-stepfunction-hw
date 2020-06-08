const AWS = require('aws-sdk');
const stepfunctions = new AWS.StepFunctions();


exports.handler = async(event) => {
    // in function first start step function execution using startExecution()
    var params = {
        stateMachineArn: process.env.HELLOWORLD_STATEMACHINE_ARN,
        input: JSON.stringify({})
    };
    var response = await stepfunctions.startExecution(params).promise().then((result) => {

        var paramsStatus = {
            executionArn: result.executionArn
        };

        var finalResponse = new Promise(function(resolve, reject) {
            var checkStatusOfStepFunction = setInterval(function() {
                //on regular interval keep checking status of step function
                stepfunctions.describeExecution(paramsStatus, function(err, data) {
                    if (err) {
                        clearInterval(checkStatusOfStepFunction);
                        reject(err);
                    }
                    else {
                        if (data.status !== 'RUNNING') {
                            // once we get status is not running means step function execution is now finished and we get result as data.output
                            clearInterval(checkStatusOfStepFunction);

                            resolve(data.output);
                        }

                    }
                });
            }, 200);
        });

        return finalResponse;
    });

    return JSON.parse(response);
};
