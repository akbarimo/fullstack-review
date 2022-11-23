const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', {
  useNewUrlParser: true,
  useUnifiedTopology: true
 });

const repoSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  repository: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  issuesCount: {
    type: Number,
    required: true
  },
  size: {
    type: Number,
    required: true
  }
});

const Repo = mongoose.model('Repo', repoSchema);
const db = new Repo();


const createOrUpdate = async (doc) => {
  const query = { id: doc.id };
  const options = { upsert: true, new: true, setDefaultsOnInsert: true };
  const docToUpdate = { $set: doc };
  return await db.collection.findOneAndUpdate(query, docToUpdate, options);
}

module.exports = {
  createOrUpdate,
  db
}