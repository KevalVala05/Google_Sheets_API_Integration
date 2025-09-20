import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { fileURLToPath } from 'url';
import { loadToken, oauth2Client } from './authController.js'; // Import the client and token loader

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Uploads a CSV file to Google Sheets.
 */
export const uploadCsv = async (req, res) => {
    await loadToken();
    if (!oauth2Client.credentials.access_token) {
        return res.status(401).send('Please authenticate first by visiting /auth');
    }

    const sheets = google.sheets({ version: 'v4', auth: oauth2Client });
    const csvFilePath = path.join(__dirname, '..', 'data.csv');
    const data = [];

    fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (row) => {
            data.push(Object.values(row));
        })
        .on('end', async () => {
            try {
                const resource = {
                    properties: {
                        title: `Uploaded CSV - ${new Date().toISOString()}`,
                    },
                };
                const sheet = await sheets.spreadsheets.create({ resource });
                const spreadsheetId = sheet.data.spreadsheetId;

                await sheets.spreadsheets.values.update({
                    spreadsheetId,
                    range: 'Sheet1!A1',
                    valueInputOption: 'RAW',
                    resource: { values: data },
                });

                res.json({
                    message: 'CSV uploaded and converted to Google Sheet successfully!',
                    spreadsheetUrl: `https://docs.google.com/spreadsheets/d/${spreadsheetId}`,
                    spreadsheetId,
                });
            } catch (err) {
                console.error('Error uploading CSV:', err);
                res.status(500).send('Error uploading CSV.');
            }
        });
};

/**
 * Fetches and displays data from a specified Google Sheet.
 */
export const fetchData = async (req, res) => {
    await loadToken();
    if (!oauth2Client.credentials.access_token) {
        return res.status(401).send('Please authenticate first by visiting /auth');
    }

    const sheets = google.sheets({ version: 'v4', auth: oauth2Client });
    const spreadsheetId = process.env.SPREADSHEET_ID;
    const range = 'Sheet1!A:C';

    if (!spreadsheetId) {
        return res.status(400).send('SPREADSHEET_ID is not set in the .env file.');
    }

    try {
        const response = await sheets.spreadsheets.values.get({ spreadsheetId, range });
        const rows = response.data.values;
        if (rows && rows.length) {
            res.json(rows);
        } else {
            res.status(404).send('No data found in the spreadsheet.');
        }
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).send('Error fetching data from the sheet.');
    }
};
