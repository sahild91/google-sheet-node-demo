const { google } = require("googleapis");
const oauth2Client = require("../auth/auth");
const { NotFoundError } = require("../utils/errorHandlers");

const createWorksheet = async (title, headerValues) => {
  try {
    const sheets = google.sheets({ version: "v4", oauth2Client });
    const requestBody = {
      properties: {
        title,
      },
    };

    if (headerValues) {
      requestBody.sheets = [
        {
          properties: {
            title: "Sheet1",
          },
          data: [
            {
              rowData: [
                {
                  values: headerValues.map((value) => ({
                    userEnteredValue: { stringValue: value },
                  })),
                },
              ],
            },
          ],
        },
      ];
    }

    const response = await sheets.spreadsheets.create({
      requestBody,
    });

    return response.data;
  } catch (err) {
    console.error("Error creating worksheet:", err);
    throw err;
  }
};

const deleteWorksheet = async (spreadsheetId) => {
  try {
    const sheets = google.sheets({ version: "v4", auth });

    const response = await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          {
            deleteSpreadsheet: {},
          },
        ],
      },
    });

    return response.data;
  } catch (err) {
    console.error("Error deleting worksheet:", err);
    throw err;
  }
};

const fetchSheetData = async (spreadsheetId, sheetName) => {
  try {
    const sheets = google.sheets({ version: "v4", auth });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!A:ZZ`,
    });
    return response.data.values;
  } catch (err) {
    console.error("Error fetching sheet data:", err);
    throw err;
  }
};

const createSheet = async (spreadsheetId, sheetName, headerValues) => {
  try {
    const sheets = google.sheets({ version: "v4", auth });
    const requestBody = {
      requests: [
        {
          addSheet: {
            properties: {
              title: sheetName,
            },
          },
        },
      ],
    };

    if (headerValues) {
      requestBody.requests.push({
        updateCells: {
          rows: [
            {
              values: headerValues.map((value) => ({
                userEnteredValue: { stringValue: value },
              })),
            },
          ],
          fields: "*",
          start: {
            sheetId: 0,
            rowIndex: 0,
            columnIndex: 0,
          },
        },
      });
    }

    const response = await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody,
    });

    return response.data;
  } catch (err) {
    console.error("Error creating sheet:", err);
    throw err;
  }
};

const updateSheetData = async (spreadsheetId, sheetName, values) => {
  try {
    const sheets = google.sheets({ version: "v4", auth });
    const requestBody = {
      valueInputOption: "RAW",
      data: [
        {
          range: `${sheetName}!A:ZZ`,
          values,
        },
      ],
    };

    const response = await sheets.spreadsheets.values.batchUpdate({
      spreadsheetId,
      requestBody,
    });

    return response.data;
  } catch (err) {
    console.error("Error updating sheet data:", err);
    throw err;
  }
};

const deleteSheet = async (spreadsheetId, sheetName) => {
  try {
    const sheets = google.sheets({ version: "v4", auth });
    const sheetMetadata = await sheets.spreadsheets.get({
      spreadsheetId,
      fields: "sheets.properties",
    });

    const sheet = sheetMetadata.data.sheets.find(
      (s) => s.properties.title === sheetName
    );

    if (!sheet) {
      throw new NotFoundError(
        `Sheet ${sheetName} not found in spreadsheet ${spreadsheetId}`
      );
    }

    const requestBody = {
      requests: [
        {
          deleteSheet: {
            sheetId: sheet.properties.sheetId,
          },
        },
      ],
    };

    const response = await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody,
    });

    return response.data;
  } catch (err) {
    console.error("Error deleting sheet:", err);
    throw err;
  }
};

const insertSheetData = async (spreadsheetId, sheetName, values) => {
  try {
    const sheets = google.sheets({ version: "v4", auth });
    const requestBody = {
      valueInputOption: "RAW",
      data: [
        {
          range: `${sheetName}!A:ZZ`,
          values,
        },
      ],
    };

    const response = await sheets.spreadsheets.values.batchUpdate({
      spreadsheetId,
      requestBody,
    });

    return response.data;
  } catch (err) {
    console.error("Error inserting sheet data:", err);
    throw err;
  }
};

const updateSheetEntry = async (spreadsheetId, sheetName, range, values) => {
  try {
    const sheets = google.sheets({ version: "v4", auth });
    const requestBody = {
      valueInputOption: "RAW",
      data: [
        {
          range: `${sheetName}!${range}`,
          values,
        },
      ],
    };

    const response = await sheets.spreadsheets.values.batchUpdate({
      spreadsheetId,
      requestBody,
    });

    return response.data;
  } catch (err) {
    console.error("Error updating sheet entry:", err);
    throw err;
  }
};

const deleteSheetEntry = async (spreadsheetId, sheetName, range) => {
  try {
    const sheets = google.sheets({ version: "v4", auth });
    const requestBody = {
      ranges: [`${sheetName}!${range}`],
    };

    const response = await sheets.spreadsheets.values.batchClear({
      spreadsheetId,
      requestBody,
    });

    return response.data;
  } catch (err) {
    console.error("Error deleting sheet entry:", err);
    throw err;
  }
};

const updateSheetProperties = async (spreadsheetId, sheetName, properties) => {
  try {
    const sheets = google.sheets({ version: "v4", auth });
    const sheetMetadata = await sheets.spreadsheets.get({
      spreadsheetId,
      fields: "sheets.properties",
    });

    const sheet = sheetMetadata.data.sheets.find(
      (s) => s.properties.title === sheetName
    );

    if (!sheet) {
      throw new NotFoundError(
        `Sheet ${sheetName} not found in spreadsheet ${spreadsheetId}`
      );
    }

    const requestBody = {
      requests: [
        {
          updateSheetProperties: {
            properties,
            fields: Object.keys(properties).join(","),
          },
        },
      ],
    };

    const response = await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody,
    });

    return response.data;
  } catch (err) {
    console.error("Error updating sheet properties:", err);
    throw err;
  }
};

const applyFormatting = async (spreadsheetId, sheetName, range, format) => {
  try {
    const sheets = google.sheets({ version: "v4", auth });
    const requestBody = {
      requests: [
        {
          repeatCell: {
            range,
            cell: {
              userEnteredFormat: format,
            },
            fields: "userEnteredFormat",
          },
        },
      ],
    };

    const response = await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody,
    });

    return response.data;
  } catch (err) {
    console.error("Error applying formatting:", err);
    throw err;
  }
};

const setSheetPermissions = async (spreadsheetId, sheetName, permissions) => {
  try {
    const sheets = google.sheets({ version: "v4", auth });
    const sheetMetadata = await sheets.spreadsheets.get({
      spreadsheetId,
      fields: "sheets.properties",
    });

    const sheet = sheetMetadata.data.sheets.find(
      (s) => s.properties.title === sheetName
    );

    if (!sheet) {
      throw new NotFoundError(
        `Sheet ${sheetName} not found in spreadsheet ${spreadsheetId}`
      );
    }

    const requestBody = {
      requests: [
        {
          updateSheetProperties: {
            properties: {
              sheetId: sheet.properties.sheetId,
              permissions,
            },
            fields: "permissions",
          },
        },
      ],
    };

    const response = await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody,
    });

    return response.data;
  } catch (err) {
    console.error("Error setting sheet permissions:", err);
    throw err;
  }
};

const performSheetOperation = async (
  spreadsheetId,
  operation,
  sheetQueries
) => {
  try {
    const sheets = google.sheets({ version: "v4", auth });
    const requestBody = {
      requests: sheetQueries.map((query) => {
        switch (operation) {
          case "join":
            return {
              setDataValidationRequest: {
                range: query.targetRange,
                rule: {
                  condition: {
                    type: "ONE_OF_RANGE",
                    values: [
                      {
                        userEnteredValue: `=QUERY({${query.sourceRanges.join(
                          ","
                        )}}, "select * where Col1 = Col2")`,
                      },
                    ],
                  },
                  strict: true,
                  showCustomUi: true,
                },
              },
            };
          // Add cases for other operations as needed
          default:
            throw new Error("Invalid operation");
        }
      }),
    };

    const response = await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody,
    });

    return response.data;
  } catch (err) {
    console.error("Error performing sheet operation:", err);
    throw err;
  }
};

module.exports = {
  createWorksheet,
  deleteWorksheet,
  fetchSheetData,
  createSheet,
  updateSheetProperties,
  updateSheetData,
  deleteSheet,
  insertSheetData,
  updateSheetEntry,
  deleteSheetEntry,
  applyFormatting,
  setSheetPermissions,
  performSheetOperation,
};
