import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories')
      .then(res => {
        setRepositories(res.data)
      })
      .catch(err => console.log(err))
  }, [])

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      "title": "Contact book",
      "url": "https://github.com/gcrodrigues/contact-book",
      "techs": [
        "React Native",
        "TypeScript",
        "NodeJS"
      ],
      "likes": 0
    })

    console.log(response.data)
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    setRepositories(repositories.filter(
      repository => repository.id !== id
    ))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => (
          <li key={repo.id}>
            {repo.title}

            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
          </button>
          </li>

        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
