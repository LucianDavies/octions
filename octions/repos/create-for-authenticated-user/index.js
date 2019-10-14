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
const name = default_parse("name");
const description = default_parse("description");
const homepage = default_parse("homepage");
const private = parse_boolean("private");
const has_issues = parse_boolean("has_issues");
const has_projects = parse_boolean("has_projects");
const has_wiki = parse_boolean("has_wiki");
const is_template = parse_boolean("is_template");
const team_id = default_parse("team_id");
const auto_init = parse_boolean("auto_init");
const gitignore_template = default_parse("gitignore_template");
const license_template = default_parse("license_template");
const allow_squash_merge = parse_boolean("allow_squash_merge");
const allow_merge_commit = parse_boolean("allow_merge_commit");
const allow_rebase_merge = parse_boolean("allow_rebase_merge");


const requestWithAuth = request.defaults({
  headers: {
    authorization: `Bearer ${token}`
  },
  mediaType: {
    previews: [
      "baptiste",
    ]
  } 
});

requestWithAuth("post /user/repos", {
    token,
    name,
    description,
    homepage,
    private,
    has_issues,
    has_projects,
    has_wiki,
    is_template,
    team_id,
    auto_init,
    gitignore_template,
    license_template,
    allow_squash_merge,
    allow_merge_commit,
    allow_rebase_merge,
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