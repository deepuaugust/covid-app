class Response {
  constructor(resData) {
    this.code = resData.code;
    this.message = resData.message;
    this.data = resData.data;
  }
}
module.exports = Response;
