import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

const App = () => {

  const [repos, setRepos] = useState([]);

  const search = (user) => {
    console.log(`${user} was searched`);
    axios.post('/repos', {user})
    .then((user) => {
      console.log(user);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  return (
    <div>
      <h1>Github Fetcher</h1>
      <RepoList repos={repos}/>
      <Search onSearch={search}/>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));