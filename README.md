# Google Sheets API Integration with Node.js

This project demonstrates how to use Google Sheets as a database with Node.js and RESTful APIs. It provides endpoints for creating, reading, updating, and deleting sheets and data entries within sheets.

## Prerequisites

Before getting started, ensure that you have the following:

- Node.js installed on your machine
- A Google account
- A Google Cloud Platform project with the Google Sheets API enabled

## Google Sheets API Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project or select an existing project.
3. Enable the Google Sheets API for your project:
   - In the left sidebar, click on "APIs & Services" > "Library".
   - Search for "Google Sheets API" and click on it.
   - Click on the "Enable" button to enable the API for your project.
4. Create OAuth 2.0 credentials:
   - In the left sidebar, click on "APIs & Services" > "Credentials".
   - Click on the "Create credentials" button and select "OAuth client ID".
   - Choose "Web application" as the application type.
   - Provide a name for your OAuth client.
   - Under "Authorized redirect URIs", add `http://localhost:3000/oauth2callback` (or the appropriate redirect URI for your application).
   - Click on the "Create" button to create the OAuth client.
   - Download the JSON file containing the client ID and client secret.
5. Rename the downloaded JSON file to `credentials.json` and place it in the project directory.

## Obtaining the Access Token

To obtain the access token for authentication:

1. Run the application using `node src/app.js`.
2. The application will generate an authorization URL. Open this URL in your web browser.
3. Grant permission to the application to access your Google Sheets.
4. After granting permission, you will be redirected to the specified redirect URI with an authorization code appended to the URL.
5. Copy the authorization code from the URL.
6. In the application, when prompted, enter the authorization code.
7. The application will exchange the authorization code for an access token and refresh token.
8. The access token and refresh token will be stored in a file named `tokens.json` for future use.

If the `tokens.json` file already exists and contains valid credentials, the application will use them for authentication. The access token will be automatically refreshed when it expires.

## API Endpoints.

### Common Payloads

#### Data Payload

Used for sending or receiving tabular data in the form of an array of arrays.

```json
[
  ["Value 1", "Value 2", ...],
  ["Value 3", "Value 4", ...],
  ...
]
```

#### Header Values Payload

Used for defining column headers.

```json
{
  "headerValues": ["Column 1", "Column 2", ...]
}
```

#### Formatting Payload

Used for applying formatting to a range of cells.

```json
{
  "range": "Sheet1!A1:B5",
  "format": {
    "backgroundColor": {
      "red": 1.0,
      "green": 1.0,
      "blue": 1.0
    },
    "textFormat": {
      "fontSize": 12,
      "bold": true
    }
  }
}
```

#### Permissions Payload

Used for setting permissions on a sheet.

```json
{
  "permissions": [
    {
      "type": "user",
      "role": "writer",
      "emailAddress": "user@example.com"
    },
    {
      "type": "anyone",
      "role": "reader"
    }
  ]
}
```

#### Sheet Query Payload

Used for performing operations across multiple sheets.

```json
{
  "operation": "join",
  "sheetQueries": [
    {
      "targetRange": "Sheet3!A1:B10",
      "sourceSheets": [
        {
          "sheetName": "Sheet1",
          "range": "A1:B10"
        },
        {
          "sheetName": "Sheet2",
          "range": "A1:B10"
        }
      ]
    }
  ]
}
```

### Worksheets

- `POST /api/worksheets`: Create a new Google Worksheet (spreadsheet).
  - Request Body:
    ```json
    {
      "title": "Worksheet Title", ...HeaderValuesPayload
    }
    ```
- `DELETE /api/worksheets/:spreadsheetId`: Delete a Google Worksheet (spreadsheet).

### Sheets

- `GET /api/sheets/:spreadsheetId/:sheetName`: Fetch data from a sheet.
- `POST /api/sheets/:spreadsheetId`: Create a new sheet.
  - Request Body:
    ```json
    {
      "sheetName": "Sheet Name",
      ..HeaderValuesPayload
    }
    ```
- `PUT /api/sheets/:spreadsheetId/:sheetName`: Update the entire data in a sheet.
  - Request Body: Array of arrays representing the data to be updated.
  ```json
  {
    "title": "New Sheet Name",
    "tabColor": {
      "red": 1.0,
      "green": 1.0,
      "blue": 1.0
    },
    "gridProperties": {
      "rowCount": 1000,
      "columnCount": 26
    }
  }
  ```
- `PUT /api/sheets/:spreadsheetId/:sheetName/data`: Update the entire data in a sheet.
  - Request Body: ...DataPayload
- `DELETE /api/sheets/:spreadsheetId/:sheetName`: Delete a sheet.

### Entries

- `POST /api/sheets/:spreadsheetId/:sheetName`: Insert data into a sheet.
  - Request Body: ...DataPayload.
- `PUT /api/sheets/:spreadsheetId/:sheetName/:range`: Update a specific range of cells in a sheet.
  - Request Body: ...DataPayload.
- `DELETE /api/sheets/:spreadsheetId/:sheetName/:range`: Delete a specific range of cells in a sheet.

### Formatting and Cell Properties

- `POST /api/sheets/:spreadsheetId/:sheetName/formatting`: Apply formatting to a range of cells.
  - Request Body: ...FormattingPayload.
- `POST /api/sheets/:spreadsheetId/:sheetName/permissions`: Set permissions on a sheet.
  - Request Body: ...PermissionsPayload.

### Formatting and Cell Properties

- `POST /api/sheets/:spreadsheetId/operations`: Perform operations across multiple sheets.
  - Request Body: ...SheetQueryPayload.

## Setup

1. Clone the repository.
2. Install dependencies: `npm install`.
3. Set up Google Cloud Platform credentials (client ID and client secret) and save the credentials JSON file in the project directory.
4. Start the server: `node src/app.js`.

## Contributing

Contributions are welcome! Please follow the existing code style and ensure that your changes are well-documented.
