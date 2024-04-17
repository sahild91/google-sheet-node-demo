const { BadRequestError } = require("../utils/errorHandlers");

const validateInsertPayload = (req, res, next) => {
  const values = req.body;

  if (!Array.isArray(values) || values.some((row) => !Array.isArray(row))) {
    return next(
      new BadRequestError(
        "Invalid request payload. Payload should be an array of arrays."
      )
    );
  }

  next();
};

module.exports = { validateInsertPayload };
