Google Sheets API Integration




Description

Welcome to our project! 🚀 This is a small Node.js application built to demonstrate integration with the Google Sheets and Google Drive APIs. It uses OAuth 2.0 for authentication and provides a simple API for uploading a local CSV file to Google Drive (automatically converting it into a Google Sheet) and fetching data from a Google Sheet.

With this app, you can securely authenticate with Google, upload CSV files, and fetch structured data from Sheets—all through clean and modular APIs.

Features

🔑 OAuth 2.0 Authentication – Securely authenticate with Google.

📂 CSV Upload – Upload a local data.csv file to Google Drive as a Google Sheet.

📊 Data Fetching – Retrieve and return data from your Google Sheet in JSON format.

🗂️ Modular Structure – Organized routes and controllers for maintainability.

⚠️ Error Handling – Clear error messages for missing environment variables or authentication failures.

Contributing

We welcome all contributions! Here are some ways to get started:

🐛 Report Bugs – If you find an issue, open an issue with details.

💻 Contribute Code – Developers can fork the repo and submit PRs with improvements.

💡 Suggestions – Have an idea? Open an issue with your proposed feature.

📖 Documentation – Help us improve setup instructions or add more examples.

Getting Started
Prerequisites

Node.js
 (LTS recommended)

npm (comes with Node.js)

A Google Cloud Project with Sheets API and Drive API enabled

Setup & Configuration

Google Cloud Setup

Go to Google Cloud Console → create a project.

Enable Google Sheets API and Google Drive API.

Create OAuth credentials (Web application).

Add redirect URI:

http://localhost:3000/oauth2callback


Copy your Client ID and Client Secret.

Environment Variables
Create a .env file in your project root:

GOOGLE_CLIENT_ID=YOUR_CLIENT_ID_HERE
GOOGLE_CLIENT_SECRET=YOUR_CLIENT_SECRET_HERE
REDIRECT_URI=http://localhost:3000/oauth2callback
SPREADSHEET_ID=


Dummy CSV File
Add a data.csv file in the root folder:

Name,City,Age
John Doe,New York,30
Jane Smith,San Francisco,25
Peter Jones,London,45

Installation & Running
# Install dependencies
npm install

# Start server
node index.js


Server will run on http://localhost:3000

API Endpoints

GET /auth – Start OAuth 2.0 authentication flow.

GET /oauth2callback – Handles Google’s redirect, saves access token.

GET /upload-csv – Uploads data.csv → creates Google Sheet → returns spreadsheet ID.

GET /fetch-data – Fetches data from the sheet set in .env (SPREADSHEET_ID).

GET /logout – Revokes token and logs user out.