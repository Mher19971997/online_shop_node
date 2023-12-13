const response = require('./../../../../helpers/http/response');

const errorResp = (res,condition, message, code = 400) => {
  const responseStatus = response.status.BAD_REQUEST;
  const data = response.dispatch({
    error: message,
    code: responseStatus
  });
  
  return !condition && res.status(responseStatus).json(data);
};

module.exports = { errorResp };