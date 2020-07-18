# Building real-time applications with React, GraphQL & AWS AppSync

In this workshop we'll learn how to build cloud-enabled web applications with React, [AppSync](https://aws.amazon.com/appsync/), GraphQL, & [AWS Amplify](https://aws-amplify.github.io/).


## Getting Started - Creating the React Application

To get started, we first need to create a new React project using the [Create React App CLI](https://github.com/facebook/create-react-app).

```bash
$ npx create-react-app my-amplify-app
```

Now change into the new app directory & install the AWS Amplify, AWS Amplify React, & uuid libraries:

```bash
$ cd my-amplify-app
$ npm install --save aws-amplify aws-amplify-react uuid
# or
$ yarn add aws-amplify aws-amplify-react uuid
```

## Installing the CLI & Initializing a new AWS Amplify Project

### Installing the CLI

Next, we'll install the AWS Amplify CLI:

```bash
$ npm install -g @aws-amplify/cli
```

Now we need to configure the CLI with our credentials:

```sh
$ amplify configure
```

> If you'd like to see a video walkthrough of this configuration process, click [here](https://www.youtube.com/watch?v=fWbM5DLh25U).

Here we'll walk through the `amplify configure` setup. Once you've signed in to the AWS console, continue:
- Specify the AWS Region: __us-east-1 || us-west-2 || eu-central-1__
- Specify the username of the new IAM user: __amplify-workshop-user__
> In the AWS Console, click __Next: Permissions__, __Next: Tags__, __Next: Review__, & __Create User__ to create the new IAM user. Then, return to the command line & press Enter.
- Enter the access key of the newly created user:   
? accessKeyId: __(<YOUR_ACCESS_KEY_ID>)__   
? secretAccessKey:  __(<YOUR_SECRET_ACCESS_KEY>)__
- Profile Name: __amplify-workshop-user__

### Initializing A New Project

```bash
$ amplify init
```

- Enter a name for the project: __amplifyreactapp__
- Enter a name for the environment: __dev__
- Choose your default editor: __Visual Studio Code (or your default editor)__   
- Please choose the type of app that you're building __javascript__   
- What javascript framework are you using __react__   
- Source Directory Path: __src__   
- Distribution Directory Path: __build__   
- Build Command: __npm run-script build__   
- Start Command: __npm run-script start__   
- Do you want to use an AWS profile? __Y__
- Please choose the profile you want to use: __amplify-workshop-user__

Now, the AWS Amplify CLI has iniatilized a new project & you will see a new folder: __amplify__ & a new file called `aws-exports.js` in the __src__ directory. These files hold your project configuration.

To view the status of the amplify project at any time, you can run the Amplify `status` command:

```sh
$ amplify status
```

### Configuring the React applicaion

Now, our resources are created & we can start using them!

The first thing we need to do is to configure our React application to be aware of our new AWS Amplify project. We can do this by referencing the auto-generated `aws-exports.js` file that is now in our src folder.

To configure the app, open __src/index.js__ and add the following code below the last import:

```js
import Amplify from 'aws-amplify'
import config from './aws-exports'
Amplify.configure(config)
```

Now, our app is ready to start using our AWS services.

## Adding a GraphQL API

To add a GraphQL API, we can use the following command:

```sh
$ amplify add api

? Please select from one of the above mentioned services: GraphQL
? Provide API name: ConferenceAPI
? Choose an authorization type for the API: API key
? Enter a description for the API key: <some description>
? After how many days from now the API key should expire (1-365): 365
? Do you want to configure advanced settings for the GraphQL API: No
? Do you have an annotated GraphQL schema? N 
? Do you want a guided schema creation? Y
? What best describes your project: Single object with fields
? Do you want to edit the schema now? (Y/n) Y
```

> When prompted, update the schema to the following:   

```graphql
# amplify/backend/api/ConferenceAPI/schema.graphql

type Message @model {
  id: ID!
  username: String
  userId: ID
  message: String
}
```

## Local mocking and testing

To mock and test the API locally, you can run the `mock` command:

```sh
$ amplify mock api

? Choose the code generation language target: javascript
? Enter the file name pattern of graphql queries, mutations and subscriptions: src/graphql/**/*.js
? Do you want to generate/update all possible GraphQL operations - queries, mutations and subscriptions: Y
? Enter maximum statement depth [increase from default if your schema is deeply nested]: 2
```

This should start an AppSync Mock endpoint:

```sh
AppSync Mock endpoint is running at http://10.219.99.136:20002
```

Open the endpoint in the browser to use the GraphiQL Editor.

From here, we can now test the API.

### Performing mutations from within the local testing environment

Execute the following mutation to create a new message in the API:

 To do so, we'll refactor our initial state in order to also hold our form fields and add an event handler.

 We'll also be using the `API` class from amplify again, but now will be passing a second argument to `graphqlOperation` in order to pass in variables: `API.graphql(graphqlOperation(CreateMessage, { input: message }))`.

 We also have state to work with the form inputs, for `message`, `username` and `userId`.

```js
// src/App.js
import React from 'react';

import { API, graphqlOperation } from 'aws-amplify'

import { listMessages as ListTalks } from './graphql/queries'
// import the mutation
import { createMessage as CreateMessage } from './graphql/mutations'

