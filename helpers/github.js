const axios = require('axios');
const db = require('../database/index.js')

const getReposByUsername = async (user, callback) => {
  const options = {
    url: `https://api.github.com/users/${user}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${process.env.TOKEN}`
    }
  };
  const docConstructor = (repo) => {
    return {
      id: repo.id,
      repository: repo.name,
      username: repo.owner.login,
      url: repo.owner.html_url,
      issueCount: repo.open_issues,
      size: repo.size
    }
  }

  try {
  const response = await axios.get(options.url, options.headers)
  const documents = Promise.all(response.data.map( async (repo) => {
    const doc = docConstructor(repo);
    return await db.createOrUpdate(doc);
  }))
  .then((documents) => {
    console.log('DATA', documents);
  })
  } catch (err) {
    console.log(err);
  }
}

// const getReposByUsername = (user, callback) => {
//   let options = {
//     url: `https://api.github.com/users/${user}/repos`,
//     headers: {
//       'User-Agent': 'request',
//       'Authorization': `token ${process.env.TOKEN}`
//     }
//   };
//   axios.get(options.url, options.headers)
//   .then ((response) => {
//     response.data.forEach((repo) => {
//       const doc = {
//         id: repo.id,
//         repository: repo.name,
//         username: repo.owner.login,
//         url: repo.owner.html_url,
//         issueCount: repo.open_issues,
//         size: repo.size
//       }
//       db.createOrUpdate(doc, (err, res) => {
//         if (err) {
//           console.log(err);
//           return;
//         }
//         // Maybe new callback to store all in array for future use
//         callback(null, res);
//       });
//     });
//   })
//   .catch((err) => {
//     console.log(err);
//   })
// }

// const getReposByUsername = async (user, callback) => {
//   try {
//   let options = {
//     url: `https://api.github.com/users/${user}/repos`,
//     headers: {
//       'User-Agent': 'request',
//       'Authorization': `token ${process.env.TOKEN}`
//     }
//   };
//   axios.get(options.url, options.headers)
//   .then ((response) => {
//     const documents = Promise.all(response.data.map( async (repo) => {
//       const doc = {
//         id: repo.id,
//         repository: repo.name,
//         username: repo.owner.login,
//         url: repo.owner.html_url,
//         issueCount: repo.open_issues,
//         size: repo.size
//       };
//       const updated = await db.createOrUpdate(doc);
//       console.log(updated);
//       return updated;
//     }));
//     return documents;
//     // console.log(documents);
//   })
//   .then((documents) => {
//     console.log('DATA', documents);
//   })
//   } catch (err) {
//     console.log(err);
//   }
// }

module.exports.getReposByUsername = getReposByUsername;