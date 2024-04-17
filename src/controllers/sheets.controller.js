const sheetsService = require("../services/sheets.service");
const { BadRequestError, NotFoundError } = require("../utils/errorHandlers");
const { parseSheetQuery } = require("../utils/sheetUtils");

const createWorksheet = async (req, res, next) => {
  try {
    const { title, headerValues } = req.body;

    const response = await sheetsService.createWorksheet(title, headerValues);
    res.json(response);
  } catch (err) {
    next(err);
  }
};

const deleteWorksheet = async (req, res, next) => {
  try {
    const { spreadsheetId } = req.params;

    const response = await sheetsService.deleteWorksheet(spreadsheetId);
    res.json(response);
  } catch (err) {
    next(err);
  }
};

const fetchSheetData = async (req, res, next) => {
  try {
    const { spreadsheetId, sheetName } = req.params;
    const data = await sheetsService.fetchSheetData(spreadsheetId, sheetName);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const createSheet = async (req, res, next) => {
  try {
    const { spreadsheetId } = req.params;
    const { sheetName, headerValues } = req.body;

    const response = await sheetsService.createSheet(
      spreadsheetId,
      sheetName,
      headerValues
    );
    res.json(response);
  } catch (err) {
    next(err);
  }
};

const updateSheetData = async (req, res, next) => {
  try {
    const { spreadsheetId, sheetName } = req.params;
    const values = req.body;

    const response = await sheetsService.updateSheetData(
      spreadsheetId,
      sheetName,
      values
    );
    res.json(response);
  } catch (err) {
    next(err);
  }
};

const deleteSheet = async (req, res, next) => {
  try {
    const { spreadsheetId, sheetName } = req.params;

    const response = await sheetsService.deleteSheet(spreadsheetId, sheetName);
    res.json(response);
  } catch (err) {
    next(err);
  }
};

const insertSheetData = async (req, res, next) => {
  try {
    const { spreadsheetId, sheetName } = req.params;
    const values = req.body;

    const response = await sheetsService.insertSheetData(
      spreadsheetId,
      sheetName,
      values
    );
    res.json(response);
  } catch (err) {
    next(err);
  }
};

const updateSheetProperties = async (req, res, next) => {
  try {
    const { spreadsheetId, sheetName } = req.params;
    const { title, tabColor, gridProperties } = req.body;

    const response = await sheetsService.updateSheetProperties(
      spreadsheetId,
      sheetName,
      { title, tabColor, gridProperties }
    );
    res.json(response);
  } catch (err) {
    next(err);
  }
};

const updateSheetEntry = async (req, res, next) => {
  try {
    const { spreadsheetId, sheetName, range } = req.params;
    const values = req.body;

    const response = await sheetsService.updateSheetEntry(
      spreadsheetId,
      sheetName,
      range,
      values
    );
    res.json(response);
  } catch (err) {
    next(err);
  }
};

const deleteSheetEntry = async (req, res, next) => {
  try {
    const { spreadsheetId, sheetName, range } = req.params;

    const response = await sheetsService.deleteSheetEntry(
      spreadsheetId,
      sheetName,
      range
    );
    res.json(response);
  } catch (err) {
    next(err);
  }
};

const applyFormatting = async (req, res, next) => {
  try {
    const { spreadsheetId, sheetName } = req.params;
    const { range, format } = req.body;

    const response = await sheetsService.applyFormatting(
      spreadsheetId,
      sheetName,
      range,
      format
    );
    res.json(response);
  } catch (err) {
    next(err);
  }
};

const setSheetPermissions = async (req, res, next) => {
  try {
    const { spreadsheetId, sheetName } = req.params;
    const { permissions } = req.body;

    const response = await sheetsService.setSheetPermissions(
      spreadsheetId,
      sheetName,
      permissions
    );
    res.json(response);
  } catch (err) {
    next(err);
  }
};

const performSheetOperation = async (req, res, next) => {
  try {
    const { spreadsheetId } = req.params;
    const { operation, sheetQueries } = req.body;

    const parsedQueries = sheetQueries.map(parseSheetQuery);
    const response = await sheetsService.performSheetOperation(
      spreadsheetId,
      operation,
      parsedQueries
    );
    res.json(response);
  } catch (err) {
    next(err);
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
