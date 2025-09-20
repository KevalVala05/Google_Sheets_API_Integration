# 📊 Google Sheets API Integration

A Node.js application demonstrating seamless integration with Google Sheets and Google Drive APIs using OAuth 2.0 authentication.

## 📋 Description

This project showcases how to build a secure API that interacts with Google services. It enables you to upload CSV files to Google Drive (automatically converting them to Google Sheets) and fetch data from existing sheets—all through clean, RESTful endpoints.

## ✨ Features

- **🔐 OAuth 2.0 Authentication** - Secure Google authentication flow
- **📤 CSV Upload** - Convert local CSV files to Google Sheets automatically
- **📥 Data Fetching** - Retrieve sheet data in JSON format
- **🏗️ Modular Architecture** - Clean separation of routes and controllers
- **🛡️ Robust Error Handling** - Comprehensive error messages and validation

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v14+ recommended)
- **npm** or **yarn**
- **Google Cloud Project** with enabled APIs

### 🔧 Setup Instructions

#### 1. Google Cloud Configuration

1. Navigate to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable the following APIs:
   - Google Sheets API
   - Google Drive API
4. Create OAuth 2.0 credentials:
   - Application type: **Web application**
   - Authorized redirect URI: `http://localhost:3000/oauth2callback`
5. Save your **Client ID** and **Client Secret**

#### 2. Environment Configuration

Create a `.env` file in your project root:

```env
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
REDIRECT_URI=http://localhost:3000/oauth2callback
SPREADSHEET_ID=your_spreadsheet_id_here

#### 3. Sample Data Setup

Create a data.csv file in your project root:

Name,City,Age
John Doe,New York,30
Jane Smith,San Francisco,25
Peter Jones,London,45

📦 Installation

# Clone the repository
git clone <your-repo-url>
cd <project-directory>

# Install dependencies
npm install

# Start the server
node index.js


The server will start on http://localhost:3000

🔌 API Endpoints
Method	Endpoint	     Description
GET	  /auth	             Initiates OAuth 2.0 authentication flow
GET	  /oauth2callback	 Handles Google OAuth callback and stores access token
GET	  /upload-csv	     Uploads data.csv to Google Drive as a Sheet
GET	  /fetch-data	     Retrieves data from the configured spreadsheet
GET	  /logout	         Revokes authentication token

Example Usage

Authenticate: Visit http://localhost:3000/auth
Upload CSV: After authentication, go to /upload-csv
Fetch Data: Use the returned spreadsheet ID to fetch data via /fetch-data