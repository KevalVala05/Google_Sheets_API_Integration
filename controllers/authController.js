import { google } from 'googleapis';
import dotenv from 'dotenv';
dotenv.config();
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// To resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const TOKEN_PATH = path.join(__dirname, '..', 'token.json');

// Define OAuth2 scopes and client instance
const SCOPES = [
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/spreadsheets'
];


export const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.REDIRECT_URI
);

/**
 * Loads the saved token from token.json.
 */
export async function loadToken() {
    try {
        const token = fs.readFileSync(TOKEN_PATH);
        oauth2Client.setCredentials(JSON.parse(token));
    } catch (err) {
        // This is expected on the first run, no token file exists.
        console.error('No token found, authentication required.');
    }
}

/**
 * Saves the token to a file.
 * @param {object} token The authentication token.
 */
async function saveToken(token) {
    try {
        fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
    } catch (err) {
        console.error('Error saving token:', err);
    }
}

/**
 * Initiates the Google OAuth2 authentication flow.
 */
export const authenticate = (req, res) => {
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
        prompt: 'consent',
        redirect_uri: process.env.REDIRECT_URI
    });
    res.redirect(authUrl);
};

/**
 * Handles the OAuth2 callback, exchanges the code for a token, and saves it.
 */
export const oauth2callback = async (req, res) => {
    const { code } = req.query;
    try {
        const { tokens } = await oauth2Client.getToken({
            code,
            redirect_uri: process.env.REDIRECT_URI
        });
        oauth2Client.setCredentials(tokens);
        await saveToken(tokens);
        res.send('Authentication successful! You can now use the other endpoints.');
    } catch (error) {
        console.error('Error during authentication:', error);
        res.status(500).send('Authentication failed.');
    }
};

export const userLogout = async (req, res) => {
    try {
        await loadToken();
        const currentToken = oauth2Client.credentials.access_token;
        if (currentToken) {
            // Revoke the token with Google
            await oauth2Client.revokeCredentials();
        }

        // Delete the local token file
        if (fs.existsSync(TOKEN_PATH)) {
            fs.unlinkSync(TOKEN_PATH);
        }

        res.send('Logout successful. Your credentials have been revoked and deleted.');
    } catch (err) {
        console.error('Error during logout:', err);
        res.status(500).send('Logout failed.');
    }
};