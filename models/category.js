const jwt = require("../utils/jwt");
const { mongo } = require("../dao");
const { collections } = require("../const");

class Category {
  constructor(resData) {
    this.name = resData.name || "";
    this.description = resData.description || "";
    this.createdBy = resData.createdBy || "";
    this.createdDateTime = new Date();
  }

  async save() {
    await mongo.insert(collections.category, this);
  }
}

module.exports = Category;
