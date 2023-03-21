function successResponse(data, msg = '') {
  let response = {
    ok: true,
    data
  }
  if (msg) {
    response.msg = msg;
  }
  return response;
}

module.exports = {
  successResponse
};
