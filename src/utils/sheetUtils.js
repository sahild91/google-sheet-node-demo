const parseSheetQuery = (query) => {
  const { targetRange, sourceSheets } = query;
  const sourceRanges = sourceSheets.map(
    ({ sheetName, range }) => `'${sheetName}'!${range}`
  );
  return { targetRange, sourceRanges };
};

module.exports = { parseSheetQuery };
