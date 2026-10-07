#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib/core'
import { DmsStack } from './stack.js'

const app = new cdk.App()

new DmsStack(app, 'DmsStack', {
    env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION,
    },
})
