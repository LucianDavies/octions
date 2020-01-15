const core = require("@actions/core");
const { parse_array, parse_boolean, default_parse } = require('../../../src/utils/parse-input')
const _ = require('lodash')
const request = require('../../../src/utils/request')

const token = default_parse("token");
const owner = default_parse("owner");
const repo = default_parse("repo");
const ref = default_parse("ref");
const app_id = default_parse("app_id");
const check_name = default_parse("check_name");
const per_page = default_parse("per_page");
const page = default_parse("page");
const file_output = default_parse("file_output");
const custom_outputs = default_parse("custom_outputs");


const previews = [
  "antiope",
]

const inputs = {
  token,
  owner,
  repo,
  ref,
  app_id,
  check_name,
  per_page,
  page,
  file_output,
  custom_outputs,
}


request(token, 
  "get", 
  "/repos/{owner}/{repo}/commits/{ref}/check-suites", 
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