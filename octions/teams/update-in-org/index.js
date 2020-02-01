const core = require("@actions/core");
const { parse_array, parse_boolean, default_parse } = require('../../../src/utils/parse-input')
const _ = require('lodash')
const request = require('../../../src/utils/request')

const token = default_parse("token");
const org = default_parse("org");
const team_slug = default_parse("team_slug");
const name = default_parse("name");
const description = default_parse("description");
const privacy = default_parse("privacy");
const permission = default_parse("permission");
const parent_team_id = default_parse("parent_team_id");
const file_output = default_parse("file_output");
const custom_outputs = default_parse("custom_outputs");


const previews = [
]

const inputs = {
  token,
  org,
  team_slug,
  name,
  description,
  privacy,
  permission,
  parent_team_id,
  file_output,
  custom_outputs,
}


request(token, 
  "patch", 
  "/orgs/{org}/teams/{team_slug}", 
  previews,
  _.omit(inputs, ["token", "file_output", "custom_outputs"]),
  file_output,
  custom_outputs,
).then(result => {
    console.log("result", result);
  })
  .catch(error => {
    console.log("error", error);
    core.setFailed(error.message);
  });