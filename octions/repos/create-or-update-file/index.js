const core = require("@actions/core");
const { request } = require("@octokit/request");
const github = require("@actions/github")

function parse_array(input_name) {
  const input_value = core.getInput(input_name)
  if (input_value === "") {
    return undefined; 
  }
  if (input_value === "<<EMPTY>>") {
    return [];
  }
  return input_value.split(",");
}

function parse_boolean(input_name) {
  const input_value = core.getInput(input_name)
  return input_value === "true"
}

function default_parse(input_name) {
  const input_value = core.getInput(input_name)
  if (!input_value) {
    if (input_name === 'owner') {
      return github.context.repo.owner
    } else if (input_name === 'repo') {
      return github.context.repo.repo
    }
  }
  return input_value || undefined
}

const token = default_parse("token");
const owner = default_parse("owner");
const repo = default_parse("repo");
const path = default_parse("path");
const message = default_parse("message");
const content = default_parse("content");
const sha = default_parse("sha");
const branch = default_parse("branch");
const committer = default_parse("committer");
const author = default_parse("author");


const requestWithAuth = request.defaults({
  headers: {
    authorization: `Bearer ${token}`
  },
});

requestWithAuth("put /repos/{owner}/{repo}/contents/{path}", {
    token,
    owner,
    repo,
    path,
    message,
    content,
    sha,
    branch,
    committer,
    author,
})
  .then(result => {
    console.log("result", result);
    if (result && result.data && result.data.id) {
      core.setOutput('id', result.data.id)
    }
    if (result && result.data && result.data.number) {
      core.setOutput('number', result.data.number)
    }
  })
  .catch(error => {
    console.log("error", error);
    core.setFailed(error.message);
  });