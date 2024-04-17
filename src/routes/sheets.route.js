const express = require("express");
const sheetsController = require("../controllers/sheets.controller");
const { validateInsertPayload } = require("../middlewares/validate.middleware");

const router = express.Router();

// Worksheets routes
router.post("/worksheets", sheetsController.createWorksheet);
router.delete("/worksheets/:spreadsheetId", sheetsController.deleteWorksheet);

// Sheets routes
router.get(
  "/sheets/:spreadsheetId/:sheetName",
  sheetsController.fetchSheetData
);
router.post("/sheets/:spreadsheetId", sheetsController.createSheet);
router.put(
  "/sheets/:spreadsheetId/:sheetName",
  validateInsertPayload,
  sheetsController.updateSheetData
);
router.put(
  "/sheets/:spreadsheetId/:sheetName/properties",
  sheetsController.updateSheetProperties
);
router.delete(
  "/sheets/:spreadsheetId/:sheetName",
  sheetsController.deleteSheet
);

// Entries routes
router.post(
  "/sheets/:spreadsheetId/:sheetName",
  validateInsertPayload,
  sheetsController.insertSheetData
);
router.put(
  "/sheets/:spreadsheetId/:sheetName/:range",
  validateInsertPayload,
  sheetsController.updateSheetEntry
);
router.delete(
  "/sheets/:spreadsheetId/:sheetName/:range",
  sheetsController.deleteSheetEntry
);

// Formatting and cell properties routes
router.post(
  "/sheets/:spreadsheetId/:sheetName/formatting",
  validateInsertPayload,
  sheetsController.applyFormatting
);
router.post(
  "/sheets/:spreadsheetId/:sheetName/permissions",
  validateInsertPayload,
  sheetsController.setSheetPermissions
);

// Cross-sheet operations
router.post(
  "/sheets/:spreadsheetId/operations",
  validateInsertPayload,
  sheetsController.performSheetOperation
);

module.exports = router;
