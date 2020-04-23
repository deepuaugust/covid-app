class Response {
  constructor(resData) {
    this.code = resData.code;
    this.message = resData.message;
    this.data = resData.data;
    this.status = resData.status || "";
  }
}
module.exports = Response;
