const fs = require("fs");
const { google } = require("googleapis");
const { OAuth2Client } = require("google-auth-library");

// Loading the credentials from the JSON file
const credentials = JSON.parse(fs.readFileSync("credentials.json"));

// Creating a new OAuth2 client for authentication
const oauth2Client = new OAuth2Client(
  credentials.web.client_id,
  credentials.web.client_secret,
  credentials.web.redirect_uris[0]
);

oauth2Client.setCredentials({
  access_token: "ACCESS_TOKEN",
  refresh_token: "REFRESH_TOKEN",
  scope: "https://www.googleapis.com/auth/spreadsheets",
  token_type: "Bearer",
  expiry_date: null,
});

// Function to refresh the access token if it has expired.
async function refreshAccessToken() {
  const { credentials } = await oauth2Client.refreshAccessToken();
  oauth2Client.setCredentials(credentials);

  // Update the expiry date to 2 days from the current time
  credentials.expiry_date = Date.now() + 2 * 24 * 60 * 60 * 1000;

  // Save the updated tokens to the file
  fs.writeFileSync("tokens.json", JSON.stringify(credentials));
}

// Checking if the access token has expired
if (oauth2Client.credentials.expiry_date <= Date.now()) {
  refreshAccessToken();
}

module.exports = oauth2Client;
