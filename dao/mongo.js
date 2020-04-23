const { mongoUrl } = require("../config");

var db;

let connect = () => {
  return new Promise((resolve, reject) => {
    const mongoose = require("mongoose");
    mongoose.connect(
      mongoUrl,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (e, d) => (e ? reject(e) : resolve(console.log("db connected")))
    );
  });
};

let query = (collectionName, query) => {
  return new Promise((resolve, reject) => {
    let collection = db.collection(collectionName);
    collection.find(query).toArray((err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};

let insert = (collectionName, data) => {
  return new Promise((resolve, reject) => {
    let collection = db.collection(collectionName);
    collection.insert(data, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};

let update = (collectionName, query, udpateData) => {
  return new Promise((resolve, reject) => {
    let collection = db.collection(collectionName);
    collection.update(query, udpateData, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};

let count = (collectionName, query) => {
  return new Promise((resolve, reject) => {
    let collection = db.collection(collectionName);
    collection.find(query).count((err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};

let deleteItem = (collectionName, query) => {
  return new Promise((resolve, reject) => {
    let collection = db.collection(collectionName);
    collection.remove(query, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};



module.exports = {
  connect,
  query,
  insert,
  update,
  count,
  deleteItem,
};
