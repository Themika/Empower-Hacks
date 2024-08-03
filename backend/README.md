# Financial App Backend

This is the backend component of the Financial App. It provides the necessary APIs and functionality to support the frontend application.

## Prerequisites

Before setting up and using this app, make sure you have the following prerequisites installed:

- Node.js (version 1.0.0 or higher)
- MongoDB (version 1.0.0 or higher)

## Installation

1. Clone this repository to your local machine.
2. Navigate to the `backend` directory.
3. Run `npm install` to install the required dependencies.

## Configuration

1. Create a `.env` file in the root directory of the backend.
2. Add the following environment variables to the `.env` file:

```
DB_CONNECTION=<your_mongodb_connection_string>
"https://rapidapi.com/NextAPI/api/cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api/playground/apiendpoint_011e20f4-5ffd-411e-a8fb-4703567953d3" go to this link to get API_KEY
API_KEY=<key>
```

## Usage

1. Start the MongoDB server.
2. Run `npm start` to start the backend server.
3. The backend server will be running on `http://localhost:3000`.
4. Swicth the port number to 4000


## Some features require other libraries as json server
1. run the command json-server --watch data/info.json --port 5000

## No public working version but following these steps will ensure the app works locally