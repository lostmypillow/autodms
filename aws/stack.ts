import * as cdk from 'aws-cdk-lib/core'
import { Construct } from 'constructs'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as lambdaNode from 'aws-cdk-lib/aws-lambda-nodejs'
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb'
import path from 'node:path'

export class DmsStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props)

        const table = new dynamodb.Table(this, 'DmsTable', {
            tableName: 'dms-urls',
            partitionKey: {
                name: 'PK',
                type: dynamodb.AttributeType.STRING,
            },
            sortKey: {
                name: 'SK',
                type: dynamodb.AttributeType.STRING,
            },
            billingMode: dynamodb.BillingMode.PROVISIONED,
            readCapacity: 1,
            writeCapacity: 1,
            removalPolicy: cdk.RemovalPolicy.DESTROY, // Change to RETAIN for production
        })

        const addLambda = new lambdaNode.NodejsFunction(this, 'dms-add', {
            entry: path.join(import.meta.dirname, '../src', 'add.ts'),
            handler: 'handler',
            bundling: {
                minify: true,
                sourceMap: false,
            },
            runtime: lambda.Runtime.NODEJS_24_X,
            architecture: lambda.Architecture.ARM_64,
            memorySize: 128,
            timeout: cdk.Duration.seconds(10),
            environment: {
                TABLE_NAME: table.tableName,
            },
        })

        addLambda.addFunctionUrl({
            authType: lambda.FunctionUrlAuthType.NONE,
            cors: {
                allowedOrigins: [
                    'https://dms.lostmypillow.com',
                    'http://localhost:5173',
                    'https://lostmypillow.github.io',
                ],
                allowedMethods: [lambda.HttpMethod.POST],
                allowedHeaders: ['Content-Type', 'Authorization'],
                allowCredentials: true,
                maxAge: cdk.Duration.hours(1),
            },
        })

        const updateLambda = new lambdaNode.NodejsFunction(this, 'dms-update', {
            entry: path.join(import.meta.dirname, '../src', 'update.ts'),
            handler: 'handler',
            bundling: {
                minify: true,
                sourceMap: false,
            },
            runtime: lambda.Runtime.NODEJS_24_X,
            architecture: lambda.Architecture.ARM_64,
            memorySize: 128,
            timeout: cdk.Duration.seconds(10),
            environment: {
                TABLE_NAME: table.tableName,
            },
        })

        updateLambda.addFunctionUrl({
            authType: lambda.FunctionUrlAuthType.NONE,
            cors: {
                allowedOrigins: [
                    'https://dms.lostmypillow.com',
                    'http://localhost:5173',
                    'https://lostmypillow.github.io',
                ],
                allowedMethods: [lambda.HttpMethod.PATCH],
                allowedHeaders: ['Content-Type', 'Authorization'],
                allowCredentials: true,
                maxAge: cdk.Duration.hours(1),
            },
        })

        const deleteLambda = new lambdaNode.NodejsFunction(this, 'dms-delete', {
            entry: path.join(import.meta.dirname, '../src', 'delete.ts'),
            handler: 'handler',
            bundling: {
                minify: true,
                sourceMap: false,
            },
            runtime: lambda.Runtime.NODEJS_24_X,
            architecture: lambda.Architecture.ARM_64,
            memorySize: 128,
            timeout: cdk.Duration.seconds(10),
            environment: {
                TABLE_NAME: table.tableName,
            },
        })

        deleteLambda.addFunctionUrl({
            authType: lambda.FunctionUrlAuthType.NONE,
            cors: {
                allowedOrigins: [
                    'https://dms.lostmypillow.com',
                    'http://localhost:5173',
                    'https://lostmypillow.github.io',
                ],
                allowedMethods: [lambda.HttpMethod.DELETE],
                allowedHeaders: ['Content-Type', 'Authorization'],
                allowCredentials: true,
                maxAge: cdk.Duration.hours(1),
            },
        })

        const readLambda = new lambdaNode.NodejsFunction(this, 'dms-read', {
            entry: path.join(import.meta.dirname, '../src', 'read.ts'),
            handler: 'handler',
            bundling: {
                minify: true,
                sourceMap: false,
            },
            runtime: lambda.Runtime.NODEJS_24_X,
            architecture: lambda.Architecture.ARM_64,
            memorySize: 128,
            timeout: cdk.Duration.seconds(10),
            environment: {
                TABLE_NAME: table.tableName,
            },
        })

        readLambda.addFunctionUrl({
            authType: lambda.FunctionUrlAuthType.NONE,
            cors: {
                allowedOrigins: [
                    'https://dms.lostmypillow.com',
                    'http://localhost:5173',
                    'https://lostmypillow.github.io',
                ],
                allowedMethods: [lambda.HttpMethod.GET],
                allowedHeaders: ['Content-Type', 'Authorization'],
                allowCredentials: true,
                maxAge: cdk.Duration.hours(1),
            },
        })
    }
}
