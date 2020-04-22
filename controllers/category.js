const { Response, Category } = require("../models");
const { mongo } = require("../dao");
const { collections } = require("../const");


async function create(categoryData) {
    let category = new Category(categoryData);
    category.save();
    return new Response({
        code: 200,
        message: "success",
        data: null,
      });
}

async function update() {
    return new Response({
        code: 200,
        message: "TODO",
        data: null,
      });
}

async function list() {
    try {
      let list = await mongo.query(collections.category,{});
      return new Response({
        code: 200,
        message: "success",
        data: list,
        err: null,
      });
    } catch (err) {
      console.log(err);
      return new Response({
        code: 500,
        message: "Something went wrong",
        data: null,
        err: err.message,
      });
    }
  }
  


module.exports = { create, list, update };
