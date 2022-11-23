const model = require('../models/githubModel.js');
const github = require('../../helpers/github.js')


const get = (req, res) => {

  // Query the github api to retrieve data and pass it to the model
  // Relay data back to request using a axios post or callback with requested data
  // This route should send back the top 25 repos

};

const post = (req, res) => {
  console.log(req.body);
  github.getReposByUsername(req.body.user, async (err, res) => {
    console.log(res);
    try {
      await model.postAll(req.body, (err, data) => {
        if (err) {
          res.sendStatus(404).send();
        } else {
          res.sendStatus(201).send();
        }
      });
    } catch (err) {
      console.log(err);
    }
  })
};

module.exports = {
  get,
  post
}