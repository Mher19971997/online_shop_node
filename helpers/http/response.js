const status = Object.freeze({
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  INTERNAL_SERVER_ERROR: 500,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  PRECONDITION_FAILED: 412,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
});

const dispatch = (obj) => {
  const defaults = {
    message: null
  };


  return {
    statusCode: status.OK,
    name: 'ExpectationFailedException',
    timestamp: new Date(),
    ...defaults,
    ...obj
  };
};

module.exports = {
  dispatch,
  status,
};
