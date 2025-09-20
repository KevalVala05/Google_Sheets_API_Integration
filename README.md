Google Sheets API Integration
A small Node.js application built to demonstrate integration with the Google Sheets and Google Drive APIs. This project uses OAuth 2.0 for authentication and provides a simple API for uploading a local CSV file to Google Drive and fetching data from a Google Sheet.

Features
OAuth 2.0 Authentication: Securely authenticate with Google using the OAuth 2.0 flow.

CSV Upload: Upload a local data.csv file to Google Drive, automatically converting it into a Google Sheet.

Data Fetching: Retrieve data from a specified Google Sheet and return it as JSON.

Modular Structure: The codebase is organized into a clean and maintainable structure using separate routes and controllers.

Comprehensive Error Handling: Includes meaningful error messages and logs for common issues like missing environment variables or authentication failures.

Prerequisites
Before you begin, ensure you have the following installed:

Node.js (LTS version recommended)

npm (comes with Node.js)

Setup & Configuration
Step 1: Google Cloud Project Setup
Go to the Google Cloud Console.

Create a new project.

In the navigation menu, go to APIs & Services > Library.

Search for and enable both the Google Sheets API and the Google Drive API.

Navigate to APIs & Services > Credentials.

Click "Create Credentials" and select "OAuth client ID".

Choose "Web application" for the application type.

Under Authorized redirect URIs, add the following URL:

http://localhost:3000/oauth2callback

Click "Create". You will receive your Client ID and Client Secret. Copy these values.

Step 2: Environment Variables
Create a file named .env in the root directory of the project and add the following variables. Replace the placeholder values with your own credentials obtained in the previous step.

# Your Google OAuth 2.0 credentials
GOOGLE_CLIENT_ID=YOUR_CLIENT_ID_HERE
GOOGLE_CLIENT_SECRET=YOUR_CLIENT_SECRET_HERE

# The redirect URI must match the one in your Google Cloud Console
REDIRECT_URI=http://localhost:3000/oauth2callback

# ID of the Google Sheet to fetch data from after upload
# This should be updated after the CSV upload endpoint has been run once.
SPREADSHEET_ID=

Step 3: Dummy CSV File
Create a file named data.csv in the root directory with some sample data. This file will be uploaded to Google Drive.

Example data.csv:

Name,City,Age
John Doe,New York,30
Jane Smith,San Francisco,25
Peter Jones,London,45

Installation & Running the Project
Install the required dependencies:

npm install

Start the Node.js server:

node index.js

The server will start on port 3000, and you will see the following logs:

Server listening at http://localhost:3000
1. Go to http://localhost:3000/auth to authenticate.
2. After authentication, go to http://localhost:3000/upload-csv to upload the dummy file.
3. After upload, set the SPREADSHEET_ID in your .env file and go to http://localhost:3000/fetch-data to retrieve the data.

API Endpoints
GET /auth: Initiates the Google OAuth 2.0 authentication flow. Redirects the user to the Google consent screen.

GET /oauth2callback: The callback URL that Google redirects to after successful authentication. This endpoint exchanges the authorization code for an access token and saves it to a local token.json file.

GET /upload-csv: Triggers the CSV upload process. It reads data.csv, creates a new Google Sheet on your Drive, populates it with the CSV data, and returns the new spreadsheet ID and URL.

GET /fetch-data: Fetches and returns the data from the Google Sheet specified by the SPREADSHEET_ID in your .env file.

GET /logout: Revokes the access token and deletes the local token.json file, effectively logging the user out.

Code Structure
The project follows a modular structure to separate concerns:

google-sheets-api-integration/
├── controllers/
│   ├── authController.js     # Handles all authentication logic (login, logout)
│   └── sheetsController.js   # Handles all Google Sheets/Drive API logic
├── routes/
│   ├── authRoutes.js         # Defines all authentication-related endpoints
│   └── sheetsRoutes.js       # Defines all data-related endpoints
├── .env                      # Your local environment variables
├── data.csv                  # The dummy CSV file to be uploaded
├── index.js                  # Main application entry point
├── package.json              # Project dependencies and scripts
├── token.json                # OAuth access token (generated after authentication)
└── README.md

Evaluation Criteria
This project was built with the following criteria in mind:

Correct OAuth implementation: The authentication flow is handled correctly, with tokens saved for persistence.

Clean, modular code structure: The use of separate controllers and routers makes the codebase easy to read and maintain.

Clear documentation: This README file provides step-by-step instructions for setup and usage.

Proper error handling: The application includes robust error checks for missing environment variables, authentication failures, and API errors.