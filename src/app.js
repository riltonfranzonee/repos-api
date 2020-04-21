const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

let repositories = [];

app.get("/repositories", (req, res) => {
  return res.json(repositories)
});

app.post("/repositories", (req, res) => {
  const { title, url, techs } = req.body;

  const newRepo = {
    id: uuid(),
    title,
    techs,
    url,
    likes: 0,
  }

  repositories.push(newRepo)

  return res.json(newRepo)
});

app.put("/repositories/:id", (req, res) => {
  const { id } = req.params;
  const { title, url, techs } = req.body;

  const repoIndex = repositories.findIndex(repo => repo.id === id);

  if(repoIndex < 0) {
    return res.status(400).json({error: 'Repository not found'})
  }


  title ? repositories[repoIndex].title = title : null;
  url ? repositories[repoIndex].url = url : null;
  techs ? repositories[repoIndex].techs = techs  : null;

  return res.json(repositories[repoIndex])
});

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params;

  const repoIndex = repositories.findIndex(repo => repo.id === id);

  if(repoIndex < 0) {
    return res.status(400).json({error: 'not found'})
  }

  repositories.splice(repoIndex, 1);
  return res.status(204).send()
});

app.post("/repositories/:id/like", (req, res) => {
  const { id } = req.params;

  const repoIndex = repositories.findIndex(repo => repo.id === id);

  if(repoIndex < 0) {
    return res.status(400).json({error: 'Repository not found'})
  }

  repositories[repoIndex].likes =  repositories[repoIndex].likes + 1;


  return res.json({likes: repositories[repoIndex].likes})

});

module.exports = app;
