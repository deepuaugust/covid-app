const jwt = require("../utils/jwt");
const { mongo } = require("../dao");
const { collections, userTypes } = require("../const");

class User {
  constructor(resData) {
    this.fName = resData.fName || "";
    this.lName = resData.lName || "";
    this.userName = resData.userName || "";
    this.password = resData.password || "";
    this.type = resData.password || "";
  }

  makeAdmin() {
    this.type = userTypes.ADMIN;
  }

  makeRegular() {
    this.type = userTypes.REGULAR;
  }

  encryptPassword() {
    this.password = jwt.encryptPassword(this.password);
  }

  serialize() {
    return {
      userName: this.userName,
      type: this.type,
    };
  }

  async getByUserName(userName) {
    let user = await mongo.query(collections.users, {
      userName: this.userName || userName,
    });
    if (user && user.length > 0) {
      return user[0];
    } else {
      return null;
    }
  }

  async userNameAvailability() {
    if (await this.getByUserName()) {
      return false;
    } else {
      return true;
    }
  }

  async save() {
    await mongo.insert(collections.users, this);
  }
}

module.exports = User;
