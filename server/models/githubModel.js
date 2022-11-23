const db = require('../../database');


const getAll = (data, callback) => {

  // Retrieve data back from controller (api)
  // Query the database and pass data back to callback (controller)

};

const getTop = (data, callback) => {

  // Retrieve data back from controller (api)
  // Query the database and pass the requests top 25 data back to callback (controller)

};

const postAll = (data, callback) => {
  console.log('test', data);


  // Post data to database and pass data back to callback (controller)
  // if (err) {
  //   callback(err);
  //   return;
  // }
  // callback(null, data);
};


module.exports = {
  getAll,
  getTop,
  postAll
}