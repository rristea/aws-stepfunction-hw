# Hello World SAM Application with StepFunctions, Lambda and API Gateway

This is a simple Hello World project that makes use of StepFunction invoking a Lambda for returning a "Hello World!" message. The StepFunction is invoked by a separate Lambda function, which also waits for the StepFunction to finish in order to retrieve the output (this is done with `describeExecution` API call since StepFunction are invoked asynchronously). And all this is accessed through an API Gateway endpoint, which will simply return the "Hello World!" output.

The structure of the repo:
* functions - Code for the application's Lambda functions.
* statemachine - Definition for the state machine that returns the "Hello World!".
* template.yaml - A template that defines the application's AWS resources.